# Ebbinghaus Forgetting-Curve Flashcard Review Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a cross-topic "今日复习" (today's review) page that surfaces flashcards due today, scheduled on the classic Ebbinghaus interval schedule `[1, 2, 4, 7, 15, 30]` days, without disturbing the existing per-topic flashcard browser or any progress already saved in `localStorage`.

**Architecture:** Pure scheduling logic lives in `js/progress.js` alongside the existing progress functions (same style: plain functions over a plain state object, fully unit-testable, no DOM). A new `js/topic-loader.js` extracts the fetch-and-eval trick `wrong-book.js` already uses for loading a topic's data file, shared by `wrong-book.js` (refactored) and the new `review.js`. A new `review.html` + `js/review.js` page renders the cross-topic due queue using the same single-card-flip interaction as `js/flashcard.js`.

**Tech Stack:** Same as the rest of the site — zero-dependency ES modules, no build step, `localStorage` via `js/app.js`, `node:test` for unit tests.

## Global Constraints

- Zero new dependencies; no build step. Plain ES modules only.
- Must work when served via `scripts/serve.js` with no server-side changes.
- Backward-compatible with existing `localStorage` progress data: a flashcard entry with no `stage`/`dueAt` (old data, or brand new) is treated as due now; an existing `mastered: true` entry stays excluded from the due queue regardless of `stage`/`dueAt`.
- Do not modify `js/quiz.js`, the `questions` half of the progress state shape, or any calculator code — out of scope.
- Do not modify the existing per-topic flashcard browser's behavior (`js/flashcard.js`, `setFlashcardMastered`, `isFlashcardMastered`) — it keeps working exactly as it does today.
- Graduation requires 7 total successful reviews of a card: one success at each of the 6 scheduled intervals, then one final confirming success after the last (30-day) wait — the 30-day interval is actually waited out, not skipped. See the design spec's Algorithm section for the full worked example.

---

### Task 1: Ebbinghaus scheduling functions in `js/progress.js`

**Files:**
- Modify: `js/progress.js`
- Test: `tests/progress.test.js`

**Interfaces:**
- Produces (used by Task 3):
  - `EBBINGHAUS_INTERVALS_DAYS` — exported constant, `[1, 2, 4, 7, 15, 30]`.
  - `getFlashcardSchedule(state, flashcardId)` → `{ stage: number, dueAt: number | null, mastered: boolean }`.
  - `isFlashcardDue(state, flashcardId, now)` → `boolean`.
  - `reviewFlashcard(state, flashcardId, remembered, now)` → new state (same immutable-update style as `recordAttempt`/`setFlashcardMastered`).

- [ ] **Step 1: Write the failing tests**

Append to `tests/progress.test.js` (add these imports to the existing `import { ... } from "../js/progress.js";` block: `EBBINGHAUS_INTERVALS_DAYS`, `getFlashcardSchedule`, `isFlashcardDue`, `reviewFlashcard`), and add this constant plus these tests at the end of the file:

```js
const DAY_MS = 24 * 60 * 60 * 1000;

test("getFlashcardSchedule defaults for an unseen flashcard", () => {
  const state = createEmptyProgress();
  assert.deepEqual(getFlashcardSchedule(state, "tvm-fc-0"), {
    stage: 0,
    dueAt: null,
    mastered: false,
  });
});

test("getFlashcardSchedule respects a legacy mastered:true entry with no schedule", () => {
  let state = createEmptyProgress();
  state = setFlashcardMastered(state, "tvm-fc-0", true);
  assert.deepEqual(getFlashcardSchedule(state, "tvm-fc-0"), {
    stage: 0,
    dueAt: null,
    mastered: true,
  });
});

test("isFlashcardDue is true for an unseen flashcard", () => {
  const state = createEmptyProgress();
  assert.equal(isFlashcardDue(state, "tvm-fc-0", Date.now()), true);
});

test("isFlashcardDue is false for a mastered flashcard even with no schedule", () => {
  let state = createEmptyProgress();
  state = setFlashcardMastered(state, "tvm-fc-0", true);
  assert.equal(isFlashcardDue(state, "tvm-fc-0", Date.now()), false);
});

test("isFlashcardDue compares dueAt against now", () => {
  const now = 1000;
  let state = createEmptyProgress();
  state = reviewFlashcard(state, "tvm-fc-0", true, now);
  assert.equal(isFlashcardDue(state, "tvm-fc-0", now), false);
  assert.equal(
    isFlashcardDue(state, "tvm-fc-0", now + EBBINGHAUS_INTERVALS_DAYS[0] * DAY_MS),
    true
  );
});

test("reviewFlashcard with remembered=false resets to stage 0, due now", () => {
  const now = 5000;
  let state = createEmptyProgress();
  state = reviewFlashcard(state, "tvm-fc-0", true, now);
  state = reviewFlashcard(state, "tvm-fc-0", false, now + 1);
  assert.deepEqual(state.flashcards["tvm-fc-0"], {
    mastered: false,
    stage: 0,
    dueAt: now + 1,
  });
});

test("reviewFlashcard advances through all six intervals on repeated success", () => {
  let state = createEmptyProgress();
  let now = 0;
  for (let i = 0; i < EBBINGHAUS_INTERVALS_DAYS.length; i++) {
    state = reviewFlashcard(state, "tvm-fc-0", true, now);
    assert.equal(state.flashcards["tvm-fc-0"].stage, i + 1);
    assert.equal(
      state.flashcards["tvm-fc-0"].dueAt,
      now + EBBINGHAUS_INTERVALS_DAYS[i] * DAY_MS
    );
    assert.equal(state.flashcards["tvm-fc-0"].mastered, false);
    now = state.flashcards["tvm-fc-0"].dueAt;
  }
});

test("reviewFlashcard graduates on the 7th successful review, after the 30-day wait", () => {
  let state = createEmptyProgress();
  let now = 0;
  for (let i = 0; i < EBBINGHAUS_INTERVALS_DAYS.length; i++) {
    state = reviewFlashcard(state, "tvm-fc-0", true, now);
    now = state.flashcards["tvm-fc-0"].dueAt;
  }
  state = reviewFlashcard(state, "tvm-fc-0", true, now);
  assert.deepEqual(state.flashcards["tvm-fc-0"], {
    mastered: true,
    stage: EBBINGHAUS_INTERVALS_DAYS.length,
    dueAt: null,
  });
});

test("a graduated flashcard is never due again", () => {
  let state = createEmptyProgress();
  let now = 0;
  for (let i = 0; i < EBBINGHAUS_INTERVALS_DAYS.length; i++) {
    state = reviewFlashcard(state, "tvm-fc-0", true, now);
    now = state.flashcards["tvm-fc-0"].dueAt;
  }
  state = reviewFlashcard(state, "tvm-fc-0", true, now);
  assert.equal(isFlashcardDue(state, "tvm-fc-0", now + 1000 * DAY_MS), false);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test tests/progress.test.js`
Expected: FAIL — `EBBINGHAUS_INTERVALS_DAYS`/`getFlashcardSchedule`/`isFlashcardDue`/`reviewFlashcard` are not exported from `js/progress.js` yet.

- [ ] **Step 3: Implement the scheduling functions**

Add to `js/progress.js` (after the existing `isFlashcardMastered` function, before `recordAttempt`):

```js
export const EBBINGHAUS_INTERVALS_DAYS = [1, 2, 4, 7, 15, 30];

const DAY_MS = 24 * 60 * 60 * 1000;

export function getFlashcardSchedule(state, flashcardId) {
  const entry = state.flashcards[flashcardId];
  return {
    stage: (entry && entry.stage) || 0,
    dueAt: entry && entry.dueAt != null ? entry.dueAt : null,
    mastered: Boolean(entry && entry.mastered),
  };
}

export function isFlashcardDue(state, flashcardId, now) {
  const schedule = getFlashcardSchedule(state, flashcardId);
  if (schedule.mastered) return false;
  if (schedule.dueAt == null) return true;
  return schedule.dueAt <= now;
}

export function reviewFlashcard(state, flashcardId, remembered, now) {
  if (!remembered) {
    return {
      ...state,
      flashcards: {
        ...state.flashcards,
        [flashcardId]: { mastered: false, stage: 0, dueAt: now },
      },
    };
  }

  const current = getFlashcardSchedule(state, flashcardId);

  if (current.stage >= EBBINGHAUS_INTERVALS_DAYS.length) {
    return {
      ...state,
      flashcards: {
        ...state.flashcards,
        [flashcardId]: { mastered: true, stage: current.stage, dueAt: null },
      },
    };
  }

  return {
    ...state,
    flashcards: {
      ...state.flashcards,
      [flashcardId]: {
        mastered: false,
        stage: current.stage + 1,
        dueAt: now + EBBINGHAUS_INTERVALS_DAYS[current.stage] * DAY_MS,
      },
    },
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test tests/progress.test.js`
Expected: PASS, all tests including the new ones.

Also run the full suite to confirm nothing else broke: `node --test tests/*.test.js` — expected all green (33 tests: the existing 25 plus 8 new ones from this task).

- [ ] **Step 5: Commit**

```bash
git add js/progress.js tests/progress.test.js
git commit -m "Add Ebbinghaus flashcard scheduling functions to progress.js"
```

---

### Task 2: Extract shared `js/topic-loader.js`, refactor `wrong-book.js` to use it

**Files:**
- Create: `js/topic-loader.js`
- Modify: `js/wrong-book.js`

**Interfaces:**
- Produces (used by Task 3): `loadTopicModule(topicId, filename, globalName)` → `Promise<any>`, resolves to whatever `window[globalName]` is after evaluating the fetched file (may be `undefined` if the file doesn't set it — callers apply their own fallback).
- Consumes: none (pure refactor of existing inline logic).

This task has no new automated test (the code it touches, `wrong-book.js`, is DOM-rendering and has no existing unit tests — consistent with the rest of the codebase). Instead, this task's "test cycle" is: the full existing suite must stay green (proves no unrelated regression), and a manual smoke check of the wrong-book page confirms the refactor didn't change behavior.

- [ ] **Step 1: Create `js/topic-loader.js`**

```js
export async function loadTopicModule(topicId, filename, globalName) {
  const res = await fetch(`topics/${topicId}/${filename}`);
  const code = await res.text();
  const sandbox = {};
  const fn = new Function("window", `${code}\nreturn window.${globalName};`);
  return fn(sandbox);
}
```

- [ ] **Step 2: Refactor `js/wrong-book.js` to use it**

In `js/wrong-book.js`, replace the top of the file:

```js
import { TOPICS } from "./nav-data.js";
import { loadProgress } from "./app.js";
import { isCurrentlyWrong, getIncorrectCount } from "./progress.js";
import { renderQuiz } from "./quiz.js";

async function loadTopicQuestions(topicId) {
  const res = await fetch(`topics/${topicId}/questions.js`);
  const code = await res.text();
  const sandbox = {};
  const fn = new Function("window", `${code}\nreturn window.TOPIC_QUESTIONS;`);
  return fn(sandbox) || [];
}
```

with:

```js
import { TOPICS } from "./nav-data.js";
import { loadProgress } from "./app.js";
import { isCurrentlyWrong, getIncorrectCount } from "./progress.js";
import { renderQuiz } from "./quiz.js";
import { loadTopicModule } from "./topic-loader.js";
```

Then, further down in the same file, change the one call site from:

```js
    const questions = await loadTopicQuestions(topic.id);
```

to:

```js
    const questions = (await loadTopicModule(topic.id, "questions.js", "TOPIC_QUESTIONS")) || [];
```

- [ ] **Step 3: Run the full test suite to confirm no regression**

Run: `node --test tests/*.test.js`
Expected: PASS, same count as the end of Task 1 (no new tests added in this task).

- [ ] **Step 4: Manual smoke check**

Start the dev server (`node scripts/serve.js`, picking a free port if 8080 is busy, e.g. `PORT=8181 node scripts/serve.js`), open `wrong-book.html` in a browser, and confirm it still loads and behaves the same as before this refactor (shows wrong questions grouped by topic, or the "还没有错题" empty state if there are none). This is a behavior-preserving refactor — there should be no visible difference at all.

- [ ] **Step 5: Commit**

```bash
git add js/topic-loader.js js/wrong-book.js
git commit -m "Extract shared topic-module loader, refactor wrong-book.js to use it"
```

---

### Task 3: "今日复习" review page (`review.html` + `js/review.js`)

**Files:**
- Create: `js/review.js`
- Create: `review.html`

**Interfaces:**
- Consumes:
  - `TOPICS` from `js/nav-data.js`.
  - `loadProgress(state)`, `saveProgress(state)` from `js/app.js`.
  - `isFlashcardDue(state, flashcardId, now)`, `reviewFlashcard(state, flashcardId, remembered, now)` from `js/progress.js` (Task 1).
  - `loadTopicModule(topicId, filename, globalName)` from `js/topic-loader.js` (Task 2).
  - Each topic's `meta.js` sets `window.TOPIC_META` with a `flashcards` array of `{ front_en, back_zh }` objects (same shape `js/flashcard.js` already consumes). The flashcard id convention, already established in `js/flashcard.js`, is `` `${topicId}-fc-${i}` `` where `i` is the flashcard's index in that array.
- Produces: `renderReview(container)`, called by `review.html`.

No new unit tests for this task (DOM-rendering, consistent with `js/flashcard.js` and `js/wrong-book.js` having none). Verified by manual browser check in this task's own steps, and again as part of Task 4's final whole-feature check.

- [ ] **Step 1: Create `js/review.js`**

```js
import { TOPICS } from "./nav-data.js";
import { loadProgress, saveProgress } from "./app.js";
import { isFlashcardDue, reviewFlashcard } from "./progress.js";
import { loadTopicModule } from "./topic-loader.js";

export async function renderReview(container) {
  const heading = document.createElement("h1");
  heading.textContent = "今日复习(艾宾浩斯记忆曲线)";
  container.appendChild(heading);

  const loading = document.createElement("p");
  loading.className = "section-label";
  loading.textContent = "加载中...";
  container.appendChild(loading);

  let state = loadProgress();
  const now = Date.now();
  const due = [];

  for (const topic of TOPICS) {
    const meta = (await loadTopicModule(topic.id, "meta.js", "TOPIC_META")) || {};
    const flashcards = meta.flashcards || [];
    flashcards.forEach((card, i) => {
      const id = `${topic.id}-fc-${i}`;
      if (isFlashcardDue(state, id, now)) {
        due.push({ id, card, topic });
      }
    });
  }

  loading.remove();

  const summary = document.createElement("p");
  summary.className = "section-label";
  container.appendChild(summary);

  const cardArea = document.createElement("div");
  container.appendChild(cardArea);

  function render() {
    summary.textContent = `今日待复习 ${due.length} 张`;
    cardArea.innerHTML = "";

    if (due.length === 0) {
      const done = document.createElement("p");
      done.className = "section-label";
      done.textContent = "今天没有需要复习的卡片,明天再来";
      cardArea.appendChild(done);
      return;
    }

    const item = due[0];
    let flipped = false;

    const topicLabel = document.createElement("p");
    topicLabel.className = "section-label";
    topicLabel.textContent = `${item.topic.title_zh} (${item.topic.title_en})`;
    cardArea.appendChild(topicLabel);

    const cardEl = document.createElement("div");
    cardEl.className = "flashcard";
    function renderFace() {
      cardEl.textContent = flipped ? item.card.back_zh : item.card.front_en;
    }
    renderFace();
    cardEl.addEventListener("click", () => {
      flipped = !flipped;
      renderFace();
    });
    cardArea.appendChild(cardEl);

    const hint = document.createElement("p");
    hint.className = "flashcard-hint";
    hint.textContent = "点击卡片查看背面";
    cardArea.appendChild(hint);

    const controls = document.createElement("div");
    controls.className = "flashcard-controls";

    const notYetBtn = document.createElement("button");
    notYetBtn.textContent = "还不熟";
    notYetBtn.addEventListener("click", () => {
      state = reviewFlashcard(state, item.id, false, Date.now());
      saveProgress(state);
      due.shift();
      due.push(item);
      render();
    });

    const masteredBtn = document.createElement("button");
    masteredBtn.textContent = "记住了";
    masteredBtn.addEventListener("click", () => {
      state = reviewFlashcard(state, item.id, true, Date.now());
      saveProgress(state);
      due.shift();
      render();
    });

    controls.appendChild(notYetBtn);
    controls.appendChild(masteredBtn);
    cardArea.appendChild(controls);
  }

  render();
}
```

Note the "还不熟" handler pushes the reviewed item back onto the end of the in-memory `due` queue (rather than dropping it) so it resurfaces later in the same session, matching the design spec's "due again immediately" semantics — it is not re-fetched or re-filtered from `state`, just requeued in memory.

- [ ] **Step 2: Create `review.html`**

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>今日复习 · CFA L1 数量方法</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <div class="site-header"><a href="index.html">&larr; CFA L1 · 数量方法</a></div>
  <div class="page" id="review-root"></div>
  <script type="module">
    import { renderReview } from "./js/review.js";
    renderReview(document.getElementById("review-root"));
  </script>
</body>
</html>
```

- [ ] **Step 3: Run the full test suite to confirm no regression**

Run: `node --test tests/*.test.js`
Expected: PASS, same count as the end of Task 2 (no new automated tests added in this task).

- [ ] **Step 4: Manual browser verification**

Start the dev server (pick a free port if needed, e.g. `PORT=8181 node scripts/serve.js`) and open `review.html`. Confirm:
- The page loads and shows "今日待复习 N 张" with N > 0 (on a fresh/empty progress state, every topic's flashcards should be due, since none have a stored schedule yet).
- Clicking the card flips it between English front and Chinese back.
- Clicking "记住了" advances to the next due card and decrements the remaining count.
- Clicking "还不熟" on a card also advances to the next card, and (with more than one due card in the queue) that card reappears later in the same session.
- After working through all due cards, the "今天没有需要复习的卡片,明天再来" empty state appears.
- Reloading the page after marking some cards "记住了" shows a reduced due count (those cards are now scheduled for a future date, not due today).

- [ ] **Step 5: Commit**

```bash
git add js/review.js review.html
git commit -m "Add today's Ebbinghaus review page"
```

---

### Task 4: Homepage nav link and final feature verification

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: none new (a plain link to `review.html`, same pattern as the existing `wrong-book.html` link).

- [ ] **Step 1: Add the nav link**

In `index.html`, change:

```html
    <p><a href="calculators/tvm.html">TVM 计算器</a> · <a href="wrong-book.html">错题本</a></p>
```

to:

```html
    <p><a href="calculators/tvm.html">TVM 计算器</a> · <a href="wrong-book.html">错题本</a> · <a href="review.html">今日复习</a></p>
```

- [ ] **Step 2: Run the full test suite**

Run: `node --test tests/*.test.js`
Expected: PASS, same count as the end of Task 3 (no new automated tests added in this task).

- [ ] **Step 3: Manual verification of the whole feature**

Start the dev server and, from `index.html`, confirm:
- The new "今日复习" link is present and navigates to `review.html`.
- On `review.html`, repeat the checks from Task 3 Step 4 once more end-to-end (this confirms the homepage entry point works, not just direct navigation to `review.html`).
- Open `wrong-book.html` once more directly and confirm it still works (final regression check on Task 2's refactor).
- Open any one topic page (e.g. `topics/tvm/index.html`) and confirm its "翻卡片" section still works exactly as before (记住了/还不熟 toggle the existing mastered flag, "只看未掌握" filter still works) — this confirms Task 1's additive `progress.js` changes didn't disturb the existing per-topic flashcard browser.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Add today's-review nav link to homepage"
```

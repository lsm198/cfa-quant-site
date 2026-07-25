# CFA L1 数量方法学习小站 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone, zero-dependency static HTML/CSS/JS site for studying CFA Level 1 Quantitative Methods, with 11 knowledge-point pages (bilingual content, flashcards, self-test quiz), a TVM calculator, localStorage progress tracking, and a one-time semi-automated import of 93 real exam questions from the user's docx files.

**Architecture:** Plain static files served via `file://` or any static server — no build step. Shared browser logic lives in ES modules under `js/` (pure logic separated from DOM glue so the pure parts are unit-testable with Node's built-in test runner). Each knowledge point has a hand-authored `meta.js` (concepts/vocabulary/mnemonics/essence — never touched by scripts) and a machine-generated `questions.js` (written only by the one-time import script). A Node script (`scripts/import-quant-questions.js`) converts the user's two docx files to text via macOS `textutil`, pairs question stems with solutions by ordinal number, classifies each into one of the 11 knowledge points by LOS keyword matching, and writes the 11 `questions.js` files.

**Tech Stack:** Vanilla HTML/CSS/JS (ES modules, no bundler), Node.js (v24 available) only for the one-time import script and `node --test` unit tests, KaTeX (vendored locally, no CDN) for formula rendering, macOS `textutil` for docx→txt conversion.

## Global Constraints

- Zero npm dependencies, zero build tooling — every browser file must work when opened directly via `file://`.
- Palette is locked (from approved design spec): background `#eef1f5`, header background `#dce3ea`, header/title text `#34506b`, body text `#2c3e50`, card border `#d7dee5`, muted label text `#5b7d9a`, correct/selected background `#d7e6f0` with border `#7fa8c9` and text `#204060`.
- Knowledge-point content structure is fixed and must render in this order: 本质 (essence) → 详细讲解 (concepts) → 高频词汇 (vocabulary) → 记忆口诀 (mnemonics) → 考试怎么考 (exam pattern) → 翻卡片 → 练习题.
- The 11 knowledge point ids/order (from design spec): `rates-returns`, `tvm`, `stats-returns`, `probability-trees`, `portfolio-math`, `simulation`, `sampling-estimation`, `hypothesis-testing`, `tests-independence`, `regression`, `big-data`.
- Question stems/choices/explanations stay in English (original CFA wording); a short `explanation_zh` is added for quick understanding. Knowledge-point explanations are Chinese-first with English terms annotated.
- `data.js`-equivalent files that are machine-generated (`questions.js`) must never be hand-edited — the import script fully regenerates them.
- Source docx files (read-only, never modified): `/Users/liushiming/Downloads/1000题和答案_Word版/CFA L11000题.docx` and `/Users/liushiming/Downloads/1000题和答案_Word版/数量分析.docx`.
- Project root: `/Users/liushiming/cfa-quant-site` (already a git repo with the design spec committed at `docs/superpowers/specs/2026-07-25-cfa-quant-site-design.md`).

---

### Task 1: Project scaffold — nav data, palette CSS, homepage

**Files:**
- Create: `js/nav-data.js`
- Create: `css/style.css`
- Create: `index.html`

**Interfaces:**
- Produces: `js/nav-data.js` exports `export const TOPICS = [{ id, title_zh, title_en }, ...]` (11 entries, in the fixed order from Global Constraints) — every later task that renders navigation or looks up a topic's title imports this.
- Produces: `css/style.css` class names used by later tasks: `.page`, `.site-header`, `.topic-nav`, `.card`, `.section-label`, `.flashcard`, `.flashcard-controls`, `.quiz-question`, `.quiz-choice`, `.quiz-choice.correct`, `.quiz-choice.incorrect`, `.quiz-explanation`, `.quiz-accuracy`, `.storage-banner`, `.calculator-form`.

- [ ] **Step 1: Create `js/nav-data.js`**

```js
export const TOPICS = [
  { id: "rates-returns", title_zh: "收益率衡量", title_en: "Rates and Returns" },
  { id: "tvm", title_zh: "货币时间价值应用", title_en: "Time Value of Money in Finance" },
  { id: "stats-returns", title_zh: "资产收益的统计度量", title_en: "Statistical Measures of Asset Returns" },
  { id: "probability-trees", title_zh: "概率树与条件期望", title_en: "Probability Trees and Conditional Expectations" },
  { id: "portfolio-math", title_zh: "组合数学", title_en: "Portfolio Mathematics" },
  { id: "simulation", title_zh: "模拟方法", title_en: "Simulation Methods" },
  { id: "sampling-estimation", title_zh: "抽样与估计", title_en: "Estimation and Inference" },
  { id: "hypothesis-testing", title_zh: "假设检验", title_en: "Hypothesis Testing" },
  { id: "tests-independence", title_zh: "独立性的参数与非参数检验", title_en: "Parametric and Non-Parametric Tests of Independence" },
  { id: "regression", title_zh: "简单线性回归", title_en: "Simple Linear Regression" },
  { id: "big-data", title_zh: "大数据技术导论", title_en: "Introduction to Big Data Techniques" },
];
```

- [ ] **Step 2: Create `css/style.css`**

```css
:root {
  --bg: #eef1f5;
  --header-bg: #dce3ea;
  --header-text: #34506b;
  --body-text: #2c3e50;
  --card-border: #d7dee5;
  --muted: #5b7d9a;
  --selected-bg: #d7e6f0;
  --selected-border: #7fa8c9;
  --selected-text: #204060;
  --correct-bg: #dcead9;
  --correct-border: #8fbf98;
  --correct-text: #2f5233;
  --incorrect-bg: #f5dede;
  --incorrect-border: #c98f8f;
  --incorrect-text: #602020;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--bg);
  color: var(--body-text);
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Segoe UI", sans-serif;
  line-height: 1.7;
}

.page {
  max-width: 760px;
  margin: 0 auto;
  padding: 0 20px 60px;
}

.site-header {
  background: var(--header-bg);
  color: var(--header-text);
  padding: 16px 20px;
  margin-bottom: 24px;
  font-weight: 600;
}

.site-header a {
  color: var(--header-text);
  text-decoration: none;
}

.topic-nav {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 10px;
}

.topic-nav a {
  display: block;
  background: #ffffff;
  border: 1px solid var(--card-border);
  border-radius: 8px;
  padding: 14px 16px;
  color: var(--body-text);
  text-decoration: none;
}

.topic-nav a:hover {
  border-color: var(--selected-border);
}

.card {
  background: #ffffff;
  border: 1px solid var(--card-border);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.section-label {
  font-size: 12px;
  letter-spacing: 0.05em;
  color: var(--muted);
  font-weight: 600;
  margin-bottom: 6px;
  text-transform: uppercase;
}

.flashcard {
  background: #ffffff;
  border: 1px solid var(--card-border);
  border-radius: 8px;
  padding: 24px;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  font-size: 16px;
}

.flashcard-controls {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.flashcard-controls button,
.calculator-form button,
.quiz-choice {
  font: inherit;
  cursor: pointer;
  border-radius: 6px;
  border: 1px solid var(--card-border);
  background: #ffffff;
  padding: 8px 14px;
}

.quiz-question {
  background: #ffffff;
  border: 1px solid var(--card-border);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.quiz-choices {
  display: grid;
  gap: 6px;
  margin-top: 10px;
}

.quiz-choice {
  text-align: left;
}

.quiz-choice.correct {
  background: var(--correct-bg);
  border-color: var(--correct-border);
  color: var(--correct-text);
}

.quiz-choice.incorrect {
  background: var(--incorrect-bg);
  border-color: var(--incorrect-border);
  color: var(--incorrect-text);
}

.quiz-explanation {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--card-border);
  font-size: 14px;
}

.quiz-accuracy {
  color: var(--muted);
  font-size: 14px;
}

.storage-banner {
  background: var(--incorrect-bg);
  color: var(--incorrect-text);
  padding: 10px 20px;
  text-align: center;
  font-size: 14px;
}

.calculator-form {
  display: grid;
  gap: 10px;
  max-width: 320px;
}

.calculator-form label {
  display: grid;
  gap: 4px;
  font-size: 14px;
}

.calculator-form input {
  font: inherit;
  padding: 8px;
  border: 1px solid var(--card-border);
  border-radius: 6px;
}
```

- [ ] **Step 3: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8" />
  <title>CFA L1 数量方法</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <div class="site-header">CFA L1 · 数量方法</div>
  <div class="page">
    <p id="storage-tools"></p>
    <ul class="topic-nav" id="topic-nav"></ul>
  </div>
  <script type="module">
    import { TOPICS } from "./js/nav-data.js";
    const nav = document.getElementById("topic-nav");
    for (const topic of TOPICS) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `topics/${topic.id}/index.html`;
      a.textContent = `${topic.title_zh} (${topic.title_en})`;
      li.appendChild(a);
      nav.appendChild(li);
    }
  </script>
</body>
</html>
```

- [ ] **Step 4: Manually verify in a browser**

Run: `open /Users/liushiming/cfa-quant-site/index.html`
Expected: page background is light blue-gray, header bar shows "CFA L1 · 数量方法", and 11 links are listed in the exact order from `TOPICS` (each link will 404 until Task 4 — that's expected right now).

- [ ] **Step 5: Commit**

```bash
cd /Users/liushiming/cfa-quant-site
git add js/nav-data.js css/style.css index.html
git commit -m "Scaffold homepage, nav data, and locked palette CSS"
```

---

### Task 2: `progress.js` — pure progress-tracking logic + unit tests

**Files:**
- Create: `js/progress.js`
- Test: `tests/progress.test.js`

**Interfaces:**
- Consumes: nothing (pure module, no DOM, no localStorage).
- Produces: `createEmptyProgress()`, `parseProgress(json: string|null) -> state`, `serializeProgress(state) -> string`, `setFlashcardMastered(state, flashcardId, mastered) -> state`, `isFlashcardMastered(state, flashcardId) -> boolean`, `recordAttempt(state, questionId, correct, ts) -> state`, `computeAccuracy(state, questionIds: string[]) -> number|null`. Task 3 (`app.js`) and Task 5/6 (`flashcard.js`/`quiz.js`) import all of these by exact name.

- [ ] **Step 1: Write the failing tests**

Create `tests/progress.test.js`:

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  createEmptyProgress,
  parseProgress,
  serializeProgress,
  setFlashcardMastered,
  isFlashcardMastered,
  recordAttempt,
  computeAccuracy,
} from "../js/progress.js";

test("createEmptyProgress returns empty maps", () => {
  assert.deepEqual(createEmptyProgress(), { flashcards: {}, questions: {} });
});

test("parseProgress returns empty state for null input", () => {
  assert.deepEqual(parseProgress(null), createEmptyProgress());
});

test("parseProgress round-trips through serializeProgress", () => {
  let state = createEmptyProgress();
  state = setFlashcardMastered(state, "tvm-fc-0", true);
  const json = serializeProgress(state);
  assert.deepEqual(parseProgress(json), state);
});

test("setFlashcardMastered and isFlashcardMastered", () => {
  let state = createEmptyProgress();
  assert.equal(isFlashcardMastered(state, "tvm-fc-0"), false);
  state = setFlashcardMastered(state, "tvm-fc-0", true);
  assert.equal(isFlashcardMastered(state, "tvm-fc-0"), true);
  state = setFlashcardMastered(state, "tvm-fc-0", false);
  assert.equal(isFlashcardMastered(state, "tvm-fc-0"), false);
});

test("recordAttempt appends attempts without losing prior ones", () => {
  let state = createEmptyProgress();
  state = recordAttempt(state, "tvm-001", false, 100);
  state = recordAttempt(state, "tvm-001", true, 200);
  assert.deepEqual(state.questions["tvm-001"].attempts, [
    { correct: false, ts: 100 },
    { correct: true, ts: 200 },
  ]);
});

test("computeAccuracy returns null when nothing attempted", () => {
  const state = createEmptyProgress();
  assert.equal(computeAccuracy(state, ["tvm-001", "tvm-002"]), null);
});

test("computeAccuracy uses only the latest attempt per question", () => {
  let state = createEmptyProgress();
  state = recordAttempt(state, "tvm-001", false, 100);
  state = recordAttempt(state, "tvm-001", true, 200); // latest attempt for tvm-001 is correct
  state = recordAttempt(state, "tvm-002", false, 100); // latest attempt for tvm-002 is wrong
  assert.equal(computeAccuracy(state, ["tvm-001", "tvm-002"]), 50);
});

test("computeAccuracy ignores questions never attempted", () => {
  let state = createEmptyProgress();
  state = recordAttempt(state, "tvm-001", true, 100);
  assert.equal(computeAccuracy(state, ["tvm-001", "tvm-002", "tvm-003"]), 100);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test tests/progress.test.js`
Expected: FAIL — `Cannot find module '../js/progress.js'`

- [ ] **Step 3: Write `js/progress.js`**

```js
export function createEmptyProgress() {
  return { flashcards: {}, questions: {} };
}

export function parseProgress(json) {
  if (!json) return createEmptyProgress();
  const parsed = JSON.parse(json);
  return {
    flashcards: parsed.flashcards || {},
    questions: parsed.questions || {},
  };
}

export function serializeProgress(state) {
  return JSON.stringify(state);
}

export function setFlashcardMastered(state, flashcardId, mastered) {
  return {
    ...state,
    flashcards: { ...state.flashcards, [flashcardId]: { mastered } },
  };
}

export function isFlashcardMastered(state, flashcardId) {
  return Boolean(state.flashcards[flashcardId] && state.flashcards[flashcardId].mastered);
}

export function recordAttempt(state, questionId, correct, ts) {
  const existing = (state.questions[questionId] && state.questions[questionId].attempts) || [];
  return {
    ...state,
    questions: {
      ...state.questions,
      [questionId]: { attempts: [...existing, { correct, ts }] },
    },
  };
}

export function computeAccuracy(state, questionIds) {
  let total = 0;
  let correctCount = 0;
  for (const id of questionIds) {
    const attempts = (state.questions[id] && state.questions[id].attempts) || [];
    if (attempts.length === 0) continue;
    total += 1;
    if (attempts[attempts.length - 1].correct) correctCount += 1;
  }
  if (total === 0) return null;
  return Math.round((correctCount / total) * 100);
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test tests/progress.test.js`
Expected: PASS — all 7 tests green

- [ ] **Step 5: Commit**

```bash
git add js/progress.js tests/progress.test.js
git commit -m "Add pure progress-tracking logic with unit tests"
```

---

### Task 3: `app.js` — localStorage glue, storage banner, export/import

**Files:**
- Create: `js/app.js`
- Modify: `index.html`

**Interfaces:**
- Consumes: `createEmptyProgress`, `parseProgress`, `serializeProgress` from `js/progress.js` (Task 2).
- Produces: `isStorageAvailable()`, `loadProgress()`, `saveProgress(state) -> boolean`, `exportProgressFile(state)`, `importProgressFile(file, onLoaded)`, `renderStorageBanner()`. Tasks 5, 6, and the homepage import these by exact name.

- [ ] **Step 1: Write `js/app.js`**

```js
import { createEmptyProgress, parseProgress, serializeProgress } from "./progress.js";

const STORAGE_KEY = "cfa-quant-progress";

export function isStorageAvailable() {
  try {
    const testKey = "__cfa_quant_storage_test__";
    localStorage.setItem(testKey, "1");
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function loadProgress() {
  if (!isStorageAvailable()) return createEmptyProgress();
  return parseProgress(localStorage.getItem(STORAGE_KEY));
}

export function saveProgress(state) {
  if (!isStorageAvailable()) return false;
  localStorage.setItem(STORAGE_KEY, serializeProgress(state));
  return true;
}

export function exportProgressFile(state) {
  const blob = new Blob([serializeProgress(state)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "cfa-quant-progress.json";
  a.click();
  URL.revokeObjectURL(url);
}

export function importProgressFile(file, onLoaded) {
  const reader = new FileReader();
  reader.onload = () => {
    const state = parseProgress(reader.result);
    saveProgress(state);
    onLoaded(state);
  };
  reader.readAsText(file);
}

export function renderStorageBanner() {
  if (isStorageAvailable()) return;
  const banner = document.createElement("div");
  banner.className = "storage-banner";
  banner.textContent = "当前浏览器不支持本地存储,练习记录不会保存。";
  document.body.prepend(banner);
}

export function renderBackupControls(container) {
  renderStorageBanner();

  const exportBtn = document.createElement("button");
  exportBtn.textContent = "导出进度 JSON";
  exportBtn.addEventListener("click", () => exportProgressFile(loadProgress()));

  const importLabel = document.createElement("label");
  importLabel.textContent = "导入进度 JSON: ";
  const importInput = document.createElement("input");
  importInput.type = "file";
  importInput.accept = "application/json";
  importInput.addEventListener("change", () => {
    const file = importInput.files[0];
    if (!file) return;
    importProgressFile(file, () => {
      alert("导入完成");
    });
  });
  importLabel.appendChild(importInput);

  container.appendChild(exportBtn);
  container.appendChild(importLabel);
}
```

- [ ] **Step 2: Wire it into the homepage**

In `index.html`, replace the `<script type="module">` block with:

```html
  <script type="module">
    import { TOPICS } from "./js/nav-data.js";
    import { renderBackupControls } from "./js/app.js";

    const nav = document.getElementById("topic-nav");
    for (const topic of TOPICS) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `topics/${topic.id}/index.html`;
      a.textContent = `${topic.title_zh} (${topic.title_en})`;
      li.appendChild(a);
      nav.appendChild(li);
    }

    renderBackupControls(document.getElementById("storage-tools"));
  </script>
```

- [ ] **Step 3: Manually verify in a browser**

Run: `open /Users/liushiming/cfa-quant-site/index.html`
Expected: a "导出进度 JSON" button and a "导入进度 JSON" file picker appear above the topic list. Click "导出进度 JSON" — a `cfa-quant-progress.json` file downloads containing `{"flashcards":{},"questions":{}}`. No storage-unavailable banner appears (localStorage is available in a normal browser tab).

- [ ] **Step 4: Commit**

```bash
git add js/app.js index.html
git commit -m "Add localStorage progress glue and export/import controls"
```

---

### Task 4: Topic page renderer + scaffold all 11 knowledge-point folders

**Files:**
- Create: `js/topic-page.js`
- Create: `topics/<id>/meta.js` (11 files, one per topic in `TOPICS`)
- Create: `topics/<id>/questions.js` (11 files, one per topic)
- Create: `topics/<id>/index.html` (11 files, one per topic)

**Interfaces:**
- Consumes: `TOPICS` from `js/nav-data.js` (Task 1).
- Produces: `renderTopicPage(container, meta, questions) -> { flashcardContainer: Element, quizContainer: Element }` — Tasks 5 and 6 call `renderFlashcards`/`renderQuiz` on the returned containers. `window.TOPIC_META` shape: `{ id, title_zh, title_en, essence_zh, exam_pattern_zh, vocabulary: [{term_en, meaning_zh}], mnemonics: [{title_zh, content_zh}], concepts: [{term_en, explain_zh, formula}], flashcards: [{front_en, back_zh}] }`. `window.TOPIC_QUESTIONS` shape: `[{id, stem_en, choices_en: string[], answer: "A"|"B"|"C", explanation_en, explanation_zh, los}]`.

- [ ] **Step 1: Write `js/topic-page.js`**

```js
function renderTextSection(container, label, text) {
  if (!text) return;
  const label_el = document.createElement("div");
  label_el.className = "section-label";
  label_el.textContent = label;
  const body = document.createElement("p");
  body.textContent = text;
  const card = document.createElement("div");
  card.className = "card";
  card.appendChild(label_el);
  card.appendChild(body);
  container.appendChild(card);
}

function renderConcepts(container, concepts) {
  if (!concepts || concepts.length === 0) return;
  const label_el = document.createElement("div");
  label_el.className = "section-label";
  label_el.textContent = "详细讲解";
  const card = document.createElement("div");
  card.className = "card";
  card.appendChild(label_el);
  for (const concept of concepts) {
    const block = document.createElement("div");
    const term = document.createElement("strong");
    term.textContent = concept.term_en;
    block.appendChild(term);
    if (concept.explain_zh) {
      const p = document.createElement("p");
      p.textContent = concept.explain_zh;
      block.appendChild(p);
    }
    if (concept.formula) {
      const formulaEl = document.createElement("p");
      formulaEl.className = "formula";
      formulaEl.textContent = concept.formula;
      formulaEl.dataset.katex = concept.formula;
      block.appendChild(formulaEl);
    }
    card.appendChild(block);
  }
  container.appendChild(card);
}

function renderVocabulary(container, vocabulary) {
  if (!vocabulary || vocabulary.length === 0) return;
  const label_el = document.createElement("div");
  label_el.className = "section-label";
  label_el.textContent = "高频词汇";
  const card = document.createElement("div");
  card.className = "card";
  card.appendChild(label_el);
  const table = document.createElement("table");
  for (const item of vocabulary) {
    const row = document.createElement("tr");
    const termCell = document.createElement("td");
    termCell.textContent = item.term_en;
    const meaningCell = document.createElement("td");
    meaningCell.textContent = item.meaning_zh;
    row.appendChild(termCell);
    row.appendChild(meaningCell);
    table.appendChild(row);
  }
  card.appendChild(table);
  container.appendChild(card);
}

function renderMnemonics(container, mnemonics) {
  if (!mnemonics || mnemonics.length === 0) return;
  const label_el = document.createElement("div");
  label_el.className = "section-label";
  label_el.textContent = "记忆口诀";
  const card = document.createElement("div");
  card.className = "card";
  card.appendChild(label_el);
  for (const item of mnemonics) {
    const block = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = item.title_zh;
    const content = document.createElement("p");
    content.textContent = item.content_zh;
    block.appendChild(title);
    block.appendChild(content);
    card.appendChild(block);
  }
  container.appendChild(card);
}

export function renderTopicPage(container, meta, questions) {
  const heading = document.createElement("h1");
  heading.textContent = `${meta.title_zh} (${meta.title_en})`;
  container.appendChild(heading);

  renderTextSection(container, "本质", meta.essence_zh);
  renderConcepts(container, meta.concepts);
  renderVocabulary(container, meta.vocabulary);
  renderMnemonics(container, meta.mnemonics);
  renderTextSection(container, "考试怎么考", meta.exam_pattern_zh);

  const flashcardLabel = document.createElement("div");
  flashcardLabel.className = "section-label";
  flashcardLabel.textContent = "翻卡片";
  container.appendChild(flashcardLabel);
  const flashcardContainer = document.createElement("div");
  container.appendChild(flashcardContainer);

  const quizLabel = document.createElement("div");
  quizLabel.className = "section-label";
  quizLabel.textContent = "练习题";
  container.appendChild(quizLabel);
  const quizContainer = document.createElement("div");
  container.appendChild(quizContainer);

  return { flashcardContainer, quizContainer };
}
```

- [ ] **Step 2: Generate the 11 topic folders**

Run this one-off Node command from the project root to scaffold every topic folder (it reads `js/nav-data.js`, so it must run after Task 1):

```bash
cd /Users/liushiming/cfa-quant-site
node --input-type=module -e '
import { TOPICS } from "./js/nav-data.js";
import { mkdirSync, writeFileSync } from "node:fs";

for (const topic of TOPICS) {
  const dir = `topics/${topic.id}`;
  mkdirSync(dir, { recursive: true });

  const meta = {
    id: topic.id,
    title_zh: topic.title_zh,
    title_en: topic.title_en,
    essence_zh: "",
    exam_pattern_zh: "",
    vocabulary: [],
    mnemonics: [],
    concepts: [],
    flashcards: [],
  };
  writeFileSync(`${dir}/meta.js`, `window.TOPIC_META = ${JSON.stringify(meta, null, 2)};\n`);
  writeFileSync(`${dir}/questions.js`, "window.TOPIC_QUESTIONS = [];\n");

  const html = `<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8" />
  <title>${topic.title_zh} · CFA L1 数量方法</title>
  <link rel="stylesheet" href="../../css/style.css" />
</head>
<body>
  <div class="site-header"><a href="../../index.html">&larr; CFA L1 · 数量方法</a></div>
  <div class="page" id="topic-root"></div>
  <script src="meta.js"></script>
  <script src="questions.js"></script>
  <script type="module">
    import { renderTopicPage } from "../../js/topic-page.js";
    import { renderFlashcards } from "../../js/flashcard.js";
    import { renderQuiz } from "../../js/quiz.js";

    const root = document.getElementById("topic-root");
    const { flashcardContainer, quizContainer } = renderTopicPage(root, window.TOPIC_META, window.TOPIC_QUESTIONS);
    renderFlashcards(flashcardContainer, window.TOPIC_META.flashcards, window.TOPIC_META.id);
    renderQuiz(quizContainer, window.TOPIC_QUESTIONS, window.TOPIC_META.id);
  </script>
</body>
</html>
`;
  writeFileSync(`${dir}/index.html`, html);
  console.log(`scaffolded ${dir}`);
}
'
```

Expected output: 11 lines like `scaffolded topics/rates-returns`, one per topic id.

Note: this generated `index.html` references `js/flashcard.js` and `js/quiz.js`, which do not exist until Tasks 5 and 6. That's expected — Step 3 below only checks that the page renders the meta sections; flashcard/quiz containers will show a browser console error until those tasks land, which is fine to leave failing at this checkpoint.

- [ ] **Step 3: Manually verify one topic page**

Temporarily edit `topics/tvm/meta.js` to set `essence_zh: "本质是给未来或过去的现金流找一个统一时点上可比的价值。"` and re-open the page:

Run: `open /Users/liushiming/cfa-quant-site/topics/tvm/index.html`
Expected: heading shows "货币时间价值应用 (Time Value of Money in Finance)", the "本质" card shows the sentence you set. A console error about missing `flashcard.js`/`quiz.js` is expected and fine. Revert `essence_zh` back to `""` afterward (it's regenerated content, not meant to be hand-set yet).

- [ ] **Step 4: Commit**

```bash
git add js/topic-page.js topics/
git commit -m "Add topic page renderer and scaffold all 11 knowledge-point folders"
```

---

### Task 5: `flashcard.js` engine

**Files:**
- Create: `js/flashcard.js`
- Create: `tests/manual/flashcard-preview.html`

**Interfaces:**
- Consumes: `loadProgress`, `saveProgress` from `js/app.js` (Task 3); `setFlashcardMastered`, `isFlashcardMastered` from `js/progress.js` (Task 2).
- Produces: `renderFlashcards(container: Element, flashcards: Array<{front_en, back_zh}>, topicId: string)`. Consumed by every `topics/<id>/index.html` (Task 4).

- [ ] **Step 1: Write `js/flashcard.js`**

```js
import { loadProgress, saveProgress } from "./app.js";
import { setFlashcardMastered, isFlashcardMastered } from "./progress.js";

export function renderFlashcards(container, flashcards, topicId) {
  if (!flashcards || flashcards.length === 0) {
    const empty = document.createElement("p");
    empty.className = "section-label";
    empty.textContent = "暂无卡片";
    container.appendChild(empty);
    return;
  }

  let state = loadProgress();
  let showOnlyUnmastered = false;
  let index = 0;

  function idFor(i) {
    return `${topicId}-fc-${i}`;
  }

  function visibleIndices() {
    return flashcards
      .map((_, i) => i)
      .filter((i) => !showOnlyUnmastered || !isFlashcardMastered(state, idFor(i)));
  }

  function render() {
    const indices = visibleIndices();
    container.innerHTML = "";

    const toggleLabel = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = showOnlyUnmastered;
    checkbox.addEventListener("change", () => {
      showOnlyUnmastered = checkbox.checked;
      index = 0;
      render();
    });
    toggleLabel.appendChild(checkbox);
    toggleLabel.appendChild(document.createTextNode(" 只看未掌握"));
    container.appendChild(toggleLabel);

    if (indices.length === 0) {
      const done = document.createElement("p");
      done.className = "section-label";
      done.textContent = "全部已掌握";
      container.appendChild(done);
      return;
    }

    if (index >= indices.length) index = 0;
    const cardIndex = indices[index];
    const card = flashcards[cardIndex];
    const cardId = idFor(cardIndex);

    let flipped = false;
    const cardEl = document.createElement("div");
    cardEl.className = "flashcard";
    function renderFace() {
      cardEl.textContent = flipped ? card.back_zh : card.front_en;
    }
    renderFace();
    cardEl.addEventListener("click", () => {
      flipped = !flipped;
      renderFace();
    });
    container.appendChild(cardEl);

    const controls = document.createElement("div");
    controls.className = "flashcard-controls";

    const notYetBtn = document.createElement("button");
    notYetBtn.textContent = "还不熟";
    notYetBtn.addEventListener("click", () => {
      state = setFlashcardMastered(state, cardId, false);
      saveProgress(state);
      index += 1;
      render();
    });

    const masteredBtn = document.createElement("button");
    masteredBtn.textContent = "记住了";
    masteredBtn.addEventListener("click", () => {
      state = setFlashcardMastered(state, cardId, true);
      saveProgress(state);
      index += 1;
      render();
    });

    controls.appendChild(notYetBtn);
    controls.appendChild(masteredBtn);
    container.appendChild(controls);
  }

  render();
}
```

- [ ] **Step 2: Create a manual preview harness**

Create `tests/manual/flashcard-preview.html`:

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8" />
  <title>flashcard.js preview</title>
  <link rel="stylesheet" href="../../css/style.css" />
</head>
<body>
  <div class="page" id="root"></div>
  <script type="module">
    import { renderFlashcards } from "../../js/flashcard.js";

    const fixture = [
      { front_en: "Holding Period Return (HPR)", back_zh: "R = (P1 - P0 + D) / P0" },
      { front_en: "Money-weighted rate of return", back_zh: "内部收益率(IRR),让现金流现值之和为零的折现率" },
      { front_en: "Time-weighted rate of return", back_zh: "几何平均每期收益率,不受资金进出时点影响" },
    ];
    renderFlashcards(document.getElementById("root"), fixture, "preview");
  </script>
</body>
</html>
```

- [ ] **Step 3: Manually verify**

Run: `open /Users/liushiming/cfa-quant-site/tests/manual/flashcard-preview.html`
Expected: one card shows "Holding Period Return (HPR)"; clicking it flips to show "R = (P1 - P0 + D) / P0"; clicking "记住了" advances to the next card; checking "只看未掌握" and reloading the page (state persists via localStorage) hides the card you marked mastered.

- [ ] **Step 4: Commit**

```bash
git add js/flashcard.js tests/manual/flashcard-preview.html
git commit -m "Add flashcard engine with manual preview harness"
```

---

### Task 6: `quiz.js` engine

**Files:**
- Create: `js/quiz.js`
- Create: `tests/manual/quiz-preview.html`

**Interfaces:**
- Consumes: `loadProgress`, `saveProgress` from `js/app.js` (Task 3); `recordAttempt`, `computeAccuracy` from `js/progress.js` (Task 2).
- Produces: `renderQuiz(container: Element, questions: Array<{id, stem_en, choices_en, answer, explanation_en, explanation_zh}>, topicId: string)`. Consumed by every `topics/<id>/index.html` (Task 4).

- [ ] **Step 1: Write `js/quiz.js`**

```js
import { loadProgress, saveProgress } from "./app.js";
import { recordAttempt, computeAccuracy } from "./progress.js";

export function renderQuiz(container, questions, topicId) {
  if (!questions || questions.length === 0) {
    const empty = document.createElement("p");
    empty.className = "section-label";
    empty.textContent = "暂无练习题";
    container.appendChild(empty);
    return;
  }

  let state = loadProgress();

  function idFor(i) {
    return questions[i].id || `${topicId}-q-${i}`;
  }

  function accuracyLabel() {
    const ids = questions.map((_, i) => idFor(i));
    const acc = computeAccuracy(state, ids);
    return acc === null ? "正确率: 还没做题" : `正确率: ${acc}%`;
  }

  const accuracyEl = document.createElement("p");
  accuracyEl.className = "quiz-accuracy";
  accuracyEl.textContent = accuracyLabel();
  container.appendChild(accuracyEl);

  questions.forEach((question, i) => {
    const qId = idFor(i);
    const qEl = document.createElement("div");
    qEl.className = "quiz-question";

    const stem = document.createElement("p");
    stem.textContent = question.stem_en;
    qEl.appendChild(stem);

    const choicesEl = document.createElement("div");
    choicesEl.className = "quiz-choices";

    const explanation = document.createElement("div");
    explanation.className = "quiz-explanation";
    explanation.style.display = "none";
    const enP = document.createElement("p");
    enP.textContent = question.explanation_en || "";
    explanation.appendChild(enP);
    if (question.explanation_zh) {
      const zhP = document.createElement("p");
      zhP.textContent = question.explanation_zh;
      explanation.appendChild(zhP);
    }

    question.choices_en.forEach((choiceText) => {
      const letter = choiceText.trim().charAt(0);
      const btn = document.createElement("button");
      btn.className = "quiz-choice";
      btn.textContent = choiceText;
      btn.addEventListener("click", () => {
        const correct = letter === question.answer;
        btn.classList.add(correct ? "correct" : "incorrect");
        Array.from(choicesEl.children).forEach((b) => (b.disabled = true));
        explanation.style.display = "block";
        state = recordAttempt(state, qId, correct, Date.now());
        saveProgress(state);
        accuracyEl.textContent = accuracyLabel();
      });
      choicesEl.appendChild(btn);
    });

    qEl.appendChild(choicesEl);
    qEl.appendChild(explanation);
    container.appendChild(qEl);
  });
}
```

- [ ] **Step 2: Create a manual preview harness**

Create `tests/manual/quiz-preview.html`:

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8" />
  <title>quiz.js preview</title>
  <link rel="stylesheet" href="../../css/style.css" />
</head>
<body>
  <div class="page" id="root"></div>
  <script type="module">
    import { renderQuiz } from "../../js/quiz.js";

    const fixture = [
      {
        id: "preview-001",
        stem_en: "An investor purchases a stock for $100. Immediately after receiving a dividend of $7, the investor sells the stock for $107. The holding period return of the investment is closest to:",
        choices_en: ["A. 0%.", "B. 7%.", "C. 14%."],
        answer: "C",
        explanation_en: "Correct because R = (P1 - P0 + D) / P0 = (107 - 100 + 7) / 100 = 14%.",
        explanation_zh: "持有期收益率 = (卖出价 - 买入价 + 股息) / 买入价 = 14%。",
      },
    ];
    renderQuiz(document.getElementById("root"), fixture, "preview");
  </script>
</body>
</html>
```

- [ ] **Step 3: Manually verify**

Run: `open /Users/liushiming/cfa-quant-site/tests/manual/quiz-preview.html`
Expected: "正确率: 还没做题" shows above the question. Clicking choice B turns it red (incorrect) and choice C is not yet marked. Reload the page and click choice C — it turns green, the bilingual explanation appears below, and the accuracy line updates to "正确率: 100%" (since the latest attempt is used and prior wrong click was on a different browser session if not reloaded — verify by clicking B then C in the same load: B turns red, both buttons then disable, so re-open the file fresh to test C alone reaching 100%).

- [ ] **Step 4: Commit**

```bash
git add js/quiz.js tests/manual/quiz-preview.html
git commit -m "Add quiz engine with manual preview harness"
```

---

### Task 7: Vendor KaTeX and render formulas in concepts

**Files:**
- Create: `lib/katex/` (vendored KaTeX distribution)
- Modify: `js/topic-page.js`
- Modify: `tests/manual/flashcard-preview.html` copied pattern not needed — instead create `tests/manual/katex-preview.html`

**Interfaces:**
- Produces: `lib/katex/katex.min.css`, `lib/katex/katex.min.js`, `lib/katex/fonts/*` — any page rendering formulas includes these via `<link>`/`<script>` tags and calls the global `katex.render(tex, element)`.

- [ ] **Step 1: Download and vendor KaTeX**

```bash
cd /Users/liushiming/cfa-quant-site
mkdir -p lib/katex
curl -L "https://github.com/KaTeX/KaTeX/releases/download/v0.16.11/katex.tar.gz" -o /tmp/katex.tar.gz
tar -xzf /tmp/katex.tar.gz -C lib/katex --strip-components=1
rm /tmp/katex.tar.gz
ls lib/katex
```

Expected: `lib/katex` contains `katex.min.css`, `katex.min.js`, a `fonts/` directory, and other release files (e.g. `contrib/`). These are third-party vendored files — no changes needed to them.

- [ ] **Step 2: Wire formula rendering into `js/topic-page.js`**

In `js/topic-page.js`, add this import at the top of the file:

```js
// katex is loaded globally via <script> tag in each topic's index.html
```

Modify the `renderConcepts` function's formula block to call KaTeX after appending to the DOM. Replace:

```js
    if (concept.formula) {
      const formulaEl = document.createElement("p");
      formulaEl.className = "formula";
      formulaEl.textContent = concept.formula;
      formulaEl.dataset.katex = concept.formula;
      block.appendChild(formulaEl);
    }
```

with:

```js
    if (concept.formula) {
      const formulaEl = document.createElement("p");
      formulaEl.className = "formula";
      block.appendChild(formulaEl);
      if (window.katex) {
        window.katex.render(concept.formula, formulaEl, { throwOnError: false });
      } else {
        formulaEl.textContent = concept.formula;
      }
    }
```

- [ ] **Step 3: Add KaTeX `<link>`/`<script>` tags to the topic page template**

In Task 4's generator script output (the `html` template string), add these two lines right after `<link rel="stylesheet" href="../../css/style.css" />`:

```html
  <link rel="stylesheet" href="../../lib/katex/katex.min.css" />
  <script src="../../lib/katex/katex.min.js"></script>
```

Since the 11 `index.html` files already exist from Task 4, apply this same two-line insertion directly to each of the 11 `topics/<id>/index.html` files (same insertion point: right after the `css/style.css` link tag).

- [ ] **Step 4: Create a manual preview harness**

Create `tests/manual/katex-preview.html`:

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8" />
  <title>katex preview</title>
  <link rel="stylesheet" href="../../css/style.css" />
  <link rel="stylesheet" href="../../lib/katex/katex.min.css" />
  <script src="../../lib/katex/katex.min.js"></script>
</head>
<body>
  <div class="page" id="root"></div>
  <script type="module">
    import { renderTopicPage } from "../../js/topic-page.js";

    const meta = {
      title_zh: "预览", title_en: "Preview",
      essence_zh: "", exam_pattern_zh: "", vocabulary: [], mnemonics: [],
      concepts: [
        { term_en: "Holding Period Return (HPR)", explain_zh: "持有期收益率公式如下:", formula: "R = \\frac{P_1 - P_0 + D_1}{P_0}" },
      ],
    };
    renderTopicPage(document.getElementById("root"), meta, []);
  </script>
</body>
</html>
```

- [ ] **Step 5: Manually verify**

Run: `open /Users/liushiming/cfa-quant-site/tests/manual/katex-preview.html`
Expected: the formula renders as a properly typeset fraction (not raw LaTeX text like `\frac{...}`), with no network requests (check the browser Network tab — everything loads from `lib/katex/`, nothing from a CDN).

- [ ] **Step 6: Commit**

```bash
git add lib/katex js/topic-page.js tests/manual/katex-preview.html topics/*/index.html
git commit -m "Vendor KaTeX locally and render formulas in concept explanations"
```

---

### Task 8: TVM calculator (pure math + UI)

**Files:**
- Create: `js/calculators/tvm-math.js`
- Test: `tests/tvm-math.test.js`
- Create: `js/calculators/tvm-calculator.js`
- Create: `calculators/tvm.html`
- Modify: `index.html`

**Interfaces:**
- Produces (`tvm-math.js`): `solveTVM({ n, iPct, pv, pmt, fv }) -> { field: string, value: number }` — exactly one of the five input fields must be `null`, `undefined`, or `""`; that field is solved for and returned. Sign convention matches a real financial calculator: cash outflows and inflows have opposite signs.
- Produces (`tvm-calculator.js`): `initTvmCalculator(formElement, outputElement)` — wires five `<input>` fields plus a solve button to `solveTVM` and writes the result into `outputElement`.

- [ ] **Step 1: Write the failing tests**

Create `tests/tvm-math.test.js`:

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { solveTVM } from "../js/calculators/tvm-math.js";

function assertClose(actual, expected, tolerance, message) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${message}: expected ~${expected}, got ${actual}`);
}

// Grounded in a real CFA L1 Quant question (数量分析 #78): a pension fund needs a
// $10,000,000 lump sum in 15 years, earning 5%/year compounded semi-annually.
// n = 30 semiannual periods, i = 2.5% per period, pmt = 0.
// Reference answer: PV closest to $4,767,427.
test("solveTVM solves PV for a single lump sum (real exam question #78)", () => {
  const result = solveTVM({ n: 30, iPct: 2.5, pv: undefined, pmt: 0, fv: 10000000 });
  assert.equal(result.field, "pv");
  assertClose(Math.abs(result.value), 4767427, 50, "PV of lump sum");
});

// Grounded in a real CFA L1 Quant question (数量分析 #6): an asset earns 13.1%
// over a 16-month period. Reframed as PV=-1, FV=1.131, n=16/12 years, pmt=0.
// Reference answer: annualized rate closest to 9.7%.
test("solveTVM solves interest rate for a single lump sum (real exam question #6)", () => {
  const result = solveTVM({ n: 16 / 12, iPct: undefined, pv: -1, pmt: 0, fv: 1.131 });
  assert.equal(result.field, "iPct");
  assertClose(result.value, 9.7, 0.1, "annualized rate");
});

test("solveTVM round-trips: solving FV then PV from that FV recovers the original PV", () => {
  const fvResult = solveTVM({ n: 10, iPct: 6, pv: -1000, pmt: -100, fv: undefined });
  const pvResult = solveTVM({ n: 10, iPct: 6, pv: undefined, pmt: -100, fv: fvResult.value });
  assertClose(pvResult.value, -1000, 0.01, "round-tripped PV");
});

test("solveTVM round-trips: solving PMT then N from scratch recovers a consistent N", () => {
  const pmtResult = solveTVM({ n: 5, iPct: 4, pv: -1000, pmt: undefined, fv: 0 });
  const nResult = solveTVM({ n: undefined, iPct: 4, pv: -1000, pmt: pmtResult.value, fv: 0 });
  assertClose(nResult.value, 5, 0.01, "round-tripped N");
});

test("solveTVM throws when zero or more than one field is missing", () => {
  assert.throws(() => solveTVM({ n: 5, iPct: 6, pv: -1000, pmt: 0, fv: 1000 }));
  assert.throws(() => solveTVM({ n: undefined, iPct: undefined, pv: -1000, pmt: 0, fv: 1000 }));
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test tests/tvm-math.test.js`
Expected: FAIL — `Cannot find module '../js/calculators/tvm-math.js'`

- [ ] **Step 3: Write `js/calculators/tvm-math.js`**

```js
function fvAnnuityFactor(iDec, n) {
  if (iDec === 0) return n;
  return (Math.pow(1 + iDec, n) - 1) / iDec;
}

function normalize(value) {
  return value === null || value === undefined || value === "" ? undefined : Number(value);
}

export function solveTVM({ n, iPct, pv, pmt, fv }) {
  const raw = { n, iPct, pv, pmt, fv };
  const missing = Object.keys(raw).filter((k) => raw[k] === null || raw[k] === undefined || raw[k] === "");
  if (missing.length !== 1) {
    throw new Error("Exactly one of n, iPct, pv, pmt, fv must be left blank to solve for it.");
  }
  const target = missing[0];
  const nVal = normalize(n);
  const iDec = normalize(iPct) === undefined ? undefined : normalize(iPct) / 100;
  const pvVal = normalize(pv);
  const pmtVal = normalize(pmt) === undefined ? 0 : normalize(pmt);
  const fvVal = normalize(fv);

  if (target === "fv") {
    const grownPv = pvVal * Math.pow(1 + iDec, nVal);
    const grownPmt = pmtVal * fvAnnuityFactor(iDec, nVal);
    return { field: "fv", value: -(grownPv + grownPmt) };
  }

  if (target === "pv") {
    const grownPmt = pmtVal * fvAnnuityFactor(iDec, nVal);
    return { field: "pv", value: -(fvVal + grownPmt) / Math.pow(1 + iDec, nVal) };
  }

  if (target === "pmt") {
    const annuityFactor = fvAnnuityFactor(iDec, nVal);
    const grownPv = pvVal * Math.pow(1 + iDec, nVal);
    return { field: "pmt", value: -(fvVal + grownPv) / annuityFactor };
  }

  if (target === "n") {
    if (pmtVal === 0) {
      return { field: "n", value: Math.log(-fvVal / pvVal) / Math.log(1 + iDec) };
    }
    const numerator = pmtVal / iDec - fvVal;
    const denominator = pvVal + pmtVal / iDec;
    return { field: "n", value: Math.log(numerator / denominator) / Math.log(1 + iDec) };
  }

  // target === "iPct": bisection search for the rate that satisfies
  // pv*(1+i)^n + pmt*((1+i)^n - 1)/i + fv = 0
  const f = (iDecGuess) => {
    const grownPv = pvVal * Math.pow(1 + iDecGuess, nVal);
    const grownPmt = pmtVal * fvAnnuityFactor(iDecGuess, nVal);
    return grownPv + grownPmt + fvVal;
  };
  let lo = -0.9999;
  let hi = 10;
  let flo = f(lo);
  let mid = 0;
  for (let iter = 0; iter < 200; iter += 1) {
    mid = (lo + hi) / 2;
    const fmid = f(mid);
    if (Math.abs(fmid) < 1e-9) break;
    if ((flo < 0 && fmid < 0) || (flo > 0 && fmid > 0)) {
      lo = mid;
      flo = fmid;
    } else {
      hi = mid;
    }
  }
  return { field: "iPct", value: mid * 100 };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test tests/tvm-math.test.js`
Expected: PASS — all 5 tests green

- [ ] **Step 5: Write `js/calculators/tvm-calculator.js`**

```js
import { solveTVM } from "./tvm-math.js";

export function initTvmCalculator(formElement, outputElement) {
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(formElement);
    const inputs = {
      n: data.get("n"),
      iPct: data.get("iPct"),
      pv: data.get("pv"),
      pmt: data.get("pmt"),
      fv: data.get("fv"),
    };
    try {
      const result = solveTVM(inputs);
      outputElement.textContent = `${result.field.toUpperCase()} = ${result.value.toFixed(4)}`;
    } catch (error) {
      outputElement.textContent = error.message;
    }
  });
}
```

- [ ] **Step 6: Create `calculators/tvm.html`**

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8" />
  <title>TVM 计算器 · CFA L1 数量方法</title>
  <link rel="stylesheet" href="../css/style.css" />
</head>
<body>
  <div class="site-header"><a href="../index.html">&larr; CFA L1 · 数量方法</a></div>
  <div class="page">
    <h1>TVM 计算器</h1>
    <p class="section-label">填其中任意四项,留空要求解的一项,点击"求解"</p>
    <form class="calculator-form" id="tvm-form">
      <label>N(期数) <input type="number" step="any" name="n" /></label>
      <label>I/Y(每期利率,%) <input type="number" step="any" name="iPct" /></label>
      <label>PV(现值) <input type="number" step="any" name="pv" /></label>
      <label>PMT(每期现金流) <input type="number" step="any" name="pmt" /></label>
      <label>FV(终值) <input type="number" step="any" name="fv" /></label>
      <button type="submit">求解</button>
    </form>
    <p id="tvm-output" class="quiz-accuracy"></p>
  </div>
  <script type="module">
    import { initTvmCalculator } from "../js/calculators/tvm-calculator.js";
    initTvmCalculator(document.getElementById("tvm-form"), document.getElementById("tvm-output"));
  </script>
</body>
</html>
```

- [ ] **Step 7: Link the calculator from the homepage**

In `index.html`, add this line right after the `<p id="storage-tools"></p>` element:

```html
    <p><a href="calculators/tvm.html">TVM 计算器</a></p>
```

- [ ] **Step 8: Manually verify against 3 real exam questions**

Run: `open /Users/liushiming/cfa-quant-site/calculators/tvm.html`

Check 1 (数量分析 #78): enter N=30, I/Y=2.5, PMT=0, FV=10000000, leave PV blank, click 求解.
Expected: output shows `PV = -4767427.xxxx` (matches reference answer $4,767,427 within rounding).

Check 2 (数量分析 #6): enter N=1.3333333333, PV=-1, PMT=0, FV=1.131, leave I/Y blank, click 求解.
Expected: output shows `IPCT = 9.6xxx` (matches reference answer 9.7% within rounding).

Check 3 (数量分析 #31): enter N=4, PV=-1, PMT=0, FV=1.5, leave I/Y blank, click 求解.
Expected: output shows `IPCT = 10.6xxx` or `10.7xxx` (matches reference answer 10.7% within rounding — this is the CAGR question "revenue 50% higher in four years").

- [ ] **Step 9: Commit**

```bash
git add js/calculators tests/tvm-math.test.js calculators/tvm.html index.html
git commit -m "Add TVM calculator with pure solver, unit tests, and UI"
```

---

### Task 9: Import script — parse, pair, classify, and write the 93 real questions

**Files:**
- Create: `scripts/import-quant-questions.js`
- Test: `tests/import-quant-questions.test.js`

**Interfaces:**
- Produces (pure, tested): `extractSection(text, startMarker, endMarker) -> string`, `parseQuestions(sectionText) -> Array<{number, stem_en, choices_en}>`, `parseSolutions(solutionsText) -> Array<{number, explanation_en, answer, subjectLabel, los}>`, `classifyByLos(los) -> topicId|null`, `mergeQuestionsAndSolutions(questions, solutions) -> Array<{number, stem_en, choices_en, answer, explanation_en, los}>`, `renderQuestionsJs(questions) -> string`.
- Produces (I/O glue, verified by running against real data): writes `topics/<id>/questions.js` for each of the 11 topics.

- [ ] **Step 1: Write the failing tests**

Create `tests/import-quant-questions.test.js`:

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  extractSection,
  parseQuestions,
  parseSolutions,
  classifyByLos,
  mergeQuestionsAndSolutions,
  renderQuestionsJs,
} from "../scripts/import-quant-questions.js";

test("extractSection returns text between two markers", () => {
  const text = "before\nSTART\nmiddle content\nEND\nafter";
  assert.equal(extractSection(text, "START", "END"), "\nmiddle content\n");
});

test("parseQuestions splits on sequential numbered stems", () => {
  const section = `1  数量分析  1. Which of the following factors is not used?  A. Point estimate.  B. Sampling error.  C. Reliability factor.      2. An analyst performs a test.  A. First choice.  B. Second choice.  C. Third choice.`;
  const questions = parseQuestions(section);
  assert.equal(questions.length, 2);
  assert.equal(questions[0].number, 1);
  assert.match(questions[0].stem_en, /Which of the following factors/);
  assert.deepEqual(questions[0].choices_en, [
    "A. Point estimate.",
    "B. Sampling error.",
    "C. Reliability factor.",
  ]);
  assert.equal(questions[1].number, 2);
});

test("parseQuestions throws if numbering is not sequential starting at 1", () => {
  const section = `1  数量分析  1. First stem.  A. a.  B. b.  C. c.      3. Skipped a number.  A. a.  B. b.  C. c.`;
  assert.throws(() => parseQuestions(section));
});

test("parseSolutions extracts the correct answer, explanation, and LOS per Solution block", () => {
  const text = `Solution -1-
A. Incorrect because it uses the point estimate.
B. Correct because a confidence interval for a parameter is calculated as X.
C. Incorrect because a reliability factor is used.
Quantitative Methods
= compare and contrast simple random, stratified random, cluster sampling
第 2 页
Solution -2-
A. Correct because something else is right.
B. Incorrect because of reason B.
C. Incorrect because of reason C.
Alternative Investments
= describe financial applications of distributed ledger technology`;
  const solutions = parseSolutions(text);
  assert.equal(solutions.length, 2);
  assert.equal(solutions[0].number, 1);
  assert.equal(solutions[0].answer, "B");
  assert.match(solutions[0].explanation_en, /confidence interval for a parameter/);
  assert.match(solutions[0].los, /compare and contrast simple random/);
  assert.equal(solutions[1].number, 2);
  assert.equal(solutions[1].answer, "A");
});

test("classifyByLos matches known keyword patterns", () => {
  assert.equal(classifyByLos("calculate and interpret major return measures and describe their appropriate uses"), "rates-returns");
  assert.equal(classifyByLos("calculate and interpret the present value (PV) of fixed-income and equity instruments"), "tvm");
  assert.equal(classifyByLos("calculate, interpret, and evaluate measures of skewness and kurtosis"), "stats-returns");
  assert.equal(classifyByLos("compare and contrast tree diagrams and joint probability tables"), "probability-trees");
  assert.equal(classifyByLos("describe the use of the bootstrap method for estimating standard error"), "simulation");
  assert.equal(classifyByLos("compare and contrast simple random, stratified random, and cluster sampling"), "sampling-estimation");
  assert.equal(classifyByLos("construct hypothesis tests and determine their statistical significance"), "hypothesis-testing");
  assert.equal(classifyByLos("compare and contrast parametric and nonparametric tests of independence"), "tests-independence");
  assert.equal(classifyByLos("describe the assumptions underlying simple linear regression"), "regression");
  assert.equal(classifyByLos("describe applications of Big Data and Data Science to investment management"), "big-data");
});

test("classifyByLos returns null for unrecognized text", () => {
  assert.equal(classifyByLos("this los text matches nothing we know about"), null);
});

test("mergeQuestionsAndSolutions pairs by number and drops the number field", () => {
  const questions = [{ number: 1, stem_en: "Stem one", choices_en: ["A. a", "B. b", "C. c"] }];
  const solutions = [{ number: 1, answer: "B", explanation_en: "Because B.", los: "some los" }];
  const merged = mergeQuestionsAndSolutions(questions, solutions);
  assert.equal(merged.length, 1);
  assert.equal(merged[0].stem_en, "Stem one");
  assert.equal(merged[0].answer, "B");
  assert.equal(merged[0].los, "some los");
  assert.equal(merged[0].number, undefined);
});

test("renderQuestionsJs produces a loadable window.TOPIC_QUESTIONS assignment", () => {
  const js = renderQuestionsJs([{ id: "tvm-001", stem_en: "x", choices_en: ["A. a"], answer: "A", explanation_en: "e", explanation_zh: "", los: "l" }]);
  assert.match(js, /^window\.TOPIC_QUESTIONS = /);
  assert.match(js, /"tvm-001"/);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test tests/import-quant-questions.test.js`
Expected: FAIL — `Cannot find module '../scripts/import-quant-questions.js'`

- [ ] **Step 3: Write `scripts/import-quant-questions.js`**

```js
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { TOPICS } from "../js/nav-data.js";

export function extractSection(text, startMarker, endMarker) {
  const startIndex = text.indexOf(startMarker);
  if (startIndex === -1) throw new Error(`start marker not found: ${startMarker}`);
  const afterStart = startIndex + startMarker.length;
  const endIndex = text.indexOf(endMarker, afterStart);
  if (endIndex === -1) throw new Error(`end marker not found: ${endMarker}`);
  return text.slice(afterStart, endIndex);
}

export function parseQuestions(sectionText) {
  const cleaned = sectionText.replace(/第\s*\d+\s*页/g, " ");
  const parts = cleaned.split(/(\d{1,3})\.\s+/);
  // parts[0] is leading junk before the first "1. "; then alternates [number, body, number, body, ...]
  const questions = [];
  for (let i = 1; i < parts.length; i += 2) {
    const number = Number(parts[i]);
    const body = parts[i + 1] || "";
    const choiceMatches = [...body.matchAll(/([ABC]\.\s.+?)(?=\s[ABC]\.\s|$)/gs)];
    const firstChoiceIndex = choiceMatches.length > 0 ? body.indexOf(choiceMatches[0][1]) : body.length;
    const stem_en = body.slice(0, firstChoiceIndex).trim();
    const choices_en = choiceMatches.map((m) => m[1].trim());
    questions.push({ number, stem_en, choices_en });
  }
  questions.forEach((q, i) => {
    if (q.number !== i + 1) {
      throw new Error(`expected sequential question numbering, got ${q.number} at position ${i + 1}`);
    }
  });
  return questions;
}

const SUBJECT_LABELS = [
  "Quantitative Methods",
  "Alternative Investments",
  "Fixed Income",
  "Corporate Issuers",
  "Portfolio Management",
  "Economics",
  "Ethical and Professional Standards",
  "Equity Investments",
  "Derivatives",
  "Financial Statement Analysis",
];

export function parseSolutions(text) {
  const blocks = text.split(/Solution\s*-\s*(\d+)\s*-/).slice(1);
  const solutions = [];
  for (let i = 0; i < blocks.length; i += 2) {
    const number = Number(blocks[i]);
    const body = blocks[i + 1];

    const subjectMatch = SUBJECT_LABELS.map((label) => ({ label, index: body.indexOf(`\n${label}\n`) }))
      .filter((m) => m.index !== -1)
      .sort((a, b) => a.index - b.index)
      .pop();
    let los = "";
    let searchLimit = body.length;
    if (subjectMatch) {
      const afterLabel = body.slice(subjectMatch.index + subjectMatch.label.length + 2);
      const pageBreakIndex = afterLabel.search(/第\s*\d+\s*页|Solution\s*-/);
      const losRaw = pageBreakIndex === -1 ? afterLabel : afterLabel.slice(0, pageBreakIndex);
      los = losRaw.replace(/^[=\s]+/, "").replace(/\s+/g, " ").trim();
      searchLimit = subjectMatch.index;
    }

    const explanationSection = body.slice(0, searchLimit);
    const letterMatches = [...explanationSection.matchAll(/([ABC])\.\s(.+?)(?=\s[ABC]\.\s|$)/gs)];
    const correctMatch = letterMatches.find((m) => /correct because/i.test(m[2]));
    if (!correctMatch) {
      throw new Error(`no "Correct because" explanation found in Solution -${number}-`);
    }

    solutions.push({
      number,
      answer: correctMatch[1],
      explanation_en: correctMatch[2].trim(),
      los,
    });
  }
  return solutions;
}

const LOS_KEYWORD_RULES = [
  { topicId: "tests-independence", keywords: ["nonparametric test", "test of independence", "parametric and nonparametric"] },
  { topicId: "big-data", keywords: ["big data", "artificial intelligence", "machine learning", "fintech", "distributed ledger"] },
  { topicId: "simulation", keywords: ["bootstrap", "simulation", "monte carlo"] },
  { topicId: "hypothesis-testing", keywords: ["hypothesis test", "type i and type ii", "power of a test", "statistical significance"] },
  { topicId: "sampling-estimation", keywords: ["sampling", "central limit theorem", "sampling error", "standard error of the sample"] },
  { topicId: "regression", keywords: ["linear regression", "regression model"] },
  { topicId: "probability-trees", keywords: ["tree diagram", "joint probability", "conditional expectation", "covariance"] },
  { topicId: "portfolio-math", keywords: ["portfolio variance", "portfolio mathematics", "safety-first"] },
  { topicId: "stats-returns", keywords: ["skewness", "kurtosis", "quartile", "measures of central tendency", "mean absolute deviation", "coefficient of variation"] },
  { topicId: "tvm", keywords: ["present value (pv) of fixed-income", "time value of money"] },
  { topicId: "rates-returns", keywords: ["return measures", "annualized return", "continuously compounded return", "opportunity cost", "interest rate as"] },
];

export function classifyByLos(los) {
  const lower = los.toLowerCase();
  for (const rule of LOS_KEYWORD_RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return rule.topicId;
    }
  }
  return null;
}

export function mergeQuestionsAndSolutions(questions, solutions) {
  const solutionsByNumber = new Map(solutions.map((s) => [s.number, s]));
  return questions.map((q) => {
    const solution = solutionsByNumber.get(q.number);
    if (!solution) throw new Error(`no solution found for question ${q.number}`);
    return {
      stem_en: q.stem_en,
      choices_en: q.choices_en,
      answer: solution.answer,
      explanation_en: solution.explanation_en,
      los: solution.los,
    };
  });
}

export function renderQuestionsJs(questions) {
  return `window.TOPIC_QUESTIONS = ${JSON.stringify(questions, null, 2)};\n`;
}

export function runImport({ questionsDocxPath, solutionsDocxPath, projectRoot }) {
  const fullQuestionsText = execFileSync("textutil", ["-convert", "txt", "-stdout", questionsDocxPath]).toString();
  const solutionsText = execFileSync("textutil", ["-convert", "txt", "-stdout", solutionsDocxPath]).toString();

  const quantSection = extractSection(fullQuestionsText, "数量分析", "衍生品");
  const questions = parseQuestions(quantSection);
  const solutions = parseSolutions(solutionsText);
  const merged = mergeQuestionsAndSolutions(questions, solutions);

  const byTopic = new Map(TOPICS.map((t) => [t.id, []]));
  const unclassified = [];
  merged.forEach((question, i) => {
    const topicId = classifyByLos(question.los);
    const withId = { id: `imported-${String(i + 1).padStart(3, "0")}`, ...question, explanation_zh: "" };
    if (topicId && byTopic.has(topicId)) {
      byTopic.get(topicId).push(withId);
    } else {
      unclassified.push(withId);
    }
  });

  for (const [topicId, topicQuestions] of byTopic) {
    const path = `${projectRoot}/topics/${topicId}/questions.js`;
    writeFileSync(path, renderQuestionsJs(topicQuestions));
    console.log(`wrote ${topicQuestions.length} questions to ${path}`);
  }

  if (unclassified.length > 0) {
    console.log(`\n${unclassified.length} questions could not be classified (LOS text did not match any rule):`);
    for (const q of unclassified) {
      console.log(`  - ${q.los}`);
    }
  }

  return { total: merged.length, unclassifiedCount: unclassified.length };
}

const isMainModule = process.argv[1] && import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  const result = runImport({
    questionsDocxPath: "/Users/liushiming/Downloads/1000题和答案_Word版/CFA L11000题.docx",
    solutionsDocxPath: "/Users/liushiming/Downloads/1000题和答案_Word版/数量分析.docx",
    projectRoot: "/Users/liushiming/cfa-quant-site",
  });
  console.log(`\nTotal questions imported: ${result.total}, unclassified: ${result.unclassifiedCount}`);
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test tests/import-quant-questions.test.js`
Expected: PASS — all 8 tests green. If `parseSolutions` or `classifyByLos` tests fail, adjust the regex/keyword list against the fixture text in the test file until they pass — do not touch the real docx files during this step.

- [ ] **Step 5: Run the import against the real docx files**

Run: `node scripts/import-quant-questions.js`
Expected: 11 lines like `wrote N questions to /Users/liushiming/cfa-quant-site/topics/<id>/questions.js`, a final line `Total questions imported: 93, unclassified: 0` (or a small nonzero unclassified count with the offending LOS lines printed above it — if nonzero, read the printed LOS lines and add matching keywords to `LOS_KEYWORD_RULES`, then re-run this exact command until `unclassified: 0` or you've manually confirmed the remaining ones are genuinely ambiguous).

- [ ] **Step 6: Spot-check the generated output**

Run: `node -e "import('./topics/tvm/questions.js').then(() => {})" 2>&1 | head -5` will not work for a `window.`-style file in Node directly (it's browser-global syntax) — instead just read the file:

Run: `grep -c '"id"' topics/tvm/questions.js topics/rates-returns/questions.js topics/hypothesis-testing/questions.js`
Expected: nonzero counts printed for each, confirming those topics received real questions.

Run: `open /Users/liushiming/cfa-quant-site/topics/tvm/index.html`
Expected: the 练习题 section now shows real CFA questions with English stems; answering one shows the correct/incorrect coloring and an English explanation (the `explanation_zh` field is still empty at this point — that's expected, it's out of this plan's scope per the design spec).

- [ ] **Step 7: Commit**

```bash
git add scripts/import-quant-questions.js tests/import-quant-questions.test.js topics/*/questions.js
git commit -m "Import and classify 93 real CFA Quant questions from source docx files"
```

---

### Task 10: Final integration walkthrough

**Files:** none (verification only; fixes are follow-up commits if issues are found)

**Interfaces:** none — this task exercises everything built in Tasks 1-9 end to end.

- [ ] **Step 1: Run the full automated test suite**

Run: `node --test tests/*.test.js`
Expected: all tests from `progress.test.js`, `tvm-math.test.js`, and `import-quant-questions.test.js` pass (at least 20 tests total).

- [ ] **Step 2: Walk the homepage → topic → quiz → reload flow**

Run: `open /Users/liushiming/cfa-quant-site/index.html`

- Click into `topics/tvm/index.html` from the nav list. Expected: page loads with the heading, empty 本质/详细讲解/高频词汇/记忆口诀/考试怎么考 cards hidden (no empty boxes), and real imported questions in 练习题.
- Answer 2-3 questions. Expected: immediate color feedback, bilingual explanation area (English populated, Chinese blank), and the 正确率 line updates after each answer.
- Reload the page. Expected: 正确率 shows the same percentage as before reload (confirms `localStorage` persistence survived a reload).

- [ ] **Step 3: Verify export/import round-trip**

On the homepage, click "导出进度 JSON" — confirm a `cfa-quant-progress.json` downloads and contains the `tvm` question attempts from Step 2. Open the browser's DevTools console and run `localStorage.clear()`, then reload the homepage — confirm the 正确率 on `topics/tvm/index.html` now shows "还没做题". Use "导入进度 JSON" to re-import the file you exported — confirm `topics/tvm/index.html` shows the original 正确率 again after reload.

- [ ] **Step 4: Verify the TVM calculator against the same 3 real questions from Task 8 Step 8**

Re-run the three checks from Task 8 Step 8 one more time now that the calculator is linked from the homepage nav, confirming the link works end to end (homepage → TVM 计算器 → solve → correct answer).

- [ ] **Step 5: Record any follow-ups**

If Step 2's unclassified count from Task 9 was nonzero, or any topic besides `tvm` looks empty of questions when you open it, note this in the git commit message for this task (no code change needed — content-filling for `essence_zh`, `concepts`, `vocabulary`, `mnemonics`, `exam_pattern_zh`, and `flashcards` across all 11 topics is explicitly out of scope for this plan per the design spec, to be done in follow-up sessions as the user provides more material).

- [ ] **Step 6: Commit**

```bash
cd /Users/liushiming/cfa-quant-site
git add -A
git status
git commit -m "Complete v1 scaffold: verified end-to-end walkthrough" --allow-empty
```

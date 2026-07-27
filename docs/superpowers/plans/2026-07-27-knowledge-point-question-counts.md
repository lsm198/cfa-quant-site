# Plan: Knowledge-Point Question Counts & Attempt Counts

Spec: `docs/superpowers/specs/2026-07-27-knowledge-point-question-counts-design.md`

## Global Constraints

- Zero new dependencies; no build step. Plain ES modules only.
- Do not change `state` shape or how attempts are recorded — only add
  read-only derived-value functions.
- Do not add navigation/filtering from a count badge — it is a static
  count only.
- Do not touch any question content beyond the two named `rates-returns`
  tag-clause edits in Task 3.
- New pure functions get unit tests in the existing `tests/` convention
  (plain `node:test`, see `tests/progress.test.js` for style/imports).
- After each task, run the full test suite: `node tests/progress.test.js
  && node tests/tvm-math.test.js && node tests/import-quant-questions.test.js`
  (add a fourth line for the new `tests/knowledge-points.test.js` once
  Task 3 creates it) and confirm everything passes.

## Task 1: `getAttemptCount` in progress.js

Add to `js/progress.js`, near `getIncorrectCount`:

```js
export function getAttemptCount(state, questionId) {
  const attempts = (state.questions[questionId] && state.questions[questionId].attempts) || [];
  return attempts.length;
}
```

Add tests to `tests/progress.test.js` (import `getAttemptCount` alongside
the existing imports), covering: a question with no attempts returns 0; a
question with 3 attempts (mixed correct/incorrect) returns 3 (not the
correct-only or incorrect-only count — attempt count counts everything,
unlike `getIncorrectCount`).

Run the full test suite, confirm it passes (37/37 — 34 existing + 3 new).

Commit message: "Add getAttemptCount to progress.js"

## Task 2: Attempt-count badge in quiz.js

In `js/quiz.js`:
- Add `getAttemptCount` to the existing import from `./progress.js`
  (currently `import { recordAttempt, computeAccuracy, getIncorrectCount,
  isCurrentlyWrong } from "./progress.js";`).
- In `renderQuestion(question, i)`, after the existing wrong-count badge
  block:
  ```js
  const wrongCount = getIncorrectCount(state, qId);
  if (wrongCount > 0) {
    const badge = document.createElement("span");
    badge.className = "quiz-wrong-badge";
    badge.textContent = `已错 ${wrongCount} 次`;
    qEl.appendChild(badge);
  }
  ```
  add:
  ```js
  const attemptCount = getAttemptCount(state, qId);
  if (attemptCount > 0) {
    const attemptBadge = document.createElement("span");
    attemptBadge.className = "count-badge";
    attemptBadge.textContent = `已做 ${attemptCount} 次`;
    qEl.appendChild(attemptBadge);
  }
  ```
  (Same convention as the existing badge: computed once when the question
  element is built, not live-updated mid-session after answering — this
  matches how the wrong-count badge already behaves, not a new pattern.)

In `css/style.css`, add a new class (place it near `.quiz-wrong-badge`,
around line 269):
```css
.count-badge {
  display: inline-block;
  background: var(--bg);
  color: var(--muted);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  font-size: 12px;
  padding: 2px 10px;
  margin-bottom: 8px;
  margin-right: 6px;
}
```
(`--bg`, `--muted`, `--card-border` are all already defined in this file's
`:root` block — this site has no dark-mode variant, just the one palette,
so no further theming check is needed.)

Run the full test suite, confirm 37/37 still passes (no new tests expected
for this DOM-rendering change, consistent with codebase convention).
Manually verify: open a topic page, answer a question, reload — the "已做
N 次" badge should appear alongside "已错 N 次" (only for questions with
at least one attempt) and stack cleanly without layout overlap. Also check
`wrong-book.html` shows the same badge (it reuses `renderQuiz`).

Commit message: "Add attempt-count badge to quiz questions"

## Task 3: `js/knowledge-points.js` + two tag-clause fixes

Create `js/knowledge-points.js`:

```js
export function extractKnowledgePointClause(explanationZh) {
  if (!explanationZh) return null;
  const m = explanationZh.match(/^【知识点】([\s\S]*?)。/);
  return m ? m[1].trim() : null;
}

function normalize(s) {
  return s.toLowerCase().replace(/\s+/g, "");
}

export function countQuestionsForTerm(questions, termEn) {
  const normTerm = normalize(termEn);
  if (normTerm.length < 4) return 0;
  let count = 0;
  for (const q of questions) {
    const clause = extractKnowledgePointClause(q.explanation_zh);
    if (clause && normalize(clause).includes(normTerm)) count++;
  }
  return count;
}
```

Create `tests/knowledge-points.test.js` (mirror the `node:test` +
`node:assert` style used in `tests/progress.test.js`) covering
`extractKnowledgePointClause`:
- returns the clause text for a well-formed `【知识点】...。` prefix
- returns `null` for `explanation_zh` with no `【知识点】` prefix
- returns `null` for `undefined`/empty input

And `countQuestionsForTerm`, using small synthetic fixture question
arrays (do not load real topic files for these unit cases):
- counts a question whose clause exactly equals the term
- counts a question whose clause contains the term as a substring
  (e.g. clause "Assumptions of the Simple Linear Regression Model" matches
  term "Simple Linear Regression Model")
- counts a question despite a whitespace difference between clause and
  term (e.g. clause has `Covariance(X)` with no space, term is
  `Covariance (X)` with a space — must still match after normalization)
- does not count a question with an unrelated clause
- returns 0 for a term shorter than 4 characters even if it would
  otherwise substring-match everything (guard test)

Then add one integration test in the same file that loads real topic data
and asserts full coverage — this encodes the corpus validation done during
design so it can't silently regress:

```js
import fs from "node:fs";
import path from "node:path";

function loadTopicModule(filePath, globalName) {
  const code = fs.readFileSync(filePath, "utf8");
  const window = {};
  // eslint-disable-next-line no-eval
  eval(code);
  return window[globalName];
}

test("every question in every topic matches at least one concept/vocabulary term", () => {
  const topicsDir = path.join(import.meta.dirname, "..", "topics");
  const topicIds = fs.readdirSync(topicsDir).filter((d) =>
    fs.statSync(path.join(topicsDir, d)).isDirectory()
  );
  const unmatched = [];
  for (const topicId of topicIds) {
    const meta = loadTopicModule(path.join(topicsDir, topicId, "meta.js"), "TOPIC_META");
    const questions = loadTopicModule(path.join(topicsDir, topicId, "questions.js"), "TOPIC_QUESTIONS");
    const terms = [
      ...(meta.concepts || []).map((c) => c.term_en),
      ...(meta.vocabulary || []).map((v) => v.term_en),
    ];
    for (const q of questions) {
      const matched = terms.some((term) => countQuestionsForTerm([q], term) > 0);
      if (!matched) unmatched.push(`${topicId}/${q.id}`);
    }
  }
  assert.deepStrictEqual(unmatched, []);
});
```

This test will FAIL until the two tag-clause edits below land — that's
expected; make the edits as part of this same task so the task's own test
run is green.

Edit `topics/rates-returns/questions.js`:

Question `imported-039`, change `explanation_zh` from:
```
【知识点】算术平均数、几何平均数与调和平均数(Arithmetic / Geometric / Harmonic Mean,见 meta 概念卡)。对于一组不全相等的非负数据,恒有算术平均数 ≥ 几何平均数 ≥ 调和平均数,只有全部观测值相等时三者才相等。因此数值最大的是算术平均数。答案 B。
```
to (only the bracketed tag clause changes — replace the parenthetical
with the literal term the topic's `concepts[]` array uses, `Arithmetic
Mean, Geometric Mean, and Harmonic Mean`; everything after the first `。`
stays byte-identical):
```
【知识点】算术平均数、几何平均数与调和平均数(Arithmetic Mean, Geometric Mean, and Harmonic Mean)。对于一组不全相等的非负数据,恒有算术平均数 ≥ 几何平均数 ≥ 调和平均数,只有全部观测值相等时三者才相等。因此数值最大的是算术平均数。答案 B。
```

Question `imported-055`, change `explanation_zh` from:
```
【知识点】调和平均数用于定期定额投资 Harmonic Mean & cost averaging(见 meta 概念卡)。每期投入固定金额买入份额时,平均每股成本 = 各期价格的调和平均数 = n/Σ(1/Pi)。代入 3/(1/14+1/12+1/17)=3/(0.07143+0.08333+0.05882)=3/0.21359≈14.05。答案 A。若误用算术平均 (14+12+17)/3=14.33 会偏高(选项 B)。
```
to (same rule — only the tag clause changes, replacing the loose English
fragment with the exact term):
```
【知识点】调和平均数用于定期定额投资,Arithmetic Mean, Geometric Mean, and Harmonic Mean。每期投入固定金额买入份额时,平均每股成本 = 各期价格的调和平均数 = n/Σ(1/Pi)。代入 3/(1/14+1/12+1/17)=3/(0.07143+0.08333+0.05882)=3/0.21359≈14.05。答案 A。若误用算术平均 (14+12+17)/3=14.33 会偏高(选项 B)。
```

Verify both edits by reading the file back and confirming only the
`explanation_zh` field of these two questions changed (stem/choices/
answer/explanation_en/los untouched for both, and no other question in
the file touched).

Run the full test suite including the new `tests/knowledge-points.test.js`
— all must pass (the integration test in particular must show zero
unmatched questions across the full real corpus).

Commit message: "Add knowledge-points module; fix two rates-returns tag clauses for term matching"

## Task 4: Count badges on topic pages

In `js/topic-page.js`:
- Add `import { countQuestionsForTerm } from "./knowledge-points.js";` at
  the top.
- Change `renderConcepts(container, concepts)` to
  `renderConcepts(container, concepts, questions)`. Inside the loop over
  `concepts`, after appending `term` (the `<strong>` element) to `block`,
  add a count badge:
  ```js
  const count = countQuestionsForTerm(questions, concept.term_en);
  if (count > 0) {
    const badge = document.createElement("span");
    badge.className = "count-badge";
    badge.textContent = `${count} 道题`;
    block.appendChild(badge);
  }
  ```
- Change `renderVocabulary(container, vocabulary)` to
  `renderVocabulary(container, vocabulary, questions)`. In the loop over
  `vocabulary`, after `termCell.textContent = item.term_en;`, append the
  same kind of badge into `termCell` (or a new cell — pick whichever keeps
  the existing table's column structure intact; read the current table
  markup first since this function builds `<tr>`/`<td>` manually, not
  semantic list items like `renderConcepts`):
  ```js
  const count = countQuestionsForTerm(questions, item.term_en);
  if (count > 0) {
    const badge = document.createElement("span");
    badge.className = "count-badge";
    badge.textContent = `${count} 道题`;
    termCell.appendChild(badge);
  }
  ```
- Update the two call sites inside `renderTopicPage` (around line
  205-206) from `renderConcepts(container, meta.concepts)` /
  `renderVocabulary(container, meta.vocabulary)` to
  `renderConcepts(container, meta.concepts, questions)` /
  `renderVocabulary(container, meta.vocabulary, questions)` — `questions`
  is already a parameter of `renderTopicPage(container, meta, questions)`,
  just not threaded through today.

No new automated tests for this task (DOM-rendering file, consistent with
codebase convention — `countQuestionsForTerm` itself is already unit
tested in Task 3). Run the full test suite, confirm all tests still pass.

Manual verification: open a few topic pages (`stats-returns`,
`rates-returns` — the two topics touched by Task 3's tag edits — plus one
untouched topic like `tvm`) and confirm every concept/vocabulary entry
that has matching questions shows a "N 道题" badge with a plausible count,
terms with zero matching questions show no badge, and the page layout
isn't broken by the new badges (check both the `详细讲解` block-style
section and the `高频词汇` table-style section).

Commit message: "Show question-count badges for concepts and vocabulary on topic pages"

## Final Verification (after Task 4)

- Run the full test suite one more time — expect the new
  `tests/knowledge-points.test.js` plus the 3 new `progress.test.js` cases
  alongside the 34 tests already on `main` (exact final count depends on
  how many cases Task 3's implementer writes for `knowledge-points.test.js`
  — no fixed number to check against, just confirm 100% pass, 0 fail).
- Confirm no file outside the following was touched across the whole
  branch: `js/progress.js`, `js/quiz.js`, `js/knowledge-points.js`,
  `js/topic-page.js`, `css/style.css`, `tests/progress.test.js`,
  `tests/knowledge-points.test.js`, `topics/rates-returns/questions.js`.
- Manual smoke test: a topic page shows both concept/vocabulary count
  badges and (after answering a question) an attempt-count badge; the
  wrong-book page also shows attempt-count badges on its listed questions.

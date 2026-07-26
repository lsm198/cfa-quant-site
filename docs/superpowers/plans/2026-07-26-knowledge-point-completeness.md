# 知识点讲解补全 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** every concept/term that appears in a topic's real-question explanations (`topics/*/questions.js`) is also explained on that topic's own knowledge-point page (`topics/*/meta.js` `concepts`/`vocabulary`), so the learner never has to leave the page to understand a question.

**Architecture:** no rendering code changes — `js/topic-page.js` already loops over `concepts`/`vocabulary` with no length limit. This is a pure content pass: a Node script flags candidate gaps per topic by diffing each question's `【知识点】(...)` tag against the topic's own `concepts[].term_en`/`vocabulary[].term_en`, then each topic's `meta.js` gets new entries added (never removing/reordering existing ones) until the flagged list for that topic is empty or the residual flags are confirmed noise.

**Tech Stack:** vanilla Node.js (no dependencies, matches the rest of the repo), plain browser globals (`window.TOPIC_META`, `window.TOPIC_QUESTIONS`) loaded via `<script>` tags.

## Global Constraints

- New `concepts`/`vocabulary` entries must be grounded strictly in that question's own `explanation_en`/`explanation_zh` text — do not invent formulas or definitions from general CFA knowledge not present in the source explanation (design spec: `docs/superpowers/specs/2026-07-26-knowledge-point-completeness-design.md`).
- Never edit or reorder existing `concepts`/`vocabulary` entries — only append new ones.
- Do not add calculator button-sequence steps to `meta.js` (explicitly out of scope per user decision).
- New entries follow the exact same object shape as existing entries in that file:
  - `concepts[]`: `{ term_en, explain_zh, formula? }` (`formula` omitted if the concept has no formula)
  - `vocabulary[]`: `{ term_en, meaning_zh, example_en? }` (`example_en` omitted if no natural example sentence exists in the source explanation)
- The coverage script (`scripts/check-knowledge-coverage.js`, built in Task 1) is a heuristic aid, not a pass/fail oracle: it flags raw math sub-expressions (e.g. `"n-2"`, `"Ri,Rj"`) and prose fragments from the parenthetical-extraction regex as false positives. Use judgment — the acceptance bar is "a human reading the page can find every real concept/term the flagged question relies on," not "script output is literally empty."

---

### Task 1: Coverage-check script (already written, needs commit)

**Files:**
- Create (already exists, uncommitted): `scripts/check-knowledge-coverage.js`

**Interfaces:**
- Produces: CLI `node scripts/check-knowledge-coverage.js [topicId]` — prints flagged `{questionId, tag}` gaps per topic (all 11 topics if no `topicId` given), used by every later task as its verification step.

- [ ] **Step 1: Confirm the script runs and inspect current output**

Run: `node scripts/check-knowledge-coverage.js`
Expected: prints one line per topic (`OK` or `N flagged gap(s)` with details) ending in `Total flagged: 54`. This is the baseline "before" state for Tasks 2-8 below.

- [ ] **Step 2: Commit**

```bash
git add scripts/check-knowledge-coverage.js
git commit -m "Add knowledge-point coverage checker for real-question concepts"
```

---

### Task 2: portfolio-math coverage

**Files:**
- Modify: `topics/portfolio-math/meta.js`
- Read (source of truth, do not modify): `topics/portfolio-math/questions.js`

**Interfaces:**
- Consumes: `scripts/check-knowledge-coverage.js` from Task 1.

- [ ] **Step 1: Run the checker and read the flagged questions**

Run: `node scripts/check-knowledge-coverage.js portfolio-math`
Expected output (baseline):
```
portfolio-math: 6 flagged gap(s)
  - [imported-049] "相关系数" not found in concepts/vocabulary
  - [imported-057] "Ri,Rj" not found in concepts/vocabulary
  - [imported-057] "Ri,Rj" not found in concepts/vocabulary
  - [imported-057] "Rj" not found in concepts/vocabulary
  - [imported-062] "两资产组合方差" not found in concepts/vocabulary
  - [imported-062] "R1,R2" not found in concepts/vocabulary
```
Open `topics/portfolio-math/questions.js` and read the full `explanation_zh`/`explanation_en` for questions `imported-049`, `imported-057`, `imported-062`. The `"Ri,Rj"`/`"R1,R2"` flags are math notation noise (safe to ignore); `"相关系数"` (correlation coefficient) and `"两资产组合方差"` (two-asset portfolio variance formula) are real concepts — read the explanations to confirm whether they're already covered by an existing `concepts`/`vocabulary` entry in `topics/portfolio-math/meta.js` under different wording, or genuinely missing.

- [ ] **Step 2: Add missing entries to `topics/portfolio-math/meta.js`**

For each concept confirmed genuinely missing in Step 1, append a new object to `concepts` (if it has a formula, e.g. two-asset portfolio variance) or `vocabulary` (if it's a standalone term, e.g. correlation coefficient) in `topics/portfolio-math/meta.js`, sourced from the matching question's `explanation_en`/`explanation_zh`. Follow the exact shape from Global Constraints. Do not touch any existing array entries.

- [ ] **Step 3: Re-run the checker**

Run: `node scripts/check-knowledge-coverage.js portfolio-math`
Expected: only the math-notation-noise flags (`"Ri,Rj"`, `"Rj"`, `"R1,R2"`) remain, if any — no flags naming a real, uncovered concept.

- [ ] **Step 4: Validate the file still loads**

Run: `node -e "global.window={}; require('./topics/portfolio-math/meta.js'); require('./topics/portfolio-math/questions.js'); console.log('concepts', window.TOPIC_META.concepts.length, 'vocab', window.TOPIC_META.vocabulary.length);"`
Expected: prints without throwing, with `concepts`/`vocabulary` counts higher than the pre-edit baseline (9 total per the design-doc audit).

- [ ] **Step 5: Commit**

```bash
git add topics/portfolio-math/meta.js
git commit -m "Fill portfolio-math knowledge gaps found in real questions"
```

---

### Task 3: probability-trees coverage

**Files:**
- Modify: `topics/probability-trees/meta.js`
- Read (source of truth, do not modify): `topics/probability-trees/questions.js`

**Interfaces:**
- Consumes: `scripts/check-knowledge-coverage.js` from Task 1.

- [ ] **Step 1: Run the checker and read the flagged questions**

Run: `node scripts/check-knowledge-coverage.js probability-trees`
Expected output (baseline):
```
probability-trees: 12 flagged gap(s)
  - [imported-028] "树状图" not found in concepts/vocabulary
  - [imported-030] "散点图" not found in concepts/vocabulary
  - [imported-042] "离散随机变量的方差" not found in concepts/vocabulary
  - [imported-042] "Xi" not found in concepts/vocabulary
  - [imported-048] "相关系数" not found in concepts/vocabulary
  - [imported-048] "Ri,Rj" not found in concepts/vocabulary
  - [imported-048] "Rj" not found in concepts/vocabulary
  - [imported-050] "相关系数" not found in concepts/vocabulary
  - [imported-050] "Ri,Rj" not found in concepts/vocabulary
  - [imported-050] "Rj" not found in concepts/vocabulary
  - [imported-053] "条件期望" not found in concepts/vocabulary
  - [imported-053] "树状图" not found in concepts/vocabulary
```
Open `topics/probability-trees/questions.js` and read the full explanations for `imported-028`, `imported-030`, `imported-042`, `imported-048`, `imported-050`, `imported-053`. `"Xi"`/`"Ri,Rj"`/`"Rj"` are math notation noise. Real candidate concepts to check: 树状图 (probability tree diagram), 散点图 (scatter plot, if actually discussed rather than just named), 离散随机变量的方差 (variance of a discrete random variable), 相关系数 (correlation coefficient), 条件期望 (conditional expectation — note this topic is literally about probability trees and conditional expectation per the topic id, so check carefully whether it's already covered under different wording before treating as missing).

- [ ] **Step 2: Add missing entries to `topics/probability-trees/meta.js`**

For each concept confirmed genuinely missing, append a new object to `concepts` or `vocabulary` (per shape in Global Constraints), sourced from the matching question's explanation text. Do not touch existing entries.

- [ ] **Step 3: Re-run the checker**

Run: `node scripts/check-knowledge-coverage.js probability-trees`
Expected: only math-notation-noise flags remain, if any.

- [ ] **Step 4: Validate the file still loads**

Run: `node -e "global.window={}; require('./topics/probability-trees/meta.js'); require('./topics/probability-trees/questions.js'); console.log('concepts', window.TOPIC_META.concepts.length, 'vocab', window.TOPIC_META.vocabulary.length);"`
Expected: prints without throwing, counts higher than the pre-edit baseline (10 total per the design-doc audit).

- [ ] **Step 5: Commit**

```bash
git add topics/probability-trees/meta.js
git commit -m "Fill probability-trees knowledge gaps found in real questions"
```

---

### Task 4: rates-returns coverage

**Files:**
- Modify: `topics/rates-returns/meta.js`
- Read (source of truth, do not modify): `topics/rates-returns/questions.js`

**Interfaces:**
- Consumes: `scripts/check-knowledge-coverage.js` from Task 1.

- [ ] **Step 1: Run the checker and read the flagged questions**

Run: `node scripts/check-knowledge-coverage.js rates-returns`
Expected output (baseline):
```
rates-returns: 6 flagged gap(s)
  - [imported-008] "复合年增长率 CAGR 是同一公式的应用" not found in concepts/vocabulary
  - [imported-039] "Arithmetic / Geometric / Harmonic Mean,见 meta 概念卡" not found in concepts/vocabulary
  - [imported-055] "见 meta 概念卡" not found in concepts/vocabulary
  - [imported-069] "real risk-free rate" not found in concepts/vocabulary
  - [imported-074] "compounding frequency" not found in concepts/vocabulary
  - [imported-078] "compounding frequency" not found in concepts/vocabulary
```
Open `topics/rates-returns/questions.js` and read the full explanations for `imported-008`, `imported-039`, `imported-055`, `imported-069`, `imported-074`, `imported-078`. Note: `imported-039`/`imported-055`'s flagged text literally says "见 meta 概念卡" ("see the meta concept card") — this is the prior author's own note that the concept *should already be* in `meta.js`; check whether it actually is (under different wording) before adding a duplicate. Real candidates: CAGR (compound annual growth rate), Arithmetic/Geometric/Harmonic Mean (if not already one of the existing `concepts`), real risk-free rate, compounding frequency.

- [ ] **Step 2: Add missing entries to `topics/rates-returns/meta.js`**

For each concept confirmed genuinely missing, append a new object to `concepts` or `vocabulary` (per shape in Global Constraints), sourced from the matching question's explanation text. Do not touch existing entries.

- [ ] **Step 3: Re-run the checker**

Run: `node scripts/check-knowledge-coverage.js rates-returns`
Expected: no flags naming a real, uncovered concept.

- [ ] **Step 4: Validate the file still loads**

Run: `node -e "global.window={}; require('./topics/rates-returns/meta.js'); require('./topics/rates-returns/questions.js'); console.log('concepts', window.TOPIC_META.concepts.length, 'vocab', window.TOPIC_META.vocabulary.length);"`
Expected: prints without throwing, counts higher than the pre-edit baseline (11 total per the design-doc audit).

- [ ] **Step 5: Commit**

```bash
git add topics/rates-returns/meta.js
git commit -m "Fill rates-returns knowledge gaps found in real questions"
```

---

### Task 5: sampling-estimation coverage

**Files:**
- Modify: `topics/sampling-estimation/meta.js`
- Read (source of truth, do not modify): `topics/sampling-estimation/questions.js`

**Interfaces:**
- Consumes: `scripts/check-knowledge-coverage.js` from Task 1.

- [ ] **Step 1: Run the checker and read the flagged questions**

Run: `node scripts/check-knowledge-coverage.js sampling-estimation`
Expected output (baseline):
```
sampling-estimation: 14 flagged gap(s)
  - [imported-001] "可靠性因子 × 标准误" not found in concepts/vocabulary
  - [imported-001] "point estimate" not found in concepts/vocabulary
  - [imported-001] "reliability factor" not found in concepts/vocabulary
  - [imported-033] "非概率抽样" not found in concepts/vocabulary
  - [imported-033] "probability sampling" not found in concepts/vocabulary
  - [imported-033] "如便利抽样、判断抽样" not found in concepts/vocabulary
  - [imported-040] "statistic,例如样本均值" not found in concepts/vocabulary
  - [imported-040] "the quantity it is intended to estimate,例如总体均值" not found in concepts/vocabulary
  - [imported-073] "convenience sampling" not found in concepts/vocabulary
  - [imported-088] "binomial distribution" not found in concepts/vocabulary
  - [imported-088] "1-p" not found in concepts/vocabulary
  - [imported-088] "此处p=0.3,总体分布本身是偏态的" not found in concepts/vocabulary
  - [imported-092] "sector" not found in concepts/vocabulary
  - [imported-092] "strata" not found in concepts/vocabulary
```
Open `topics/sampling-estimation/questions.js` and read the full explanations for `imported-001`, `imported-033`, `imported-040`, `imported-073`, `imported-088`, `imported-092`. `"1-p"` is math notation noise. Real candidates: confidence interval formula (可靠性因子 × 标准误 / reliability factor × standard error), point estimate, probability sampling vs non-probability sampling (including convenience sampling, judgmental sampling), statistic vs the population parameter it estimates, binomial distribution (as used for a sampling proportion), sector/strata (stratified sampling terms).

- [ ] **Step 2: Add missing entries to `topics/sampling-estimation/meta.js`**

For each concept confirmed genuinely missing, append a new object to `concepts` or `vocabulary` (per shape in Global Constraints), sourced from the matching question's explanation text. Do not touch existing entries.

- [ ] **Step 3: Re-run the checker**

Run: `node scripts/check-knowledge-coverage.js sampling-estimation`
Expected: only math-notation-noise flags remain, if any.

- [ ] **Step 4: Validate the file still loads**

Run: `node -e "global.window={}; require('./topics/sampling-estimation/meta.js'); require('./topics/sampling-estimation/questions.js'); console.log('concepts', window.TOPIC_META.concepts.length, 'vocab', window.TOPIC_META.vocabulary.length);"`
Expected: prints without throwing, counts higher than the pre-edit baseline (9 total per the design-doc audit).

- [ ] **Step 5: Commit**

```bash
git add topics/sampling-estimation/meta.js
git commit -m "Fill sampling-estimation knowledge gaps found in real questions"
```

---

### Task 6: simulation coverage

**Files:**
- Modify: `topics/simulation/meta.js`
- Read (source of truth, do not modify): `topics/simulation/questions.js`

**Interfaces:**
- Consumes: `scripts/check-knowledge-coverage.js` from Task 1.

- [ ] **Step 1: Run the checker and read the flagged questions**

Run: `node scripts/check-knowledge-coverage.js simulation`
Expected output (baseline):
```
simulation: 2 flagged gap(s)
  - [imported-024] "自举重抽样" not found in concepts/vocabulary
  - [imported-051] "自举法标准误" not found in concepts/vocabulary
```
Open `topics/simulation/questions.js` and read the full explanations for `imported-024` and `imported-051`. Both point at the same underlying concept: bootstrap resampling (自举法/自举重抽样) and the standard error it produces. This topic only has 4 existing `concepts`/`vocabulary` entries total (per the design-doc audit) — bootstrapping is very likely a genuine gap here, not a wording mismatch.

- [ ] **Step 2: Add missing entries to `topics/simulation/meta.js`**

Append a new `concepts` entry (or `vocabulary` if it's better framed as a term than a formula) for bootstrap resampling / bootstrap standard error, sourced from the `imported-024`/`imported-051` explanations. Do not touch existing entries.

- [ ] **Step 3: Re-run the checker**

Run: `node scripts/check-knowledge-coverage.js simulation`
Expected: `simulation: OK (no flagged gaps)`.

- [ ] **Step 4: Validate the file still loads**

Run: `node -e "global.window={}; require('./topics/simulation/meta.js'); require('./topics/simulation/questions.js'); console.log('concepts', window.TOPIC_META.concepts.length, 'vocab', window.TOPIC_META.vocabulary.length);"`
Expected: prints without throwing, counts higher than the pre-edit baseline (4 total per the design-doc audit).

- [ ] **Step 5: Commit**

```bash
git add topics/simulation/meta.js
git commit -m "Fill simulation knowledge gaps found in real questions"
```

---

### Task 7: stats-returns coverage

**Files:**
- Modify: `topics/stats-returns/meta.js`
- Read (source of truth, do not modify): `topics/stats-returns/questions.js`

**Interfaces:**
- Consumes: `scripts/check-knowledge-coverage.js` from Task 1.

- [ ] **Step 1: Run the checker and read the flagged questions**

Run: `node scripts/check-knowledge-coverage.js stats-returns`
Expected output (baseline):
```
stats-returns: 7 flagged gap(s)
  - [imported-018] "偏度与集中趋势指标的顺序关系" not found in concepts/vocabulary
  - [imported-021] "偏度与集中趋势指标的顺序关系" not found in concepts/vocabulary
  - [imported-038] "n+1" not found in concepts/vocabulary
  - [imported-038] "y/100" not found in concepts/vocabulary
  - [imported-043] "中位数 median" not found in concepts/vocabulary
  - [imported-085] "偏度的经济含义" not found in concepts/vocabulary
  - [imported-089] "偏度的图形判断" not found in concepts/vocabulary
```
Open `topics/stats-returns/questions.js` and read the full explanations for `imported-018`, `imported-021`, `imported-038`, `imported-043`, `imported-085`, `imported-089`. `"n+1"`/`"y/100"` are math notation noise. Real recurring theme across 4 of the flagged questions (018, 021, 085, 089): skewness (偏度) — specifically the ordering of mean/median/mode under positive/negative skew, its economic meaning, and how to read it off a distribution shape. Also check median (中位数) as a standalone term.

- [ ] **Step 2: Add missing entries to `topics/stats-returns/meta.js`**

For each concept confirmed genuinely missing, append a new object to `concepts` or `vocabulary` (per shape in Global Constraints), sourced from the matching question's explanation text. Since skewness ordering/economic-meaning/graphical-reading appear across 4 questions, consider whether one well-developed `concepts` entry covering all three angles (grounded in all 4 explanations) serves the reader better than four overlapping entries — use judgment, but do not touch existing entries.

- [ ] **Step 3: Re-run the checker**

Run: `node scripts/check-knowledge-coverage.js stats-returns`
Expected: only math-notation-noise flags remain, if any.

- [ ] **Step 4: Validate the file still loads**

Run: `node -e "global.window={}; require('./topics/stats-returns/meta.js'); require('./topics/stats-returns/questions.js'); console.log('concepts', window.TOPIC_META.concepts.length, 'vocab', window.TOPIC_META.vocabulary.length);"`
Expected: prints without throwing, counts higher than the pre-edit baseline (14 total per the design-doc audit).

- [ ] **Step 5: Commit**

```bash
git add topics/stats-returns/meta.js
git commit -m "Fill stats-returns knowledge gaps found in real questions"
```

---

### Task 8: tests-independence coverage

**Files:**
- Modify: `topics/tests-independence/meta.js`
- Read (source of truth, do not modify): `topics/tests-independence/questions.js`

**Interfaces:**
- Consumes: `scripts/check-knowledge-coverage.js` from Task 1.

- [ ] **Step 1: Run the checker and read the flagged questions**

Run: `node scripts/check-knowledge-coverage.js tests-independence`
Expected output (baseline):
```
tests-independence: 7 flagged gap(s)
  - [imported-004] "非参数检验" not found in concepts/vocabulary
  - [imported-016] "r-1" not found in concepts/vocabulary
  - [imported-016] "c-1" not found in concepts/vocabulary
  - [imported-017] "n−2" not found in concepts/vocabulary
  - [imported-017] "1−r²" not found in concepts/vocabulary
  - [imported-083] "n²−1" not found in concepts/vocabulary
  - [imported-090] "非参数检验" not found in concepts/vocabulary
```
Open `topics/tests-independence/questions.js` and read the full explanations for `imported-004`, `imported-016`, `imported-017`, `imported-083`, `imported-090`. `"r-1"`/`"c-1"`/`"n−2"`/`"1−r²"`/`"n²−1"` are math notation noise (degrees-of-freedom expressions). The one real recurring flag is 非参数检验 (nonparametric test) — appears in 2 questions (`imported-004`, `imported-090`); check whether the topic already explains parametric vs nonparametric testing under different wording before treating it as missing.

- [ ] **Step 2: Add missing entries to `topics/tests-independence/meta.js`**

If nonparametric testing is genuinely missing, append a new `concepts` or `vocabulary` entry (per shape in Global Constraints), sourced from the `imported-004`/`imported-090` explanations. Do not touch existing entries.

- [ ] **Step 3: Re-run the checker**

Run: `node scripts/check-knowledge-coverage.js tests-independence`
Expected: only math-notation-noise flags remain (degrees-of-freedom expressions), no `"非参数检验"` flag if it was genuinely added.

- [ ] **Step 4: Validate the file still loads**

Run: `node -e "global.window={}; require('./topics/tests-independence/meta.js'); require('./topics/tests-independence/questions.js'); console.log('concepts', window.TOPIC_META.concepts.length, 'vocab', window.TOPIC_META.vocabulary.length);"`
Expected: prints without throwing, counts >= pre-edit baseline (8 total per the design-doc audit).

- [ ] **Step 5: Commit**

```bash
git add topics/tests-independence/meta.js
git commit -m "Fill tests-independence knowledge gaps found in real questions"
```

---

### Task 9: Final full-site verification

**Files:**
- None modified — read-only verification pass.

**Interfaces:**
- Consumes: all edits from Tasks 2-8, `scripts/check-knowledge-coverage.js` from Task 1.

- [ ] **Step 1: Run the checker across all 11 topics**

Run: `node scripts/check-knowledge-coverage.js`
Expected: `big-data`, `hypothesis-testing`, `regression`, `tvm` still `OK` (untouched, already covered); the 7 topics from Tasks 2-8 show only math-notation-noise flags, if any — no flag names a real concept that isn't covered somewhere in that topic's `concepts`/`vocabulary`.

- [ ] **Step 2: Spot-check a few pages in the browser**

Serve the site locally (`node scripts/serve.js` per the existing repo tooling) and open at least 3 of the 7 modified topics' `index.html` pages (e.g. `sampling-estimation`, `probability-trees`, `stats-returns`). Confirm the "详细讲解" and "高频词汇" sections render without console errors and the newly added entries display correctly (correct Chinese text, formulas render via KaTeX where present).

- [ ] **Step 3: Run the existing test suite to confirm nothing else broke**

Run: `node --test tests/`
Expected: all existing tests still pass (this change touches only `meta.js` data files, not `js/calculators/tvm-math.js` or the import pipeline the existing tests cover, so no regressions expected).

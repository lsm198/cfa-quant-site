# Design: Knowledge-Point Question Counts & Per-Question Attempt Counts

## Problem

The user wants two things surfaced in the UI:

1. For each knowledge point shown on a topic page (an entry in `concepts[]`
   or `vocabulary[]`), how many real questions in that topic actually test
   it.
2. For each question, how many times it has been attempted ("做了几次") —
   distinct from the existing "已错 N 次" (wrong count) badge, which only
   counts incorrect attempts.

## Part 2 is nearly free

`state.questions[id].attempts` (in `js/progress.js`) is already an array
of every attempt (`{correct, ts}`). Its `.length` is exactly "how many
times this question has been done." Add one pure function,
`getAttemptCount(state, questionId)`, mirroring the existing
`getIncorrectCount`. Display it in `js/quiz.js` next to the existing wrong
badge. Since `js/wrong-book.js` renders its questions through
`renderQuiz`, this single change covers both the topic page's practice
view and the wrong-book view — no duplicate work needed.

## Part 1 requires a term ↔ question link

There is no explicit field connecting a question to a specific
`concepts[]`/`vocabulary[]` entry today. Every question's `explanation_zh`
starts with a `【知识点】<clause>。` tag naming the concept(s) in prose.

**Validated approach (prototyped against the real corpus before writing
this plan):** extract the full first clause between `【知识点】` and the
first `。`, normalize whitespace, lowercase, and check substring
containment against each topic's `concepts[].term_en` +
`vocabulary[].term_en` (also normalized). A term matches a question if the
term text appears anywhere in the question's knowledge-point clause.

This was run against all 93 questions across all 11 topics. Result: 90/93
matched at least one term with zero code changes. The 3 misses:

- `portfolio-math/imported-057`: tag reads `Covariance(Joint Probability
  Function)` (no space before the parenthesis) vs the term
  `Covariance (Joint Probability Function)` (with a space). Fixed by the
  matching function itself: strip all whitespace from both sides before
  comparing, not just trim/lowercase. This one needs no data edit.
- `rates-returns/imported-039` and `rates-returns/imported-055`: both
  reference the combined concept "Arithmetic Mean, Geometric Mean, and
  Harmonic Mean" using different phrasing (`Arithmetic / Geometric /
  Harmonic Mean` and `Harmonic Mean & cost averaging` respectively) that
  doesn't contain the term string. These two need their `explanation_zh`
  tag clause edited to include the literal term phrase so the
  general-purpose matcher picks them up — the same kind of small tagging
  fix made to `tvm/imported-031` in the prior completeness pass. No other
  wording in either explanation changes.

No other topic or question needs a data edit. This keeps the feature
almost entirely code (a new pure module + one UI wiring change), not a
93-question content pass.

## Design

New pure module `js/knowledge-points.js`:

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
  if (normTerm.length < 4) return 0; // guard against pathological short terms
  let count = 0;
  for (const q of questions) {
    const clause = extractKnowledgePointClause(q.explanation_zh);
    if (clause && normalize(clause).includes(normTerm)) count++;
  }
  return count;
}
```

`countQuestionsForTerm` is called once per rendered concept/vocabulary
entry — at most ~15 terms per topic, 93 questions total, negligible cost,
no memoization needed.

**`js/topic-page.js` changes:** `renderConcepts(container, concepts,
questions)` and `renderVocabulary(container, vocabulary, questions)` gain
a `questions` parameter (already available in `renderTopicPage`, just not
threaded through to these two functions today — the call sites at
`renderConcepts(container, meta.concepts)` /
`renderVocabulary(container, meta.vocabulary)` become
`renderConcepts(container, meta.concepts, questions)` /
`renderVocabulary(container, meta.vocabulary, questions)`). Each rendered
term gets a small count badge, e.g. "3 道题" — styled as a `<span
class="kp-count-badge">`, matching the visual weight of the existing
`.quiz-wrong-badge` pattern but neutral-colored (informational, not a
warning). No links or filtering — a static count is what was asked for.

**`js/progress.js` addition:**

```js
export function getAttemptCount(state, questionId) {
  const attempts = (state.questions[questionId] && state.questions[questionId].attempts) || [];
  return attempts.length;
}
```

**`js/quiz.js` change:** in `renderQuestion`, alongside the existing
`wrongCount` badge, add an attempt-count badge, e.g. "已做 N 次", shown
whenever `getAttemptCount(state, qId) > 0` (matching the existing
`wrongCount > 0` convention — no badge for a never-attempted question).
Computed once at question render time, same as the existing wrong-count
badge (which does not live-update mid-session after an answer — this
change follows the same convention, not a new one).

## Data model

No changes to `state` shape. `getAttemptCount` is a read-only derived
value from the existing `attempts` array.

## Scope

- `js/progress.js`: add `getAttemptCount` + tests.
- New `js/knowledge-points.js`: `extractKnowledgePointClause`,
  `countQuestionsForTerm` + tests (unit tests with synthetic fixtures
  covering: exact match, clause-contains-term, whitespace mismatch,
  no-match, short-term guard — plus one integration-style test that loads
  real topic data and asserts every question maps to at least one term
  after the two `rates-returns` tag edits land, to keep this guarantee
  enforced by the test suite instead of a one-off manual check).
- `js/topic-page.js`: thread `questions` into `renderConcepts` /
  `renderVocabulary`, add count badges.
- `js/quiz.js`: add attempt-count badge using `getAttemptCount`.
- `css/style.css`: one new badge class (`.kp-count-badge`), neutral
  styling distinct from the existing red wrong-badge.
- Two tag-clause edits: `topics/rates-returns/questions.js` questions
  `imported-039` and `imported-055` — broaden the `【知识点】` clause to
  include the literal term phrase `Arithmetic Mean, Geometric Mean, and
  Harmonic Mean`. No other wording in either explanation changes.

## Out of scope

- Any navigation/filtering from a knowledge-point badge to its questions.
- Any change to how attempts are recorded or the wrong-book/Ebbinghaus
  features.
- Any change to any question or topic content beyond the two named tag
  edits.

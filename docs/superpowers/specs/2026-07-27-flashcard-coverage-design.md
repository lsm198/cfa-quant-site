# Design: Flashcard Coverage & Explanation Completeness

## Problem

The knowledge-point-completeness pass on 2026-07-26 ensured every 【知识点】
term tagged in a question's `explanation_zh` is findable somewhere on its
topic's page (`concepts[]` or `vocabulary[]`). It did not check the
`flashcards[]` array specifically, and `flashcards[]` is the array driving
both the per-topic flashcard browser (`js/flashcard.js`) and the new
Ebbinghaus "今日复习" spaced-repetition queue (`js/review.js`). A term that
is only in `concepts[]`/`vocabulary[]` is readable on the topic page but
never surfaces as a reviewable flashcard.

The user's request: every knowledge point a question actually needs to be
solved must (a) be fully covered in that question's `explanation_zh`, and
(b) be findable as a flashcard, not just as page text.

## Audit findings (2026-07-27)

A full read of all 11 topics' `questions.js` + `meta.js` (93 questions, 45
existing flashcards) found:

- **Check A (explanation completeness):** 1 gap. `tvm` question
  `imported-031` needs both the ordinary-annuity PV formula and the
  annuity-due adjustment to solve, but only the annuity-due adjustment is
  named in the 【知识点】 tag. Fix: broaden the tag/lead sentence to name
  both concepts (no new fact needs to be added to the body — the ordinary
  annuity PV calculation is already worked through in `explanation_en`; the
  Chinese explanation just needs to name it as a co-equal concept).
- **Check B (flashcard coverage):** ~30 gaps across 9 of the 11 topics —
  concepts named in a question's 【知识点】 tag with no corresponding
  flashcard. Heaviest in `stats-returns` (7), `rates-returns` (5),
  `regression` (4), `portfolio-math` (3), `probability-trees` (3),
  `big-data` (3), `sampling-estimation` (2), `hypothesis-testing` (1),
  `tvm` (0, only the Check A tagging issue). `simulation` and
  `tests-independence` have full coverage already.

Full gap list with suggested `front_en`/`back_zh` text per topic is in the
audit transcript (session history) — the plan document embeds the exact
flashcard entries to add per task, sourced from that audit.

## Scope

- Add the missing flashcard entries identified by the audit to each
  affected topic's `meta.js` `flashcards[]` array.
- Fix the one Check A gap: broaden `tvm/imported-031`'s explanation_zh to
  name the ordinary-annuity PV formula alongside the annuity-due
  adjustment as concepts the question requires.
- Do not touch `questions.js` content beyond that one explanation_zh edit.
- Do not add flashcards for concepts not actually tested by a real
  question — this pass fills gaps the audit found, not a general content
  expansion.
- Do not change `js/flashcard.js`, `js/review.js`, `js/progress.js`, or
  any other application code — this is a content-only pass.
- New flashcards must match the existing style: concise `front_en`
  (English concept name/prompt) + `back_zh` (Chinese formula/fact,
  typically one line).

## Data model

No change. `flashcards[]` entries are `{ front_en, back_zh }` objects
appended to the existing array in each topic's `meta.js`.

## Testing

No new automated tests — this is static content data, same convention as
the 2026-07-26 knowledge-point-completeness pass (verified there by
re-running the audit method, not unit tests). Verification for this pass:
after edits, each topic's flashcard count should increase by exactly the
number of gaps closed, and a final read-through confirms every 【知识点】
tag across all 93 questions has a matching flashcard.

## Out of scope

- Any change to the Ebbinghaus scheduling feature itself.
- Any change to question stems, choices, or answers.
- Broader content review beyond the specific gaps the audit identified.

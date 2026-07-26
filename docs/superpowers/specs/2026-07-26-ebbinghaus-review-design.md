# Ebbinghaus Forgetting-Curve Flashcard Review — Design

## Goal

Add spaced-repetition scheduling to the existing flashcard ("翻卡片") feature,
based on the classic Ebbinghaus forgetting-curve interval schedule, so users
get a single cross-topic "今日复习" queue of cards that are due today instead
of relying on the binary 记住了/还不熟 flag alone.

## Scope

- **In scope:** flashcards only (`meta.js`'s `flashcards[]` per topic).
- **Out of scope:** wrong-book questions and quiz questions. The wrong-book
  is an immediate-retry loop ("got it wrong, drill it again now"), not a
  calendar-scheduled review — mixing the two would blur two different
  interaction models. It can get the same treatment later as a separate,
  independently-scoped feature if wanted.
- **Out of scope:** any backend/account sync — this site is static and uses
  `localStorage` only, same as everything else in the app.

## Algorithm

Fixed Ebbinghaus interval schedule, in days: `[1, 2, 4, 7, 15, 30]`.

Each flashcard tracks a `stage` (index into the interval array, representing
"how many consecutive successful reviews so far") and a `dueAt` timestamp
(ms epoch).

- **记住了 (remembered):** if `stage` is still within the interval array
  (`stage < intervals.length`), the next due date = `now + intervals[stage]
  days` and `stage += 1`. If `stage` has already reached the end of the
  interval array (i.e. this review comes after the 30-day wait was already
  scheduled and has now also been answered correctly), the card graduates
  instead: `mastered = true`, `dueAt = null`, and it permanently drops out
  of the due queue. This means graduating takes 7 total successful reviews
  (one at each of the 6 intervals, then one final confirming review after
  the last 30-day wait) — the 30-day interval is actually waited out, not
  skipped.
- **还不熟 (don't know it):** `stage = 0`, `dueAt = now` — the card is due
  again immediately, so it resurfaces in the same or next review session
  instead of waiting a day.

A card with no stored schedule (new, or from data written before this
feature existed) is treated as due now — this includes existing
`mastered: false` entries, which is the correct migration behavior: they
haven't been scheduled yet, so they start the schedule now. Existing
`mastered: true` entries stay excluded from the queue — real progress the
user already recorded via the old binary flag is not reset.

## Data Model

`js/progress.js`, additive change to the flashcard entry shape only:

```
flashcards[id] = { mastered: boolean, stage?: number, dueAt?: number | null }
```

`stage`/`dueAt` are optional for backward compatibility with progress JSON
saved before this feature; readers must treat missing values as "stage 0,
due now" (see Algorithm above). No changes to the `questions` half of the
progress shape.

New pure functions in `js/progress.js` (same style as the existing ones —
no DOM, fully unit-testable):

- `EBBINGHAUS_INTERVALS_DAYS` — the constant `[1, 2, 4, 7, 15, 30]`.
- `getFlashcardSchedule(state, flashcardId)` — returns
  `{ stage, dueAt, mastered }` with defaults applied.
- `isFlashcardDue(state, flashcardId, now)` — `false` if mastered, `true`
  if `dueAt` is null/missing or `dueAt <= now`.
- `reviewFlashcard(state, flashcardId, remembered, now)` — returns a new
  state with the flashcard's schedule updated per the Algorithm section.

`setFlashcardMastered`/`isFlashcardMastered` (existing functions used by the
per-topic flashcard browser's "记住了/还不熟" buttons) are unaffected — they
continue to only touch `mastered` and are not required to also touch
`stage`/`dueAt`. This keeps the existing per-topic flashcard browser
(`js/flashcard.js`) untouched and low-risk.

## UI

New page `review.html` (mirrors `wrong-book.html`'s structure) backed by a
new `js/review.js` module (mirrors `wrong-book.js`'s structure):

- Fetches every topic's `meta.js` to read `flashcards[]`, using the id
  convention already established in `js/flashcard.js`
  (`` `${topicId}-fc-${i}` ``).
- Filters to cards where `isFlashcardDue(state, id, now)` is true, across
  all topics.
- Header shows "今日待复习 N 张".
- If N is 0: friendly empty state, "今天没有需要复习的卡片,明天再来".
- Otherwise: single-card flip UI (same interaction as `js/flashcard.js` —
  click to flip front/back, front is `front_en`, back is `back_zh`), with
  记住了/还不熟 buttons that call `reviewFlashcard` + `saveProgress` and
  advance to the next due card. Each card also shows which topic it belongs
  to (so the user has context / a link back to that topic page).
- After the last due card is reviewed: completion message, e.g.
  "今日复习完成!".

Homepage (`index.html`) gets one new nav link next to the existing
`TVM 计算器 · 错题本` line: `· 今日复习` → `review.html`. No due-count badge
on the homepage (would require fetching all 11 topics' `meta.js` on every
homepage load just for a number — not worth the extra network cost for a
static personal site; the count is one click away on the review page
itself).

## Refactor: shared topic-module loader

`wrong-book.js` already has this pattern for reading a topic's
`questions.js`:

```js
async function loadTopicQuestions(topicId) {
  const res = await fetch(`topics/${topicId}/questions.js`);
  const code = await res.text();
  const sandbox = {};
  const fn = new Function("window", `${code}\nreturn window.TOPIC_QUESTIONS;`);
  return fn(sandbox) || [];
}
```

`review.js` needs the identical fetch-and-eval trick to read a topic's
`meta.js` (for its `flashcards[]`). Rather than duplicate this, extract a
shared `js/topic-loader.js`:

```js
export async function loadTopicModule(topicId, filename, globalName) {
  const res = await fetch(`topics/${topicId}/${filename}`);
  const code = await res.text();
  const sandbox = {};
  const fn = new Function("window", `${code}\nreturn window.${globalName};`);
  return fn(sandbox);
}
```

`wrong-book.js` is updated to call
`loadTopicModule(topic.id, "questions.js", "TOPIC_QUESTIONS") || []` in
place of its local `loadTopicQuestions`, preserving its existing
`|| []` fallback at the call site. `review.js` calls
`loadTopicModule(topic.id, "meta.js", "TOPIC_META") || {}` and reads
`.flashcards` off the result. This is a behavior-preserving extraction, not
a redesign — `wrong-book.js`'s rendering logic and tests-of-record (there
are none; it's DOM-only, same as before) are unaffected.

## Testing

- Unit tests (Node's built-in `node:test`, same as `tests/progress.test.js`)
  for the four new pure functions in `js/progress.js`: interval progression
  across all six stages, graduation after the sixth success, reset-to-due-now
  on "还不熟", and the backward-compat defaults for entries with no stored
  schedule (including pre-existing `mastered: true`/`mastered: false`
  entries).
- No unit tests for `review.js`/`topic-loader.js`/the `review.html` page —
  consistent with the existing codebase convention (`wrong-book.js`,
  `flashcard.js`, `topic-page.js` are all DOM-rendering and have no unit
  tests; they're verified by hand in a browser). This plan's final task
  includes manual browser verification of the new review page: due cards
  appear, flip works, 记住了/还不熟 update the schedule and remove the card
  from the current queue, the empty state renders once the queue is
  cleared, and the homepage nav link works.

## Global Constraints

- Zero new dependencies; no build step. Plain ES modules, same as the rest
  of the site.
- Must work when served via `scripts/serve.js` with no server-side changes.
- Backward-compatible with existing `localStorage` progress data — must
  never wipe or reinterpret a user's previously recorded `mastered: true`
  flashcards as "due now."
- No changes to the `questions` half of the progress state shape, to
  `js/quiz.js`, or to calculator-related code — out of scope.

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  createEmptyProgress,
  parseProgress,
  serializeProgress,
  setFlashcardMastered,
  isFlashcardMastered,
  EBBINGHAUS_INTERVALS_DAYS,
  getFlashcardSchedule,
  isFlashcardDue,
  reviewFlashcard,
  recordAttempt,
  computeAccuracy,
  getIncorrectCount,
  getAttemptCount,
  isCurrentlyWrong,
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
  state = recordAttempt(state, "tvm-001", true, 200);
  state = recordAttempt(state, "tvm-002", false, 100);
  assert.equal(computeAccuracy(state, ["tvm-001", "tvm-002"]), 50);
});

test("computeAccuracy ignores questions never attempted", () => {
  let state = createEmptyProgress();
  state = recordAttempt(state, "tvm-001", true, 100);
  assert.equal(computeAccuracy(state, ["tvm-001", "tvm-002", "tvm-003"]), 100);
});

test("getIncorrectCount counts only incorrect attempts", () => {
  let state = createEmptyProgress();
  assert.equal(getIncorrectCount(state, "tvm-001"), 0);
  state = recordAttempt(state, "tvm-001", false, 100);
  state = recordAttempt(state, "tvm-001", true, 200);
  state = recordAttempt(state, "tvm-001", false, 300);
  assert.equal(getIncorrectCount(state, "tvm-001"), 2);
});

test("getAttemptCount returns 0 for a question with no attempts", () => {
  const state = createEmptyProgress();
  assert.equal(getAttemptCount(state, "tvm-001"), 0);
});

test("getAttemptCount counts all attempts including both correct and incorrect", () => {
  let state = createEmptyProgress();
  state = recordAttempt(state, "tvm-001", false, 100);
  state = recordAttempt(state, "tvm-001", true, 200);
  state = recordAttempt(state, "tvm-001", false, 300);
  assert.equal(getAttemptCount(state, "tvm-001"), 3);
});

test("getAttemptCount counts all attempts while getIncorrectCount counts only incorrect ones", () => {
  let state = createEmptyProgress();
  state = recordAttempt(state, "tvm-001", false, 100);
  state = recordAttempt(state, "tvm-001", true, 200);
  state = recordAttempt(state, "tvm-001", false, 300);
  assert.equal(getAttemptCount(state, "tvm-001"), 3);
  assert.equal(getIncorrectCount(state, "tvm-001"), 2);
});

test("isCurrentlyWrong reflects only the latest attempt", () => {
  let state = createEmptyProgress();
  assert.equal(isCurrentlyWrong(state, "tvm-001"), false);
  state = recordAttempt(state, "tvm-001", false, 100);
  assert.equal(isCurrentlyWrong(state, "tvm-001"), true);
  state = recordAttempt(state, "tvm-001", true, 200);
  assert.equal(isCurrentlyWrong(state, "tvm-001"), false);
});

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

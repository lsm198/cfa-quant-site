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
  getIncorrectCount,
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

test("isCurrentlyWrong reflects only the latest attempt", () => {
  let state = createEmptyProgress();
  assert.equal(isCurrentlyWrong(state, "tvm-001"), false);
  state = recordAttempt(state, "tvm-001", false, 100);
  assert.equal(isCurrentlyWrong(state, "tvm-001"), true);
  state = recordAttempt(state, "tvm-001", true, 200);
  assert.equal(isCurrentlyWrong(state, "tvm-001"), false);
});

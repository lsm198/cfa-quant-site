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

export function getIncorrectCount(state, questionId) {
  const attempts = (state.questions[questionId] && state.questions[questionId].attempts) || [];
  return attempts.filter((a) => !a.correct).length;
}

export function isCurrentlyWrong(state, questionId) {
  const attempts = (state.questions[questionId] && state.questions[questionId].attempts) || [];
  if (attempts.length === 0) return false;
  return !attempts[attempts.length - 1].correct;
}

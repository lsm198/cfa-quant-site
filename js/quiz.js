import { loadProgress, saveProgress } from "./app.js";
import { recordAttempt, computeAccuracy, getIncorrectCount, isCurrentlyWrong, getAttemptCount } from "./progress.js";

export function renderQuiz(container, questions, topicId) {
  if (!questions || questions.length === 0) {
    const empty = document.createElement("p");
    empty.className = "section-label";
    empty.textContent = "暂无练习题";
    container.appendChild(empty);
    return;
  }

  let state = loadProgress();
  let showOnlyWrong = false;

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
  container.appendChild(accuracyEl);

  const toggleLabel = document.createElement("label");
  toggleLabel.className = "quiz-filter-toggle";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  toggleLabel.appendChild(checkbox);
  toggleLabel.appendChild(document.createTextNode(" 只看错题"));
  container.appendChild(toggleLabel);

  const listEl = document.createElement("div");
  container.appendChild(listEl);

  function renderQuestion(question, i) {
    const qId = idFor(i);
    const qEl = document.createElement("div");
    qEl.className = "quiz-question";

    const wrongCount = getIncorrectCount(state, qId);
    if (wrongCount > 0) {
      const badge = document.createElement("span");
      badge.className = "quiz-wrong-badge";
      badge.textContent = `已错 ${wrongCount} 次`;
      qEl.appendChild(badge);
    }

    const attemptCount = getAttemptCount(state, qId);
    if (attemptCount > 0) {
      const attemptBadge = document.createElement("span");
      attemptBadge.className = "count-badge";
      attemptBadge.textContent = `已做 ${attemptCount} 次`;
      qEl.appendChild(attemptBadge);
    }

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
    return qEl;
  }

  function render() {
    accuracyEl.textContent = accuracyLabel();
    listEl.innerHTML = "";
    const visible = questions
      .map((q, i) => ({ q, i }))
      .filter(({ i }) => !showOnlyWrong || isCurrentlyWrong(state, idFor(i)));

    if (visible.length === 0) {
      const done = document.createElement("p");
      done.className = "section-label";
      done.textContent = showOnlyWrong ? "没有错题,继续保持" : "暂无练习题";
      listEl.appendChild(done);
      return;
    }

    for (const { q, i } of visible) {
      listEl.appendChild(renderQuestion(q, i));
    }
  }

  checkbox.addEventListener("change", () => {
    showOnlyWrong = checkbox.checked;
    render();
  });

  render();
}

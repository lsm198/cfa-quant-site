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

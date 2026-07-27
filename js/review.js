import { TOPICS } from "./nav-data.js";
import { loadProgress, saveProgress } from "./app.js";
import { isFlashcardDue, reviewFlashcard } from "./progress.js";
import { loadTopicModule } from "./topic-loader.js";

export async function renderReview(container) {
  const heading = document.createElement("h1");
  heading.textContent = "今日复习(艾宾浩斯记忆曲线)";
  container.appendChild(heading);

  const loading = document.createElement("p");
  loading.className = "section-label";
  loading.textContent = "加载中...";
  container.appendChild(loading);

  let state = loadProgress();
  const now = Date.now();
  const due = [];

  for (const topic of TOPICS) {
    const meta = (await loadTopicModule(topic.id, "meta.js", "TOPIC_META")) || {};
    const flashcards = meta.flashcards || [];
    flashcards.forEach((card, i) => {
      const id = `${topic.id}-fc-${i}`;
      if (isFlashcardDue(state, id, now)) {
        due.push({ id, card, topic });
      }
    });
  }

  loading.remove();

  const summary = document.createElement("p");
  summary.className = "section-label";
  container.appendChild(summary);

  const cardArea = document.createElement("div");
  container.appendChild(cardArea);

  function render() {
    summary.textContent = `今日待复习 ${due.length} 张`;
    cardArea.innerHTML = "";

    if (due.length === 0) {
      const done = document.createElement("p");
      done.className = "section-label";
      done.textContent = "今天没有需要复习的卡片,明天再来";
      cardArea.appendChild(done);
      return;
    }

    const item = due[0];
    let flipped = false;

    const topicLabel = document.createElement("p");
    topicLabel.className = "section-label";
    topicLabel.textContent = `${item.topic.title_zh} (${item.topic.title_en})`;
    cardArea.appendChild(topicLabel);

    const cardEl = document.createElement("div");
    cardEl.className = "flashcard";
    function renderFace() {
      cardEl.textContent = flipped ? item.card.back_zh : item.card.front_en;
    }
    renderFace();
    cardEl.addEventListener("click", () => {
      flipped = !flipped;
      renderFace();
    });
    cardArea.appendChild(cardEl);

    const hint = document.createElement("p");
    hint.className = "flashcard-hint";
    hint.textContent = "点击卡片查看背面";
    cardArea.appendChild(hint);

    const controls = document.createElement("div");
    controls.className = "flashcard-controls";

    const notYetBtn = document.createElement("button");
    notYetBtn.textContent = "还不熟";
    notYetBtn.addEventListener("click", () => {
      state = reviewFlashcard(state, item.id, false, Date.now());
      saveProgress(state);
      due.shift();
      due.push(item);
      render();
    });

    const masteredBtn = document.createElement("button");
    masteredBtn.textContent = "记住了";
    masteredBtn.addEventListener("click", () => {
      state = reviewFlashcard(state, item.id, true, Date.now());
      saveProgress(state);
      due.shift();
      render();
    });

    controls.appendChild(notYetBtn);
    controls.appendChild(masteredBtn);
    cardArea.appendChild(controls);
  }

  render();
}

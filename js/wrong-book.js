import { TOPICS } from "./nav-data.js";
import { loadProgress } from "./app.js";
import { isCurrentlyWrong, getIncorrectCount } from "./progress.js";
import { renderQuiz } from "./quiz.js";
import { loadTopicModule } from "./topic-loader.js";

export async function renderWrongBook(container) {
  const heading = document.createElement("h1");
  heading.textContent = "错题本";
  container.appendChild(heading);

  const loading = document.createElement("p");
  loading.className = "section-label";
  loading.textContent = "加载中...";
  container.appendChild(loading);

  const state = loadProgress();
  const groups = [];

  for (const topic of TOPICS) {
    const questions = (await loadTopicModule(topic.id, "questions.js", "TOPIC_QUESTIONS")) || [];
    const wrongQuestions = questions.filter((q) => isCurrentlyWrong(state, q.id));
    if (wrongQuestions.length > 0) {
      wrongQuestions.sort((a, b) => getIncorrectCount(state, b.id) - getIncorrectCount(state, a.id));
      groups.push({ topic, questions: wrongQuestions });
    }
  }

  groups.sort((a, b) => b.questions.length - a.questions.length);
  loading.remove();

  const totalCount = groups.reduce((sum, g) => sum + g.questions.length, 0);

  if (totalCount === 0) {
    const empty = document.createElement("p");
    empty.className = "section-label";
    empty.textContent = "还没有错题,继续加油";
    container.appendChild(empty);
    return;
  }

  const summary = document.createElement("p");
  summary.className = "section-label";
  summary.textContent = `共 ${totalCount} 道错题,来自 ${groups.length} 个知识点(按错题数从多到少排列)`;
  container.appendChild(summary);

  for (const group of groups) {
    const groupCard = document.createElement("div");
    groupCard.className = "wrong-book-group";

    const groupLabel = document.createElement("div");
    groupLabel.className = "section-label";
    const link = document.createElement("a");
    link.href = `topics/${group.topic.id}/index.html`;
    link.textContent = `${group.topic.title_zh} (${group.topic.title_en}) · ${group.questions.length} 道`;
    groupLabel.appendChild(link);
    groupCard.appendChild(groupLabel);

    container.appendChild(groupCard);

    const quizContainer = document.createElement("div");
    container.appendChild(quizContainer);
    renderQuiz(quizContainer, group.questions, group.topic.id);
  }
}

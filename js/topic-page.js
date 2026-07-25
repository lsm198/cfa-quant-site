import { TOPICS } from "./nav-data.js";

function renderTextSection(container, id, label, text) {
  if (!text) return null;
  const label_el = document.createElement("div");
  label_el.className = "section-label";
  label_el.textContent = label;
  const body = document.createElement("p");
  body.textContent = text;
  const card = document.createElement("div");
  card.className = "card";
  card.id = id;
  card.appendChild(label_el);
  card.appendChild(body);
  container.appendChild(card);
  return { id, label };
}

function renderConcepts(container, concepts) {
  if (!concepts || concepts.length === 0) return null;
  const label_el = document.createElement("div");
  label_el.className = "section-label";
  label_el.textContent = "详细讲解";
  const card = document.createElement("div");
  card.className = "card";
  card.id = "section-concepts";
  card.appendChild(label_el);
  for (const concept of concepts) {
    const block = document.createElement("div");
    const term = document.createElement("strong");
    term.textContent = concept.term_en;
    block.appendChild(term);
    if (concept.explain_zh) {
      const p = document.createElement("p");
      p.textContent = concept.explain_zh;
      block.appendChild(p);
    }
    if (concept.formula) {
      const formulaEl = document.createElement("p");
      formulaEl.className = "formula";
      block.appendChild(formulaEl);
      if (window.katex) {
        window.katex.render(concept.formula, formulaEl, { throwOnError: false });
      } else {
        formulaEl.textContent = concept.formula;
      }
    }
    card.appendChild(block);
  }
  container.appendChild(card);
  return { id: "section-concepts", label: "详细讲解" };
}

function renderVocabulary(container, vocabulary) {
  if (!vocabulary || vocabulary.length === 0) return null;
  const label_el = document.createElement("div");
  label_el.className = "section-label";
  label_el.textContent = "高频词汇";
  const card = document.createElement("div");
  card.className = "card";
  card.id = "section-vocabulary";
  card.appendChild(label_el);
  const table = document.createElement("table");
  for (const item of vocabulary) {
    const row = document.createElement("tr");
    const termCell = document.createElement("td");
    termCell.textContent = item.term_en;
    const meaningCell = document.createElement("td");
    meaningCell.textContent = item.meaning_zh;
    row.appendChild(termCell);
    row.appendChild(meaningCell);
    table.appendChild(row);
    if (item.example_en) {
      const exampleRow = document.createElement("tr");
      exampleRow.className = "vocab-example-row";
      const spacer = document.createElement("td");
      const exampleCell = document.createElement("td");
      exampleCell.className = "vocab-example";
      exampleCell.textContent = item.example_en;
      exampleRow.appendChild(spacer);
      exampleRow.appendChild(exampleCell);
      table.appendChild(exampleRow);
    }
  }
  card.appendChild(table);
  container.appendChild(card);
  return { id: "section-vocabulary", label: "高频词汇" };
}

function renderMnemonics(container, mnemonics) {
  if (!mnemonics || mnemonics.length === 0) return null;
  const label_el = document.createElement("div");
  label_el.className = "section-label";
  label_el.textContent = "记忆口诀";
  const card = document.createElement("div");
  card.className = "card";
  card.id = "section-mnemonics";
  card.appendChild(label_el);
  for (const item of mnemonics) {
    const block = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = item.title_zh;
    const content = document.createElement("p");
    content.textContent = item.content_zh;
    block.appendChild(title);
    block.appendChild(content);
    card.appendChild(block);
  }
  container.appendChild(card);
  return { id: "section-mnemonics", label: "记忆口诀" };
}

function renderAnalogies(container, analogies) {
  if (!analogies || analogies.length === 0) return null;
  const label_el = document.createElement("div");
  label_el.className = "section-label";
  label_el.textContent = "理解捷径";
  const card = document.createElement("div");
  card.className = "card";
  card.id = "section-analogies";
  card.appendChild(label_el);
  for (const item of analogies) {
    const block = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = item.title_zh;
    const content = document.createElement("p");
    content.textContent = item.content_zh;
    block.appendChild(title);
    block.appendChild(content);
    card.appendChild(block);
  }
  container.appendChild(card);
  return { id: "section-analogies", label: "理解捷径" };
}

function renderConnections(container, connections) {
  if (!connections || connections.length === 0) return null;
  const label_el = document.createElement("div");
  label_el.className = "section-label";
  label_el.textContent = "知识点联系";
  const card = document.createElement("div");
  card.className = "card";
  card.id = "section-connections";
  card.appendChild(label_el);
  for (const item of connections) {
    const target = TOPICS.find((t) => t.id === item.topic_id);
    if (!target) continue;
    const block = document.createElement("div");
    block.className = "connection-item";
    const link = document.createElement("a");
    link.href = `../${target.id}/index.html`;
    link.textContent = `${target.title_zh} (${target.title_en})`;
    block.appendChild(link);
    const note = document.createElement("p");
    note.textContent = item.note_zh;
    block.appendChild(note);
    card.appendChild(block);
  }
  container.appendChild(card);
  return { id: "section-connections", label: "知识点联系" };
}

function renderJumpNav(container, sections) {
  if (!sections || sections.length === 0) return;
  const nav = document.createElement("div");
  nav.className = "jump-nav";
  for (const section of sections) {
    const link = document.createElement("a");
    link.href = `#${section.id}`;
    link.textContent = section.label;
    nav.appendChild(link);
  }
  container.appendChild(nav);
}

function renderTopicSwitcher(container, currentId) {
  const index = TOPICS.findIndex((t) => t.id === currentId);
  if (index === -1) return;
  const prev = TOPICS[index - 1];
  const next = TOPICS[index + 1];

  const switcher = document.createElement("div");
  switcher.className = "topic-switcher";

  const prevLink = document.createElement("a");
  if (prev) {
    prevLink.href = `../${prev.id}/index.html`;
    prevLink.textContent = `← ${prev.title_zh}`;
  } else {
    prevLink.className = "disabled";
    prevLink.textContent = "";
  }
  switcher.appendChild(prevLink);

  const homeLink = document.createElement("a");
  homeLink.href = "../../index.html";
  homeLink.textContent = "全部知识点";
  switcher.appendChild(homeLink);

  const nextLink = document.createElement("a");
  if (next) {
    nextLink.href = `../${next.id}/index.html`;
    nextLink.textContent = `${next.title_zh} →`;
  } else {
    nextLink.className = "disabled";
    nextLink.textContent = "";
  }
  switcher.appendChild(nextLink);

  container.appendChild(switcher);
}

export function renderTopicPage(container, meta, questions) {
  const heading = document.createElement("h1");
  heading.textContent = `${meta.title_zh} (${meta.title_en})`;
  container.appendChild(heading);

  const jumpNavContainer = document.createElement("div");
  container.appendChild(jumpNavContainer);

  const sections = [];
  sections.push(renderTextSection(container, "section-essence", "本质", meta.essence_zh));
  sections.push(renderConcepts(container, meta.concepts));
  sections.push(renderVocabulary(container, meta.vocabulary));
  sections.push(renderMnemonics(container, meta.mnemonics));
  sections.push(renderAnalogies(container, meta.analogies_zh));
  sections.push(renderConnections(container, meta.connections));
  sections.push(renderTextSection(container, "section-exam-pattern", "考试怎么考", meta.exam_pattern_zh));

  const flashcardLabel = document.createElement("div");
  flashcardLabel.className = "section-label";
  flashcardLabel.id = "section-flashcards";
  flashcardLabel.textContent = "翻卡片";
  container.appendChild(flashcardLabel);
  sections.push({ id: "section-flashcards", label: "翻卡片" });
  const flashcardContainer = document.createElement("div");
  container.appendChild(flashcardContainer);

  const quizLabel = document.createElement("div");
  quizLabel.className = "section-label";
  quizLabel.id = "section-quiz";
  quizLabel.textContent = "练习题";
  container.appendChild(quizLabel);
  sections.push({ id: "section-quiz", label: "练习题" });
  const quizContainer = document.createElement("div");
  container.appendChild(quizContainer);

  renderJumpNav(jumpNavContainer, sections.filter(Boolean));
  renderTopicSwitcher(container, meta.id);

  return { flashcardContainer, quizContainer };
}

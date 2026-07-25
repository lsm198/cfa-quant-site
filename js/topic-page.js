function renderTextSection(container, label, text) {
  if (!text) return;
  const label_el = document.createElement("div");
  label_el.className = "section-label";
  label_el.textContent = label;
  const body = document.createElement("p");
  body.textContent = text;
  const card = document.createElement("div");
  card.className = "card";
  card.appendChild(label_el);
  card.appendChild(body);
  container.appendChild(card);
}

function renderConcepts(container, concepts) {
  if (!concepts || concepts.length === 0) return;
  const label_el = document.createElement("div");
  label_el.className = "section-label";
  label_el.textContent = "详细讲解";
  const card = document.createElement("div");
  card.className = "card";
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
}

function renderVocabulary(container, vocabulary) {
  if (!vocabulary || vocabulary.length === 0) return;
  const label_el = document.createElement("div");
  label_el.className = "section-label";
  label_el.textContent = "高频词汇";
  const card = document.createElement("div");
  card.className = "card";
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
  }
  card.appendChild(table);
  container.appendChild(card);
}

function renderMnemonics(container, mnemonics) {
  if (!mnemonics || mnemonics.length === 0) return;
  const label_el = document.createElement("div");
  label_el.className = "section-label";
  label_el.textContent = "记忆口诀";
  const card = document.createElement("div");
  card.className = "card";
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
}

export function renderTopicPage(container, meta, questions) {
  const heading = document.createElement("h1");
  heading.textContent = `${meta.title_zh} (${meta.title_en})`;
  container.appendChild(heading);

  renderTextSection(container, "本质", meta.essence_zh);
  renderConcepts(container, meta.concepts);
  renderVocabulary(container, meta.vocabulary);
  renderMnemonics(container, meta.mnemonics);
  renderTextSection(container, "考试怎么考", meta.exam_pattern_zh);

  const flashcardLabel = document.createElement("div");
  flashcardLabel.className = "section-label";
  flashcardLabel.textContent = "翻卡片";
  container.appendChild(flashcardLabel);
  const flashcardContainer = document.createElement("div");
  container.appendChild(flashcardContainer);

  const quizLabel = document.createElement("div");
  quizLabel.className = "section-label";
  quizLabel.textContent = "练习题";
  container.appendChild(quizLabel);
  const quizContainer = document.createElement("div");
  container.appendChild(quizContainer);

  return { flashcardContainer, quizContainer };
}

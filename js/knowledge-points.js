export function extractKnowledgePointClause(explanationZh) {
  if (!explanationZh) return null;
  const m = explanationZh.match(/^【知识点】([\s\S]*?)。/);
  return m ? m[1].trim() : null;
}

function normalize(s) {
  return s
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s*([(),.;:])\s*/g, "$1")
    .trim();
}

function isWordChar(c) {
  return c !== undefined && c !== null && /[a-z0-9]/.test(c);
}

function containsWholeTerm(clause, term) {
  const idx = clause.indexOf(term);
  if (idx === -1) return false;
  const before = idx > 0 ? clause[idx - 1] : undefined;
  const after = idx + term.length < clause.length ? clause[idx + term.length] : undefined;
  return !isWordChar(before) && !isWordChar(after);
}

export function countQuestionsForTerm(questions, termEn) {
  const normTerm = normalize(termEn);
  if (normTerm.length < 4) return 0;
  let count = 0;
  for (const q of questions) {
    const clause = extractKnowledgePointClause(q.explanation_zh);
    if (clause && containsWholeTerm(normalize(clause), normTerm)) count++;
  }
  return count;
}

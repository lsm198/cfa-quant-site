export function extractKnowledgePointClause(explanationZh) {
  if (!explanationZh) return null;
  const m = explanationZh.match(/^【知识点】([\s\S]*?)。/);
  return m ? m[1].trim() : null;
}

function normalize(s) {
  return s.toLowerCase().replace(/\s+/g, "");
}

export function countQuestionsForTerm(questions, termEn) {
  const normTerm = normalize(termEn);
  if (normTerm.length < 4) return 0;
  let count = 0;
  for (const q of questions) {
    const clause = extractKnowledgePointClause(q.explanation_zh);
    if (clause && normalize(clause).includes(normTerm)) count++;
  }
  return count;
}

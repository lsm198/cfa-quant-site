import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { TOPICS } from "../js/nav-data.js";

export function extractSection(text, startMarker, endMarker) {
  const startIndex = text.indexOf(startMarker);
  if (startIndex === -1) throw new Error(`start marker not found: ${startMarker}`);
  const afterStart = startIndex + startMarker.length;
  const endIndex = text.indexOf(endMarker, afterStart);
  if (endIndex === -1) throw new Error(`end marker not found: ${endMarker}`);
  return text.slice(afterStart, endIndex);
}

export function parseQuestions(sectionText) {
  const cleaned = sectionText.replace(/第\s*\d+\s*页/g, " ");
  // Question numbers are followed by ". " and preceded by a run of 2+ whitespace
  // characters (a collapsed paragraph break). This distinguishes them from
  // in-sentence numbers like "$100." or "9.7%." which are preceded by a single
  // space or no space at all.
  const markerRegex = /\s{2,}(\d{1,3})\.\s+/g;
  const markers = [...cleaned.matchAll(markerRegex)];
  const questions = [];
  for (let i = 0; i < markers.length; i += 1) {
    const marker = markers[i];
    const number = Number(marker[1]);
    const start = marker.index + marker[0].length;
    const end = i + 1 < markers.length ? markers[i + 1].index : cleaned.length;
    const body = cleaned.slice(start, end);
    const choiceMatches = [...body.matchAll(/([ABC]\.\s.+?)(?=\s[ABC]\.\s|$)/gs)];
    const firstChoiceIndex = choiceMatches.length > 0 ? body.indexOf(choiceMatches[0][1]) : body.length;
    const stem_en = body.slice(0, firstChoiceIndex).trim();
    // The last choice sometimes has a stray running-header page number stuck
    // to its end (e.g. "...Chi-square statistic.\n \n2") — strip a trailing
    // lone 1-2 digit token on its own line, but leave real numeric answers alone.
    const choices_en = choiceMatches.map((m) => m[1].trim().replace(/\n\s*\d{1,2}\s*$/, "").trim());
    questions.push({ number, stem_en, choices_en });
  }
  questions.forEach((q, i) => {
    if (q.number !== i + 1) {
      throw new Error(`expected sequential question numbering, got ${q.number} at position ${i + 1}`);
    }
  });
  return questions;
}

const SUBJECT_LABELS = [
  "Quantitative Methods",
  "Alternative Investments",
  "Fixed Income",
  "Corporate Issuers",
  "Portfolio Management",
  "Economics",
  "Ethical and Professional Standards",
  "Equity Investments",
  "Derivatives",
  "Financial Statement Analysis",
  // A few blocks print the specific reading title instead of the broad subject
  // area (e.g. "Probability Trees and Conditional Expectations" instead of
  // "Quantitative Methods") — these are the 11 Quant reading titles from js/nav-data.js.
  ...TOPICS.map((t) => t.title_en),
];

export function parseSolutions(rawText) {
  // textutil sometimes emits U+2028 LINE SEPARATOR instead of a plain "\n" for
  // paragraphs that originally contained embedded equation objects. Normalize
  // so every downstream regex can rely on plain "\n" line breaks.
  const text = rawText.replace(/[\u2028\u2029]/g, "\n");
  // The digit inside "Solution -N-" is corrupted for some blocks in the source
  // docx (e.g. "Solution -/-", "Solution -2/-", "Solution -7<-" instead of a
  // clean number) \u2014 a defect in the original document, not a conversion
  // artifact. The blocks still appear in the same order as the questions
  // they answer, so we split on the literal "Solution -" marker and pair by
  // ordinal position rather than trusting the printed (sometimes garbled) label.
  const marker = "Solution -";
  const positions = [];
  for (let idx = text.indexOf(marker); idx !== -1; idx = text.indexOf(marker, idx + marker.length)) {
    positions.push(idx);
  }
  const solutions = [];
  for (let i = 0; i < positions.length; i += 1) {
    const number = i + 1;
    const start = positions[i] + marker.length;
    const end = i + 1 < positions.length ? positions[i + 1] : text.length;
    const body = text.slice(start, end);

    const subjectMatch = SUBJECT_LABELS.map((label) => ({ label, index: body.indexOf(`\n${label}\n`) }))
      .filter((m) => m.index !== -1)
      .sort((a, b) => a.index - b.index)
      .pop();
    let los = "";
    let searchLimit = body.length;
    if (subjectMatch) {
      const afterLabel = body.slice(subjectMatch.index + subjectMatch.label.length + 2);
      const pageBreakIndex = afterLabel.search(/第\s*\d+\s*页|Solution\s*-/);
      const losRaw = pageBreakIndex === -1 ? afterLabel : afterLabel.slice(0, pageBreakIndex);
      los = losRaw.replace(/^[=\s]+/, "").replace(/\s+/g, " ").trim();
      searchLimit = subjectMatch.index;
    }

    const explanationSection = body.slice(0, searchLimit);
    // Anchor to line starts, not just any whitespace — explanations often
    // reference other options inline (e.g. "...synonymous with distracter B.\n")
    // which would otherwise be mistaken for the start of option B's own text.
    const lineAnchored = [...explanationSection.matchAll(/(?:^|\n)([ABC])\.\s(.+?)(?=\n[ABC]\.\s|$)/gs)];
    let correctMatch = lineAnchored.find((m) => /^correct\b/i.test(m[2].trim()));

    if (!correctMatch) {
      // Fallback for the rare block that lost its line breaks entirely during
      // docx conversion (observed for a few blocks with embedded equations).
      // This is less precise (the "distracter B" false-positive risk applies
      // here) but only ever used when the safer line-anchored pass finds nothing.
      const whitespaceAnchored = [...explanationSection.matchAll(/(?:^|\s)([ABC])\.\s(.+?)(?=\s[ABC]\.\s|$)/gs)];
      correctMatch = whitespaceAnchored.find((m) => /^correct\b/i.test(m[2].trim()));
    }

    if (!correctMatch) {
      console.warn(`WARNING: no "Correct because" explanation found in Solution -${number}- — skipping this question.`);
      solutions.push({ number, answer: null, explanation_en: "", los });
      continue;
    }

    solutions.push({
      number,
      answer: correctMatch[1],
      explanation_en: correctMatch[2].trim(),
      los,
    });
  }
  return solutions;
}

const LOS_KEYWORD_RULES = [
  { topicId: "tests-independence", keywords: ["nonparametric test", "test of independence", "parametric and nonparametric"] },
  { topicId: "big-data", keywords: ["big data", "artificial intelligence", "machine learning", "fintech", "distributed ledger"] },
  { topicId: "simulation", keywords: ["bootstrap", "simulation", "monte carlo"] },
  { topicId: "hypothesis-testing", keywords: ["hypothesis test", "type i and type ii", "power of a test", "power of the test", "statistical significance"] },
  { topicId: "sampling-estimation", keywords: ["sampling", "central limit theorem", "sampling error", "standard error of the sample"] },
  { topicId: "regression", keywords: ["linear regression", "regression model"] },
  { topicId: "tests-independence", keywords: ["tests of independence", "contingency table"] },
  { topicId: "portfolio-math", keywords: ["portfolio variance", "portfolio mathematics", "safety-first", "of portfolio returns"] },
  { topicId: "probability-trees", keywords: ["tree diagram", "joint probability", "conditional expectation", "covariance", "correlation between two variables", "expected values, variances"] },
  { topicId: "stats-returns", keywords: ["skewness", "kurtosis", "quartile", "measures of central tendency", "mean absolute deviation", "coefficient of variation", "measures of dispersion", "normal and lognormal"] },
  { topicId: "tvm", keywords: ["present value (pv) of fixed-income", "time value of money", "fixed-income instruments and required"] },
  { topicId: "rates-returns", keywords: ["return measures", "annualized return", "continuously compounded return", "opportunity cost", "interest rate as", "money-weighted", "time-weighted", "return measurement"] },
];

export function classifyByLos(los) {
  const lower = los.toLowerCase();
  for (const rule of LOS_KEYWORD_RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return rule.topicId;
    }
  }
  return null;
}

export function mergeQuestionsAndSolutions(questions, solutions) {
  const solutionsByNumber = new Map(solutions.map((s) => [s.number, s]));
  const merged = [];
  for (const q of questions) {
    const solution = solutionsByNumber.get(q.number);
    if (!solution) throw new Error(`no solution found for question ${q.number}`);
    if (solution.answer === null) continue; // unparseable solution — skip rather than emit a broken question
    merged.push({
      stem_en: q.stem_en,
      choices_en: q.choices_en,
      answer: solution.answer,
      explanation_en: solution.explanation_en,
      los: solution.los,
    });
  }
  return merged;
}

export function renderQuestionsJs(questions) {
  return `window.TOPIC_QUESTIONS = ${JSON.stringify(questions, null, 2)};\n`;
}

export function runImport({ questionsDocxPath, solutionsDocxPath, projectRoot }) {
  const fullQuestionsText = execFileSync("textutil", ["-convert", "txt", "-stdout", questionsDocxPath], {
    maxBuffer: 1024 * 1024 * 20,
  }).toString();
  const solutionsText = execFileSync("textutil", ["-convert", "txt", "-stdout", solutionsDocxPath], {
    maxBuffer: 1024 * 1024 * 20,
  }).toString();

  const quantSection = extractSection(fullQuestionsText, "数量分析", "衍生品");
  const questions = parseQuestions(quantSection);
  const solutions = parseSolutions(solutionsText);
  const merged = mergeQuestionsAndSolutions(questions, solutions);

  const byTopic = new Map(TOPICS.map((t) => [t.id, []]));
  const unclassified = [];
  merged.forEach((question, i) => {
    const topicId = classifyByLos(question.los);
    const withId = { id: `imported-${String(i + 1).padStart(3, "0")}`, ...question, explanation_zh: "" };
    if (topicId && byTopic.has(topicId)) {
      byTopic.get(topicId).push(withId);
    } else {
      unclassified.push(withId);
    }
  });

  for (const [topicId, topicQuestions] of byTopic) {
    const path = `${projectRoot}/topics/${topicId}/questions.js`;
    writeFileSync(path, renderQuestionsJs(topicQuestions));
    console.log(`wrote ${topicQuestions.length} questions to ${path}`);
  }

  if (unclassified.length > 0) {
    console.log(`\n${unclassified.length} questions could not be classified (LOS text did not match any rule):`);
    for (const q of unclassified) {
      console.log(`  - ${q.los}`);
    }
  }

  const skippedCount = questions.length - merged.length;
  return { total: merged.length, unclassifiedCount: unclassified.length, skippedCount, totalQuestionsInSection: questions.length };
}

const isMainModule = process.argv[1] && import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  const result = runImport({
    questionsDocxPath: "/Users/liushiming/Downloads/1000题和答案_Word版/CFA L11000题.docx",
    solutionsDocxPath: "/Users/liushiming/Downloads/1000题和答案_Word版/数量分析.docx",
    projectRoot: "/Users/liushiming/cfa-quant-site",
  });
  console.log(
    `\nQuestions in source section: ${result.totalQuestionsInSection}, imported: ${result.total}, ` +
      `skipped (unparseable solution): ${result.skippedCount}, unclassified: ${result.unclassifiedCount}`
  );
}

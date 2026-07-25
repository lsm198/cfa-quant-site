import { test } from "node:test";
import assert from "node:assert/strict";
import {
  extractSection,
  parseQuestions,
  parseSolutions,
  classifyByLos,
  mergeQuestionsAndSolutions,
  renderQuestionsJs,
} from "../scripts/import-quant-questions.js";

test("extractSection returns text between two markers", () => {
  const text = "before\nSTART\nmiddle content\nEND\nafter";
  assert.equal(extractSection(text, "START", "END"), "\nmiddle content\n");
});

test("parseQuestions splits on sequential numbered stems", () => {
  const section = `1  数量分析  1. Which of the following factors is not used?  A. Point estimate.  B. Sampling error.  C. Reliability factor.      2. An analyst performs a test.  A. First choice.  B. Second choice.  C. Third choice.`;
  const questions = parseQuestions(section);
  assert.equal(questions.length, 2);
  assert.equal(questions[0].number, 1);
  assert.match(questions[0].stem_en, /Which of the following factors/);
  assert.deepEqual(questions[0].choices_en, [
    "A. Point estimate.",
    "B. Sampling error.",
    "C. Reliability factor.",
  ]);
  assert.equal(questions[1].number, 2);
});

test("parseQuestions throws if numbering is not sequential starting at 1", () => {
  const section = `1  数量分析  1. First stem.  A. a.  B. b.  C. c.      3. Skipped a number.  A. a.  B. b.  C. c.`;
  assert.throws(() => parseQuestions(section));
});

test("parseSolutions extracts the correct answer, explanation, and LOS per Solution block", () => {
  const text = `Solution -1-
A. Incorrect because it uses the point estimate.
B. Correct because a confidence interval for a parameter is calculated as X.
C. Incorrect because a reliability factor is used.
Quantitative Methods
= compare and contrast simple random, stratified random, cluster sampling
第 2 页
Solution -2-
A. Correct because something else is right.
B. Incorrect because of reason B.
C. Incorrect because of reason C.
Alternative Investments
= describe financial applications of distributed ledger technology`;
  const solutions = parseSolutions(text);
  assert.equal(solutions.length, 2);
  assert.equal(solutions[0].number, 1);
  assert.equal(solutions[0].answer, "B");
  assert.match(solutions[0].explanation_en, /confidence interval for a parameter/);
  assert.match(solutions[0].los, /compare and contrast simple random/);
  assert.equal(solutions[1].number, 2);
  assert.equal(solutions[1].answer, "A");
});

test("parseSolutions recognizes the terser \"Correct.\" phrasing (no \"because\") seen in some real blocks", () => {
  const text = `Solution -1-
A. Correct. A negatively skewed distribution appears as if the left tail has been pulled away from the mean.
B. Incorrect. Kurtosis refers to relative peakedness of a distribution.
C. Incorrect. A negatively skewed distribution appears as if the left tail has been pulled away from the mean.
Quantitative Methods
= interpret and evaluate measures of skewness and kurtosis to address an investment problem`;
  const solutions = parseSolutions(text);
  assert.equal(solutions.length, 1);
  assert.equal(solutions[0].answer, "A");
  assert.match(solutions[0].explanation_en, /negatively skewed distribution appears/);
});

test("classifyByLos matches known keyword patterns", () => {
  assert.equal(classifyByLos("calculate and interpret major return measures and describe their appropriate uses"), "rates-returns");
  assert.equal(classifyByLos("calculate and interpret the present value (PV) of fixed-income and equity instruments"), "tvm");
  assert.equal(classifyByLos("calculate, interpret, and evaluate measures of skewness and kurtosis"), "stats-returns");
  assert.equal(classifyByLos("compare and contrast tree diagrams and joint probability tables"), "probability-trees");
  assert.equal(classifyByLos("describe the use of the bootstrap method for estimating standard error"), "simulation");
  assert.equal(classifyByLos("compare and contrast simple random, stratified random, and cluster sampling"), "sampling-estimation");
  assert.equal(classifyByLos("construct hypothesis tests and determine their statistical significance"), "hypothesis-testing");
  assert.equal(classifyByLos("compare and contrast parametric and nonparametric tests of independence"), "tests-independence");
  assert.equal(classifyByLos("describe the assumptions underlying simple linear regression"), "regression");
  assert.equal(classifyByLos("describe applications of Big Data and Data Science to investment management"), "big-data");
});

test("classifyByLos returns null for unrecognized text", () => {
  assert.equal(classifyByLos("this los text matches nothing we know about"), null);
});

test("mergeQuestionsAndSolutions pairs by number and drops the number field", () => {
  const questions = [{ number: 1, stem_en: "Stem one", choices_en: ["A. a", "B. b", "C. c"] }];
  const solutions = [{ number: 1, answer: "B", explanation_en: "Because B.", los: "some los" }];
  const merged = mergeQuestionsAndSolutions(questions, solutions);
  assert.equal(merged.length, 1);
  assert.equal(merged[0].stem_en, "Stem one");
  assert.equal(merged[0].answer, "B");
  assert.equal(merged[0].los, "some los");
  assert.equal(merged[0].number, undefined);
});

test("mergeQuestionsAndSolutions skips questions whose solution could not be parsed", () => {
  const questions = [
    { number: 1, stem_en: "Stem one", choices_en: ["A. a", "B. b", "C. c"] },
    { number: 2, stem_en: "Stem two", choices_en: ["A. a", "B. b", "C. c"] },
  ];
  const solutions = [
    { number: 1, answer: null, explanation_en: "", los: "" },
    { number: 2, answer: "C", explanation_en: "Because C.", los: "some los" },
  ];
  const merged = mergeQuestionsAndSolutions(questions, solutions);
  assert.equal(merged.length, 1);
  assert.equal(merged[0].stem_en, "Stem two");
});

test("renderQuestionsJs produces a loadable window.TOPIC_QUESTIONS assignment", () => {
  const js = renderQuestionsJs([{ id: "tvm-001", stem_en: "x", choices_en: ["A. a"], answer: "A", explanation_en: "e", explanation_zh: "", los: "l" }]);
  assert.match(js, /^window\.TOPIC_QUESTIONS = /);
  assert.match(js, /"tvm-001"/);
});

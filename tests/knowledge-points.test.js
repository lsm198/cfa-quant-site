import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  extractKnowledgePointClause,
  countQuestionsForTerm,
} from "../js/knowledge-points.js";

test("extractKnowledgePointClause returns the clause text for a well-formed prefix", () => {
  const explanationZh =
    "【知识点】持有期收益率 Holding Period Return (HPR)。公式:R=(P1−P0+D1)/P0。答案 C。";
  assert.equal(
    extractKnowledgePointClause(explanationZh),
    "持有期收益率 Holding Period Return (HPR)"
  );
});

test("extractKnowledgePointClause returns null when there is no 【知识点】 prefix", () => {
  assert.equal(
    extractKnowledgePointClause("这是一段没有知识点标签的解释。答案 A。"),
    null
  );
});

test("extractKnowledgePointClause returns null for undefined/empty input", () => {
  assert.equal(extractKnowledgePointClause(undefined), null);
  assert.equal(extractKnowledgePointClause(""), null);
});

test("countQuestionsForTerm counts a question whose clause exactly equals the term", () => {
  const questions = [
    { id: "q1", explanation_zh: "【知识点】Simple Linear Regression Model。细节。答案 A。" },
  ];
  assert.equal(
    countQuestionsForTerm(questions, "Simple Linear Regression Model"),
    1
  );
});

test("countQuestionsForTerm counts a question whose clause contains the term as a substring", () => {
  const questions = [
    {
      id: "q1",
      explanation_zh:
        "【知识点】Assumptions of the Simple Linear Regression Model。细节。答案 A。",
    },
  ];
  assert.equal(
    countQuestionsForTerm(questions, "Simple Linear Regression Model"),
    1
  );
});

test("countQuestionsForTerm matches despite a whitespace difference between clause and term", () => {
  const questions = [
    { id: "q1", explanation_zh: "【知识点】Covariance(X)。细节。答案 A。" },
  ];
  assert.equal(countQuestionsForTerm(questions, "Covariance (X)"), 1);
});

test("countQuestionsForTerm does not count a question with an unrelated clause", () => {
  const questions = [
    { id: "q1", explanation_zh: "【知识点】Money-Weighted Rate of Return。细节。答案 A。" },
  ];
  assert.equal(
    countQuestionsForTerm(questions, "Simple Linear Regression Model"),
    0
  );
});

test("countQuestionsForTerm returns 0 for a term shorter than 4 characters (guard test)", () => {
  const questions = [
    { id: "q1", explanation_zh: "【知识点】Interquartile Range (IQR)。细节。答案 A。" },
  ];
  assert.equal(countQuestionsForTerm(questions, "IQR"), 0);
});

test("countQuestionsForTerm does not match 'parametric test' inside 'nonparametric test'", () => {
  const questions = [
    { id: "q1", explanation_zh: "【知识点】nonparametric test(非参数检验)。细节。答案 A。" },
  ];
  assert.equal(countQuestionsForTerm(questions, "parametric test"), 0);
  assert.equal(countQuestionsForTerm(questions, "nonparametric test"), 1);
});

function loadTopicModule(filePath, globalName) {
  const code = fs.readFileSync(filePath, "utf8");
  const window = {};
  // eslint-disable-next-line no-eval
  eval(code);
  return window[globalName];
}

test("every question in every topic matches at least one concept/vocabulary term", () => {
  const topicsDir = path.join(import.meta.dirname, "..", "topics");
  const topicIds = fs.readdirSync(topicsDir).filter((d) =>
    fs.statSync(path.join(topicsDir, d)).isDirectory()
  );
  const unmatched = [];
  for (const topicId of topicIds) {
    const meta = loadTopicModule(path.join(topicsDir, topicId, "meta.js"), "TOPIC_META");
    const questions = loadTopicModule(path.join(topicsDir, topicId, "questions.js"), "TOPIC_QUESTIONS");
    const terms = [
      ...(meta.concepts || []).map((c) => c.term_en),
      ...(meta.vocabulary || []).map((v) => v.term_en),
    ];
    for (const q of questions) {
      const matched = terms.some((term) => countQuestionsForTerm([q], term) > 0);
      if (!matched) unmatched.push(`${topicId}/${q.id}`);
    }
  }
  assert.deepStrictEqual(unmatched, []);
});

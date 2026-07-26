#!/usr/bin/env node
// Flags concepts/terms referenced in a topic's real-question explanations
// that aren't covered by that topic's own concepts/vocabulary sections.
// Heuristic: pulls every "(English term)" out of each question's leading
// 【知识点】...。 tag, then checks whether it appears (as a substring, either
// direction, case-insensitive) in any concepts/vocabulary term_en. A miss
// is a signal to check by hand, not an automatic verdict — near-miss wording
// for an already-covered idea is a false positive and fine to leave alone.

const fs = require("fs");
const path = require("path");

const TOPICS_DIR = path.join(__dirname, "..", "topics");

function loadTopic(topicId) {
  const dir = path.join(TOPICS_DIR, topicId);
  global.window = {};
  const metaPath = require.resolve(path.join(dir, "meta.js"));
  const questionsPath = require.resolve(path.join(dir, "questions.js"));
  delete require.cache[metaPath];
  delete require.cache[questionsPath];
  require(metaPath);
  require(questionsPath);
  return { meta: window.TOPIC_META, questions: window.TOPIC_QUESTIONS };
}

function extractTags(explanationZh) {
  const header = explanationZh.match(/^【知识点】([^。]*)。/);
  if (!header) return [];
  return [...header[1].matchAll(/\(([^)]+)\)/g)].map((m) => m[1].trim());
}

function normalize(s) {
  return s.toLowerCase().replace(/[\s\-]/g, "");
}

function isCovered(tag, termEnList) {
  const nTag = normalize(tag);
  return termEnList.some((term) => {
    const nTerm = normalize(term);
    return nTerm.includes(nTag) || nTag.includes(nTerm);
  });
}

function checkTopic(topicId) {
  const { meta, questions } = loadTopic(topicId);
  const termEnList = [
    ...(meta.concepts || []).map((c) => c.term_en),
    ...(meta.vocabulary || []).map((v) => v.term_en),
  ];
  const missing = [];
  for (const q of questions) {
    if (!q.explanation_zh) continue;
    for (const tag of extractTags(q.explanation_zh)) {
      if (!isCovered(tag, termEnList)) {
        missing.push({ questionId: q.id, tag });
      }
    }
  }
  return missing;
}

function listTopicIds() {
  return fs
    .readdirSync(TOPICS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

function main() {
  const arg = process.argv[2];
  const topicIds = arg ? [arg] : listTopicIds();
  let totalMissing = 0;
  for (const topicId of topicIds) {
    const missing = checkTopic(topicId);
    totalMissing += missing.length;
    if (missing.length === 0) {
      console.log(`${topicId}: OK (no flagged gaps)`);
    } else {
      console.log(`${topicId}: ${missing.length} flagged gap(s)`);
      for (const { questionId, tag } of missing) {
        console.log(`  - [${questionId}] "${tag}" not found in concepts/vocabulary`);
      }
    }
  }
  console.log(`\nTotal flagged: ${totalMissing}`);
}

main();

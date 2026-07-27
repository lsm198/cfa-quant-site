export async function loadTopicModule(topicId, filename, globalName) {
  const res = await fetch(`topics/${topicId}/${filename}`);
  const code = await res.text();
  const sandbox = {};
  const fn = new Function("window", `${code}\nreturn window.${globalName};`);
  return fn(sandbox);
}

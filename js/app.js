import { createEmptyProgress, parseProgress, serializeProgress } from "./progress.js";

const STORAGE_KEY = "cfa-quant-progress";

export function isStorageAvailable() {
  try {
    const testKey = "__cfa_quant_storage_test__";
    localStorage.setItem(testKey, "1");
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function loadProgress() {
  if (!isStorageAvailable()) return createEmptyProgress();
  return parseProgress(localStorage.getItem(STORAGE_KEY));
}

export function saveProgress(state) {
  if (!isStorageAvailable()) return false;
  localStorage.setItem(STORAGE_KEY, serializeProgress(state));
  return true;
}

export function exportProgressFile(state) {
  const blob = new Blob([serializeProgress(state)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "cfa-quant-progress.json";
  a.click();
  URL.revokeObjectURL(url);
}

export function importProgressFile(file, onLoaded) {
  const reader = new FileReader();
  reader.onload = () => {
    const state = parseProgress(reader.result);
    saveProgress(state);
    onLoaded(state);
  };
  reader.readAsText(file);
}

export function renderStorageBanner() {
  if (isStorageAvailable()) return;
  const banner = document.createElement("div");
  banner.className = "storage-banner";
  banner.textContent = "当前浏览器不支持本地存储,练习记录不会保存。";
  document.body.prepend(banner);
}

export function renderBackupControls(container) {
  renderStorageBanner();

  const exportBtn = document.createElement("button");
  exportBtn.textContent = "导出进度 JSON";
  exportBtn.addEventListener("click", () => exportProgressFile(loadProgress()));

  const importLabel = document.createElement("label");
  importLabel.textContent = "导入进度 JSON: ";
  const importInput = document.createElement("input");
  importInput.type = "file";
  importInput.accept = "application/json";
  importInput.addEventListener("change", () => {
    const file = importInput.files[0];
    if (!file) return;
    importProgressFile(file, () => {
      alert("导入完成");
    });
  });
  importLabel.appendChild(importInput);

  container.appendChild(exportBtn);
  container.appendChild(importLabel);
}

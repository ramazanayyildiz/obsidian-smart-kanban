let uniqueStrings;

function init(deps) {
  uniqueStrings = deps.uniqueStrings;
}

function extractNotePreview(content) {
  const lines = String(content || "").split(/\r?\n/);
  let inFrontmatter = false;
  const bodyLines = [];
  for (const line of lines) {
    if (line.trim() === "---") {
      inFrontmatter = !inFrontmatter;
      continue;
    }
    if (inFrontmatter) continue;
    if (/^#+\s/.test(line)) continue;
    const trimmed = line.trim();
    if (trimmed) bodyLines.push(trimmed);
    if (bodyLines.join(" ").length >= 100) break;
  }
  return bodyLines.join(" ").slice(0, 100);
}

function isKanbanBoardFile(frontmatter) {
  if (!frontmatter) return false;
  const value = frontmatter["kanban-plugin"];
  if (value == null) return false;
  return String(value).toLowerCase() === "board" || value === true;
}

function normalizeFmValue(value) {
  if (Array.isArray(value)) return value.length ? String(value[0]).trim() : "";
  return String(value == null ? "" : value).trim();
}

function normalizeToArray(value) {
  if (Array.isArray(value)) {
    return value.map((v) => String(v).replace(/^#/, "").trim()).filter(Boolean);
  }
  if (!value) return [];
  return String(value)
    .split(",")
    .map((v) => v.replace(/^#/, "").trim())
    .filter(Boolean);
}

function collectTags(frontmatter, cache, tagsField) {
  let primaryTags = normalizeToArray(frontmatter[tagsField]);
  if (!primaryTags.length && tagsField.toLowerCase() !== "tags") primaryTags = normalizeToArray(frontmatter.tags);

  const cacheTags = Array.isArray(cache && cache.tags)
    ? cache.tags.map((entry) => String((entry && entry.tag) || "").replace(/^#/, "").trim()).filter(Boolean)
    : [];

  return uniqueStrings([...primaryTags, ...cacheTags]);
}

function sanitizeFileName(input) {
  return String(input || "")
    .replace(/[\\/:*?"<>|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildFrontmatterBlock(fields) {
  const lines = ["---"];
  for (const [key, value] of Object.entries(fields || {})) {
    if (value == null) continue;
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const item of value) lines.push(`  - ${yamlQuote(item)}`);
      continue;
    }
    const text = normalizeFmValue(value);
    lines.push(text ? `${key}: ${yamlQuote(text)}` : `${key}:`);
  }
  lines.push("---");
  return lines.join("\n");
}

function buildTaskChecklistLine(title, options) {
  const fields = options.fields || {};
  const parts = [`- [ ] ${title}`];

  for (const key of [
    options.statusField,
    options.categoryField,
    options.priorityField,
    options.dueDateField,
    options.tagsField,
  ]) {
    const value = fields[key];
    if (Array.isArray(value)) {
      if (value.length) parts.push(`[${key}:: ${value.join(", ")}]`);
    } else {
      const text = normalizeFmValue(value);
      if (text) parts.push(`[${key}:: ${text}]`);
    }
  }

  return parts.join(" ");
}

function parseInlineFieldMap(line) {
  const map = new Map();
  const pattern = /\[([^\]:]+)::\s*([^\]]*)\]/g;
  let match = pattern.exec(String(line || ""));
  while (match) {
    const key = String(match[1] || "").trim().toLowerCase();
    const value = String(match[2] || "").trim();
    if (key) {
      map.set(key, value);
    }
    match = pattern.exec(String(line || ""));
  }
  return map;
}

async function ensureFolderPath(app, folderPath) {
  const normalized = String(folderPath || "")
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);

  let current = "";
  for (const part of normalized) {
    current = current ? `${current}/${part}` : part;
    if (!app.vault.getAbstractFileByPath(current)) await app.vault.createFolder(current);
  }
}

function createEnsureFile(TFile) {
  return async function ensureFile(app, path, initialContent) {
    const file = app.vault.getAbstractFileByPath(path);
    if (file instanceof TFile) return file;

    const folder = path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : "";
    if (folder) await ensureFolderPath(app, folder);
    return await app.vault.create(path, initialContent || "");
  };
}

function yamlQuote(value) {
  const text = String(value == null ? "" : value);
  if (!text.length) return '""';
  if (/^[A-Za-z0-9 _./-]+$/.test(text)) return text;
  return `"${text.replace(/\\/g, "\\\\").replace(/\"/g, '\\"')}"`;
}

module.exports = {
  init,
  extractNotePreview,
  isKanbanBoardFile,
  normalizeFmValue,
  normalizeToArray,
  collectTags,
  sanitizeFileName,
  buildFrontmatterBlock,
  buildTaskChecklistLine,
  parseInlineFieldMap,
  ensureFolderPath,
  createEnsureFile,
  yamlQuote,
};

let coreUtils;
try {
  coreUtils = require("./core");
} catch (_error) {
  coreUtils = {
    normalizeDateInput: localNormalizeDateInput,
    getDueInfo: localGetDueInfo,
    parseTaskLine: localParseTaskLine,
    updateTaskLineFields: localUpdateTaskLineFields,
    parseWipLimits: localParseWipLimits,
    sortCards: localSortCards,
    uniqueStrings: localUniqueStrings,
    splitCsv: localSplitCsv,
  };
}

const {
  normalizeDateInput,
  getDueInfo,
  parseTaskLine,
  updateTaskLineFields,
  parseWipLimits,
  sortCards,
  uniqueStrings,
  splitCsv,
} = coreUtils;

function localNormalizeDateInput(value) {
  const text = String(value || "").trim();
  if (!text) return "";

  const direct = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (direct) {
    const date = new Date(`${direct[1]}-${direct[2]}-${direct[3]}T00:00:00`);
    if (Number.isNaN(date.getTime())) return "";
    return `${direct[1]}-${direct[2]}-${direct[3]}`;
  }

  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return "";
  return localFormatDateLocal(parsed);
}

function localGetDueInfo(dueDate, dueSoonDays, nowDate, options) {
  if (!dueDate) return null;

  const date = new Date(`${dueDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;

  const now = nowDate instanceof Date ? nowDate : new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dueStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round((dueStart.getTime() - todayStart.getTime()) / 86400000);
  const opts = options && typeof options === "object" ? options : {};
  const showRelativeDate = opts.showRelativeDate !== false;
  const translate = typeof opts.t === "function" ? opts.t : null;
  const displayFormat = String(opts.dateDisplayFormat || opts.dateFormat || "").trim();

  const labelFor = (key, fallback, params) => {
    if (!translate) return fallback;
    return translate(key, params);
  };

  const absoluteLabel = () => {
    if (!displayFormat) return dueDate;
    const momentRef =
      (typeof window !== "undefined" && window.moment) ||
      (typeof globalThis !== "undefined" && globalThis.moment);
    if (typeof momentRef === "function") {
      const m = momentRef(dueDate, ["YYYY-MM-DD", momentRef.ISO_8601], true);
      if (m && typeof m.isValid === "function" && m.isValid()) return m.format(displayFormat);
    }
    return dueDate;
  };

  if (!showRelativeDate) {
    const cls =
      diffDays < 0
        ? "is-overdue"
        : (diffDays <= Math.max(0, Number(dueSoonDays) || 0) ? "is-due-soon" : "");
    return {
      label: absoluteLabel(),
      cls,
      sortValue: dueStart.getTime(),
    };
  }

  if (diffDays < 0) {
    return {
      label: labelFor("due.overdue_days", `Overdue ${Math.abs(diffDays)}d`, { days: Math.abs(diffDays) }),
      cls: "is-overdue",
      sortValue: dueStart.getTime(),
    };
  }

  if (diffDays === 0) {
    return {
      label: labelFor("due.today", "Due today"),
      cls: "is-due-soon",
      sortValue: dueStart.getTime(),
    };
  }

  if (diffDays === 1) {
    return {
      label: labelFor("due.tomorrow", "Due tomorrow"),
      cls: "is-due-soon",
      sortValue: dueStart.getTime(),
    };
  }

  if (diffDays <= Math.max(0, Number(dueSoonDays) || 0)) {
    return {
      label: labelFor("due.in_days", `Due in ${diffDays}d`, { days: diffDays }),
      cls: "is-due-soon",
      sortValue: dueStart.getTime(),
    };
  }

  return {
    label: labelFor("due.in_days", `Due in ${diffDays}d`, { days: diffDays }),
    cls: "",
    sortValue: dueStart.getTime(),
  };
}

function localParseTaskLine(line, opts) {
  const match = String(line || "").match(/^\s*-\s*\[( |x|X)\]\s+(.*)$/);
  if (!match) return null;

  const body = match[2];
  const statusField = String((opts && opts.statusField) || "Status");
  const categoryField = String((opts && opts.categoryField) || "Category");
  const priorityField = String((opts && opts.priorityField) || "Priority");
  const tagsField = String((opts && opts.tagsField) || "Tags");
  const dueDateField = String((opts && opts.dueDateField) || "Due Date");
  const defaultStatus = String((opts && opts.defaultStatus) || "Todo").trim() || "Todo";
  const statusOrder = Array.isArray(opts && opts.statusOrder) ? opts.statusOrder : [defaultStatus];

  const inlineFields = localParseInlineFields(body);
  const inlineMap = new Map();
  for (const field of inlineFields) {
    inlineMap.set(field.key.toLowerCase(), field.value);
  }

  const hashtags = localExtractHashtags(body);
  const status =
    localNormalizeText(inlineMap.get(statusField.toLowerCase())) ||
    localInferStatusFromTags(hashtags, statusOrder) ||
    defaultStatus;

  const tagsFromField = localSplitCsv(inlineMap.get(tagsField.toLowerCase()));
  const tags = localUniqueStrings([...hashtags, ...tagsFromField]);

  return {
    title: localCleanTaskTitle(body, inlineFields),
    status,
    category: localNormalizeText(inlineMap.get(categoryField.toLowerCase())),
    priority: localNormalizeText(inlineMap.get(priorityField.toLowerCase())),
    dueDate: localNormalizeDateInput(inlineMap.get(dueDateField.toLowerCase())),
    tags,
  };
}

function localUpdateTaskLineFields(line, updates) {
  let next = String(line || "");
  for (const [key, value] of Object.entries(updates || {})) {
    next = localUpsertInlineField(next, key, value);
  }
  return next;
}

function localUpsertInlineField(line, key, value) {
  const k = String(key || "").trim();
  if (!k) return line;

  const rawValue = Array.isArray(value) ? value.join(", ") : String(value == null ? "" : value);
  const trimmedValue = rawValue.trim();
  const pattern = new RegExp(`\\s*\\[${localEscapeRegExp(k)}::[^\\]]*\\]`, "i");

  if (!trimmedValue) {
    return String(line || "").replace(pattern, "").replace(/\s+$/, "");
  }

  const fieldToken = ` [${k}:: ${trimmedValue}]`;
  if (pattern.test(String(line || ""))) {
    return String(line || "").replace(pattern, fieldToken).replace(/\s+$/, "");
  }

  return `${String(line || "").replace(/\s+$/, "")}${fieldToken}`;
}

function localParseWipLimits(value) {
  const map = new Map();
  for (const pair of String(value || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean)) {
    const sep = pair.indexOf(":");
    if (sep === -1) continue;
    const key = pair.slice(0, sep).trim().toLowerCase();
    const amount = Number.parseInt(pair.slice(sep + 1).trim(), 10);
    if (key && Number.isFinite(amount) && amount > 0) map.set(key, amount);
  }
  return map;
}

function localSortCards(cards, sortBy, sortDirection, priorityOrderMap, cardOrder) {
  const order = cardOrder && typeof cardOrder === "object" ? cardOrder : {};
  const hasOrder = Object.keys(order).length > 0;

  if (sortBy === "none") {
    if (!hasOrder) return [...cards];
    return [...cards].sort((a, b) => {
      const aVal = order[a.id] != null ? order[a.id] : Number.MAX_SAFE_INTEGER;
      const bVal = order[b.id] != null ? order[b.id] : Number.MAX_SAFE_INTEGER;
      return aVal - bVal;
    });
  }

  const direction = sortDirection === "desc" ? -1 : 1;
  const priorities = priorityOrderMap instanceof Map ? priorityOrderMap : new Map();

  return [...cards].sort((a, b) => {
    let cmp = 0;
    if (sortBy === "title") {
      cmp = String(a.title || "").localeCompare(String(b.title || ""));
    } else if (sortBy === "due") {
      const aTime = a.dueTs == null ? Number.MAX_SAFE_INTEGER : a.dueTs;
      const bTime = b.dueTs == null ? Number.MAX_SAFE_INTEGER : b.dueTs;
      cmp = aTime - bTime;
    } else if (sortBy === "priority") {
      const aIdx = priorities.has(String(a.priority || "").toLowerCase())
        ? priorities.get(String(a.priority || "").toLowerCase())
        : Number.MAX_SAFE_INTEGER;
      const bIdx = priorities.has(String(b.priority || "").toLowerCase())
        ? priorities.get(String(b.priority || "").toLowerCase())
        : Number.MAX_SAFE_INTEGER;
      cmp = aIdx - bIdx;
    }

    if (cmp === 0) cmp = String(a.title || "").localeCompare(String(b.title || ""));
    return cmp * direction;
  });
}

function localUniqueStrings(values) {
  const seen = new Set();
  const out = [];
  for (const value of values || []) {
    const text = String(value || "").trim();
    if (!text) continue;
    const key = text.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(text);
  }
  return out;
}

function localSplitCsv(value) {
  return String(value || "")
    .split(",")
    .map((x) => x.replace(/^#/, "").trim())
    .filter(Boolean);
}

function localParseInlineFields(body) {
  const out = [];
  const pattern = /\[([^\]:]+)::\s*([^\]]*)\]/g;
  let match = pattern.exec(String(body || ""));
  while (match) {
    out.push({
      key: String(match[1] || "").trim(),
      value: String(match[2] || "").trim(),
      token: match[0],
    });
    match = pattern.exec(String(body || ""));
  }
  return out;
}

function localExtractHashtags(text) {
  const out = [];
  const pattern = /(^|\s)#([A-Za-z0-9/_-]+)/g;
  let match = pattern.exec(String(text || ""));
  while (match) {
    out.push(String(match[2] || "").trim());
    match = pattern.exec(String(text || ""));
  }
  return localUniqueStrings(out);
}

function localInferStatusFromTags(tags, statuses) {
  const available = Array.isArray(statuses) ? statuses : [];
  const normalizedTags = (tags || []).map((t) => localSlugify(t));
  for (const status of available) {
    if (normalizedTags.includes(localSlugify(status))) return status;
  }
  return "";
}

function localCleanTaskTitle(body, inlineFields) {
  let text = String(body || "");
  for (const field of inlineFields || []) {
    text = text.replace(field.token, "");
  }
  text = text.replace(/(^|\s)#[A-Za-z0-9/_-]+/g, " ");
  text = text.replace(/\s+/g, " ").trim();
  return text || "Untitled task";
}

function localNormalizeText(value) {
  return String(value == null ? "" : value).trim();
}

function localSlugify(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function localEscapeRegExp(text) {
  return String(text || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function localFormatDateLocal(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

module.exports = {
  normalizeDateInput,
  getDueInfo,
  parseTaskLine,
  updateTaskLineFields,
  parseWipLimits,
  sortCards,
  uniqueStrings,
  splitCsv,
};

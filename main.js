var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/constants.js
var require_constants = __commonJS({
  "src/constants.js"(exports2, module2) {
    var VIEW_TYPE_SMART_KANBAN2 = "smart-kanban-view";
    var THEME_PRESETS2 = {
      default: {
        name: "Default",
        cardBg: "",
        cardText: "",
        cardBorder: "",
        laneBg: "",
        laneHeaderBg: "",
        laneHeaderText: "",
        laneBorder: "",
        boardBg: "",
        tagBg: "",
        tagText: "",
        tagBorder: "",
        accentColor: "",
        priorityUrgent: "#e03131",
        priorityHigh: "#e8590c",
        priorityMedium: "#f08c00",
        priorityLow: "#2b8a3e",
        dueBadgeOverdue: "#e03131",
        dueBadgeSoon: "#e8590c",
        fontFamily: "",
        defaultLaneColors: {}
      },
      ocean: {
        name: "Ocean",
        cardBg: "#e7f5ff",
        cardText: "#1c3d5a",
        cardBorder: "#a5d8ff",
        laneBg: "#d0ebff",
        laneHeaderBg: "#1971c2",
        laneHeaderText: "#ffffff",
        laneBorder: "#74c0fc",
        boardBg: "#e7f5ff",
        tagBg: "#a5d8ff",
        tagText: "#1864ab",
        tagBorder: "#74c0fc",
        accentColor: "#1971c2",
        priorityUrgent: "#c92a2a",
        priorityHigh: "#d9480f",
        priorityMedium: "#e8590c",
        priorityLow: "#2b8a3e",
        dueBadgeOverdue: "#c92a2a",
        dueBadgeSoon: "#e8590c",
        fontFamily: "",
        defaultLaneColors: {
          "Backlog": { bg: "#1864ab", text: "#ffffff" },
          "Todo": { bg: "#1971c2", text: "#ffffff" },
          "In Progress": { bg: "#1c7ed6", text: "#ffffff" },
          "Done": { bg: "#228be6", text: "#ffffff" }
        }
      },
      forest: {
        name: "Forest",
        cardBg: "#ebfbee",
        cardText: "#1b4332",
        cardBorder: "#b2f2bb",
        laneBg: "#d3f9d8",
        laneHeaderBg: "#2b8a3e",
        laneHeaderText: "#ffffff",
        laneBorder: "#8ce99a",
        boardBg: "#ebfbee",
        tagBg: "#b2f2bb",
        tagText: "#1b4332",
        tagBorder: "#8ce99a",
        accentColor: "#2b8a3e",
        priorityUrgent: "#c92a2a",
        priorityHigh: "#e8590c",
        priorityMedium: "#f08c00",
        priorityLow: "#37b24d",
        dueBadgeOverdue: "#c92a2a",
        dueBadgeSoon: "#e8590c",
        fontFamily: "",
        defaultLaneColors: {
          "Backlog": { bg: "#1b4332", text: "#ffffff" },
          "Todo": { bg: "#2b8a3e", text: "#ffffff" },
          "In Progress": { bg: "#37b24d", text: "#ffffff" },
          "Done": { bg: "#40c057", text: "#ffffff" }
        }
      },
      sunset: {
        name: "Sunset",
        cardBg: "#fff9db",
        cardText: "#5c3d0e",
        cardBorder: "#ffe066",
        laneBg: "#fff3bf",
        laneHeaderBg: "#e8590c",
        laneHeaderText: "#ffffff",
        laneBorder: "#ffd43b",
        boardBg: "#fff9db",
        tagBg: "#ffe066",
        tagText: "#5c3d0e",
        tagBorder: "#ffd43b",
        accentColor: "#e8590c",
        priorityUrgent: "#c92a2a",
        priorityHigh: "#d9480f",
        priorityMedium: "#f08c00",
        priorityLow: "#5c940d",
        dueBadgeOverdue: "#c92a2a",
        dueBadgeSoon: "#e8590c",
        fontFamily: "",
        defaultLaneColors: {
          "Backlog": { bg: "#d9480f", text: "#ffffff" },
          "Todo": { bg: "#e8590c", text: "#ffffff" },
          "In Progress": { bg: "#f76707", text: "#ffffff" },
          "Done": { bg: "#fd7e14", text: "#ffffff" }
        }
      },
      midnight: {
        name: "Midnight",
        cardBg: "#1a1b2e",
        cardText: "#c1c2d3",
        cardBorder: "#2d2e4a",
        laneBg: "#141524",
        laneHeaderBg: "#3b3d8c",
        laneHeaderText: "#e0e0ff",
        laneBorder: "#2d2e4a",
        boardBg: "#0f1020",
        tagBg: "#2d2e4a",
        tagText: "#a5a6ff",
        tagBorder: "#3b3d8c",
        accentColor: "#5c5ce0",
        priorityUrgent: "#ff6b6b",
        priorityHigh: "#ff922b",
        priorityMedium: "#ffd43b",
        priorityLow: "#69db7c",
        dueBadgeOverdue: "#ff6b6b",
        dueBadgeSoon: "#ff922b",
        fontFamily: "",
        defaultLaneColors: {
          "Backlog": { bg: "#2b2c5e", text: "#e0e0ff" },
          "Todo": { bg: "#3b3d8c", text: "#e0e0ff" },
          "In Progress": { bg: "#4c4fb3", text: "#e0e0ff" },
          "Done": { bg: "#5c5ce0", text: "#ffffff" }
        }
      },
      minimal: {
        name: "Minimal",
        cardBg: "#fafafa",
        cardText: "#343a40",
        cardBorder: "#dee2e6",
        laneBg: "#f1f3f5",
        laneHeaderBg: "#868e96",
        laneHeaderText: "#ffffff",
        laneBorder: "#ced4da",
        boardBg: "#f8f9fa",
        tagBg: "#e9ecef",
        tagText: "#495057",
        tagBorder: "#ced4da",
        accentColor: "#495057",
        priorityUrgent: "#c92a2a",
        priorityHigh: "#d9480f",
        priorityMedium: "#e8590c",
        priorityLow: "#5c940d",
        dueBadgeOverdue: "#c92a2a",
        dueBadgeSoon: "#e8590c",
        fontFamily: "",
        defaultLaneColors: {}
      },
      candy: {
        name: "Candy",
        cardBg: "#fff0f6",
        cardText: "#6b1d3a",
        cardBorder: "#fcc2d7",
        laneBg: "#ffe3ec",
        laneHeaderBg: "#c2255c",
        laneHeaderText: "#ffffff",
        laneBorder: "#f783ac",
        boardBg: "#fff0f6",
        tagBg: "#fcc2d7",
        tagText: "#a61e4d",
        tagBorder: "#f783ac",
        accentColor: "#c2255c",
        priorityUrgent: "#e03131",
        priorityHigh: "#d9480f",
        priorityMedium: "#f08c00",
        priorityLow: "#37b24d",
        dueBadgeOverdue: "#e03131",
        dueBadgeSoon: "#e8590c",
        fontFamily: "",
        defaultLaneColors: {
          "Backlog": { bg: "#a61e4d", text: "#ffffff" },
          "Todo": { bg: "#c2255c", text: "#ffffff" },
          "In Progress": { bg: "#d6336c", text: "#ffffff" },
          "Done": { bg: "#e64980", text: "#ffffff" }
        }
      }
    };
    var DEFAULT_SETTINGS2 = {
      sourceMode: "notes",
      sourceFolder: "Tasks",
      includeSubfolders: false,
      taskInboxFile: "Tasks/Task Inbox.md",
      statusField: "Status",
      categoryField: "Category",
      priorityField: "Priority",
      tagsField: "Tags",
      dueDateField: "Due Date",
      customFields: "",
      statusOrder: "Backlog,Todo,In Progress,Follow,Research,Try,Recurring,Done",
      priorityOrder: "Urgent,High,Medium,Low",
      sortBy: "none",
      sortDirection: "asc",
      dueSoonDays: 2,
      wipLimits: "",
      refreshDebounceMs: 250,
      filterPresets: {},
      boards: [],
      activeBoardId: "",
      autoArchiveDays: 0,
      theme: { preset: "default", overrides: {}, laneColors: {} },
      cardOrder: {}
    };
    module2.exports = { VIEW_TYPE_SMART_KANBAN: VIEW_TYPE_SMART_KANBAN2, THEME_PRESETS: THEME_PRESETS2, DEFAULT_SETTINGS: DEFAULT_SETTINGS2 };
  }
});

// src/core.js
var require_core = __commonJS({
  "src/core.js"(exports2, module2) {
    function normalizeDateInput2(value) {
      const text = String(value || "").trim();
      if (!text) return "";
      const direct = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (direct) {
        const date = /* @__PURE__ */ new Date(`${direct[1]}-${direct[2]}-${direct[3]}T00:00:00`);
        if (Number.isNaN(date.getTime())) return "";
        return `${direct[1]}-${direct[2]}-${direct[3]}`;
      }
      const parsed = new Date(text);
      if (Number.isNaN(parsed.getTime())) return "";
      return formatDateLocal(parsed);
    }
    function getDueInfo2(dueDate, dueSoonDays, nowDate) {
      if (!dueDate) return null;
      const date = /* @__PURE__ */ new Date(`${dueDate}T00:00:00`);
      if (Number.isNaN(date.getTime())) return null;
      const now = nowDate instanceof Date ? nowDate : /* @__PURE__ */ new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const dueStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const diffDays = Math.round((dueStart.getTime() - todayStart.getTime()) / 864e5);
      if (diffDays < 0) {
        return {
          label: `Overdue ${Math.abs(diffDays)}d`,
          cls: "is-overdue",
          sortValue: dueStart.getTime()
        };
      }
      if (diffDays === 0) {
        return {
          label: "Due today",
          cls: "is-due-soon",
          sortValue: dueStart.getTime()
        };
      }
      if (diffDays <= Math.max(0, Number(dueSoonDays) || 0)) {
        return {
          label: `Due in ${diffDays}d`,
          cls: "is-due-soon",
          sortValue: dueStart.getTime()
        };
      }
      return {
        label: `Due in ${diffDays}d`,
        cls: "",
        sortValue: dueStart.getTime()
      };
    }
    function parseTaskLine2(line, opts) {
      const match = String(line || "").match(/^\s*-\s*\[( |x|X)\]\s+(.*)$/);
      if (!match) return null;
      const body = match[2];
      const statusField = String(opts && opts.statusField || "Status");
      const categoryField = String(opts && opts.categoryField || "Category");
      const priorityField = String(opts && opts.priorityField || "Priority");
      const tagsField = String(opts && opts.tagsField || "Tags");
      const dueDateField = String(opts && opts.dueDateField || "Due Date");
      const statusOrder = Array.isArray(opts && opts.statusOrder) ? opts.statusOrder : ["Todo"];
      const inlineFields = parseInlineFields(body);
      const inlineMap = /* @__PURE__ */ new Map();
      for (const field of inlineFields) {
        inlineMap.set(field.key.toLowerCase(), field.value);
      }
      const hashtags = extractHashtags(body);
      const status = normalizeText(inlineMap.get(statusField.toLowerCase())) || inferStatusFromTags(hashtags, statusOrder) || "Todo";
      const tagsFromField = splitCsv2(inlineMap.get(tagsField.toLowerCase()));
      const tags = uniqueStrings2([...hashtags, ...tagsFromField]);
      const title = cleanTaskTitle(body, inlineFields);
      return {
        title,
        status,
        category: normalizeText(inlineMap.get(categoryField.toLowerCase())),
        priority: normalizeText(inlineMap.get(priorityField.toLowerCase())),
        dueDate: normalizeDateInput2(inlineMap.get(dueDateField.toLowerCase())),
        tags
      };
    }
    function updateTaskLineFields2(line, updates) {
      let next = String(line || "");
      for (const [key, value] of Object.entries(updates || {})) {
        next = upsertInlineField(next, key, value);
      }
      return next;
    }
    function upsertInlineField(line, key, value) {
      const k = String(key || "").trim();
      if (!k) return line;
      const rawValue = Array.isArray(value) ? value.join(", ") : String(value == null ? "" : value);
      const trimmedValue = rawValue.trim();
      const pattern = new RegExp(`\\s*\\[${escapeRegExp(k)}::[^\\]]*\\]`, "i");
      if (!trimmedValue) {
        return String(line || "").replace(pattern, "").replace(/\s+$/, "");
      }
      const fieldToken = ` [${k}:: ${trimmedValue}]`;
      if (pattern.test(String(line || ""))) {
        return String(line || "").replace(pattern, fieldToken).replace(/\s+$/, "");
      }
      return `${String(line || "").replace(/\s+$/, "")}${fieldToken}`;
    }
    function parseWipLimits2(value) {
      const map = /* @__PURE__ */ new Map();
      for (const pair of String(value || "").split(",").map((x) => x.trim()).filter(Boolean)) {
        const sep = pair.indexOf(":");
        if (sep === -1) continue;
        const key = pair.slice(0, sep).trim().toLowerCase();
        const amount = Number.parseInt(pair.slice(sep + 1).trim(), 10);
        if (key && Number.isFinite(amount) && amount > 0) {
          map.set(key, amount);
        }
      }
      return map;
    }
    function sortCards2(cards, sortBy, sortDirection, priorityOrderMap, cardOrder) {
      if (sortBy === "none") {
        const order = cardOrder || {};
        return [...cards].sort((a, b) => (order[a.id] || 0) - (order[b.id] || 0));
      }
      const direction = sortDirection === "desc" ? -1 : 1;
      const priorities = priorityOrderMap instanceof Map ? priorityOrderMap : /* @__PURE__ */ new Map();
      return [...cards].sort((a, b) => {
        let cmp = 0;
        if (sortBy === "title") {
          cmp = String(a.title || "").localeCompare(String(b.title || ""));
        } else if (sortBy === "due") {
          const aTime = a.dueTs == null ? Number.MAX_SAFE_INTEGER : a.dueTs;
          const bTime = b.dueTs == null ? Number.MAX_SAFE_INTEGER : b.dueTs;
          cmp = aTime - bTime;
        } else if (sortBy === "priority") {
          const aIdx = priorities.has(String(a.priority || "").toLowerCase()) ? priorities.get(String(a.priority || "").toLowerCase()) : Number.MAX_SAFE_INTEGER;
          const bIdx = priorities.has(String(b.priority || "").toLowerCase()) ? priorities.get(String(b.priority || "").toLowerCase()) : Number.MAX_SAFE_INTEGER;
          cmp = aIdx - bIdx;
        }
        if (cmp === 0) {
          cmp = String(a.title || "").localeCompare(String(b.title || ""));
        }
        return cmp * direction;
      });
    }
    function parseInlineFields(body) {
      const out = [];
      const pattern = /\[([^\]:]+)::\s*([^\]]*)\]/g;
      let match = pattern.exec(String(body || ""));
      while (match) {
        out.push({
          key: String(match[1] || "").trim(),
          value: String(match[2] || "").trim(),
          token: match[0]
        });
        match = pattern.exec(String(body || ""));
      }
      return out;
    }
    function extractHashtags(text) {
      const out = [];
      const pattern = /(^|\s)#([A-Za-z0-9/_-]+)/g;
      let match = pattern.exec(String(text || ""));
      while (match) {
        out.push(String(match[2] || "").trim());
        match = pattern.exec(String(text || ""));
      }
      return uniqueStrings2(out);
    }
    function inferStatusFromTags(tags, statuses) {
      const available = Array.isArray(statuses) ? statuses : [];
      const normalizedTags = (tags || []).map((t) => slugify(t));
      for (const status of available) {
        const target = slugify(status);
        if (normalizedTags.includes(target)) {
          return status;
        }
      }
      return "";
    }
    function cleanTaskTitle(body, inlineFields) {
      let text = String(body || "");
      for (const field of inlineFields || []) {
        text = text.replace(field.token, "");
      }
      text = text.replace(/(^|\s)#[A-Za-z0-9/_-]+/g, " ");
      text = text.replace(/\s+/g, " ").trim();
      return text || "Untitled task";
    }
    function splitCsv2(value) {
      return String(value || "").split(",").map((x) => x.replace(/^#/, "").trim()).filter(Boolean);
    }
    function uniqueStrings2(values) {
      const seen = /* @__PURE__ */ new Set();
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
    function normalizeText(value) {
      return String(value == null ? "" : value).trim();
    }
    function slugify(text) {
      return String(text || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    }
    function escapeRegExp(text) {
      return String(text || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function formatDateLocal(date) {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      return `${y}-${m}-${d}`;
    }
    module2.exports = {
      normalizeDateInput: normalizeDateInput2,
      getDueInfo: getDueInfo2,
      parseTaskLine: parseTaskLine2,
      updateTaskLineFields: updateTaskLineFields2,
      parseWipLimits: parseWipLimits2,
      sortCards: sortCards2,
      uniqueStrings: uniqueStrings2,
      splitCsv: splitCsv2
    };
  }
});

// src/core-fallback.js
var require_core_fallback = __commonJS({
  "src/core-fallback.js"(exports2, module2) {
    var coreUtils;
    try {
      coreUtils = require_core();
    } catch (_error) {
      coreUtils = {
        normalizeDateInput: localNormalizeDateInput,
        getDueInfo: localGetDueInfo,
        parseTaskLine: localParseTaskLine,
        updateTaskLineFields: localUpdateTaskLineFields,
        parseWipLimits: localParseWipLimits,
        sortCards: localSortCards,
        uniqueStrings: localUniqueStrings,
        splitCsv: localSplitCsv
      };
    }
    var {
      normalizeDateInput: normalizeDateInput2,
      getDueInfo: getDueInfo2,
      parseTaskLine: parseTaskLine2,
      updateTaskLineFields: updateTaskLineFields2,
      parseWipLimits: parseWipLimits2,
      sortCards: sortCards2,
      uniqueStrings: uniqueStrings2,
      splitCsv: splitCsv2
    } = coreUtils;
    function localNormalizeDateInput(value) {
      const text = String(value || "").trim();
      if (!text) return "";
      const direct = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (direct) {
        const date = /* @__PURE__ */ new Date(`${direct[1]}-${direct[2]}-${direct[3]}T00:00:00`);
        if (Number.isNaN(date.getTime())) return "";
        return `${direct[1]}-${direct[2]}-${direct[3]}`;
      }
      const parsed = new Date(text);
      if (Number.isNaN(parsed.getTime())) return "";
      return localFormatDateLocal(parsed);
    }
    function localGetDueInfo(dueDate, dueSoonDays, nowDate) {
      if (!dueDate) return null;
      const date = /* @__PURE__ */ new Date(`${dueDate}T00:00:00`);
      if (Number.isNaN(date.getTime())) return null;
      const now = nowDate instanceof Date ? nowDate : /* @__PURE__ */ new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const dueStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const diffDays = Math.round((dueStart.getTime() - todayStart.getTime()) / 864e5);
      if (diffDays < 0) {
        return {
          label: `Overdue ${Math.abs(diffDays)}d`,
          cls: "is-overdue",
          sortValue: dueStart.getTime()
        };
      }
      if (diffDays === 0) {
        return {
          label: "Due today",
          cls: "is-due-soon",
          sortValue: dueStart.getTime()
        };
      }
      if (diffDays <= Math.max(0, Number(dueSoonDays) || 0)) {
        return {
          label: `Due in ${diffDays}d`,
          cls: "is-due-soon",
          sortValue: dueStart.getTime()
        };
      }
      return {
        label: `Due in ${diffDays}d`,
        cls: "",
        sortValue: dueStart.getTime()
      };
    }
    function localParseTaskLine(line, opts) {
      const match = String(line || "").match(/^\s*-\s*\[( |x|X)\]\s+(.*)$/);
      if (!match) return null;
      const body = match[2];
      const statusField = String(opts && opts.statusField || "Status");
      const categoryField = String(opts && opts.categoryField || "Category");
      const priorityField = String(opts && opts.priorityField || "Priority");
      const tagsField = String(opts && opts.tagsField || "Tags");
      const dueDateField = String(opts && opts.dueDateField || "Due Date");
      const statusOrder = Array.isArray(opts && opts.statusOrder) ? opts.statusOrder : ["Todo"];
      const inlineFields = localParseInlineFields(body);
      const inlineMap = /* @__PURE__ */ new Map();
      for (const field of inlineFields) {
        inlineMap.set(field.key.toLowerCase(), field.value);
      }
      const hashtags = localExtractHashtags(body);
      const status = localNormalizeText(inlineMap.get(statusField.toLowerCase())) || localInferStatusFromTags(hashtags, statusOrder) || "Todo";
      const tagsFromField = localSplitCsv(inlineMap.get(tagsField.toLowerCase()));
      const tags = localUniqueStrings([...hashtags, ...tagsFromField]);
      return {
        title: localCleanTaskTitle(body, inlineFields),
        status,
        category: localNormalizeText(inlineMap.get(categoryField.toLowerCase())),
        priority: localNormalizeText(inlineMap.get(priorityField.toLowerCase())),
        dueDate: localNormalizeDateInput(inlineMap.get(dueDateField.toLowerCase())),
        tags
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
      const map = /* @__PURE__ */ new Map();
      for (const pair of String(value || "").split(",").map((x) => x.trim()).filter(Boolean)) {
        const sep = pair.indexOf(":");
        if (sep === -1) continue;
        const key = pair.slice(0, sep).trim().toLowerCase();
        const amount = Number.parseInt(pair.slice(sep + 1).trim(), 10);
        if (key && Number.isFinite(amount) && amount > 0) map.set(key, amount);
      }
      return map;
    }
    function localSortCards(cards, sortBy, sortDirection, priorityOrderMap) {
      if (sortBy === "none") return [...cards];
      const direction = sortDirection === "desc" ? -1 : 1;
      const priorities = priorityOrderMap instanceof Map ? priorityOrderMap : /* @__PURE__ */ new Map();
      return [...cards].sort((a, b) => {
        let cmp = 0;
        if (sortBy === "title") {
          cmp = String(a.title || "").localeCompare(String(b.title || ""));
        } else if (sortBy === "due") {
          const aTime = a.dueTs == null ? Number.MAX_SAFE_INTEGER : a.dueTs;
          const bTime = b.dueTs == null ? Number.MAX_SAFE_INTEGER : b.dueTs;
          cmp = aTime - bTime;
        } else if (sortBy === "priority") {
          const aIdx = priorities.has(String(a.priority || "").toLowerCase()) ? priorities.get(String(a.priority || "").toLowerCase()) : Number.MAX_SAFE_INTEGER;
          const bIdx = priorities.has(String(b.priority || "").toLowerCase()) ? priorities.get(String(b.priority || "").toLowerCase()) : Number.MAX_SAFE_INTEGER;
          cmp = aIdx - bIdx;
        }
        if (cmp === 0) cmp = String(a.title || "").localeCompare(String(b.title || ""));
        return cmp * direction;
      });
    }
    function localUniqueStrings(values) {
      const seen = /* @__PURE__ */ new Set();
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
      return String(value || "").split(",").map((x) => x.replace(/^#/, "").trim()).filter(Boolean);
    }
    function localParseInlineFields(body) {
      const out = [];
      const pattern = /\[([^\]:]+)::\s*([^\]]*)\]/g;
      let match = pattern.exec(String(body || ""));
      while (match) {
        out.push({
          key: String(match[1] || "").trim(),
          value: String(match[2] || "").trim(),
          token: match[0]
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
      return String(text || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
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
    module2.exports = {
      normalizeDateInput: normalizeDateInput2,
      getDueInfo: getDueInfo2,
      parseTaskLine: parseTaskLine2,
      updateTaskLineFields: updateTaskLineFields2,
      parseWipLimits: parseWipLimits2,
      sortCards: sortCards2,
      uniqueStrings: uniqueStrings2,
      splitCsv: splitCsv2
    };
  }
});

// src/utils.js
var require_utils = __commonJS({
  "src/utils.js"(exports2, module2) {
    var uniqueStrings2;
    function init(deps) {
      uniqueStrings2 = deps.uniqueStrings;
    }
    function extractNotePreview2(content) {
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
    function isKanbanBoardFile2(frontmatter) {
      if (!frontmatter) return false;
      const value = frontmatter["kanban-plugin"];
      if (value == null) return false;
      return String(value).toLowerCase() === "board" || value === true;
    }
    function normalizeFmValue2(value) {
      if (Array.isArray(value)) return value.length ? String(value[0]).trim() : "";
      return String(value == null ? "" : value).trim();
    }
    function normalizeToArray(value) {
      if (Array.isArray(value)) {
        return value.map((v) => String(v).replace(/^#/, "").trim()).filter(Boolean);
      }
      if (!value) return [];
      return String(value).split(",").map((v) => v.replace(/^#/, "").trim()).filter(Boolean);
    }
    function collectTags2(frontmatter, cache, tagsField) {
      let primaryTags = normalizeToArray(frontmatter[tagsField]);
      if (!primaryTags.length && tagsField.toLowerCase() !== "tags") primaryTags = normalizeToArray(frontmatter.tags);
      const cacheTags = Array.isArray(cache && cache.tags) ? cache.tags.map((entry) => String(entry && entry.tag || "").replace(/^#/, "").trim()).filter(Boolean) : [];
      return uniqueStrings2([...primaryTags, ...cacheTags]);
    }
    function sanitizeFileName2(input) {
      return String(input || "").replace(/[\\/:*?"<>|]/g, " ").replace(/\s+/g, " ").trim();
    }
    function buildFrontmatterBlock2(fields) {
      const lines = ["---"];
      for (const [key, value] of Object.entries(fields || {})) {
        if (value == null) continue;
        if (Array.isArray(value)) {
          lines.push(`${key}:`);
          for (const item of value) lines.push(`  - ${yamlQuote(item)}`);
          continue;
        }
        const text = normalizeFmValue2(value);
        lines.push(text ? `${key}: ${yamlQuote(text)}` : `${key}:`);
      }
      lines.push("---");
      return lines.join("\n");
    }
    function buildTaskChecklistLine2(title, options) {
      const fields = options.fields || {};
      const parts = [`- [ ] ${title}`];
      for (const key of [
        options.statusField,
        options.categoryField,
        options.priorityField,
        options.dueDateField,
        options.tagsField
      ]) {
        const value = fields[key];
        if (Array.isArray(value)) {
          if (value.length) parts.push(`[${key}:: ${value.join(", ")}]`);
        } else {
          const text = normalizeFmValue2(value);
          if (text) parts.push(`[${key}:: ${text}]`);
        }
      }
      return parts.join(" ");
    }
    function parseInlineFieldMap2(line) {
      const map = /* @__PURE__ */ new Map();
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
    async function ensureFolderPath2(app, folderPath) {
      const normalized = String(folderPath || "").split("/").map((part) => part.trim()).filter(Boolean);
      let current = "";
      for (const part of normalized) {
        current = current ? `${current}/${part}` : part;
        if (!app.vault.getAbstractFileByPath(current)) await app.vault.createFolder(current);
      }
    }
    function createEnsureFile2(TFile2) {
      return async function ensureFile2(app, path, initialContent) {
        const file = app.vault.getAbstractFileByPath(path);
        if (file instanceof TFile2) return file;
        const folder = path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : "";
        if (folder) await ensureFolderPath2(app, folder);
        return await app.vault.create(path, initialContent || "");
      };
    }
    function yamlQuote(value) {
      const text = String(value == null ? "" : value);
      if (!text.length) return '""';
      if (/^[A-Za-z0-9 _./-]+$/.test(text)) return text;
      return `"${text.replace(/\\/g, "\\\\").replace(/\"/g, '\\"')}"`;
    }
    module2.exports = {
      init,
      extractNotePreview: extractNotePreview2,
      isKanbanBoardFile: isKanbanBoardFile2,
      normalizeFmValue: normalizeFmValue2,
      normalizeToArray,
      collectTags: collectTags2,
      sanitizeFileName: sanitizeFileName2,
      buildFrontmatterBlock: buildFrontmatterBlock2,
      buildTaskChecklistLine: buildTaskChecklistLine2,
      parseInlineFieldMap: parseInlineFieldMap2,
      ensureFolderPath: ensureFolderPath2,
      createEnsureFile: createEnsureFile2,
      yamlQuote
    };
  }
});

// src/modals.js
var require_modals = __commonJS({
  "src/modals.js"(exports2, module2) {
    module2.exports = function createModals({ Modal: Modal2, Notice: Notice2 }) {
      class BoardManagerModal2 extends Modal2 {
        constructor(app, plugin, options) {
          super(app);
          this.plugin = plugin;
          this.options = options || {};
        }
        onOpen() {
          const { contentEl, titleEl } = this;
          titleEl.setText("Board Manager");
          this.renderContent();
        }
        renderContent() {
          const { contentEl } = this;
          contentEl.empty();
          const boards = this.plugin.settings.boards || [];
          if (boards.length === 0) {
            contentEl.createEl("p", { text: "No custom boards yet." });
          }
          for (const board of boards) {
            const row = contentEl.createDiv({ cls: "smart-kanban-board-manager-row" });
            row.createSpan({ text: `${board.name} (${board.type})`, cls: "smart-kanban-board-manager-name" });
            const editBtn = row.createEl("button", { text: "Edit" });
            editBtn.addEventListener("click", async () => {
              await this.editBoard(board);
            });
            const deleteBtn = row.createEl("button", { text: "Delete", cls: "mod-warning" });
            deleteBtn.addEventListener("click", async () => {
              this.plugin.settings.boards = this.plugin.settings.boards.filter((b) => b.id !== board.id);
              await this.plugin.saveSettings();
              this.renderContent();
            });
          }
          const actions = contentEl.createDiv({ cls: "smart-kanban-modal-actions" });
          const createBtn = actions.createEl("button", { text: "Create New Board", cls: "mod-cta" });
          createBtn.addEventListener("click", async () => {
            await this.createBoard();
          });
          const closeBtn = actions.createEl("button", { text: "Close" });
          closeBtn.addEventListener("click", () => {
            if (typeof this.options.onClose === "function") this.options.onClose();
            this.close();
          });
        }
        async createBoard() {
          const values = await this.plugin.openFormModal({
            title: "Create Board",
            submitText: "Create",
            fields: [
              { key: "name", label: "Board name", value: "" },
              { key: "type", label: "Type", value: "independent", type: "select", options: ["independent", "filtered-view"] },
              { key: "sourceFolder", label: "Source folder (blank = inherit)", value: "" },
              { key: "statusOrder", label: "Status order (comma-sep, blank = inherit)", value: "" },
              { key: "visibleStatuses", label: "Visible statuses (filtered-view, comma-sep)", value: "" }
            ]
          });
          if (!values) return;
          const name = String(values.name || "").trim();
          if (!name) {
            new Notice2("Board name is required.");
            return;
          }
          const id = `board-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
          if (!this.plugin.settings.boards) this.plugin.settings.boards = [];
          this.plugin.settings.boards.push({
            id,
            name,
            type: values.type || "independent",
            sourceFolder: values.sourceFolder || null,
            statusOrder: values.statusOrder || null,
            visibleStatuses: values.visibleStatuses || null,
            parentBoardId: null,
            defaultFilters: null,
            sourceMode: null,
            includeSubfolders: null,
            taskInboxFile: null,
            statusField: null,
            categoryField: null,
            priorityField: null,
            tagsField: null,
            dueDateField: null,
            customFields: null,
            priorityOrder: null,
            sortBy: null,
            sortDirection: null,
            dueSoonDays: null,
            wipLimits: null,
            filterPresets: null
          });
          await this.plugin.saveSettings();
          this.renderContent();
          new Notice2(`Board created: ${name}`);
        }
        async editBoard(board) {
          const values = await this.plugin.openFormModal({
            title: `Edit Board: ${board.name}`,
            submitText: "Save",
            fields: [
              { key: "name", label: "Board name", value: board.name || "" },
              { key: "type", label: "Type", value: board.type || "independent", type: "select", options: ["independent", "filtered-view"] },
              { key: "sourceFolder", label: "Source folder (blank = inherit)", value: board.sourceFolder || "" },
              { key: "statusOrder", label: "Status order (comma-sep, blank = inherit)", value: board.statusOrder || "" },
              { key: "visibleStatuses", label: "Visible statuses (filtered-view)", value: board.visibleStatuses || "" }
            ]
          });
          if (!values) return;
          board.name = String(values.name || "").trim() || board.name;
          board.type = values.type || board.type;
          board.sourceFolder = values.sourceFolder || null;
          board.statusOrder = values.statusOrder || null;
          board.visibleStatuses = values.visibleStatuses || null;
          await this.plugin.saveSettings();
          this.renderContent();
          new Notice2(`Board updated: ${board.name}`);
        }
      }
      class DragReorderListModal2 extends Modal2 {
        constructor(app, options) {
          super(app);
          this.options = options || {};
          this.sectionData = {};
          for (const section of this.options.sections || []) {
            this.sectionData[section.key] = [...section.items || []];
          }
        }
        onOpen() {
          const { contentEl, titleEl } = this;
          titleEl.setText(this.options.title || "Configure");
          contentEl.empty();
          contentEl.addClass("smart-kanban-drag-modal");
          for (const section of this.options.sections || []) {
            this.renderSection(contentEl, section);
          }
          const actions = contentEl.createDiv({ cls: "smart-kanban-modal-actions" });
          const cancelBtn = actions.createEl("button", { text: "Cancel" });
          cancelBtn.addEventListener("click", () => {
            if (typeof this.options.onCancel === "function") this.options.onCancel();
            this.close();
          });
          const saveBtn = actions.createEl("button", { text: "Save", cls: "mod-cta" });
          saveBtn.addEventListener("click", () => {
            if (typeof this.options.onSubmit === "function") this.options.onSubmit({ ...this.sectionData });
            this.close();
          });
        }
        renderSection(parent, section) {
          const wrap = parent.createDiv({ cls: "smart-kanban-drag-section" });
          wrap.createEl("h4", { text: section.label });
          const listEl = wrap.createDiv({ cls: "smart-kanban-drag-list" });
          const renderList = () => {
            listEl.empty();
            const items = this.sectionData[section.key] || [];
            for (let i = 0; i < items.length; i++) {
              const row = listEl.createDiv({ cls: "smart-kanban-drag-item" });
              row.setAttr("draggable", "true");
              row.dataset.index = String(i);
              const handle = row.createSpan({ text: "\u2261", cls: "smart-kanban-drag-handle" });
              row.createSpan({ text: items[i], cls: "smart-kanban-drag-text" });
              const deleteBtn = row.createSpan({ text: "\xD7", cls: "smart-kanban-drag-delete" });
              deleteBtn.addEventListener("click", () => {
                this.sectionData[section.key].splice(i, 1);
                renderList();
              });
              row.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/plain", String(i));
                row.addClass("is-dragging");
              });
              row.addEventListener("dragend", () => {
                row.removeClass("is-dragging");
              });
              row.addEventListener("dragover", (e) => {
                e.preventDefault();
                row.addClass("is-drag-target");
              });
              row.addEventListener("dragleave", () => {
                row.removeClass("is-drag-target");
              });
              row.addEventListener("drop", (e) => {
                e.preventDefault();
                row.removeClass("is-drag-target");
                const from = Number.parseInt(e.dataTransfer.getData("text/plain"), 10);
                const to = i;
                if (from === to) return;
                const arr = this.sectionData[section.key];
                const [item] = arr.splice(from, 1);
                arr.splice(to, 0, item);
                renderList();
              });
            }
          };
          renderList();
          const addRow = wrap.createDiv({ cls: "smart-kanban-drag-add" });
          const addInput = addRow.createEl("input", { type: "text", placeholder: `Add ${section.label.toLowerCase()}...` });
          const addBtn = addRow.createEl("button", { text: "Add" });
          const doAdd = () => {
            const val = addInput.value.trim();
            if (!val) return;
            this.sectionData[section.key].push(val);
            addInput.value = "";
            renderList();
          };
          addBtn.addEventListener("click", doAdd);
          addInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              doAdd();
            }
          });
        }
      }
      class SimpleFormModal2 extends Modal2 {
        constructor(app, options) {
          super(app);
          this.options = options || {};
          this.inputs = {};
        }
        onOpen() {
          const { contentEl, titleEl } = this;
          titleEl.setText(this.options.title || "Form");
          contentEl.empty();
          const fields = Array.isArray(this.options.fields) ? this.options.fields : [];
          for (const field of fields) {
            const row = contentEl.createDiv({ cls: "smart-kanban-modal-row" });
            row.createEl("label", { text: field.label || field.key || "Field" });
            let input;
            if (field.type === "select") {
              input = row.createEl("select");
              const options = Array.isArray(field.options) ? field.options : [];
              for (const optionValue of options) {
                const value = String(optionValue != null ? optionValue : "");
                const optionText = value === "" ? field.optionLabelEmpty || "None" : value;
                input.createEl("option", { text: optionText, value });
              }
              input.value = String(field.value || "");
            } else {
              input = row.createEl("input", {
                type: field.type === "date" ? "date" : "text"
              });
              input.value = String(field.value || "");
              if (field.placeholder) input.placeholder = field.placeholder;
            }
            this.inputs[field.key] = input;
          }
          const actions = contentEl.createDiv({ cls: "smart-kanban-modal-actions" });
          const cancelBtn = actions.createEl("button", { text: "Cancel" });
          cancelBtn.addEventListener("click", () => {
            if (typeof this.options.onCancel === "function") this.options.onCancel();
            this.close();
          });
          const submitBtn = actions.createEl("button", {
            text: this.options.submitText || "Save",
            cls: "mod-cta"
          });
          submitBtn.addEventListener("click", () => {
            const values = {};
            for (const [key, input] of Object.entries(this.inputs)) {
              values[key] = input.value;
            }
            if (typeof this.options.onSubmit === "function") this.options.onSubmit(values);
            this.close();
          });
        }
      }
      class SimpleConfirmModal2 extends Modal2 {
        constructor(app, options) {
          super(app);
          this.options = options || {};
        }
        onOpen() {
          const { contentEl, titleEl } = this;
          titleEl.setText(this.options.title || "Confirm");
          contentEl.empty();
          contentEl.createEl("p", { text: this.options.message || "Are you sure?" });
          const actions = contentEl.createDiv({ cls: "smart-kanban-modal-actions" });
          const cancelBtn = actions.createEl("button", { text: "Cancel" });
          cancelBtn.addEventListener("click", () => {
            if (typeof this.options.onCancel === "function") this.options.onCancel();
            this.close();
          });
          const confirmBtn = actions.createEl("button", {
            text: this.options.confirmText || "Confirm",
            cls: "mod-warning"
          });
          confirmBtn.addEventListener("click", () => {
            if (typeof this.options.onConfirm === "function") this.options.onConfirm();
            this.close();
          });
        }
      }
      return {
        BoardManagerModal: BoardManagerModal2,
        DragReorderListModal: DragReorderListModal2,
        SimpleFormModal: SimpleFormModal2,
        SimpleConfirmModal: SimpleConfirmModal2
      };
    };
  }
});

// src/view.js
var require_view = __commonJS({
  "src/view.js"(exports2, module2) {
    module2.exports = function createView({ ItemView: ItemView2, TFile: TFile2, Notice: Notice2, setIcon: setIcon2, VIEW_TYPE_SMART_KANBAN: VIEW_TYPE_SMART_KANBAN2, normalizeDateInput: normalizeDateInput2, splitCsv: splitCsv2 }) {
      class SmartKanbanView2 extends ItemView2 {
        constructor(leaf, plugin) {
          super(leaf);
          this.plugin = plugin;
          this.cards = [];
          this.currentPreset = "";
          this.filters = this.plugin.createEmptyFilters();
          this.filtersCollapsed = false;
          this._dropdownCleanups = [];
          this.collapsedLanes = /* @__PURE__ */ new Set();
          this.viewMode = "board";
          this._drag = null;
        }
        getViewType() {
          return VIEW_TYPE_SMART_KANBAN2;
        }
        getDisplayText() {
          if (this.boardId) {
            const board = this.plugin.getBoard(this.boardId);
            if (board) return `Smart Kanban - ${board.name}`;
          }
          return "Smart Kanban";
        }
        getIcon() {
          return "kanban-square";
        }
        getState() {
          return { boardId: this.boardId || "" };
        }
        async setState(state) {
          if (state && state.boardId !== void 0) {
            this.boardId = state.boardId || "";
          }
          await this.reload();
        }
        async onOpen() {
          this.boardId = this.plugin.settings.activeBoardId || "";
          this.containerEl.empty();
          this.containerEl.addClass("smart-kanban-view");
          this.boardTabsEl = this.containerEl.createDiv({ cls: "smart-kanban-board-tabs" });
          this.headerEl = this.containerEl.createDiv({ cls: "smart-kanban-header" });
          this.filtersEl = this.containerEl.createDiv({ cls: "smart-kanban-filters" });
          this.boardEl = this.containerEl.createDiv({ cls: "smart-kanban-board" });
          this.applyTheme();
          this.renderBoardTabs();
          this.buildHeader();
          await this.reload();
          this._keyHandler = (event) => {
            const tag = event.target && event.target.tagName || "";
            const isInput = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
            if (event.key === "Escape") {
              this.containerEl.querySelectorAll(".smart-kanban-overflow-menu").forEach((m) => {
                m.style.display = "none";
              });
              this.containerEl.querySelectorAll(".smart-kanban-dropdown-panel").forEach((p) => {
                p.style.display = "none";
              });
              return;
            }
            if (isInput) return;
            if (event.key === "n") {
              event.preventDefault();
              this.createTaskInteractive();
            }
          };
          this.containerEl.addEventListener("keydown", this._keyHandler);
          this._clickOutsideHandler = (event) => {
            if (!event.target.closest(".smart-kanban-overflow-btn") && !event.target.closest(".smart-kanban-overflow-menu")) {
              this.containerEl.querySelectorAll(".smart-kanban-overflow-menu").forEach((m) => {
                m.style.display = "none";
                const c = m.closest(".smart-kanban-card");
                if (c) c.classList.remove("has-menu-open");
              });
            }
          };
          document.addEventListener("click", this._clickOutsideHandler);
        }
        applyTheme() {
          const theme = this.plugin.getResolvedTheme();
          const el = this.containerEl;
          const props = {
            "--sk-card-bg": theme.cardBg,
            "--sk-card-text": theme.cardText,
            "--sk-card-border": theme.cardBorder,
            "--sk-lane-bg": theme.laneBg,
            "--sk-lane-header-bg": theme.laneHeaderBg,
            "--sk-lane-header-text": theme.laneHeaderText,
            "--sk-lane-border": theme.laneBorder,
            "--sk-board-bg": theme.boardBg,
            "--sk-tag-bg": theme.tagBg,
            "--sk-tag-text": theme.tagText,
            "--sk-tag-border": theme.tagBorder,
            "--sk-accent": theme.accentColor,
            "--sk-priority-urgent": theme.priorityUrgent,
            "--sk-priority-high": theme.priorityHigh,
            "--sk-priority-medium": theme.priorityMedium,
            "--sk-priority-low": theme.priorityLow,
            "--sk-due-overdue": theme.dueBadgeOverdue,
            "--sk-due-soon": theme.dueBadgeSoon,
            "--sk-font-family": theme.fontFamily
          };
          for (const [prop, value] of Object.entries(props)) {
            if (value) el.style.setProperty(prop, value);
            else el.style.removeProperty(prop);
          }
        }
        renderBoardTabs() {
          this.boardTabsEl.empty();
          const boards = this.plugin.settings.boards || [];
          if (boards.length === 0 && !this.boardId) {
            this.boardTabsEl.style.display = "none";
            return;
          }
          this.boardTabsEl.style.display = "";
          const defaultTab = this.boardTabsEl.createEl("button", {
            text: "Default Board",
            cls: `smart-kanban-board-tab ${!this.boardId ? "is-active" : ""}`
          });
          defaultTab.addEventListener("click", () => this.switchBoard(""));
          for (const board of boards) {
            const label = board.name + (board.type === "filtered-view" ? " (view)" : "");
            const tab = this.boardTabsEl.createEl("button", {
              text: label,
              cls: `smart-kanban-board-tab ${this.boardId === board.id ? "is-active" : ""}`
            });
            tab.addEventListener("click", () => this.switchBoard(board.id));
          }
          const addTab = this.boardTabsEl.createEl("button", {
            text: "+",
            cls: "smart-kanban-board-tab smart-kanban-board-tab-add"
          });
          addTab.addEventListener("click", async () => {
            await this.plugin.openBoardManager();
            this.renderBoardTabs();
            await this.reload();
          });
        }
        async switchBoard(boardId) {
          this.boardId = boardId;
          this.plugin.settings.activeBoardId = boardId;
          await this.plugin.saveSettings();
          this.clearFilters();
          this.renderBoardTabs();
          this.buildHeader();
          await this.reload();
        }
        async reload() {
          this._cancelDrag();
          this.cards = await this.plugin.collectCards(this.boardId);
          this.applyTheme();
          this.renderFilters();
          this.renderContent();
        }
        _cancelDrag() {
          if (!this._drag) return;
          this._drag.ghost.remove();
          if (this._drag.placeholder.parentElement) this._drag.placeholder.remove();
          this._drag.cardEl.classList.remove("is-dragging-source");
          this._drag = null;
          if (this._onMoveHandler) {
            document.removeEventListener("pointermove", this._onMoveHandler);
            this._onMoveHandler = null;
          }
          if (this._onUpHandler) {
            document.removeEventListener("pointerup", this._onUpHandler);
            document.removeEventListener("pointercancel", this._onUpHandler);
            this._onUpHandler = null;
          }
        }
        renderContent() {
          if (this.viewMode === "table") this.renderTable();
          else if (this.viewMode === "list") this.renderList();
          else this.renderBoard();
        }
        buildHeader() {
          this.headerEl.empty();
          const left = this.headerEl.createDiv({ cls: "smart-kanban-header-left" });
          left.createEl("h2", { text: "Smart Kanban", cls: "smart-kanban-title" });
          const toolbar = this.headerEl.createDiv({ cls: "smart-kanban-toolbar" });
          const searchWrap = toolbar.createDiv({ cls: "smart-kanban-search-wrap" });
          const searchInput = searchWrap.createEl("input", {
            type: "text",
            placeholder: "Search...",
            cls: "smart-kanban-search-input"
          });
          searchInput.value = this.filters.text;
          searchInput.addEventListener("input", () => {
            this.filters.text = searchInput.value.trim().toLowerCase();
            this.currentPreset = "";
            this.renderBoard();
          });
          const searchIcon = searchWrap.createSpan({ cls: "smart-kanban-search-icon" });
          setIcon2(searchIcon, "search");
          this.createIconBtn(toolbar, "filter", "Toggle Filters", () => {
            this.filtersCollapsed = !this.filtersCollapsed;
            this.filtersEl.style.display = this.filtersCollapsed ? "none" : "";
          });
          this.createIconBtn(toolbar, "plus", "New Task", () => this.createTaskInteractive());
          this.createIconBtn(toolbar, "refresh-cw", "Refresh", () => this.reload());
          this.createIconBtn(toolbar, "settings", "Configure Board", () => this.configureBoardInteractive());
          this.buildViewModeToggle(toolbar);
        }
        buildViewModeToggle(parent) {
          const wrap = parent.createDiv({ cls: "smart-kanban-viewmode-wrap" });
          const modes = [
            { key: "board", icon: "kanban-square", label: "View as board" },
            { key: "table", icon: "table", label: "View as table" },
            { key: "list", icon: "list", label: "View as list" }
          ];
          const currentMode = modes.find((m) => m.key === this.viewMode) || modes[0];
          const btn = wrap.createEl("button", { cls: "smart-kanban-icon-btn", attr: { title: currentMode.label } });
          setIcon2(btn, currentMode.icon);
          const dropdown = wrap.createDiv({ cls: "smart-kanban-viewmode-dropdown" });
          dropdown.style.display = "none";
          for (const mode of modes) {
            const item = dropdown.createDiv({ cls: `smart-kanban-viewmode-item ${this.viewMode === mode.key ? "is-active" : ""}` });
            const iconEl = item.createSpan({ cls: "smart-kanban-viewmode-item-icon" });
            setIcon2(iconEl, mode.icon);
            item.createSpan({ text: mode.label });
            if (this.viewMode === mode.key) {
              const check = item.createSpan({ cls: "smart-kanban-viewmode-check" });
              setIcon2(check, "check");
            }
            item.addEventListener("click", () => {
              this.viewMode = mode.key;
              dropdown.style.display = "none";
              this.buildHeader();
              this.renderContent();
            });
          }
          const closeDropdown = (e) => {
            if (!wrap.contains(e.target)) dropdown.style.display = "none";
          };
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdown.style.display = dropdown.style.display === "none" ? "" : "none";
            document.addEventListener("click", closeDropdown, { once: true });
          });
        }
        createIconBtn(parent, icon, title, onClick) {
          const btn = parent.createEl("button", { cls: "smart-kanban-icon-btn", attr: { title, "aria-label": title } });
          setIcon2(btn, icon);
          btn.addEventListener("click", async (e) => {
            e.stopPropagation();
            await onClick();
          });
          return btn;
        }
        async configureBoardInteractive() {
          const result = await this.plugin.openDragReorderModal({
            title: "Configure Board",
            sections: [
              {
                key: "statuses",
                label: "Lanes / Statuses",
                items: [...this.plugin.getStatusOrder()]
              },
              {
                key: "customFields",
                label: "Custom Fields",
                items: [...this.plugin.getCustomFieldKeys()]
              }
            ]
          });
          if (!result) return;
          this.plugin.settings.statusOrder = (result.statuses || []).join(", ");
          this.plugin.settings.customFields = (result.customFields || []).join(", ");
          await this.plugin.saveSettings();
          await this.reload();
          new Notice2("Board configuration updated.");
        }
        async createTaskInteractive() {
          const statuses = this.plugin.collectStatusesFromCards(this.cards);
          const defaultStatus = statuses[0] || "Todo";
          const categories = this.uniqueValues("category");
          const priorities = this.uniqueValues("priority");
          const values = await this.plugin.openFormModal({
            title: "New Task",
            submitText: "Create",
            fields: [
              { key: "title", label: "Task title", value: "", type: "text" },
              { key: "status", label: "Status", value: defaultStatus, type: "select", options: statuses },
              {
                key: "category",
                label: "Category",
                value: "",
                type: "select",
                options: ["", ...categories],
                optionLabelEmpty: "None"
              },
              {
                key: "priority",
                label: "Priority",
                value: "",
                type: "select",
                options: ["", ...priorities],
                optionLabelEmpty: "None"
              },
              { key: "due", label: "Due date", value: "", type: "date" },
              { key: "tags", label: "Tags (comma separated)", value: "" }
            ]
          });
          if (!values) return;
          const title = String(values.title || "").trim();
          if (!title) {
            new Notice2("Task title is required.");
            return;
          }
          const status = String(values.status || "").trim() || defaultStatus;
          const category = String(values.category || "").trim();
          const priority = String(values.priority || "").trim();
          const dueInput = String(values.due || "");
          const tagsInput = String(values.tags || "");
          const dueDate = normalizeDateInput2(dueInput);
          if (dueInput.trim() && !dueDate) {
            new Notice2("Invalid due date. Use YYYY-MM-DD.");
            return;
          }
          const tags = splitCsv2(tagsInput);
          await this.plugin.createTaskEntry(title.trim(), {
            [this.plugin.settings.statusField]: (status || defaultStatus).trim() || defaultStatus,
            [this.plugin.settings.categoryField]: category.trim(),
            [this.plugin.settings.priorityField]: priority.trim(),
            [this.plugin.settings.dueDateField]: dueDate,
            [this.plugin.settings.tagsField]: tags
          });
          await this.reload();
        }
        renderFilters() {
          for (const cleanup of this._dropdownCleanups) cleanup();
          this._dropdownCleanups = [];
          this.filtersEl.empty();
          if (this.filtersCollapsed) {
            this.filtersEl.style.display = "none";
            return;
          }
          this.filtersEl.style.display = "";
          const row = this.filtersEl.createDiv({ cls: "smart-kanban-filter-row" });
          const categories = this.uniqueValues("category");
          const priorities = this.uniqueValues("priority");
          const tags = this.uniqueTagValues();
          this.renderDropdownFilter(row, "Category", categories, "categories");
          this.renderDropdownFilter(row, "Priority", priorities, "priorities");
          this.renderDropdownFilter(row, "Tag", tags, "tags");
          const hasFilters = this.filters.categories.length || this.filters.priorities.length || this.filters.tags.length || this.filters.text;
          if (hasFilters) {
            const clearBtn = row.createEl("button", { text: "Clear", cls: "smart-kanban-filter-clear-btn" });
            clearBtn.addEventListener("click", () => {
              this.clearFilters();
              this.renderFilters();
              this.renderBoard();
            });
          }
          const presetNames = Object.keys(this.plugin.settings.filterPresets || {});
          if (presetNames.length > 0 || hasFilters) {
            const spacer = row.createDiv({ cls: "smart-kanban-filter-spacer" });
            this.renderPresetControls(row, presetNames);
          }
        }
        renderPresetControls(row, names) {
          const wrap = row.createDiv({ cls: "smart-kanban-preset-wrap" });
          if (names.length > 0) {
            const select = wrap.createEl("select", { cls: "smart-kanban-preset-select" });
            select.createEl("option", { text: "Views...", value: "" });
            for (const name of names.sort((a, b) => a.localeCompare(b))) {
              const opt = select.createEl("option", { value: name });
              opt.textContent = name;
            }
            select.value = this.currentPreset;
            select.addEventListener("change", () => {
              if (!select.value) {
                this.currentPreset = "";
                return;
              }
              this.applyPreset(select.value);
            });
            if (this.currentPreset) {
              const deleteBtn = wrap.createEl("button", { cls: "smart-kanban-icon-btn-sm", attr: { title: "Delete view" } });
              setIcon2(deleteBtn, "trash-2");
              deleteBtn.addEventListener("click", () => this.deleteCurrentPresetInteractive());
            }
          }
          const saveBtn = wrap.createEl("button", { cls: "smart-kanban-icon-btn-sm", attr: { title: "Save current filters as view" } });
          setIcon2(saveBtn, "bookmark-plus");
          saveBtn.addEventListener("click", () => this.savePresetInteractive());
        }
        renderDropdownFilter(parent, label, values, key) {
          const wrap = parent.createDiv({ cls: "smart-kanban-dropdown-filter" });
          const selected = this.filters[key] || [];
          const btnText = selected.length === 0 ? label : `${label} (${selected.length})`;
          const trigger = wrap.createEl("button", { cls: "smart-kanban-dropdown-trigger" });
          trigger.createSpan({ text: btnText });
          const chevron = trigger.createSpan({ cls: "smart-kanban-dropdown-chevron" });
          setIcon2(chevron, "chevron-down");
          const panel = wrap.createDiv({ cls: "smart-kanban-dropdown-panel" });
          panel.style.display = "none";
          let isOpen = false;
          const closePanel = () => {
            isOpen = false;
            panel.style.display = "none";
            trigger.removeClass("is-open");
          };
          const outsideClick = (event) => {
            if (!wrap.contains(event.target)) closePanel();
          };
          trigger.addEventListener("click", (event) => {
            event.stopPropagation();
            if (isOpen) {
              closePanel();
              return;
            }
            document.querySelectorAll(".smart-kanban-dropdown-panel").forEach((p) => {
              if (p !== panel) p.style.display = "none";
            });
            isOpen = true;
            panel.style.display = "";
            trigger.addClass("is-open");
            document.addEventListener("click", outsideClick, true);
          });
          this._dropdownCleanups.push(() => {
            document.removeEventListener("click", outsideClick, true);
          });
          if (!values.length) {
            panel.createDiv({ text: `No ${label.toLowerCase()} values`, cls: "smart-kanban-dropdown-empty" });
            return;
          }
          for (const value of values) {
            const item = panel.createDiv({ cls: "smart-kanban-dropdown-item" });
            const cb = item.createEl("input");
            cb.type = "checkbox";
            cb.checked = selected.includes(value);
            const lbl = item.createEl("span", { cls: "smart-kanban-dropdown-item-label" });
            lbl.textContent = value;
            const updateTrigger = () => {
              const sel = this.filters[key];
              trigger.querySelector("span").textContent = sel.length === 0 ? label : `${label} (${sel.length})`;
            };
            cb.addEventListener("change", () => {
              this.toggleFilterValue(key, value);
              updateTrigger();
            });
            item.addEventListener("click", (event) => {
              if (event.target !== cb) {
                cb.checked = !cb.checked;
                cb.dispatchEvent(new Event("change"));
              }
            });
          }
          if (selected.length > 0) {
            const clearAll = panel.createEl("button", { text: "Clear", cls: "smart-kanban-dropdown-clear" });
            clearAll.addEventListener("click", () => {
              this.filters[key] = [];
              this.currentPreset = "";
              this.renderFilters();
              this.renderBoard();
            });
          }
        }
        toggleFilterValue(key, value) {
          const selected = new Set(this.filters[key]);
          if (selected.has(value)) selected.delete(value);
          else selected.add(value);
          this.filters[key] = [...selected].sort((a, b) => a.localeCompare(b));
          this.currentPreset = "";
          this.renderFilters();
          this.renderBoard();
        }
        applyPreset(name) {
          const preset = this.plugin.getFilterPreset(name);
          if (!preset) {
            new Notice2(`Preset not found: ${name}`);
            this.currentPreset = "";
            this.renderFilters();
            return;
          }
          this.filters = this.plugin.cloneFilters(preset);
          this.currentPreset = name;
          this.renderFilters();
          this.renderBoard();
        }
        async savePresetInteractive() {
          const values = await this.plugin.openFormModal({
            title: "Save View Preset",
            submitText: "Save",
            fields: [
              {
                key: "name",
                label: "Preset name",
                value: this.currentPreset || ""
              }
            ]
          });
          if (!values) return;
          const normalizedName = String(values.name || "").trim();
          if (!normalizedName) return;
          await this.plugin.saveFilterPreset(normalizedName, this.filters);
          this.currentPreset = normalizedName;
          this.renderFilters();
          new Notice2(`Saved view: ${normalizedName}`);
        }
        async deleteCurrentPresetInteractive() {
          if (!this.currentPreset) return;
          const name = this.currentPreset;
          const confirmed = await this.plugin.openConfirmModal({
            title: "Delete Preset",
            message: `Delete preset "${name}"?`,
            confirmText: "Delete"
          });
          if (!confirmed) return;
          await this.plugin.deleteFilterPreset(name);
          this.currentPreset = "";
          this.renderFilters();
          new Notice2(`Deleted view: ${name}`);
        }
        clearFilters() {
          this.filters = this.plugin.createEmptyFilters();
          this.currentPreset = "";
        }
        uniqueValues(key) {
          const out = /* @__PURE__ */ new Set();
          for (const card of this.cards) {
            const value = String(card[key] || "").trim();
            if (value) out.add(value);
          }
          return [...out].sort((a, b) => a.localeCompare(b));
        }
        uniqueTagValues() {
          const out = /* @__PURE__ */ new Set();
          for (const card of this.cards) {
            for (const tag of card.tags || []) out.add(tag);
          }
          return [...out].sort((a, b) => a.localeCompare(b));
        }
        renderBoard() {
          this.boardEl.empty();
          this.boardEl.removeClass("smart-kanban-table-wrap");
          this.boardEl.removeClass("smart-kanban-list-wrap");
          this.boardEl.addClass("smart-kanban-board");
          if (this.cards.length === 0) {
            const emptyEl = this.boardEl.createDiv({ cls: "smart-kanban-empty-state" });
            emptyEl.createEl("h3", { text: "No tasks found" });
            emptyEl.createEl("p", { text: "Create your first task to get started, or check that your source folder is configured correctly." });
            const createBtn = emptyEl.createEl("button", { text: "Create First Task", cls: "mod-cta" });
            createBtn.addEventListener("click", async () => {
              await this.createTaskInteractive();
            });
            return;
          }
          let statuses = this.plugin.collectStatusesFromCards(this.cards);
          const board = this.boardId ? this.plugin.getBoard(this.boardId) : null;
          if (board && board.type === "filtered-view" && board.visibleStatuses) {
            const visible = board.visibleStatuses.split(",").map((s) => s.trim()).filter(Boolean);
            if (visible.length) statuses = statuses.filter((s) => visible.includes(s));
          }
          const filteredCards = this.filteredCards();
          if (this.cards.length > 0 && filteredCards.length === 0) {
            const emptyEl = this.boardEl.createDiv({ cls: "smart-kanban-empty-state" });
            emptyEl.createEl("p", { text: "No tasks match current filters." });
            const clearBtn = emptyEl.createEl("button", { text: "Clear Filters" });
            clearBtn.addEventListener("click", () => {
              this.clearFilters();
              this.renderFilters();
              this.renderBoard();
            });
            return;
          }
          for (const status of statuses) {
            const lane = this.boardEl.createDiv({ cls: "smart-kanban-lane" });
            lane.dataset.status = status;
            const isCollapsed = this.collapsedLanes.has(status);
            if (isCollapsed) lane.addClass("is-collapsed");
            const laneHeader = lane.createDiv({ cls: "smart-kanban-lane-header" });
            const laneColor = this.plugin.getResolvedLaneColor(status);
            if (laneColor.bg) laneHeader.style.backgroundColor = laneColor.bg;
            if (laneColor.text) laneHeader.style.color = laneColor.text;
            const collapseIcon = laneHeader.createSpan({
              text: isCollapsed ? "\u25B6" : "\u25BC",
              cls: "smart-kanban-collapse-icon"
            });
            laneHeader.createEl("h3", { text: status });
            laneHeader.addEventListener("click", () => {
              if (this.collapsedLanes.has(status)) this.collapsedLanes.delete(status);
              else this.collapsedLanes.add(status);
              this.renderBoard();
            });
            let laneCards = filteredCards.filter((card) => (card.status || "Todo") === status);
            laneCards = this.plugin.sortCards(laneCards);
            const countWrap = laneHeader.createDiv({ cls: "smart-kanban-count-wrap" });
            countWrap.createEl("span", { text: String(laneCards.length), cls: "smart-kanban-count" });
            const wipLimit = this.plugin.getWipLimit(status);
            if (wipLimit > 0) {
              const wip = countWrap.createEl("span", {
                text: `${laneCards.length}/${wipLimit}`,
                cls: "smart-kanban-wip"
              });
              if (laneCards.length > wipLimit) {
                wip.addClass("is-over");
                lane.addClass("is-over-wip");
              }
            }
            if (!isCollapsed) {
              const list = lane.createDiv({ cls: "smart-kanban-card-list" });
              list.dataset.status = status;
              for (const card of laneCards) {
                this.renderCard(list, card);
              }
              const quickAdd = lane.createDiv({ cls: "smart-kanban-quick-add" });
              const quickInput = quickAdd.createEl("input", {
                type: "text",
                placeholder: "Add task...",
                cls: "smart-kanban-quick-add-input"
              });
              const quickBtn = quickAdd.createEl("button", { text: "+", cls: "smart-kanban-quick-add-btn" });
              const doQuickAdd = async () => {
                const title = quickInput.value.trim();
                if (!title) return;
                const s = this.plugin.settings;
                await this.plugin.createTaskEntry(title, {
                  [s.statusField]: status,
                  [s.categoryField]: "",
                  [s.priorityField]: "",
                  [s.dueDateField]: "",
                  [s.tagsField]: ""
                });
                quickInput.value = "";
                await this.reload();
              };
              quickBtn.addEventListener("click", doQuickAdd);
              quickInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  doQuickAdd();
                }
              });
            }
          }
        }
        renderTable() {
          this.boardEl.empty();
          this.boardEl.removeClass("smart-kanban-board");
          this.boardEl.addClass("smart-kanban-table-wrap");
          const filtered = this.filteredCards();
          const sorted = this.plugin.sortCards(filtered);
          if (!sorted.length) {
            this.boardEl.createDiv({ cls: "smart-kanban-empty-state" }).createEl("p", { text: "No tasks found." });
            return;
          }
          const table = this.boardEl.createEl("table", { cls: "smart-kanban-table" });
          const thead = table.createEl("thead");
          const headerRow = thead.createEl("tr");
          for (const col of ["Title", "Status", "Category", "Priority", "Due Date", "Tags"]) {
            headerRow.createEl("th", { text: col });
          }
          const tbody = table.createEl("tbody");
          for (const card of sorted) {
            const tr = tbody.createEl("tr", { cls: "smart-kanban-table-row" });
            const tdTitle = tr.createEl("td");
            const link = tdTitle.createEl("a", { text: card.title, href: "#", cls: "smart-kanban-table-link" });
            link.addEventListener("click", async (e) => {
              e.preventDefault();
              const file = this.app.vault.getAbstractFileByPath(card.path);
              if (file instanceof TFile2) await this.app.workspace.getLeaf(true).openFile(file);
            });
            tr.createEl("td").createSpan({ text: card.status || "Todo", cls: "smart-kanban-badge smart-kanban-badge-category" });
            const tdCat = tr.createEl("td");
            if (card.category) tdCat.createSpan({ text: card.category, cls: "smart-kanban-badge smart-kanban-badge-category" });
            const tdPri = tr.createEl("td");
            if (card.priority) {
              const slug = card.priority.toLowerCase().replace(/\s+/g, "-");
              tdPri.createSpan({ text: card.priority, cls: `smart-kanban-badge smart-kanban-priority-badge smart-kanban-priority-${slug}` });
            }
            const tdDue = tr.createEl("td");
            if (card.dueDate) {
              const cls = card.dueInfo ? `smart-kanban-badge smart-kanban-due-badge ${card.dueInfo.cls || ""}` : "";
              tdDue.createSpan({ text: card.dueDate, cls });
            }
            const tdTags = tr.createEl("td", { cls: "smart-kanban-table-tags" });
            for (const tag of card.tags || []) {
              tdTags.createSpan({ text: tag, cls: "smart-kanban-badge smart-kanban-tag" });
            }
          }
        }
        renderList() {
          this.boardEl.empty();
          this.boardEl.removeClass("smart-kanban-board");
          this.boardEl.addClass("smart-kanban-list-wrap");
          const filtered = this.filteredCards();
          const statuses = this.plugin.collectStatusesFromCards(this.cards);
          if (!filtered.length) {
            this.boardEl.createDiv({ cls: "smart-kanban-empty-state" }).createEl("p", { text: "No tasks found." });
            return;
          }
          for (const status of statuses) {
            let laneCards = filtered.filter((c) => (c.status || "Todo") === status);
            if (!laneCards.length) continue;
            laneCards = this.plugin.sortCards(laneCards);
            const section = this.boardEl.createDiv({ cls: "smart-kanban-list-section" });
            const header = section.createDiv({ cls: "smart-kanban-list-section-header" });
            const laneColor = this.plugin.getResolvedLaneColor(status);
            if (laneColor.bg) header.style.borderLeftColor = laneColor.bg;
            header.createSpan({ text: status, cls: "smart-kanban-list-section-title" });
            header.createSpan({ text: String(laneCards.length), cls: "smart-kanban-list-section-count" });
            for (const card of laneCards) {
              const row = section.createDiv({ cls: "smart-kanban-list-item" });
              const link = row.createEl("a", { text: card.title, href: "#", cls: "smart-kanban-list-item-title" });
              link.addEventListener("click", async (e) => {
                e.preventDefault();
                const file = this.app.vault.getAbstractFileByPath(card.path);
                if (file instanceof TFile2) await this.app.workspace.getLeaf(true).openFile(file);
              });
              const badges = row.createDiv({ cls: "smart-kanban-list-item-badges" });
              if (card.category) badges.createSpan({ text: card.category, cls: "smart-kanban-badge smart-kanban-badge-category" });
              if (card.priority) {
                const slug = card.priority.toLowerCase().replace(/\s+/g, "-");
                badges.createSpan({ text: card.priority, cls: `smart-kanban-badge smart-kanban-priority-badge smart-kanban-priority-${slug}` });
              }
              if (card.dueInfo) badges.createSpan({ text: card.dueInfo.label, cls: "smart-kanban-badge smart-kanban-due-badge" });
              for (const tag of card.tags || []) {
                badges.createSpan({ text: tag, cls: "smart-kanban-badge smart-kanban-tag" });
              }
            }
          }
        }
        renderCard(parent, card) {
          const cardEl = parent.createDiv({ cls: "smart-kanban-card" });
          cardEl.dataset.cardId = card.id;
          if (card.priority) cardEl.dataset.priority = card.priority.toLowerCase().replace(/\s+/g, "-");
          cardEl.setAttr("tabindex", "0");
          cardEl.addEventListener("pointerdown", (e) => {
            if (e.button !== 0) return;
            if (e.target.closest("a, button, select, input")) return;
            e.preventDefault();
            this._startDrag(e, cardEl, card);
          });
          if (card.dueInfo && card.dueInfo.cls) {
            cardEl.addClass(card.dueInfo.cls);
          }
          const titleRow = cardEl.createDiv({ cls: "smart-kanban-card-title" });
          const link = titleRow.createEl("a", { text: card.title, href: "#", cls: "smart-kanban-card-title-link" });
          link.addEventListener("click", async (event) => {
            event.preventDefault();
            const file = this.app.vault.getAbstractFileByPath(card.path);
            if (file instanceof TFile2) {
              await this.app.workspace.getLeaf(true).openFile(file);
            }
          });
          const overflowWrap = titleRow.createDiv({ cls: "smart-kanban-overflow-wrap" });
          const overflowBtn = overflowWrap.createEl("button", { cls: "smart-kanban-overflow-btn" });
          setIcon2(overflowBtn, "more-horizontal");
          const badges = cardEl.createDiv({ cls: "smart-kanban-card-badges" });
          if (card.category) {
            badges.createSpan({ text: card.category, cls: "smart-kanban-badge smart-kanban-badge-category" });
          }
          if (card.priority) {
            const prioSlug = card.priority.toLowerCase().replace(/\s+/g, "-");
            badges.createSpan({
              text: card.priority,
              cls: `smart-kanban-badge smart-kanban-priority-badge smart-kanban-priority-${prioSlug}`
            });
          }
          if (card.dueInfo) {
            badges.createSpan({ text: card.dueInfo.label, cls: "smart-kanban-badge smart-kanban-due-badge" });
          }
          const customEntries = this.plugin.getCardMetaEntries(card);
          for (const [label, value] of customEntries) {
            if (!value || value === "-") continue;
            if (label === "Category" || label === "Priority" || label === "Due") continue;
            badges.createSpan({ text: value, cls: "smart-kanban-badge smart-kanban-badge-custom" });
          }
          if (card.tags && card.tags.length) {
            for (const tag of card.tags) {
              badges.createSpan({ text: tag, cls: "smart-kanban-badge smart-kanban-tag" });
            }
          }
          const menu = overflowWrap.createDiv({ cls: "smart-kanban-overflow-menu" });
          menu.style.display = "none";
          overflowBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            document.querySelectorAll(".smart-kanban-overflow-menu").forEach((m) => {
              if (m !== menu) {
                m.style.display = "none";
                const c = m.closest(".smart-kanban-card");
                if (c) c.classList.remove("has-menu-open");
              }
            });
            const opening = menu.style.display === "none";
            menu.style.display = opening ? "" : "none";
            cardEl.classList.toggle("has-menu-open", opening);
          });
          const editItem = menu.createDiv({ text: "Edit", cls: "smart-kanban-menu-item" });
          editItem.addEventListener("click", async () => {
            menu.style.display = "none";
            await this.editCardInteractive(card);
          });
          const openItem = menu.createDiv({ text: "Open Note", cls: "smart-kanban-menu-item" });
          openItem.addEventListener("click", async () => {
            menu.style.display = "none";
            const file = this.app.vault.getAbstractFileByPath(card.path);
            if (file instanceof TFile2) {
              await this.app.workspace.getLeaf(true).openFile(file);
            }
          });
          const completeItem = menu.createDiv({ text: "Mark Done", cls: "smart-kanban-menu-item" });
          completeItem.addEventListener("click", async () => {
            menu.style.display = "none";
            await this.plugin.updateCardStatus(card, "Done");
            await this.reload();
            new Notice2(`Completed: ${card.title}`);
          });
          const moveItem = menu.createDiv({ cls: "smart-kanban-menu-item smart-kanban-move-item" });
          moveItem.createSpan({ text: "Move to " });
          const moveSelect = moveItem.createEl("select", { cls: "smart-kanban-move-select" });
          moveSelect.createEl("option", { text: "...", value: "" });
          const allStatuses = this.plugin.collectStatusesFromCards(this.cards);
          for (const s of allStatuses) {
            if (s !== card.status) {
              moveSelect.createEl("option", { text: s, value: s });
            }
          }
          moveSelect.addEventListener("change", async () => {
            if (!moveSelect.value) return;
            menu.style.display = "none";
            await this.plugin.updateCardStatus(card, moveSelect.value);
            await this.reload();
          });
          const deleteItem = menu.createDiv({ text: "Delete", cls: "smart-kanban-menu-item smart-kanban-menu-delete" });
          deleteItem.addEventListener("click", async () => {
            menu.style.display = "none";
            await this.deleteCardInteractive(card);
          });
          cardEl.addEventListener("keydown", (event) => {
            if (event.key === "e" && document.activeElement === cardEl) {
              event.preventDefault();
              this.editCardInteractive(card);
            }
          });
        }
        async deleteCardInteractive(card) {
          const confirmed = await this.plugin.openConfirmModal({
            title: "Delete Task",
            message: `Delete "${card.title}"? This cannot be undone.`,
            confirmText: "Delete"
          });
          if (!confirmed) return;
          if (card.kind === "task") {
            await this.plugin.deleteTaskLine(card);
          } else {
            await this.plugin.deleteNoteCard(card);
          }
          await this.reload();
          new Notice2(`Deleted: ${card.title}`);
        }
        async editCardInteractive(card) {
          const categories = this.uniqueValues("category");
          const priorities = this.uniqueValues("priority");
          const values = await this.plugin.openFormModal({
            title: "Edit Task",
            submitText: "Save",
            fields: [
              { key: "title", label: "Title", value: card.title || "" },
              {
                key: "category",
                label: "Category",
                value: card.category || "",
                type: "select",
                options: ["", ...categories],
                optionLabelEmpty: "None"
              },
              {
                key: "priority",
                label: "Priority",
                value: card.priority || "",
                type: "select",
                options: ["", ...priorities],
                optionLabelEmpty: "None"
              },
              { key: "due", label: "Due date", value: card.dueDate || "", type: "date" },
              { key: "tags", label: "Tags (comma separated)", value: (card.tags || []).join(", ") }
            ]
          });
          if (!values) return;
          const newTitle = String(values.title || "").trim();
          if (newTitle && newTitle !== card.title) {
            await this.plugin.updateCardTitle(card, newTitle);
          }
          const nextCategory = String(values.category || "");
          const nextPriority = String(values.priority || "");
          const nextDueInput = String(values.due || "");
          const nextDue = normalizeDateInput2(nextDueInput);
          if (nextDueInput.trim() && !nextDue) {
            new Notice2("Invalid due date. Use YYYY-MM-DD.");
            return;
          }
          const nextTagsInput = String(values.tags || "");
          const nextTags = splitCsv2(nextTagsInput);
          await this.plugin.updateCardFields(card, {
            [this.plugin.settings.categoryField]: nextCategory.trim(),
            [this.plugin.settings.priorityField]: nextPriority.trim(),
            [this.plugin.settings.dueDateField]: nextDue || "",
            [this.plugin.settings.tagsField]: nextTags
          });
          await this.reload();
        }
        filteredCards() {
          const autoArchiveDays = Number(this.plugin.settings.autoArchiveDays) || 0;
          const now = /* @__PURE__ */ new Date();
          return this.cards.filter((card) => {
            if (autoArchiveDays > 0 && (card.status || "").toLowerCase() === "done" && card.dueDate) {
              const dueDate = /* @__PURE__ */ new Date(`${card.dueDate}T00:00:00`);
              if (!Number.isNaN(dueDate.getTime())) {
                const daysSince = Math.round((now.getTime() - dueDate.getTime()) / 864e5);
                if (daysSince > autoArchiveDays) return false;
              }
            }
            const category = card.category || "";
            const priority = card.priority || "";
            const tags = card.tags || [];
            if (this.filters.categories.length && !this.filters.categories.includes(category)) return false;
            if (this.filters.priorities.length && !this.filters.priorities.includes(priority)) return false;
            if (this.filters.tags.length && !this.filters.tags.some((tag) => tags.includes(tag))) return false;
            if (this.filters.text) {
              const haystack = [card.title, card.category, card.priority, card.dueDate, ...card.tags || []].filter(Boolean).join(" ").toLowerCase();
              if (!haystack.includes(this.filters.text)) return false;
            }
            return true;
          });
        }
        /* ── Pointer-based drag & drop ── */
        _startDrag(e, cardEl, card) {
          const startX = e.clientX;
          const startY = e.clientY;
          const threshold = 5;
          let started = false;
          const onMove = (me) => {
            const dx = me.clientX - startX;
            const dy = me.clientY - startY;
            if (!started) {
              if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return;
              started = true;
              this._initDragOverlay(cardEl, card, startX, startY);
            }
            this._moveDrag(me.clientX, me.clientY);
          };
          const onUp = async (ue) => {
            document.removeEventListener("pointermove", onMove);
            document.removeEventListener("pointerup", onUp);
            document.removeEventListener("pointercancel", onUp);
            this._onMoveHandler = null;
            this._onUpHandler = null;
            if (!started) return;
            await this._finishDrag();
          };
          this._onMoveHandler = onMove;
          this._onUpHandler = onUp;
          document.addEventListener("pointermove", onMove);
          document.addEventListener("pointerup", onUp);
          document.addEventListener("pointercancel", onUp);
        }
        _initDragOverlay(cardEl, card, startX, startY) {
          const rect = cardEl.getBoundingClientRect();
          const ghost = cardEl.cloneNode(true);
          ghost.className = "smart-kanban-card smart-kanban-drag-ghost";
          ghost.style.cssText = `position:fixed;z-index:9999;width:${rect.width}px;pointer-events:none;opacity:0.85;transform:rotate(2deg);box-shadow:0 8px 24px rgba(0,0,0,0.18);`;
          ghost.style.left = `${rect.left}px`;
          ghost.style.top = `${rect.top}px`;
          document.body.appendChild(ghost);
          const placeholder = document.createElement("div");
          placeholder.className = "smart-kanban-drop-placeholder";
          placeholder.style.height = `${rect.height}px`;
          cardEl.parentElement.insertBefore(placeholder, cardEl);
          cardEl.classList.add("is-dragging-source");
          this._drag = {
            card,
            cardEl,
            ghost,
            placeholder,
            offsetX: startX - rect.left,
            offsetY: startY - rect.top,
            targetStatus: card.status || "Todo",
            isOverValidTarget: true
          };
        }
        _moveDrag(cx, cy) {
          const d = this._drag;
          if (!d) return;
          d.ghost.style.left = `${cx - d.offsetX}px`;
          d.ghost.style.top = `${cy - d.offsetY}px`;
          this.boardEl.querySelectorAll(".is-drag-target").forEach((el) => el.classList.remove("is-drag-target"));
          const lists = [...this.boardEl.querySelectorAll(".smart-kanban-card-list")];
          let targetList = null;
          for (const list of lists) {
            const lr = list.getBoundingClientRect();
            if (cx >= lr.left && cx <= lr.right && cy >= lr.top - 20 && cy <= lr.bottom + 20) {
              targetList = list;
              break;
            }
          }
          if (!targetList) {
            d.isOverValidTarget = false;
            return;
          }
          d.isOverValidTarget = true;
          d.targetStatus = targetList.dataset.status;
          targetList.classList.add("is-drag-target");
          const cardEls = [...targetList.querySelectorAll(".smart-kanban-card:not(.is-dragging-source)")];
          let insertBefore = null;
          for (const c of cardEls) {
            const cr = c.getBoundingClientRect();
            if (cy < cr.top + cr.height / 2) {
              insertBefore = c;
              break;
            }
          }
          if (insertBefore) {
            targetList.insertBefore(d.placeholder, insertBefore);
          } else {
            targetList.appendChild(d.placeholder);
          }
        }
        async _finishDrag() {
          const d = this._drag;
          if (!d) return;
          this._drag = null;
          d.ghost.remove();
          this.boardEl.querySelectorAll(".is-drag-target").forEach((el) => el.classList.remove("is-drag-target"));
          if (!d.isOverValidTarget) {
            d.placeholder.replaceWith(d.cardEl);
            d.cardEl.classList.remove("is-dragging-source");
            return;
          }
          d.placeholder.replaceWith(d.cardEl);
          d.cardEl.classList.remove("is-dragging-source");
          if (!this.plugin.settings.cardOrder) this.plugin.settings.cardOrder = {};
          const allLists = this.boardEl.querySelectorAll(".smart-kanban-card-list");
          for (const list of allLists) {
            const cardEls = list.querySelectorAll(".smart-kanban-card");
            for (let i = 0; i < cardEls.length; i++) {
              const id = cardEls[i].dataset.cardId;
              if (id) this.plugin.settings.cardOrder[id] = i * 1e3;
            }
          }
          await this.plugin.saveSettings();
          const oldStatus = d.card.status || "Todo";
          const targetStatus = d.targetStatus;
          if (targetStatus !== oldStatus) {
            await this.plugin.updateCardStatus(d.card, targetStatus);
          }
          if (this._dragReloadTimer) clearTimeout(this._dragReloadTimer);
          this._dragReloadTimer = setTimeout(() => this.reload(), 1500);
        }
        async onClose() {
          this._cancelDrag();
          if (this._dragReloadTimer) {
            clearTimeout(this._dragReloadTimer);
            this._dragReloadTimer = null;
          }
          if (this._clickOutsideHandler) {
            document.removeEventListener("click", this._clickOutsideHandler);
          }
        }
      }
      return { SmartKanbanView: SmartKanbanView2 };
    };
  }
});

// src/settings-tab.js
var require_settings_tab = __commonJS({
  "src/settings-tab.js"(exports2, module2) {
    module2.exports = function createSettingsTab({ PluginSettingTab: PluginSettingTab2, Setting: Setting2, Notice: Notice2, DEFAULT_SETTINGS: DEFAULT_SETTINGS2, THEME_PRESETS: THEME_PRESETS2 }) {
      function section(containerEl, title, desc) {
        const el = containerEl.createDiv({ cls: "sk-settings-section" });
        const header = el.createDiv({ cls: "sk-settings-section-header" });
        header.createEl("h3", { text: title, cls: "sk-settings-section-title" });
        if (desc) header.createEl("p", { text: desc, cls: "sk-settings-section-desc" });
        return el;
      }
      class SmartKanbanSettingTab2 extends PluginSettingTab2 {
        constructor(app, plugin) {
          super(app, plugin);
          this.plugin = plugin;
        }
        display() {
          const { containerEl } = this;
          containerEl.empty();
          const srcSection = section(containerEl, "Data Source", "Where your tasks come from.");
          new Setting2(srcSection).setName("Source mode").setDesc("Note cards create one file per task. Task lines use checklist syntax in a single file.").addDropdown(
            (dropdown) => dropdown.addOption("notes", "Note cards").addOption("tasks", "Task lines").setValue(this.plugin.settings.sourceMode).onChange(async (value) => {
              this.plugin.settings.sourceMode = value;
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          new Setting2(srcSection).setName("Source folder").setDesc("Folder containing your task notes or files.").addText(
            (text) => text.setPlaceholder("Tasks").setValue(this.plugin.settings.sourceFolder).onChange(async (value) => {
              this.plugin.settings.sourceFolder = value.trim();
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          new Setting2(srcSection).setName("Include subfolders").setDesc("Also scan nested folders inside the source folder.").addToggle(
            (toggle) => toggle.setValue(this.plugin.settings.includeSubfolders).onChange(async (value) => {
              this.plugin.settings.includeSubfolders = value;
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          new Setting2(srcSection).setName("Task inbox file").setDesc("File used when adding new tasks in Task Lines mode.").addText(
            (text) => text.setPlaceholder("Tasks/Task Inbox.md").setValue(this.plugin.settings.taskInboxFile).onChange(async (value) => {
              this.plugin.settings.taskInboxFile = value.trim() || "Tasks/Task Inbox.md";
              await this.plugin.saveSettings();
            })
          );
          const fieldSection = section(containerEl, "Field Mapping", "Map your frontmatter or inline fields to Kanban properties.");
          const fieldDefs = [
            ["statusField", "Status field", "Determines which lane a card appears in."],
            ["categoryField", "Category field", "Optional grouping label shown as a badge."],
            ["priorityField", "Priority field", "Sets priority level (Urgent, High, Medium, Low)."],
            ["tagsField", "Tags field", "Comma-separated tags displayed on the card."],
            ["dueDateField", "Due date field", "Date in YYYY-MM-DD format for due tracking."]
          ];
          for (const [key, label, desc] of fieldDefs) {
            new Setting2(fieldSection).setName(label).setDesc(desc).addText(
              (text) => text.setValue(this.plugin.settings[key]).onChange(async (value) => {
                this.plugin.settings[key] = value.trim() || DEFAULT_SETTINGS2[key];
                await this.plugin.saveSettings();
                this.plugin.refreshViews();
              })
            );
          }
          new Setting2(fieldSection).setName("Custom fields").setDesc("Extra frontmatter keys to display on cards. Comma-separated.").addText(
            (text) => text.setPlaceholder("effort, assignee").setValue(this.plugin.settings.customFields).onChange(async (value) => {
              this.plugin.settings.customFields = value;
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          const layoutSection = section(containerEl, "Board Layout", "Control lane order, sorting, and work-in-progress limits.");
          new Setting2(layoutSection).setName("Status order").setDesc("Comma-separated lane names in display order.").addTextArea(
            (text) => text.setValue(this.plugin.settings.statusOrder).onChange(async (value) => {
              this.plugin.settings.statusOrder = value;
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          new Setting2(layoutSection).setName("Priority order").setDesc("Defines priority ranking for sorting. Comma-separated, highest first.").addText(
            (text) => text.setPlaceholder("Urgent,High,Medium,Low").setValue(this.plugin.settings.priorityOrder).onChange(async (value) => {
              this.plugin.settings.priorityOrder = value;
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          new Setting2(layoutSection).setName("Sort by").setDesc("Default card sorting within each lane.").addDropdown(
            (dropdown) => dropdown.addOption("none", "Manual (drag to reorder)").addOption("priority", "Priority").addOption("due", "Due date").addOption("title", "Title").setValue(this.plugin.settings.sortBy).onChange(async (value) => {
              this.plugin.settings.sortBy = value;
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          new Setting2(layoutSection).setName("Sort direction").addDropdown(
            (dropdown) => dropdown.addOption("asc", "Ascending").addOption("desc", "Descending").setValue(this.plugin.settings.sortDirection).onChange(async (value) => {
              this.plugin.settings.sortDirection = value;
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          new Setting2(layoutSection).setName("Due soon threshold").setDesc("Cards due within this many days are highlighted.").addText(
            (text) => text.setValue(String(this.plugin.settings.dueSoonDays)).onChange(async (value) => {
              const parsed = Number.parseInt(value, 10);
              this.plugin.settings.dueSoonDays = Number.isFinite(parsed) && parsed >= 0 ? parsed : 2;
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          new Setting2(layoutSection).setName("WIP limits").setDesc("Limit cards per lane. Format: Todo:10, In Progress:3").addTextArea(
            (text) => text.setValue(this.plugin.settings.wipLimits).onChange(async (value) => {
              this.plugin.settings.wipLimits = value;
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          new Setting2(layoutSection).setName("Auto-archive done tasks").setDesc("Hide completed tasks older than this many days. Set to 0 to disable.").addText(
            (text) => text.setValue(String(this.plugin.settings.autoArchiveDays || 0)).onChange(async (value) => {
              const parsed = Number.parseInt(value, 10);
              this.plugin.settings.autoArchiveDays = Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          const themeSection = section(containerEl, "Appearance", "Customize colors, fonts, and visual theme.");
          new Setting2(themeSection).setName("Theme preset").setDesc("Choose a color scheme as a starting point. You can override individual colors below.").addDropdown((dropdown) => {
            for (const [key, preset] of Object.entries(THEME_PRESETS2)) {
              dropdown.addOption(key, preset.name);
            }
            dropdown.setValue(this.plugin.settings.theme && this.plugin.settings.theme.preset || "default");
            dropdown.onChange(async (value) => {
              this.plugin.settings.theme.preset = value;
              this.plugin.settings.theme.overrides = {};
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
              this.display();
            });
          });
          new Setting2(themeSection).setName("Font family").setDesc("Custom font stack for the board. Leave empty for default.").addText(
            (text) => text.setPlaceholder("e.g. Inter, sans-serif").setValue(this.plugin.settings.theme && this.plugin.settings.theme.overrides && this.plugin.settings.theme.overrides.fontFamily || "").onChange(async (value) => {
              if (!this.plugin.settings.theme.overrides) this.plugin.settings.theme.overrides = {};
              this.plugin.settings.theme.overrides.fontFamily = value.trim();
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          const themeColorGroups = [
            {
              label: "Card Colors",
              fields: [
                { key: "cardBg", label: "Background" },
                { key: "cardText", label: "Text" },
                { key: "cardBorder", label: "Border" }
              ]
            },
            {
              label: "Lane Colors",
              fields: [
                { key: "laneBg", label: "Background" },
                { key: "laneHeaderBg", label: "Header background" },
                { key: "laneHeaderText", label: "Header text" },
                { key: "laneBorder", label: "Border" }
              ]
            },
            {
              label: "Priority",
              fields: [
                { key: "priorityUrgent", label: "Urgent" },
                { key: "priorityHigh", label: "High" },
                { key: "priorityMedium", label: "Medium" },
                { key: "priorityLow", label: "Low" }
              ]
            },
            {
              label: "Tags & Accent",
              fields: [
                { key: "tagBg", label: "Tag background" },
                { key: "tagText", label: "Tag text" },
                { key: "tagBorder", label: "Tag border" },
                { key: "accentColor", label: "Accent" }
              ]
            },
            {
              label: "Due Dates",
              fields: [
                { key: "dueBadgeOverdue", label: "Overdue" },
                { key: "dueBadgeSoon", label: "Due soon" }
              ]
            },
            {
              label: "Board",
              fields: [
                { key: "boardBg", label: "Board background" }
              ]
            }
          ];
          const resolved = this.plugin.getResolvedTheme();
          const overrides = this.plugin.settings.theme && this.plugin.settings.theme.overrides || {};
          for (const group of themeColorGroups) {
            themeSection.createEl("h4", { text: group.label, cls: "sk-settings-color-group-title" });
            for (const field of group.fields) {
              const currentValue = resolved[field.key] || "#000000";
              const isOverridden = !!overrides[field.key];
              const setting = new Setting2(themeSection).setName(field.label);
              setting.addColorPicker((picker) => {
                picker.setValue(currentValue);
                picker.onChange(async (value) => {
                  if (!this.plugin.settings.theme.overrides) this.plugin.settings.theme.overrides = {};
                  this.plugin.settings.theme.overrides[field.key] = value;
                  await this.plugin.saveSettings();
                  this.plugin.refreshViews();
                });
              });
              if (isOverridden) {
                setting.addButton((btn) => {
                  btn.setButtonText("Reset").onClick(async () => {
                    delete this.plugin.settings.theme.overrides[field.key];
                    await this.plugin.saveSettings();
                    this.plugin.refreshViews();
                    this.display();
                  });
                });
              }
            }
          }
          themeSection.createEl("h4", { text: "Per-Lane Header Colors", cls: "sk-settings-color-group-title" });
          const statuses = this.plugin.getStatusOrder();
          for (const status of statuses) {
            const laneColor = this.plugin.getResolvedLaneColor(status);
            const userLane = this.plugin.settings.theme && this.plugin.settings.theme.laneColors && this.plugin.settings.theme.laneColors[status];
            const setting = new Setting2(themeSection).setName(status);
            setting.addColorPicker((picker) => {
              picker.setValue(laneColor.bg || "#868e96");
              picker.onChange(async (value) => {
                if (!this.plugin.settings.theme.laneColors) this.plugin.settings.theme.laneColors = {};
                if (!this.plugin.settings.theme.laneColors[status]) this.plugin.settings.theme.laneColors[status] = {};
                this.plugin.settings.theme.laneColors[status].bg = value;
                await this.plugin.saveSettings();
                this.plugin.refreshViews();
              });
            });
            setting.addColorPicker((picker) => {
              picker.setValue(laneColor.text || "#ffffff");
              picker.onChange(async (value) => {
                if (!this.plugin.settings.theme.laneColors) this.plugin.settings.theme.laneColors = {};
                if (!this.plugin.settings.theme.laneColors[status]) this.plugin.settings.theme.laneColors[status] = {};
                this.plugin.settings.theme.laneColors[status].text = value;
                await this.plugin.saveSettings();
                this.plugin.refreshViews();
              });
            });
            if (userLane && (userLane.bg || userLane.text)) {
              setting.addButton((btn) => {
                btn.setButtonText("Reset").onClick(async () => {
                  delete this.plugin.settings.theme.laneColors[status];
                  await this.plugin.saveSettings();
                  this.plugin.refreshViews();
                  this.display();
                });
              });
            }
          }
          const advSection = section(containerEl, "Advanced", "Performance and behavior tuning.");
          new Setting2(advSection).setName("Refresh debounce").setDesc("Milliseconds to wait after a file change before refreshing the board.").addText(
            (text) => text.setValue(String(this.plugin.settings.refreshDebounceMs)).onChange(async (value) => {
              const parsed = Number.parseInt(value, 10);
              this.plugin.settings.refreshDebounceMs = Number.isFinite(parsed) && parsed >= 0 ? parsed : 250;
              await this.plugin.saveSettings();
            })
          );
        }
      }
      return { SmartKanbanSettingTab: SmartKanbanSettingTab2 };
    };
  }
});

// src/main.js
var { Plugin, ItemView, Modal, TFile, TFolder, Notice, PluginSettingTab, Setting, setIcon } = require("obsidian");
var { VIEW_TYPE_SMART_KANBAN, THEME_PRESETS, DEFAULT_SETTINGS } = require_constants();
var {
  normalizeDateInput,
  getDueInfo,
  parseTaskLine,
  updateTaskLineFields,
  parseWipLimits,
  sortCards,
  uniqueStrings,
  splitCsv
} = require_core_fallback();
var {
  extractNotePreview,
  isKanbanBoardFile,
  normalizeFmValue,
  collectTags,
  sanitizeFileName,
  buildFrontmatterBlock,
  buildTaskChecklistLine,
  parseInlineFieldMap,
  ensureFolderPath,
  createEnsureFile,
  init: initUtils
} = require_utils();
initUtils({ uniqueStrings });
var ensureFile = createEnsureFile(TFile);
var {
  BoardManagerModal,
  DragReorderListModal,
  SimpleFormModal,
  SimpleConfirmModal
} = require_modals()({ Modal, Notice });
var { SmartKanbanView } = require_view()({
  ItemView,
  TFile,
  Notice,
  setIcon,
  VIEW_TYPE_SMART_KANBAN,
  normalizeDateInput,
  splitCsv
});
var { SmartKanbanSettingTab } = require_settings_tab()({
  PluginSettingTab,
  Setting,
  Notice,
  DEFAULT_SETTINGS,
  THEME_PRESETS
});
module.exports = class SmartKanbanPlugin extends Plugin {
  async onload() {
    await this.loadSettings();
    this.registerView(VIEW_TYPE_SMART_KANBAN, (leaf) => new SmartKanbanView(leaf, this));
    this.addRibbonIcon("kanban-square", "Open Smart Kanban", async () => {
      await this.activateView();
    });
    this.addCommand({
      id: "open-smart-kanban",
      name: "Open Smart Kanban",
      callback: async () => {
        await this.activateView();
      }
    });
    this.addCommand({
      id: "refresh-smart-kanban",
      name: "Refresh Smart Kanban",
      callback: async () => {
        this.refreshViews();
      }
    });
    this.addCommand({
      id: "smart-kanban-self-check",
      name: "Smart Kanban: Self-check",
      callback: async () => {
        const cards = await this.collectCards();
        new Notice(`Smart Kanban self-check OK. Cards loaded: ${cards.length}`);
      }
    });
    this.addCommand({
      id: "open-specific-board",
      name: "Open Specific Board",
      callback: async () => {
        const boards = this.settings.boards || [];
        if (boards.length === 0) {
          new Notice("No custom boards. Use default board.");
          await this.activateView();
          return;
        }
        const values = await this.openFormModal({
          title: "Select Board",
          submitText: "Open",
          fields: [
            {
              key: "board",
              label: "Board",
              value: "",
              type: "select",
              options: ["", ...boards.map((b) => b.id)],
              optionLabels: { "": "Default Board", ...Object.fromEntries(boards.map((b) => [b.id, b.name])) }
            }
          ]
        });
        if (!values) return;
        const boardId = values.board || "";
        this.settings.activeBoardId = boardId;
        await this.saveSettings();
        await this.activateView();
      }
    });
    this.addSettingTab(new SmartKanbanSettingTab(this.app, this));
    const onChange = () => this.scheduleRefresh();
    this.registerEvent(this.app.vault.on("modify", onChange));
    this.registerEvent(this.app.vault.on("create", onChange));
    this.registerEvent(this.app.vault.on("delete", onChange));
    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file) => {
        if (file instanceof TFolder) {
          menu.addItem((item) => {
            item.setTitle("Open as Kanban Board").setIcon("kanban-square").onClick(async () => {
              this.settings.sourceFolder = file.path;
              await this.saveSettings();
              await this.activateView();
              new Notice(`Kanban: source folder \u2192 ${file.path}`);
            });
          });
        }
        if (file instanceof TFile && file.extension === "md") {
          menu.addItem((item) => {
            item.setTitle("Show in Kanban").setIcon("kanban-square").onClick(async () => {
              const folder = file.parent ? file.parent.path : "";
              if (folder && folder !== this.settings.sourceFolder) {
                this.settings.sourceFolder = folder;
                await this.saveSettings();
              }
              await this.activateView();
            });
          });
        }
      })
    );
  }
  onunload() {
    if (this.refreshTimer) {
      window.clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
    this.app.workspace.getLeavesOfType(VIEW_TYPE_SMART_KANBAN).forEach((leaf) => leaf.detach());
  }
  createEmptyFilters() {
    return { categories: [], priorities: [], tags: [], text: "" };
  }
  cloneFilters(input) {
    const source = input || this.createEmptyFilters();
    return {
      categories: Array.isArray(source.categories) ? source.categories.map((x) => String(x).trim()).filter(Boolean) : [],
      priorities: Array.isArray(source.priorities) ? source.priorities.map((x) => String(x).trim()).filter(Boolean) : [],
      tags: Array.isArray(source.tags) ? source.tags.map((x) => String(x).trim()).filter(Boolean) : [],
      text: String(source.text || "").toLowerCase()
    };
  }
  getFilterPreset(name) {
    const preset = (this.settings.filterPresets || {})[name];
    return preset ? this.cloneFilters(preset) : null;
  }
  async saveFilterPreset(name, filters) {
    if (!this.settings.filterPresets) this.settings.filterPresets = {};
    this.settings.filterPresets[name] = this.cloneFilters(filters);
    await this.saveSettings();
  }
  async deleteFilterPreset(name) {
    if (!this.settings.filterPresets) return;
    delete this.settings.filterPresets[name];
    await this.saveSettings();
  }
  getStatusOrder() {
    const list = String(this.settings.statusOrder || "").split(",").map((x) => x.trim()).filter(Boolean);
    return list.length ? list : ["Todo"];
  }
  getCustomFieldKeys() {
    return String(this.settings.customFields || "").split(",").map((x) => x.trim()).filter(Boolean);
  }
  getCardMetaEntries(card) {
    const entries = [
      ["Category", card.category || ""],
      ["Priority", card.priority || ""]
    ];
    if (card.dueDate) {
      entries.push(["Due", card.dueDate]);
    }
    const custom = card.customFields || {};
    const reserved = /* @__PURE__ */ new Set([
      this.settings.statusField.toLowerCase(),
      this.settings.categoryField.toLowerCase(),
      this.settings.priorityField.toLowerCase(),
      this.settings.tagsField.toLowerCase(),
      this.settings.dueDateField.toLowerCase()
    ]);
    for (const key of this.getCustomFieldKeys()) {
      if (reserved.has(key.toLowerCase())) continue;
      entries.push([key, normalizeFmValue(custom[key])]);
    }
    return entries;
  }
  collectStatusesFromCards(cards) {
    const out = [...this.getStatusOrder()];
    for (const status of new Set((cards || []).map((c) => c.status || "Todo"))) {
      if (!out.includes(status)) out.push(status);
    }
    return out;
  }
  getPriorityOrderMap() {
    const map = /* @__PURE__ */ new Map();
    String(this.settings.priorityOrder || "").split(",").map((x) => x.trim()).filter(Boolean).forEach((value, index) => map.set(value.toLowerCase(), index));
    return map;
  }
  sortCards(cards) {
    return sortCards(cards, this.settings.sortBy || "none", this.settings.sortDirection || "asc", this.getPriorityOrderMap(), this.settings.cardOrder);
  }
  getWipLimit(status) {
    const limits = parseWipLimits(this.settings.wipLimits);
    return limits.get(String(status || "").toLowerCase()) || 0;
  }
  getResolvedTheme() {
    const presetName = this.settings.theme && this.settings.theme.preset || "default";
    const preset = THEME_PRESETS[presetName] || THEME_PRESETS.default;
    const overrides = this.settings.theme && this.settings.theme.overrides || {};
    const resolved = { ...preset };
    for (const [key, value] of Object.entries(overrides)) {
      if (value && typeof value === "string") resolved[key] = value;
    }
    return resolved;
  }
  getBoard(boardId) {
    if (!boardId) return null;
    return (this.settings.boards || []).find((b) => b.id === boardId) || null;
  }
  getEffectiveSettings(boardId) {
    const board = this.getBoard(boardId);
    if (!board) return { ...this.settings };
    if (board.type === "filtered-view" && board.parentBoardId) {
      const parentEff = this.getEffectiveSettings(board.parentBoardId);
      const merged = { ...parentEff };
      for (const key of Object.keys(board)) {
        if (key === "id" || key === "name" || key === "type" || key === "parentBoardId") continue;
        if (board[key] != null && board[key] !== "") merged[key] = board[key];
      }
      return merged;
    }
    const eff = { ...this.settings };
    for (const key of Object.keys(board)) {
      if (key === "id" || key === "name" || key === "type") continue;
      if (board[key] != null && board[key] !== "") eff[key] = board[key];
    }
    return eff;
  }
  getResolvedLaneColor(status) {
    const userLane = this.settings.theme && this.settings.theme.laneColors && this.settings.theme.laneColors[status];
    if (userLane && (userLane.bg || userLane.text)) return userLane;
    const presetName = this.settings.theme && this.settings.theme.preset || "default";
    const preset = THEME_PRESETS[presetName] || THEME_PRESETS.default;
    if (preset.defaultLaneColors && preset.defaultLaneColors[status]) return preset.defaultLaneColors[status];
    const resolved = this.getResolvedTheme();
    return { bg: resolved.laneHeaderBg || "", text: resolved.laneHeaderText || "" };
  }
  scheduleRefresh() {
    if (this.refreshTimer) window.clearTimeout(this.refreshTimer);
    const delay = Number.isFinite(this.settings.refreshDebounceMs) ? this.settings.refreshDebounceMs : 250;
    this.refreshTimer = window.setTimeout(() => {
      this.refreshTimer = null;
      this.refreshViews();
    }, Math.max(0, delay));
  }
  async activateView() {
    const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE_SMART_KANBAN);
    for (const leaf2 of leaves) leaf2.detach();
    const leaf = this.app.workspace.getLeaf(true);
    await leaf.setViewState({ type: VIEW_TYPE_SMART_KANBAN, active: true });
    this.app.workspace.revealLeaf(leaf);
  }
  async loadSettings() {
    const loaded = await this.loadData();
    this.settings = Object.assign({}, DEFAULT_SETTINGS, loaded || {});
    this.settings.filterPresets = this.settings.filterPresets || {};
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  async openFormModal(options) {
    return await new Promise((resolve) => {
      const modal = new SimpleFormModal(this.app, {
        ...options,
        onSubmit: (values) => resolve(values),
        onCancel: () => resolve(null)
      });
      modal.open();
    });
  }
  async openBoardManager() {
    return await new Promise((resolve) => {
      const modal = new BoardManagerModal(this.app, this, {
        onClose: () => resolve()
      });
      modal.open();
    });
  }
  async openDragReorderModal(options) {
    return await new Promise((resolve) => {
      const modal = new DragReorderListModal(this.app, {
        ...options,
        onSubmit: (result) => resolve(result),
        onCancel: () => resolve(null)
      });
      modal.open();
    });
  }
  async openConfirmModal(options) {
    return await new Promise((resolve) => {
      const modal = new SimpleConfirmModal(this.app, {
        ...options,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false)
      });
      modal.open();
    });
  }
  refreshViews() {
    for (const leaf of this.app.workspace.getLeavesOfType(VIEW_TYPE_SMART_KANBAN)) {
      if (leaf.view && typeof leaf.view.reload === "function") leaf.view.reload();
    }
  }
  async createTaskEntry(title, fields) {
    if (this.settings.sourceMode === "tasks") {
      await this.createTaskLine(title, fields);
      return;
    }
    const file = await this.createTaskNote(title, fields);
    if (file) {
      await this.app.workspace.getLeaf(true).openFile(file);
      new Notice(`Created task note: ${file.basename}`);
    }
  }
  async createTaskNote(title, fields) {
    const folderPath = String(this.settings.sourceFolder || "").trim();
    if (!folderPath) {
      new Notice("Source folder is empty.");
      return null;
    }
    await ensureFolderPath(this.app, folderPath);
    const safeBase = sanitizeFileName(title) || "task";
    const filePath = await this.buildUniqueTaskPath(folderPath, safeBase);
    const frontmatter = buildFrontmatterBlock(fields);
    return await this.app.vault.create(filePath, `${frontmatter}
# ${title}
`);
  }
  async createTaskLine(title, fields) {
    const inboxFile = String(this.settings.taskInboxFile || "").trim();
    if (!inboxFile) {
      new Notice("Task inbox file is empty.");
      return;
    }
    const file = await ensureFile(this.app, inboxFile, "# Todo Tasks\n\n");
    const line = buildTaskChecklistLine(title, {
      statusField: this.settings.statusField,
      categoryField: this.settings.categoryField,
      priorityField: this.settings.priorityField,
      tagsField: this.settings.tagsField,
      dueDateField: this.settings.dueDateField,
      fields
    });
    const current = await this.app.vault.read(file);
    const prefix = current.endsWith("\n") ? "" : "\n";
    await this.app.vault.modify(file, `${current}${prefix}${line}
`);
    await this.app.workspace.getLeaf(true).openFile(file);
    new Notice("Created task line.");
  }
  async buildUniqueTaskPath(folderPath, baseName) {
    const normalized = folderPath.replace(/\/$/, "");
    for (let i = 0; i < 9999; i += 1) {
      const suffix = i === 0 ? "" : ` ${i + 1}`;
      const candidate = `${normalized}/${baseName}${suffix}.md`;
      if (!this.app.vault.getAbstractFileByPath(candidate)) return candidate;
    }
    throw new Error("Could not allocate unique file name.");
  }
  async collectCards(boardId) {
    const eff = this.getEffectiveSettings(boardId || "");
    return eff.sourceMode === "tasks" ? await this.collectTaskCardsWithSettings(eff) : await this.collectNoteCardsWithSettings(eff);
  }
  filterFilesByFolder(allFiles) {
    return this.filterFilesByFolderWithSettings(allFiles, this.settings);
  }
  filterFilesByFolderWithSettings(allFiles, eff) {
    const folderPath = eff.sourceFolder;
    const includeSubfolders = eff.includeSubfolders;
    const folderPrefix = folderPath.replace(/\/$/, "") + "/";
    return allFiles.filter((file) => {
      if (!folderPath) return true;
      if (file.path === folderPath) return true;
      if (includeSubfolders) return file.path.startsWith(folderPrefix);
      return file.parent && file.parent.path === folderPath;
    });
  }
  async collectNoteCards() {
    return this.collectNoteCardsWithSettings(this.settings);
  }
  async collectNoteCardsWithSettings(eff) {
    const cards = [];
    const customFieldKeys = String(eff.customFields || "").split(",").map((x) => x.trim()).filter(Boolean);
    for (const file of this.filterFilesByFolderWithSettings(this.app.vault.getMarkdownFiles(), eff)) {
      const cache = this.app.metadataCache.getFileCache(file);
      const fm = cache && cache.frontmatter || {};
      if (isKanbanBoardFile(fm)) continue;
      const dueDate = normalizeDateInput(fm[eff.dueDateField]);
      const dueInfo = getDueInfo(dueDate, eff.dueSoonDays);
      const customFields = {};
      for (const key of customFieldKeys) {
        customFields[key] = normalizeFmValue(fm[key]);
      }
      let preview = "";
      try {
        const content = await this.app.vault.cachedRead(file);
        preview = extractNotePreview(content);
      } catch (_) {
      }
      cards.push({
        id: file.path,
        kind: "note",
        path: file.path,
        title: file.basename,
        status: normalizeFmValue(fm[eff.statusField]) || "Todo",
        category: normalizeFmValue(fm[eff.categoryField]),
        priority: normalizeFmValue(fm[eff.priorityField]),
        tags: collectTags(fm, cache, eff.tagsField),
        customFields,
        dueDate,
        dueTs: dueInfo ? dueInfo.sortValue : null,
        dueInfo,
        preview
      });
    }
    return cards;
  }
  async collectTaskCards() {
    return this.collectTaskCardsWithSettings(this.settings);
  }
  async collectTaskCardsWithSettings(eff) {
    const cards = [];
    const statuses = String(eff.statusOrder || "").split(",").map((x) => x.trim()).filter(Boolean);
    if (!statuses.length) statuses.push("Todo");
    const customFieldKeys = String(eff.customFields || "").split(",").map((x) => x.trim()).filter(Boolean);
    for (const file of this.filterFilesByFolderWithSettings(this.app.vault.getMarkdownFiles(), eff)) {
      const cache = this.app.metadataCache.getFileCache(file);
      const fm = cache && cache.frontmatter || {};
      if (isKanbanBoardFile(fm)) continue;
      const content = await this.app.vault.cachedRead(file);
      const lines = content.split(/\r?\n/);
      for (let idx = 0; idx < lines.length; idx += 1) {
        const inlineMap = parseInlineFieldMap(lines[idx]);
        const parsed = parseTaskLine(lines[idx], {
          statusField: eff.statusField,
          categoryField: eff.categoryField,
          priorityField: eff.priorityField,
          tagsField: eff.tagsField,
          dueDateField: eff.dueDateField,
          statusOrder: statuses
        });
        if (!parsed) continue;
        const dueInfo = getDueInfo(parsed.dueDate, eff.dueSoonDays);
        const customFields = {};
        for (const key of customFieldKeys) {
          customFields[key] = normalizeFmValue(inlineMap.get(key.toLowerCase()) || "");
        }
        cards.push({
          id: `${file.path}::${idx + 1}`,
          kind: "task",
          path: file.path,
          lineNumber: idx + 1,
          title: parsed.title,
          status: parsed.status || "Todo",
          category: parsed.category || "",
          priority: parsed.priority || "",
          tags: parsed.tags || [],
          customFields,
          dueDate: parsed.dueDate || "",
          dueTs: dueInfo ? dueInfo.sortValue : null,
          dueInfo
        });
      }
    }
    return cards;
  }
  async updateCardStatus(card, nextStatus) {
    await this.updateCardFields(card, {
      [this.settings.statusField]: String(nextStatus || "").trim() || "Todo"
    });
  }
  async saveCardOrder(cardId, sortValue) {
    if (!this.settings.cardOrder) this.settings.cardOrder = {};
    this.settings.cardOrder[cardId] = sortValue;
    await this.saveSettings();
  }
  async deleteTaskLine(card) {
    const file = this.app.vault.getAbstractFileByPath(card.path);
    if (!(file instanceof TFile)) {
      new Notice(`File not found: ${card.path}`);
      return;
    }
    const content = await this.app.vault.read(file);
    const lines = content.split(/\r?\n/);
    const index = Number(card.lineNumber) - 1;
    if (index < 0 || index >= lines.length) {
      new Notice(`Task line not found: ${card.path}:${card.lineNumber}`);
      return;
    }
    lines.splice(index, 1);
    await this.app.vault.modify(file, lines.join("\n"));
  }
  async deleteNoteCard(card) {
    const file = this.app.vault.getAbstractFileByPath(card.path);
    if (!(file instanceof TFile)) {
      new Notice(`File not found: ${card.path}`);
      return;
    }
    await this.app.vault.trash(file, true);
  }
  async updateCardTitle(card, newTitle) {
    if (!card || !newTitle) return;
    if (card.kind === "task") {
      await this.updateTaskCardTitle(card, newTitle);
    } else {
      await this.renameNoteCard(card, newTitle);
    }
  }
  async renameNoteCard(card, newTitle) {
    const file = this.app.vault.getAbstractFileByPath(card.path);
    if (!(file instanceof TFile)) {
      new Notice(`File not found: ${card.path}`);
      return;
    }
    const folder = file.parent ? file.parent.path : "";
    const safeName = sanitizeFileName(newTitle) || "task";
    const newPath = folder ? `${folder}/${safeName}.md` : `${safeName}.md`;
    try {
      await this.app.fileManager.renameFile(file, newPath);
    } catch (err) {
      new Notice(`Rename failed: ${err.message || err}`);
    }
  }
  async updateTaskCardTitle(card, newTitle) {
    const file = this.app.vault.getAbstractFileByPath(card.path);
    if (!(file instanceof TFile)) {
      new Notice(`File not found: ${card.path}`);
      return;
    }
    const content = await this.app.vault.read(file);
    const lines = content.split(/\r?\n/);
    const index = Number(card.lineNumber) - 1;
    if (index < 0 || index >= lines.length) {
      new Notice(`Task line not found: ${card.path}:${card.lineNumber}`);
      return;
    }
    const line = lines[index];
    const match = line.match(/^(\s*-\s*\[[ xX]\]\s+)/);
    if (!match) return;
    const prefix = match[1];
    const rest = line.slice(prefix.length);
    const fields = rest.match(/(\s*\[[^\]]+\])/g) || [];
    lines[index] = `${prefix}${newTitle}${fields.join("")}`;
    await this.app.vault.modify(file, lines.join("\n"));
  }
  async updateCardFields(card, updates) {
    if (!card) return;
    if (card.kind === "task") {
      await this.updateTaskCardFields(card, updates);
      return;
    }
    await this.updateNoteCardFields(card, updates);
  }
  async updateNoteCardFields(card, updates) {
    const file = this.app.vault.getAbstractFileByPath(card.path);
    if (!(file instanceof TFile)) {
      new Notice(`File not found: ${card.path}`);
      return;
    }
    await this.app.fileManager.processFrontMatter(file, (fm) => {
      for (const [key, value] of Object.entries(updates || {})) {
        if (Array.isArray(value)) {
          if (value.length) fm[key] = value;
          else delete fm[key];
          continue;
        }
        const text = normalizeFmValue(value);
        if (!text) delete fm[key];
        else fm[key] = text;
      }
    });
  }
  async updateTaskCardFields(card, updates) {
    const file = this.app.vault.getAbstractFileByPath(card.path);
    if (!(file instanceof TFile)) {
      new Notice(`File not found: ${card.path}`);
      return;
    }
    const content = await this.app.vault.read(file);
    const lines = content.split(/\r?\n/);
    const index = Number(card.lineNumber) - 1;
    if (index < 0 || index >= lines.length) {
      new Notice(`Task line not found: ${card.path}:${card.lineNumber}`);
      return;
    }
    const normalizedUpdates = {};
    for (const [key, value] of Object.entries(updates || {})) {
      if (Array.isArray(value)) normalizedUpdates[key] = value.join(", ");
      else normalizedUpdates[key] = normalizeFmValue(value);
    }
    lines[index] = updateTaskLineFields(lines[index], normalizedUpdates);
    await this.app.vault.modify(file, lines.join("\n"));
  }
};

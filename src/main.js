const { Plugin, ItemView, Modal, TFile, TFolder, Notice, PluginSettingTab, Setting, setIcon, parseYaml } = require("obsidian");
const {
  VIEW_TYPE_SMART_KANBAN,
  SETTINGS_SCHEMA_VERSION,
  THEME_PRESETS,
  DEFAULT_BOARD_CONFIG,
  BOARD_CONFIG_KEYS,
  DEFAULT_SETTINGS,
} = require("./constants");
const { t, setLocale, LOCALES } = require("./i18n");
const {
  normalizeDateInput, getDueInfo, parseTaskLine, updateTaskLineFields,
  parseWipLimits, sortCards, uniqueStrings, splitCsv,
} = require("./core-fallback");
const {
  extractNotePreview, isKanbanBoardFile, normalizeFmValue, collectTags,
  sanitizeFileName, buildFrontmatterBlock, buildTaskChecklistLine,
  parseInlineFieldMap, ensureFolderPath, createEnsureFile, init: initUtils,
} = require("./utils");
initUtils({ uniqueStrings });
const ensureFile = createEnsureFile(TFile);
const {
  BoardManagerModal, DragReorderListModal, SimpleFormModal, SimpleConfirmModal,
} = require("./modals")({ Modal, Notice, t });
const { SmartKanbanView } = require("./view")({
  ItemView, TFile, Notice, setIcon, VIEW_TYPE_SMART_KANBAN, normalizeDateInput, splitCsv, t,
});
const { SmartKanbanSettingTab } = require("./settings-tab")({
  PluginSettingTab, Setting, Notice, DEFAULT_SETTINGS, BOARD_CONFIG_KEYS, THEME_PRESETS, t, LOCALES, setLocale,
});

module.exports = class SmartKanbanPlugin extends Plugin {
  cloneValue(value) {
    if (Array.isArray(value)) return value.map((item) => this.cloneValue(item));
    if (!value || typeof value !== "object") return value;
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = this.cloneValue(v);
    return out;
  }

  ensureThemeShape(theme) {
    const input = theme && typeof theme === "object" ? theme : {};
    return {
      preset: String(input.preset || "default"),
      overrides: input.overrides && typeof input.overrides === "object" ? this.cloneValue(input.overrides) : {},
      laneColors: input.laneColors && typeof input.laneColors === "object" ? this.cloneValue(input.laneColors) : {},
    };
  }

  createDefaultBoardConfigSnapshot(source) {
    const src = source && typeof source === "object" ? source : {};
    const out = {};
    for (const key of BOARD_CONFIG_KEYS) {
      if (key === "theme") out[key] = this.ensureThemeShape(src[key] || DEFAULT_BOARD_CONFIG.theme);
      else if (Object.prototype.hasOwnProperty.call(src, key)) out[key] = this.cloneValue(src[key]);
      else out[key] = this.cloneValue(DEFAULT_BOARD_CONFIG[key]);
    }
    return out;
  }

  normalizeBoardRecord(board) {
    const src = board && typeof board === "object" ? board : {};
    const out = { ...src };
    out.id = String(src.id || "");
    out.name = String(src.name || "");
    out.type = src.type === "filtered-view" ? "filtered-view" : "independent";
    out.parentBoardId = src.parentBoardId || null;
    if (!Object.prototype.hasOwnProperty.call(out, "visibleStatuses")) out.visibleStatuses = null;
    if (!Object.prototype.hasOwnProperty.call(out, "defaultFilters")) out.defaultFilters = null;
    for (const key of BOARD_CONFIG_KEYS) {
      if (!Object.prototype.hasOwnProperty.call(out, key) || out[key] === undefined) {
        out[key] = null;
      }
    }
    return out;
  }

  migrateSettings(loaded) {
    const src = loaded && typeof loaded === "object" ? loaded : {};
    const migrated = { ...src };
    const hadSchema = Number.isFinite(src.settingsSchemaVersion);
    const hadDefaultBoardConfig = !!(src.defaultBoardConfig && typeof src.defaultBoardConfig === "object");
    const hadBoardsArray = Array.isArray(src.boards);

    if (!Array.isArray(migrated.boards)) migrated.boards = [];
    migrated.boards = migrated.boards
      .map((board) => this.normalizeBoardRecord(board))
      .filter((board) => board.id);

    if (!migrated.defaultBoardConfig || typeof migrated.defaultBoardConfig !== "object") {
      migrated.defaultBoardConfig = this.createDefaultBoardConfigSnapshot(src);
    } else {
      migrated.defaultBoardConfig = this.createDefaultBoardConfigSnapshot(migrated.defaultBoardConfig);
    }

    migrated.settingsSchemaVersion = SETTINGS_SCHEMA_VERSION;
    const didMigrate = !hadSchema
      || Number(src.settingsSchemaVersion) !== SETTINGS_SCHEMA_VERSION
      || !hadDefaultBoardConfig
      || !hadBoardsArray;
    return { migrated, didMigrate };
  }

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
      },
    });

    this.addCommand({
      id: "refresh-smart-kanban",
      name: "Refresh Smart Kanban",
      callback: async () => {
        this.refreshViews();
      },
    });

    this.addCommand({
      id: "smart-kanban-self-check",
      name: "Smart Kanban: Self-check",
      callback: async () => {
        const cards = await this.collectCards();
        new Notice(t("main.self_check_ok", { count: cards.length }));
      },
    });

    this.addCommand({
      id: "open-specific-board",
      name: "Open Specific Board",
      callback: async () => {
        const boards = this.settings.boards || [];
        if (boards.length === 0) {
          new Notice(t("main.no_custom_boards"));
          await this.activateView();
          return;
        }
        const values = await this.openFormModal({
          title: t("main.select_board.title"),
          submitText: t("main.select_board.submit"),
          fields: [
            {
              key: "board",
              label: t("main.select_board.label"),
              value: "",
              type: "select",
              options: ["", ...boards.map((b) => b.id)],
              optionLabels: { "": t("view.board.default"), ...Object.fromEntries(boards.map((b) => [b.id, b.name])) },
            },
          ],
        });
        if (!values) return;
        const boardId = values.board || "";
        this.settings.activeBoardId = boardId;
        await this.saveSettings();
        await this.activateView();
      },
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
            item.setTitle(t("main.file_menu.open_as_board"))
              .setIcon("kanban-square")
              .onClick(async () => {
                this.settings.sourceFolder = file.path;
                await this.saveSettings();
                await this.activateView();
                new Notice(t("main.source_folder_set", { path: file.path }));
              });
          });
        }
        if (file instanceof TFile && file.extension === "md") {
          menu.addItem((item) => {
            item.setTitle(t("main.file_menu.show_in_kanban"))
              .setIcon("kanban-square")
              .onClick(async () => {
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

    this.app.workspace
      .getLeavesOfType(VIEW_TYPE_SMART_KANBAN)
      .forEach((leaf) => leaf.detach());
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
      text: String(source.text || "").toLowerCase(),
    };
  }

  getFilterPresetStore(boardId = "", createIfMissing = false) {
    if (boardId) {
      const board = this.getBoard(boardId);
      if (!board) return this.settings.filterPresets || {};
      if (createIfMissing && (!board.filterPresets || typeof board.filterPresets !== "object")) {
        board.filterPresets = {};
      }
      return board.filterPresets || {};
    }
    if (createIfMissing && (!this.settings.filterPresets || typeof this.settings.filterPresets !== "object")) {
      this.settings.filterPresets = {};
    }
    return this.settings.filterPresets || {};
  }

  getFilterPresetNames(boardId = "") {
    return Object.keys(this.getFilterPresetStore(boardId, false));
  }

  getFilterPreset(name, boardId = "") {
    const preset = this.getFilterPresetStore(boardId, false)[name];
    return preset ? this.cloneFilters(preset) : null;
  }

  async saveFilterPreset(name, filters, boardId = "") {
    const store = this.getFilterPresetStore(boardId, true);
    store[name] = this.cloneFilters(filters);
    await this.saveSettings();
  }

  async deleteFilterPreset(name, boardId = "") {
    const store = this.getFilterPresetStore(boardId, false);
    if (!store || typeof store !== "object") return;
    delete store[name];
    await this.saveSettings();
  }

  getStatusOrder(boardId = "") {
    const eff = this.getEffectiveSettings(boardId || "");
    const list = String(eff.statusOrder || "")
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
    return list.length ? list : [this.getDefaultStatus(eff)];
  }

  getDefaultStatus(boardIdOrEff = "") {
    const eff = typeof boardIdOrEff === "object" && boardIdOrEff !== null
      ? boardIdOrEff
      : this.getEffectiveSettings(boardIdOrEff || "");
    const first = String(eff.statusOrder || "")
      .split(",")
      .map((x) => x.trim())
      .find(Boolean);
    return first || "Todo";
  }

  getCustomFieldKeys(boardId = "") {
    const eff = this.getEffectiveSettings(boardId || "");
    return String(eff.customFields || "")
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
  }

  getCardMetaEntries(card, boardIdOrEff = "") {
    const eff = typeof boardIdOrEff === "object" && boardIdOrEff !== null
      ? boardIdOrEff
      : this.getEffectiveSettings(boardIdOrEff || "");
    const entries = [
      ["Category", card.category || ""],
      ["Priority", card.priority || ""],
    ];

    if (card.dueDate) {
      entries.push(["Due", card.dueDate]);
    }

    const custom = card.customFields || {};
    const reserved = new Set([
      String(eff.statusField || "").toLowerCase(),
      String(eff.categoryField || "").toLowerCase(),
      String(eff.priorityField || "").toLowerCase(),
      String(eff.tagsField || "").toLowerCase(),
      String(eff.dueDateField || "").toLowerCase(),
    ]);

    const customFieldKeys = String(eff.customFields || "").split(",").map((x) => x.trim()).filter(Boolean);
    for (const key of customFieldKeys) {
      if (reserved.has(key.toLowerCase())) continue;
      entries.push([key, normalizeFmValue(custom[key])]);
    }

    return entries;
  }

  collectStatusesFromCards(cards, boardId = "") {
    const out = [...this.getStatusOrder(boardId)];
    const defaultStatus = this.getDefaultStatus(boardId);
    for (const status of new Set((cards || []).map((c) => c.status || defaultStatus))) {
      if (!out.includes(status)) out.push(status);
    }
    return out;
  }

  getPriorityOrderMap(boardId = "") {
    const eff = this.getEffectiveSettings(boardId || "");
    const map = new Map();
    String(eff.priorityOrder || "")
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean)
      .forEach((value, index) => map.set(value.toLowerCase(), index));
    return map;
  }

  sortCards(cards, boardId = "") {
    const eff = this.getEffectiveSettings(boardId || "");
    return sortCards(cards, eff.sortBy || "none", eff.sortDirection || "asc", this.getPriorityOrderMap(boardId), eff.cardOrder);
  }

  getWipLimit(status, boardId = "") {
    const eff = this.getEffectiveSettings(boardId || "");
    const limits = parseWipLimits(eff.wipLimits);
    return limits.get(String(status || "").toLowerCase()) || 0;
  }

  getResolvedTheme(boardId = "") {
    const eff = this.getEffectiveSettings(boardId || "");
    const theme = eff.theme && typeof eff.theme === "object" ? eff.theme : {};
    const presetName = theme.preset || "default";
    const preset = THEME_PRESETS[presetName] || THEME_PRESETS.default;
    const overrides = theme.overrides || {};
    const resolved = { ...preset };
    for (const [key, value] of Object.entries(overrides)) {
      if (value !== undefined && value !== null && value !== "") resolved[key] = value;
    }
    return resolved;
  }

  getBoard(boardId) {
    if (!boardId) return null;
    return (this.settings.boards || []).find((b) => b.id === boardId) || null;
  }

  getEffectiveSettings(boardId, visited = new Set()) {
    const base = {
      ...this.createDefaultBoardConfigSnapshot(this.settings.defaultBoardConfig),
      ...this.settings,
    };
    const board = this.getBoard(boardId);
    if (!board) return base;
    if (board.type === "filtered-view" && board.parentBoardId) {
      if (visited.has(board.id)) {
        new Notice(t("main.board_parent_cycle", { name: board.name || board.id }));
        return base;
      }
      const nextVisited = new Set(visited);
      nextVisited.add(board.id);
      const parentEff = this.getEffectiveSettings(board.parentBoardId, nextVisited);
      const merged = { ...parentEff };
      for (const key of Object.keys(board)) {
        if (key === "id" || key === "name" || key === "type" || key === "parentBoardId") continue;
        if (board[key] != null && board[key] !== "") merged[key] = board[key];
      }
      return merged;
    }
    const eff = { ...base };
    for (const key of Object.keys(board)) {
      if (key === "id" || key === "name" || key === "type") continue;
      if (board[key] != null && board[key] !== "") eff[key] = board[key];
    }
    return eff;
  }

  getResolvedLaneColor(status, boardId = "") {
    const eff = this.getEffectiveSettings(boardId || "");
    const theme = eff.theme && typeof eff.theme === "object" ? eff.theme : {};
    const userLane = theme.laneColors && theme.laneColors[status];
    if (userLane && (userLane.bg || userLane.text)) return userLane;
    const presetName = theme.preset || "default";
    const preset = THEME_PRESETS[presetName] || THEME_PRESETS.default;
    if (preset.defaultLaneColors && preset.defaultLaneColors[status]) return preset.defaultLaneColors[status];
    const resolved = this.getResolvedTheme(boardId);
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
    for (const leaf of leaves) leaf.detach();

    const leaf = this.app.workspace.getLeaf(true);
    await leaf.setViewState({ type: VIEW_TYPE_SMART_KANBAN, active: true });
    this.app.workspace.revealLeaf(leaf);
  }

  async loadSettings() {
    const loaded = await this.loadData();
    const { migrated, didMigrate } = this.migrateSettings(loaded || {});
    this.settings = Object.assign({}, DEFAULT_SETTINGS, migrated || {});
    this.settings.defaultBoardConfig = this.createDefaultBoardConfigSnapshot(this.settings.defaultBoardConfig);
    this.settings.filterPresets = this.settings.filterPresets || {};
    this.settings.theme = this.ensureThemeShape(this.settings.theme);
    setLocale(this.settings.language || "en");
    if (didMigrate) await this.saveData(this.settings);
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async openFormModal(options) {
    return await new Promise((resolve) => {
      const modal = new SimpleFormModal(this.app, {
        ...options,
        onSubmit: (values) => resolve(values),
        onCancel: () => resolve(null),
      });
      modal.open();
    });
  }

  async openBoardManager() {
    return await new Promise((resolve) => {
      const modal = new BoardManagerModal(this.app, this, {
        onClose: () => resolve(),
      });
      modal.open();
    });
  }

  async openDragReorderModal(options) {
    return await new Promise((resolve) => {
      const modal = new DragReorderListModal(this.app, {
        ...options,
        onSubmit: (result) => resolve(result),
        onCancel: () => resolve(null),
      });
      modal.open();
    });
  }

  async openConfirmModal(options) {
    return await new Promise((resolve) => {
      const modal = new SimpleConfirmModal(this.app, {
        ...options,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false),
      });
      modal.open();
    });
  }

  refreshViews() {
    for (const leaf of this.app.workspace.getLeavesOfType(VIEW_TYPE_SMART_KANBAN)) {
      if (leaf.view && typeof leaf.view.reload === "function") leaf.view.reload();
    }
  }

  async createTaskEntry(title, fields, boardId = "") {
    const eff = this.getEffectiveSettings(boardId || "");
    if (eff.sourceMode === "tasks") {
      await this.createTaskLine(title, fields, eff);
      return;
    }

    const file = await this.createTaskNote(title, fields, eff);
    if (file) {
      await this.app.workspace.getLeaf(true).openFile(file);
      new Notice(t("main.task_note_created", { name: file.basename }));
    }
  }

  async createTaskNote(title, fields, eff = this.settings) {
    const folderPath = String(eff.sourceFolder || "").trim();
    if (!folderPath) {
      new Notice(t("main.source_folder_empty"));
      return null;
    }

    await ensureFolderPath(this.app, folderPath);

    const safeBase = sanitizeFileName(title) || "task";
    const filePath = await this.buildUniqueTaskPath(folderPath, safeBase);
    const preparedFields = this.prepareFieldsForWrite(fields, eff);
    const templatePath = String(eff.noteTemplate || "").trim();
    if (!templatePath) {
      const frontmatter = buildFrontmatterBlock(preparedFields);
      return await this.app.vault.create(filePath, `${frontmatter}\n# ${title}\n`);
    }

    const templateFile = this.app.vault.getAbstractFileByPath(templatePath);
    if (!(templateFile instanceof TFile)) {
      new Notice(t("main.template_missing", { path: templatePath }));
      const frontmatter = buildFrontmatterBlock(preparedFields);
      return await this.app.vault.create(filePath, `${frontmatter}\n# ${title}\n`);
    }

    const templateContent = await this.app.vault.cachedRead(templateFile);
    const rendered = this.renderTaskNoteFromTemplate(templateContent, title, preparedFields, eff);
    return await this.app.vault.create(filePath, rendered);
  }

  async createTaskLine(title, fields, eff = this.settings) {
    const inboxFile = String(eff.taskInboxFile || "").trim();
    if (!inboxFile) {
      new Notice(t("main.task_inbox_empty"));
      return;
    }

    const file = await ensureFile(this.app, inboxFile, "# Todo Tasks\n\n");

    const preparedFields = this.prepareFieldsForWrite(fields, eff);
    const line = buildTaskChecklistLine(title, {
      statusField: eff.statusField,
      categoryField: eff.categoryField,
      priorityField: eff.priorityField,
      tagsField: eff.tagsField,
      dueDateField: eff.dueDateField,
      fields: preparedFields,
    });

    const current = await this.app.vault.read(file);
    const prefix = current.endsWith("\n") ? "" : "\n";
    await this.app.vault.modify(file, `${current}${prefix}${line}\n`);

    await this.app.workspace.getLeaf(true).openFile(file);
    new Notice(t("main.task_line_created"));
  }

  prepareFieldsForWrite(fields, eff = this.settings) {
    const out = { ...(fields || {}) };
    const dueField = String(eff.dueDateField || "Due Date");
    const dueValue = normalizeDateInput(out[dueField]);
    if (dueValue) {
      out[dueField] = this.formatDateForStorage(dueValue, eff);
    }
    return out;
  }

  formatDateForStorage(isoDate, eff = this.settings) {
    const normalized = normalizeDateInput(isoDate);
    if (!normalized) return "";
    const format = String(eff.dateFormat || "YYYY-MM-DD").trim();
    if (!format || format === "YYYY-MM-DD") return normalized;
    const momentRef =
      (typeof window !== "undefined" && window.moment) ||
      (typeof globalThis !== "undefined" && globalThis.moment);
    if (typeof momentRef === "function") {
      const m = momentRef(normalized, "YYYY-MM-DD", true);
      if (m && typeof m.isValid === "function" && m.isValid()) return m.format(format);
    }
    return normalized;
  }

  parseDateByFormat(rawDate, eff = this.settings) {
    const raw = String(rawDate || "").trim();
    if (!raw) return "";
    const normalized = normalizeDateInput(raw);
    if (normalized) return normalized;

    const format = String(eff.dateFormat || "YYYY-MM-DD").trim();
    const momentRef =
      (typeof window !== "undefined" && window.moment) ||
      (typeof globalThis !== "undefined" && globalThis.moment);
    if (typeof momentRef === "function" && format) {
      const m = momentRef(raw, format, true);
      if (m && typeof m.isValid === "function" && m.isValid()) return m.format("YYYY-MM-DD");
    }
    return "";
  }

  renderTaskNoteFromTemplate(templateContent, title, fields, eff = this.settings) {
    const todayIso = normalizeDateInput(new Date().toISOString().slice(0, 10));
    const dateToken = this.formatDateForStorage(todayIso, eff) || todayIso;
    const withTokens = String(templateContent || "")
      .replace(/\r\n/g, "\n")
      .replaceAll("{{title}}", title)
      .replaceAll("{{date}}", dateToken);

    const { frontmatter, body } = this.extractFrontmatterAndBody(withTokens);
    const merged = { ...frontmatter, ...(fields || {}) };
    const mergedFrontmatter = buildFrontmatterBlock(merged);
    const cleanedBody = String(body || "").replace(/^\n+/, "");
    return `${mergedFrontmatter}\n${cleanedBody || `# ${title}\n`}`;
  }

  extractFrontmatterAndBody(content) {
    const text = String(content || "").replace(/\r\n/g, "\n");
    if (!text.startsWith("---\n")) {
      return { frontmatter: {}, body: text };
    }

    const match = text.match(/^---\n([\s\S]*?)\n---\n?/);
    if (!match) return { frontmatter: {}, body: text };
    const frontmatterText = match[1];
    const body = text.slice(match[0].length);

    let frontmatter = {};
    if (typeof parseYaml === "function") {
      try {
        const parsed = parseYaml(frontmatterText);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          frontmatter = parsed;
        }
      } catch (_e) {
        frontmatter = {};
      }
    }

    return { frontmatter, body };
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
    return eff.sourceMode === "tasks"
      ? await this.collectTaskCardsWithSettings(eff)
      : await this.collectNoteCardsWithSettings(eff);
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

  async collectNoteCardsWithSettings(eff) {
    const cards = [];
    const defaultStatus = this.getDefaultStatus(eff);
    const customFieldKeys = String(eff.customFields || "").split(",").map((x) => x.trim()).filter(Boolean);
    for (const file of this.filterFilesByFolderWithSettings(this.app.vault.getMarkdownFiles(), eff)) {
      const cache = this.app.metadataCache.getFileCache(file);
      const fm = (cache && cache.frontmatter) || {};
      if (isKanbanBoardFile(fm)) continue;

      const dueDate = this.parseDateByFormat(fm[eff.dueDateField], eff);
      const dueInfo = getDueInfo(dueDate, eff.dueSoonDays, undefined, {
        showRelativeDate: eff.showRelativeDate,
        dateDisplayFormat: eff.dateDisplayFormat,
        dateFormat: eff.dateFormat,
        t,
      });
      const customFields = {};
      for (const key of customFieldKeys) {
        customFields[key] = normalizeFmValue(fm[key]);
      }

      let preview = "";
      try {
        const content = await this.app.vault.cachedRead(file);
        preview = extractNotePreview(content);
      } catch (_) { /* ignore */ }

      cards.push({
        id: file.path,
        kind: "note",
        path: file.path,
        title: file.basename,
        status: normalizeFmValue(fm[eff.statusField]) || defaultStatus,
        category: normalizeFmValue(fm[eff.categoryField]),
        priority: normalizeFmValue(fm[eff.priorityField]),
        tags: collectTags(fm, cache, eff.tagsField),
        customFields,
        dueDate,
        dueTs: dueInfo ? dueInfo.sortValue : null,
        dueInfo,
        preview,
      });
    }
    return cards;
  }

  async collectTaskCardsWithSettings(eff) {
    const cards = [];
    const defaultStatus = this.getDefaultStatus(eff);
    const statuses = String(eff.statusOrder || "").split(",").map((x) => x.trim()).filter(Boolean);
    if (!statuses.length) statuses.push(defaultStatus);
    const customFieldKeys = String(eff.customFields || "").split(",").map((x) => x.trim()).filter(Boolean);

    for (const file of this.filterFilesByFolderWithSettings(this.app.vault.getMarkdownFiles(), eff)) {
      const cache = this.app.metadataCache.getFileCache(file);
      const fm = (cache && cache.frontmatter) || {};
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
          statusOrder: statuses,
          defaultStatus,
        });

        if (!parsed) continue;

        const taskDueDate =
          parsed.dueDate ||
          this.parseDateByFormat(inlineMap.get(String(eff.dueDateField || "Due Date").toLowerCase()) || "", eff);
        const dueInfo = getDueInfo(taskDueDate, eff.dueSoonDays, undefined, {
          showRelativeDate: eff.showRelativeDate,
          dateDisplayFormat: eff.dateDisplayFormat,
          dateFormat: eff.dateFormat,
          t,
        });
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
          status: parsed.status || defaultStatus,
          category: parsed.category || "",
          priority: parsed.priority || "",
          tags: parsed.tags || [],
          customFields,
          dueDate: taskDueDate || "",
          dueTs: dueInfo ? dueInfo.sortValue : null,
          dueInfo,
        });
      }
    }

    return cards;
  }

  async updateCardStatus(card, nextStatus, boardId = "") {
    const eff = this.getEffectiveSettings(boardId || "");
    const defaultStatus = this.getDefaultStatus(eff);
    await this.updateCardFields(card, {
      [eff.statusField]: String(nextStatus || "").trim() || defaultStatus,
    }, boardId);
  }

  async saveCardOrder(cardId, sortValue, boardId = "") {
    const target = boardId ? this.getBoard(boardId) : this.settings;
    if (!target) return;
    if (!target.cardOrder || typeof target.cardOrder !== "object") target.cardOrder = {};
    target.cardOrder[cardId] = sortValue;
    await this.saveSettings();
  }

  async deleteTaskLine(card) {
    const file = this.app.vault.getAbstractFileByPath(card.path);
    if (!(file instanceof TFile)) {
      new Notice(t("main.file_not_found", { path: card.path }));
      return;
    }
    const content = await this.app.vault.read(file);
    const lines = content.split(/\r?\n/);
    const index = Number(card.lineNumber) - 1;
    if (index < 0 || index >= lines.length) {
      new Notice(t("main.task_line_not_found", { path: card.path, line: card.lineNumber }));
      return;
    }
    lines.splice(index, 1);
    await this.app.vault.modify(file, lines.join("\n"));
  }

  async deleteNoteCard(card) {
    const file = this.app.vault.getAbstractFileByPath(card.path);
    if (!(file instanceof TFile)) {
      new Notice(t("main.file_not_found", { path: card.path }));
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
      new Notice(t("main.file_not_found", { path: card.path }));
      return;
    }
    const folder = file.parent ? file.parent.path : "";
    const safeName = sanitizeFileName(newTitle) || "task";
    const newPath = folder ? `${folder}/${safeName}.md` : `${safeName}.md`;
    try {
      await this.app.fileManager.renameFile(file, newPath);
    } catch (err) {
      new Notice(t("main.rename_failed", { error: err.message || err }));
    }
  }

  async updateTaskCardTitle(card, newTitle) {
    const file = this.app.vault.getAbstractFileByPath(card.path);
    if (!(file instanceof TFile)) {
      new Notice(t("main.file_not_found", { path: card.path }));
      return;
    }
    const content = await this.app.vault.read(file);
    const lines = content.split(/\r?\n/);
    const index = Number(card.lineNumber) - 1;
    if (index < 0 || index >= lines.length) {
      new Notice(t("main.task_line_not_found", { path: card.path, line: card.lineNumber }));
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

  async updateCardFields(card, updates, boardId = "") {
    if (!card) return;
    const eff = this.getEffectiveSettings(boardId || "");
    if (card.kind === "task") {
      await this.updateTaskCardFields(card, updates, eff);
      return;
    }
    await this.updateNoteCardFields(card, updates, eff);
  }

  async updateNoteCardFields(card, updates, _eff = this.settings) {
    const file = this.app.vault.getAbstractFileByPath(card.path);
    if (!(file instanceof TFile)) {
      new Notice(t("main.file_not_found", { path: card.path }));
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

  async updateTaskCardFields(card, updates, _eff = this.settings) {
    const file = this.app.vault.getAbstractFileByPath(card.path);
    if (!(file instanceof TFile)) {
      new Notice(t("main.file_not_found", { path: card.path }));
      return;
    }

    const content = await this.app.vault.read(file);
    const lines = content.split(/\r?\n/);
    const index = Number(card.lineNumber) - 1;
    if (index < 0 || index >= lines.length) {
      new Notice(t("main.task_line_not_found", { path: card.path, line: card.lineNumber }));
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

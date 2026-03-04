const { Plugin, ItemView, Modal, TFile, TFolder, Notice, PluginSettingTab, Setting, setIcon } = require("obsidian");
const { VIEW_TYPE_SMART_KANBAN, THEME_PRESETS, DEFAULT_SETTINGS } = require("./constants");
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
} = require("./modals")({ Modal, Notice });
const { SmartKanbanView } = require("./view")({
  ItemView, TFile, Notice, setIcon, VIEW_TYPE_SMART_KANBAN, normalizeDateInput, splitCsv,
});
const { SmartKanbanSettingTab } = require("./settings-tab")({
  PluginSettingTab, Setting, Notice, DEFAULT_SETTINGS, THEME_PRESETS,
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
        new Notice(`Smart Kanban self-check OK. Cards loaded: ${cards.length}`);
      },
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
              optionLabels: { "": "Default Board", ...Object.fromEntries(boards.map((b) => [b.id, b.name])) },
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
            item.setTitle("Open as Kanban Board")
              .setIcon("kanban-square")
              .onClick(async () => {
                this.settings.sourceFolder = file.path;
                await this.saveSettings();
                await this.activateView();
                new Notice(`Kanban: source folder → ${file.path}`);
              });
          });
        }
        if (file instanceof TFile && file.extension === "md") {
          menu.addItem((item) => {
            item.setTitle("Show in Kanban")
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
    const list = String(this.settings.statusOrder || "")
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
    return list.length ? list : ["Todo"];
  }

  getCustomFieldKeys() {
    return String(this.settings.customFields || "")
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
  }

  getCardMetaEntries(card) {
    const entries = [
      ["Category", card.category || ""],
      ["Priority", card.priority || ""],
    ];

    if (card.dueDate) {
      entries.push(["Due", card.dueDate]);
    }

    const custom = card.customFields || {};
    const reserved = new Set([
      this.settings.statusField.toLowerCase(),
      this.settings.categoryField.toLowerCase(),
      this.settings.priorityField.toLowerCase(),
      this.settings.tagsField.toLowerCase(),
      this.settings.dueDateField.toLowerCase(),
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
    const map = new Map();
    String(this.settings.priorityOrder || "")
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean)
      .forEach((value, index) => map.set(value.toLowerCase(), index));
    return map;
  }

  sortCards(cards) {
    return sortCards(cards, this.settings.sortBy || "none", this.settings.sortDirection || "asc", this.getPriorityOrderMap());
  }

  getWipLimit(status) {
    const limits = parseWipLimits(this.settings.wipLimits);
    return limits.get(String(status || "").toLowerCase()) || 0;
  }

  getResolvedTheme() {
    const presetName = (this.settings.theme && this.settings.theme.preset) || "default";
    const preset = THEME_PRESETS[presetName] || THEME_PRESETS.default;
    const overrides = (this.settings.theme && this.settings.theme.overrides) || {};
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
    const presetName = (this.settings.theme && this.settings.theme.preset) || "default";
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
    for (const leaf of leaves) leaf.detach();

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
    return await this.app.vault.create(filePath, `${frontmatter}\n# ${title}\n`);
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
      fields,
    });

    const current = await this.app.vault.read(file);
    const prefix = current.endsWith("\n") ? "" : "\n";
    await this.app.vault.modify(file, `${current}${prefix}${line}\n`);

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
    return eff.sourceMode === "tasks"
      ? await this.collectTaskCardsWithSettings(eff)
      : await this.collectNoteCardsWithSettings(eff);
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
      const fm = (cache && cache.frontmatter) || {};
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
      } catch (_) { /* ignore */ }

      const rawSort = fm["kanban-sort"];
      const kanbanSort = typeof rawSort === "number" ? rawSort : 0;

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
        preview,
        kanbanSort,
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
          dueInfo,
          kanbanSort: idx,
        });
      }
    }

    return cards;
  }

  async updateCardStatus(card, nextStatus) {
    await this.updateCardFields(card, {
      [this.settings.statusField]: String(nextStatus || "").trim() || "Todo",
    });
  }

  async updateCardSortOrder(card, newSort, newStatus) {
    if (card.kind === "note") {
      const file = this.app.vault.getAbstractFileByPath(card.path);
      if (!(file instanceof TFile)) return;
      await this.app.fileManager.processFrontMatter(file, (fm) => {
        fm["kanban-sort"] = newSort;
        if (newStatus !== undefined && newStatus !== card.status) {
          fm[this.settings.statusField] = newStatus;
        }
      });
    } else {
      const updates = {};
      if (newStatus !== undefined && newStatus !== card.status) {
        updates[this.settings.statusField] = newStatus;
      }
      updates["kanban-sort"] = String(newSort);
      await this.updateCardFields(card, updates);
    }
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

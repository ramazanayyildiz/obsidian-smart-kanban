const { truncateCategory } = require("./category-display");
const { renderUrlLink } = require("./url-preview");
const { LaneVirtualizer } = require("./virtual-scroll");
const { BulkActionManager } = require("./bulk-actions");
const { getCardFieldValue, collectGroupValues, filterCardsByGroup, resolveGroupFieldForWrite } = require("./group-by");
const { showLaneColorPicker } = require("./lane-colors");

module.exports = function createView({ ItemView, TFile, Notice, setIcon, VIEW_TYPE_SMART_KANBAN, normalizeDateInput, splitCsv, t = (k) => k }) {

  class SmartKanbanView extends ItemView {
    constructor(leaf, plugin) {
      super(leaf);
      this.plugin = plugin;
      this.cards = [];
      this.allCards = []; // unfiltered reference for bulk actions
      this.currentPreset = "";
      this.filters = this.plugin.createEmptyFilters();
      this.filtersCollapsed = false;
      this._dropdownCleanups = [];
      this.collapsedLanes = new Set();
      this.viewMode = "board";
      this._drag = null;
      this._virtualizer = new LaneVirtualizer();
      this.bulkManager = new BulkActionManager(plugin, this);
    }

    getViewType() {
      return VIEW_TYPE_SMART_KANBAN;
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
      if (state && state.boardId !== undefined) {
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
      this.bulkBarEl = this.containerEl.createDiv({ cls: "smart-kanban-bulk-bar-container" });
      this.bulkManager.createBar(this.bulkBarEl);
      this.boardEl = this.containerEl.createDiv({ cls: "smart-kanban-board" });

      this.applyTheme();
      this.renderBoardTabs();
      this.buildHeader();
      await this.reload();

      this._keyHandler = (event) => {
        const tag = (event.target && event.target.tagName) || "";
        const isInput = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";

        if (event.key === "Escape") {
          this.containerEl.querySelectorAll(".smart-kanban-overflow-menu").forEach((m) => { m.style.display = "none"; });
          this.containerEl.querySelectorAll(".smart-kanban-dropdown-panel").forEach((p) => { p.style.display = "none"; });
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
      const theme = this.plugin.getResolvedTheme(this.boardId);
      const eff = this.plugin.getEffectiveSettings(this.boardId);
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
        "--sk-font-family": theme.fontFamily,
      };
      const laneTint = Number(theme.laneTintStrength);
      const laneHeaderTint = Number(theme.laneHeaderTintStrength);
      if (Number.isFinite(laneTint)) {
        props["--sk-lane-tint-strength"] = `${Math.max(0, Math.min(40, laneTint))}%`;
      }
      if (Number.isFinite(laneHeaderTint)) {
        props["--sk-lane-header-tint-strength"] = `${Math.max(0, Math.min(60, laneHeaderTint))}%`;
      }
      for (const [prop, value] of Object.entries(props)) {
        if (value) el.style.setProperty(prop, value);
        else el.style.removeProperty(prop);
      }

      const presetName = String((eff.theme && eff.theme.preset) || "default");
      const hex = String(theme.boardBg || theme.cardBg || "").trim();
      const m = /^#?([0-9a-f]{6})$/i.exec(hex);
      let isDark = false;
      if (m) {
        const rgb = m[1];
        const r = Number.parseInt(rgb.slice(0, 2), 16);
        const g = Number.parseInt(rgb.slice(2, 4), 16);
        const b = Number.parseInt(rgb.slice(4, 6), 16);
        const luma = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        isDark = luma < 0.45;
      }
      el.toggleClass("sk-theme-dark-preset", presetName === "midnight" || isDark);
    }

    renderBoardTabs() {
      this.boardTabsEl.empty();
      const boards = this.plugin.settings.boards || [];

      /* hide tabs entirely when there are no custom boards */
      if (boards.length === 0 && !this.boardId) {
        this.boardTabsEl.style.display = "none";
        return;
      }
      this.boardTabsEl.style.display = "";

      const defaultTab = this.boardTabsEl.createEl("button", {
        text: t("view.board.default"),
        cls: `smart-kanban-board-tab ${!this.boardId ? "is-active" : ""}`,
      });
      defaultTab.addEventListener("click", () => this.switchBoard(""));

      for (const board of boards) {
        const label = board.name + (board.type === "filtered-view" ? ` ${t("view.board.view_suffix")}` : "");
        const tab = this.boardTabsEl.createEl("button", {
          text: label,
          cls: `smart-kanban-board-tab ${this.boardId === board.id ? "is-active" : ""}`,
        });
        tab.addEventListener("click", () => this.switchBoard(board.id));
      }

      const addTab = this.boardTabsEl.createEl("button", {
        text: "+",
        cls: "smart-kanban-board-tab smart-kanban-board-tab-add",
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
      this.collapsedLanes.clear();
      this.clearFilters();
      this.renderBoardTabs();
      this.buildHeader();
      await this.reload();
    }

    async reload() {
      this._cancelDrag();
      this._virtualizer.destroyAll();
      this._cachedSettings = null;
      this._cachedStatuses = null;
      this.cards = await this.plugin.collectCards(this.boardId);
      this.allCards = this.cards;
      this._cachedSettings = this.plugin.getEffectiveSettings(this.boardId);
      this._cachedStatuses = this.plugin.collectStatusesFromCards(this.cards, this.boardId);
      this.bulkManager.clearSelection();
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
      else if (this.viewMode === "feed") this.renderFeed();
      else if (this.viewMode === "list") this.renderList();
      else this.renderBoard();
    }

    buildHeader() {
      this.headerEl.empty();

      const left = this.headerEl.createDiv({ cls: "smart-kanban-header-left" });
      const board = this.boardId ? this.plugin.getBoard(this.boardId) : null;
      left.createEl("h2", { text: board?.name || t("view.board.fallback_title"), cls: "smart-kanban-title" });
      this.buildViewModeTabs(left);

      const toolbar = this.headerEl.createDiv({ cls: "smart-kanban-toolbar" });

      const searchWrap = toolbar.createDiv({ cls: "smart-kanban-search-wrap" });
      const searchInput = searchWrap.createEl("input", {
        type: "text",
        placeholder: t("view.search.placeholder"),
        cls: "smart-kanban-search-input",
      });
      searchInput.value = this.filters.text;
      searchInput.addEventListener("input", () => {
        this.filters.text = searchInput.value.trim().toLowerCase();
        this.currentPreset = "";
        this.renderContent();
      });
      const searchIcon = searchWrap.createSpan({ cls: "smart-kanban-search-icon" });
      setIcon(searchIcon, "search");

      const eff = this.plugin.getEffectiveSettings(this.boardId);
      const sortWrap = toolbar.createDiv({ cls: "smart-kanban-sort-controls" });
      const sortBySelect = sortWrap.createEl("select", {
        cls: "smart-kanban-sort-select",
        attr: { title: t("settings.sort_by.name"), "aria-label": t("settings.sort_by.name") },
      });
      const sortOptions = [
        ["none", t("settings.sort_by.none")],
        ["priority", t("settings.sort_by.priority")],
        ["due", t("settings.sort_by.due")],
        ["title", t("settings.sort_by.title")],
      ];
      for (const [value, label] of sortOptions) {
        sortBySelect.createEl("option", { value, text: label });
      }
      sortBySelect.value = eff.sortBy || "none";

      const sortDirectionSelect = sortWrap.createEl("select", {
        cls: "smart-kanban-sort-select",
        attr: { title: t("settings.sort_direction.name"), "aria-label": t("settings.sort_direction.name") },
      });
      sortDirectionSelect.createEl("option", { value: "asc", text: t("settings.sort_direction.asc") });
      sortDirectionSelect.createEl("option", { value: "desc", text: t("settings.sort_direction.desc") });
      sortDirectionSelect.value = eff.sortDirection || "asc";

      const applySortSettings = async () => {
        await this.setBoardSortSettings(sortBySelect.value, sortDirectionSelect.value);
      };
      sortBySelect.addEventListener("change", applySortSettings);
      sortDirectionSelect.addEventListener("change", applySortSettings);

      // Group-by dropdown
      const groupWrap = toolbar.createDiv({ cls: "smart-kanban-group-controls" });
      const groupSelect = groupWrap.createEl("select", {
        cls: "smart-kanban-sort-select",
        attr: { title: "Group by", "aria-label": "Group by" },
      });
      const groupOptions = [
        ["", "Group: Status"],
        [eff.categoryField || "Category", "Group: Category"],
        [eff.priorityField || "Priority", "Group: Priority"],
      ];
      // Add custom fields as group options
      const customKeys = String(eff.customFields || "").split(",").map(s => s.trim()).filter(Boolean);
      for (const key of customKeys) {
        groupOptions.push([key, `Group: ${key}`]);
      }
      for (const [value, label] of groupOptions) {
        groupSelect.createEl("option", { value, text: label });
      }
      groupSelect.value = eff.groupByField || "";
      groupSelect.addEventListener("change", async () => {
        await this.plugin.updateBoardConfig(this.boardId, { groupByField: groupSelect.value });
        this._cachedSettings = null;
        await this.reload();
      });

      this.createIconBtn(toolbar, "filter", t("view.toolbar.toggle_filters"), () => {
        this.filtersCollapsed = !this.filtersCollapsed;
        this.filtersEl.style.display = this.filtersCollapsed ? "none" : "";
      });

      // Bulk select toggle
      const bulkBtn = this.createIconBtn(toolbar, "check-square", "Bulk Select", () => {
        const active = this.bulkManager.toggle();
        bulkBtn.toggleClass("is-active", active);
        this.renderContent();
      });

      this.createIconBtn(toolbar, "plus", t("view.toolbar.new_task"), () => this.createTaskInteractive());
      this.createIconBtn(toolbar, "refresh-cw", t("view.toolbar.refresh"), () => this.reload());
      this.createIconBtn(toolbar, "settings", t("view.toolbar.plugin_settings"), () => this.openPluginSettings());
      this.createIconBtn(toolbar, "sliders-horizontal", t("view.toolbar.quick_config"), () => this.configureBoardInteractive());
    }

    buildViewModeTabs(parent) {
      const wrap = parent.createDiv({ cls: "smart-kanban-viewmode-tabs" });
      const modes = [
        { key: "board", icon: "kanban-square", label: t("view.mode.board") },
        { key: "table", icon: "table", label: t("view.mode.table") },
        { key: "feed", icon: "activity", label: t("view.mode.feed") },
        { key: "list", icon: "list", label: t("view.mode.list") },
      ];
      for (const mode of modes) {
        const item = wrap.createEl("button", {
          cls: `smart-kanban-viewmode-tab ${this.viewMode === mode.key ? "is-active" : ""}`,
          attr: { title: `View as ${mode.label.toLowerCase()}` },
        });
        const iconEl = item.createSpan({ cls: "smart-kanban-viewmode-tab-icon" });
        setIcon(iconEl, mode.icon);
        item.createSpan({ text: mode.label });
        item.addEventListener("click", () => {
          this.viewMode = mode.key;
          this.buildHeader();
          this.renderContent();
        });
      }
    }

    createIconBtn(parent, icon, title, onClick) {
      const btn = parent.createEl("button", { cls: "smart-kanban-icon-btn", attr: { title, "aria-label": title } });
      setIcon(btn, icon);
      btn.addEventListener("click", async (e) => { e.stopPropagation(); await onClick(); });
      return btn;
    }

    async setBoardSortSettings(sortBy, sortDirection) {
      const nextSortBy = String(sortBy || "").trim() || "none";
      const nextSortDirection = String(sortDirection || "").trim() || "asc";
      const board = this.boardId ? this.plugin.getBoard(this.boardId) : null;
      if (board) {
        board.sortBy = nextSortBy;
        board.sortDirection = nextSortDirection;
      } else {
        this.plugin.settings.sortBy = nextSortBy;
        this.plugin.settings.sortDirection = nextSortDirection;
        if (this.plugin.settings.defaultBoardConfig) {
          this.plugin.settings.defaultBoardConfig.sortBy = nextSortBy;
          this.plugin.settings.defaultBoardConfig.sortDirection = nextSortDirection;
        }
      }
      await this.plugin.saveSettings();
      this.renderContent();
    }

    getActiveSettings() {
      return this._cachedSettings || this.plugin.getEffectiveSettings(this.boardId);
    }

    resolveColorEntry(mapObj, value) {
      if (!mapObj || typeof mapObj !== "object") return null;
      const key = String(value || "").trim();
      if (!key) return null;
      if (mapObj[key] && typeof mapObj[key] === "object") return mapObj[key];
      const lower = key.toLowerCase();
      for (const [entryKey, entryValue] of Object.entries(mapObj)) {
        if (String(entryKey).toLowerCase() === lower && entryValue && typeof entryValue === "object") return entryValue;
      }
      return null;
    }

    applyBadgeColor(el, mapObj, value) {
      const entry = this.resolveColorEntry(mapObj, value);
      if (!entry) return;
      if (entry.bg) el.style.backgroundColor = String(entry.bg);
      if (entry.text) el.style.color = String(entry.text);
    }

    bindFilterBadge(el, key, value) {
      const text = String(value || "").trim();
      if (!text) return;
      el.addClass("smart-kanban-filterable-badge");
      el.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleFilterValue(key, text);
      });
    }

    async openPluginSettings() {
      if (this.app.setting && typeof this.app.setting.open === "function") {
        await Promise.resolve(this.app.setting.open());
      }
      if (this.app.setting && typeof this.app.setting.openTabById === "function") {
        await Promise.resolve(this.app.setting.openTabById(this.plugin.manifest.id));
      }
    }

    async configureBoardInteractive() {
      const result = await this.plugin.openDragReorderModal({
        title: t("view.configure.title"),
        sections: [
          {
            key: "statuses",
            label: t("view.configure.lanes"),
            items: [...this.plugin.getStatusOrder(this.boardId)],
          },
          {
            key: "customFields",
            label: t("view.configure.custom_fields"),
            items: [...this.plugin.getCustomFieldKeys(this.boardId)],
          },
        ],
        onOpenSettings: async () => {
          if (this.boardId) {
            this.plugin.settings.activeBoardId = this.boardId;
            await this.plugin.saveSettings();
          }
          await this.openPluginSettings();
        },
      });
      if (!result) return;

      const statusValue = (result.statuses || []).join(", ");
      const customFieldsValue = (result.customFields || []).join(", ");
      const board = this.boardId ? this.plugin.getBoard(this.boardId) : null;
      if (board) {
        board.statusOrder = statusValue || null;
        board.customFields = customFieldsValue || null;
      } else {
        this.plugin.settings.statusOrder = statusValue;
        this.plugin.settings.customFields = customFieldsValue;
        if (this.plugin.settings.defaultBoardConfig) {
          this.plugin.settings.defaultBoardConfig.statusOrder = statusValue;
          this.plugin.settings.defaultBoardConfig.customFields = customFieldsValue;
        }
      }
      await this.plugin.saveSettings();
      await this.reload();
      new Notice(t("view.configure.updated_notice"));
    }

    async createTaskInteractive() {
      let statuses = this._cachedStatuses || this.plugin.collectStatusesFromCards(this.cards, this.boardId);
      const board = this.boardId ? this.plugin.getBoard(this.boardId) : null;
      if (board && board.type === "filtered-view" && board.visibleStatuses) {
        const visible = String(board.visibleStatuses)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        if (visible.length) {
          statuses = [...visible];
        }
      }
      if (!statuses.length) statuses = [this.plugin.getDefaultStatus(this.boardId)];
      const defaultStatus = statuses[0] || this.plugin.getDefaultStatus(this.boardId);
      const categories = this.uniqueValues("category");
      const priorities = this.uniqueValues("priority");
      const values = await this.plugin.openFormModal({
        title: t("view.task.new.title"),
        submitText: t("common.create"),
        fields: [
          { key: "title", label: "Task title", value: "", type: "text" },
          { key: "status", label: "Status", value: defaultStatus, type: "select", options: statuses },
          {
            key: "category",
            label: "Category",
            value: "",
            type: "select",
            options: ["", ...categories],
            optionLabelEmpty: "None",
          },
          {
            key: "priority",
            label: "Priority",
            value: "",
            type: "select",
            options: ["", ...priorities],
            optionLabelEmpty: "None",
          },
          { key: "due", label: "Due date", value: "", type: "date" },
          { key: "tags", label: "Tags (comma separated)", value: "" },
        ],
      });
      if (!values) return;

      const title = String(values.title || "").trim();
      if (!title) {
        new Notice(t("view.task.title_required"));
        return;
      }

      const status = String(values.status || "").trim() || defaultStatus;
      const category = String(values.category || "").trim();
      const priority = String(values.priority || "").trim();
      const dueInput = String(values.due || "");
      const tagsInput = String(values.tags || "");

      const dueDate = normalizeDateInput(dueInput);
      if (dueInput.trim() && !dueDate) {
        new Notice(t("view.task.invalid_due_date"));
        return;
      }

      const tags = splitCsv(tagsInput);
      const eff = this.plugin.getEffectiveSettings(this.boardId);

      await this.plugin.createTaskEntry(title.trim(), {
        [eff.statusField]: (status || defaultStatus).trim() || defaultStatus,
        [eff.categoryField]: category.trim(),
        [eff.priorityField]: priority.trim(),
        [eff.dueDateField]: dueDate,
        [eff.tagsField]: tags,
      }, this.boardId);

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
        const clearBtn = row.createEl("button", { text: t("common.clear"), cls: "smart-kanban-filter-clear-btn" });
        clearBtn.addEventListener("click", () => {
          this.clearFilters();
          this.renderFilters();
          this.renderContent();
        });
      }

      const presetNames = this.plugin.getFilterPresetNames(this.boardId);
      if (presetNames.length > 0 || hasFilters) {
        const spacer = row.createDiv({ cls: "smart-kanban-filter-spacer" });
        this.renderPresetControls(row, presetNames);
      }
    }

    renderPresetControls(row, names) {
      const wrap = row.createDiv({ cls: "smart-kanban-preset-wrap" });

      if (names.length > 0) {
        const select = wrap.createEl("select", { cls: "smart-kanban-preset-select" });
        select.createEl("option", { text: t("view.preset.placeholder"), value: "" });
        for (const name of names.sort((a, b) => a.localeCompare(b))) {
          const opt = select.createEl("option", { value: name });
          opt.textContent = name;
        }
        select.value = this.currentPreset;
        select.addEventListener("change", () => {
          if (!select.value) { this.currentPreset = ""; return; }
          this.applyPreset(select.value);
        });

        if (this.currentPreset) {
          const deleteBtn = wrap.createEl("button", { cls: "smart-kanban-icon-btn-sm", attr: { title: t("view.preset.delete_title") } });
          setIcon(deleteBtn, "trash-2");
          deleteBtn.addEventListener("click", () => this.deleteCurrentPresetInteractive());
        }
      }

      const saveBtn = wrap.createEl("button", { cls: "smart-kanban-icon-btn-sm", attr: { title: t("view.preset.save_title") } });
      setIcon(saveBtn, "bookmark-plus");
      saveBtn.addEventListener("click", () => this.savePresetInteractive());
    }

    renderDropdownFilter(parent, label, values, key) {
      const wrap = parent.createDiv({ cls: "smart-kanban-dropdown-filter" });
      const selected = this.filters[key] || [];
      const btnText = selected.length === 0 ? label : `${label} (${selected.length})`;

      const trigger = wrap.createEl("button", { cls: "smart-kanban-dropdown-trigger" });
      trigger.createSpan({ text: btnText });
      const chevron = trigger.createSpan({ cls: "smart-kanban-dropdown-chevron" });
      setIcon(chevron, "chevron-down");

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
        if (isOpen) { closePanel(); return; }
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
        const clearAll = panel.createEl("button", { text: t("common.clear"), cls: "smart-kanban-dropdown-clear" });
        clearAll.addEventListener("click", () => {
          this.filters[key] = [];
          this.currentPreset = "";
          this.renderFilters();
          this.renderContent();
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
      this.renderContent();
    }

    applyPreset(name) {
      const preset = this.plugin.getFilterPreset(name, this.boardId);
      if (!preset) {
        new Notice(t("view.preset.not_found", { name }));
        this.currentPreset = "";
        this.renderFilters();
        return;
      }

      this.filters = this.plugin.cloneFilters(preset);
      this.currentPreset = name;
      this.renderFilters();
      this.renderContent();
    }

    async savePresetInteractive() {
      const values = await this.plugin.openFormModal({
        title: t("view.preset.save_dialog_title"),
        submitText: t("common.save"),
        fields: [
          {
            key: "name",
            label: t("view.preset.name_label"),
            value: this.currentPreset || "",
          },
        ],
      });
      if (!values) return;

      const normalizedName = String(values.name || "").trim();
      if (!normalizedName) return;

      await this.plugin.saveFilterPreset(normalizedName, this.filters, this.boardId);
      this.currentPreset = normalizedName;
      this.renderFilters();
      new Notice(t("view.preset.saved_notice", { name: normalizedName }));
    }

    async deleteCurrentPresetInteractive() {
      if (!this.currentPreset) return;

      const name = this.currentPreset;
      const confirmed = await this.plugin.openConfirmModal({
        title: t("view.preset.delete_dialog_title"),
        message: t("view.preset.delete_confirm", { name }),
        confirmText: t("common.delete"),
      });
      if (!confirmed) return;

      await this.plugin.deleteFilterPreset(name, this.boardId);
      this.currentPreset = "";
      this.renderFilters();
      new Notice(t("view.preset.deleted_notice", { name }));
    }

    clearFilters() {
      this.filters = this.plugin.createEmptyFilters();
      this.currentPreset = "";
    }

    uniqueValues(key) {
      const out = new Set();
      for (const card of this.cards) {
        const value = String(card[key] || "").trim();
        if (value) out.add(value);
      }
      return [...out].sort((a, b) => a.localeCompare(b));
    }

    uniqueTagValues() {
      const out = new Set();
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
        emptyEl.createEl("h3", { text: t("view.empty.no_tasks_title") });
        emptyEl.createEl("p", { text: t("view.empty.no_tasks_desc") });
        const createBtn = emptyEl.createEl("button", { text: t("view.empty.create_first_task"), cls: "mod-cta" });
        createBtn.addEventListener("click", async () => {
          await this.createTaskInteractive();
        });
        return;
      }

      const eff0 = this.getActiveSettings();
      const groupByField = eff0.groupByField || "";
      const useGroupBy = groupByField && groupByField !== eff0.statusField && groupByField !== "status";

      let statuses;
      if (useGroupBy) {
        statuses = collectGroupValues(this.cards, groupByField, eff0, null);
      } else {
        statuses = this._cachedStatuses || this.plugin.collectStatusesFromCards(this.cards, this.boardId);
      }
      const board = this.boardId ? this.plugin.getBoard(this.boardId) : null;
      if (!useGroupBy && board && board.type === "filtered-view" && board.visibleStatuses) {
        const visible = board.visibleStatuses.split(",").map((s) => s.trim()).filter(Boolean);
        if (visible.length) statuses = statuses.filter((s) => visible.includes(s));
      }
      const filteredCards = this.filteredCards();
      this.allCards = this.cards; // expose for bulk actions

      if (this.cards.length > 0 && filteredCards.length === 0) {
        const emptyEl = this.boardEl.createDiv({ cls: "smart-kanban-empty-state" });
        emptyEl.createEl("p", { text: t("view.empty.no_filter_match") });
        const clearBtn = emptyEl.createEl("button", { text: t("view.empty.clear_filters") });
          clearBtn.addEventListener("click", () => {
            this.clearFilters();
            this.renderFilters();
            this.renderContent();
          });
        return;
      }

      const eff = this.getActiveSettings();
      for (const status of statuses) {
        const lane = this.boardEl.createDiv({ cls: "smart-kanban-lane" });
        lane.dataset.status = status;

        const isCollapsed = this.collapsedLanes.has(status);
        if (isCollapsed) lane.addClass("is-collapsed");

        const laneColor = this.plugin.getResolvedLaneColor(status, this.boardId);
        if (laneColor.bg) lane.style.setProperty("--sk-lane-accent-bg", laneColor.bg);
        if (laneColor.text) lane.style.setProperty("--sk-lane-accent-text", laneColor.text);
        const laneHeader = lane.createDiv({ cls: "smart-kanban-lane-header" });

        const laneTitle = laneHeader.createEl("h3", { text: status });

        laneHeader.addEventListener("click", () => {
          if (this.collapsedLanes.has(status)) this.collapsedLanes.delete(status);
          else this.collapsedLanes.add(status);
          this.renderBoard();
        });

        // Right-click for Notion-style color picker
        laneHeader.addEventListener("contextmenu", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const currentColor = this.plugin.getResolvedLaneColor(status, this.boardId);
          showLaneColorPicker(laneHeader, currentColor.bg, async ({ bg, text }) => {
            const board = this.boardId ? this.plugin.getBoard(this.boardId) : null;
            const theme = board?.theme || this.plugin.settings.theme || {};
            if (!theme.laneColors) theme.laneColors = {};
            if (bg) {
              theme.laneColors[status] = { bg, text };
            } else {
              delete theme.laneColors[status];
            }
            if (board) board.theme = theme;
            else this.plugin.settings.theme = theme;
            await this.plugin.saveSettings();
            this.renderBoard();
          });
        });

        const fallbackStatus = this.plugin.getDefaultStatus(this.boardId);
        let laneCards;
        if (useGroupBy) {
          laneCards = filterCardsByGroup(filteredCards, status, groupByField, eff0);
        } else {
          laneCards = filteredCards.filter((card) => (card.status || fallbackStatus) === status);
        }
        laneCards = this.plugin.sortCards(laneCards, this.boardId);

        /* count right next to the title, no wrapper */
        laneHeader.createEl("span", { text: String(laneCards.length), cls: "smart-kanban-count" });

        const wipLimit = this.plugin.getWipLimit(status, this.boardId);
        if (wipLimit > 0) {
          const wip = laneHeader.createEl("span", {
            text: `${laneCards.length}/${wipLimit}`,
            cls: "smart-kanban-wip",
          });
          if (laneCards.length > wipLimit) {
            wip.addClass("is-over");
            lane.addClass("is-over-wip");
          }
        }

        if (!isCollapsed) {
          const list = lane.createDiv({ cls: "smart-kanban-card-list" });
          list.dataset.status = status;

          /* Virtual scrolling: render in batches via IntersectionObserver */
          this._virtualizer.initLane(status, list, laneCards, (container, card) => {
            return this.renderCard(container, card, eff);
          });

          /* Notion-style "+ New page" that expands to inline input */
          const quickAdd = lane.createDiv({ cls: "smart-kanban-quick-add" });
          const quickLabel = quickAdd.createEl("span", {
            text: t("view.quick_add.new_page"),
            cls: "smart-kanban-quick-add-label",
          });
          if (laneColor.text) quickLabel.style.color = laneColor.text;

          const quickInput = quickAdd.createEl("input", {
            type: "text",
            placeholder: t("view.quick_add.placeholder"),
            cls: "smart-kanban-quick-add-input",
          });
          quickInput.style.display = "none";
          let quickAddPending = false;

          quickLabel.addEventListener("click", () => {
            quickLabel.style.display = "none";
            quickInput.style.display = "";
            quickInput.focus();
          });

          const doQuickAdd = async () => {
            if (quickAddPending) return;
            const title = quickInput.value.trim();
            if (!title) {
              quickInput.style.display = "none";
              quickLabel.style.display = "";
              return;
            }
            quickAddPending = true;
            quickInput.style.display = "none";
            quickLabel.style.display = "";
            const s = this.plugin.getEffectiveSettings(this.boardId);
            try {
              await this.plugin.createTaskEntry(title, {
                [s.statusField]: status,
                [s.categoryField]: "",
                [s.priorityField]: "",
                [s.dueDateField]: "",
                [s.tagsField]: "",
              }, this.boardId);
              quickInput.value = "";
              await this.reload();
            } finally {
              quickAddPending = false;
            }
          };

          quickInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") { e.preventDefault(); doQuickAdd(); }
            if (e.key === "Escape") {
              quickInput.value = "";
              quickInput.style.display = "none";
              quickLabel.style.display = "";
            }
          });
          quickInput.addEventListener("blur", () => {
            /* small delay so Enter can fire before blur */
            setTimeout(() => {
              if (quickInput.style.display !== "none") {
                doQuickAdd();
              }
            }, 150);
          });
        }
      }
    }

    renderTable() {
      this.boardEl.empty();
      this.boardEl.removeClass("smart-kanban-board");
      this.boardEl.addClass("smart-kanban-table-wrap");
      const eff = this.getActiveSettings();

      const filtered = this.filteredCards();
      const sorted = this.plugin.sortCards(filtered, this.boardId);

      if (!sorted.length) {
        this.boardEl.createDiv({ cls: "smart-kanban-empty-state" }).createEl("p", { text: t("view.empty.no_tasks") });
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
          if (file instanceof TFile) await this.app.workspace.getLeaf(true).openFile(file);
        });

        tr.createEl("td").createSpan({ text: card.status || this.plugin.getDefaultStatus(this.boardId), cls: "smart-kanban-badge smart-kanban-badge-category" });

        const tdCat = tr.createEl("td");
        if (card.category) {
          const catBadge = tdCat.createSpan({ text: card.category, cls: "smart-kanban-badge smart-kanban-badge-category" });
          this.applyBadgeColor(catBadge, eff.categoryColors, card.category);
          this.bindFilterBadge(catBadge, "categories", card.category);
        }

        const tdPri = tr.createEl("td");
        if (card.priority) {
          const slug = card.priority.toLowerCase().replace(/\s+/g, "-");
          tdPri.createSpan({ text: card.priority, cls: `smart-kanban-badge smart-kanban-priority-badge smart-kanban-priority-${slug}` });
        }

        const tdDue = tr.createEl("td");
        if (card.dueDate) {
          const cls = card.dueInfo ? `smart-kanban-badge smart-kanban-due-badge ${card.dueInfo.cls || ""}` : "";
          tdDue.createSpan({ text: (card.dueInfo && card.dueInfo.label) ? card.dueInfo.label : card.dueDate, cls });
        }

        const tdTags = tr.createEl("td", { cls: "smart-kanban-table-tags" });
        for (const tag of card.tags || []) {
          const tagBadge = tdTags.createSpan({ text: tag, cls: "smart-kanban-badge smart-kanban-tag" });
          this.applyBadgeColor(tagBadge, eff.tagColors, tag);
          this.bindFilterBadge(tagBadge, "tags", tag);
        }
      }
    }

    renderList() {
      this.boardEl.empty();
      this.boardEl.removeClass("smart-kanban-board");
      this.boardEl.addClass("smart-kanban-list-wrap");
      const eff = this.getActiveSettings();

      const filtered = this.filteredCards();
      const statuses = this._cachedStatuses || this.plugin.collectStatusesFromCards(this.cards, this.boardId);

      if (!filtered.length) {
        this.boardEl.createDiv({ cls: "smart-kanban-empty-state" }).createEl("p", { text: t("view.empty.no_tasks") });
        return;
      }

      for (const status of statuses) {
        const fallbackStatus = this.plugin.getDefaultStatus(this.boardId);
        let laneCards = filtered.filter((c) => (c.status || fallbackStatus) === status);
        if (!laneCards.length) continue;
        laneCards = this.plugin.sortCards(laneCards, this.boardId);

        const section = this.boardEl.createDiv({ cls: "smart-kanban-list-section" });
        const header = section.createDiv({ cls: "smart-kanban-list-section-header" });
        const laneColor = this.plugin.getResolvedLaneColor(status, this.boardId);
        const listTitle = header.createSpan({ text: status, cls: "smart-kanban-list-section-title" });
        if (laneColor.bg) listTitle.style.color = laneColor.bg;
        header.createSpan({ text: String(laneCards.length), cls: "smart-kanban-list-section-count" });

        for (const card of laneCards) {
          const row = section.createDiv({ cls: "smart-kanban-list-item" });

          const link = row.createEl("a", { text: card.title, href: "#", cls: "smart-kanban-list-item-title" });
          link.addEventListener("click", async (e) => {
            e.preventDefault();
            const file = this.app.vault.getAbstractFileByPath(card.path);
            if (file instanceof TFile) await this.app.workspace.getLeaf(true).openFile(file);
          });

          const badges = row.createDiv({ cls: "smart-kanban-list-item-badges" });
          if (card.category) {
            const catBadge = badges.createSpan({ text: card.category, cls: "smart-kanban-badge smart-kanban-badge-category" });
            this.applyBadgeColor(catBadge, eff.categoryColors, card.category);
            this.bindFilterBadge(catBadge, "categories", card.category);
          }
          if (card.priority) {
            const slug = card.priority.toLowerCase().replace(/\s+/g, "-");
            badges.createSpan({ text: card.priority, cls: `smart-kanban-badge smart-kanban-priority-badge smart-kanban-priority-${slug}` });
          }
          if (card.dueInfo) badges.createSpan({ text: card.dueInfo.label, cls: "smart-kanban-badge smart-kanban-due-badge" });
          for (const tag of card.tags || []) {
            const tagBadge = badges.createSpan({ text: tag, cls: "smart-kanban-badge smart-kanban-tag" });
            this.applyBadgeColor(tagBadge, eff.tagColors, tag);
            this.bindFilterBadge(tagBadge, "tags", tag);
          }
        }
      }
    }

    renderFeed() {
      this.boardEl.empty();
      this.boardEl.removeClass("smart-kanban-board");
      this.boardEl.addClass("smart-kanban-list-wrap");
      const eff = this.getActiveSettings();

      const sorted = this.plugin.sortCards(this.filteredCards(), this.boardId);
      if (!sorted.length) {
        this.boardEl.createDiv({ cls: "smart-kanban-empty-state" }).createEl("p", { text: t("view.empty.no_tasks") });
        return;
      }

      for (const card of sorted) {
        const row = this.boardEl.createDiv({ cls: "smart-kanban-list-item" });
        const link = row.createEl("a", { text: card.title, href: "#", cls: "smart-kanban-list-item-title" });
        link.addEventListener("click", async (e) => {
          e.preventDefault();
          const file = this.app.vault.getAbstractFileByPath(card.path);
          if (file instanceof TFile) await this.app.workspace.getLeaf(true).openFile(file);
        });

        const badges = row.createDiv({ cls: "smart-kanban-list-item-badges" });
        badges.createSpan({ text: card.status || this.plugin.getDefaultStatus(this.boardId), cls: "smart-kanban-badge smart-kanban-badge-category" });
        if (card.category) {
          const catBadge = badges.createSpan({ text: card.category, cls: "smart-kanban-badge smart-kanban-badge-category" });
          this.applyBadgeColor(catBadge, eff.categoryColors, card.category);
          this.bindFilterBadge(catBadge, "categories", card.category);
        }
        if (card.priority) {
          const slug = card.priority.toLowerCase().replace(/\s+/g, "-");
          badges.createSpan({ text: card.priority, cls: `smart-kanban-badge smart-kanban-priority-badge smart-kanban-priority-${slug}` });
        }
        if (card.dueInfo) badges.createSpan({ text: card.dueInfo.label, cls: "smart-kanban-badge smart-kanban-due-badge" });
        for (const tag of card.tags || []) {
          const tagBadge = badges.createSpan({ text: tag, cls: "smart-kanban-badge smart-kanban-tag" });
          this.applyBadgeColor(tagBadge, eff.tagColors, tag);
          this.bindFilterBadge(tagBadge, "tags", tag);
        }
      }
    }

    renderCard(parent, card, eff = this.getActiveSettings()) {
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

      // Strip date prefix from display title
      const displayTitle = card.title.replace(/^\d{4}-\d{2}-\d{2}\s+/, "").replace(/^unknown\s+/, "");
      const link = titleRow.createEl("a", { text: displayTitle, href: "#", cls: "smart-kanban-card-title-link" });
      link.addEventListener("click", async (event) => {
        event.preventDefault();
        const file = this.app.vault.getAbstractFileByPath(card.path);
        if (file instanceof TFile) {
          await this.app.workspace.getLeaf(true).openFile(file);
        }
      });

      const overflowWrap = titleRow.createDiv({ cls: "smart-kanban-overflow-wrap" });
      const overflowBtn = overflowWrap.createEl("button", { cls: "smart-kanban-overflow-btn" });
      setIcon(overflowBtn, "more-horizontal");

      const badges = cardEl.createDiv({ cls: "smart-kanban-card-badges" });

      // Only show category badge (the main visual identifier like Notion)
      if (card.category) {
        const depth = eff.categoryDisplayDepth || 1;
        const { display, full, truncated } = truncateCategory(card.category, depth);
        const catBadge = badges.createSpan({ text: display, cls: "smart-kanban-badge smart-kanban-badge-category" });
        if (truncated) catBadge.setAttr("title", full);
        this.applyBadgeColor(catBadge, eff.categoryColors, card.category);
        this.bindFilterBadge(catBadge, "categories", card.category);
      }

      // Show source as a subtle badge (twitter, youtube, raindrop)
      const source = card.customFields?.source;
      if (source) {
        badges.createSpan({ text: source, cls: "smart-kanban-badge smart-kanban-badge-source" });
      }

      if (card.priority) {
        const prioSlug = card.priority.toLowerCase().replace(/\s+/g, "-");
        badges.createSpan({
          text: card.priority,
          cls: `smart-kanban-badge smart-kanban-priority-badge smart-kanban-priority-${prioSlug}`,
        });
      }

      // Skip: due date badges, custom field badges, and all tags on cards
      // Tags are still searchable via filters but don't clutter the card

      // URL preview
      if (card.url) {
        renderUrlLink(cardEl, card.url);
      }

      // Bulk selection checkbox
      this.bulkManager.renderCheckbox(cardEl, card);

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

      const editItem = menu.createDiv({ text: t("view.menu.edit"), cls: "smart-kanban-menu-item" });
      editItem.addEventListener("click", async () => {
        menu.style.display = "none";
        await this.editCardInteractive(card);
      });

      const openItem = menu.createDiv({ text: t("view.menu.open_note"), cls: "smart-kanban-menu-item" });
      openItem.addEventListener("click", async () => {
        menu.style.display = "none";
        const file = this.app.vault.getAbstractFileByPath(card.path);
        if (file instanceof TFile) {
          await this.app.workspace.getLeaf(true).openFile(file);
        }
      });

      const completeItem = menu.createDiv({ text: t("view.menu.mark_done"), cls: "smart-kanban-menu-item" });
      completeItem.addEventListener("click", async () => {
        menu.style.display = "none";
        await this.plugin.updateCardStatus(card, "Done", this.boardId);
        await this.reload();
        new Notice(t("view.menu.completed_notice", { title: card.title }));
      });

      const moveItem = menu.createDiv({ cls: "smart-kanban-menu-item smart-kanban-move-item" });
      moveItem.createSpan({ text: t("view.menu.move_to") + " " });
      const moveSelect = moveItem.createEl("select", { cls: "smart-kanban-move-select" });
      moveSelect.createEl("option", { text: t("common.ellipsis"), value: "" });
      const allStatuses = this._cachedStatuses || this.plugin.collectStatusesFromCards(this.cards, this.boardId);
      for (const s of allStatuses) {
        if (s !== card.status) {
          moveSelect.createEl("option", { text: s, value: s });
        }
      }
      moveSelect.addEventListener("change", async () => {
        if (!moveSelect.value) return;
        menu.style.display = "none";
        await this.plugin.updateCardStatus(card, moveSelect.value, this.boardId);
        await this.reload();
      });

      const deleteItem = menu.createDiv({ text: t("common.delete"), cls: "smart-kanban-menu-item smart-kanban-menu-delete" });
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

      return cardEl;
    }

    async deleteCardInteractive(card) {
      const confirmed = await this.plugin.openConfirmModal({
        title: t("view.delete.title"),
        message: t("view.delete.message", { title: card.title }),
        confirmText: t("common.delete"),
      });
      if (!confirmed) return;
      if (card.kind === "task") {
        await this.plugin.deleteTaskLine(card);
      } else {
        await this.plugin.deleteNoteCard(card);
      }
      await this.reload();
      new Notice(t("view.delete.deleted_notice", { title: card.title }));
    }

    async editCardInteractive(card) {
      const eff = this.plugin.getEffectiveSettings(this.boardId);
      const categories = this.uniqueValues("category");
      const priorities = this.uniqueValues("priority");
      const values = await this.plugin.openFormModal({
        title: t("view.task.edit.title"),
        submitText: t("common.save"),
        fields: [
          { key: "title", label: "Title", value: card.title || "" },
          {
            key: "category",
            label: "Category",
            value: card.category || "",
            type: "select",
            options: ["", ...categories],
            optionLabelEmpty: "None",
          },
          {
            key: "priority",
            label: "Priority",
            value: card.priority || "",
            type: "select",
            options: ["", ...priorities],
            optionLabelEmpty: "None",
          },
          { key: "due", label: "Due date", value: card.dueDate || "", type: "date" },
          { key: "tags", label: "Tags (comma separated)", value: (card.tags || []).join(", ") },
        ],
      });
      if (!values) return;

      const newTitle = String(values.title || "").trim();
      if (newTitle && newTitle !== card.title) {
        await this.plugin.updateCardTitle(card, newTitle);
      }

      const nextCategory = String(values.category || "");
      const nextPriority = String(values.priority || "");
      const nextDueInput = String(values.due || "");
      const nextDue = normalizeDateInput(nextDueInput);
      if (nextDueInput.trim() && !nextDue) {
        new Notice(t("view.task.invalid_due_date"));
        return;
      }

      const nextTagsInput = String(values.tags || "");
      const nextTags = splitCsv(nextTagsInput);

      await this.plugin.updateCardFields(card, {
        [eff.categoryField]: nextCategory.trim(),
        [eff.priorityField]: nextPriority.trim(),
        [eff.dueDateField]: nextDue || "",
        [eff.tagsField]: nextTags,
      }, this.boardId);

      await this.reload();
    }

    filteredCards() {
      const eff = this.plugin.getEffectiveSettings(this.boardId);
      const autoArchiveDays = Number(eff.autoArchiveDays) || 0;
      const now = new Date();

      return this.cards.filter((card) => {
        if (autoArchiveDays > 0 && (card.status || "").toLowerCase() === "done" && card.dueDate) {
          const dueDate = new Date(`${card.dueDate}T00:00:00`);
          if (!Number.isNaN(dueDate.getTime())) {
            const daysSince = Math.round((now.getTime() - dueDate.getTime()) / 86400000);
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
          const haystack = [card.title, card.category, card.priority, card.dueDate, ...(card.tags || [])]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          if (!haystack.includes(this.filters.text)) return false;
        }

        return true;
      });
    }

    /* ── Pointer-based drag & drop ── */

    _startDrag(e, cardEl, card) {
      if (this.bulkManager.enabled) return; // no drag in bulk mode
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

      /* floating ghost that follows the cursor */
      const ghost = cardEl.cloneNode(true);
      ghost.className = "smart-kanban-card smart-kanban-drag-ghost";
      ghost.style.cssText = `position:fixed;z-index:9999;width:${rect.width}px;pointer-events:none;opacity:0.85;transform:rotate(2deg);box-shadow:0 8px 24px rgba(0,0,0,0.18);`;
      ghost.style.left = `${rect.left}px`;
      ghost.style.top = `${rect.top}px`;
      document.body.appendChild(ghost);

      /* placeholder gap that shows where the card will land */
      const placeholder = document.createElement("div");
      placeholder.className = "smart-kanban-drop-placeholder";
      placeholder.style.height = `${rect.height}px`;

      /* insert placeholder where the card currently is, then hide card */
      cardEl.parentElement.insertBefore(placeholder, cardEl);
      cardEl.classList.add("is-dragging-source");

      this._drag = {
        card,
        cardEl,
        ghost,
        placeholder,
        offsetX: startX - rect.left,
        offsetY: startY - rect.top,
        targetStatus: card.status || this.plugin.getDefaultStatus(this.boardId),
        isOverValidTarget: true,
      };
    }

    _moveDrag(cx, cy) {
      const d = this._drag;
      if (!d) return;

      d.ghost.style.left = `${cx - d.offsetX}px`;
      d.ghost.style.top = `${cy - d.offsetY}px`;

      /* remove lane highlight */
      this.boardEl.querySelectorAll(".is-drag-target").forEach((el) => el.classList.remove("is-drag-target"));

      /* find which card-list the pointer is over */
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

      /* find insertion point among real cards (skip hidden source card) */
      const cardEls = [...targetList.querySelectorAll(".smart-kanban-card:not(.is-dragging-source)")];
      let insertBefore = null;
      for (const c of cardEls) {
        const cr = c.getBoundingClientRect();
        if (cy < cr.top + cr.height / 2) {
          insertBefore = c;
          break;
        }
      }

      /* move placeholder to the target position */
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
        /* pointer was outside all lanes — restore card to original position */
        d.placeholder.replaceWith(d.cardEl);
        d.cardEl.classList.remove("is-dragging-source");
        return;
      }

      /* move the real card element to where the placeholder is */
      d.placeholder.replaceWith(d.cardEl);
      d.cardEl.classList.remove("is-dragging-source");

      /* read DOM order for ALL visible lanes and persist to data.json */
      const orderTarget = this.boardId ? this.plugin.getBoard(this.boardId) : this.plugin.settings;
      if (!orderTarget) return;
      if (!orderTarget.cardOrder || typeof orderTarget.cardOrder !== "object") orderTarget.cardOrder = {};
      const allLists = this.boardEl.querySelectorAll(".smart-kanban-card-list");
      for (const list of allLists) {
        const cardEls = list.querySelectorAll(".smart-kanban-card");
        for (let i = 0; i < cardEls.length; i++) {
          const id = cardEls[i].dataset.cardId;
          if (id) orderTarget.cardOrder[id] = i * 1000;
        }
      }
      await this.plugin.saveSettings();

      /* update status if moved to a different lane */
      const oldStatus = d.card.status || this.plugin.getDefaultStatus(this.boardId);
      const targetStatus = d.targetStatus;
      if (targetStatus !== oldStatus) {
        await this.plugin.updateCardStatus(d.card, targetStatus, this.boardId);
      }

      /* delayed reload to sync metadata changes without flickering */
      if (this._dragReloadTimer) clearTimeout(this._dragReloadTimer);
      this._dragReloadTimer = setTimeout(() => this.reload(), 1500);
    }

    async onClose() {
      this._cancelDrag();
      this._virtualizer.destroyAll();
      for (const cleanup of this._dropdownCleanups) cleanup();
      this._dropdownCleanups = [];
      if (this._dragReloadTimer) {
        clearTimeout(this._dragReloadTimer);
        this._dragReloadTimer = null;
      }
      if (this._keyHandler) {
        this.containerEl.removeEventListener("keydown", this._keyHandler);
        this._keyHandler = null;
      }
      if (this._clickOutsideHandler) {
        document.removeEventListener("click", this._clickOutsideHandler);
        this._clickOutsideHandler = null;
      }
    }
  }

  return { SmartKanbanView };
};

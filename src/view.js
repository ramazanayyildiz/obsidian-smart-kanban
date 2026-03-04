module.exports = function createView({ ItemView, TFile, Notice, setIcon, VIEW_TYPE_SMART_KANBAN, normalizeDateInput, splitCsv }) {

  class SmartKanbanView extends ItemView {
    constructor(leaf, plugin) {
      super(leaf);
      this.plugin = plugin;
      this.cards = [];
      this.currentPreset = "";
      this.filters = this.plugin.createEmptyFilters();
      this.filtersCollapsed = false;
      this._dropdownCleanups = [];
      this.collapsedLanes = new Set();
      this.viewMode = "board";
      this._drag = null;
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
          this.containerEl.querySelectorAll(".smart-kanban-overflow-menu").forEach((m) => { m.style.display = "none"; });
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
        "--sk-font-family": theme.fontFamily,
      };
      for (const [prop, value] of Object.entries(props)) {
        if (value) el.style.setProperty(prop, value);
        else el.style.removeProperty(prop);
      }
    }

    renderBoardTabs() {
      this.boardTabsEl.empty();
      const boards = this.plugin.settings.boards || [];

      const defaultTab = this.boardTabsEl.createEl("button", {
        text: "Default Board",
        cls: `smart-kanban-board-tab ${!this.boardId ? "is-active" : ""}`,
      });
      defaultTab.addEventListener("click", () => this.switchBoard(""));

      for (const board of boards) {
        const label = board.name + (board.type === "filtered-view" ? " (view)" : "");
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
      this.clearFilters();
      this.renderBoardTabs();
      this.buildHeader();
      await this.reload();
    }

    async reload() {
      this.cards = await this.plugin.collectCards(this.boardId);
      this.applyTheme();
      this.renderFilters();
      this.renderContent();
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
        cls: "smart-kanban-search-input",
      });
      searchInput.value = this.filters.text;
      searchInput.addEventListener("input", () => {
        this.filters.text = searchInput.value.trim().toLowerCase();
        this.currentPreset = "";
        this.renderBoard();
      });
      const searchIcon = searchWrap.createSpan({ cls: "smart-kanban-search-icon" });
      setIcon(searchIcon, "search");

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
        { key: "list", icon: "list", label: "View as list" },
      ];
      const currentMode = modes.find((m) => m.key === this.viewMode) || modes[0];
      const btn = wrap.createEl("button", { cls: "smart-kanban-icon-btn", attr: { title: currentMode.label } });
      setIcon(btn, currentMode.icon);

      const dropdown = wrap.createDiv({ cls: "smart-kanban-viewmode-dropdown" });
      dropdown.style.display = "none";

      for (const mode of modes) {
        const item = dropdown.createDiv({ cls: `smart-kanban-viewmode-item ${this.viewMode === mode.key ? "is-active" : ""}` });
        const iconEl = item.createSpan({ cls: "smart-kanban-viewmode-item-icon" });
        setIcon(iconEl, mode.icon);
        item.createSpan({ text: mode.label });
        if (this.viewMode === mode.key) {
          const check = item.createSpan({ cls: "smart-kanban-viewmode-check" });
          setIcon(check, "check");
        }
        item.addEventListener("click", () => {
          this.viewMode = mode.key;
          dropdown.style.display = "none";
          this.buildHeader();
          this.renderContent();
        });
      }

      const closeDropdown = (e) => { if (!wrap.contains(e.target)) dropdown.style.display = "none"; };
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === "none" ? "" : "none";
        document.addEventListener("click", closeDropdown, { once: true });
      });
    }

    createIconBtn(parent, icon, title, onClick) {
      const btn = parent.createEl("button", { cls: "smart-kanban-icon-btn", attr: { title, "aria-label": title } });
      setIcon(btn, icon);
      btn.addEventListener("click", async (e) => { e.stopPropagation(); await onClick(); });
      return btn;
    }

    async configureBoardInteractive() {
      const result = await this.plugin.openDragReorderModal({
        title: "Configure Board",
        sections: [
          {
            key: "statuses",
            label: "Lanes / Statuses",
            items: [...this.plugin.getStatusOrder()],
          },
          {
            key: "customFields",
            label: "Custom Fields",
            items: [...this.plugin.getCustomFieldKeys()],
          },
        ],
      });
      if (!result) return;

      this.plugin.settings.statusOrder = (result.statuses || []).join(", ");
      this.plugin.settings.customFields = (result.customFields || []).join(", ");
      await this.plugin.saveSettings();
      await this.reload();
      new Notice("Board configuration updated.");
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
        new Notice("Task title is required.");
        return;
      }

      const status = String(values.status || "").trim() || defaultStatus;
      const category = String(values.category || "").trim();
      const priority = String(values.priority || "").trim();
      const dueInput = String(values.due || "");
      const tagsInput = String(values.tags || "");

      const dueDate = normalizeDateInput(dueInput);
      if (dueInput.trim() && !dueDate) {
        new Notice("Invalid due date. Use YYYY-MM-DD.");
        return;
      }

      const tags = splitCsv(tagsInput);

      await this.plugin.createTaskEntry(title.trim(), {
        [this.plugin.settings.statusField]: (status || defaultStatus).trim() || defaultStatus,
        [this.plugin.settings.categoryField]: category.trim(),
        [this.plugin.settings.priorityField]: priority.trim(),
        [this.plugin.settings.dueDateField]: dueDate,
        [this.plugin.settings.tagsField]: tags,
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
          if (!select.value) { this.currentPreset = ""; return; }
          this.applyPreset(select.value);
        });

        if (this.currentPreset) {
          const deleteBtn = wrap.createEl("button", { cls: "smart-kanban-icon-btn-sm", attr: { title: "Delete view" } });
          setIcon(deleteBtn, "trash-2");
          deleteBtn.addEventListener("click", () => this.deleteCurrentPresetInteractive());
        }
      }

      const saveBtn = wrap.createEl("button", { cls: "smart-kanban-icon-btn-sm", attr: { title: "Save current filters as view" } });
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
        new Notice(`Preset not found: ${name}`);
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
            value: this.currentPreset || "",
          },
        ],
      });
      if (!values) return;

      const normalizedName = String(values.name || "").trim();
      if (!normalizedName) return;

      await this.plugin.saveFilterPreset(normalizedName, this.filters);
      this.currentPreset = normalizedName;
      this.renderFilters();
      new Notice(`Saved view: ${normalizedName}`);
    }

    async deleteCurrentPresetInteractive() {
      if (!this.currentPreset) return;

      const name = this.currentPreset;
      const confirmed = await this.plugin.openConfirmModal({
        title: "Delete Preset",
        message: `Delete preset "${name}"?`,
        confirmText: "Delete",
      });
      if (!confirmed) return;

      await this.plugin.deleteFilterPreset(name);
      this.currentPreset = "";
      this.renderFilters();
      new Notice(`Deleted view: ${name}`);
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
          cls: "smart-kanban-collapse-icon",
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

          /* drop targets are handled by pointer-based drag system */

          for (const card of laneCards) {
            this.renderCard(list, card);
          }

          const quickAdd = lane.createDiv({ cls: "smart-kanban-quick-add" });
          const quickInput = quickAdd.createEl("input", {
            type: "text",
            placeholder: "Add task...",
            cls: "smart-kanban-quick-add-input",
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
              [s.tagsField]: "",
            });
            quickInput.value = "";
            await this.reload();
          };
          quickBtn.addEventListener("click", doQuickAdd);
          quickInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") { e.preventDefault(); doQuickAdd(); }
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
          if (file instanceof TFile) await this.app.workspace.getLeaf(true).openFile(file);
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
            if (file instanceof TFile) await this.app.workspace.getLeaf(true).openFile(file);
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
        if (file instanceof TFile) {
          await this.app.workspace.getLeaf(true).openFile(file);
        }
      });

      const overflowWrap = titleRow.createDiv({ cls: "smart-kanban-overflow-wrap" });
      const overflowBtn = overflowWrap.createEl("button", { cls: "smart-kanban-overflow-btn" });
      setIcon(overflowBtn, "more-horizontal");

      const badges = cardEl.createDiv({ cls: "smart-kanban-card-badges" });

      if (card.category) {
        badges.createSpan({ text: card.category, cls: "smart-kanban-badge smart-kanban-badge-category" });
      }
      if (card.priority) {
        const prioSlug = card.priority.toLowerCase().replace(/\s+/g, "-");
        badges.createSpan({
          text: card.priority,
          cls: `smart-kanban-badge smart-kanban-priority-badge smart-kanban-priority-${prioSlug}`,
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
          if (m !== menu) m.style.display = "none";
        });
        menu.style.display = menu.style.display === "none" ? "" : "none";
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
        if (file instanceof TFile) {
          await this.app.workspace.getLeaf(true).openFile(file);
        }
      });

      const completeItem = menu.createDiv({ text: "Mark Done", cls: "smart-kanban-menu-item" });
      completeItem.addEventListener("click", async () => {
        menu.style.display = "none";
        await this.plugin.updateCardStatus(card, "Done");
        await this.reload();
        new Notice(`Completed: ${card.title}`);
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
        confirmText: "Delete",
      });
      if (!confirmed) return;
      if (card.kind === "task") {
        await this.plugin.deleteTaskLine(card);
      } else {
        await this.plugin.deleteNoteCard(card);
      }
      await this.reload();
      new Notice(`Deleted: ${card.title}`);
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
        new Notice("Invalid due date. Use YYYY-MM-DD.");
        return;
      }

      const nextTagsInput = String(values.tags || "");
      const nextTags = splitCsv(nextTagsInput);

      await this.plugin.updateCardFields(card, {
        [this.plugin.settings.categoryField]: nextCategory.trim(),
        [this.plugin.settings.priorityField]: nextPriority.trim(),
        [this.plugin.settings.dueDateField]: nextDue || "",
        [this.plugin.settings.tagsField]: nextTags,
      });

      await this.reload();
    }

    filteredCards() {
      const autoArchiveDays = Number(this.plugin.settings.autoArchiveDays) || 0;
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

        if (!started) return;
        await this._finishDrag();
      };

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
      cardEl.style.display = "none";

      this._drag = {
        card,
        cardEl,
        ghost,
        placeholder,
        offsetX: startX - rect.left,
        offsetY: startY - rect.top,
        targetStatus: card.status || "Todo",
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

      if (!targetList) return;

      d.targetStatus = targetList.dataset.status;
      targetList.classList.add("is-drag-target");

      /* find insertion point among real cards (skip placeholder) */
      const cardEls = [...targetList.querySelectorAll(".smart-kanban-card:not([style*='display: none'])")];
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

      const targetStatus = d.targetStatus;

      if (!targetStatus) {
        /* no valid target — restore card to original position */
        d.placeholder.replaceWith(d.cardEl);
        d.cardEl.style.display = "";
        return;
      }

      /* move the real card element to where the placeholder is */
      d.placeholder.replaceWith(d.cardEl);
      d.cardEl.style.display = "";

      /* read DOM order for ALL visible lanes and persist to data.json */
      if (!this.plugin.settings.cardOrder) this.plugin.settings.cardOrder = {};
      const allLists = this.boardEl.querySelectorAll(".smart-kanban-card-list");
      for (const list of allLists) {
        const cardEls = list.querySelectorAll(".smart-kanban-card");
        for (let i = 0; i < cardEls.length; i++) {
          const id = cardEls[i].dataset.cardId;
          if (id) this.plugin.settings.cardOrder[id] = i * 1000;
        }
      }
      await this.plugin.saveSettings();

      /* update status if moved to a different lane */
      const oldStatus = d.card.status || "Todo";
      if (targetStatus !== oldStatus) {
        await this.plugin.updateCardStatus(d.card, targetStatus);
      }

      /* delayed reload to sync metadata changes without flickering */
      if (this._dragReloadTimer) clearTimeout(this._dragReloadTimer);
      this._dragReloadTimer = setTimeout(() => this.reload(), 1500);
    }

    async onClose() {
      if (this._clickOutsideHandler) {
        document.removeEventListener("click", this._clickOutsideHandler);
      }
    }
  }

  return { SmartKanbanView };
};

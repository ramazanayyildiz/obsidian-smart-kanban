module.exports = function createView({ ItemView, TFile, Notice, VIEW_TYPE_SMART_KANBAN, normalizeDateInput, splitCsv }) {

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
      this.renderBoard();
    }

    buildHeader() {
      this.headerEl.empty();

      const title = this.headerEl.createEl("h2", { text: "Smart Kanban" });
      title.addClass("smart-kanban-title");

      const actions = this.headerEl.createDiv({ cls: "smart-kanban-actions" });

      const searchInput = actions.createEl("input", {
        type: "text",
        placeholder: "Search...",
        cls: "smart-kanban-header-search",
      });
      searchInput.value = this.filters.text;
      searchInput.addEventListener("input", () => {
        this.filters.text = searchInput.value.trim().toLowerCase();
        this.currentPreset = "";
        this.renderBoard();
      });

      const filterToggle = actions.createEl("button", {
        text: this.filtersCollapsed ? "Show Filters" : "Hide Filters",
      });
      filterToggle.addEventListener("click", () => {
        this.filtersCollapsed = !this.filtersCollapsed;
        filterToggle.textContent = this.filtersCollapsed ? "Show Filters" : "Hide Filters";
        this.filtersEl.style.display = this.filtersCollapsed ? "none" : "";
      });

      const newBtn = actions.createEl("button", { text: "New Task" });
      newBtn.addEventListener("click", async () => {
        await this.createTaskInteractive();
      });

      const refreshBtn = actions.createEl("button", { text: "Refresh" });
      refreshBtn.addEventListener("click", async () => {
        await this.reload();
      });

      const configureBtn = actions.createEl("button", { text: "Configure Board" });
      configureBtn.addEventListener("click", async () => {
        await this.configureBoardInteractive();
      });

      const savePresetBtn = actions.createEl("button", { text: "Save View" });
      savePresetBtn.addEventListener("click", async () => {
        await this.savePresetInteractive();
      });
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

      const categories = this.uniqueValues("category");
      const priorities = this.uniqueValues("priority");
      const tags = this.uniqueTagValues();

      this.renderPresetControls();
      this.renderDropdownFilter("Category", categories, "categories");
      this.renderDropdownFilter("Priority", priorities, "priorities");
      this.renderDropdownFilter("Tag", tags, "tags");
    }

    renderPresetControls() {
      const wrap = this.filtersEl.createDiv({ cls: "smart-kanban-filter smart-kanban-presets" });
      wrap.createEl("label", { text: "Saved Views" });

      const row = wrap.createDiv({ cls: "smart-kanban-presets-row" });

      const select = row.createEl("select");
      select.createEl("option", { text: "Custom", value: "" });
      const names = Object.keys(this.plugin.settings.filterPresets || {}).sort((a, b) =>
        a.localeCompare(b)
      );

      for (const name of names) {
        select.createEl("option", { text: name, value: name });
      }

      select.value = this.currentPreset;
      select.addEventListener("change", () => {
        if (!select.value) {
          this.currentPreset = "";
          this.renderPresetControls();
          return;
        }
        this.applyPreset(select.value);
      });

      const saveBtn = row.createEl("button", { text: "Save" });
      saveBtn.addEventListener("click", async () => {
        await this.savePresetInteractive();
      });

      const deleteBtn = row.createEl("button", { text: "Delete" });
      deleteBtn.disabled = !this.currentPreset;
      deleteBtn.addEventListener("click", async () => {
        await this.deleteCurrentPresetInteractive();
      });

      const clearBtn = row.createEl("button", { text: "Clear" });
      clearBtn.addEventListener("click", () => {
        this.clearFilters();
        this.renderFilters();
        this.renderBoard();
      });
    }

    renderDropdownFilter(label, values, key) {
      const wrap = this.filtersEl.createDiv({ cls: "smart-kanban-filter smart-kanban-dropdown-filter" });
      const selected = this.filters[key] || [];
      const btnText = selected.length === 0 ? `All ${label}` : `${selected.length} selected`;
      const trigger = wrap.createEl("button", { text: btnText, cls: "smart-kanban-dropdown-trigger" });

      const panel = wrap.createDiv({ cls: "smart-kanban-dropdown-panel" });
      panel.style.display = "none";

      let isOpen = false;

      const closePanel = () => {
        isOpen = false;
        panel.style.display = "none";
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
        document.addEventListener("click", outsideClick, true);
      });

      this._dropdownCleanups.push(() => {
        document.removeEventListener("click", outsideClick, true);
      });

      if (!values.length) {
        panel.createSpan({ text: "No values available", cls: "smart-kanban-empty" });
        return;
      }

      for (const value of values) {
        const row = panel.createDiv({ cls: "smart-kanban-dropdown-item" });
        const checkbox = row.createEl("input", { type: "checkbox" });
        checkbox.checked = selected.includes(value);
        row.createSpan({ text: value });
        checkbox.addEventListener("change", () => {
          this.toggleFilterValue(key, value);
          trigger.textContent = this.filters[key].length === 0 ? `All ${label}` : `${this.filters[key].length} selected`;
        });
        row.addEventListener("click", (event) => {
          if (event.target !== checkbox) {
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event("change"));
          }
        });
      }

      const clearAll = panel.createEl("button", { text: "Clear all", cls: "smart-kanban-dropdown-clear" });
      clearAll.addEventListener("click", () => {
        this.filters[key] = [];
        this.currentPreset = "";
        panel.querySelectorAll("input[type=checkbox]").forEach((cb) => { cb.checked = false; });
        trigger.textContent = `All ${label}`;
        this.renderBoard();
      });
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

          list.addEventListener("dragover", (event) => {
            event.preventDefault();
            list.addClass("is-drag-target");
            lane.addClass("is-drag-target");

            const indicator = list.querySelector(".smart-kanban-drop-indicator");
            if (indicator) indicator.remove();
            const cards = [...list.querySelectorAll(".smart-kanban-card")];
            let insertBefore = null;
            for (const c of cards) {
              const cRect = c.getBoundingClientRect();
              if (event.clientY < cRect.top + cRect.height / 2) {
                insertBefore = c;
                break;
              }
            }
            const line = document.createElement("div");
            line.className = "smart-kanban-drop-indicator";
            if (insertBefore) {
              list.insertBefore(line, insertBefore);
            } else {
              list.appendChild(line);
            }
          });

          list.addEventListener("dragleave", (event) => {
            if (!list.contains(event.relatedTarget)) {
              list.removeClass("is-drag-target");
              lane.removeClass("is-drag-target");
              const indicator = list.querySelector(".smart-kanban-drop-indicator");
              if (indicator) indicator.remove();
            }
          });

          list.addEventListener("drop", async (event) => {
            event.preventDefault();
            list.removeClass("is-drag-target");
            lane.removeClass("is-drag-target");
            const indicator = list.querySelector(".smart-kanban-drop-indicator");
            if (indicator) indicator.remove();
            document.querySelectorAll(".is-drag-target").forEach((el) => el.removeClass ? el.removeClass("is-drag-target") : el.classList.remove("is-drag-target"));

            const id = event.dataTransfer.getData("text/plain");
            if (!id) return;

            const card = this.cards.find((c) => c.id === id);
            if (!card) return;

            await this.plugin.updateCardStatus(card, status);
            await this.reload();
          });

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
            await this.plugin.createTaskEntry(title, {
              [this.plugin.settings.statusField]: status,
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

    renderCard(parent, card) {
      const cardEl = parent.createDiv({ cls: "smart-kanban-card" });
      cardEl.setAttr("draggable", "true");
      cardEl.setAttr("tabindex", "0");
      cardEl.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", card.id);
        cardEl.addClass("is-dragging");
      });
      cardEl.addEventListener("dragend", () => {
        cardEl.removeClass("is-dragging");
      });

      if (card.dueInfo && card.dueInfo.cls) {
        cardEl.addClass(card.dueInfo.cls);
      }

      const titleRow = cardEl.createDiv({ cls: "smart-kanban-card-title" });

      const completeBtn = titleRow.createEl("button", { cls: "smart-kanban-complete-btn" });
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "14");
      svg.setAttribute("height", "14");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("fill", "none");
      svg.setAttribute("stroke", "currentColor");
      svg.setAttribute("stroke-width", "2");
      const svgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      svgRect.setAttribute("x", "3");
      svgRect.setAttribute("y", "3");
      svgRect.setAttribute("width", "18");
      svgRect.setAttribute("height", "18");
      svgRect.setAttribute("rx", "3");
      svg.appendChild(svgRect);
      completeBtn.appendChild(svg);
      completeBtn.setAttr("aria-label", "Complete");
      completeBtn.addEventListener("click", async (event) => {
        event.stopPropagation();
        await this.plugin.updateCardStatus(card, "Done");
        await this.reload();
        new Notice(`Completed: ${card.title}`);
      });

      const link = titleRow.createEl("a", { text: card.title, href: "#", cls: "smart-kanban-card-title-link" });
      link.addEventListener("click", async (event) => {
        event.preventDefault();
        const file = this.app.vault.getAbstractFileByPath(card.path);
        if (file instanceof TFile) {
          await this.app.workspace.getLeaf(true).openFile(file);
        }
      });

      if (card.dueInfo) {
        titleRow.createSpan({ text: card.dueInfo.label, cls: "smart-kanban-due-badge" });
      }

      if (card.priority) {
        const prioSlug = card.priority.toLowerCase().replace(/\s+/g, "-");
        cardEl.createSpan({
          text: card.priority,
          cls: `smart-kanban-priority-badge smart-kanban-priority-${prioSlug}`,
        });
      }

      if (card.preview) {
        cardEl.createDiv({ cls: "smart-kanban-card-preview", text: card.preview });
      }

      const meta = cardEl.createDiv({ cls: "smart-kanban-card-meta" });
      for (const [label, value] of this.plugin.getCardMetaEntries(card)) {
        meta.createSpan({ text: `${label}: ${value || "-"}` });
      }

      if (card.tags && card.tags.length) {
        const tagsWrap = cardEl.createDiv({ cls: "smart-kanban-card-tags" });
        for (const tag of card.tags) {
          tagsWrap.createSpan({ text: tag, cls: "smart-kanban-tag" });
        }
      }

      const actions = cardEl.createDiv({ cls: "smart-kanban-card-actions" });
      const overflowBtn = actions.createEl("button", { text: "\u00B7\u00B7\u00B7", cls: "smart-kanban-overflow-btn" });
      const menu = actions.createDiv({ cls: "smart-kanban-overflow-menu" });
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
  }

  return { SmartKanbanView };
};

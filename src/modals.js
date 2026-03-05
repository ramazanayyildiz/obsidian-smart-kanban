module.exports = function createModals({ Modal, Notice, t = (k) => k }) {
  function tx(key, fallback, params) {
    const value = t(key, params);
    return value === key ? fallback : value;
  }

  class BoardManagerModal extends Modal {
    constructor(app, plugin, options) {
      super(app);
      this.plugin = plugin;
      this.options = options || {};
    }

    onOpen() {
      const { contentEl, titleEl } = this;
      titleEl.setText(t("modal.board_manager.title"));
      this.renderContent();
    }

    normalizeBoardName(name) {
      return String(name || "").trim().toLowerCase();
    }

    boardNameExists(name, excludeBoardId = "") {
      const normalized = this.normalizeBoardName(name);
      if (!normalized) return false;
      return (this.plugin.settings.boards || []).some((board) => {
        if (excludeBoardId && board.id === excludeBoardId) return false;
        return this.normalizeBoardName(board.name) === normalized;
      });
    }

    createBoardId() {
      return `board-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    }

    createEmptyBoard(type = "independent") {
      return {
        id: this.createBoardId(),
        name: "",
        type: type === "filtered-view" ? "filtered-view" : "independent",
        parentBoardId: null,
        visibleStatuses: null,
        defaultFilters: null,
        sourceMode: null,
        sourceFolder: null,
        includeSubfolders: null,
        taskInboxFile: null,
        noteTemplate: null,
        statusField: null,
        categoryField: null,
        priorityField: null,
        tagsField: null,
        dueDateField: null,
        customFields: null,
        statusOrder: null,
        priorityOrder: null,
        sortBy: null,
        sortDirection: null,
        dueSoonDays: null,
        wipLimits: null,
        autoArchiveDays: null,
        dateFormat: null,
        dateDisplayFormat: null,
        showRelativeDate: null,
        tagColors: null,
        categoryColors: null,
        theme: null,
        cardOrder: null,
      };
    }

    renderContent() {
      const { contentEl } = this;
      contentEl.empty();
      const boards = this.plugin.settings.boards || [];

      if (boards.length === 0) {
        contentEl.createEl("p", { text: t("modal.board_manager.no_boards") });
      }

      for (const board of boards) {
        const row = contentEl.createDiv({ cls: "smart-kanban-board-manager-row" });
        row.createSpan({ text: `${board.name} (${board.type})`, cls: "smart-kanban-board-manager-name" });
        const editBtn = row.createEl("button", { text: t("common.edit") });
        editBtn.addEventListener("click", async () => {
          await this.editBoard(board);
        });
        const cloneBtn = row.createEl("button", { text: tx("modal.board.clone", "Clone") });
        cloneBtn.addEventListener("click", async () => {
          await this.cloneBoard(board);
        });
        const deleteBtn = row.createEl("button", { text: t("common.delete"), cls: "mod-warning" });
        deleteBtn.addEventListener("click", async () => {
          const childBoards = (this.plugin.settings.boards || []).filter((b) => b.parentBoardId === board.id);
          const message = childBoards.length
            ? tx("modal.board.delete_with_children", `Delete "${board.name}"? ${childBoards.length} child board(s) will be detached.`, { name: board.name, count: childBoards.length })
            : tx("modal.board.delete_confirm", `Delete "${board.name}"?`, { name: board.name });
          const confirmed = await this.plugin.openConfirmModal({
            title: tx("modal.board.delete_title", "Delete Board"),
            message,
            confirmText: t("common.delete"),
          });
          if (!confirmed) return;

          for (const child of childBoards) child.parentBoardId = null;
          this.plugin.settings.boards = this.plugin.settings.boards.filter((b) => b.id !== board.id);
          if (this.plugin.settings.activeBoardId === board.id) this.plugin.settings.activeBoardId = "";
          await this.plugin.saveSettings();
          this.plugin.refreshViews();
          this.renderContent();
        });
      }

      const actions = contentEl.createDiv({ cls: "smart-kanban-modal-actions" });
      const createBtn = actions.createEl("button", { text: t("modal.board_manager.create_new"), cls: "mod-cta" });
      createBtn.addEventListener("click", async () => {
        await this.createBoard();
      });
      const closeBtn = actions.createEl("button", { text: t("common.close") });
      closeBtn.addEventListener("click", () => {
        if (typeof this.options.onClose === "function") this.options.onClose();
        this.close();
      });
    }

    async createBoard() {
      const boardChoices = this.plugin.settings.boards || [];
      const values = await this.plugin.openFormModal({
        title: tx("modal.board_create.title", "Create Board"),
        submitText: t("common.create"),
        fields: [
          { key: "name", label: tx("modal.board.field.name", "Board name"), value: "" },
          { key: "type", label: tx("modal.board.field.type", "Type"), value: "independent", type: "select", options: ["independent", "filtered-view"] },
          {
            key: "parentBoardId",
            label: tx("modal.board.field.parent", "Parent board (filtered-view)"),
            value: "",
            type: "select",
            options: ["", ...boardChoices.map((b) => b.id)],
            optionLabels: { "": tx("modal.board.field.parent.none", "None"), ...Object.fromEntries(boardChoices.map((b) => [b.id, b.name])) },
          },
          {
            key: "cloneFrom",
            label: tx("modal.board.field.clone_from", "Clone settings from"),
            value: "",
            type: "select",
            options: ["", ...boardChoices.map((b) => b.id)],
            optionLabels: { "": tx("modal.board.field.clone_from.none", "None (start empty)"), ...Object.fromEntries(boardChoices.map((b) => [b.id, b.name])) },
          },
          { key: "visibleStatuses", label: tx("modal.board.field.visible_statuses", "Visible statuses (filtered-view, comma-sep)"), value: "" },
        ],
      });
      if (!values) return;
      const name = String(values.name || "").trim();
      if (!name) { new Notice(t("modal.board_create.name_required")); return; }
      if (this.boardNameExists(name)) {
        new Notice(tx("modal.board.name_duplicate", "Board name already exists."));
        return;
      }

      const id = this.createBoardId();
      if (!this.plugin.settings.boards) this.plugin.settings.boards = [];
      const type = values.type === "filtered-view" ? "filtered-view" : "independent";
      const board = this.createEmptyBoard(type);
      board.id = id;
      board.name = name;
      board.type = type;
      const parentBoardId = String(values.parentBoardId || "");
      board.parentBoardId = type === "filtered-view" && parentBoardId ? parentBoardId : null;
      board.visibleStatuses = type === "filtered-view" ? (String(values.visibleStatuses || "").trim() || null) : null;

      const cloneFrom = String(values.cloneFrom || "").trim();
      if (cloneFrom) {
        const src = (this.plugin.settings.boards || []).find((b) => b.id === cloneFrom);
        if (src) {
          const cloned = JSON.parse(JSON.stringify(src));
          Object.assign(board, cloned, {
            id,
            name,
            type,
            parentBoardId: board.parentBoardId,
            visibleStatuses: board.visibleStatuses || cloned.visibleStatuses || null,
          });
        }
      }

      this.plugin.settings.boards.push(board);
      await this.plugin.saveSettings();
      this.plugin.refreshViews();
      this.renderContent();
      new Notice(t("modal.board_create.created_notice", { name }));
    }

    async cloneBoard(board) {
      if (!board) return;
      const baseName = tx("modal.board.clone_suffix", "{name} Copy", { name: board.name || "Board" });
      let candidate = baseName;
      let i = 2;
      while (this.boardNameExists(candidate)) {
        candidate = `${baseName} ${i}`;
        i += 1;
      }
      const clone = JSON.parse(JSON.stringify(board));
      clone.id = this.createBoardId();
      clone.name = candidate;
      clone.parentBoardId = board.type === "filtered-view" ? board.parentBoardId || null : null;
      if (!Array.isArray(this.plugin.settings.boards)) this.plugin.settings.boards = [];
      this.plugin.settings.boards.push(clone);
      await this.plugin.saveSettings();
      this.plugin.refreshViews();
      this.renderContent();
      new Notice(tx("modal.board.clone_notice", "Board cloned: {name}", { name: candidate }));
    }

    async editBoard(board) {
      const boardChoices = (this.plugin.settings.boards || []).filter((b) => b.id !== board.id);
      const values = await this.plugin.openFormModal({
        title: tx("modal.board_edit.title", "Edit Board: {name}", { name: board.name }),
        submitText: t("common.save"),
        fields: [
          { key: "name", label: tx("modal.board.field.name", "Board name"), value: board.name || "" },
          { key: "type", label: tx("modal.board.field.type", "Type"), value: board.type || "independent", type: "select", options: ["independent", "filtered-view"] },
          {
            key: "parentBoardId",
            label: tx("modal.board.field.parent", "Parent board (filtered-view)"),
            value: board.parentBoardId || "",
            type: "select",
            options: ["", ...boardChoices.map((b) => b.id)],
            optionLabels: { "": tx("modal.board.field.parent.none", "None"), ...Object.fromEntries(boardChoices.map((b) => [b.id, b.name])) },
          },
          { key: "visibleStatuses", label: tx("modal.board.field.visible_statuses_short", "Visible statuses (filtered-view)"), value: board.visibleStatuses || "" },
        ],
      });
      if (!values) return;
      const nextName = String(values.name || "").trim() || board.name;
      if (!nextName) {
        new Notice(t("modal.board_create.name_required"));
        return;
      }
      if (this.boardNameExists(nextName, board.id)) {
        new Notice(tx("modal.board.name_duplicate", "Board name already exists."));
        return;
      }
      board.name = nextName;
      board.type = values.type || board.type;
      const parentBoardId = String(values.parentBoardId || "").trim();
      board.parentBoardId = board.type === "filtered-view" && parentBoardId && parentBoardId !== board.id ? parentBoardId : null;
      board.visibleStatuses = board.type === "filtered-view"
        ? (String(values.visibleStatuses || "").trim() || null)
        : null;
      await this.plugin.saveSettings();
      this.plugin.refreshViews();
      this.renderContent();
      new Notice(t("modal.board_edit.updated_notice", { name: board.name }));
    }
  }

  class DragReorderListModal extends Modal {
    constructor(app, options) {
      super(app);
      this.options = options || {};
      this.sectionData = {};
      for (const section of this.options.sections || []) {
        this.sectionData[section.key] = [...(section.items || [])];
      }
    }

    onOpen() {
      const { contentEl, titleEl } = this;
      titleEl.setText(this.options.title || tx("modal.configure.title", "Configure"));
      contentEl.empty();
      contentEl.addClass("smart-kanban-drag-modal");

      for (const section of this.options.sections || []) {
        this.renderSection(contentEl, section);
      }

      const actions = contentEl.createDiv({ cls: "smart-kanban-modal-actions" });
      const cancelBtn = actions.createEl("button", { text: t("common.cancel") });
      cancelBtn.addEventListener("click", () => {
        if (typeof this.options.onCancel === "function") this.options.onCancel();
        this.close();
      });
      const saveBtn = actions.createEl("button", { text: t("common.save"), cls: "mod-cta" });
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
          const deleteBtn = row.createSpan({ text: "\u00D7", cls: "smart-kanban-drag-delete" });

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
      const addInput = addRow.createEl("input", { type: "text", placeholder: tx("modal.drag.add_placeholder", `Add ${section.label.toLowerCase()}...`, { section: section.label.toLowerCase() }) });
      const addBtn = addRow.createEl("button", { text: t("common.add") });

      const doAdd = () => {
        const val = addInput.value.trim();
        if (!val) return;
        this.sectionData[section.key].push(val);
        addInput.value = "";
        renderList();
      };

      addBtn.addEventListener("click", doAdd);
      addInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") { e.preventDefault(); doAdd(); }
      });
    }
  }

  class SimpleFormModal extends Modal {
    constructor(app, options) {
      super(app);
      this.options = options || {};
      this.inputs = {};
    }

    onOpen() {
      const { contentEl, titleEl } = this;
      titleEl.setText(this.options.title || t("modal.form.title"));
      contentEl.empty();

      const fields = Array.isArray(this.options.fields) ? this.options.fields : [];

      for (const field of fields) {
        const row = contentEl.createDiv({ cls: "smart-kanban-modal-row" });
        row.createEl("label", { text: field.label || field.key || t("modal.form.field") });
        let input;
        if (field.type === "select") {
          input = row.createEl("select");
          const options = Array.isArray(field.options) ? field.options : [];
          const optionLabels = field.optionLabels || {};
          for (const optionValue of options) {
            const value = String(optionValue ?? "");
            const optionText = Object.prototype.hasOwnProperty.call(optionLabels, value)
              ? optionLabels[value]
              : (value === "" ? field.optionLabelEmpty || t("common.none") : value);
            input.createEl("option", { text: optionText, value });
          }
          input.value = String(field.value || "");
        } else {
          input = row.createEl("input", {
            type: field.type === "date" ? "date" : "text",
          });
          input.value = String(field.value || "");
          if (field.placeholder) input.placeholder = field.placeholder;
        }
        this.inputs[field.key] = input;
      }

      const actions = contentEl.createDiv({ cls: "smart-kanban-modal-actions" });
      const cancelBtn = actions.createEl("button", { text: t("common.cancel") });
      cancelBtn.addEventListener("click", () => {
        if (typeof this.options.onCancel === "function") this.options.onCancel();
        this.close();
      });

      const submitBtn = actions.createEl("button", {
        text: this.options.submitText || t("common.save"),
        cls: "mod-cta",
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

  class SimpleConfirmModal extends Modal {
    constructor(app, options) {
      super(app);
      this.options = options || {};
    }

    onOpen() {
      const { contentEl, titleEl } = this;
      titleEl.setText(this.options.title || t("modal.confirm.title"));
      contentEl.empty();

      contentEl.createEl("p", { text: this.options.message || t("modal.confirm.message") });

      const actions = contentEl.createDiv({ cls: "smart-kanban-modal-actions" });
      const cancelBtn = actions.createEl("button", { text: t("common.cancel") });
      cancelBtn.addEventListener("click", () => {
        if (typeof this.options.onCancel === "function") this.options.onCancel();
        this.close();
      });

      const confirmBtn = actions.createEl("button", {
        text: this.options.confirmText || t("common.confirm"),
        cls: "mod-warning",
      });
      confirmBtn.addEventListener("click", () => {
        if (typeof this.options.onConfirm === "function") this.options.onConfirm();
        this.close();
      });
    }
  }

  return {
    BoardManagerModal,
    DragReorderListModal,
    SimpleFormModal,
    SimpleConfirmModal,
  };
};

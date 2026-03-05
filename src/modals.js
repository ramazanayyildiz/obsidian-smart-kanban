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
        const deleteBtn = row.createEl("button", { text: t("common.delete"), cls: "mod-warning" });
        deleteBtn.addEventListener("click", async () => {
          this.plugin.settings.boards = this.plugin.settings.boards.filter((b) => b.id !== board.id);
          await this.plugin.saveSettings();
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
      const values = await this.plugin.openFormModal({
        title: tx("modal.board_create.title", "Create Board"),
        submitText: t("common.create"),
        fields: [
          { key: "name", label: tx("modal.board.field.name", "Board name"), value: "" },
          { key: "type", label: tx("modal.board.field.type", "Type"), value: "independent", type: "select", options: ["independent", "filtered-view"] },
          { key: "sourceFolder", label: tx("modal.board.field.source_folder", "Source folder (blank = inherit)"), value: "" },
          { key: "statusOrder", label: tx("modal.board.field.status_order", "Status order (comma-sep, blank = inherit)"), value: "" },
          { key: "visibleStatuses", label: tx("modal.board.field.visible_statuses", "Visible statuses (filtered-view, comma-sep)"), value: "" },
        ],
      });
      if (!values) return;
      const name = String(values.name || "").trim();
      if (!name) { new Notice(t("modal.board_create.name_required")); return; }

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
        sourceMode: null, includeSubfolders: null, taskInboxFile: null,
        statusField: null, categoryField: null, priorityField: null,
        tagsField: null, dueDateField: null, customFields: null,
        priorityOrder: null, sortBy: null, sortDirection: null,
        dueSoonDays: null, wipLimits: null, filterPresets: null,
        noteTemplate: null, dateFormat: null, dateDisplayFormat: null,
        showRelativeDate: null, tagColors: null, categoryColors: null,
      });
      await this.plugin.saveSettings();
      this.renderContent();
      new Notice(t("modal.board_create.created_notice", { name }));
    }

    async editBoard(board) {
      const relDateValue = board.showRelativeDate === true ? "yes" : board.showRelativeDate === false ? "no" : "";
      const values = await this.plugin.openFormModal({
        title: tx("modal.board_edit.title", "Edit Board: {name}", { name: board.name }),
        submitText: t("common.save"),
        fields: [
          { key: "name", label: tx("modal.board.field.name", "Board name"), value: board.name || "" },
          { key: "type", label: tx("modal.board.field.type", "Type"), value: board.type || "independent", type: "select", options: ["independent", "filtered-view"] },
          { key: "sourceFolder", label: tx("modal.board.field.source_folder", "Source folder (blank = inherit)"), value: board.sourceFolder || "" },
          { key: "statusOrder", label: tx("modal.board.field.status_order", "Status order (comma-sep, blank = inherit)"), value: board.statusOrder || "" },
          { key: "visibleStatuses", label: tx("modal.board.field.visible_statuses_short", "Visible statuses (filtered-view)"), value: board.visibleStatuses || "" },
          { key: "noteTemplate", label: tx("modal.board.field.note_template", "Note template (blank = inherit)"), value: board.noteTemplate || "" },
          { key: "sortBy", label: tx("modal.board.field.sort_by", "Sort by (blank = inherit)"), value: board.sortBy || "", type: "select", options: ["", "none", "priority", "due", "title"], optionLabels: { "": t("common.none") } },
          { key: "dueSoonDays", label: tx("modal.board.field.due_soon_days", "Due soon days (blank = inherit)"), value: board.dueSoonDays != null ? String(board.dueSoonDays) : "" },
          { key: "wipLimits", label: tx("modal.board.field.wip_limits", "WIP limits (blank = inherit)"), value: board.wipLimits || "" },
          { key: "dateFormat", label: tx("modal.board.field.date_format", "Date format (blank = inherit)"), value: board.dateFormat || "" },
          { key: "dateDisplayFormat", label: tx("modal.board.field.date_display_format", "Display format (blank = inherit)"), value: board.dateDisplayFormat || "" },
          { key: "showRelativeDate", label: tx("modal.board.field.show_relative_date", "Relative dates"), value: relDateValue, type: "select", options: ["", "yes", "no"], optionLabels: { "": tx("modal.board.field.show_relative_date.inherit", "Inherit"), "yes": tx("modal.board.field.show_relative_date.yes", "Yes"), "no": tx("modal.board.field.show_relative_date.no", "No") } },
          { key: "tagColors", label: tx("modal.board.field.tag_colors", "Tag colors JSON (blank = inherit)"), value: board.tagColors ? JSON.stringify(board.tagColors) : "" },
          { key: "categoryColors", label: tx("modal.board.field.category_colors", "Category colors JSON (blank = inherit)"), value: board.categoryColors ? JSON.stringify(board.categoryColors) : "" },
        ],
      });
      if (!values) return;
      board.name = String(values.name || "").trim() || board.name;
      board.type = values.type || board.type;
      board.sourceFolder = values.sourceFolder || null;
      board.statusOrder = values.statusOrder || null;
      board.visibleStatuses = values.visibleStatuses || null;
      board.noteTemplate = values.noteTemplate || null;
      board.sortBy = values.sortBy || null;
      const dueSoon = String(values.dueSoonDays || "").trim();
      board.dueSoonDays = dueSoon !== "" ? Number.parseInt(dueSoon, 10) : null;
      if (board.dueSoonDays != null && !Number.isFinite(board.dueSoonDays)) board.dueSoonDays = null;
      board.wipLimits = values.wipLimits || null;
      board.dateFormat = values.dateFormat || null;
      board.dateDisplayFormat = values.dateDisplayFormat || null;
      const relDate = String(values.showRelativeDate || "").trim();
      board.showRelativeDate = relDate === "yes" ? true : relDate === "no" ? false : null;
      try {
        const tc = String(values.tagColors || "").trim();
        board.tagColors = tc ? JSON.parse(tc) : null;
      } catch (_e) {
        new Notice(t("settings.tag_colors.invalid_json"));
      }
      try {
        const cc = String(values.categoryColors || "").trim();
        board.categoryColors = cc ? JSON.parse(cc) : null;
      } catch (_e) {
        new Notice(t("settings.category_colors.invalid_json"));
      }
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

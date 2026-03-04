module.exports = function createModals({ Modal, Notice }) {

  class BoardManagerModal extends Modal {
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
          { key: "visibleStatuses", label: "Visible statuses (filtered-view, comma-sep)", value: "" },
        ],
      });
      if (!values) return;
      const name = String(values.name || "").trim();
      if (!name) { new Notice("Board name is required."); return; }

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
      });
      await this.plugin.saveSettings();
      this.renderContent();
      new Notice(`Board created: ${name}`);
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
          { key: "visibleStatuses", label: "Visible statuses (filtered-view)", value: board.visibleStatuses || "" },
        ],
      });
      if (!values) return;
      board.name = String(values.name || "").trim() || board.name;
      board.type = values.type || board.type;
      board.sourceFolder = values.sourceFolder || null;
      board.statusOrder = values.statusOrder || null;
      board.visibleStatuses = values.visibleStatuses || null;
      await this.plugin.saveSettings();
      this.renderContent();
      new Notice(`Board updated: ${board.name}`);
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
            const value = String(optionValue ?? "");
            const optionText =
              value === "" ? field.optionLabelEmpty || "None" : value;
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
      const cancelBtn = actions.createEl("button", { text: "Cancel" });
      cancelBtn.addEventListener("click", () => {
        if (typeof this.options.onCancel === "function") this.options.onCancel();
        this.close();
      });

      const submitBtn = actions.createEl("button", {
        text: this.options.submitText || "Save",
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

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

    getBaseEffectiveSettings(board) {
      if (board && board.type === "filtered-view" && board.parentBoardId) {
        return this.plugin.getEffectiveSettings(board.parentBoardId);
      }
      return this.plugin.getEffectiveSettings("");
    }

    formatInheritLabel(value) {
      if (value === null || value === undefined || value === "") return tx("common.none", "None");
      if (typeof value === "object") return tx("common.custom", "Custom");
      return String(value);
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
          { key: "sourceFolder", label: tx("modal.board.field.source_folder", "Source folder (blank = inherit)"), value: "" },
          { key: "statusOrder", label: tx("modal.board.field.status_order", "Status order (comma-sep, blank = inherit)"), value: "" },
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
      board.sourceFolder = String(values.sourceFolder || "").trim() || null;
      board.statusOrder = String(values.statusOrder || "").trim() || null;
      board.visibleStatuses = String(values.visibleStatuses || "").trim() || null;

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
            sourceFolder: board.sourceFolder || cloned.sourceFolder || null,
            statusOrder: board.statusOrder || cloned.statusOrder || null,
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
      const base = this.getBaseEffectiveSettings(board);
      const relDateValue = board.showRelativeDate === true ? "yes" : board.showRelativeDate === false ? "no" : "";
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
          { key: "sourceMode", label: tx("modal.board.field.source_mode", "Source mode (blank = inherit)"), value: board.sourceMode || "", type: "select", options: ["", "notes", "tasks"], optionLabels: { "": tx("modal.board.inherit_current", "Inherit (current: {value})", { value: this.formatInheritLabel(base.sourceMode) }), notes: tx("settings.source_mode.notes", "Note cards"), tasks: tx("settings.source_mode.tasks", "Task lines") } },
          { key: "sourceFolder", label: tx("modal.board.field.source_folder", "Source folder (blank = inherit)"), value: board.sourceFolder || "", placeholder: this.formatInheritLabel(base.sourceFolder) },
          { key: "includeSubfolders", label: tx("modal.board.field.include_subfolders", "Include subfolders"), value: board.includeSubfolders === true ? "yes" : board.includeSubfolders === false ? "no" : "", type: "select", options: ["", "yes", "no"], optionLabels: { "": tx("modal.board.inherit_current", "Inherit (current: {value})", { value: this.formatInheritLabel(base.includeSubfolders ? tx("common.yes", "Yes") : tx("common.no", "No")) }), yes: tx("common.yes", "Yes"), no: tx("common.no", "No") } },
          { key: "taskInboxFile", label: tx("modal.board.field.task_inbox", "Task inbox file (blank = inherit)"), value: board.taskInboxFile || "", placeholder: this.formatInheritLabel(base.taskInboxFile) },
          { key: "statusField", label: tx("modal.board.field.status_field", "Status field (blank = inherit)"), value: board.statusField || "", placeholder: this.formatInheritLabel(base.statusField) },
          { key: "categoryField", label: tx("modal.board.field.category_field", "Category field (blank = inherit)"), value: board.categoryField || "", placeholder: this.formatInheritLabel(base.categoryField) },
          { key: "priorityField", label: tx("modal.board.field.priority_field", "Priority field (blank = inherit)"), value: board.priorityField || "", placeholder: this.formatInheritLabel(base.priorityField) },
          { key: "tagsField", label: tx("modal.board.field.tags_field", "Tags field (blank = inherit)"), value: board.tagsField || "", placeholder: this.formatInheritLabel(base.tagsField) },
          { key: "dueDateField", label: tx("modal.board.field.due_field", "Due date field (blank = inherit)"), value: board.dueDateField || "", placeholder: this.formatInheritLabel(base.dueDateField) },
          { key: "customFields", label: tx("modal.board.field.custom_fields", "Custom fields (blank = inherit)"), value: board.customFields || "", placeholder: this.formatInheritLabel(base.customFields) },
          { key: "statusOrder", label: tx("modal.board.field.status_order", "Status order (comma-sep, blank = inherit)"), value: board.statusOrder || "", placeholder: this.formatInheritLabel(base.statusOrder) },
          { key: "visibleStatuses", label: tx("modal.board.field.visible_statuses_short", "Visible statuses (filtered-view)"), value: board.visibleStatuses || "", placeholder: this.formatInheritLabel(base.visibleStatuses) },
          { key: "noteTemplate", label: tx("modal.board.field.note_template", "Note template (blank = inherit)"), value: board.noteTemplate || "", placeholder: this.formatInheritLabel(base.noteTemplate) },
          { key: "sortBy", label: tx("modal.board.field.sort_by", "Sort by (blank = inherit)"), value: board.sortBy || "", type: "select", options: ["", "none", "priority", "due", "title"], optionLabels: { "": tx("modal.board.inherit_current", "Inherit (current: {value})", { value: this.formatInheritLabel(base.sortBy) }), none: tx("settings.sort_by.none", "Manual (drag to reorder)"), priority: tx("settings.sort_by.priority", "Priority"), due: tx("settings.sort_by.due", "Due date"), title: tx("settings.sort_by.title", "Title") } },
          { key: "sortDirection", label: tx("modal.board.field.sort_direction", "Sort direction (blank = inherit)"), value: board.sortDirection || "", type: "select", options: ["", "asc", "desc"], optionLabels: { "": tx("modal.board.inherit_current", "Inherit (current: {value})", { value: this.formatInheritLabel(base.sortDirection) }), asc: tx("settings.sort_direction.asc", "Ascending"), desc: tx("settings.sort_direction.desc", "Descending") } },
          { key: "priorityOrder", label: tx("modal.board.field.priority_order", "Priority order (blank = inherit)"), value: board.priorityOrder || "", placeholder: this.formatInheritLabel(base.priorityOrder) },
          { key: "dueSoonDays", label: tx("modal.board.field.due_soon_days", "Due soon days (blank = inherit)"), value: board.dueSoonDays != null ? String(board.dueSoonDays) : "" },
          { key: "wipLimits", label: tx("modal.board.field.wip_limits", "WIP limits (blank = inherit)"), value: board.wipLimits || "" },
          { key: "autoArchiveDays", label: tx("modal.board.field.auto_archive_days", "Auto-archive days (blank = inherit)"), value: board.autoArchiveDays != null ? String(board.autoArchiveDays) : "" },
          { key: "dateFormat", label: tx("modal.board.field.date_format", "Date format (blank = inherit)"), value: board.dateFormat || "" },
          { key: "dateDisplayFormat", label: tx("modal.board.field.date_display_format", "Display format (blank = inherit)"), value: board.dateDisplayFormat || "" },
          { key: "showRelativeDate", label: tx("modal.board.field.show_relative_date", "Relative dates"), value: relDateValue, type: "select", options: ["", "yes", "no"], optionLabels: { "": tx("modal.board.inherit_current", "Inherit (current: {value})", { value: this.formatInheritLabel(base.showRelativeDate ? tx("common.yes", "Yes") : tx("common.no", "No")) }), "yes": tx("modal.board.field.show_relative_date.yes", "Yes"), "no": tx("modal.board.field.show_relative_date.no", "No") } },
          { key: "tagColors", label: tx("modal.board.field.tag_colors", "Tag colors JSON (blank = inherit)"), value: board.tagColors ? JSON.stringify(board.tagColors) : "" },
          { key: "categoryColors", label: tx("modal.board.field.category_colors", "Category colors JSON (blank = inherit)"), value: board.categoryColors ? JSON.stringify(board.categoryColors) : "" },
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
      board.sourceMode = String(values.sourceMode || "").trim() || null;
      board.sourceFolder = String(values.sourceFolder || "").trim() || null;
      board.includeSubfolders = values.includeSubfolders === "yes" ? true : values.includeSubfolders === "no" ? false : null;
      board.taskInboxFile = String(values.taskInboxFile || "").trim() || null;
      board.statusField = String(values.statusField || "").trim() || null;
      board.categoryField = String(values.categoryField || "").trim() || null;
      board.priorityField = String(values.priorityField || "").trim() || null;
      board.tagsField = String(values.tagsField || "").trim() || null;
      board.dueDateField = String(values.dueDateField || "").trim() || null;
      board.customFields = String(values.customFields || "").trim() || null;
      board.statusOrder = String(values.statusOrder || "").trim() || null;
      board.priorityOrder = String(values.priorityOrder || "").trim() || null;
      board.visibleStatuses = String(values.visibleStatuses || "").trim() || null;
      board.noteTemplate = String(values.noteTemplate || "").trim() || null;
      board.sortBy = values.sortBy || null;
      board.sortDirection = values.sortDirection || null;
      const dueSoon = String(values.dueSoonDays || "").trim();
      board.dueSoonDays = dueSoon !== "" ? Number.parseInt(dueSoon, 10) : null;
      if (board.dueSoonDays != null && !Number.isFinite(board.dueSoonDays)) board.dueSoonDays = null;
      board.wipLimits = String(values.wipLimits || "").trim() || null;
      const autoArchive = String(values.autoArchiveDays || "").trim();
      board.autoArchiveDays = autoArchive !== "" ? Number.parseInt(autoArchive, 10) : null;
      if (board.autoArchiveDays != null && !Number.isFinite(board.autoArchiveDays)) board.autoArchiveDays = null;
      board.dateFormat = String(values.dateFormat || "").trim() || null;
      board.dateDisplayFormat = String(values.dateDisplayFormat || "").trim() || null;
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

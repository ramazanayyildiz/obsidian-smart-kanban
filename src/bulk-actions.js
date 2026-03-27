/**
 * Bulk Actions — multi-select cards and batch-update their fields.
 */

import { setIcon } from "obsidian";

export class BulkActionManager {
  constructor(plugin, view) {
    this.plugin = plugin;
    this.view = view;
    this.selectedIds = new Set();
    this.enabled = false;
    this.barEl = null;
  }

  toggle() {
    this.enabled = !this.enabled;
    if (!this.enabled) {
      this.selectedIds.clear();
    }
    this.updateBar();
    return this.enabled;
  }

  isSelected(cardId) {
    return this.selectedIds.has(cardId);
  }

  toggleCard(cardId) {
    if (this.selectedIds.has(cardId)) {
      this.selectedIds.delete(cardId);
    } else {
      this.selectedIds.add(cardId);
    }
    this.updateBar();
  }

  selectAll(cardIds) {
    for (const id of cardIds) this.selectedIds.add(id);
    this.updateBar();
  }

  clearSelection() {
    this.selectedIds.clear();
    this.updateBar();
  }

  /**
   * Create the bulk action toolbar.
   * @param {HTMLElement} parent - Container to append the bar to
   */
  createBar(parent) {
    this.barEl = parent.createDiv({ cls: "smart-kanban-bulk-bar" });
    this.barEl.style.display = "none";

    this.countEl = this.barEl.createSpan({ cls: "smart-kanban-bulk-count" });

    const actions = [
      { label: "Change Status", icon: "columns", action: () => this._batchChangeField("status") },
      { label: "Change Category", icon: "folder", action: () => this._batchChangeField("category") },
      { label: "Add Tag", icon: "tag", action: () => this._batchAddTag() },
      { label: "Clear Selection", icon: "x", action: () => { this.clearSelection(); this.view.renderContent(); } },
    ];

    for (const { label, icon, action } of actions) {
      const btn = this.barEl.createEl("button", { cls: "smart-kanban-bulk-btn", attr: { title: label } });
      setIcon(btn, icon);
      btn.createSpan({ text: label });
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        action();
      });
    }
  }

  updateBar() {
    if (!this.barEl) return;
    if (this.enabled && this.selectedIds.size > 0) {
      this.barEl.style.display = "flex";
      this.countEl.textContent = `${this.selectedIds.size} selected`;
    } else {
      this.barEl.style.display = "none";
    }
  }

  /**
   * Render a checkbox on a card (called from renderCard).
   */
  renderCheckbox(cardEl, card) {
    if (!this.enabled) return;

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.className = "smart-kanban-card-checkbox";
    cb.checked = this.isSelected(card.id);
    cb.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    cb.addEventListener("change", (e) => {
      this.toggleCard(card.id);
      cardEl.toggleClass("is-selected", this.isSelected(card.id));
    });

    // Insert at the beginning of the title row
    const titleRow = cardEl.querySelector(".smart-kanban-card-title");
    if (titleRow) {
      titleRow.insertBefore(cb, titleRow.firstChild);
    }

    if (this.isSelected(card.id)) {
      cardEl.addClass("is-selected");
    }
  }

  async _batchChangeField(fieldType) {
    const eff = this.view.getActiveSettings();
    let fieldName, values;

    if (fieldType === "status") {
      fieldName = eff.statusField;
      values = String(eff.statusOrder || "").split(",").map(s => s.trim()).filter(Boolean);
    } else if (fieldType === "category") {
      fieldName = eff.categoryField;
      // Collect unique categories from all cards
      values = [...new Set(this.view.allCards.map(c => c.category).filter(Boolean))].sort();
    }

    if (!values || !values.length) return;

    // Simple dropdown via Obsidian's SuggestModal pattern
    const selected = await this._showPickerModal(`Change ${fieldType}`, values);
    if (!selected) return;

    await this._applyBatchUpdate(fieldName, selected);
  }

  async _batchAddTag() {
    const tag = await this._showInputModal("Add Tag", "Enter tag name:");
    if (!tag) return;

    // For each selected card, add the tag
    for (const cardId of this.selectedIds) {
      const card = this.view.allCards.find(c => c.id === cardId);
      if (!card) continue;
      const file = this.plugin.app.vault.getAbstractFileByPath(card.path);
      if (!file) continue;

      try {
        await this.plugin.app.fileManager.processFrontMatter(file, (fm) => {
          const eff = this.view.getActiveSettings();
          const tagsKey = eff.tagsField || "Tags";
          let tags = fm[tagsKey];
          if (!Array.isArray(tags)) tags = tags ? [tags] : [];
          if (!tags.includes(tag)) {
            tags.push(tag);
            fm[tagsKey] = tags;
          }
        });
      } catch (e) { /* skip files that fail */ }
    }

    this.clearSelection();
    this.view.reload();
  }

  async _applyBatchUpdate(fieldName, newValue) {
    for (const cardId of this.selectedIds) {
      const card = this.view.allCards.find(c => c.id === cardId);
      if (!card) continue;
      const file = this.plugin.app.vault.getAbstractFileByPath(card.path);
      if (!file) continue;

      try {
        await this.plugin.app.fileManager.processFrontMatter(file, (fm) => {
          fm[fieldName] = newValue;
        });
      } catch (e) { /* skip */ }
    }

    this.clearSelection();
    this.view.reload();
  }

  _showPickerModal(title, options) {
    return new Promise((resolve) => {
      const modal = new PickerModal(this.plugin.app, title, options, resolve);
      modal.open();
    });
  }

  _showInputModal(title, placeholder) {
    return new Promise((resolve) => {
      const modal = new InputModal(this.plugin.app, title, placeholder, resolve);
      modal.open();
    });
  }
}

// --- Simple modals for bulk actions ---

class PickerModal {
  constructor(app, title, options, onSelect) {
    this.app = app;
    this.title = title;
    this.options = options;
    this.onSelect = onSelect;
    this.modal = null;
  }

  open() {
    // Use Obsidian's FuzzySuggestModal-like approach
    const { Modal } = require("obsidian");
    const self = this;

    this.modal = new (class extends Modal {
      onOpen() {
        const { contentEl } = this;
        contentEl.createEl("h3", { text: self.title });

        const list = contentEl.createDiv({ cls: "smart-kanban-picker-list" });
        for (const opt of self.options) {
          const item = list.createDiv({ cls: "smart-kanban-picker-item", text: opt });
          item.addEventListener("click", () => {
            self.onSelect(opt);
            this.close();
          });
        }
      }
      onClose() {
        if (!this._resolved) self.onSelect(null);
        this._resolved = true;
      }
    })(this.app);
    this.modal.open();
  }
}

class InputModal {
  constructor(app, title, placeholder, onSubmit) {
    this.app = app;
    this.title = title;
    this.placeholder = placeholder;
    this.onSubmit = onSubmit;
  }

  open() {
    const { Modal } = require("obsidian");
    const self = this;

    const modal = new (class extends Modal {
      onOpen() {
        const { contentEl } = this;
        contentEl.createEl("h3", { text: self.title });
        const input = contentEl.createEl("input", {
          type: "text",
          placeholder: self.placeholder,
          cls: "smart-kanban-bulk-input",
        });
        input.style.width = "100%";
        input.style.marginBottom = "8px";

        const btn = contentEl.createEl("button", { text: "Apply", cls: "mod-cta" });
        btn.addEventListener("click", () => {
          self.onSubmit(input.value.trim());
          this.close();
        });
        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            self.onSubmit(input.value.trim());
            this.close();
          }
        });
        input.focus();
      }
      onClose() {
        if (!this._resolved) self.onSubmit(null);
        this._resolved = true;
      }
    })(this.app);
    modal.open();
  }
}

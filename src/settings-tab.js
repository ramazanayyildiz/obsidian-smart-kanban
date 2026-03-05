module.exports = function createSettingsTab({ PluginSettingTab, Setting, Notice, DEFAULT_SETTINGS, THEME_PRESETS, t = (k) => k, LOCALES = { en: {} }, setLocale = () => {} }) {
  function tx(key, fallback, params) {
    const value = t(key, params);
    return value === key ? fallback : value;
  }

  function normalizeColorMap(input) {
    const out = {};
    if (!input || typeof input !== "object") return out;
    for (const [name, value] of Object.entries(input)) {
      const key = String(name || "").trim();
      if (!key || !value || typeof value !== "object") continue;
      out[key] = {
        bg: String(value.bg || "").trim(),
        text: String(value.text || "").trim(),
      };
    }
    return out;
  }

  function section(containerEl, title, desc) {
    const el = containerEl.createDiv({ cls: "sk-settings-section" });
    const header = el.createDiv({ cls: "sk-settings-section-header" });
    header.createEl("h3", { text: title, cls: "sk-settings-section-title" });
    if (desc) header.createEl("p", { text: desc, cls: "sk-settings-section-desc" });
    return el;
  }

  class SmartKanbanSettingTab extends PluginSettingTab {
    constructor(app, plugin) {
      super(app, plugin);
      this.plugin = plugin;
    }

    display() {
      const { containerEl } = this;
      containerEl.empty();

      /* ── Section: Data Source ── */
      const srcSection = section(containerEl, t("settings.section.dataSource"), t("settings.section.dataSource.desc"));

      new Setting(srcSection)
        .setName(tx("settings.source_mode.name", "Source mode"))
        .setDesc(tx("settings.source_mode.desc", "Note cards create one file per task. Task lines use checklist syntax in a single file."))
        .addDropdown((dropdown) =>
          dropdown
            .addOption("notes", tx("settings.source_mode.notes", "Note cards"))
            .addOption("tasks", tx("settings.source_mode.tasks", "Task lines"))
            .setValue(this.plugin.settings.sourceMode)
            .onChange(async (value) => {
              this.plugin.settings.sourceMode = value;
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
        );

      new Setting(srcSection)
        .setName(tx("settings.source_folder.name", "Source folder"))
        .setDesc(tx("settings.source_folder.desc", "Folder containing your task notes or files."))
        .addText((text) =>
          text.setPlaceholder("Tasks").setValue(this.plugin.settings.sourceFolder).onChange(async (value) => {
            this.plugin.settings.sourceFolder = value.trim();
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      new Setting(srcSection)
        .setName(tx("settings.include_subfolders.name", "Include subfolders"))
        .setDesc(tx("settings.include_subfolders.desc", "Also scan nested folders inside the source folder."))
        .addToggle((toggle) =>
          toggle.setValue(this.plugin.settings.includeSubfolders).onChange(async (value) => {
            this.plugin.settings.includeSubfolders = value;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      new Setting(srcSection)
        .setName(tx("settings.task_inbox.name", "Task inbox file"))
        .setDesc(tx("settings.task_inbox.desc", "File used when adding new tasks in Task Lines mode."))
        .addText((text) =>
          text
            .setPlaceholder("Tasks/Task Inbox.md")
            .setValue(this.plugin.settings.taskInboxFile)
            .onChange(async (value) => {
              this.plugin.settings.taskInboxFile = value.trim() || "Tasks/Task Inbox.md";
              await this.plugin.saveSettings();
            })
        );

      new Setting(srcSection)
        .setName(tx("settings.note_template.name", "Note template"))
        .setDesc(tx("settings.note_template.desc", "Optional template file path used when creating note-mode tasks."))
        .addText((text) =>
          text
            .setPlaceholder("Templates/Task.md")
            .setValue(this.plugin.settings.noteTemplate || "")
            .onChange(async (value) => {
              this.plugin.settings.noteTemplate = String(value || "").trim();
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
        );

      /* ── Section: Field Mapping ── */
      const fieldSection = section(containerEl, t("settings.section.fieldMapping"), t("settings.section.fieldMapping.desc"));

      const fieldDefs = [
        ["statusField", tx("settings.field.status.name", "Status field"), tx("settings.field.status.desc", "Determines which lane a card appears in.")],
        ["categoryField", tx("settings.field.category.name", "Category field"), tx("settings.field.category.desc", "Optional grouping label shown as a badge.")],
        ["priorityField", tx("settings.field.priority.name", "Priority field"), tx("settings.field.priority.desc", "Sets priority level (Urgent, High, Medium, Low).")],
        ["tagsField", tx("settings.field.tags.name", "Tags field"), tx("settings.field.tags.desc", "Comma-separated tags displayed on the card.")],
        ["dueDateField", tx("settings.field.due.name", "Due date field"), tx("settings.field.due.desc", "Date in YYYY-MM-DD format for due tracking.")],
      ];

      for (const [key, label, desc] of fieldDefs) {
        new Setting(fieldSection).setName(label).setDesc(desc).addText((text) =>
          text.setValue(this.plugin.settings[key]).onChange(async (value) => {
            this.plugin.settings[key] = value.trim() || DEFAULT_SETTINGS[key];
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );
      }

      new Setting(fieldSection)
        .setName(tx("settings.custom_fields.name", "Custom fields"))
        .setDesc(tx("settings.custom_fields.desc", "Extra frontmatter keys to display on cards. Comma-separated."))
        .addText((text) =>
          text.setPlaceholder("effort, assignee").setValue(this.plugin.settings.customFields).onChange(async (value) => {
            this.plugin.settings.customFields = value;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      /* ── Section: Board Layout ── */
      const layoutSection = section(containerEl, t("settings.section.layout"), t("settings.section.layout.desc"));

      new Setting(layoutSection)
        .setName(tx("settings.status_order.name", "Status order"))
        .setDesc(tx("settings.status_order.desc", "Comma-separated lane names in display order."))
        .addTextArea((text) =>
          text.setValue(this.plugin.settings.statusOrder).onChange(async (value) => {
            this.plugin.settings.statusOrder = value;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      new Setting(layoutSection)
        .setName(tx("settings.priority_order.name", "Priority order"))
        .setDesc(tx("settings.priority_order.desc", "Defines priority ranking for sorting. Comma-separated, highest first."))
        .addText((text) =>
          text.setPlaceholder("Urgent,High,Medium,Low").setValue(this.plugin.settings.priorityOrder).onChange(async (value) => {
            this.plugin.settings.priorityOrder = value;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      new Setting(layoutSection)
        .setName(tx("settings.sort_by.name", "Sort by"))
        .setDesc(tx("settings.sort_by.desc", "Default card sorting within each lane."))
        .addDropdown((dropdown) =>
          dropdown
            .addOption("none", tx("settings.sort_by.none", "Manual (drag to reorder)"))
            .addOption("priority", tx("settings.sort_by.priority", "Priority"))
            .addOption("due", tx("settings.sort_by.due", "Due date"))
            .addOption("title", tx("settings.sort_by.title", "Title"))
            .setValue(this.plugin.settings.sortBy)
            .onChange(async (value) => {
              this.plugin.settings.sortBy = value;
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
        );

      new Setting(layoutSection)
        .setName(tx("settings.sort_direction.name", "Sort direction"))
        .addDropdown((dropdown) =>
          dropdown
            .addOption("asc", tx("settings.sort_direction.asc", "Ascending"))
            .addOption("desc", tx("settings.sort_direction.desc", "Descending"))
            .setValue(this.plugin.settings.sortDirection)
            .onChange(async (value) => {
              this.plugin.settings.sortDirection = value;
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
        );

      new Setting(layoutSection)
        .setName(tx("settings.due_soon.name", "Due soon threshold"))
        .setDesc(tx("settings.due_soon.desc", "Cards due within this many days are highlighted."))
        .addText((text) =>
          text.setValue(String(this.plugin.settings.dueSoonDays)).onChange(async (value) => {
            const parsed = Number.parseInt(value, 10);
            this.plugin.settings.dueSoonDays = Number.isFinite(parsed) && parsed >= 0 ? parsed : 2;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      new Setting(layoutSection)
        .setName(tx("settings.wip_limits.name", "WIP limits"))
        .setDesc(tx("settings.wip_limits.desc", "Limit cards per lane. Format: Todo:10, In Progress:3"))
        .addTextArea((text) =>
          text.setValue(this.plugin.settings.wipLimits).onChange(async (value) => {
            this.plugin.settings.wipLimits = value;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      new Setting(layoutSection)
        .setName(tx("settings.auto_archive.name", "Auto-archive done tasks"))
        .setDesc(tx("settings.auto_archive.desc", "Hide completed tasks older than this many days. Set to 0 to disable."))
        .addText((text) =>
          text.setValue(String(this.plugin.settings.autoArchiveDays || 0)).onChange(async (value) => {
            const parsed = Number.parseInt(value, 10);
            this.plugin.settings.autoArchiveDays = Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      /* ── Section: Date Display ── */
      const dateSection = section(containerEl, t("settings.section.dateDisplay"), t("settings.section.dateDisplay.desc"));

      new Setting(dateSection)
        .setName(tx("settings.date_format.name", "Date format"))
        .setDesc(tx("settings.date_format.desc", "Storage format for new due dates. Uses Moment.js patterns."))
        .addText((text) =>
          text
            .setPlaceholder("YYYY-MM-DD")
            .setValue(this.plugin.settings.dateFormat || "YYYY-MM-DD")
            .onChange(async (value) => {
              this.plugin.settings.dateFormat = String(value || "").trim() || "YYYY-MM-DD";
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
        );

      new Setting(dateSection)
        .setName(tx("settings.date_display_format.name", "Date display format"))
        .setDesc(tx("settings.date_display_format.desc", "Optional display format. Leave empty to use Date format."))
        .addText((text) =>
          text
            .setPlaceholder("MMM D, YYYY")
            .setValue(this.plugin.settings.dateDisplayFormat || "")
            .onChange(async (value) => {
              this.plugin.settings.dateDisplayFormat = String(value || "").trim();
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
        );

      new Setting(dateSection)
        .setName(tx("settings.relative_due.name", "Show relative due labels"))
        .setDesc(tx("settings.relative_due.desc", "Show labels like \"Due in 3d\" instead of absolute dates."))
        .addToggle((toggle) =>
          toggle.setValue(this.plugin.settings.showRelativeDate !== false).onChange(async (value) => {
            this.plugin.settings.showRelativeDate = !!value;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      /* ── Section: Appearance ── */
      const themeSection = section(containerEl, t("settings.section.appearance"), t("settings.section.appearance.desc"));

      new Setting(themeSection)
        .setName(tx("settings.theme_preset.name", "Theme preset"))
        .setDesc(tx("settings.theme_preset.desc", "Choose a color scheme as a starting point. You can override individual colors below."))
        .addDropdown((dropdown) => {
          for (const [key, preset] of Object.entries(THEME_PRESETS)) {
            dropdown.addOption(key, preset.name);
          }
          dropdown.setValue((this.plugin.settings.theme && this.plugin.settings.theme.preset) || "default");
          dropdown.onChange(async (value) => {
            this.plugin.settings.theme.preset = value;
            this.plugin.settings.theme.overrides = {};
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
            this.display();
          });
        });

      new Setting(themeSection)
        .setName(tx("settings.font_family.name", "Font family"))
        .setDesc(tx("settings.font_family.desc", "Custom font stack for the board. Leave empty for default."))
        .addText((text) =>
          text
            .setPlaceholder("e.g. Inter, sans-serif")
            .setValue((this.plugin.settings.theme && this.plugin.settings.theme.overrides && this.plugin.settings.theme.overrides.fontFamily) || "")
            .onChange(async (value) => {
              if (!this.plugin.settings.theme.overrides) this.plugin.settings.theme.overrides = {};
              this.plugin.settings.theme.overrides.fontFamily = value.trim();
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
        );

      new Setting(themeSection)
        .setName(tx("settings.tag_colors.name", "Tag colors"))
        .setDesc(tx("settings.tag_colors.desc", "Define per-tag badge colors."));
      this.renderColorMapEditor(themeSection, "tagColors", tx("settings.tag_colors.add", "Add tag color"), tx("settings.tag_colors.key_placeholder", "tag name"));

      new Setting(themeSection)
        .setName(tx("settings.category_colors.name", "Category colors"))
        .setDesc(tx("settings.category_colors.desc", "Define per-category badge colors."));
      this.renderColorMapEditor(themeSection, "categoryColors", tx("settings.category_colors.add", "Add category color"), tx("settings.category_colors.key_placeholder", "category name"));

      new Setting(themeSection)
        .setName(tx("settings.lane_tint.name", "Lane body tint strength"))
        .setDesc(tx("settings.lane_tint.desc", "How much lane accent color appears in lane background. 0-40."))
        .addText((text) =>
          text
            .setPlaceholder("10")
            .setValue(String((this.plugin.settings.theme && this.plugin.settings.theme.overrides && this.plugin.settings.theme.overrides.laneTintStrength) ?? 10))
            .onChange(async (value) => {
              const parsed = Number.parseInt(value, 10);
              if (!this.plugin.settings.theme.overrides) this.plugin.settings.theme.overrides = {};
              if (!Number.isFinite(parsed)) delete this.plugin.settings.theme.overrides.laneTintStrength;
              else this.plugin.settings.theme.overrides.laneTintStrength = Math.max(0, Math.min(40, parsed));
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
        );

      new Setting(themeSection)
        .setName(tx("settings.lane_header_tint.name", "Lane header tint strength"))
        .setDesc(tx("settings.lane_header_tint.desc", "How much lane accent color appears in lane header chip. 0-60."))
        .addText((text) =>
          text
            .setPlaceholder("24")
            .setValue(String((this.plugin.settings.theme && this.plugin.settings.theme.overrides && this.plugin.settings.theme.overrides.laneHeaderTintStrength) ?? 24))
            .onChange(async (value) => {
              const parsed = Number.parseInt(value, 10);
              if (!this.plugin.settings.theme.overrides) this.plugin.settings.theme.overrides = {};
              if (!Number.isFinite(parsed)) delete this.plugin.settings.theme.overrides.laneHeaderTintStrength;
              else this.plugin.settings.theme.overrides.laneHeaderTintStrength = Math.max(0, Math.min(60, parsed));
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
        );

      const themeColorGroups = [
        {
          label: tx("settings.theme.group.card", "Card Colors"),
          fields: [
            { key: "cardBg", label: tx("settings.theme.cardBg", "Background") },
            { key: "cardText", label: tx("settings.theme.cardText", "Text") },
            { key: "cardBorder", label: tx("settings.theme.cardBorder", "Border") },
          ],
        },
        {
          label: tx("settings.theme.group.lane", "Lane Colors"),
          fields: [
            { key: "laneBg", label: tx("settings.theme.laneBg", "Base lane tint") },
            { key: "laneHeaderBg", label: tx("settings.theme.laneHeaderBg", "Base header tint") },
            { key: "laneHeaderText", label: tx("settings.theme.laneHeaderText", "Header text") },
            { key: "laneBorder", label: tx("settings.theme.laneBorder", "Lane border") },
          ],
        },
        {
          label: tx("settings.theme.group.priority", "Priority"),
          fields: [
            { key: "priorityUrgent", label: tx("settings.theme.priorityUrgent", "Urgent") },
            { key: "priorityHigh", label: tx("settings.theme.priorityHigh", "High") },
            { key: "priorityMedium", label: tx("settings.theme.priorityMedium", "Medium") },
            { key: "priorityLow", label: tx("settings.theme.priorityLow", "Low") },
          ],
        },
        {
          label: tx("settings.theme.group.tags", "Tags & Accent"),
          fields: [
            { key: "tagBg", label: tx("settings.theme.tagBg", "Tag background") },
            { key: "tagText", label: tx("settings.theme.tagText", "Tag text") },
            { key: "tagBorder", label: tx("settings.theme.tagBorder", "Tag border") },
            { key: "accentColor", label: tx("settings.theme.accentColor", "Accent") },
          ],
        },
        {
          label: tx("settings.theme.group.due", "Due Dates"),
          fields: [
            { key: "dueBadgeOverdue", label: tx("settings.theme.dueBadgeOverdue", "Overdue") },
            { key: "dueBadgeSoon", label: tx("settings.theme.dueBadgeSoon", "Due soon") },
          ],
        },
        {
          label: tx("settings.theme.group.board", "Board"),
          fields: [
            { key: "boardBg", label: tx("settings.theme.boardBg", "Board background") },
          ],
        },
      ];

      const resolved = this.plugin.getResolvedTheme();
      const overrides = (this.plugin.settings.theme && this.plugin.settings.theme.overrides) || {};

      for (const group of themeColorGroups) {
        themeSection.createEl("h4", { text: group.label, cls: "sk-settings-color-group-title" });
        for (const field of group.fields) {
          const currentValue = resolved[field.key] || "#000000";
          const isOverridden = !!(overrides[field.key]);
          const setting = new Setting(themeSection).setName(field.label);
          setting.addColorPicker((picker) => {
            picker.setValue(currentValue);
            picker.onChange(async (value) => {
              if (!this.plugin.settings.theme.overrides) this.plugin.settings.theme.overrides = {};
              this.plugin.settings.theme.overrides[field.key] = value;
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            });
          });
          if (isOverridden) {
            setting.addButton((btn) => {
              btn.setButtonText(tx("common.reset", "Reset")).onClick(async () => {
                delete this.plugin.settings.theme.overrides[field.key];
                await this.plugin.saveSettings();
                this.plugin.refreshViews();
                this.display();
              });
            });
          }
        }
      }

      themeSection.createEl("h4", { text: tx("settings.per_lane_accent", "Per-Lane Accent Colors"), cls: "sk-settings-color-group-title" });
      const statuses = this.plugin.getStatusOrder();
      for (const status of statuses) {
        const laneColor = this.plugin.getResolvedLaneColor(status);
        const userLane = this.plugin.settings.theme && this.plugin.settings.theme.laneColors && this.plugin.settings.theme.laneColors[status];
        const setting = new Setting(themeSection)
          .setName(status)
          .setDesc(tx("settings.per_lane_accent.desc", "Accent and header text color for this lane."));
        setting.addColorPicker((picker) => {
          picker.setValue(laneColor.bg || "#868e96");
          picker.onChange(async (value) => {
            if (!this.plugin.settings.theme.laneColors) this.plugin.settings.theme.laneColors = {};
            if (!this.plugin.settings.theme.laneColors[status]) this.plugin.settings.theme.laneColors[status] = {};
            this.plugin.settings.theme.laneColors[status].bg = value;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          });
        });
        setting.addColorPicker((picker) => {
          picker.setValue(laneColor.text || "#ffffff");
          picker.onChange(async (value) => {
            if (!this.plugin.settings.theme.laneColors) this.plugin.settings.theme.laneColors = {};
            if (!this.plugin.settings.theme.laneColors[status]) this.plugin.settings.theme.laneColors[status] = {};
            this.plugin.settings.theme.laneColors[status].text = value;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          });
        });
        if (userLane && (userLane.bg || userLane.text)) {
          setting.addButton((btn) => {
            btn.setButtonText(tx("common.reset", "Reset")).onClick(async () => {
              delete this.plugin.settings.theme.laneColors[status];
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
              this.display();
            });
          });
        }
      }

      /* ── Section: Advanced ── */
      const advSection = section(containerEl, t("settings.section.advanced"), t("settings.section.advanced.desc"));

      new Setting(advSection)
        .setName(t("settings.language.name"))
        .setDesc(t("settings.language.desc"))
        .addDropdown((dropdown) => {
          for (const key of Object.keys(LOCALES)) {
            dropdown.addOption(key, t(`settings.language.${key}`));
          }
          dropdown.setValue(this.plugin.settings.language || "en");
          dropdown.onChange(async (value) => {
            this.plugin.settings.language = value;
            setLocale(value);
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
            this.display();
          });
        });

      new Setting(advSection)
        .setName(tx("settings.refresh_debounce.name", "Refresh debounce"))
        .setDesc(tx("settings.refresh_debounce.desc", "Milliseconds to wait after a file change before refreshing the board."))
        .addText((text) =>
          text.setValue(String(this.plugin.settings.refreshDebounceMs)).onChange(async (value) => {
            const parsed = Number.parseInt(value, 10);
            this.plugin.settings.refreshDebounceMs = Number.isFinite(parsed) && parsed >= 0 ? parsed : 250;
            await this.plugin.saveSettings();
          })
        );
  }

    renderColorMapEditor(parentEl, mapKey, addButtonLabel, keyPlaceholder) {
      const container = parentEl.createDiv({ cls: "sk-settings-color-map-editor" });
      const currentMap = normalizeColorMap(this.plugin.settings[mapKey] || {});

      const saveMap = async () => {
        this.plugin.settings[mapKey] = currentMap;
        await this.plugin.saveSettings();
        this.plugin.refreshViews();
      };

      const renderRows = () => {
        container.empty();
        const keys = Object.keys(currentMap).sort((a, b) => a.localeCompare(b));
        for (const key of keys) {
          const entry = currentMap[key] || { bg: "", text: "" };
          const row = new Setting(container).setName(key);
          row.addText((text) => {
            text
              .setPlaceholder(keyPlaceholder)
              .setValue(key)
              .onChange(async (value) => {
                const nextKey = String(value || "").trim();
                if (!nextKey || nextKey === key) return;
                if (currentMap[nextKey]) return;
                currentMap[nextKey] = currentMap[key];
                delete currentMap[key];
                await saveMap();
                renderRows();
              });
          });
          row.addColorPicker((picker) => {
            picker.setValue(entry.bg || "#e8e8e8");
            picker.onChange(async (value) => {
              currentMap[key].bg = value;
              await saveMap();
            });
          });
          row.addColorPicker((picker) => {
            picker.setValue(entry.text || "#4a4a4a");
            picker.onChange(async (value) => {
              currentMap[key].text = value;
              await saveMap();
            });
          });
          row.addButton((btn) => {
            btn.setButtonText(tx("common.delete", "Delete")).onClick(async () => {
              delete currentMap[key];
              await saveMap();
              renderRows();
            });
          });
        }

        const addWrap = new Setting(container).setName(addButtonLabel);
        let pendingKey = "";
        addWrap.addText((text) => {
          text.setPlaceholder(keyPlaceholder).onChange((value) => {
            pendingKey = String(value || "").trim();
          });
        });
        addWrap.addButton((btn) => {
          btn.setButtonText(tx("common.add", "Add")).onClick(async () => {
            if (!pendingKey) return;
            if (!currentMap[pendingKey]) {
              currentMap[pendingKey] = { bg: "#e8e8e8", text: "#4a4a4a" };
              await saveMap();
              renderRows();
            }
          });
        });
      };

      renderRows();
    }
  }

  return { SmartKanbanSettingTab };
};

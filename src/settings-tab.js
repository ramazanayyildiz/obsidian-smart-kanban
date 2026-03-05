module.exports = function createSettingsTab({ PluginSettingTab, Setting, Notice, DEFAULT_SETTINGS, THEME_PRESETS, t = (k) => k, LOCALES = { en: {} }, setLocale = () => {} }) {
  function parseColorMapInput(value) {
    try {
      const parsed = JSON.parse(String(value || "").trim() || "{}");
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
      return parsed;
    } catch (_e) {
      return null;
    }
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
        .setName("Source mode")
        .setDesc("Note cards create one file per task. Task lines use checklist syntax in a single file.")
        .addDropdown((dropdown) =>
          dropdown
            .addOption("notes", "Note cards")
            .addOption("tasks", "Task lines")
            .setValue(this.plugin.settings.sourceMode)
            .onChange(async (value) => {
              this.plugin.settings.sourceMode = value;
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
        );

      new Setting(srcSection)
        .setName("Source folder")
        .setDesc("Folder containing your task notes or files.")
        .addText((text) =>
          text.setPlaceholder("Tasks").setValue(this.plugin.settings.sourceFolder).onChange(async (value) => {
            this.plugin.settings.sourceFolder = value.trim();
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      new Setting(srcSection)
        .setName("Include subfolders")
        .setDesc("Also scan nested folders inside the source folder.")
        .addToggle((toggle) =>
          toggle.setValue(this.plugin.settings.includeSubfolders).onChange(async (value) => {
            this.plugin.settings.includeSubfolders = value;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      new Setting(srcSection)
        .setName("Task inbox file")
        .setDesc("File used when adding new tasks in Task Lines mode.")
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
        .setName("Note template")
        .setDesc("Optional template file path used when creating note-mode tasks.")
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
        ["statusField", "Status field", "Determines which lane a card appears in."],
        ["categoryField", "Category field", "Optional grouping label shown as a badge."],
        ["priorityField", "Priority field", "Sets priority level (Urgent, High, Medium, Low)."],
        ["tagsField", "Tags field", "Comma-separated tags displayed on the card."],
        ["dueDateField", "Due date field", "Date in YYYY-MM-DD format for due tracking."],
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
        .setName("Custom fields")
        .setDesc("Extra frontmatter keys to display on cards. Comma-separated.")
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
        .setName("Status order")
        .setDesc("Comma-separated lane names in display order.")
        .addTextArea((text) =>
          text.setValue(this.plugin.settings.statusOrder).onChange(async (value) => {
            this.plugin.settings.statusOrder = value;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      new Setting(layoutSection)
        .setName("Priority order")
        .setDesc("Defines priority ranking for sorting. Comma-separated, highest first.")
        .addText((text) =>
          text.setPlaceholder("Urgent,High,Medium,Low").setValue(this.plugin.settings.priorityOrder).onChange(async (value) => {
            this.plugin.settings.priorityOrder = value;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      new Setting(layoutSection)
        .setName("Sort by")
        .setDesc("Default card sorting within each lane.")
        .addDropdown((dropdown) =>
          dropdown
            .addOption("none", "Manual (drag to reorder)")
            .addOption("priority", "Priority")
            .addOption("due", "Due date")
            .addOption("title", "Title")
            .setValue(this.plugin.settings.sortBy)
            .onChange(async (value) => {
              this.plugin.settings.sortBy = value;
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
        );

      new Setting(layoutSection)
        .setName("Sort direction")
        .addDropdown((dropdown) =>
          dropdown
            .addOption("asc", "Ascending")
            .addOption("desc", "Descending")
            .setValue(this.plugin.settings.sortDirection)
            .onChange(async (value) => {
              this.plugin.settings.sortDirection = value;
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
        );

      new Setting(layoutSection)
        .setName("Due soon threshold")
        .setDesc("Cards due within this many days are highlighted.")
        .addText((text) =>
          text.setValue(String(this.plugin.settings.dueSoonDays)).onChange(async (value) => {
            const parsed = Number.parseInt(value, 10);
            this.plugin.settings.dueSoonDays = Number.isFinite(parsed) && parsed >= 0 ? parsed : 2;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      new Setting(layoutSection)
        .setName("WIP limits")
        .setDesc("Limit cards per lane. Format: Todo:10, In Progress:3")
        .addTextArea((text) =>
          text.setValue(this.plugin.settings.wipLimits).onChange(async (value) => {
            this.plugin.settings.wipLimits = value;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      new Setting(layoutSection)
        .setName("Auto-archive done tasks")
        .setDesc("Hide completed tasks older than this many days. Set to 0 to disable.")
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
        .setName("Date format")
        .setDesc("Storage format for new due dates. Uses Moment.js patterns.")
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
        .setName("Date display format")
        .setDesc("Optional display format. Leave empty to use Date format.")
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
        .setName("Show relative due labels")
        .setDesc("Show labels like \"Due in 3d\" instead of absolute dates.")
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
        .setName("Theme preset")
        .setDesc("Choose a color scheme as a starting point. You can override individual colors below.")
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
        .setName("Font family")
        .setDesc("Custom font stack for the board. Leave empty for default.")
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
        .setName("Tag colors (JSON)")
        .setDesc("Map tags to colors. Example: {\"work\":{\"bg\":\"#dbeafe\",\"text\":\"#1e3a8a\"}}")
        .addTextArea((text) =>
          text
            .setValue(JSON.stringify(this.plugin.settings.tagColors || {}, null, 2))
            .onChange(async (value) => {
              const parsed = parseColorMapInput(value);
              if (!parsed) {
                new Notice("Invalid tag colors JSON.");
                return;
              }
              this.plugin.settings.tagColors = parsed;
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
        );

      new Setting(themeSection)
        .setName("Category colors (JSON)")
        .setDesc("Map categories to colors. Example: {\"Feature\":{\"bg\":\"#dcfce7\",\"text\":\"#166534\"}}")
        .addTextArea((text) =>
          text
            .setValue(JSON.stringify(this.plugin.settings.categoryColors || {}, null, 2))
            .onChange(async (value) => {
              const parsed = parseColorMapInput(value);
              if (!parsed) {
                new Notice("Invalid category colors JSON.");
                return;
              }
              this.plugin.settings.categoryColors = parsed;
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
        );

      new Setting(themeSection)
        .setName("Lane body tint strength")
        .setDesc("How much lane accent color appears in lane background. 0-40.")
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
        .setName("Lane header tint strength")
        .setDesc("How much lane accent color appears in lane header chip. 0-60.")
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
          label: "Card Colors",
          fields: [
            { key: "cardBg", label: "Background" },
            { key: "cardText", label: "Text" },
            { key: "cardBorder", label: "Border" },
          ],
        },
        {
          label: "Lane Colors",
          fields: [
            { key: "laneBg", label: "Base lane tint" },
            { key: "laneHeaderBg", label: "Base header tint" },
            { key: "laneHeaderText", label: "Header text" },
            { key: "laneBorder", label: "Lane border" },
          ],
        },
        {
          label: "Priority",
          fields: [
            { key: "priorityUrgent", label: "Urgent" },
            { key: "priorityHigh", label: "High" },
            { key: "priorityMedium", label: "Medium" },
            { key: "priorityLow", label: "Low" },
          ],
        },
        {
          label: "Tags & Accent",
          fields: [
            { key: "tagBg", label: "Tag background" },
            { key: "tagText", label: "Tag text" },
            { key: "tagBorder", label: "Tag border" },
            { key: "accentColor", label: "Accent" },
          ],
        },
        {
          label: "Due Dates",
          fields: [
            { key: "dueBadgeOverdue", label: "Overdue" },
            { key: "dueBadgeSoon", label: "Due soon" },
          ],
        },
        {
          label: "Board",
          fields: [
            { key: "boardBg", label: "Board background" },
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
              btn.setButtonText("Reset").onClick(async () => {
                delete this.plugin.settings.theme.overrides[field.key];
                await this.plugin.saveSettings();
                this.plugin.refreshViews();
                this.display();
              });
            });
          }
        }
      }

      themeSection.createEl("h4", { text: "Per-Lane Accent Colors", cls: "sk-settings-color-group-title" });
      const statuses = this.plugin.getStatusOrder();
      for (const status of statuses) {
        const laneColor = this.plugin.getResolvedLaneColor(status);
        const userLane = this.plugin.settings.theme && this.plugin.settings.theme.laneColors && this.plugin.settings.theme.laneColors[status];
        const setting = new Setting(themeSection)
          .setName(status)
          .setDesc("Accent and header text color for this lane.");
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
            btn.setButtonText("Reset").onClick(async () => {
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
        .setName("Refresh debounce")
        .setDesc("Milliseconds to wait after a file change before refreshing the board.")
        .addText((text) =>
          text.setValue(String(this.plugin.settings.refreshDebounceMs)).onChange(async (value) => {
            const parsed = Number.parseInt(value, 10);
            this.plugin.settings.refreshDebounceMs = Number.isFinite(parsed) && parsed >= 0 ? parsed : 250;
            await this.plugin.saveSettings();
          })
        );
    }
  }

  return { SmartKanbanSettingTab };
};

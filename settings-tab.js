const { DEFAULT_SETTINGS, THEME_PRESETS } = require("./constants");

module.exports = function createSettingsTab({ PluginSettingTab, Setting, Notice }) {

  class SmartKanbanSettingTab extends PluginSettingTab {
    constructor(app, plugin) {
      super(app, plugin);
      this.plugin = plugin;
    }

    display() {
      const { containerEl } = this;
      containerEl.empty();

      new Setting(containerEl)
        .setName("Source mode")
        .setDesc("Use per-note cards or checklist task lines.")
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

      new Setting(containerEl)
        .setName("Source folder")
        .setDesc("Folder containing notes/tasks.")
        .addText((text) =>
          text.setPlaceholder("Tasks").setValue(this.plugin.settings.sourceFolder).onChange(async (value) => {
            this.plugin.settings.sourceFolder = value.trim();
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      new Setting(containerEl)
        .setName("Task inbox file")
        .setDesc("Used by New Task when source mode is Task lines.")
        .addText((text) =>
          text
            .setPlaceholder("Tasks/Task Inbox.md")
            .setValue(this.plugin.settings.taskInboxFile)
            .onChange(async (value) => {
              this.plugin.settings.taskInboxFile = value.trim() || "Tasks/Task Inbox.md";
              await this.plugin.saveSettings();
            })
        );

      new Setting(containerEl)
        .setName("Include subfolders")
        .addToggle((toggle) =>
          toggle.setValue(this.plugin.settings.includeSubfolders).onChange(async (value) => {
            this.plugin.settings.includeSubfolders = value;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      for (const [key, label] of [
        ["statusField", "Status field"],
        ["categoryField", "Category field"],
        ["priorityField", "Priority field"],
        ["tagsField", "Tags field"],
        ["dueDateField", "Due date field"],
      ]) {
        new Setting(containerEl).setName(label).addText((text) =>
          text.setValue(this.plugin.settings[key]).onChange(async (value) => {
            this.plugin.settings[key] = value.trim() || DEFAULT_SETTINGS[key];
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );
      }

      new Setting(containerEl)
        .setName("Custom fields")
        .setDesc("Extra frontmatter/inline field keys to display on cards. Comma-separated.")
        .addText((text) =>
          text.setValue(this.plugin.settings.customFields).onChange(async (value) => {
            this.plugin.settings.customFields = value;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      new Setting(containerEl)
        .setName("Status order")
        .setDesc("Comma-separated lane names.")
        .addTextArea((text) =>
          text.setValue(this.plugin.settings.statusOrder).onChange(async (value) => {
            this.plugin.settings.statusOrder = value;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      new Setting(containerEl)
        .setName("Priority order")
        .setDesc("Used when sort is Priority.")
        .addText((text) =>
          text.setValue(this.plugin.settings.priorityOrder).onChange(async (value) => {
            this.plugin.settings.priorityOrder = value;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      new Setting(containerEl)
        .setName("Sort by")
        .addDropdown((dropdown) =>
          dropdown
            .addOption("none", "None")
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

      new Setting(containerEl)
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

      new Setting(containerEl)
        .setName("Due soon days")
        .addText((text) =>
          text.setValue(String(this.plugin.settings.dueSoonDays)).onChange(async (value) => {
            const parsed = Number.parseInt(value, 10);
            this.plugin.settings.dueSoonDays = Number.isFinite(parsed) && parsed >= 0 ? parsed : 2;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      new Setting(containerEl)
        .setName("WIP limits")
        .setDesc("Format: Todo:10,In Progress:3")
        .addTextArea((text) =>
          text.setValue(this.plugin.settings.wipLimits).onChange(async (value) => {
            this.plugin.settings.wipLimits = value;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      new Setting(containerEl)
        .setName("Refresh debounce (ms)")
        .addText((text) =>
          text.setValue(String(this.plugin.settings.refreshDebounceMs)).onChange(async (value) => {
            const parsed = Number.parseInt(value, 10);
            this.plugin.settings.refreshDebounceMs = Number.isFinite(parsed) && parsed >= 0 ? parsed : 250;
            await this.plugin.saveSettings();
          })
        );

      new Setting(containerEl)
        .setName("Auto-archive done (days)")
        .setDesc("Hide Done cards older than X days. 0 = disabled.")
        .addText((text) =>
          text.setValue(String(this.plugin.settings.autoArchiveDays || 0)).onChange(async (value) => {
            const parsed = Number.parseInt(value, 10);
            this.plugin.settings.autoArchiveDays = Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      containerEl.createEl("h3", { text: "Theme" });

      new Setting(containerEl)
        .setName("Theme preset")
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

      const themeColorGroups = [
        {
          label: "Card Colors",
          fields: [
            { key: "cardBg", label: "Card background" },
            { key: "cardText", label: "Card text" },
            { key: "cardBorder", label: "Card border" },
          ],
        },
        {
          label: "Lane Colors",
          fields: [
            { key: "laneBg", label: "Lane background" },
            { key: "laneHeaderBg", label: "Lane header background" },
            { key: "laneHeaderText", label: "Lane header text" },
            { key: "laneBorder", label: "Lane border" },
          ],
        },
        {
          label: "Priority Badges",
          fields: [
            { key: "priorityUrgent", label: "Urgent" },
            { key: "priorityHigh", label: "High" },
            { key: "priorityMedium", label: "Medium" },
            { key: "priorityLow", label: "Low" },
          ],
        },
        {
          label: "Tags & Accents",
          fields: [
            { key: "tagBg", label: "Tag background" },
            { key: "tagText", label: "Tag text" },
            { key: "tagBorder", label: "Tag border" },
            { key: "accentColor", label: "Accent color" },
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
        containerEl.createEl("h4", { text: group.label });
        for (const field of group.fields) {
          const currentValue = resolved[field.key] || "#000000";
          const isOverridden = !!(overrides[field.key]);
          const setting = new Setting(containerEl).setName(field.label);
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

      new Setting(containerEl)
        .setName("Font family")
        .addText((text) =>
          text.setValue((this.plugin.settings.theme && this.plugin.settings.theme.overrides && this.plugin.settings.theme.overrides.fontFamily) || "").onChange(async (value) => {
            if (!this.plugin.settings.theme.overrides) this.plugin.settings.theme.overrides = {};
            this.plugin.settings.theme.overrides.fontFamily = value.trim();
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      containerEl.createEl("h4", { text: "Per-Lane Header Colors" });
      const statuses = this.plugin.getStatusOrder();
      for (const status of statuses) {
        const laneColor = this.plugin.getResolvedLaneColor(status);
        const userLane = this.plugin.settings.theme && this.plugin.settings.theme.laneColors && this.plugin.settings.theme.laneColors[status];
        const setting = new Setting(containerEl).setName(status);
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
    }
  }

  return { SmartKanbanSettingTab };
};

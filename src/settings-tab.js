module.exports = function createSettingsTab({ PluginSettingTab, Setting, Notice, DEFAULT_SETTINGS, BOARD_CONFIG_KEYS = [], THEME_PRESETS, t = (k) => k, LOCALES = { en: {} }, setLocale = () => {} }) {
  const boardConfigKeySet = new Set(BOARD_CONFIG_KEYS);

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

    getActiveBoard() {
      const boardId = this.plugin.settings.activeBoardId || "";
      return boardId ? this.plugin.getBoard(boardId) : null;
    }

    getSetting(key, fallback = DEFAULT_SETTINGS[key]) {
      const activeBoard = this.getActiveBoard();
      if (activeBoard && boardConfigKeySet.has(key)) {
        const boardValue = activeBoard[key];
        if (boardValue !== null && boardValue !== undefined && boardValue !== "") return boardValue;
      }
      const globalValue = this.plugin.settings[key];
      return globalValue === undefined ? fallback : globalValue;
    }

    setSetting(key, value, options = {}) {
      const opts = options || {};
      const activeBoard = this.getActiveBoard();
      if (activeBoard && boardConfigKeySet.has(key)) {
        const shouldInherit = !!opts.allowInherit && (value === "" || value === null || value === undefined);
        activeBoard[key] = shouldInherit ? null : value;
        return;
      }

      this.plugin.settings[key] = value;
      if (boardConfigKeySet.has(key) && this.plugin.settings.defaultBoardConfig) {
        this.plugin.settings.defaultBoardConfig[key] = value;
      }
    }

    getThemeTarget() {
      const activeBoard = this.getActiveBoard();
      if (activeBoard) {
        if (!activeBoard.theme || typeof activeBoard.theme !== "object") {
          activeBoard.theme = { preset: "default", overrides: {}, laneColors: {} };
        }
        if (!activeBoard.theme.overrides || typeof activeBoard.theme.overrides !== "object") activeBoard.theme.overrides = {};
        if (!activeBoard.theme.laneColors || typeof activeBoard.theme.laneColors !== "object") activeBoard.theme.laneColors = {};
        return activeBoard.theme;
      }
      if (!this.plugin.settings.theme || typeof this.plugin.settings.theme !== "object") {
        this.plugin.settings.theme = { preset: "default", overrides: {}, laneColors: {} };
      }
      if (!this.plugin.settings.theme.overrides || typeof this.plugin.settings.theme.overrides !== "object") this.plugin.settings.theme.overrides = {};
      if (!this.plugin.settings.theme.laneColors || typeof this.plugin.settings.theme.laneColors !== "object") this.plugin.settings.theme.laneColors = {};
      return this.plugin.settings.theme;
    }

    syncTheme() {
      if (!this.getActiveBoard() && this.plugin.settings.defaultBoardConfig && this.plugin.settings.theme) {
        this.plugin.settings.defaultBoardConfig.theme = JSON.parse(JSON.stringify(this.plugin.settings.theme));
      }
    }

    display() {
      const { containerEl } = this;
      containerEl.empty();
      const activeBoard = this.getActiveBoard();
      const scopeSection = section(
        containerEl,
        tx("settings.scope.title", "Editing Scope"),
        tx("settings.scope.desc", "Board settings below apply to the active board in Smart Kanban view. Global settings stay in the Advanced section.")
      );

      new Setting(scopeSection)
        .setName(tx("settings.scope.active_board", "Active board"))
        .setDesc(activeBoard ? tx("settings.scope.current_board", `Current: ${activeBoard.name}`, { name: activeBoard.name }) : tx("settings.scope.current_default", "Current: Default Board"))
        .addDropdown((dropdown) => {
          dropdown.addOption("", tx("view.board.default", "Default Board"));
          for (const board of this.plugin.settings.boards || []) dropdown.addOption(board.id, board.name);
          dropdown.setValue(this.plugin.settings.activeBoardId || "");
          dropdown.onChange(async (value) => {
            this.plugin.settings.activeBoardId = value || "";
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
            this.display();
          });
        });

      new Setting(scopeSection)
        .setName(tx("settings.scope.manage_boards", "Manage boards"))
        .setDesc(tx("settings.scope.manage_boards.desc", "Create, edit, and delete boards."))
        .addButton((btn) => {
          btn.setButtonText(tx("settings.scope.open_manager", "Open Board Manager")).onClick(async () => {
            await this.plugin.openBoardManager();
            this.display();
          });
        });

      /* ── Section: Data Source ── */
      const srcSection = section(containerEl, t("settings.section.dataSource"), t("settings.section.dataSource.desc"));

      new Setting(srcSection)
        .setName(tx("settings.source_mode.name", "Source mode"))
        .setDesc(tx("settings.source_mode.desc", "Note cards create one file per task. Task lines use checklist syntax in a single file."))
        .addDropdown((dropdown) =>
          dropdown
            .addOption("notes", tx("settings.source_mode.notes", "Note cards"))
            .addOption("tasks", tx("settings.source_mode.tasks", "Task lines"))
            .setValue(this.getSetting("sourceMode"))
            .onChange(async (value) => {
              this.setSetting("sourceMode", value);
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
        );

      new Setting(srcSection)
        .setName(tx("settings.source_folder.name", "Source folder"))
        .setDesc(tx("settings.source_folder.desc", "Folder containing your task notes or files."))
        .addText((text) =>
          text.setPlaceholder("Tasks").setValue(this.getSetting("sourceFolder")).onChange(async (value) => {
            this.setSetting("sourceFolder", value.trim(), { allowInherit: true });
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      new Setting(srcSection)
        .setName(tx("settings.include_subfolders.name", "Include subfolders"))
        .setDesc(tx("settings.include_subfolders.desc", "Also scan nested folders inside the source folder."))
        .addToggle((toggle) =>
          toggle.setValue(!!this.getSetting("includeSubfolders")).onChange(async (value) => {
            this.setSetting("includeSubfolders", value);
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
            .setValue(this.getSetting("taskInboxFile"))
            .onChange(async (value) => {
              this.setSetting("taskInboxFile", value.trim() || "Tasks/Task Inbox.md", { allowInherit: true });
              await this.plugin.saveSettings();
            })
        );

      new Setting(srcSection)
        .setName(tx("settings.note_template.name", "Note template"))
        .setDesc(tx("settings.note_template.desc", "Optional template file path used when creating note-mode tasks."))
        .addText((text) =>
          text
            .setPlaceholder("Templates/Task.md")
            .setValue(this.getSetting("noteTemplate", "") || "")
            .onChange(async (value) => {
              this.setSetting("noteTemplate", String(value || "").trim(), { allowInherit: true });
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
          text.setValue(this.getSetting(key)).onChange(async (value) => {
            this.setSetting(key, value.trim() || DEFAULT_SETTINGS[key]);
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );
      }

      new Setting(fieldSection)
        .setName(tx("settings.custom_fields.name", "Custom fields"))
        .setDesc(tx("settings.custom_fields.desc", "Extra frontmatter keys to display on cards. Comma-separated."))
        .addText((text) =>
          text.setPlaceholder("effort, assignee").setValue(this.getSetting("customFields")).onChange(async (value) => {
            this.setSetting("customFields", value, { allowInherit: true });
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
          text.setValue(this.getSetting("statusOrder")).onChange(async (value) => {
            this.setSetting("statusOrder", value, { allowInherit: true });
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      new Setting(layoutSection)
        .setName(tx("settings.priority_order.name", "Priority order"))
        .setDesc(tx("settings.priority_order.desc", "Defines priority ranking for sorting. Comma-separated, highest first."))
        .addText((text) =>
          text.setPlaceholder("Urgent,High,Medium,Low").setValue(this.getSetting("priorityOrder")).onChange(async (value) => {
            this.setSetting("priorityOrder", value, { allowInherit: true });
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
            .setValue(this.getSetting("sortBy"))
            .onChange(async (value) => {
              this.setSetting("sortBy", value);
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
            .setValue(this.getSetting("sortDirection"))
            .onChange(async (value) => {
              this.setSetting("sortDirection", value);
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
        );

      new Setting(layoutSection)
        .setName(tx("settings.due_soon.name", "Due soon threshold"))
        .setDesc(tx("settings.due_soon.desc", "Cards due within this many days are highlighted."))
        .addText((text) =>
          text.setValue(String(this.getSetting("dueSoonDays", 2))).onChange(async (value) => {
            const parsed = Number.parseInt(value, 10);
            this.setSetting("dueSoonDays", Number.isFinite(parsed) && parsed >= 0 ? parsed : 2);
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      new Setting(layoutSection)
        .setName(tx("settings.wip_limits.name", "WIP limits"))
        .setDesc(tx("settings.wip_limits.desc", "Limit cards per lane. Format: Todo:10, In Progress:3"))
        .addTextArea((text) =>
          text.setValue(this.getSetting("wipLimits")).onChange(async (value) => {
            this.setSetting("wipLimits", value, { allowInherit: true });
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          })
        );

      new Setting(layoutSection)
        .setName(tx("settings.auto_archive.name", "Auto-archive done tasks"))
        .setDesc(tx("settings.auto_archive.desc", "Hide completed tasks older than this many days. Set to 0 to disable."))
        .addText((text) =>
          text.setValue(String(this.getSetting("autoArchiveDays", 0) || 0)).onChange(async (value) => {
            const parsed = Number.parseInt(value, 10);
            this.setSetting("autoArchiveDays", Number.isFinite(parsed) && parsed >= 0 ? parsed : 0);
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
            .setValue(this.getSetting("dateFormat", "YYYY-MM-DD") || "YYYY-MM-DD")
            .onChange(async (value) => {
              this.setSetting("dateFormat", String(value || "").trim() || "YYYY-MM-DD");
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
            .setValue(this.getSetting("dateDisplayFormat", "") || "")
            .onChange(async (value) => {
              this.setSetting("dateDisplayFormat", String(value || "").trim(), { allowInherit: true });
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
        );

      new Setting(dateSection)
        .setName(tx("settings.relative_due.name", "Show relative due labels"))
        .setDesc(tx("settings.relative_due.desc", "Show labels like \"Due in 3d\" instead of absolute dates."))
        .addToggle((toggle) =>
          toggle.setValue(this.getSetting("showRelativeDate", true) !== false).onChange(async (value) => {
            this.setSetting("showRelativeDate", !!value);
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
          const themeTarget = this.getThemeTarget();
          for (const [key, preset] of Object.entries(THEME_PRESETS)) {
            dropdown.addOption(key, preset.name);
          }
          dropdown.setValue((themeTarget && themeTarget.preset) || "default");
          dropdown.onChange(async (value) => {
            themeTarget.preset = value;
            themeTarget.overrides = {};
            this.syncTheme();
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
            .setValue(((this.getThemeTarget().overrides || {}).fontFamily) || "")
            .onChange(async (value) => {
              const themeTarget = this.getThemeTarget();
              if (!themeTarget.overrides) themeTarget.overrides = {};
              themeTarget.overrides.fontFamily = value.trim();
              this.syncTheme();
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
            .setValue(String(((this.getThemeTarget().overrides || {}).laneTintStrength) ?? 10))
            .onChange(async (value) => {
              const parsed = Number.parseInt(value, 10);
              const themeTarget = this.getThemeTarget();
              if (!themeTarget.overrides) themeTarget.overrides = {};
              if (!Number.isFinite(parsed)) delete themeTarget.overrides.laneTintStrength;
              else themeTarget.overrides.laneTintStrength = Math.max(0, Math.min(40, parsed));
              this.syncTheme();
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
            .setValue(String(((this.getThemeTarget().overrides || {}).laneHeaderTintStrength) ?? 24))
            .onChange(async (value) => {
              const parsed = Number.parseInt(value, 10);
              const themeTarget = this.getThemeTarget();
              if (!themeTarget.overrides) themeTarget.overrides = {};
              if (!Number.isFinite(parsed)) delete themeTarget.overrides.laneHeaderTintStrength;
              else themeTarget.overrides.laneHeaderTintStrength = Math.max(0, Math.min(60, parsed));
              this.syncTheme();
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

      const eff = this.plugin.getEffectiveSettings(this.plugin.settings.activeBoardId || "");
      const themeTarget = this.getThemeTarget();
      const preset = THEME_PRESETS[(eff.theme && eff.theme.preset) || "default"] || THEME_PRESETS.default;
      const resolved = { ...preset, ...((eff.theme && eff.theme.overrides) || {}) };
      const overrides = themeTarget.overrides || {};

      for (const group of themeColorGroups) {
        themeSection.createEl("h4", { text: group.label, cls: "sk-settings-color-group-title" });
        for (const field of group.fields) {
          const currentValue = resolved[field.key] || "#000000";
          const isOverridden = !!(overrides[field.key]);
          const setting = new Setting(themeSection).setName(field.label);
          setting.addColorPicker((picker) => {
            picker.setValue(currentValue);
            picker.onChange(async (value) => {
              if (!themeTarget.overrides) themeTarget.overrides = {};
              themeTarget.overrides[field.key] = value;
              this.syncTheme();
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            });
          });
          if (isOverridden) {
            setting.addButton((btn) => {
              btn.setButtonText(tx("common.reset", "Reset")).onClick(async () => {
                delete themeTarget.overrides[field.key];
                this.syncTheme();
                await this.plugin.saveSettings();
                this.plugin.refreshViews();
                this.display();
              });
            });
          }
        }
      }

      themeSection.createEl("h4", { text: tx("settings.per_lane_accent", "Per-Lane Accent Colors"), cls: "sk-settings-color-group-title" });
      const statuses = this.plugin.getStatusOrder(this.plugin.settings.activeBoardId || "");
      for (const status of statuses) {
        const laneColor = this.plugin.getResolvedLaneColor(status, this.plugin.settings.activeBoardId || "");
        const userLane = themeTarget.laneColors && themeTarget.laneColors[status];
        const setting = new Setting(themeSection)
          .setName(status)
          .setDesc(tx("settings.per_lane_accent.desc", "Accent and header text color for this lane."));
        setting.addColorPicker((picker) => {
          picker.setValue(laneColor.bg || "#868e96");
          picker.onChange(async (value) => {
            if (!themeTarget.laneColors) themeTarget.laneColors = {};
            if (!themeTarget.laneColors[status]) themeTarget.laneColors[status] = {};
            themeTarget.laneColors[status].bg = value;
            this.syncTheme();
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          });
        });
        setting.addColorPicker((picker) => {
          picker.setValue(laneColor.text || "#ffffff");
          picker.onChange(async (value) => {
            if (!themeTarget.laneColors) themeTarget.laneColors = {};
            if (!themeTarget.laneColors[status]) themeTarget.laneColors[status] = {};
            themeTarget.laneColors[status].text = value;
            this.syncTheme();
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          });
        });
        if (userLane && (userLane.bg || userLane.text)) {
          setting.addButton((btn) => {
            btn.setButtonText(tx("common.reset", "Reset")).onClick(async () => {
              delete themeTarget.laneColors[status];
              this.syncTheme();
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
      const currentMap = normalizeColorMap(this.getSetting(mapKey, {}) || {});

      const saveMap = async () => {
        this.setSetting(mapKey, currentMap);
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

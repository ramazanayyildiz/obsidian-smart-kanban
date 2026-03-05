var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/constants.js
var require_constants = __commonJS({
  "src/constants.js"(exports2, module2) {
    var VIEW_TYPE_SMART_KANBAN2 = "smart-kanban-view";
    var SETTINGS_SCHEMA_VERSION2 = 1;
    var THEME_PRESETS2 = {
      default: {
        name: "Default",
        cardBg: "",
        cardText: "",
        cardBorder: "",
        laneBg: "",
        laneHeaderBg: "",
        laneHeaderText: "",
        laneBorder: "",
        boardBg: "",
        tagBg: "",
        tagText: "",
        tagBorder: "",
        accentColor: "",
        priorityUrgent: "#e03131",
        priorityHigh: "#e8590c",
        priorityMedium: "#f08c00",
        priorityLow: "#2b8a3e",
        dueBadgeOverdue: "#e03131",
        dueBadgeSoon: "#e8590c",
        fontFamily: "",
        defaultLaneColors: {}
      },
      ocean: {
        name: "Ocean",
        cardBg: "#e7f5ff",
        cardText: "#1c3d5a",
        cardBorder: "#a5d8ff",
        laneBg: "#d0ebff",
        laneHeaderBg: "#1971c2",
        laneHeaderText: "#ffffff",
        laneBorder: "#74c0fc",
        boardBg: "#e7f5ff",
        tagBg: "#a5d8ff",
        tagText: "#1864ab",
        tagBorder: "#74c0fc",
        accentColor: "#1971c2",
        priorityUrgent: "#c92a2a",
        priorityHigh: "#d9480f",
        priorityMedium: "#e8590c",
        priorityLow: "#2b8a3e",
        dueBadgeOverdue: "#c92a2a",
        dueBadgeSoon: "#e8590c",
        fontFamily: "",
        defaultLaneColors: {
          "Backlog": { bg: "#1864ab", text: "#ffffff" },
          "Todo": { bg: "#1971c2", text: "#ffffff" },
          "In Progress": { bg: "#1c7ed6", text: "#ffffff" },
          "Done": { bg: "#228be6", text: "#ffffff" }
        }
      },
      forest: {
        name: "Forest",
        cardBg: "#ebfbee",
        cardText: "#1b4332",
        cardBorder: "#b2f2bb",
        laneBg: "#d3f9d8",
        laneHeaderBg: "#2b8a3e",
        laneHeaderText: "#ffffff",
        laneBorder: "#8ce99a",
        boardBg: "#ebfbee",
        tagBg: "#b2f2bb",
        tagText: "#1b4332",
        tagBorder: "#8ce99a",
        accentColor: "#2b8a3e",
        priorityUrgent: "#c92a2a",
        priorityHigh: "#e8590c",
        priorityMedium: "#f08c00",
        priorityLow: "#37b24d",
        dueBadgeOverdue: "#c92a2a",
        dueBadgeSoon: "#e8590c",
        fontFamily: "",
        defaultLaneColors: {
          "Backlog": { bg: "#1b4332", text: "#ffffff" },
          "Todo": { bg: "#2b8a3e", text: "#ffffff" },
          "In Progress": { bg: "#37b24d", text: "#ffffff" },
          "Done": { bg: "#40c057", text: "#ffffff" }
        }
      },
      sunset: {
        name: "Sunset",
        cardBg: "#fff9db",
        cardText: "#5c3d0e",
        cardBorder: "#ffe066",
        laneBg: "#fff3bf",
        laneHeaderBg: "#e8590c",
        laneHeaderText: "#ffffff",
        laneBorder: "#ffd43b",
        boardBg: "#fff9db",
        tagBg: "#ffe066",
        tagText: "#5c3d0e",
        tagBorder: "#ffd43b",
        accentColor: "#e8590c",
        priorityUrgent: "#c92a2a",
        priorityHigh: "#d9480f",
        priorityMedium: "#f08c00",
        priorityLow: "#5c940d",
        dueBadgeOverdue: "#c92a2a",
        dueBadgeSoon: "#e8590c",
        fontFamily: "",
        defaultLaneColors: {
          "Backlog": { bg: "#d9480f", text: "#ffffff" },
          "Todo": { bg: "#e8590c", text: "#ffffff" },
          "In Progress": { bg: "#f76707", text: "#ffffff" },
          "Done": { bg: "#fd7e14", text: "#ffffff" }
        }
      },
      midnight: {
        name: "Midnight",
        cardBg: "#1a1b2e",
        cardText: "#c1c2d3",
        cardBorder: "#2d2e4a",
        laneBg: "#141524",
        laneHeaderBg: "#3b3d8c",
        laneHeaderText: "#e0e0ff",
        laneBorder: "#2d2e4a",
        boardBg: "#0f1020",
        tagBg: "#2d2e4a",
        tagText: "#a5a6ff",
        tagBorder: "#3b3d8c",
        accentColor: "#5c5ce0",
        priorityUrgent: "#ff6b6b",
        priorityHigh: "#ff922b",
        priorityMedium: "#ffd43b",
        priorityLow: "#69db7c",
        dueBadgeOverdue: "#ff6b6b",
        dueBadgeSoon: "#ff922b",
        fontFamily: "",
        defaultLaneColors: {
          "Backlog": { bg: "#2b2c5e", text: "#e0e0ff" },
          "Todo": { bg: "#3b3d8c", text: "#e0e0ff" },
          "In Progress": { bg: "#4c4fb3", text: "#e0e0ff" },
          "Done": { bg: "#5c5ce0", text: "#ffffff" }
        }
      },
      minimal: {
        name: "Minimal",
        cardBg: "#fafafa",
        cardText: "#343a40",
        cardBorder: "#dee2e6",
        laneBg: "#f1f3f5",
        laneHeaderBg: "#868e96",
        laneHeaderText: "#ffffff",
        laneBorder: "#ced4da",
        boardBg: "#f8f9fa",
        tagBg: "#e9ecef",
        tagText: "#495057",
        tagBorder: "#ced4da",
        accentColor: "#495057",
        priorityUrgent: "#c92a2a",
        priorityHigh: "#d9480f",
        priorityMedium: "#e8590c",
        priorityLow: "#5c940d",
        dueBadgeOverdue: "#c92a2a",
        dueBadgeSoon: "#e8590c",
        fontFamily: "",
        defaultLaneColors: {}
      },
      candy: {
        name: "Candy",
        cardBg: "#fff0f6",
        cardText: "#6b1d3a",
        cardBorder: "#fcc2d7",
        laneBg: "#ffe3ec",
        laneHeaderBg: "#c2255c",
        laneHeaderText: "#ffffff",
        laneBorder: "#f783ac",
        boardBg: "#fff0f6",
        tagBg: "#fcc2d7",
        tagText: "#a61e4d",
        tagBorder: "#f783ac",
        accentColor: "#c2255c",
        priorityUrgent: "#e03131",
        priorityHigh: "#d9480f",
        priorityMedium: "#f08c00",
        priorityLow: "#37b24d",
        dueBadgeOverdue: "#e03131",
        dueBadgeSoon: "#e8590c",
        fontFamily: "",
        defaultLaneColors: {
          "Backlog": { bg: "#a61e4d", text: "#ffffff" },
          "Todo": { bg: "#c2255c", text: "#ffffff" },
          "In Progress": { bg: "#d6336c", text: "#ffffff" },
          "Done": { bg: "#e64980", text: "#ffffff" }
        }
      }
    };
    var DEFAULT_BOARD_CONFIG2 = {
      sourceMode: "notes",
      sourceFolder: "Tasks",
      includeSubfolders: false,
      taskInboxFile: "Tasks/Task Inbox.md",
      statusField: "Status",
      categoryField: "Category",
      priorityField: "Priority",
      tagsField: "Tags",
      dueDateField: "Due Date",
      customFields: "",
      statusOrder: "Backlog,Todo,In Progress,Follow,Research,Try,Recurring,Done",
      priorityOrder: "Urgent,High,Medium,Low",
      sortBy: "none",
      sortDirection: "asc",
      dueSoonDays: 2,
      wipLimits: "",
      autoArchiveDays: 0,
      noteTemplate: "",
      tagColors: {},
      categoryColors: {},
      dateFormat: "YYYY-MM-DD",
      dateDisplayFormat: "",
      showRelativeDate: true,
      theme: { preset: "default", overrides: {}, laneColors: {} },
      cardOrder: {}
    };
    var BOARD_CONFIG_KEYS2 = Object.freeze(Object.keys(DEFAULT_BOARD_CONFIG2));
    var DEFAULT_SETTINGS2 = {
      settingsSchemaVersion: SETTINGS_SCHEMA_VERSION2,
      defaultBoardConfig: { ...DEFAULT_BOARD_CONFIG2 },
      ...DEFAULT_BOARD_CONFIG2,
      refreshDebounceMs: 250,
      filterPresets: {},
      boards: [],
      activeBoardId: "",
      language: "en"
    };
    module2.exports = {
      VIEW_TYPE_SMART_KANBAN: VIEW_TYPE_SMART_KANBAN2,
      SETTINGS_SCHEMA_VERSION: SETTINGS_SCHEMA_VERSION2,
      THEME_PRESETS: THEME_PRESETS2,
      DEFAULT_BOARD_CONFIG: DEFAULT_BOARD_CONFIG2,
      BOARD_CONFIG_KEYS: BOARD_CONFIG_KEYS2,
      DEFAULT_SETTINGS: DEFAULT_SETTINGS2
    };
  }
});

// src/i18n.js
var require_i18n = __commonJS({
  "src/i18n.js"(exports2, module2) {
    var LOCALES2 = {
      en: {
        "common.add": "Add",
        "common.cancel": "Cancel",
        "common.clear": "Clear",
        "common.close": "Close",
        "common.create": "Create",
        "common.delete": "Delete",
        "common.edit": "Edit",
        "common.ellipsis": "...",
        "common.confirm": "Confirm",
        "common.none": "None",
        "common.reset": "Reset",
        "common.save": "Save",
        "settings.section.dataSource": "Data Source",
        "settings.section.dataSource.desc": "Where your tasks come from.",
        "settings.section.fieldMapping": "Field Mapping",
        "settings.section.fieldMapping.desc": "Map your frontmatter or inline fields to Kanban properties.",
        "settings.section.layout": "Board Layout",
        "settings.section.layout.desc": "Control lane order, sorting, and work-in-progress limits.",
        "settings.section.appearance": "Appearance",
        "settings.section.appearance.desc": "Customize colors, fonts, and visual theme.",
        "settings.section.advanced": "Advanced",
        "settings.section.advanced.desc": "Performance and behavior tuning.",
        "settings.section.dateDisplay": "Date Display",
        "settings.section.dateDisplay.desc": "Control saved date format and due badge rendering.",
        "settings.scope.title": "Editing Scope",
        "settings.scope.desc": "Board settings below apply to the active board in Smart Kanban view. Global settings stay in the Advanced section.",
        "settings.scope.active_board": "Active board",
        "settings.scope.current_board": "Current: {name}",
        "settings.scope.current_default": "Current: Default Board",
        "settings.scope.manage_boards": "Manage boards",
        "settings.scope.manage_boards.desc": "Create, edit, and delete boards.",
        "settings.scope.open_manager": "Open Board Manager",
        "settings.scope.badge.inherited": "inherited",
        "settings.scope.badge.overridden": "overridden",
        "settings.inherit.tooltip": "Use global value",
        "settings.language.name": "Language",
        "settings.language.desc": "UI language for Smart Kanban.",
        "settings.source_mode.name": "Source mode",
        "settings.source_mode.desc": "Note cards create one file per task. Task lines use checklist syntax in a single file.",
        "settings.source_mode.notes": "Note cards",
        "settings.source_mode.tasks": "Task lines",
        "settings.source_folder.name": "Source folder",
        "settings.source_folder.desc": "Folder containing your task notes or files.",
        "settings.include_subfolders.name": "Include subfolders",
        "settings.include_subfolders.desc": "Also scan nested folders inside the source folder.",
        "settings.task_inbox.name": "Task inbox file",
        "settings.task_inbox.desc": "File used when adding new tasks in Task Lines mode.",
        "settings.note_template.name": "Note template",
        "settings.note_template.desc": "Optional template file path used when creating note-mode tasks.",
        "settings.field.status.name": "Status field",
        "settings.field.status.desc": "Determines which lane a card appears in.",
        "settings.field.category.name": "Category field",
        "settings.field.category.desc": "Optional grouping label shown as a badge.",
        "settings.field.priority.name": "Priority field",
        "settings.field.priority.desc": "Sets priority level (Urgent, High, Medium, Low).",
        "settings.field.tags.name": "Tags field",
        "settings.field.tags.desc": "Comma-separated tags displayed on the card.",
        "settings.field.due.name": "Due date field",
        "settings.field.due.desc": "Date in YYYY-MM-DD format for due tracking.",
        "settings.custom_fields.name": "Custom fields",
        "settings.custom_fields.desc": "Extra frontmatter keys to display on cards. Comma-separated.",
        "settings.status_order.name": "Status order",
        "settings.status_order.desc": "Comma-separated lane names in display order.",
        "settings.status_manager.title": "Manage Lanes",
        "settings.status_manager.section": "Lanes",
        "settings.status_manager.name": "Lane manager",
        "settings.status_manager.desc": "Discover and reorder lanes from current board data.",
        "settings.status_manager.open": "Manage lanes",
        "settings.status_manager.empty": "At least one lane is required.",
        "settings.status_manager.saved": "Lane order updated.",
        "settings.priority_order.name": "Priority order",
        "settings.priority_order.desc": "Defines priority ranking for sorting. Comma-separated, highest first.",
        "settings.sort_by.name": "Sort by",
        "settings.sort_by.desc": "Default card sorting within each lane.",
        "settings.sort_by.none": "Manual (drag to reorder)",
        "settings.sort_by.priority": "Priority",
        "settings.sort_by.due": "Due date",
        "settings.sort_by.title": "Title",
        "settings.sort_direction.name": "Sort direction",
        "settings.sort_direction.asc": "Ascending",
        "settings.sort_direction.desc": "Descending",
        "settings.due_soon.name": "Due soon threshold",
        "settings.due_soon.desc": "Cards due within this many days are highlighted.",
        "settings.wip_limits.name": "WIP limits",
        "settings.wip_limits.desc": "Limit cards per lane. Format: Todo:10, In Progress:3",
        "settings.auto_archive.name": "Auto-archive done tasks",
        "settings.auto_archive.desc": "Hide completed tasks older than this many days. Set to 0 to disable.",
        "settings.date_format.name": "Date format",
        "settings.date_format.desc": "Storage format for new due dates. Uses Moment.js patterns.",
        "settings.date_display_format.name": "Date display format",
        "settings.date_display_format.desc": "Optional display format. Leave empty to use Date format.",
        "settings.relative_due.name": "Show relative due labels",
        "settings.relative_due.desc": 'Show labels like "Due in 3d" instead of absolute dates.',
        "settings.theme_preset.name": "Theme preset",
        "settings.theme_preset.desc": "Choose a color scheme as a starting point. You can override individual colors below.",
        "settings.font_family.name": "Font family",
        "settings.font_family.desc": "Custom font stack for the board. Leave empty for default.",
        "settings.tag_colors.name": "Tag colors",
        "settings.tag_colors.desc": "Define per-tag badge colors.",
        "settings.tag_colors.add": "Add tag color",
        "settings.tag_colors.key_placeholder": "tag name",
        "settings.tag_colors.invalid_json": "Invalid tag colors JSON.",
        "settings.category_colors.name": "Category colors",
        "settings.category_colors.desc": "Define per-category badge colors.",
        "settings.category_colors.add": "Add category color",
        "settings.category_colors.key_placeholder": "category name",
        "settings.category_colors.invalid_json": "Invalid category colors JSON.",
        "settings.lane_tint.name": "Lane body tint strength",
        "settings.lane_tint.desc": "How much lane accent color appears in lane background. 0-40.",
        "settings.lane_header_tint.name": "Lane header tint strength",
        "settings.lane_header_tint.desc": "How much lane accent color appears in lane header chip. 0-60.",
        "settings.per_lane_accent": "Per-Lane Accent Colors",
        "settings.per_lane_accent.desc": "Accent and header text color for this lane.",
        "settings.theme.group.card": "Card Colors",
        "settings.theme.group.lane": "Lane Colors",
        "settings.theme.group.priority": "Priority",
        "settings.theme.group.tags": "Tags & Accent",
        "settings.theme.group.due": "Due Dates",
        "settings.theme.group.board": "Board",
        "settings.theme.cardBg": "Background",
        "settings.theme.cardText": "Text",
        "settings.theme.cardBorder": "Border",
        "settings.theme.laneBg": "Base lane tint",
        "settings.theme.laneHeaderBg": "Base header tint",
        "settings.theme.laneHeaderText": "Header text",
        "settings.theme.laneBorder": "Lane border",
        "settings.theme.priorityUrgent": "Urgent",
        "settings.theme.priorityHigh": "High",
        "settings.theme.priorityMedium": "Medium",
        "settings.theme.priorityLow": "Low",
        "settings.theme.tagBg": "Tag background",
        "settings.theme.tagText": "Tag text",
        "settings.theme.tagBorder": "Tag border",
        "settings.theme.accentColor": "Accent",
        "settings.theme.dueBadgeOverdue": "Overdue",
        "settings.theme.dueBadgeSoon": "Due soon",
        "settings.theme.boardBg": "Board background",
        "settings.refresh_debounce.name": "Refresh debounce",
        "settings.refresh_debounce.desc": "Milliseconds to wait after a file change before refreshing the board.",
        "settings.language.en": "English",
        "settings.language.tr": "Turkish",
        "view.board.default": "Default Board",
        "view.board.view_suffix": "(view)",
        "view.board.fallback_title": "Todo",
        "view.search.placeholder": "Search...",
        "view.toolbar.toggle_filters": "Toggle Filters",
        "view.toolbar.new_task": "New Task",
        "view.toolbar.refresh": "Refresh",
        "view.toolbar.plugin_settings": "Plugin Settings",
        "view.toolbar.quick_config": "Quick Configure (Lanes/Fields)",
        "view.toolbar.configure_board": "Configure Board",
        "view.mode.board": "Board",
        "view.mode.table": "Table",
        "view.mode.feed": "Feed",
        "view.mode.list": "List",
        "view.configure.title": "Configure Board",
        "view.configure.lanes": "Lanes / Statuses",
        "view.configure.custom_fields": "Custom Fields",
        "view.configure.updated_notice": "Board configuration updated.",
        "view.task.new.title": "New Task",
        "view.task.edit.title": "Edit Task",
        "view.task.title_required": "Task title is required.",
        "view.task.invalid_due_date": "Invalid due date. Use YYYY-MM-DD.",
        "view.preset.placeholder": "Views...",
        "view.preset.delete_title": "Delete view",
        "view.preset.save_title": "Save current filters as view",
        "view.preset.save_dialog_title": "Save View Preset",
        "view.preset.delete_dialog_title": "Delete Preset",
        "view.preset.name_label": "Preset name",
        "view.preset.not_found": "Preset not found: {name}",
        "view.preset.saved_notice": "Saved view: {name}",
        "view.preset.delete_confirm": 'Delete preset "{name}"?',
        "view.preset.deleted_notice": "Deleted view: {name}",
        "view.empty.no_tasks_title": "No tasks found",
        "view.empty.no_tasks_desc": "Create your first task to get started, or check that your source folder is configured correctly.",
        "view.empty.create_first_task": "Create First Task",
        "view.empty.no_filter_match": "No tasks match current filters.",
        "view.empty.clear_filters": "Clear Filters",
        "view.empty.no_tasks": "No tasks found.",
        "view.quick_add.new_page": "+ New page",
        "view.quick_add.placeholder": "Untitled",
        "view.menu.edit": "Edit",
        "view.menu.open_note": "Open Note",
        "view.menu.mark_done": "Mark Done",
        "view.menu.move_to": "Move to",
        "view.menu.completed_notice": "Completed: {title}",
        "view.delete.title": "Delete Task",
        "view.delete.message": 'Delete "{title}"? This cannot be undone.',
        "view.delete.deleted_notice": "Deleted: {title}",
        "main.no_custom_boards": "No custom boards. Use default board.",
        "main.select_board.title": "Select Board",
        "main.select_board.submit": "Open",
        "main.select_board.label": "Board",
        "main.self_check_ok": "Smart Kanban self-check OK. Cards loaded: {count}",
        "main.file_menu.open_as_board": "Open as Kanban Board",
        "main.file_menu.show_in_kanban": "Show in Kanban",
        "main.source_folder_set": "Kanban: source folder -> {path}",
        "main.board_parent_cycle": 'Detected board parent cycle at "{name}". Using global settings fallback.',
        "main.file_not_found": "File not found: {path}",
        "main.task_line_not_found": "Task line not found: {path}:{line}",
        "main.rename_failed": "Rename failed: {error}",
        "main.task_note_created": "Created task note: {name}",
        "main.source_folder_empty": "Source folder is empty.",
        "main.template_missing": "Template file not found: {path}. Using default note layout.",
        "main.task_inbox_empty": "Task inbox file is empty.",
        "main.task_line_created": "Created task line.",
        "modal.board_manager.title": "Board Manager",
        "modal.board_manager.no_boards": "No custom boards yet.",
        "modal.board_manager.create_new": "Create New Board",
        "modal.board_create.title": "Create Board",
        "modal.board_create.name_required": "Board name is required.",
        "modal.board_create.created_notice": "Board created: {name}",
        "modal.board_edit.updated_notice": "Board updated: {name}",
        "modal.board.field.name": "Board name",
        "modal.board.field.type": "Type",
        "modal.board.field.source_folder": "Source folder (blank = inherit)",
        "modal.board.field.status_order": "Status order (comma-sep, blank = inherit)",
        "modal.board.field.visible_statuses": "Visible statuses (filtered-view, comma-sep)",
        "modal.board.field.visible_statuses_short": "Visible statuses (filtered-view)",
        "modal.board_edit.title": "Edit Board: {name}",
        "modal.board.field.note_template": "Note template (blank = inherit)",
        "modal.board.field.sort_by": "Sort by (blank = inherit)",
        "modal.board.field.due_soon_days": "Due soon days (blank = inherit)",
        "modal.board.field.wip_limits": "WIP limits (blank = inherit)",
        "modal.board.field.date_format": "Date format (blank = inherit)",
        "modal.board.field.date_display_format": "Display format (blank = inherit)",
        "modal.board.field.show_relative_date": "Relative dates",
        "modal.board.field.show_relative_date.inherit": "Inherit",
        "modal.board.field.show_relative_date.yes": "Yes",
        "modal.board.field.show_relative_date.no": "No",
        "modal.board.field.tag_colors": "Tag colors JSON (blank = inherit)",
        "modal.board.field.category_colors": "Category colors JSON (blank = inherit)",
        "modal.configure.title": "Configure",
        "modal.configure.open_settings": "All Board Settings",
        "modal.drag.add_placeholder": "Add {section}...",
        "modal.form.title": "Form",
        "modal.form.field": "Field",
        "modal.confirm.title": "Confirm",
        "modal.confirm.message": "Are you sure?",
        "due.today": "Due today",
        "due.tomorrow": "Due tomorrow",
        "due.in_days": "Due in {days}d",
        "due.overdue_days": "Overdue by {days}d"
      },
      tr: {
        "common.add": "Ekle",
        "common.cancel": "Iptal",
        "common.clear": "Temizle",
        "common.close": "Kapat",
        "common.create": "Olustur",
        "common.delete": "Sil",
        "common.edit": "Duzenle",
        "common.ellipsis": "...",
        "common.confirm": "Onayla",
        "common.none": "Yok",
        "common.reset": "Sifirla",
        "common.save": "Kaydet",
        "settings.section.dataSource": "Veri Kaynagi",
        "settings.section.dataSource.desc": "Gorevlerin nereden geldigi.",
        "settings.section.fieldMapping": "Alan Eslestirme",
        "settings.section.fieldMapping.desc": "Frontmatter veya inline alanlarini Kanban ozelliklerine eslestirin.",
        "settings.section.layout": "Pano Duzeni",
        "settings.section.layout.desc": "Lane sirasi, siralama ve WIP limitlerini yonetin.",
        "settings.section.appearance": "Gorunum",
        "settings.section.appearance.desc": "Renkleri, fontlari ve tema ayarlarini ozellestirin.",
        "settings.section.advanced": "Gelismis",
        "settings.section.advanced.desc": "Performans ve davranis ayarlari.",
        "settings.section.dateDisplay": "Tarih Gorunumu",
        "settings.section.dateDisplay.desc": "Kaydedilen tarih formatini ve teslim etiketi gorunumunu yonetin.",
        "settings.scope.title": "Duzenleme Kapsami",
        "settings.scope.desc": "Asagidaki pano ayarlari Smart Kanban gorunumundeki aktif panoya uygulanir. Global ayarlar Gelismis bolumunde kalir.",
        "settings.scope.active_board": "Aktif pano",
        "settings.scope.current_board": "Guncel: {name}",
        "settings.scope.current_default": "Guncel: Varsayilan Pano",
        "settings.scope.manage_boards": "Panolari yonet",
        "settings.scope.manage_boards.desc": "Pano olustur, duzenle ve sil.",
        "settings.scope.open_manager": "Pano Yoneticisini Ac",
        "settings.scope.badge.inherited": "devralinan",
        "settings.scope.badge.overridden": "ozel",
        "settings.inherit.tooltip": "Global degeri kullan",
        "settings.language.name": "Dil",
        "settings.language.desc": "Smart Kanban arayuz dili.",
        "settings.source_mode.name": "Kaynak modu",
        "settings.source_mode.desc": "Not kartlari her gorev icin bir dosya olusturur. Gorev satirlari tek dosyada checklist soz dizimi kullanir.",
        "settings.source_mode.notes": "Not kartlari",
        "settings.source_mode.tasks": "Gorev satirlari",
        "settings.source_folder.name": "Kaynak klasor",
        "settings.source_folder.desc": "Gorev notlarinin/dosyalarinin bulundugu klasor.",
        "settings.include_subfolders.name": "Alt klasorleri dahil et",
        "settings.include_subfolders.desc": "Kaynak klasor altindaki klasorleri de tara.",
        "settings.task_inbox.name": "Gorev inbox dosyasi",
        "settings.task_inbox.desc": "Gorev satiri modunda yeni gorevlerin eklendigi dosya.",
        "settings.note_template.name": "Not sablonu",
        "settings.note_template.desc": "Not modunda gorev olustururken kullanilan opsiyonel sablon dosya yolu.",
        "settings.field.status.name": "Durum alani",
        "settings.field.status.desc": "Kartin hangi lane'de gorunecegini belirler.",
        "settings.field.category.name": "Kategori alani",
        "settings.field.category.desc": "Rozet olarak gosterilen opsiyonel grup etiketi.",
        "settings.field.priority.name": "Oncelik alani",
        "settings.field.priority.desc": "Oncelik seviyesini belirler (Urgent, High, Medium, Low).",
        "settings.field.tags.name": "Etiket alani",
        "settings.field.tags.desc": "Kartta gosterilen virgul ayracli etiketler.",
        "settings.field.due.name": "Teslim tarihi alani",
        "settings.field.due.desc": "Teslim takibi icin YYYY-MM-DD formatinda tarih.",
        "settings.custom_fields.name": "Ozel alanlar",
        "settings.custom_fields.desc": "Kartta gosterilecek ek frontmatter anahtarlari. Virgul ayracli.",
        "settings.status_order.name": "Durum sirasi",
        "settings.status_order.desc": "Gosterim sirasi icin virgul ayracli lane adlari.",
        "settings.status_manager.title": "Lane'leri Yonet",
        "settings.status_manager.section": "Lane'ler",
        "settings.status_manager.name": "Lane yoneticisi",
        "settings.status_manager.desc": "Aktif pano verisinden lane'leri kesfet ve sirala.",
        "settings.status_manager.open": "Lane'leri yonet",
        "settings.status_manager.empty": "En az bir lane gerekli.",
        "settings.status_manager.saved": "Lane sirasi guncellendi.",
        "settings.priority_order.name": "Oncelik sirasi",
        "settings.priority_order.desc": "Siralama icin oncelik sirasi. Virgul ayracli, yuksekten dusuge.",
        "settings.sort_by.name": "Siralama alani",
        "settings.sort_by.desc": "Her lane icin varsayilan kart siralamasi.",
        "settings.sort_by.none": "Manuel (surukle-birak)",
        "settings.sort_by.priority": "Oncelik",
        "settings.sort_by.due": "Teslim tarihi",
        "settings.sort_by.title": "Baslik",
        "settings.sort_direction.name": "Siralama yonu",
        "settings.sort_direction.asc": "Artan",
        "settings.sort_direction.desc": "Azalan",
        "settings.due_soon.name": "Yaklasan teslim esigi",
        "settings.due_soon.desc": "Bu gun sayisi icindeki kartlar vurgulanir.",
        "settings.wip_limits.name": "WIP limitleri",
        "settings.wip_limits.desc": "Lane basina kart limiti. Format: Todo:10, In Progress:3",
        "settings.auto_archive.name": "Tamamlanan gorevleri oto-arsivle",
        "settings.auto_archive.desc": "Bu gunden daha eski tamamlananlari gizle. Devre disi icin 0.",
        "settings.date_format.name": "Tarih formati",
        "settings.date_format.desc": "Yeni teslim tarihleri icin kayit formati. Moment.js deseni kullanir.",
        "settings.date_display_format.name": "Tarih gosterim formati",
        "settings.date_display_format.desc": "Opsiyonel gosterim formati. Bossa Tarih formatini kullanir.",
        "settings.relative_due.name": "Goreli teslim etiketleri goster",
        "settings.relative_due.desc": '"3g sonra" gibi etiketler gosterir, mutlak tarih yerine.',
        "settings.theme_preset.name": "Tema preset",
        "settings.theme_preset.desc": "Baslangic icin renk semasi secin. Asagidan tek tek override edebilirsiniz.",
        "settings.font_family.name": "Yazi tipi ailesi",
        "settings.font_family.desc": "Pano icin ozel font stack. Bos birakirsan varsayilan.",
        "settings.tag_colors.name": "Etiket renkleri",
        "settings.tag_colors.desc": "Etiket rozet renklerini tanimla.",
        "settings.tag_colors.add": "Etiket rengi ekle",
        "settings.tag_colors.key_placeholder": "etiket adi",
        "settings.tag_colors.invalid_json": "Gecersiz etiket renk JSON'u.",
        "settings.category_colors.name": "Kategori renkleri",
        "settings.category_colors.desc": "Kategori rozet renklerini tanimla.",
        "settings.category_colors.add": "Kategori rengi ekle",
        "settings.category_colors.key_placeholder": "kategori adi",
        "settings.category_colors.invalid_json": "Gecersiz kategori renk JSON'u.",
        "settings.lane_tint.name": "Lane govde tint gucu",
        "settings.lane_tint.desc": "Lane arka planda vurgu renginin gorunme miktari. 0-40.",
        "settings.lane_header_tint.name": "Lane baslik tint gucu",
        "settings.lane_header_tint.desc": "Lane basliginda vurgu renginin gorunme miktari. 0-60.",
        "settings.per_lane_accent": "Lane Bazli Vurgu Renkleri",
        "settings.per_lane_accent.desc": "Bu lane icin vurgu ve baslik metin rengi.",
        "settings.theme.group.card": "Kart Renkleri",
        "settings.theme.group.lane": "Lane Renkleri",
        "settings.theme.group.priority": "Oncelik",
        "settings.theme.group.tags": "Etiket ve Vurgu",
        "settings.theme.group.due": "Teslim Tarihleri",
        "settings.theme.group.board": "Pano",
        "settings.theme.cardBg": "Arka plan",
        "settings.theme.cardText": "Metin",
        "settings.theme.cardBorder": "Kenarlik",
        "settings.theme.laneBg": "Temel lane tint",
        "settings.theme.laneHeaderBg": "Temel baslik tint",
        "settings.theme.laneHeaderText": "Baslik metni",
        "settings.theme.laneBorder": "Lane kenarligi",
        "settings.theme.priorityUrgent": "Acil",
        "settings.theme.priorityHigh": "Yuksek",
        "settings.theme.priorityMedium": "Orta",
        "settings.theme.priorityLow": "Dusuk",
        "settings.theme.tagBg": "Etiket arka plan",
        "settings.theme.tagText": "Etiket metni",
        "settings.theme.tagBorder": "Etiket kenarligi",
        "settings.theme.accentColor": "Vurgu",
        "settings.theme.dueBadgeOverdue": "Gecikmis",
        "settings.theme.dueBadgeSoon": "Yaklasan teslim",
        "settings.theme.boardBg": "Pano arka plan",
        "settings.refresh_debounce.name": "Yenileme debounce",
        "settings.refresh_debounce.desc": "Dosya degisimi sonrasi pano yenileme bekleme suresi (ms).",
        "settings.language.en": "Ingilizce",
        "settings.language.tr": "Turkce",
        "view.board.default": "Varsayilan Pano",
        "view.board.view_suffix": "(gorunum)",
        "view.board.fallback_title": "Yapilacaklar",
        "view.search.placeholder": "Ara...",
        "view.toolbar.toggle_filters": "Filtreleri Ac/Kapat",
        "view.toolbar.new_task": "Yeni Gorev",
        "view.toolbar.refresh": "Yenile",
        "view.toolbar.plugin_settings": "Eklenti Ayarlari",
        "view.toolbar.quick_config": "Hizli Yapilandir (Lane/Alan)",
        "view.toolbar.configure_board": "Panoyu Yapilandir",
        "view.mode.board": "Pano",
        "view.mode.table": "Tablo",
        "view.mode.feed": "Akis",
        "view.mode.list": "Liste",
        "view.configure.title": "Panoyu Yapilandir",
        "view.configure.lanes": "Lane / Durumlar",
        "view.configure.custom_fields": "Ozel Alanlar",
        "view.configure.updated_notice": "Pano yapilandirmasi guncellendi.",
        "view.task.new.title": "Yeni Gorev",
        "view.task.edit.title": "Gorevi Duzenle",
        "view.task.title_required": "Gorev basligi zorunludur.",
        "view.task.invalid_due_date": "Gecersiz tarih. YYYY-MM-DD kullanin.",
        "view.preset.placeholder": "Gorunumler...",
        "view.preset.delete_title": "Gorunumu sil",
        "view.preset.save_title": "Mevcut filtreleri gorunum olarak kaydet",
        "view.preset.save_dialog_title": "Gorunumu Kaydet",
        "view.preset.delete_dialog_title": "Gorunumu Sil",
        "view.preset.name_label": "Gorunum adi",
        "view.preset.not_found": "Gorunum bulunamadi: {name}",
        "view.preset.saved_notice": "Gorunum kaydedildi: {name}",
        "view.preset.delete_confirm": '"{name}" gorunumu silinsin mi?',
        "view.preset.deleted_notice": "Gorunum silindi: {name}",
        "view.empty.no_tasks_title": "Gorev bulunamadi",
        "view.empty.no_tasks_desc": "Baslamak icin ilk gorevi olusturun veya kaynak klasor ayarini kontrol edin.",
        "view.empty.create_first_task": "Ilk Gorevi Olustur",
        "view.empty.no_filter_match": "Filtrelerle eslesen gorev yok.",
        "view.empty.clear_filters": "Filtreleri Temizle",
        "view.empty.no_tasks": "Gorev bulunamadi.",
        "view.quick_add.new_page": "+ Yeni sayfa",
        "view.quick_add.placeholder": "Basliksiz",
        "view.menu.edit": "Duzenle",
        "view.menu.open_note": "Notu Ac",
        "view.menu.mark_done": "Tamamlandi Isaretle",
        "view.menu.move_to": "Tasi",
        "view.menu.completed_notice": "Tamamlandi: {title}",
        "view.delete.title": "Gorevi Sil",
        "view.delete.message": '"{title}" silinsin mi? Bu islem geri alinamaz.',
        "view.delete.deleted_notice": "Silindi: {title}",
        "main.no_custom_boards": "Ozel pano yok. Varsayilan pano kullaniliyor.",
        "main.select_board.title": "Pano Sec",
        "main.select_board.submit": "Ac",
        "main.select_board.label": "Pano",
        "main.self_check_ok": "Smart Kanban self-check OK. Yuklenen kart: {count}",
        "main.file_menu.open_as_board": "Kanban Pano Olarak Ac",
        "main.file_menu.show_in_kanban": "Kanban'da Goster",
        "main.source_folder_set": "Kanban: kaynak klasor -> {path}",
        "main.board_parent_cycle": '"{name}" panosunda parent dongusu tespit edildi. Global ayarlara donuluyor.',
        "main.file_not_found": "Dosya bulunamadi: {path}",
        "main.task_line_not_found": "Gorev satiri bulunamadi: {path}:{line}",
        "main.rename_failed": "Yeniden adlandirma basarisiz: {error}",
        "main.task_note_created": "Gorev notu olusturuldu: {name}",
        "main.source_folder_empty": "Kaynak klasor bos.",
        "main.template_missing": "Sablon dosyasi bulunamadi: {path}. Varsayilan not duzeni kullaniliyor.",
        "main.task_inbox_empty": "Gorev inbox dosyasi bos.",
        "main.task_line_created": "Gorev satiri olusturuldu.",
        "modal.board_manager.title": "Pano Yoneticisi",
        "modal.board_manager.no_boards": "Henuz ozel pano yok.",
        "modal.board_manager.create_new": "Yeni Pano Olustur",
        "modal.board_create.title": "Pano Olustur",
        "modal.board_create.name_required": "Pano adi zorunludur.",
        "modal.board_create.created_notice": "Pano olusturuldu: {name}",
        "modal.board_edit.updated_notice": "Pano guncellendi: {name}",
        "modal.board.field.name": "Pano adi",
        "modal.board.field.type": "Tur",
        "modal.board.field.source_folder": "Kaynak klasor (bos = miras al)",
        "modal.board.field.status_order": "Durum sirasi (virgul ayracli, bos = miras al)",
        "modal.board.field.visible_statuses": "Gorunen durumlar (filtered-view, virgul ayracli)",
        "modal.board.field.visible_statuses_short": "Gorunen durumlar (filtered-view)",
        "modal.board_edit.title": "Panoyu Duzenle: {name}",
        "modal.board.field.note_template": "Not sablonu (bos = miras al)",
        "modal.board.field.sort_by": "Siralama (bos = miras al)",
        "modal.board.field.due_soon_days": "Yaklasan teslim gunu (bos = miras al)",
        "modal.board.field.wip_limits": "WIP limitleri (bos = miras al)",
        "modal.board.field.date_format": "Tarih formati (bos = miras al)",
        "modal.board.field.date_display_format": "Gosterim formati (bos = miras al)",
        "modal.board.field.show_relative_date": "Goreli tarihler",
        "modal.board.field.show_relative_date.inherit": "Miras al",
        "modal.board.field.show_relative_date.yes": "Evet",
        "modal.board.field.show_relative_date.no": "Hayir",
        "modal.board.field.tag_colors": "Etiket renkleri JSON (bos = miras al)",
        "modal.board.field.category_colors": "Kategori renkleri JSON (bos = miras al)",
        "modal.configure.title": "Yapilandir",
        "modal.configure.open_settings": "Tum Pano Ayarlari",
        "modal.drag.add_placeholder": "{section} ekle...",
        "modal.form.title": "Form",
        "modal.form.field": "Alan",
        "modal.confirm.title": "Onay",
        "modal.confirm.message": "Emin misiniz?",
        "due.today": "Bugun teslim",
        "due.tomorrow": "Yarin teslim",
        "due.in_days": "{days}g sonra",
        "due.overdue_days": "{days}g gecikti"
      }
    };
    var currentLocale = "en";
    function getLocale() {
      return currentLocale;
    }
    function setLocale2(locale) {
      if (LOCALES2[locale]) currentLocale = locale;
      else currentLocale = "en";
    }
    function interpolate(template, params) {
      if (!params || typeof params !== "object") return template;
      return String(template).replace(/\{(\w+)\}/g, (_, key) => {
        if (Object.prototype.hasOwnProperty.call(params, key)) return String(params[key]);
        return `{${key}}`;
      });
    }
    function t2(key, params) {
      var _a, _b;
      const localePack = LOCALES2[currentLocale] || LOCALES2.en;
      const fallbackPack = LOCALES2.en;
      const raw = (_b = (_a = localePack[key]) != null ? _a : fallbackPack[key]) != null ? _b : key;
      return interpolate(raw, params);
    }
    module2.exports = { LOCALES: LOCALES2, t: t2, setLocale: setLocale2, getLocale };
  }
});

// src/core.js
var require_core = __commonJS({
  "src/core.js"(exports2, module2) {
    function normalizeDateInput2(value) {
      const text = String(value || "").trim();
      if (!text) return "";
      const direct = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (direct) {
        const date = /* @__PURE__ */ new Date(`${direct[1]}-${direct[2]}-${direct[3]}T00:00:00`);
        if (Number.isNaN(date.getTime())) return "";
        return `${direct[1]}-${direct[2]}-${direct[3]}`;
      }
      const parsed = new Date(text);
      if (Number.isNaN(parsed.getTime())) return "";
      return formatDateLocal(parsed);
    }
    function getDueInfo2(dueDate, dueSoonDays, nowDate, options) {
      if (!dueDate) return null;
      const date = /* @__PURE__ */ new Date(`${dueDate}T00:00:00`);
      if (Number.isNaN(date.getTime())) return null;
      const now = nowDate instanceof Date ? nowDate : /* @__PURE__ */ new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const dueStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const diffDays = Math.round((dueStart.getTime() - todayStart.getTime()) / 864e5);
      const opts = options && typeof options === "object" ? options : {};
      const showRelativeDate = opts.showRelativeDate !== false;
      const translate = typeof opts.t === "function" ? opts.t : null;
      const displayFormat = String(opts.dateDisplayFormat || opts.dateFormat || "").trim();
      const labelFor = (key, fallback, params) => {
        if (!translate) return fallback;
        return translate(key, params);
      };
      const absoluteLabel = () => {
        if (!displayFormat) return dueDate;
        const momentRef = typeof window !== "undefined" && window.moment || typeof globalThis !== "undefined" && globalThis.moment;
        if (typeof momentRef === "function") {
          const m = momentRef(dueDate, ["YYYY-MM-DD", momentRef.ISO_8601], true);
          if (m && typeof m.isValid === "function" && m.isValid()) return m.format(displayFormat);
        }
        return dueDate;
      };
      if (!showRelativeDate) {
        const cls = diffDays < 0 ? "is-overdue" : diffDays <= Math.max(0, Number(dueSoonDays) || 0) ? "is-due-soon" : "";
        return {
          label: absoluteLabel(),
          cls,
          sortValue: dueStart.getTime()
        };
      }
      if (diffDays < 0) {
        return {
          label: labelFor("due.overdue_days", `Overdue ${Math.abs(diffDays)}d`, { days: Math.abs(diffDays) }),
          cls: "is-overdue",
          sortValue: dueStart.getTime()
        };
      }
      if (diffDays === 0) {
        return {
          label: labelFor("due.today", "Due today"),
          cls: "is-due-soon",
          sortValue: dueStart.getTime()
        };
      }
      if (diffDays === 1) {
        return {
          label: labelFor("due.tomorrow", "Due tomorrow"),
          cls: "is-due-soon",
          sortValue: dueStart.getTime()
        };
      }
      if (diffDays <= Math.max(0, Number(dueSoonDays) || 0)) {
        return {
          label: labelFor("due.in_days", `Due in ${diffDays}d`, { days: diffDays }),
          cls: "is-due-soon",
          sortValue: dueStart.getTime()
        };
      }
      return {
        label: labelFor("due.in_days", `Due in ${diffDays}d`, { days: diffDays }),
        cls: "",
        sortValue: dueStart.getTime()
      };
    }
    function parseTaskLine2(line, opts) {
      const match = String(line || "").match(/^\s*-\s*\[( |x|X)\]\s+(.*)$/);
      if (!match) return null;
      const body = match[2];
      const statusField = String(opts && opts.statusField || "Status");
      const categoryField = String(opts && opts.categoryField || "Category");
      const priorityField = String(opts && opts.priorityField || "Priority");
      const tagsField = String(opts && opts.tagsField || "Tags");
      const dueDateField = String(opts && opts.dueDateField || "Due Date");
      const defaultStatus = String(opts && opts.defaultStatus || "Todo").trim() || "Todo";
      const statusOrder = Array.isArray(opts && opts.statusOrder) ? opts.statusOrder : [defaultStatus];
      const inlineFields = parseInlineFields(body);
      const inlineMap = /* @__PURE__ */ new Map();
      for (const field of inlineFields) {
        inlineMap.set(field.key.toLowerCase(), field.value);
      }
      const hashtags = extractHashtags(body);
      const status = normalizeText(inlineMap.get(statusField.toLowerCase())) || inferStatusFromTags(hashtags, statusOrder) || defaultStatus;
      const tagsFromField = splitCsv2(inlineMap.get(tagsField.toLowerCase()));
      const tags = uniqueStrings2([...hashtags, ...tagsFromField]);
      const title = cleanTaskTitle(body, inlineFields);
      return {
        title,
        status,
        category: normalizeText(inlineMap.get(categoryField.toLowerCase())),
        priority: normalizeText(inlineMap.get(priorityField.toLowerCase())),
        dueDate: normalizeDateInput2(inlineMap.get(dueDateField.toLowerCase())),
        tags
      };
    }
    function updateTaskLineFields2(line, updates) {
      let next = String(line || "");
      for (const [key, value] of Object.entries(updates || {})) {
        next = upsertInlineField(next, key, value);
      }
      return next;
    }
    function upsertInlineField(line, key, value) {
      const k = String(key || "").trim();
      if (!k) return line;
      const rawValue = Array.isArray(value) ? value.join(", ") : String(value == null ? "" : value);
      const trimmedValue = rawValue.trim();
      const pattern = new RegExp(`\\s*\\[${escapeRegExp(k)}::[^\\]]*\\]`, "i");
      if (!trimmedValue) {
        return String(line || "").replace(pattern, "").replace(/\s+$/, "");
      }
      const fieldToken = ` [${k}:: ${trimmedValue}]`;
      if (pattern.test(String(line || ""))) {
        return String(line || "").replace(pattern, fieldToken).replace(/\s+$/, "");
      }
      return `${String(line || "").replace(/\s+$/, "")}${fieldToken}`;
    }
    function parseWipLimits2(value) {
      const map = /* @__PURE__ */ new Map();
      for (const pair of String(value || "").split(",").map((x) => x.trim()).filter(Boolean)) {
        const sep = pair.indexOf(":");
        if (sep === -1) continue;
        const key = pair.slice(0, sep).trim().toLowerCase();
        const amount = Number.parseInt(pair.slice(sep + 1).trim(), 10);
        if (key && Number.isFinite(amount) && amount > 0) {
          map.set(key, amount);
        }
      }
      return map;
    }
    function sortCards2(cards, sortBy, sortDirection, priorityOrderMap, cardOrder) {
      if (sortBy === "none") {
        const order = cardOrder || {};
        return [...cards].sort((a, b) => (order[a.id] || 0) - (order[b.id] || 0));
      }
      const direction = sortDirection === "desc" ? -1 : 1;
      const priorities = priorityOrderMap instanceof Map ? priorityOrderMap : /* @__PURE__ */ new Map();
      return [...cards].sort((a, b) => {
        let cmp = 0;
        if (sortBy === "title") {
          cmp = String(a.title || "").localeCompare(String(b.title || ""));
        } else if (sortBy === "due") {
          const aTime = a.dueTs == null ? Number.MAX_SAFE_INTEGER : a.dueTs;
          const bTime = b.dueTs == null ? Number.MAX_SAFE_INTEGER : b.dueTs;
          cmp = aTime - bTime;
        } else if (sortBy === "priority") {
          const aIdx = priorities.has(String(a.priority || "").toLowerCase()) ? priorities.get(String(a.priority || "").toLowerCase()) : Number.MAX_SAFE_INTEGER;
          const bIdx = priorities.has(String(b.priority || "").toLowerCase()) ? priorities.get(String(b.priority || "").toLowerCase()) : Number.MAX_SAFE_INTEGER;
          cmp = aIdx - bIdx;
        }
        if (cmp === 0) {
          cmp = String(a.title || "").localeCompare(String(b.title || ""));
        }
        return cmp * direction;
      });
    }
    function parseInlineFields(body) {
      const out = [];
      const pattern = /\[([^\]:]+)::\s*([^\]]*)\]/g;
      let match = pattern.exec(String(body || ""));
      while (match) {
        out.push({
          key: String(match[1] || "").trim(),
          value: String(match[2] || "").trim(),
          token: match[0]
        });
        match = pattern.exec(String(body || ""));
      }
      return out;
    }
    function extractHashtags(text) {
      const out = [];
      const pattern = /(^|\s)#([A-Za-z0-9/_-]+)/g;
      let match = pattern.exec(String(text || ""));
      while (match) {
        out.push(String(match[2] || "").trim());
        match = pattern.exec(String(text || ""));
      }
      return uniqueStrings2(out);
    }
    function inferStatusFromTags(tags, statuses) {
      const available = Array.isArray(statuses) ? statuses : [];
      const normalizedTags = (tags || []).map((t2) => slugify(t2));
      for (const status of available) {
        const target = slugify(status);
        if (normalizedTags.includes(target)) {
          return status;
        }
      }
      return "";
    }
    function cleanTaskTitle(body, inlineFields) {
      let text = String(body || "");
      for (const field of inlineFields || []) {
        text = text.replace(field.token, "");
      }
      text = text.replace(/(^|\s)#[A-Za-z0-9/_-]+/g, " ");
      text = text.replace(/\s+/g, " ").trim();
      return text || "Untitled task";
    }
    function splitCsv2(value) {
      return String(value || "").split(",").map((x) => x.replace(/^#/, "").trim()).filter(Boolean);
    }
    function uniqueStrings2(values) {
      const seen = /* @__PURE__ */ new Set();
      const out = [];
      for (const value of values || []) {
        const text = String(value || "").trim();
        if (!text) continue;
        const key = text.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        out.push(text);
      }
      return out;
    }
    function normalizeText(value) {
      return String(value == null ? "" : value).trim();
    }
    function slugify(text) {
      return String(text || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    }
    function escapeRegExp(text) {
      return String(text || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function formatDateLocal(date) {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      return `${y}-${m}-${d}`;
    }
    module2.exports = {
      normalizeDateInput: normalizeDateInput2,
      getDueInfo: getDueInfo2,
      parseTaskLine: parseTaskLine2,
      updateTaskLineFields: updateTaskLineFields2,
      parseWipLimits: parseWipLimits2,
      sortCards: sortCards2,
      uniqueStrings: uniqueStrings2,
      splitCsv: splitCsv2
    };
  }
});

// src/core-fallback.js
var require_core_fallback = __commonJS({
  "src/core-fallback.js"(exports2, module2) {
    var coreUtils;
    try {
      coreUtils = require_core();
    } catch (_error) {
      coreUtils = {
        normalizeDateInput: localNormalizeDateInput,
        getDueInfo: localGetDueInfo,
        parseTaskLine: localParseTaskLine,
        updateTaskLineFields: localUpdateTaskLineFields,
        parseWipLimits: localParseWipLimits,
        sortCards: localSortCards,
        uniqueStrings: localUniqueStrings,
        splitCsv: localSplitCsv
      };
    }
    var {
      normalizeDateInput: normalizeDateInput2,
      getDueInfo: getDueInfo2,
      parseTaskLine: parseTaskLine2,
      updateTaskLineFields: updateTaskLineFields2,
      parseWipLimits: parseWipLimits2,
      sortCards: sortCards2,
      uniqueStrings: uniqueStrings2,
      splitCsv: splitCsv2
    } = coreUtils;
    function localNormalizeDateInput(value) {
      const text = String(value || "").trim();
      if (!text) return "";
      const direct = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (direct) {
        const date = /* @__PURE__ */ new Date(`${direct[1]}-${direct[2]}-${direct[3]}T00:00:00`);
        if (Number.isNaN(date.getTime())) return "";
        return `${direct[1]}-${direct[2]}-${direct[3]}`;
      }
      const parsed = new Date(text);
      if (Number.isNaN(parsed.getTime())) return "";
      return localFormatDateLocal(parsed);
    }
    function localGetDueInfo(dueDate, dueSoonDays, nowDate, options) {
      if (!dueDate) return null;
      const date = /* @__PURE__ */ new Date(`${dueDate}T00:00:00`);
      if (Number.isNaN(date.getTime())) return null;
      const now = nowDate instanceof Date ? nowDate : /* @__PURE__ */ new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const dueStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const diffDays = Math.round((dueStart.getTime() - todayStart.getTime()) / 864e5);
      const opts = options && typeof options === "object" ? options : {};
      const showRelativeDate = opts.showRelativeDate !== false;
      const translate = typeof opts.t === "function" ? opts.t : null;
      const displayFormat = String(opts.dateDisplayFormat || opts.dateFormat || "").trim();
      const labelFor = (key, fallback, params) => {
        if (!translate) return fallback;
        return translate(key, params);
      };
      const absoluteLabel = () => {
        if (!displayFormat) return dueDate;
        const momentRef = typeof window !== "undefined" && window.moment || typeof globalThis !== "undefined" && globalThis.moment;
        if (typeof momentRef === "function") {
          const m = momentRef(dueDate, ["YYYY-MM-DD", momentRef.ISO_8601], true);
          if (m && typeof m.isValid === "function" && m.isValid()) return m.format(displayFormat);
        }
        return dueDate;
      };
      if (!showRelativeDate) {
        const cls = diffDays < 0 ? "is-overdue" : diffDays <= Math.max(0, Number(dueSoonDays) || 0) ? "is-due-soon" : "";
        return {
          label: absoluteLabel(),
          cls,
          sortValue: dueStart.getTime()
        };
      }
      if (diffDays < 0) {
        return {
          label: labelFor("due.overdue_days", `Overdue ${Math.abs(diffDays)}d`, { days: Math.abs(diffDays) }),
          cls: "is-overdue",
          sortValue: dueStart.getTime()
        };
      }
      if (diffDays === 0) {
        return {
          label: labelFor("due.today", "Due today"),
          cls: "is-due-soon",
          sortValue: dueStart.getTime()
        };
      }
      if (diffDays === 1) {
        return {
          label: labelFor("due.tomorrow", "Due tomorrow"),
          cls: "is-due-soon",
          sortValue: dueStart.getTime()
        };
      }
      if (diffDays <= Math.max(0, Number(dueSoonDays) || 0)) {
        return {
          label: labelFor("due.in_days", `Due in ${diffDays}d`, { days: diffDays }),
          cls: "is-due-soon",
          sortValue: dueStart.getTime()
        };
      }
      return {
        label: labelFor("due.in_days", `Due in ${diffDays}d`, { days: diffDays }),
        cls: "",
        sortValue: dueStart.getTime()
      };
    }
    function localParseTaskLine(line, opts) {
      const match = String(line || "").match(/^\s*-\s*\[( |x|X)\]\s+(.*)$/);
      if (!match) return null;
      const body = match[2];
      const statusField = String(opts && opts.statusField || "Status");
      const categoryField = String(opts && opts.categoryField || "Category");
      const priorityField = String(opts && opts.priorityField || "Priority");
      const tagsField = String(opts && opts.tagsField || "Tags");
      const dueDateField = String(opts && opts.dueDateField || "Due Date");
      const defaultStatus = String(opts && opts.defaultStatus || "Todo").trim() || "Todo";
      const statusOrder = Array.isArray(opts && opts.statusOrder) ? opts.statusOrder : [defaultStatus];
      const inlineFields = localParseInlineFields(body);
      const inlineMap = /* @__PURE__ */ new Map();
      for (const field of inlineFields) {
        inlineMap.set(field.key.toLowerCase(), field.value);
      }
      const hashtags = localExtractHashtags(body);
      const status = localNormalizeText(inlineMap.get(statusField.toLowerCase())) || localInferStatusFromTags(hashtags, statusOrder) || defaultStatus;
      const tagsFromField = localSplitCsv(inlineMap.get(tagsField.toLowerCase()));
      const tags = localUniqueStrings([...hashtags, ...tagsFromField]);
      return {
        title: localCleanTaskTitle(body, inlineFields),
        status,
        category: localNormalizeText(inlineMap.get(categoryField.toLowerCase())),
        priority: localNormalizeText(inlineMap.get(priorityField.toLowerCase())),
        dueDate: localNormalizeDateInput(inlineMap.get(dueDateField.toLowerCase())),
        tags
      };
    }
    function localUpdateTaskLineFields(line, updates) {
      let next = String(line || "");
      for (const [key, value] of Object.entries(updates || {})) {
        next = localUpsertInlineField(next, key, value);
      }
      return next;
    }
    function localUpsertInlineField(line, key, value) {
      const k = String(key || "").trim();
      if (!k) return line;
      const rawValue = Array.isArray(value) ? value.join(", ") : String(value == null ? "" : value);
      const trimmedValue = rawValue.trim();
      const pattern = new RegExp(`\\s*\\[${localEscapeRegExp(k)}::[^\\]]*\\]`, "i");
      if (!trimmedValue) {
        return String(line || "").replace(pattern, "").replace(/\s+$/, "");
      }
      const fieldToken = ` [${k}:: ${trimmedValue}]`;
      if (pattern.test(String(line || ""))) {
        return String(line || "").replace(pattern, fieldToken).replace(/\s+$/, "");
      }
      return `${String(line || "").replace(/\s+$/, "")}${fieldToken}`;
    }
    function localParseWipLimits(value) {
      const map = /* @__PURE__ */ new Map();
      for (const pair of String(value || "").split(",").map((x) => x.trim()).filter(Boolean)) {
        const sep = pair.indexOf(":");
        if (sep === -1) continue;
        const key = pair.slice(0, sep).trim().toLowerCase();
        const amount = Number.parseInt(pair.slice(sep + 1).trim(), 10);
        if (key && Number.isFinite(amount) && amount > 0) map.set(key, amount);
      }
      return map;
    }
    function localSortCards(cards, sortBy, sortDirection, priorityOrderMap, cardOrder) {
      const order = cardOrder && typeof cardOrder === "object" ? cardOrder : {};
      const hasOrder = Object.keys(order).length > 0;
      if (sortBy === "none") {
        if (!hasOrder) return [...cards];
        return [...cards].sort((a, b) => {
          const aVal = order[a.id] != null ? order[a.id] : Number.MAX_SAFE_INTEGER;
          const bVal = order[b.id] != null ? order[b.id] : Number.MAX_SAFE_INTEGER;
          return aVal - bVal;
        });
      }
      const direction = sortDirection === "desc" ? -1 : 1;
      const priorities = priorityOrderMap instanceof Map ? priorityOrderMap : /* @__PURE__ */ new Map();
      return [...cards].sort((a, b) => {
        let cmp = 0;
        if (sortBy === "title") {
          cmp = String(a.title || "").localeCompare(String(b.title || ""));
        } else if (sortBy === "due") {
          const aTime = a.dueTs == null ? Number.MAX_SAFE_INTEGER : a.dueTs;
          const bTime = b.dueTs == null ? Number.MAX_SAFE_INTEGER : b.dueTs;
          cmp = aTime - bTime;
        } else if (sortBy === "priority") {
          const aIdx = priorities.has(String(a.priority || "").toLowerCase()) ? priorities.get(String(a.priority || "").toLowerCase()) : Number.MAX_SAFE_INTEGER;
          const bIdx = priorities.has(String(b.priority || "").toLowerCase()) ? priorities.get(String(b.priority || "").toLowerCase()) : Number.MAX_SAFE_INTEGER;
          cmp = aIdx - bIdx;
        }
        if (cmp === 0) cmp = String(a.title || "").localeCompare(String(b.title || ""));
        return cmp * direction;
      });
    }
    function localUniqueStrings(values) {
      const seen = /* @__PURE__ */ new Set();
      const out = [];
      for (const value of values || []) {
        const text = String(value || "").trim();
        if (!text) continue;
        const key = text.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        out.push(text);
      }
      return out;
    }
    function localSplitCsv(value) {
      return String(value || "").split(",").map((x) => x.replace(/^#/, "").trim()).filter(Boolean);
    }
    function localParseInlineFields(body) {
      const out = [];
      const pattern = /\[([^\]:]+)::\s*([^\]]*)\]/g;
      let match = pattern.exec(String(body || ""));
      while (match) {
        out.push({
          key: String(match[1] || "").trim(),
          value: String(match[2] || "").trim(),
          token: match[0]
        });
        match = pattern.exec(String(body || ""));
      }
      return out;
    }
    function localExtractHashtags(text) {
      const out = [];
      const pattern = /(^|\s)#([A-Za-z0-9/_-]+)/g;
      let match = pattern.exec(String(text || ""));
      while (match) {
        out.push(String(match[2] || "").trim());
        match = pattern.exec(String(text || ""));
      }
      return localUniqueStrings(out);
    }
    function localInferStatusFromTags(tags, statuses) {
      const available = Array.isArray(statuses) ? statuses : [];
      const normalizedTags = (tags || []).map((t2) => localSlugify(t2));
      for (const status of available) {
        if (normalizedTags.includes(localSlugify(status))) return status;
      }
      return "";
    }
    function localCleanTaskTitle(body, inlineFields) {
      let text = String(body || "");
      for (const field of inlineFields || []) {
        text = text.replace(field.token, "");
      }
      text = text.replace(/(^|\s)#[A-Za-z0-9/_-]+/g, " ");
      text = text.replace(/\s+/g, " ").trim();
      return text || "Untitled task";
    }
    function localNormalizeText(value) {
      return String(value == null ? "" : value).trim();
    }
    function localSlugify(text) {
      return String(text || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    }
    function localEscapeRegExp(text) {
      return String(text || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function localFormatDateLocal(date) {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      return `${y}-${m}-${d}`;
    }
    module2.exports = {
      normalizeDateInput: normalizeDateInput2,
      getDueInfo: getDueInfo2,
      parseTaskLine: parseTaskLine2,
      updateTaskLineFields: updateTaskLineFields2,
      parseWipLimits: parseWipLimits2,
      sortCards: sortCards2,
      uniqueStrings: uniqueStrings2,
      splitCsv: splitCsv2
    };
  }
});

// src/utils.js
var require_utils = __commonJS({
  "src/utils.js"(exports2, module2) {
    var uniqueStrings2;
    function init(deps) {
      uniqueStrings2 = deps.uniqueStrings;
    }
    function extractNotePreview2(content) {
      const lines = String(content || "").split(/\r?\n/);
      let inFrontmatter = false;
      const bodyLines = [];
      for (const line of lines) {
        if (line.trim() === "---") {
          inFrontmatter = !inFrontmatter;
          continue;
        }
        if (inFrontmatter) continue;
        if (/^#+\s/.test(line)) continue;
        const trimmed = line.trim();
        if (trimmed) bodyLines.push(trimmed);
        if (bodyLines.join(" ").length >= 100) break;
      }
      return bodyLines.join(" ").slice(0, 100);
    }
    function isKanbanBoardFile2(frontmatter) {
      if (!frontmatter) return false;
      const value = frontmatter["kanban-plugin"];
      if (value == null) return false;
      return String(value).toLowerCase() === "board" || value === true;
    }
    function normalizeFmValue2(value) {
      if (Array.isArray(value)) return value.length ? String(value[0]).trim() : "";
      return String(value == null ? "" : value).trim();
    }
    function normalizeToArray(value) {
      if (Array.isArray(value)) {
        return value.map((v) => String(v).replace(/^#/, "").trim()).filter(Boolean);
      }
      if (!value) return [];
      return String(value).split(",").map((v) => v.replace(/^#/, "").trim()).filter(Boolean);
    }
    function collectTags2(frontmatter, cache, tagsField) {
      let primaryTags = normalizeToArray(frontmatter[tagsField]);
      if (!primaryTags.length && tagsField.toLowerCase() !== "tags") primaryTags = normalizeToArray(frontmatter.tags);
      const cacheTags = Array.isArray(cache && cache.tags) ? cache.tags.map((entry) => String(entry && entry.tag || "").replace(/^#/, "").trim()).filter(Boolean) : [];
      return uniqueStrings2([...primaryTags, ...cacheTags]);
    }
    function sanitizeFileName2(input) {
      return String(input || "").replace(/[\\/:*?"<>|]/g, " ").replace(/\s+/g, " ").trim();
    }
    function buildFrontmatterBlock2(fields) {
      const lines = ["---"];
      for (const [key, value] of Object.entries(fields || {})) {
        if (value == null) continue;
        if (Array.isArray(value)) {
          lines.push(`${key}:`);
          for (const item of value) lines.push(`  - ${yamlQuote(item)}`);
          continue;
        }
        const text = normalizeFmValue2(value);
        lines.push(text ? `${key}: ${yamlQuote(text)}` : `${key}:`);
      }
      lines.push("---");
      return lines.join("\n");
    }
    function buildTaskChecklistLine2(title, options) {
      const fields = options.fields || {};
      const parts = [`- [ ] ${title}`];
      for (const key of [
        options.statusField,
        options.categoryField,
        options.priorityField,
        options.dueDateField,
        options.tagsField
      ]) {
        const value = fields[key];
        if (Array.isArray(value)) {
          if (value.length) parts.push(`[${key}:: ${value.join(", ")}]`);
        } else {
          const text = normalizeFmValue2(value);
          if (text) parts.push(`[${key}:: ${text}]`);
        }
      }
      return parts.join(" ");
    }
    function parseInlineFieldMap2(line) {
      const map = /* @__PURE__ */ new Map();
      const pattern = /\[([^\]:]+)::\s*([^\]]*)\]/g;
      let match = pattern.exec(String(line || ""));
      while (match) {
        const key = String(match[1] || "").trim().toLowerCase();
        const value = String(match[2] || "").trim();
        if (key) {
          map.set(key, value);
        }
        match = pattern.exec(String(line || ""));
      }
      return map;
    }
    async function ensureFolderPath2(app, folderPath) {
      const normalized = String(folderPath || "").split("/").map((part) => part.trim()).filter(Boolean);
      let current = "";
      for (const part of normalized) {
        current = current ? `${current}/${part}` : part;
        if (!app.vault.getAbstractFileByPath(current)) await app.vault.createFolder(current);
      }
    }
    function createEnsureFile2(TFile2) {
      return async function ensureFile2(app, path, initialContent) {
        const file = app.vault.getAbstractFileByPath(path);
        if (file instanceof TFile2) return file;
        const folder = path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : "";
        if (folder) await ensureFolderPath2(app, folder);
        return await app.vault.create(path, initialContent || "");
      };
    }
    function yamlQuote(value) {
      const text = String(value == null ? "" : value);
      if (!text.length) return '""';
      if (/^[A-Za-z0-9 _./-]+$/.test(text)) return text;
      return `"${text.replace(/\\/g, "\\\\").replace(/\"/g, '\\"')}"`;
    }
    module2.exports = {
      init,
      extractNotePreview: extractNotePreview2,
      isKanbanBoardFile: isKanbanBoardFile2,
      normalizeFmValue: normalizeFmValue2,
      normalizeToArray,
      collectTags: collectTags2,
      sanitizeFileName: sanitizeFileName2,
      buildFrontmatterBlock: buildFrontmatterBlock2,
      buildTaskChecklistLine: buildTaskChecklistLine2,
      parseInlineFieldMap: parseInlineFieldMap2,
      ensureFolderPath: ensureFolderPath2,
      createEnsureFile: createEnsureFile2,
      yamlQuote
    };
  }
});

// src/modals.js
var require_modals = __commonJS({
  "src/modals.js"(exports2, module2) {
    module2.exports = function createModals({ Modal: Modal2, Notice: Notice2, t: t2 = (k) => k }) {
      function tx(key, fallback, params) {
        const value = t2(key, params);
        return value === key ? fallback : value;
      }
      class BoardManagerModal2 extends Modal2 {
        constructor(app, plugin, options) {
          super(app);
          this.plugin = plugin;
          this.options = options || {};
        }
        onOpen() {
          const { contentEl, titleEl } = this;
          titleEl.setText(t2("modal.board_manager.title"));
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
            cardOrder: null
          };
        }
        renderContent() {
          const { contentEl } = this;
          contentEl.empty();
          const boards = this.plugin.settings.boards || [];
          if (boards.length === 0) {
            contentEl.createEl("p", { text: t2("modal.board_manager.no_boards") });
          }
          for (const board of boards) {
            const row = contentEl.createDiv({ cls: "smart-kanban-board-manager-row" });
            row.createSpan({ text: `${board.name} (${board.type})`, cls: "smart-kanban-board-manager-name" });
            const editBtn = row.createEl("button", { text: t2("common.edit") });
            editBtn.addEventListener("click", async () => {
              await this.editBoard(board);
            });
            const cloneBtn = row.createEl("button", { text: tx("modal.board.clone", "Clone") });
            cloneBtn.addEventListener("click", async () => {
              await this.cloneBoard(board);
            });
            const deleteBtn = row.createEl("button", { text: t2("common.delete"), cls: "mod-warning" });
            deleteBtn.addEventListener("click", async () => {
              const childBoards = (this.plugin.settings.boards || []).filter((b) => b.parentBoardId === board.id);
              const message = childBoards.length ? tx("modal.board.delete_with_children", `Delete "${board.name}"? ${childBoards.length} child board(s) will be detached.`, { name: board.name, count: childBoards.length }) : tx("modal.board.delete_confirm", `Delete "${board.name}"?`, { name: board.name });
              const confirmed = await this.plugin.openConfirmModal({
                title: tx("modal.board.delete_title", "Delete Board"),
                message,
                confirmText: t2("common.delete")
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
          const createBtn = actions.createEl("button", { text: t2("modal.board_manager.create_new"), cls: "mod-cta" });
          createBtn.addEventListener("click", async () => {
            await this.createBoard();
          });
          const closeBtn = actions.createEl("button", { text: t2("common.close") });
          closeBtn.addEventListener("click", () => {
            if (typeof this.options.onClose === "function") this.options.onClose();
            this.close();
          });
        }
        async createBoard() {
          const boardChoices = this.plugin.settings.boards || [];
          const values = await this.plugin.openFormModal({
            title: tx("modal.board_create.title", "Create Board"),
            submitText: t2("common.create"),
            fields: [
              { key: "name", label: tx("modal.board.field.name", "Board name"), value: "" },
              { key: "type", label: tx("modal.board.field.type", "Type"), value: "independent", type: "select", options: ["independent", "filtered-view"] },
              {
                key: "parentBoardId",
                label: tx("modal.board.field.parent", "Parent board (filtered-view)"),
                value: "",
                type: "select",
                options: ["", ...boardChoices.map((b) => b.id)],
                optionLabels: { "": tx("modal.board.field.parent.none", "None"), ...Object.fromEntries(boardChoices.map((b) => [b.id, b.name])) }
              },
              {
                key: "cloneFrom",
                label: tx("modal.board.field.clone_from", "Clone settings from"),
                value: "",
                type: "select",
                options: ["", ...boardChoices.map((b) => b.id)],
                optionLabels: { "": tx("modal.board.field.clone_from.none", "None (start empty)"), ...Object.fromEntries(boardChoices.map((b) => [b.id, b.name])) }
              },
              { key: "visibleStatuses", label: tx("modal.board.field.visible_statuses", "Visible statuses (filtered-view, comma-sep)"), value: "" }
            ]
          });
          if (!values) return;
          const name = String(values.name || "").trim();
          if (!name) {
            new Notice2(t2("modal.board_create.name_required"));
            return;
          }
          if (this.boardNameExists(name)) {
            new Notice2(tx("modal.board.name_duplicate", "Board name already exists."));
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
          board.visibleStatuses = type === "filtered-view" ? String(values.visibleStatuses || "").trim() || null : null;
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
                visibleStatuses: board.visibleStatuses || cloned.visibleStatuses || null
              });
            }
          }
          this.plugin.settings.boards.push(board);
          await this.plugin.saveSettings();
          this.plugin.refreshViews();
          this.renderContent();
          new Notice2(t2("modal.board_create.created_notice", { name }));
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
          new Notice2(tx("modal.board.clone_notice", "Board cloned: {name}", { name: candidate }));
        }
        async editBoard(board) {
          const boardChoices = (this.plugin.settings.boards || []).filter((b) => b.id !== board.id);
          const values = await this.plugin.openFormModal({
            title: tx("modal.board_edit.title", "Edit Board: {name}", { name: board.name }),
            submitText: t2("common.save"),
            fields: [
              { key: "name", label: tx("modal.board.field.name", "Board name"), value: board.name || "" },
              { key: "type", label: tx("modal.board.field.type", "Type"), value: board.type || "independent", type: "select", options: ["independent", "filtered-view"] },
              {
                key: "parentBoardId",
                label: tx("modal.board.field.parent", "Parent board (filtered-view)"),
                value: board.parentBoardId || "",
                type: "select",
                options: ["", ...boardChoices.map((b) => b.id)],
                optionLabels: { "": tx("modal.board.field.parent.none", "None"), ...Object.fromEntries(boardChoices.map((b) => [b.id, b.name])) }
              },
              { key: "visibleStatuses", label: tx("modal.board.field.visible_statuses_short", "Visible statuses (filtered-view)"), value: board.visibleStatuses || "" }
            ]
          });
          if (!values) return;
          const nextName = String(values.name || "").trim() || board.name;
          if (!nextName) {
            new Notice2(t2("modal.board_create.name_required"));
            return;
          }
          if (this.boardNameExists(nextName, board.id)) {
            new Notice2(tx("modal.board.name_duplicate", "Board name already exists."));
            return;
          }
          board.name = nextName;
          board.type = values.type || board.type;
          const parentBoardId = String(values.parentBoardId || "").trim();
          board.parentBoardId = board.type === "filtered-view" && parentBoardId && parentBoardId !== board.id ? parentBoardId : null;
          board.visibleStatuses = board.type === "filtered-view" ? String(values.visibleStatuses || "").trim() || null : null;
          await this.plugin.saveSettings();
          this.plugin.refreshViews();
          this.renderContent();
          new Notice2(t2("modal.board_edit.updated_notice", { name: board.name }));
        }
      }
      class DragReorderListModal2 extends Modal2 {
        constructor(app, options) {
          super(app);
          this.options = options || {};
          this.sectionData = {};
          for (const section of this.options.sections || []) {
            this.sectionData[section.key] = [...section.items || []];
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
          if (typeof this.options.onOpenSettings === "function") {
            const settingsBtn = actions.createEl("button", { text: tx("modal.configure.open_settings", "All Board Settings") });
            settingsBtn.addEventListener("click", () => {
              this.close();
              this.options.onOpenSettings();
            });
          }
          const cancelBtn = actions.createEl("button", { text: t2("common.cancel") });
          cancelBtn.addEventListener("click", () => {
            if (typeof this.options.onCancel === "function") this.options.onCancel();
            this.close();
          });
          const saveBtn = actions.createEl("button", { text: t2("common.save"), cls: "mod-cta" });
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
              const deleteBtn = row.createSpan({ text: "\xD7", cls: "smart-kanban-drag-delete" });
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
          const addBtn = addRow.createEl("button", { text: t2("common.add") });
          const doAdd = () => {
            const val = addInput.value.trim();
            if (!val) return;
            this.sectionData[section.key].push(val);
            addInput.value = "";
            renderList();
          };
          addBtn.addEventListener("click", doAdd);
          addInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              doAdd();
            }
          });
        }
      }
      class SimpleFormModal2 extends Modal2 {
        constructor(app, options) {
          super(app);
          this.options = options || {};
          this.inputs = {};
        }
        onOpen() {
          const { contentEl, titleEl } = this;
          titleEl.setText(this.options.title || t2("modal.form.title"));
          contentEl.empty();
          const fields = Array.isArray(this.options.fields) ? this.options.fields : [];
          for (const field of fields) {
            const row = contentEl.createDiv({ cls: "smart-kanban-modal-row" });
            row.createEl("label", { text: field.label || field.key || t2("modal.form.field") });
            let input;
            if (field.type === "select") {
              input = row.createEl("select");
              const options = Array.isArray(field.options) ? field.options : [];
              const optionLabels = field.optionLabels || {};
              for (const optionValue of options) {
                const value = String(optionValue != null ? optionValue : "");
                const optionText = Object.prototype.hasOwnProperty.call(optionLabels, value) ? optionLabels[value] : value === "" ? field.optionLabelEmpty || t2("common.none") : value;
                input.createEl("option", { text: optionText, value });
              }
              input.value = String(field.value || "");
            } else {
              input = row.createEl("input", {
                type: field.type === "date" ? "date" : "text"
              });
              input.value = String(field.value || "");
              if (field.placeholder) input.placeholder = field.placeholder;
            }
            this.inputs[field.key] = input;
          }
          const actions = contentEl.createDiv({ cls: "smart-kanban-modal-actions" });
          const cancelBtn = actions.createEl("button", { text: t2("common.cancel") });
          cancelBtn.addEventListener("click", () => {
            if (typeof this.options.onCancel === "function") this.options.onCancel();
            this.close();
          });
          const submitBtn = actions.createEl("button", {
            text: this.options.submitText || t2("common.save"),
            cls: "mod-cta"
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
      class SimpleConfirmModal2 extends Modal2 {
        constructor(app, options) {
          super(app);
          this.options = options || {};
        }
        onOpen() {
          const { contentEl, titleEl } = this;
          titleEl.setText(this.options.title || t2("modal.confirm.title"));
          contentEl.empty();
          contentEl.createEl("p", { text: this.options.message || t2("modal.confirm.message") });
          const actions = contentEl.createDiv({ cls: "smart-kanban-modal-actions" });
          const cancelBtn = actions.createEl("button", { text: t2("common.cancel") });
          cancelBtn.addEventListener("click", () => {
            if (typeof this.options.onCancel === "function") this.options.onCancel();
            this.close();
          });
          const confirmBtn = actions.createEl("button", {
            text: this.options.confirmText || t2("common.confirm"),
            cls: "mod-warning"
          });
          confirmBtn.addEventListener("click", () => {
            if (typeof this.options.onConfirm === "function") this.options.onConfirm();
            this.close();
          });
        }
      }
      return {
        BoardManagerModal: BoardManagerModal2,
        DragReorderListModal: DragReorderListModal2,
        SimpleFormModal: SimpleFormModal2,
        SimpleConfirmModal: SimpleConfirmModal2
      };
    };
  }
});

// src/view.js
var require_view = __commonJS({
  "src/view.js"(exports2, module2) {
    module2.exports = function createView({ ItemView: ItemView2, TFile: TFile2, Notice: Notice2, setIcon: setIcon2, VIEW_TYPE_SMART_KANBAN: VIEW_TYPE_SMART_KANBAN2, normalizeDateInput: normalizeDateInput2, splitCsv: splitCsv2, t: t2 = (k) => k }) {
      class SmartKanbanView2 extends ItemView2 {
        constructor(leaf, plugin) {
          super(leaf);
          this.plugin = plugin;
          this.cards = [];
          this.currentPreset = "";
          this.filters = this.plugin.createEmptyFilters();
          this.filtersCollapsed = false;
          this._dropdownCleanups = [];
          this.collapsedLanes = /* @__PURE__ */ new Set();
          this.viewMode = "board";
          this._drag = null;
        }
        getViewType() {
          return VIEW_TYPE_SMART_KANBAN2;
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
          if (state && state.boardId !== void 0) {
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
            const tag = event.target && event.target.tagName || "";
            const isInput = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
            if (event.key === "Escape") {
              this.containerEl.querySelectorAll(".smart-kanban-overflow-menu").forEach((m) => {
                m.style.display = "none";
              });
              this.containerEl.querySelectorAll(".smart-kanban-dropdown-panel").forEach((p) => {
                p.style.display = "none";
              });
              return;
            }
            if (isInput) return;
            if (event.key === "n") {
              event.preventDefault();
              this.createTaskInteractive();
            }
          };
          this.containerEl.addEventListener("keydown", this._keyHandler);
          this._clickOutsideHandler = (event) => {
            if (!event.target.closest(".smart-kanban-overflow-btn") && !event.target.closest(".smart-kanban-overflow-menu")) {
              this.containerEl.querySelectorAll(".smart-kanban-overflow-menu").forEach((m) => {
                m.style.display = "none";
                const c = m.closest(".smart-kanban-card");
                if (c) c.classList.remove("has-menu-open");
              });
            }
          };
          document.addEventListener("click", this._clickOutsideHandler);
        }
        applyTheme() {
          const theme = this.plugin.getResolvedTheme(this.boardId);
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
            "--sk-font-family": theme.fontFamily
          };
          const laneTint = Number(theme.laneTintStrength);
          const laneHeaderTint = Number(theme.laneHeaderTintStrength);
          if (Number.isFinite(laneTint)) {
            props["--sk-lane-tint-strength"] = `${Math.max(0, Math.min(40, laneTint))}%`;
          }
          if (Number.isFinite(laneHeaderTint)) {
            props["--sk-lane-header-tint-strength"] = `${Math.max(0, Math.min(60, laneHeaderTint))}%`;
          }
          for (const [prop, value] of Object.entries(props)) {
            if (value) el.style.setProperty(prop, value);
            else el.style.removeProperty(prop);
          }
        }
        renderBoardTabs() {
          this.boardTabsEl.empty();
          const boards = this.plugin.settings.boards || [];
          if (boards.length === 0 && !this.boardId) {
            this.boardTabsEl.style.display = "none";
            return;
          }
          this.boardTabsEl.style.display = "";
          const defaultTab = this.boardTabsEl.createEl("button", {
            text: t2("view.board.default"),
            cls: `smart-kanban-board-tab ${!this.boardId ? "is-active" : ""}`
          });
          defaultTab.addEventListener("click", () => this.switchBoard(""));
          for (const board of boards) {
            const label = board.name + (board.type === "filtered-view" ? ` ${t2("view.board.view_suffix")}` : "");
            const tab = this.boardTabsEl.createEl("button", {
              text: label,
              cls: `smart-kanban-board-tab ${this.boardId === board.id ? "is-active" : ""}`
            });
            tab.addEventListener("click", () => this.switchBoard(board.id));
          }
          const addTab = this.boardTabsEl.createEl("button", {
            text: "+",
            cls: "smart-kanban-board-tab smart-kanban-board-tab-add"
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
          this.collapsedLanes.clear();
          this.clearFilters();
          this.renderBoardTabs();
          this.buildHeader();
          await this.reload();
        }
        async reload() {
          this._cancelDrag();
          this.cards = await this.plugin.collectCards(this.boardId);
          this.applyTheme();
          this.renderFilters();
          this.renderContent();
        }
        _cancelDrag() {
          if (!this._drag) return;
          this._drag.ghost.remove();
          if (this._drag.placeholder.parentElement) this._drag.placeholder.remove();
          this._drag.cardEl.classList.remove("is-dragging-source");
          this._drag = null;
          if (this._onMoveHandler) {
            document.removeEventListener("pointermove", this._onMoveHandler);
            this._onMoveHandler = null;
          }
          if (this._onUpHandler) {
            document.removeEventListener("pointerup", this._onUpHandler);
            document.removeEventListener("pointercancel", this._onUpHandler);
            this._onUpHandler = null;
          }
        }
        renderContent() {
          if (this.viewMode === "table") this.renderTable();
          else if (this.viewMode === "feed") this.renderFeed();
          else if (this.viewMode === "list") this.renderList();
          else this.renderBoard();
        }
        buildHeader() {
          this.headerEl.empty();
          const left = this.headerEl.createDiv({ cls: "smart-kanban-header-left" });
          const board = this.boardId ? this.plugin.getBoard(this.boardId) : null;
          left.createEl("h2", { text: (board == null ? void 0 : board.name) || t2("view.board.fallback_title"), cls: "smart-kanban-title" });
          this.buildViewModeTabs(left);
          const toolbar = this.headerEl.createDiv({ cls: "smart-kanban-toolbar" });
          const searchWrap = toolbar.createDiv({ cls: "smart-kanban-search-wrap" });
          const searchInput = searchWrap.createEl("input", {
            type: "text",
            placeholder: t2("view.search.placeholder"),
            cls: "smart-kanban-search-input"
          });
          searchInput.value = this.filters.text;
          searchInput.addEventListener("input", () => {
            this.filters.text = searchInput.value.trim().toLowerCase();
            this.currentPreset = "";
            this.renderContent();
          });
          const searchIcon = searchWrap.createSpan({ cls: "smart-kanban-search-icon" });
          setIcon2(searchIcon, "search");
          this.createIconBtn(toolbar, "filter", t2("view.toolbar.toggle_filters"), () => {
            this.filtersCollapsed = !this.filtersCollapsed;
            this.filtersEl.style.display = this.filtersCollapsed ? "none" : "";
          });
          this.createIconBtn(toolbar, "plus", t2("view.toolbar.new_task"), () => this.createTaskInteractive());
          this.createIconBtn(toolbar, "refresh-cw", t2("view.toolbar.refresh"), () => this.reload());
          this.createIconBtn(toolbar, "settings", t2("view.toolbar.plugin_settings"), () => this.openPluginSettings());
          this.createIconBtn(toolbar, "sliders-horizontal", t2("view.toolbar.quick_config"), () => this.configureBoardInteractive());
        }
        buildViewModeTabs(parent) {
          const wrap = parent.createDiv({ cls: "smart-kanban-viewmode-tabs" });
          const modes = [
            { key: "board", icon: "kanban-square", label: t2("view.mode.board") },
            { key: "table", icon: "table", label: t2("view.mode.table") },
            { key: "feed", icon: "activity", label: t2("view.mode.feed") },
            { key: "list", icon: "list", label: t2("view.mode.list") }
          ];
          for (const mode of modes) {
            const item = wrap.createEl("button", {
              cls: `smart-kanban-viewmode-tab ${this.viewMode === mode.key ? "is-active" : ""}`,
              attr: { title: `View as ${mode.label.toLowerCase()}` }
            });
            const iconEl = item.createSpan({ cls: "smart-kanban-viewmode-tab-icon" });
            setIcon2(iconEl, mode.icon);
            item.createSpan({ text: mode.label });
            item.addEventListener("click", () => {
              this.viewMode = mode.key;
              this.buildHeader();
              this.renderContent();
            });
          }
        }
        createIconBtn(parent, icon, title, onClick) {
          const btn = parent.createEl("button", { cls: "smart-kanban-icon-btn", attr: { title, "aria-label": title } });
          setIcon2(btn, icon);
          btn.addEventListener("click", async (e) => {
            e.stopPropagation();
            await onClick();
          });
          return btn;
        }
        getActiveSettings() {
          return this.plugin.getEffectiveSettings(this.boardId);
        }
        resolveColorEntry(mapObj, value) {
          if (!mapObj || typeof mapObj !== "object") return null;
          const key = String(value || "").trim();
          if (!key) return null;
          if (mapObj[key] && typeof mapObj[key] === "object") return mapObj[key];
          const lower = key.toLowerCase();
          for (const [entryKey, entryValue] of Object.entries(mapObj)) {
            if (String(entryKey).toLowerCase() === lower && entryValue && typeof entryValue === "object") return entryValue;
          }
          return null;
        }
        applyBadgeColor(el, mapObj, value) {
          const entry = this.resolveColorEntry(mapObj, value);
          if (!entry) return;
          if (entry.bg) el.style.backgroundColor = String(entry.bg);
          if (entry.text) el.style.color = String(entry.text);
        }
        bindFilterBadge(el, key, value) {
          const text = String(value || "").trim();
          if (!text) return;
          el.addClass("smart-kanban-filterable-badge");
          el.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleFilterValue(key, text);
          });
        }
        async openPluginSettings() {
          if (this.app.setting && typeof this.app.setting.open === "function") {
            await Promise.resolve(this.app.setting.open());
          }
          if (this.app.setting && typeof this.app.setting.openTabById === "function") {
            await Promise.resolve(this.app.setting.openTabById(this.plugin.manifest.id));
          }
        }
        async configureBoardInteractive() {
          const result = await this.plugin.openDragReorderModal({
            title: t2("view.configure.title"),
            sections: [
              {
                key: "statuses",
                label: t2("view.configure.lanes"),
                items: [...this.plugin.getStatusOrder(this.boardId)]
              },
              {
                key: "customFields",
                label: t2("view.configure.custom_fields"),
                items: [...this.plugin.getCustomFieldKeys(this.boardId)]
              }
            ],
            onOpenSettings: async () => {
              if (this.boardId) {
                this.plugin.settings.activeBoardId = this.boardId;
                await this.plugin.saveSettings();
              }
              await this.openPluginSettings();
            }
          });
          if (!result) return;
          const statusValue = (result.statuses || []).join(", ");
          const customFieldsValue = (result.customFields || []).join(", ");
          const board = this.boardId ? this.plugin.getBoard(this.boardId) : null;
          if (board) {
            board.statusOrder = statusValue || null;
            board.customFields = customFieldsValue || null;
          } else {
            this.plugin.settings.statusOrder = statusValue;
            this.plugin.settings.customFields = customFieldsValue;
            if (this.plugin.settings.defaultBoardConfig) {
              this.plugin.settings.defaultBoardConfig.statusOrder = statusValue;
              this.plugin.settings.defaultBoardConfig.customFields = customFieldsValue;
            }
          }
          await this.plugin.saveSettings();
          await this.reload();
          new Notice2(t2("view.configure.updated_notice"));
        }
        async createTaskInteractive() {
          let statuses = this.plugin.collectStatusesFromCards(this.cards, this.boardId);
          const board = this.boardId ? this.plugin.getBoard(this.boardId) : null;
          if (board && board.type === "filtered-view" && board.visibleStatuses) {
            const visible = String(board.visibleStatuses).split(",").map((s) => s.trim()).filter(Boolean);
            if (visible.length) {
              statuses = [...visible];
            }
          }
          if (!statuses.length) statuses = [this.plugin.getDefaultStatus(this.boardId)];
          const defaultStatus = statuses[0] || this.plugin.getDefaultStatus(this.boardId);
          const categories = this.uniqueValues("category");
          const priorities = this.uniqueValues("priority");
          const values = await this.plugin.openFormModal({
            title: t2("view.task.new.title"),
            submitText: t2("common.create"),
            fields: [
              { key: "title", label: "Task title", value: "", type: "text" },
              { key: "status", label: "Status", value: defaultStatus, type: "select", options: statuses },
              {
                key: "category",
                label: "Category",
                value: "",
                type: "select",
                options: ["", ...categories],
                optionLabelEmpty: "None"
              },
              {
                key: "priority",
                label: "Priority",
                value: "",
                type: "select",
                options: ["", ...priorities],
                optionLabelEmpty: "None"
              },
              { key: "due", label: "Due date", value: "", type: "date" },
              { key: "tags", label: "Tags (comma separated)", value: "" }
            ]
          });
          if (!values) return;
          const title = String(values.title || "").trim();
          if (!title) {
            new Notice2(t2("view.task.title_required"));
            return;
          }
          const status = String(values.status || "").trim() || defaultStatus;
          const category = String(values.category || "").trim();
          const priority = String(values.priority || "").trim();
          const dueInput = String(values.due || "");
          const tagsInput = String(values.tags || "");
          const dueDate = normalizeDateInput2(dueInput);
          if (dueInput.trim() && !dueDate) {
            new Notice2(t2("view.task.invalid_due_date"));
            return;
          }
          const tags = splitCsv2(tagsInput);
          const eff = this.plugin.getEffectiveSettings(this.boardId);
          await this.plugin.createTaskEntry(title.trim(), {
            [eff.statusField]: (status || defaultStatus).trim() || defaultStatus,
            [eff.categoryField]: category.trim(),
            [eff.priorityField]: priority.trim(),
            [eff.dueDateField]: dueDate,
            [eff.tagsField]: tags
          }, this.boardId);
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
          const row = this.filtersEl.createDiv({ cls: "smart-kanban-filter-row" });
          const categories = this.uniqueValues("category");
          const priorities = this.uniqueValues("priority");
          const tags = this.uniqueTagValues();
          this.renderDropdownFilter(row, "Category", categories, "categories");
          this.renderDropdownFilter(row, "Priority", priorities, "priorities");
          this.renderDropdownFilter(row, "Tag", tags, "tags");
          const hasFilters = this.filters.categories.length || this.filters.priorities.length || this.filters.tags.length || this.filters.text;
          if (hasFilters) {
            const clearBtn = row.createEl("button", { text: t2("common.clear"), cls: "smart-kanban-filter-clear-btn" });
            clearBtn.addEventListener("click", () => {
              this.clearFilters();
              this.renderFilters();
              this.renderContent();
            });
          }
          const presetNames = this.plugin.getFilterPresetNames(this.boardId);
          if (presetNames.length > 0 || hasFilters) {
            const spacer = row.createDiv({ cls: "smart-kanban-filter-spacer" });
            this.renderPresetControls(row, presetNames);
          }
        }
        renderPresetControls(row, names) {
          const wrap = row.createDiv({ cls: "smart-kanban-preset-wrap" });
          if (names.length > 0) {
            const select = wrap.createEl("select", { cls: "smart-kanban-preset-select" });
            select.createEl("option", { text: t2("view.preset.placeholder"), value: "" });
            for (const name of names.sort((a, b) => a.localeCompare(b))) {
              const opt = select.createEl("option", { value: name });
              opt.textContent = name;
            }
            select.value = this.currentPreset;
            select.addEventListener("change", () => {
              if (!select.value) {
                this.currentPreset = "";
                return;
              }
              this.applyPreset(select.value);
            });
            if (this.currentPreset) {
              const deleteBtn = wrap.createEl("button", { cls: "smart-kanban-icon-btn-sm", attr: { title: t2("view.preset.delete_title") } });
              setIcon2(deleteBtn, "trash-2");
              deleteBtn.addEventListener("click", () => this.deleteCurrentPresetInteractive());
            }
          }
          const saveBtn = wrap.createEl("button", { cls: "smart-kanban-icon-btn-sm", attr: { title: t2("view.preset.save_title") } });
          setIcon2(saveBtn, "bookmark-plus");
          saveBtn.addEventListener("click", () => this.savePresetInteractive());
        }
        renderDropdownFilter(parent, label, values, key) {
          const wrap = parent.createDiv({ cls: "smart-kanban-dropdown-filter" });
          const selected = this.filters[key] || [];
          const btnText = selected.length === 0 ? label : `${label} (${selected.length})`;
          const trigger = wrap.createEl("button", { cls: "smart-kanban-dropdown-trigger" });
          trigger.createSpan({ text: btnText });
          const chevron = trigger.createSpan({ cls: "smart-kanban-dropdown-chevron" });
          setIcon2(chevron, "chevron-down");
          const panel = wrap.createDiv({ cls: "smart-kanban-dropdown-panel" });
          panel.style.display = "none";
          let isOpen = false;
          const closePanel = () => {
            isOpen = false;
            panel.style.display = "none";
            trigger.removeClass("is-open");
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
            trigger.addClass("is-open");
            document.addEventListener("click", outsideClick, true);
          });
          this._dropdownCleanups.push(() => {
            document.removeEventListener("click", outsideClick, true);
          });
          if (!values.length) {
            panel.createDiv({ text: `No ${label.toLowerCase()} values`, cls: "smart-kanban-dropdown-empty" });
            return;
          }
          for (const value of values) {
            const item = panel.createDiv({ cls: "smart-kanban-dropdown-item" });
            const cb = item.createEl("input");
            cb.type = "checkbox";
            cb.checked = selected.includes(value);
            const lbl = item.createEl("span", { cls: "smart-kanban-dropdown-item-label" });
            lbl.textContent = value;
            const updateTrigger = () => {
              const sel = this.filters[key];
              trigger.querySelector("span").textContent = sel.length === 0 ? label : `${label} (${sel.length})`;
            };
            cb.addEventListener("change", () => {
              this.toggleFilterValue(key, value);
              updateTrigger();
            });
            item.addEventListener("click", (event) => {
              if (event.target !== cb) {
                cb.checked = !cb.checked;
                cb.dispatchEvent(new Event("change"));
              }
            });
          }
          if (selected.length > 0) {
            const clearAll = panel.createEl("button", { text: t2("common.clear"), cls: "smart-kanban-dropdown-clear" });
            clearAll.addEventListener("click", () => {
              this.filters[key] = [];
              this.currentPreset = "";
              this.renderFilters();
              this.renderContent();
            });
          }
        }
        toggleFilterValue(key, value) {
          const selected = new Set(this.filters[key]);
          if (selected.has(value)) selected.delete(value);
          else selected.add(value);
          this.filters[key] = [...selected].sort((a, b) => a.localeCompare(b));
          this.currentPreset = "";
          this.renderFilters();
          this.renderContent();
        }
        applyPreset(name) {
          const preset = this.plugin.getFilterPreset(name, this.boardId);
          if (!preset) {
            new Notice2(t2("view.preset.not_found", { name }));
            this.currentPreset = "";
            this.renderFilters();
            return;
          }
          this.filters = this.plugin.cloneFilters(preset);
          this.currentPreset = name;
          this.renderFilters();
          this.renderContent();
        }
        async savePresetInteractive() {
          const values = await this.plugin.openFormModal({
            title: t2("view.preset.save_dialog_title"),
            submitText: t2("common.save"),
            fields: [
              {
                key: "name",
                label: t2("view.preset.name_label"),
                value: this.currentPreset || ""
              }
            ]
          });
          if (!values) return;
          const normalizedName = String(values.name || "").trim();
          if (!normalizedName) return;
          await this.plugin.saveFilterPreset(normalizedName, this.filters, this.boardId);
          this.currentPreset = normalizedName;
          this.renderFilters();
          new Notice2(t2("view.preset.saved_notice", { name: normalizedName }));
        }
        async deleteCurrentPresetInteractive() {
          if (!this.currentPreset) return;
          const name = this.currentPreset;
          const confirmed = await this.plugin.openConfirmModal({
            title: t2("view.preset.delete_dialog_title"),
            message: t2("view.preset.delete_confirm", { name }),
            confirmText: t2("common.delete")
          });
          if (!confirmed) return;
          await this.plugin.deleteFilterPreset(name, this.boardId);
          this.currentPreset = "";
          this.renderFilters();
          new Notice2(t2("view.preset.deleted_notice", { name }));
        }
        clearFilters() {
          this.filters = this.plugin.createEmptyFilters();
          this.currentPreset = "";
        }
        uniqueValues(key) {
          const out = /* @__PURE__ */ new Set();
          for (const card of this.cards) {
            const value = String(card[key] || "").trim();
            if (value) out.add(value);
          }
          return [...out].sort((a, b) => a.localeCompare(b));
        }
        uniqueTagValues() {
          const out = /* @__PURE__ */ new Set();
          for (const card of this.cards) {
            for (const tag of card.tags || []) out.add(tag);
          }
          return [...out].sort((a, b) => a.localeCompare(b));
        }
        renderBoard() {
          this.boardEl.empty();
          this.boardEl.removeClass("smart-kanban-table-wrap");
          this.boardEl.removeClass("smart-kanban-list-wrap");
          this.boardEl.addClass("smart-kanban-board");
          if (this.cards.length === 0) {
            const emptyEl = this.boardEl.createDiv({ cls: "smart-kanban-empty-state" });
            emptyEl.createEl("h3", { text: t2("view.empty.no_tasks_title") });
            emptyEl.createEl("p", { text: t2("view.empty.no_tasks_desc") });
            const createBtn = emptyEl.createEl("button", { text: t2("view.empty.create_first_task"), cls: "mod-cta" });
            createBtn.addEventListener("click", async () => {
              await this.createTaskInteractive();
            });
            return;
          }
          let statuses = this.plugin.collectStatusesFromCards(this.cards, this.boardId);
          const board = this.boardId ? this.plugin.getBoard(this.boardId) : null;
          if (board && board.type === "filtered-view" && board.visibleStatuses) {
            const visible = board.visibleStatuses.split(",").map((s) => s.trim()).filter(Boolean);
            if (visible.length) statuses = statuses.filter((s) => visible.includes(s));
          }
          const filteredCards = this.filteredCards();
          if (this.cards.length > 0 && filteredCards.length === 0) {
            const emptyEl = this.boardEl.createDiv({ cls: "smart-kanban-empty-state" });
            emptyEl.createEl("p", { text: t2("view.empty.no_filter_match") });
            const clearBtn = emptyEl.createEl("button", { text: t2("view.empty.clear_filters") });
            clearBtn.addEventListener("click", () => {
              this.clearFilters();
              this.renderFilters();
              this.renderContent();
            });
            return;
          }
          const eff = this.getActiveSettings();
          for (const status of statuses) {
            const lane = this.boardEl.createDiv({ cls: "smart-kanban-lane" });
            lane.dataset.status = status;
            const isCollapsed = this.collapsedLanes.has(status);
            if (isCollapsed) lane.addClass("is-collapsed");
            const laneColor = this.plugin.getResolvedLaneColor(status, this.boardId);
            if (laneColor.bg) lane.style.setProperty("--sk-lane-accent-bg", laneColor.bg);
            if (laneColor.text) lane.style.setProperty("--sk-lane-accent-text", laneColor.text);
            const laneHeader = lane.createDiv({ cls: "smart-kanban-lane-header" });
            const laneTitle = laneHeader.createEl("h3", { text: status });
            laneHeader.addEventListener("click", () => {
              if (this.collapsedLanes.has(status)) this.collapsedLanes.delete(status);
              else this.collapsedLanes.add(status);
              this.renderBoard();
            });
            const fallbackStatus = this.plugin.getDefaultStatus(this.boardId);
            let laneCards = filteredCards.filter((card) => (card.status || fallbackStatus) === status);
            laneCards = this.plugin.sortCards(laneCards, this.boardId);
            laneHeader.createEl("span", { text: String(laneCards.length), cls: "smart-kanban-count" });
            const wipLimit = this.plugin.getWipLimit(status, this.boardId);
            if (wipLimit > 0) {
              const wip = laneHeader.createEl("span", {
                text: `${laneCards.length}/${wipLimit}`,
                cls: "smart-kanban-wip"
              });
              if (laneCards.length > wipLimit) {
                wip.addClass("is-over");
                lane.addClass("is-over-wip");
              }
            }
            if (!isCollapsed) {
              const list = lane.createDiv({ cls: "smart-kanban-card-list" });
              list.dataset.status = status;
              for (const card of laneCards) {
                this.renderCard(list, card, eff);
              }
              const quickAdd = lane.createDiv({ cls: "smart-kanban-quick-add" });
              const quickLabel = quickAdd.createEl("span", {
                text: t2("view.quick_add.new_page"),
                cls: "smart-kanban-quick-add-label"
              });
              if (laneColor.text) quickLabel.style.color = laneColor.text;
              const quickInput = quickAdd.createEl("input", {
                type: "text",
                placeholder: t2("view.quick_add.placeholder"),
                cls: "smart-kanban-quick-add-input"
              });
              quickInput.style.display = "none";
              let quickAddPending = false;
              quickLabel.addEventListener("click", () => {
                quickLabel.style.display = "none";
                quickInput.style.display = "";
                quickInput.focus();
              });
              const doQuickAdd = async () => {
                if (quickAddPending) return;
                const title = quickInput.value.trim();
                if (!title) {
                  quickInput.style.display = "none";
                  quickLabel.style.display = "";
                  return;
                }
                quickAddPending = true;
                quickInput.style.display = "none";
                quickLabel.style.display = "";
                const s = this.plugin.getEffectiveSettings(this.boardId);
                try {
                  await this.plugin.createTaskEntry(title, {
                    [s.statusField]: status,
                    [s.categoryField]: "",
                    [s.priorityField]: "",
                    [s.dueDateField]: "",
                    [s.tagsField]: ""
                  }, this.boardId);
                  quickInput.value = "";
                  await this.reload();
                } finally {
                  quickAddPending = false;
                }
              };
              quickInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  doQuickAdd();
                }
                if (e.key === "Escape") {
                  quickInput.value = "";
                  quickInput.style.display = "none";
                  quickLabel.style.display = "";
                }
              });
              quickInput.addEventListener("blur", () => {
                setTimeout(() => {
                  if (quickInput.style.display !== "none") {
                    doQuickAdd();
                  }
                }, 150);
              });
            }
          }
        }
        renderTable() {
          this.boardEl.empty();
          this.boardEl.removeClass("smart-kanban-board");
          this.boardEl.addClass("smart-kanban-table-wrap");
          const eff = this.getActiveSettings();
          const filtered = this.filteredCards();
          const sorted = this.plugin.sortCards(filtered, this.boardId);
          if (!sorted.length) {
            this.boardEl.createDiv({ cls: "smart-kanban-empty-state" }).createEl("p", { text: t2("view.empty.no_tasks") });
            return;
          }
          const table = this.boardEl.createEl("table", { cls: "smart-kanban-table" });
          const thead = table.createEl("thead");
          const headerRow = thead.createEl("tr");
          for (const col of ["Title", "Status", "Category", "Priority", "Due Date", "Tags"]) {
            headerRow.createEl("th", { text: col });
          }
          const tbody = table.createEl("tbody");
          for (const card of sorted) {
            const tr = tbody.createEl("tr", { cls: "smart-kanban-table-row" });
            const tdTitle = tr.createEl("td");
            const link = tdTitle.createEl("a", { text: card.title, href: "#", cls: "smart-kanban-table-link" });
            link.addEventListener("click", async (e) => {
              e.preventDefault();
              const file = this.app.vault.getAbstractFileByPath(card.path);
              if (file instanceof TFile2) await this.app.workspace.getLeaf(true).openFile(file);
            });
            tr.createEl("td").createSpan({ text: card.status || this.plugin.getDefaultStatus(this.boardId), cls: "smart-kanban-badge smart-kanban-badge-category" });
            const tdCat = tr.createEl("td");
            if (card.category) {
              const catBadge = tdCat.createSpan({ text: card.category, cls: "smart-kanban-badge smart-kanban-badge-category" });
              this.applyBadgeColor(catBadge, eff.categoryColors, card.category);
              this.bindFilterBadge(catBadge, "categories", card.category);
            }
            const tdPri = tr.createEl("td");
            if (card.priority) {
              const slug = card.priority.toLowerCase().replace(/\s+/g, "-");
              tdPri.createSpan({ text: card.priority, cls: `smart-kanban-badge smart-kanban-priority-badge smart-kanban-priority-${slug}` });
            }
            const tdDue = tr.createEl("td");
            if (card.dueDate) {
              const cls = card.dueInfo ? `smart-kanban-badge smart-kanban-due-badge ${card.dueInfo.cls || ""}` : "";
              tdDue.createSpan({ text: card.dueInfo && card.dueInfo.label ? card.dueInfo.label : card.dueDate, cls });
            }
            const tdTags = tr.createEl("td", { cls: "smart-kanban-table-tags" });
            for (const tag of card.tags || []) {
              const tagBadge = tdTags.createSpan({ text: tag, cls: "smart-kanban-badge smart-kanban-tag" });
              this.applyBadgeColor(tagBadge, eff.tagColors, tag);
              this.bindFilterBadge(tagBadge, "tags", tag);
            }
          }
        }
        renderList() {
          this.boardEl.empty();
          this.boardEl.removeClass("smart-kanban-board");
          this.boardEl.addClass("smart-kanban-list-wrap");
          const eff = this.getActiveSettings();
          const filtered = this.filteredCards();
          const statuses = this.plugin.collectStatusesFromCards(this.cards, this.boardId);
          if (!filtered.length) {
            this.boardEl.createDiv({ cls: "smart-kanban-empty-state" }).createEl("p", { text: t2("view.empty.no_tasks") });
            return;
          }
          for (const status of statuses) {
            const fallbackStatus = this.plugin.getDefaultStatus(this.boardId);
            let laneCards = filtered.filter((c) => (c.status || fallbackStatus) === status);
            if (!laneCards.length) continue;
            laneCards = this.plugin.sortCards(laneCards, this.boardId);
            const section = this.boardEl.createDiv({ cls: "smart-kanban-list-section" });
            const header = section.createDiv({ cls: "smart-kanban-list-section-header" });
            const laneColor = this.plugin.getResolvedLaneColor(status, this.boardId);
            const listTitle = header.createSpan({ text: status, cls: "smart-kanban-list-section-title" });
            if (laneColor.bg) listTitle.style.color = laneColor.bg;
            header.createSpan({ text: String(laneCards.length), cls: "smart-kanban-list-section-count" });
            for (const card of laneCards) {
              const row = section.createDiv({ cls: "smart-kanban-list-item" });
              const link = row.createEl("a", { text: card.title, href: "#", cls: "smart-kanban-list-item-title" });
              link.addEventListener("click", async (e) => {
                e.preventDefault();
                const file = this.app.vault.getAbstractFileByPath(card.path);
                if (file instanceof TFile2) await this.app.workspace.getLeaf(true).openFile(file);
              });
              const badges = row.createDiv({ cls: "smart-kanban-list-item-badges" });
              if (card.category) {
                const catBadge = badges.createSpan({ text: card.category, cls: "smart-kanban-badge smart-kanban-badge-category" });
                this.applyBadgeColor(catBadge, eff.categoryColors, card.category);
                this.bindFilterBadge(catBadge, "categories", card.category);
              }
              if (card.priority) {
                const slug = card.priority.toLowerCase().replace(/\s+/g, "-");
                badges.createSpan({ text: card.priority, cls: `smart-kanban-badge smart-kanban-priority-badge smart-kanban-priority-${slug}` });
              }
              if (card.dueInfo) badges.createSpan({ text: card.dueInfo.label, cls: "smart-kanban-badge smart-kanban-due-badge" });
              for (const tag of card.tags || []) {
                const tagBadge = badges.createSpan({ text: tag, cls: "smart-kanban-badge smart-kanban-tag" });
                this.applyBadgeColor(tagBadge, eff.tagColors, tag);
                this.bindFilterBadge(tagBadge, "tags", tag);
              }
            }
          }
        }
        renderFeed() {
          this.boardEl.empty();
          this.boardEl.removeClass("smart-kanban-board");
          this.boardEl.addClass("smart-kanban-list-wrap");
          const eff = this.getActiveSettings();
          const sorted = this.plugin.sortCards(this.filteredCards(), this.boardId);
          if (!sorted.length) {
            this.boardEl.createDiv({ cls: "smart-kanban-empty-state" }).createEl("p", { text: t2("view.empty.no_tasks") });
            return;
          }
          for (const card of sorted) {
            const row = this.boardEl.createDiv({ cls: "smart-kanban-list-item" });
            const link = row.createEl("a", { text: card.title, href: "#", cls: "smart-kanban-list-item-title" });
            link.addEventListener("click", async (e) => {
              e.preventDefault();
              const file = this.app.vault.getAbstractFileByPath(card.path);
              if (file instanceof TFile2) await this.app.workspace.getLeaf(true).openFile(file);
            });
            const badges = row.createDiv({ cls: "smart-kanban-list-item-badges" });
            badges.createSpan({ text: card.status || this.plugin.getDefaultStatus(this.boardId), cls: "smart-kanban-badge smart-kanban-badge-category" });
            if (card.category) {
              const catBadge = badges.createSpan({ text: card.category, cls: "smart-kanban-badge smart-kanban-badge-category" });
              this.applyBadgeColor(catBadge, eff.categoryColors, card.category);
              this.bindFilterBadge(catBadge, "categories", card.category);
            }
            if (card.priority) {
              const slug = card.priority.toLowerCase().replace(/\s+/g, "-");
              badges.createSpan({ text: card.priority, cls: `smart-kanban-badge smart-kanban-priority-badge smart-kanban-priority-${slug}` });
            }
            if (card.dueInfo) badges.createSpan({ text: card.dueInfo.label, cls: "smart-kanban-badge smart-kanban-due-badge" });
            for (const tag of card.tags || []) {
              const tagBadge = badges.createSpan({ text: tag, cls: "smart-kanban-badge smart-kanban-tag" });
              this.applyBadgeColor(tagBadge, eff.tagColors, tag);
              this.bindFilterBadge(tagBadge, "tags", tag);
            }
          }
        }
        renderCard(parent, card, eff = this.getActiveSettings()) {
          const cardEl = parent.createDiv({ cls: "smart-kanban-card" });
          cardEl.dataset.cardId = card.id;
          if (card.priority) cardEl.dataset.priority = card.priority.toLowerCase().replace(/\s+/g, "-");
          cardEl.setAttr("tabindex", "0");
          cardEl.addEventListener("pointerdown", (e) => {
            if (e.button !== 0) return;
            if (e.target.closest("a, button, select, input")) return;
            e.preventDefault();
            this._startDrag(e, cardEl, card);
          });
          if (card.dueInfo && card.dueInfo.cls) {
            cardEl.addClass(card.dueInfo.cls);
          }
          const titleRow = cardEl.createDiv({ cls: "smart-kanban-card-title" });
          const link = titleRow.createEl("a", { text: card.title, href: "#", cls: "smart-kanban-card-title-link" });
          link.addEventListener("click", async (event) => {
            event.preventDefault();
            const file = this.app.vault.getAbstractFileByPath(card.path);
            if (file instanceof TFile2) {
              await this.app.workspace.getLeaf(true).openFile(file);
            }
          });
          const overflowWrap = titleRow.createDiv({ cls: "smart-kanban-overflow-wrap" });
          const overflowBtn = overflowWrap.createEl("button", { cls: "smart-kanban-overflow-btn" });
          setIcon2(overflowBtn, "more-horizontal");
          const badges = cardEl.createDiv({ cls: "smart-kanban-card-badges" });
          if (card.category) {
            const catBadge = badges.createSpan({ text: card.category, cls: "smart-kanban-badge smart-kanban-badge-category" });
            this.applyBadgeColor(catBadge, eff.categoryColors, card.category);
            this.bindFilterBadge(catBadge, "categories", card.category);
          }
          if (card.priority) {
            const prioSlug = card.priority.toLowerCase().replace(/\s+/g, "-");
            badges.createSpan({
              text: card.priority,
              cls: `smart-kanban-badge smart-kanban-priority-badge smart-kanban-priority-${prioSlug}`
            });
          }
          if (card.dueInfo) {
            badges.createSpan({ text: card.dueInfo.label, cls: "smart-kanban-badge smart-kanban-due-badge" });
          }
          const customEntries = this.plugin.getCardMetaEntries(card, eff);
          for (const [label, value] of customEntries) {
            if (!value || value === "-") continue;
            if (label === "Category" || label === "Priority" || label === "Due") continue;
            badges.createSpan({ text: value, cls: "smart-kanban-badge smart-kanban-badge-custom" });
          }
          if (card.tags && card.tags.length) {
            for (const tag of card.tags) {
              const tagBadge = badges.createSpan({ text: tag, cls: "smart-kanban-badge smart-kanban-tag" });
              this.applyBadgeColor(tagBadge, eff.tagColors, tag);
              this.bindFilterBadge(tagBadge, "tags", tag);
            }
          }
          const menu = overflowWrap.createDiv({ cls: "smart-kanban-overflow-menu" });
          menu.style.display = "none";
          overflowBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            document.querySelectorAll(".smart-kanban-overflow-menu").forEach((m) => {
              if (m !== menu) {
                m.style.display = "none";
                const c = m.closest(".smart-kanban-card");
                if (c) c.classList.remove("has-menu-open");
              }
            });
            const opening = menu.style.display === "none";
            menu.style.display = opening ? "" : "none";
            cardEl.classList.toggle("has-menu-open", opening);
          });
          const editItem = menu.createDiv({ text: t2("view.menu.edit"), cls: "smart-kanban-menu-item" });
          editItem.addEventListener("click", async () => {
            menu.style.display = "none";
            await this.editCardInteractive(card);
          });
          const openItem = menu.createDiv({ text: t2("view.menu.open_note"), cls: "smart-kanban-menu-item" });
          openItem.addEventListener("click", async () => {
            menu.style.display = "none";
            const file = this.app.vault.getAbstractFileByPath(card.path);
            if (file instanceof TFile2) {
              await this.app.workspace.getLeaf(true).openFile(file);
            }
          });
          const completeItem = menu.createDiv({ text: t2("view.menu.mark_done"), cls: "smart-kanban-menu-item" });
          completeItem.addEventListener("click", async () => {
            menu.style.display = "none";
            await this.plugin.updateCardStatus(card, "Done", this.boardId);
            await this.reload();
            new Notice2(t2("view.menu.completed_notice", { title: card.title }));
          });
          const moveItem = menu.createDiv({ cls: "smart-kanban-menu-item smart-kanban-move-item" });
          moveItem.createSpan({ text: t2("view.menu.move_to") + " " });
          const moveSelect = moveItem.createEl("select", { cls: "smart-kanban-move-select" });
          moveSelect.createEl("option", { text: t2("common.ellipsis"), value: "" });
          const allStatuses = this.plugin.collectStatusesFromCards(this.cards, this.boardId);
          for (const s of allStatuses) {
            if (s !== card.status) {
              moveSelect.createEl("option", { text: s, value: s });
            }
          }
          moveSelect.addEventListener("change", async () => {
            if (!moveSelect.value) return;
            menu.style.display = "none";
            await this.plugin.updateCardStatus(card, moveSelect.value, this.boardId);
            await this.reload();
          });
          const deleteItem = menu.createDiv({ text: t2("common.delete"), cls: "smart-kanban-menu-item smart-kanban-menu-delete" });
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
            title: t2("view.delete.title"),
            message: t2("view.delete.message", { title: card.title }),
            confirmText: t2("common.delete")
          });
          if (!confirmed) return;
          if (card.kind === "task") {
            await this.plugin.deleteTaskLine(card);
          } else {
            await this.plugin.deleteNoteCard(card);
          }
          await this.reload();
          new Notice2(t2("view.delete.deleted_notice", { title: card.title }));
        }
        async editCardInteractive(card) {
          const eff = this.plugin.getEffectiveSettings(this.boardId);
          const categories = this.uniqueValues("category");
          const priorities = this.uniqueValues("priority");
          const values = await this.plugin.openFormModal({
            title: t2("view.task.edit.title"),
            submitText: t2("common.save"),
            fields: [
              { key: "title", label: "Title", value: card.title || "" },
              {
                key: "category",
                label: "Category",
                value: card.category || "",
                type: "select",
                options: ["", ...categories],
                optionLabelEmpty: "None"
              },
              {
                key: "priority",
                label: "Priority",
                value: card.priority || "",
                type: "select",
                options: ["", ...priorities],
                optionLabelEmpty: "None"
              },
              { key: "due", label: "Due date", value: card.dueDate || "", type: "date" },
              { key: "tags", label: "Tags (comma separated)", value: (card.tags || []).join(", ") }
            ]
          });
          if (!values) return;
          const newTitle = String(values.title || "").trim();
          if (newTitle && newTitle !== card.title) {
            await this.plugin.updateCardTitle(card, newTitle);
          }
          const nextCategory = String(values.category || "");
          const nextPriority = String(values.priority || "");
          const nextDueInput = String(values.due || "");
          const nextDue = normalizeDateInput2(nextDueInput);
          if (nextDueInput.trim() && !nextDue) {
            new Notice2(t2("view.task.invalid_due_date"));
            return;
          }
          const nextTagsInput = String(values.tags || "");
          const nextTags = splitCsv2(nextTagsInput);
          await this.plugin.updateCardFields(card, {
            [eff.categoryField]: nextCategory.trim(),
            [eff.priorityField]: nextPriority.trim(),
            [eff.dueDateField]: nextDue || "",
            [eff.tagsField]: nextTags
          }, this.boardId);
          await this.reload();
        }
        filteredCards() {
          const eff = this.plugin.getEffectiveSettings(this.boardId);
          const autoArchiveDays = Number(eff.autoArchiveDays) || 0;
          const now = /* @__PURE__ */ new Date();
          return this.cards.filter((card) => {
            if (autoArchiveDays > 0 && (card.status || "").toLowerCase() === "done" && card.dueDate) {
              const dueDate = /* @__PURE__ */ new Date(`${card.dueDate}T00:00:00`);
              if (!Number.isNaN(dueDate.getTime())) {
                const daysSince = Math.round((now.getTime() - dueDate.getTime()) / 864e5);
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
              const haystack = [card.title, card.category, card.priority, card.dueDate, ...card.tags || []].filter(Boolean).join(" ").toLowerCase();
              if (!haystack.includes(this.filters.text)) return false;
            }
            return true;
          });
        }
        /* ── Pointer-based drag & drop ── */
        _startDrag(e, cardEl, card) {
          const startX = e.clientX;
          const startY = e.clientY;
          const threshold = 5;
          let started = false;
          const onMove = (me) => {
            const dx = me.clientX - startX;
            const dy = me.clientY - startY;
            if (!started) {
              if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return;
              started = true;
              this._initDragOverlay(cardEl, card, startX, startY);
            }
            this._moveDrag(me.clientX, me.clientY);
          };
          const onUp = async (ue) => {
            document.removeEventListener("pointermove", onMove);
            document.removeEventListener("pointerup", onUp);
            document.removeEventListener("pointercancel", onUp);
            this._onMoveHandler = null;
            this._onUpHandler = null;
            if (!started) return;
            await this._finishDrag();
          };
          this._onMoveHandler = onMove;
          this._onUpHandler = onUp;
          document.addEventListener("pointermove", onMove);
          document.addEventListener("pointerup", onUp);
          document.addEventListener("pointercancel", onUp);
        }
        _initDragOverlay(cardEl, card, startX, startY) {
          const rect = cardEl.getBoundingClientRect();
          const ghost = cardEl.cloneNode(true);
          ghost.className = "smart-kanban-card smart-kanban-drag-ghost";
          ghost.style.cssText = `position:fixed;z-index:9999;width:${rect.width}px;pointer-events:none;opacity:0.85;transform:rotate(2deg);box-shadow:0 8px 24px rgba(0,0,0,0.18);`;
          ghost.style.left = `${rect.left}px`;
          ghost.style.top = `${rect.top}px`;
          document.body.appendChild(ghost);
          const placeholder = document.createElement("div");
          placeholder.className = "smart-kanban-drop-placeholder";
          placeholder.style.height = `${rect.height}px`;
          cardEl.parentElement.insertBefore(placeholder, cardEl);
          cardEl.classList.add("is-dragging-source");
          this._drag = {
            card,
            cardEl,
            ghost,
            placeholder,
            offsetX: startX - rect.left,
            offsetY: startY - rect.top,
            targetStatus: card.status || this.plugin.getDefaultStatus(this.boardId),
            isOverValidTarget: true
          };
        }
        _moveDrag(cx, cy) {
          const d = this._drag;
          if (!d) return;
          d.ghost.style.left = `${cx - d.offsetX}px`;
          d.ghost.style.top = `${cy - d.offsetY}px`;
          this.boardEl.querySelectorAll(".is-drag-target").forEach((el) => el.classList.remove("is-drag-target"));
          const lists = [...this.boardEl.querySelectorAll(".smart-kanban-card-list")];
          let targetList = null;
          for (const list of lists) {
            const lr = list.getBoundingClientRect();
            if (cx >= lr.left && cx <= lr.right && cy >= lr.top - 20 && cy <= lr.bottom + 20) {
              targetList = list;
              break;
            }
          }
          if (!targetList) {
            d.isOverValidTarget = false;
            return;
          }
          d.isOverValidTarget = true;
          d.targetStatus = targetList.dataset.status;
          targetList.classList.add("is-drag-target");
          const cardEls = [...targetList.querySelectorAll(".smart-kanban-card:not(.is-dragging-source)")];
          let insertBefore = null;
          for (const c of cardEls) {
            const cr = c.getBoundingClientRect();
            if (cy < cr.top + cr.height / 2) {
              insertBefore = c;
              break;
            }
          }
          if (insertBefore) {
            targetList.insertBefore(d.placeholder, insertBefore);
          } else {
            targetList.appendChild(d.placeholder);
          }
        }
        async _finishDrag() {
          const d = this._drag;
          if (!d) return;
          this._drag = null;
          d.ghost.remove();
          this.boardEl.querySelectorAll(".is-drag-target").forEach((el) => el.classList.remove("is-drag-target"));
          if (!d.isOverValidTarget) {
            d.placeholder.replaceWith(d.cardEl);
            d.cardEl.classList.remove("is-dragging-source");
            return;
          }
          d.placeholder.replaceWith(d.cardEl);
          d.cardEl.classList.remove("is-dragging-source");
          const orderTarget = this.boardId ? this.plugin.getBoard(this.boardId) : this.plugin.settings;
          if (!orderTarget) return;
          if (!orderTarget.cardOrder || typeof orderTarget.cardOrder !== "object") orderTarget.cardOrder = {};
          const allLists = this.boardEl.querySelectorAll(".smart-kanban-card-list");
          for (const list of allLists) {
            const cardEls = list.querySelectorAll(".smart-kanban-card");
            for (let i = 0; i < cardEls.length; i++) {
              const id = cardEls[i].dataset.cardId;
              if (id) orderTarget.cardOrder[id] = i * 1e3;
            }
          }
          await this.plugin.saveSettings();
          const oldStatus = d.card.status || this.plugin.getDefaultStatus(this.boardId);
          const targetStatus = d.targetStatus;
          if (targetStatus !== oldStatus) {
            await this.plugin.updateCardStatus(d.card, targetStatus, this.boardId);
          }
          if (this._dragReloadTimer) clearTimeout(this._dragReloadTimer);
          this._dragReloadTimer = setTimeout(() => this.reload(), 1500);
        }
        async onClose() {
          this._cancelDrag();
          if (this._dragReloadTimer) {
            clearTimeout(this._dragReloadTimer);
            this._dragReloadTimer = null;
          }
          if (this._keyHandler) {
            this.containerEl.removeEventListener("keydown", this._keyHandler);
            this._keyHandler = null;
          }
          if (this._clickOutsideHandler) {
            document.removeEventListener("click", this._clickOutsideHandler);
            this._clickOutsideHandler = null;
          }
        }
      }
      return { SmartKanbanView: SmartKanbanView2 };
    };
  }
});

// src/settings-tab.js
var require_settings_tab = __commonJS({
  "src/settings-tab.js"(exports2, module2) {
    module2.exports = function createSettingsTab({ PluginSettingTab: PluginSettingTab2, Setting: Setting2, Notice: Notice2, DEFAULT_SETTINGS: DEFAULT_SETTINGS2, BOARD_CONFIG_KEYS: BOARD_CONFIG_KEYS2 = [], THEME_PRESETS: THEME_PRESETS2, t: t2 = (k) => k, LOCALES: LOCALES2 = { en: {} }, setLocale: setLocale2 = () => {
    } }) {
      const boardConfigKeySet = new Set(BOARD_CONFIG_KEYS2);
      function tx(key, fallback, params) {
        const value = t2(key, params);
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
            text: String(value.text || "").trim()
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
      class SmartKanbanSettingTab2 extends PluginSettingTab2 {
        constructor(app, plugin) {
          super(app, plugin);
          this.plugin = plugin;
        }
        getActiveBoard() {
          const boardId = this.plugin.settings.activeBoardId || "";
          return boardId ? this.plugin.getBoard(boardId) : null;
        }
        getSetting(key, fallback = DEFAULT_SETTINGS2[key]) {
          const activeBoard = this.getActiveBoard();
          if (activeBoard && boardConfigKeySet.has(key)) {
            const boardValue = activeBoard[key];
            if (boardValue !== null && boardValue !== void 0 && boardValue !== "") return boardValue;
          }
          const globalValue = this.plugin.settings[key];
          return globalValue === void 0 ? fallback : globalValue;
        }
        setSetting(key, value, options = {}) {
          const opts = options || {};
          const activeBoard = this.getActiveBoard();
          if (activeBoard && boardConfigKeySet.has(key)) {
            const shouldInherit = !!opts.allowInherit && (value === "" || value === null || value === void 0);
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
        hasBoardOverride(key) {
          const activeBoard = this.getActiveBoard();
          if (!activeBoard) return false;
          return activeBoard[key] !== null && activeBoard[key] !== void 0 && activeBoard[key] !== "";
        }
        addInheritButton(setting, key, onAfterSave) {
          if (!this.getActiveBoard()) return;
          setting.addExtraButton((btn) => {
            btn.setIcon("undo-2");
            btn.setTooltip(tx("settings.inherit.tooltip", "Use global value"));
            btn.onClick(async () => {
              const board = this.getActiveBoard();
              if (!board) return;
              board[key] = null;
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
              if (typeof onAfterSave === "function") onAfterSave();
              this.display();
            });
          });
        }
        addScopeBadge(setting, key) {
          if (!setting || !this.getActiveBoard() || !boardConfigKeySet.has(key)) return;
          const inherited = !this.hasBoardOverride(key);
          const label = inherited ? tx("settings.scope.badge.inherited", "inherited") : tx("settings.scope.badge.overridden", "overridden");
          if (setting.nameEl) {
            setting.nameEl.createSpan({
              text: label,
              cls: `sk-settings-scope-badge ${inherited ? "is-inherited" : "is-overridden"}`
            });
          }
          if (setting.settingEl) {
            setting.settingEl.addClass("sk-settings-scoped-row");
            setting.settingEl.toggleClass("is-inherited", inherited);
            setting.settingEl.toggleClass("is-overridden", !inherited);
          }
        }
        async manageStatusesInteractive() {
          const boardId = this.plugin.settings.activeBoardId || "";
          let cards = [];
          try {
            cards = await this.plugin.collectCards(boardId);
          } catch (_e) {
            cards = [];
          }
          const statuses = this.plugin.collectStatusesFromCards(cards, boardId);
          const result = await this.plugin.openDragReorderModal({
            title: tx("settings.status_manager.title", "Manage Lanes"),
            sections: [
              {
                key: "statuses",
                label: tx("settings.status_manager.section", "Lanes"),
                items: statuses
              }
            ]
          });
          if (!result) return;
          const ordered = (result.statuses || []).map((x) => String(x || "").trim()).filter(Boolean);
          if (!ordered.length) {
            new Notice2(tx("settings.status_manager.empty", "At least one lane is required."));
            return;
          }
          this.setSetting("statusOrder", ordered.join(", "), { allowInherit: true });
          await this.plugin.saveSettings();
          this.plugin.refreshViews();
          this.display();
          new Notice2(tx("settings.status_manager.saved", "Lane order updated."));
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
          new Setting2(scopeSection).setName(tx("settings.scope.active_board", "Active board")).setDesc(activeBoard ? tx("settings.scope.current_board", `Current: ${activeBoard.name}`, { name: activeBoard.name }) : tx("settings.scope.current_default", "Current: Default Board")).addDropdown((dropdown) => {
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
          new Setting2(scopeSection).setName(tx("settings.scope.manage_boards", "Manage boards")).setDesc(tx("settings.scope.manage_boards.desc", "Create, edit, and delete boards.")).addButton((btn) => {
            btn.setButtonText(tx("settings.scope.open_manager", "Open Board Manager")).onClick(async () => {
              await this.plugin.openBoardManager();
              this.display();
            });
          });
          const srcSection = section(containerEl, t2("settings.section.dataSource"), t2("settings.section.dataSource.desc"));
          const sourceModeSetting = new Setting2(srcSection).setName(tx("settings.source_mode.name", "Source mode")).setDesc(tx("settings.source_mode.desc", "Note cards create one file per task. Task lines use checklist syntax in a single file.")).addDropdown(
            (dropdown) => dropdown.addOption("notes", tx("settings.source_mode.notes", "Note cards")).addOption("tasks", tx("settings.source_mode.tasks", "Task lines")).setValue(this.getSetting("sourceMode")).onChange(async (value) => {
              this.setSetting("sourceMode", value);
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          this.addInheritButton(sourceModeSetting, "sourceMode");
          this.addScopeBadge(sourceModeSetting, "sourceMode");
          const sourceFolderSetting = new Setting2(srcSection).setName(tx("settings.source_folder.name", "Source folder")).setDesc(tx("settings.source_folder.desc", "Folder containing your task notes or files.")).addText(
            (text) => text.setPlaceholder("Tasks").setValue(this.getSetting("sourceFolder")).onChange(async (value) => {
              this.setSetting("sourceFolder", value.trim(), { allowInherit: true });
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          this.addInheritButton(sourceFolderSetting, "sourceFolder");
          this.addScopeBadge(sourceFolderSetting, "sourceFolder");
          const includeSubfoldersSetting = new Setting2(srcSection).setName(tx("settings.include_subfolders.name", "Include subfolders")).setDesc(tx("settings.include_subfolders.desc", "Also scan nested folders inside the source folder.")).addToggle(
            (toggle) => toggle.setValue(!!this.getSetting("includeSubfolders")).onChange(async (value) => {
              this.setSetting("includeSubfolders", value);
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          this.addInheritButton(includeSubfoldersSetting, "includeSubfolders");
          this.addScopeBadge(includeSubfoldersSetting, "includeSubfolders");
          const taskInboxSetting = new Setting2(srcSection).setName(tx("settings.task_inbox.name", "Task inbox file")).setDesc(tx("settings.task_inbox.desc", "File used when adding new tasks in Task Lines mode.")).addText(
            (text) => text.setPlaceholder("Tasks/Task Inbox.md").setValue(this.getSetting("taskInboxFile")).onChange(async (value) => {
              const trimmed = value.trim();
              const activeBoard2 = this.getActiveBoard();
              const next = activeBoard2 ? trimmed : trimmed || "Tasks/Task Inbox.md";
              this.setSetting("taskInboxFile", next, { allowInherit: true });
              await this.plugin.saveSettings();
            })
          );
          this.addInheritButton(taskInboxSetting, "taskInboxFile");
          this.addScopeBadge(taskInboxSetting, "taskInboxFile");
          const noteTemplateSetting = new Setting2(srcSection).setName(tx("settings.note_template.name", "Note template")).setDesc(tx("settings.note_template.desc", "Optional template file path used when creating note-mode tasks.")).addText(
            (text) => text.setPlaceholder("Templates/Task.md").setValue(this.getSetting("noteTemplate", "") || "").onChange(async (value) => {
              this.setSetting("noteTemplate", String(value || "").trim(), { allowInherit: true });
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          this.addInheritButton(noteTemplateSetting, "noteTemplate");
          this.addScopeBadge(noteTemplateSetting, "noteTemplate");
          const fieldSection = section(containerEl, t2("settings.section.fieldMapping"), t2("settings.section.fieldMapping.desc"));
          const discoveredFieldKeys = typeof this.plugin.getDiscoveredFrontmatterKeys === "function" ? this.plugin.getDiscoveredFrontmatterKeys(this.plugin.settings.activeBoardId || "") : [];
          const fieldDefs = [
            ["statusField", tx("settings.field.status.name", "Status field"), tx("settings.field.status.desc", "Determines which lane a card appears in.")],
            ["categoryField", tx("settings.field.category.name", "Category field"), tx("settings.field.category.desc", "Optional grouping label shown as a badge.")],
            ["priorityField", tx("settings.field.priority.name", "Priority field"), tx("settings.field.priority.desc", "Sets priority level (Urgent, High, Medium, Low).")],
            ["tagsField", tx("settings.field.tags.name", "Tags field"), tx("settings.field.tags.desc", "Comma-separated tags displayed on the card.")],
            ["dueDateField", tx("settings.field.due.name", "Due date field"), tx("settings.field.due.desc", "Date in YYYY-MM-DD format for due tracking.")]
          ];
          for (const [key, label, desc] of fieldDefs) {
            const listId = `smart-kanban-field-suggest-${key}`;
            const datalist = fieldSection.createEl("datalist");
            datalist.setAttr("id", listId);
            const suggestions = Array.from(new Set([
              DEFAULT_SETTINGS2[key],
              this.getSetting(key),
              ...discoveredFieldKeys
            ].filter(Boolean))).sort((a, b) => String(a).localeCompare(String(b)));
            for (const optionValue of suggestions) {
              datalist.createEl("option", { value: String(optionValue) });
            }
            const st = new Setting2(fieldSection).setName(label).setDesc(desc).addText(
              (text) => text.setValue(this.getSetting(key)).onChange(async (value) => {
                const trimmed = value.trim();
                const activeBoard2 = this.getActiveBoard();
                const next = activeBoard2 ? trimmed : trimmed || DEFAULT_SETTINGS2[key];
                this.setSetting(key, next, { allowInherit: true });
                await this.plugin.saveSettings();
                this.plugin.refreshViews();
              })
            );
            if (st.components && st.components[0] && st.components[0].inputEl) {
              st.components[0].inputEl.setAttr("list", listId);
            }
            this.addInheritButton(st, key);
            this.addScopeBadge(st, key);
          }
          const customFieldsSetting = new Setting2(fieldSection).setName(tx("settings.custom_fields.name", "Custom fields")).setDesc(tx("settings.custom_fields.desc", "Extra frontmatter keys to display on cards. Comma-separated.")).addText(
            (text) => text.setPlaceholder("effort, assignee").setValue(this.getSetting("customFields")).onChange(async (value) => {
              this.setSetting("customFields", value, { allowInherit: true });
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          this.addInheritButton(customFieldsSetting, "customFields");
          this.addScopeBadge(customFieldsSetting, "customFields");
          const layoutSection = section(containerEl, t2("settings.section.layout"), t2("settings.section.layout.desc"));
          const statusOrderSetting = new Setting2(layoutSection).setName(tx("settings.status_order.name", "Status order")).setDesc(tx("settings.status_order.desc", "Comma-separated lane names in display order.")).addTextArea(
            (text) => text.setValue(this.getSetting("statusOrder")).onChange(async (value) => {
              this.setSetting("statusOrder", value, { allowInherit: true });
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          this.addInheritButton(statusOrderSetting, "statusOrder");
          this.addScopeBadge(statusOrderSetting, "statusOrder");
          new Setting2(layoutSection).setName(tx("settings.status_manager.name", "Lane manager")).setDesc(tx("settings.status_manager.desc", "Discover and reorder lanes from current board data.")).addButton((btn) => {
            btn.setButtonText(tx("settings.status_manager.open", "Manage lanes")).onClick(async () => {
              await this.manageStatusesInteractive();
            });
          });
          const priorityOrderSetting = new Setting2(layoutSection).setName(tx("settings.priority_order.name", "Priority order")).setDesc(tx("settings.priority_order.desc", "Defines priority ranking for sorting. Comma-separated, highest first.")).addText(
            (text) => text.setPlaceholder("Urgent,High,Medium,Low").setValue(this.getSetting("priorityOrder")).onChange(async (value) => {
              this.setSetting("priorityOrder", value, { allowInherit: true });
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          this.addInheritButton(priorityOrderSetting, "priorityOrder");
          this.addScopeBadge(priorityOrderSetting, "priorityOrder");
          const sortBySetting = new Setting2(layoutSection).setName(tx("settings.sort_by.name", "Sort by")).setDesc(tx("settings.sort_by.desc", "Default card sorting within each lane.")).addDropdown(
            (dropdown) => dropdown.addOption("none", tx("settings.sort_by.none", "Manual (drag to reorder)")).addOption("priority", tx("settings.sort_by.priority", "Priority")).addOption("due", tx("settings.sort_by.due", "Due date")).addOption("title", tx("settings.sort_by.title", "Title")).setValue(this.getSetting("sortBy")).onChange(async (value) => {
              this.setSetting("sortBy", value);
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          this.addInheritButton(sortBySetting, "sortBy");
          this.addScopeBadge(sortBySetting, "sortBy");
          const sortDirectionSetting = new Setting2(layoutSection).setName(tx("settings.sort_direction.name", "Sort direction")).addDropdown(
            (dropdown) => dropdown.addOption("asc", tx("settings.sort_direction.asc", "Ascending")).addOption("desc", tx("settings.sort_direction.desc", "Descending")).setValue(this.getSetting("sortDirection")).onChange(async (value) => {
              this.setSetting("sortDirection", value);
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          this.addInheritButton(sortDirectionSetting, "sortDirection");
          this.addScopeBadge(sortDirectionSetting, "sortDirection");
          const dueSoonSetting = new Setting2(layoutSection).setName(tx("settings.due_soon.name", "Due soon threshold")).setDesc(tx("settings.due_soon.desc", "Cards due within this many days are highlighted.")).addText(
            (text) => text.setValue(String(this.getSetting("dueSoonDays", 2))).onChange(async (value) => {
              const parsed = Number.parseInt(value, 10);
              this.setSetting("dueSoonDays", Number.isFinite(parsed) && parsed >= 0 ? parsed : 2);
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          this.addInheritButton(dueSoonSetting, "dueSoonDays");
          this.addScopeBadge(dueSoonSetting, "dueSoonDays");
          const wipLimitsSetting = new Setting2(layoutSection).setName(tx("settings.wip_limits.name", "WIP limits")).setDesc(tx("settings.wip_limits.desc", "Limit cards per lane. Format: Todo:10, In Progress:3")).addTextArea(
            (text) => text.setValue(this.getSetting("wipLimits")).onChange(async (value) => {
              this.setSetting("wipLimits", value, { allowInherit: true });
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          this.addInheritButton(wipLimitsSetting, "wipLimits");
          this.addScopeBadge(wipLimitsSetting, "wipLimits");
          const autoArchiveSetting = new Setting2(layoutSection).setName(tx("settings.auto_archive.name", "Auto-archive done tasks")).setDesc(tx("settings.auto_archive.desc", "Hide completed tasks older than this many days. Set to 0 to disable.")).addText(
            (text) => text.setValue(String(this.getSetting("autoArchiveDays", 0) || 0)).onChange(async (value) => {
              const parsed = Number.parseInt(value, 10);
              this.setSetting("autoArchiveDays", Number.isFinite(parsed) && parsed >= 0 ? parsed : 0);
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          this.addInheritButton(autoArchiveSetting, "autoArchiveDays");
          this.addScopeBadge(autoArchiveSetting, "autoArchiveDays");
          const dateSection = section(containerEl, t2("settings.section.dateDisplay"), t2("settings.section.dateDisplay.desc"));
          const dateFormatSetting = new Setting2(dateSection).setName(tx("settings.date_format.name", "Date format")).setDesc(tx("settings.date_format.desc", "Storage format for new due dates. Uses Moment.js patterns.")).addText(
            (text) => text.setPlaceholder("YYYY-MM-DD").setValue(this.getSetting("dateFormat", "YYYY-MM-DD") || "YYYY-MM-DD").onChange(async (value) => {
              this.setSetting("dateFormat", String(value || "").trim() || "YYYY-MM-DD");
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          this.addInheritButton(dateFormatSetting, "dateFormat");
          this.addScopeBadge(dateFormatSetting, "dateFormat");
          const dateDisplayFormatSetting = new Setting2(dateSection).setName(tx("settings.date_display_format.name", "Date display format")).setDesc(tx("settings.date_display_format.desc", "Optional display format. Leave empty to use Date format.")).addText(
            (text) => text.setPlaceholder("MMM D, YYYY").setValue(this.getSetting("dateDisplayFormat", "") || "").onChange(async (value) => {
              this.setSetting("dateDisplayFormat", String(value || "").trim(), { allowInherit: true });
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          this.addInheritButton(dateDisplayFormatSetting, "dateDisplayFormat");
          this.addScopeBadge(dateDisplayFormatSetting, "dateDisplayFormat");
          const relativeDateSetting = new Setting2(dateSection).setName(tx("settings.relative_due.name", "Show relative due labels")).setDesc(tx("settings.relative_due.desc", 'Show labels like "Due in 3d" instead of absolute dates.')).addToggle(
            (toggle) => toggle.setValue(this.getSetting("showRelativeDate", true) !== false).onChange(async (value) => {
              this.setSetting("showRelativeDate", !!value);
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          this.addInheritButton(relativeDateSetting, "showRelativeDate");
          this.addScopeBadge(relativeDateSetting, "showRelativeDate");
          const themeSection = section(containerEl, t2("settings.section.appearance"), t2("settings.section.appearance.desc"));
          const themePresetSetting = new Setting2(themeSection).setName(tx("settings.theme_preset.name", "Theme preset")).setDesc(tx("settings.theme_preset.desc", "Choose a color scheme as a starting point. You can override individual colors below.")).addDropdown((dropdown) => {
            const themeTarget2 = this.getThemeTarget();
            for (const [key, preset2] of Object.entries(THEME_PRESETS2)) {
              dropdown.addOption(key, preset2.name);
            }
            dropdown.setValue(themeTarget2 && themeTarget2.preset || "default");
            dropdown.onChange(async (value) => {
              themeTarget2.preset = value;
              themeTarget2.overrides = {};
              this.syncTheme();
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
              this.display();
            });
          });
          this.addScopeBadge(themePresetSetting, "theme");
          const fontFamilySetting = new Setting2(themeSection).setName(tx("settings.font_family.name", "Font family")).setDesc(tx("settings.font_family.desc", "Custom font stack for the board. Leave empty for default.")).addText(
            (text) => text.setPlaceholder("e.g. Inter, sans-serif").setValue((this.getThemeTarget().overrides || {}).fontFamily || "").onChange(async (value) => {
              const themeTarget2 = this.getThemeTarget();
              if (!themeTarget2.overrides) themeTarget2.overrides = {};
              themeTarget2.overrides.fontFamily = value.trim();
              this.syncTheme();
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            })
          );
          this.addScopeBadge(fontFamilySetting, "theme");
          const tagColorsSetting = new Setting2(themeSection).setName(tx("settings.tag_colors.name", "Tag colors")).setDesc(tx("settings.tag_colors.desc", "Define per-tag badge colors."));
          this.addScopeBadge(tagColorsSetting, "tagColors");
          this.renderColorMapEditor(themeSection, "tagColors", tx("settings.tag_colors.add", "Add tag color"), tx("settings.tag_colors.key_placeholder", "tag name"));
          const categoryColorsSetting = new Setting2(themeSection).setName(tx("settings.category_colors.name", "Category colors")).setDesc(tx("settings.category_colors.desc", "Define per-category badge colors."));
          this.addScopeBadge(categoryColorsSetting, "categoryColors");
          this.renderColorMapEditor(themeSection, "categoryColors", tx("settings.category_colors.add", "Add category color"), tx("settings.category_colors.key_placeholder", "category name"));
          const laneTintSetting = new Setting2(themeSection).setName(tx("settings.lane_tint.name", "Lane body tint strength")).setDesc(tx("settings.lane_tint.desc", "How much lane accent color appears in lane background. 0-40.")).addText(
            (text) => {
              var _a;
              return text.setPlaceholder("10").setValue(String((_a = (this.getThemeTarget().overrides || {}).laneTintStrength) != null ? _a : 10)).onChange(async (value) => {
                const parsed = Number.parseInt(value, 10);
                const themeTarget2 = this.getThemeTarget();
                if (!themeTarget2.overrides) themeTarget2.overrides = {};
                if (!Number.isFinite(parsed)) delete themeTarget2.overrides.laneTintStrength;
                else themeTarget2.overrides.laneTintStrength = Math.max(0, Math.min(40, parsed));
                this.syncTheme();
                await this.plugin.saveSettings();
                this.plugin.refreshViews();
              });
            }
          );
          this.addScopeBadge(laneTintSetting, "theme");
          const laneHeaderTintSetting = new Setting2(themeSection).setName(tx("settings.lane_header_tint.name", "Lane header tint strength")).setDesc(tx("settings.lane_header_tint.desc", "How much lane accent color appears in lane header chip. 0-60.")).addText(
            (text) => {
              var _a;
              return text.setPlaceholder("24").setValue(String((_a = (this.getThemeTarget().overrides || {}).laneHeaderTintStrength) != null ? _a : 24)).onChange(async (value) => {
                const parsed = Number.parseInt(value, 10);
                const themeTarget2 = this.getThemeTarget();
                if (!themeTarget2.overrides) themeTarget2.overrides = {};
                if (!Number.isFinite(parsed)) delete themeTarget2.overrides.laneHeaderTintStrength;
                else themeTarget2.overrides.laneHeaderTintStrength = Math.max(0, Math.min(60, parsed));
                this.syncTheme();
                await this.plugin.saveSettings();
                this.plugin.refreshViews();
              });
            }
          );
          this.addScopeBadge(laneHeaderTintSetting, "theme");
          const themeColorGroups = [
            {
              label: tx("settings.theme.group.card", "Card Colors"),
              fields: [
                { key: "cardBg", label: tx("settings.theme.cardBg", "Background") },
                { key: "cardText", label: tx("settings.theme.cardText", "Text") },
                { key: "cardBorder", label: tx("settings.theme.cardBorder", "Border") }
              ]
            },
            {
              label: tx("settings.theme.group.lane", "Lane Colors"),
              fields: [
                { key: "laneBg", label: tx("settings.theme.laneBg", "Base lane tint") },
                { key: "laneHeaderBg", label: tx("settings.theme.laneHeaderBg", "Base header tint") },
                { key: "laneHeaderText", label: tx("settings.theme.laneHeaderText", "Header text") },
                { key: "laneBorder", label: tx("settings.theme.laneBorder", "Lane border") }
              ]
            },
            {
              label: tx("settings.theme.group.priority", "Priority"),
              fields: [
                { key: "priorityUrgent", label: tx("settings.theme.priorityUrgent", "Urgent") },
                { key: "priorityHigh", label: tx("settings.theme.priorityHigh", "High") },
                { key: "priorityMedium", label: tx("settings.theme.priorityMedium", "Medium") },
                { key: "priorityLow", label: tx("settings.theme.priorityLow", "Low") }
              ]
            },
            {
              label: tx("settings.theme.group.tags", "Tags & Accent"),
              fields: [
                { key: "tagBg", label: tx("settings.theme.tagBg", "Tag background") },
                { key: "tagText", label: tx("settings.theme.tagText", "Tag text") },
                { key: "tagBorder", label: tx("settings.theme.tagBorder", "Tag border") },
                { key: "accentColor", label: tx("settings.theme.accentColor", "Accent") }
              ]
            },
            {
              label: tx("settings.theme.group.due", "Due Dates"),
              fields: [
                { key: "dueBadgeOverdue", label: tx("settings.theme.dueBadgeOverdue", "Overdue") },
                { key: "dueBadgeSoon", label: tx("settings.theme.dueBadgeSoon", "Due soon") }
              ]
            },
            {
              label: tx("settings.theme.group.board", "Board"),
              fields: [
                { key: "boardBg", label: tx("settings.theme.boardBg", "Board background") }
              ]
            }
          ];
          const eff = this.plugin.getEffectiveSettings(this.plugin.settings.activeBoardId || "");
          const themeTarget = this.getThemeTarget();
          const preset = THEME_PRESETS2[eff.theme && eff.theme.preset || "default"] || THEME_PRESETS2.default;
          const resolved = { ...preset, ...eff.theme && eff.theme.overrides || {} };
          const overrides = themeTarget.overrides || {};
          for (const group of themeColorGroups) {
            themeSection.createEl("h4", { text: group.label, cls: "sk-settings-color-group-title" });
            for (const field of group.fields) {
              const currentValue = resolved[field.key] || "#000000";
              const isOverridden = !!overrides[field.key];
              const setting = new Setting2(themeSection).setName(field.label);
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
            const setting = new Setting2(themeSection).setName(status).setDesc(tx("settings.per_lane_accent.desc", "Accent and header text color for this lane."));
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
          const advSection = section(containerEl, t2("settings.section.advanced"), t2("settings.section.advanced.desc"));
          new Setting2(advSection).setName(t2("settings.language.name")).setDesc(t2("settings.language.desc")).addDropdown((dropdown) => {
            for (const key of Object.keys(LOCALES2)) {
              dropdown.addOption(key, t2(`settings.language.${key}`));
            }
            dropdown.setValue(this.plugin.settings.language || "en");
            dropdown.onChange(async (value) => {
              this.plugin.settings.language = value;
              setLocale2(value);
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
              this.display();
            });
          });
          new Setting2(advSection).setName(tx("settings.refresh_debounce.name", "Refresh debounce")).setDesc(tx("settings.refresh_debounce.desc", "Milliseconds to wait after a file change before refreshing the board.")).addText(
            (text) => text.setValue(String(this.plugin.settings.refreshDebounceMs)).onChange(async (value) => {
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
              const row = new Setting2(container).setName(key);
              row.addText((text) => {
                text.setPlaceholder(keyPlaceholder).setValue(key).onChange(async (value) => {
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
            const addWrap = new Setting2(container).setName(addButtonLabel);
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
      return { SmartKanbanSettingTab: SmartKanbanSettingTab2 };
    };
  }
});

// src/main.js
var { Plugin, ItemView, Modal, TFile, TFolder, Notice, PluginSettingTab, Setting, setIcon, parseYaml } = require("obsidian");
var {
  VIEW_TYPE_SMART_KANBAN,
  SETTINGS_SCHEMA_VERSION,
  THEME_PRESETS,
  DEFAULT_BOARD_CONFIG,
  BOARD_CONFIG_KEYS,
  DEFAULT_SETTINGS
} = require_constants();
var { t, setLocale, LOCALES } = require_i18n();
var {
  normalizeDateInput,
  getDueInfo,
  parseTaskLine,
  updateTaskLineFields,
  parseWipLimits,
  sortCards,
  uniqueStrings,
  splitCsv
} = require_core_fallback();
var {
  extractNotePreview,
  isKanbanBoardFile,
  normalizeFmValue,
  collectTags,
  sanitizeFileName,
  buildFrontmatterBlock,
  buildTaskChecklistLine,
  parseInlineFieldMap,
  ensureFolderPath,
  createEnsureFile,
  init: initUtils
} = require_utils();
initUtils({ uniqueStrings });
var ensureFile = createEnsureFile(TFile);
var {
  BoardManagerModal,
  DragReorderListModal,
  SimpleFormModal,
  SimpleConfirmModal
} = require_modals()({ Modal, Notice, t });
var { SmartKanbanView } = require_view()({
  ItemView,
  TFile,
  Notice,
  setIcon,
  VIEW_TYPE_SMART_KANBAN,
  normalizeDateInput,
  splitCsv,
  t
});
var { SmartKanbanSettingTab } = require_settings_tab()({
  PluginSettingTab,
  Setting,
  Notice,
  DEFAULT_SETTINGS,
  BOARD_CONFIG_KEYS,
  THEME_PRESETS,
  t,
  LOCALES,
  setLocale
});
module.exports = class SmartKanbanPlugin extends Plugin {
  cloneValue(value) {
    if (Array.isArray(value)) return value.map((item) => this.cloneValue(item));
    if (!value || typeof value !== "object") return value;
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = this.cloneValue(v);
    return out;
  }
  ensureThemeShape(theme) {
    const input = theme && typeof theme === "object" ? theme : {};
    return {
      preset: String(input.preset || "default"),
      overrides: input.overrides && typeof input.overrides === "object" ? this.cloneValue(input.overrides) : {},
      laneColors: input.laneColors && typeof input.laneColors === "object" ? this.cloneValue(input.laneColors) : {}
    };
  }
  createDefaultBoardConfigSnapshot(source) {
    const src = source && typeof source === "object" ? source : {};
    const out = {};
    for (const key of BOARD_CONFIG_KEYS) {
      if (key === "theme") out[key] = this.ensureThemeShape(src[key] || DEFAULT_BOARD_CONFIG.theme);
      else if (Object.prototype.hasOwnProperty.call(src, key)) out[key] = this.cloneValue(src[key]);
      else out[key] = this.cloneValue(DEFAULT_BOARD_CONFIG[key]);
    }
    return out;
  }
  normalizeBoardRecord(board) {
    const src = board && typeof board === "object" ? board : {};
    const out = { ...src };
    out.id = String(src.id || "");
    out.name = String(src.name || "");
    out.type = src.type === "filtered-view" ? "filtered-view" : "independent";
    out.parentBoardId = src.parentBoardId || null;
    if (!Object.prototype.hasOwnProperty.call(out, "visibleStatuses")) out.visibleStatuses = null;
    if (!Object.prototype.hasOwnProperty.call(out, "defaultFilters")) out.defaultFilters = null;
    for (const key of BOARD_CONFIG_KEYS) {
      if (!Object.prototype.hasOwnProperty.call(out, key) || out[key] === void 0) {
        out[key] = null;
      }
    }
    return out;
  }
  migrateSettings(loaded) {
    const src = loaded && typeof loaded === "object" ? loaded : {};
    const migrated = { ...src };
    const hadSchema = Number.isFinite(src.settingsSchemaVersion);
    const hadDefaultBoardConfig = !!(src.defaultBoardConfig && typeof src.defaultBoardConfig === "object");
    const hadBoardsArray = Array.isArray(src.boards);
    if (!Array.isArray(migrated.boards)) migrated.boards = [];
    migrated.boards = migrated.boards.map((board) => this.normalizeBoardRecord(board)).filter((board) => board.id);
    if (!migrated.defaultBoardConfig || typeof migrated.defaultBoardConfig !== "object") {
      migrated.defaultBoardConfig = this.createDefaultBoardConfigSnapshot(src);
    } else {
      migrated.defaultBoardConfig = this.createDefaultBoardConfigSnapshot(migrated.defaultBoardConfig);
    }
    migrated.settingsSchemaVersion = SETTINGS_SCHEMA_VERSION;
    const didMigrate = !hadSchema || Number(src.settingsSchemaVersion) !== SETTINGS_SCHEMA_VERSION || !hadDefaultBoardConfig || !hadBoardsArray;
    return { migrated, didMigrate };
  }
  async onload() {
    await this.loadSettings();
    this.registerView(VIEW_TYPE_SMART_KANBAN, (leaf) => new SmartKanbanView(leaf, this));
    this.addRibbonIcon("kanban-square", "Open Smart Kanban", async () => {
      await this.activateView();
    });
    this.addCommand({
      id: "open-smart-kanban",
      name: "Open Smart Kanban",
      callback: async () => {
        await this.activateView();
      }
    });
    this.addCommand({
      id: "refresh-smart-kanban",
      name: "Refresh Smart Kanban",
      callback: async () => {
        this.refreshViews();
      }
    });
    this.addCommand({
      id: "smart-kanban-self-check",
      name: "Smart Kanban: Self-check",
      callback: async () => {
        const cards = await this.collectCards();
        new Notice(t("main.self_check_ok", { count: cards.length }));
      }
    });
    this.addCommand({
      id: "open-specific-board",
      name: "Open Specific Board",
      callback: async () => {
        const boards = this.settings.boards || [];
        if (boards.length === 0) {
          new Notice(t("main.no_custom_boards"));
          await this.activateView();
          return;
        }
        const values = await this.openFormModal({
          title: t("main.select_board.title"),
          submitText: t("main.select_board.submit"),
          fields: [
            {
              key: "board",
              label: t("main.select_board.label"),
              value: "",
              type: "select",
              options: ["", ...boards.map((b) => b.id)],
              optionLabels: { "": t("view.board.default"), ...Object.fromEntries(boards.map((b) => [b.id, b.name])) }
            }
          ]
        });
        if (!values) return;
        const boardId = values.board || "";
        this.settings.activeBoardId = boardId;
        await this.saveSettings();
        await this.activateView();
      }
    });
    this.addSettingTab(new SmartKanbanSettingTab(this.app, this));
    const onChange = () => this.scheduleRefresh();
    this.registerEvent(this.app.vault.on("modify", onChange));
    this.registerEvent(this.app.vault.on("create", onChange));
    this.registerEvent(this.app.vault.on("delete", onChange));
    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file) => {
        if (file instanceof TFolder) {
          menu.addItem((item) => {
            item.setTitle(t("main.file_menu.open_as_board")).setIcon("kanban-square").onClick(async () => {
              this.settings.sourceFolder = file.path;
              await this.saveSettings();
              await this.activateView();
              new Notice(t("main.source_folder_set", { path: file.path }));
            });
          });
        }
        if (file instanceof TFile && file.extension === "md") {
          menu.addItem((item) => {
            item.setTitle(t("main.file_menu.show_in_kanban")).setIcon("kanban-square").onClick(async () => {
              const folder = file.parent ? file.parent.path : "";
              if (folder && folder !== this.settings.sourceFolder) {
                this.settings.sourceFolder = folder;
                await this.saveSettings();
              }
              await this.activateView();
            });
          });
        }
      })
    );
  }
  onunload() {
    if (this.refreshTimer) {
      window.clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
    this.app.workspace.getLeavesOfType(VIEW_TYPE_SMART_KANBAN).forEach((leaf) => leaf.detach());
  }
  createEmptyFilters() {
    return { categories: [], priorities: [], tags: [], text: "" };
  }
  cloneFilters(input) {
    const source = input || this.createEmptyFilters();
    return {
      categories: Array.isArray(source.categories) ? source.categories.map((x) => String(x).trim()).filter(Boolean) : [],
      priorities: Array.isArray(source.priorities) ? source.priorities.map((x) => String(x).trim()).filter(Boolean) : [],
      tags: Array.isArray(source.tags) ? source.tags.map((x) => String(x).trim()).filter(Boolean) : [],
      text: String(source.text || "").toLowerCase()
    };
  }
  getFilterPresetStore(boardId = "", createIfMissing = false) {
    if (boardId) {
      const board = this.getBoard(boardId);
      if (!board) return this.settings.filterPresets || {};
      if (createIfMissing && (!board.filterPresets || typeof board.filterPresets !== "object")) {
        board.filterPresets = {};
      }
      return board.filterPresets || {};
    }
    if (createIfMissing && (!this.settings.filterPresets || typeof this.settings.filterPresets !== "object")) {
      this.settings.filterPresets = {};
    }
    return this.settings.filterPresets || {};
  }
  getFilterPresetNames(boardId = "") {
    return Object.keys(this.getFilterPresetStore(boardId, false));
  }
  getFilterPreset(name, boardId = "") {
    const preset = this.getFilterPresetStore(boardId, false)[name];
    return preset ? this.cloneFilters(preset) : null;
  }
  async saveFilterPreset(name, filters, boardId = "") {
    const store = this.getFilterPresetStore(boardId, true);
    store[name] = this.cloneFilters(filters);
    await this.saveSettings();
  }
  async deleteFilterPreset(name, boardId = "") {
    const store = this.getFilterPresetStore(boardId, false);
    if (!store || typeof store !== "object") return;
    delete store[name];
    await this.saveSettings();
  }
  getStatusOrder(boardId = "") {
    const eff = this.getEffectiveSettings(boardId || "");
    const list = String(eff.statusOrder || "").split(",").map((x) => x.trim()).filter(Boolean);
    return list.length ? list : [this.getDefaultStatus(eff)];
  }
  getDefaultStatus(boardIdOrEff = "") {
    const eff = typeof boardIdOrEff === "object" && boardIdOrEff !== null ? boardIdOrEff : this.getEffectiveSettings(boardIdOrEff || "");
    const first = String(eff.statusOrder || "").split(",").map((x) => x.trim()).find(Boolean);
    return first || "Todo";
  }
  getCustomFieldKeys(boardId = "") {
    const eff = this.getEffectiveSettings(boardId || "");
    return String(eff.customFields || "").split(",").map((x) => x.trim()).filter(Boolean);
  }
  getDiscoveredFrontmatterKeys(boardId = "") {
    const files = this.app && this.app.vault && typeof this.app.vault.getMarkdownFiles === "function" ? this.app.vault.getMarkdownFiles() : [];
    const eff = this.getEffectiveSettings(boardId || "");
    const keys = /* @__PURE__ */ new Set();
    for (const file of this.filterFilesByFolderWithSettings(files, eff)) {
      const cache = this.app.metadataCache.getFileCache(file);
      const fm = cache && cache.frontmatter;
      if (!fm || typeof fm !== "object") continue;
      for (const rawKey of Object.keys(fm)) {
        const key = String(rawKey || "").trim();
        if (!key || key === "position") continue;
        keys.add(key);
      }
    }
    return [...keys].sort((a, b) => a.localeCompare(b));
  }
  getCardMetaEntries(card, boardIdOrEff = "") {
    const eff = typeof boardIdOrEff === "object" && boardIdOrEff !== null ? boardIdOrEff : this.getEffectiveSettings(boardIdOrEff || "");
    const entries = [
      ["Category", card.category || ""],
      ["Priority", card.priority || ""]
    ];
    if (card.dueDate) {
      entries.push(["Due", card.dueDate]);
    }
    const custom = card.customFields || {};
    const reserved = /* @__PURE__ */ new Set([
      String(eff.statusField || "").toLowerCase(),
      String(eff.categoryField || "").toLowerCase(),
      String(eff.priorityField || "").toLowerCase(),
      String(eff.tagsField || "").toLowerCase(),
      String(eff.dueDateField || "").toLowerCase()
    ]);
    const customFieldKeys = String(eff.customFields || "").split(",").map((x) => x.trim()).filter(Boolean);
    for (const key of customFieldKeys) {
      if (reserved.has(key.toLowerCase())) continue;
      entries.push([key, normalizeFmValue(custom[key])]);
    }
    return entries;
  }
  collectStatusesFromCards(cards, boardId = "") {
    const out = [...this.getStatusOrder(boardId)];
    const defaultStatus = this.getDefaultStatus(boardId);
    for (const status of new Set((cards || []).map((c) => c.status || defaultStatus))) {
      if (!out.includes(status)) out.push(status);
    }
    return out;
  }
  getPriorityOrderMap(boardId = "") {
    const eff = this.getEffectiveSettings(boardId || "");
    const map = /* @__PURE__ */ new Map();
    String(eff.priorityOrder || "").split(",").map((x) => x.trim()).filter(Boolean).forEach((value, index) => map.set(value.toLowerCase(), index));
    return map;
  }
  sortCards(cards, boardId = "") {
    const eff = this.getEffectiveSettings(boardId || "");
    return sortCards(cards, eff.sortBy || "none", eff.sortDirection || "asc", this.getPriorityOrderMap(boardId), eff.cardOrder);
  }
  getWipLimit(status, boardId = "") {
    const eff = this.getEffectiveSettings(boardId || "");
    const limits = parseWipLimits(eff.wipLimits);
    return limits.get(String(status || "").toLowerCase()) || 0;
  }
  getResolvedTheme(boardId = "") {
    const eff = this.getEffectiveSettings(boardId || "");
    const theme = eff.theme && typeof eff.theme === "object" ? eff.theme : {};
    const presetName = theme.preset || "default";
    const preset = THEME_PRESETS[presetName] || THEME_PRESETS.default;
    const overrides = theme.overrides || {};
    const resolved = { ...preset };
    for (const [key, value] of Object.entries(overrides)) {
      if (value !== void 0 && value !== null && value !== "") resolved[key] = value;
    }
    return resolved;
  }
  getBoard(boardId) {
    if (!boardId) return null;
    return (this.settings.boards || []).find((b) => b.id === boardId) || null;
  }
  getEffectiveSettings(boardId, visited = /* @__PURE__ */ new Set()) {
    const base = {
      ...this.createDefaultBoardConfigSnapshot(this.settings.defaultBoardConfig),
      ...this.settings
    };
    const board = this.getBoard(boardId);
    if (!board) return base;
    if (board.type === "filtered-view" && board.parentBoardId) {
      if (visited.has(board.id)) {
        new Notice(t("main.board_parent_cycle", { name: board.name || board.id }));
        return base;
      }
      const nextVisited = new Set(visited);
      nextVisited.add(board.id);
      const parentEff = this.getEffectiveSettings(board.parentBoardId, nextVisited);
      const merged = { ...parentEff };
      for (const key of Object.keys(board)) {
        if (key === "id" || key === "name" || key === "type" || key === "parentBoardId") continue;
        if (board[key] != null && board[key] !== "") merged[key] = board[key];
      }
      return merged;
    }
    const eff = { ...base };
    for (const key of Object.keys(board)) {
      if (key === "id" || key === "name" || key === "type") continue;
      if (board[key] != null && board[key] !== "") eff[key] = board[key];
    }
    return eff;
  }
  getResolvedLaneColor(status, boardId = "") {
    const eff = this.getEffectiveSettings(boardId || "");
    const theme = eff.theme && typeof eff.theme === "object" ? eff.theme : {};
    const userLane = theme.laneColors && theme.laneColors[status];
    if (userLane && (userLane.bg || userLane.text)) return userLane;
    const presetName = theme.preset || "default";
    const preset = THEME_PRESETS[presetName] || THEME_PRESETS.default;
    if (preset.defaultLaneColors && preset.defaultLaneColors[status]) return preset.defaultLaneColors[status];
    const resolved = this.getResolvedTheme(boardId);
    return { bg: resolved.laneHeaderBg || "", text: resolved.laneHeaderText || "" };
  }
  scheduleRefresh() {
    if (this.refreshTimer) window.clearTimeout(this.refreshTimer);
    const delay = Number.isFinite(this.settings.refreshDebounceMs) ? this.settings.refreshDebounceMs : 250;
    this.refreshTimer = window.setTimeout(() => {
      this.refreshTimer = null;
      this.refreshViews();
    }, Math.max(0, delay));
  }
  async activateView() {
    const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE_SMART_KANBAN);
    for (const leaf2 of leaves) leaf2.detach();
    const leaf = this.app.workspace.getLeaf(true);
    await leaf.setViewState({ type: VIEW_TYPE_SMART_KANBAN, active: true });
    this.app.workspace.revealLeaf(leaf);
  }
  async loadSettings() {
    const loaded = await this.loadData();
    const { migrated, didMigrate } = this.migrateSettings(loaded || {});
    this.settings = Object.assign({}, DEFAULT_SETTINGS, migrated || {});
    this.settings.defaultBoardConfig = this.createDefaultBoardConfigSnapshot(this.settings.defaultBoardConfig);
    this.settings.filterPresets = this.settings.filterPresets || {};
    this.settings.theme = this.ensureThemeShape(this.settings.theme);
    setLocale(this.settings.language || "en");
    if (didMigrate) await this.saveData(this.settings);
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  async openFormModal(options) {
    return await new Promise((resolve) => {
      const modal = new SimpleFormModal(this.app, {
        ...options,
        onSubmit: (values) => resolve(values),
        onCancel: () => resolve(null)
      });
      modal.open();
    });
  }
  async openBoardManager() {
    return await new Promise((resolve) => {
      const modal = new BoardManagerModal(this.app, this, {
        onClose: () => resolve()
      });
      modal.open();
    });
  }
  async openDragReorderModal(options) {
    return await new Promise((resolve) => {
      const modal = new DragReorderListModal(this.app, {
        ...options,
        onSubmit: (result) => resolve(result),
        onCancel: () => resolve(null)
      });
      modal.open();
    });
  }
  async openConfirmModal(options) {
    return await new Promise((resolve) => {
      const modal = new SimpleConfirmModal(this.app, {
        ...options,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false)
      });
      modal.open();
    });
  }
  refreshViews() {
    for (const leaf of this.app.workspace.getLeavesOfType(VIEW_TYPE_SMART_KANBAN)) {
      if (leaf.view && typeof leaf.view.reload === "function") leaf.view.reload();
    }
  }
  async createTaskEntry(title, fields, boardId = "") {
    const eff = this.getEffectiveSettings(boardId || "");
    if (eff.sourceMode === "tasks") {
      await this.createTaskLine(title, fields, eff);
      return;
    }
    const file = await this.createTaskNote(title, fields, eff);
    if (file) {
      await this.app.workspace.getLeaf(true).openFile(file);
      new Notice(t("main.task_note_created", { name: file.basename }));
    }
  }
  async createTaskNote(title, fields, eff = this.settings) {
    const folderPath = String(eff.sourceFolder || "").trim();
    if (!folderPath) {
      new Notice(t("main.source_folder_empty"));
      return null;
    }
    await ensureFolderPath(this.app, folderPath);
    const safeBase = sanitizeFileName(title) || "task";
    const filePath = await this.buildUniqueTaskPath(folderPath, safeBase);
    const preparedFields = this.prepareFieldsForWrite(fields, eff);
    const templatePath = String(eff.noteTemplate || "").trim();
    if (!templatePath) {
      const frontmatter = buildFrontmatterBlock(preparedFields);
      return await this.app.vault.create(filePath, `${frontmatter}
# ${title}
`);
    }
    const templateFile = this.app.vault.getAbstractFileByPath(templatePath);
    if (!(templateFile instanceof TFile)) {
      new Notice(t("main.template_missing", { path: templatePath }));
      const frontmatter = buildFrontmatterBlock(preparedFields);
      return await this.app.vault.create(filePath, `${frontmatter}
# ${title}
`);
    }
    const templateContent = await this.app.vault.cachedRead(templateFile);
    const rendered = this.renderTaskNoteFromTemplate(templateContent, title, preparedFields, eff);
    return await this.app.vault.create(filePath, rendered);
  }
  async createTaskLine(title, fields, eff = this.settings) {
    const inboxFile = String(eff.taskInboxFile || "").trim();
    if (!inboxFile) {
      new Notice(t("main.task_inbox_empty"));
      return;
    }
    const file = await ensureFile(this.app, inboxFile, "# Todo Tasks\n\n");
    const preparedFields = this.prepareFieldsForWrite(fields, eff);
    const line = buildTaskChecklistLine(title, {
      statusField: eff.statusField,
      categoryField: eff.categoryField,
      priorityField: eff.priorityField,
      tagsField: eff.tagsField,
      dueDateField: eff.dueDateField,
      fields: preparedFields
    });
    const current = await this.app.vault.read(file);
    const prefix = current.endsWith("\n") ? "" : "\n";
    await this.app.vault.modify(file, `${current}${prefix}${line}
`);
    await this.app.workspace.getLeaf(true).openFile(file);
    new Notice(t("main.task_line_created"));
  }
  prepareFieldsForWrite(fields, eff = this.settings) {
    const out = { ...fields || {} };
    const dueField = String(eff.dueDateField || "Due Date");
    const dueValue = normalizeDateInput(out[dueField]);
    if (dueValue) {
      out[dueField] = this.formatDateForStorage(dueValue, eff);
    }
    return out;
  }
  formatDateForStorage(isoDate, eff = this.settings) {
    const normalized = normalizeDateInput(isoDate);
    if (!normalized) return "";
    const format = String(eff.dateFormat || "YYYY-MM-DD").trim();
    if (!format || format === "YYYY-MM-DD") return normalized;
    const momentRef = typeof window !== "undefined" && window.moment || typeof globalThis !== "undefined" && globalThis.moment;
    if (typeof momentRef === "function") {
      const m = momentRef(normalized, "YYYY-MM-DD", true);
      if (m && typeof m.isValid === "function" && m.isValid()) return m.format(format);
    }
    return normalized;
  }
  parseDateByFormat(rawDate, eff = this.settings) {
    const raw = String(rawDate || "").trim();
    if (!raw) return "";
    const normalized = normalizeDateInput(raw);
    if (normalized) return normalized;
    const format = String(eff.dateFormat || "YYYY-MM-DD").trim();
    const momentRef = typeof window !== "undefined" && window.moment || typeof globalThis !== "undefined" && globalThis.moment;
    if (typeof momentRef === "function" && format) {
      const m = momentRef(raw, format, true);
      if (m && typeof m.isValid === "function" && m.isValid()) return m.format("YYYY-MM-DD");
    }
    return "";
  }
  renderTaskNoteFromTemplate(templateContent, title, fields, eff = this.settings) {
    const todayIso = normalizeDateInput((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
    const dateToken = this.formatDateForStorage(todayIso, eff) || todayIso;
    const withTokens = String(templateContent || "").replace(/\r\n/g, "\n").replaceAll("{{title}}", title).replaceAll("{{date}}", dateToken);
    const { frontmatter, body } = this.extractFrontmatterAndBody(withTokens);
    const merged = { ...frontmatter, ...fields || {} };
    const mergedFrontmatter = buildFrontmatterBlock(merged);
    const cleanedBody = String(body || "").replace(/^\n+/, "");
    return `${mergedFrontmatter}
${cleanedBody || `# ${title}
`}`;
  }
  extractFrontmatterAndBody(content) {
    const text = String(content || "").replace(/\r\n/g, "\n");
    if (!text.startsWith("---\n")) {
      return { frontmatter: {}, body: text };
    }
    const match = text.match(/^---\n([\s\S]*?)\n---\n?/);
    if (!match) return { frontmatter: {}, body: text };
    const frontmatterText = match[1];
    const body = text.slice(match[0].length);
    let frontmatter = {};
    if (typeof parseYaml === "function") {
      try {
        const parsed = parseYaml(frontmatterText);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          frontmatter = parsed;
        }
      } catch (_e) {
        frontmatter = {};
      }
    }
    return { frontmatter, body };
  }
  async buildUniqueTaskPath(folderPath, baseName) {
    const normalized = folderPath.replace(/\/$/, "");
    for (let i = 0; i < 9999; i += 1) {
      const suffix = i === 0 ? "" : ` ${i + 1}`;
      const candidate = `${normalized}/${baseName}${suffix}.md`;
      if (!this.app.vault.getAbstractFileByPath(candidate)) return candidate;
    }
    throw new Error("Could not allocate unique file name.");
  }
  async collectCards(boardId) {
    const eff = this.getEffectiveSettings(boardId || "");
    return eff.sourceMode === "tasks" ? await this.collectTaskCardsWithSettings(eff) : await this.collectNoteCardsWithSettings(eff);
  }
  filterFilesByFolderWithSettings(allFiles, eff) {
    const folderPath = eff.sourceFolder;
    const includeSubfolders = eff.includeSubfolders;
    const folderPrefix = folderPath.replace(/\/$/, "") + "/";
    return allFiles.filter((file) => {
      if (!folderPath) return true;
      if (file.path === folderPath) return true;
      if (includeSubfolders) return file.path.startsWith(folderPrefix);
      return file.parent && file.parent.path === folderPath;
    });
  }
  async collectNoteCardsWithSettings(eff) {
    const cards = [];
    const defaultStatus = this.getDefaultStatus(eff);
    const customFieldKeys = String(eff.customFields || "").split(",").map((x) => x.trim()).filter(Boolean);
    for (const file of this.filterFilesByFolderWithSettings(this.app.vault.getMarkdownFiles(), eff)) {
      const cache = this.app.metadataCache.getFileCache(file);
      const fm = cache && cache.frontmatter || {};
      if (isKanbanBoardFile(fm)) continue;
      const dueDate = this.parseDateByFormat(fm[eff.dueDateField], eff);
      const dueInfo = getDueInfo(dueDate, eff.dueSoonDays, void 0, {
        showRelativeDate: eff.showRelativeDate,
        dateDisplayFormat: eff.dateDisplayFormat,
        dateFormat: eff.dateFormat,
        t
      });
      const customFields = {};
      for (const key of customFieldKeys) {
        customFields[key] = normalizeFmValue(fm[key]);
      }
      let preview = "";
      try {
        const content = await this.app.vault.cachedRead(file);
        preview = extractNotePreview(content);
      } catch (_) {
      }
      cards.push({
        id: file.path,
        kind: "note",
        path: file.path,
        title: file.basename,
        status: normalizeFmValue(fm[eff.statusField]) || defaultStatus,
        category: normalizeFmValue(fm[eff.categoryField]),
        priority: normalizeFmValue(fm[eff.priorityField]),
        tags: collectTags(fm, cache, eff.tagsField),
        customFields,
        dueDate,
        dueTs: dueInfo ? dueInfo.sortValue : null,
        dueInfo,
        preview
      });
    }
    return cards;
  }
  async collectTaskCardsWithSettings(eff) {
    const cards = [];
    const defaultStatus = this.getDefaultStatus(eff);
    const statuses = String(eff.statusOrder || "").split(",").map((x) => x.trim()).filter(Boolean);
    if (!statuses.length) statuses.push(defaultStatus);
    const customFieldKeys = String(eff.customFields || "").split(",").map((x) => x.trim()).filter(Boolean);
    for (const file of this.filterFilesByFolderWithSettings(this.app.vault.getMarkdownFiles(), eff)) {
      const cache = this.app.metadataCache.getFileCache(file);
      const fm = cache && cache.frontmatter || {};
      if (isKanbanBoardFile(fm)) continue;
      const content = await this.app.vault.cachedRead(file);
      const lines = content.split(/\r?\n/);
      for (let idx = 0; idx < lines.length; idx += 1) {
        const inlineMap = parseInlineFieldMap(lines[idx]);
        const parsed = parseTaskLine(lines[idx], {
          statusField: eff.statusField,
          categoryField: eff.categoryField,
          priorityField: eff.priorityField,
          tagsField: eff.tagsField,
          dueDateField: eff.dueDateField,
          statusOrder: statuses,
          defaultStatus
        });
        if (!parsed) continue;
        const taskDueDate = parsed.dueDate || this.parseDateByFormat(inlineMap.get(String(eff.dueDateField || "Due Date").toLowerCase()) || "", eff);
        const dueInfo = getDueInfo(taskDueDate, eff.dueSoonDays, void 0, {
          showRelativeDate: eff.showRelativeDate,
          dateDisplayFormat: eff.dateDisplayFormat,
          dateFormat: eff.dateFormat,
          t
        });
        const customFields = {};
        for (const key of customFieldKeys) {
          customFields[key] = normalizeFmValue(inlineMap.get(key.toLowerCase()) || "");
        }
        cards.push({
          id: `${file.path}::${idx + 1}`,
          kind: "task",
          path: file.path,
          lineNumber: idx + 1,
          title: parsed.title,
          status: parsed.status || defaultStatus,
          category: parsed.category || "",
          priority: parsed.priority || "",
          tags: parsed.tags || [],
          customFields,
          dueDate: taskDueDate || "",
          dueTs: dueInfo ? dueInfo.sortValue : null,
          dueInfo
        });
      }
    }
    return cards;
  }
  async updateCardStatus(card, nextStatus, boardId = "") {
    const eff = this.getEffectiveSettings(boardId || "");
    const defaultStatus = this.getDefaultStatus(eff);
    await this.updateCardFields(card, {
      [eff.statusField]: String(nextStatus || "").trim() || defaultStatus
    }, boardId);
  }
  async saveCardOrder(cardId, sortValue, boardId = "") {
    const target = boardId ? this.getBoard(boardId) : this.settings;
    if (!target) return;
    if (!target.cardOrder || typeof target.cardOrder !== "object") target.cardOrder = {};
    target.cardOrder[cardId] = sortValue;
    await this.saveSettings();
  }
  async deleteTaskLine(card) {
    const file = this.app.vault.getAbstractFileByPath(card.path);
    if (!(file instanceof TFile)) {
      new Notice(t("main.file_not_found", { path: card.path }));
      return;
    }
    const content = await this.app.vault.read(file);
    const lines = content.split(/\r?\n/);
    const index = Number(card.lineNumber) - 1;
    if (index < 0 || index >= lines.length) {
      new Notice(t("main.task_line_not_found", { path: card.path, line: card.lineNumber }));
      return;
    }
    lines.splice(index, 1);
    await this.app.vault.modify(file, lines.join("\n"));
  }
  async deleteNoteCard(card) {
    const file = this.app.vault.getAbstractFileByPath(card.path);
    if (!(file instanceof TFile)) {
      new Notice(t("main.file_not_found", { path: card.path }));
      return;
    }
    await this.app.vault.trash(file, true);
  }
  async updateCardTitle(card, newTitle) {
    if (!card || !newTitle) return;
    if (card.kind === "task") {
      await this.updateTaskCardTitle(card, newTitle);
    } else {
      await this.renameNoteCard(card, newTitle);
    }
  }
  async renameNoteCard(card, newTitle) {
    const file = this.app.vault.getAbstractFileByPath(card.path);
    if (!(file instanceof TFile)) {
      new Notice(t("main.file_not_found", { path: card.path }));
      return;
    }
    const folder = file.parent ? file.parent.path : "";
    const safeName = sanitizeFileName(newTitle) || "task";
    const newPath = folder ? `${folder}/${safeName}.md` : `${safeName}.md`;
    try {
      await this.app.fileManager.renameFile(file, newPath);
    } catch (err) {
      new Notice(t("main.rename_failed", { error: err.message || err }));
    }
  }
  async updateTaskCardTitle(card, newTitle) {
    const file = this.app.vault.getAbstractFileByPath(card.path);
    if (!(file instanceof TFile)) {
      new Notice(t("main.file_not_found", { path: card.path }));
      return;
    }
    const content = await this.app.vault.read(file);
    const lines = content.split(/\r?\n/);
    const index = Number(card.lineNumber) - 1;
    if (index < 0 || index >= lines.length) {
      new Notice(t("main.task_line_not_found", { path: card.path, line: card.lineNumber }));
      return;
    }
    const line = lines[index];
    const match = line.match(/^(\s*-\s*\[[ xX]\]\s+)/);
    if (!match) return;
    const prefix = match[1];
    const rest = line.slice(prefix.length);
    const fields = rest.match(/(\s*\[[^\]]+\])/g) || [];
    lines[index] = `${prefix}${newTitle}${fields.join("")}`;
    await this.app.vault.modify(file, lines.join("\n"));
  }
  async updateCardFields(card, updates, boardId = "") {
    if (!card) return;
    const eff = this.getEffectiveSettings(boardId || "");
    if (card.kind === "task") {
      await this.updateTaskCardFields(card, updates, eff);
      return;
    }
    await this.updateNoteCardFields(card, updates, eff);
  }
  async updateNoteCardFields(card, updates, _eff = this.settings) {
    const file = this.app.vault.getAbstractFileByPath(card.path);
    if (!(file instanceof TFile)) {
      new Notice(t("main.file_not_found", { path: card.path }));
      return;
    }
    await this.app.fileManager.processFrontMatter(file, (fm) => {
      for (const [key, value] of Object.entries(updates || {})) {
        if (Array.isArray(value)) {
          if (value.length) fm[key] = value;
          else delete fm[key];
          continue;
        }
        const text = normalizeFmValue(value);
        if (!text) delete fm[key];
        else fm[key] = text;
      }
    });
  }
  async updateTaskCardFields(card, updates, _eff = this.settings) {
    const file = this.app.vault.getAbstractFileByPath(card.path);
    if (!(file instanceof TFile)) {
      new Notice(t("main.file_not_found", { path: card.path }));
      return;
    }
    const content = await this.app.vault.read(file);
    const lines = content.split(/\r?\n/);
    const index = Number(card.lineNumber) - 1;
    if (index < 0 || index >= lines.length) {
      new Notice(t("main.task_line_not_found", { path: card.path, line: card.lineNumber }));
      return;
    }
    const normalizedUpdates = {};
    for (const [key, value] of Object.entries(updates || {})) {
      if (Array.isArray(value)) normalizedUpdates[key] = value.join(", ");
      else normalizedUpdates[key] = normalizeFmValue(value);
    }
    lines[index] = updateTaskLineFields(lines[index], normalizedUpdates);
    await this.app.vault.modify(file, lines.join("\n"));
  }
};

const VIEW_TYPE_SMART_KANBAN = "smart-kanban-view";
const SETTINGS_SCHEMA_VERSION = 1;

const THEME_PRESETS = {
  default: {
    name: "Default",
    cardBg: "", cardText: "", cardBorder: "",
    laneBg: "", laneHeaderBg: "", laneHeaderText: "", laneBorder: "",
    boardBg: "",
    tagBg: "", tagText: "", tagBorder: "",
    accentColor: "",
    priorityUrgent: "#e03131", priorityHigh: "#e8590c", priorityMedium: "#f08c00", priorityLow: "#2b8a3e",
    dueBadgeOverdue: "#e03131", dueBadgeSoon: "#e8590c",
    fontFamily: "",
    defaultLaneColors: {}
  },
  ocean: {
    name: "Ocean",
    cardBg: "#e7f5ff", cardText: "#1c3d5a", cardBorder: "#a5d8ff",
    laneBg: "#d0ebff", laneHeaderBg: "#1971c2", laneHeaderText: "#ffffff", laneBorder: "#74c0fc",
    boardBg: "#e7f5ff",
    tagBg: "#a5d8ff", tagText: "#1864ab", tagBorder: "#74c0fc",
    accentColor: "#1971c2",
    priorityUrgent: "#c92a2a", priorityHigh: "#d9480f", priorityMedium: "#e8590c", priorityLow: "#2b8a3e",
    dueBadgeOverdue: "#c92a2a", dueBadgeSoon: "#e8590c",
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
    cardBg: "#ebfbee", cardText: "#1b4332", cardBorder: "#b2f2bb",
    laneBg: "#d3f9d8", laneHeaderBg: "#2b8a3e", laneHeaderText: "#ffffff", laneBorder: "#8ce99a",
    boardBg: "#ebfbee",
    tagBg: "#b2f2bb", tagText: "#1b4332", tagBorder: "#8ce99a",
    accentColor: "#2b8a3e",
    priorityUrgent: "#c92a2a", priorityHigh: "#e8590c", priorityMedium: "#f08c00", priorityLow: "#37b24d",
    dueBadgeOverdue: "#c92a2a", dueBadgeSoon: "#e8590c",
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
    cardBg: "#fff9db", cardText: "#5c3d0e", cardBorder: "#ffe066",
    laneBg: "#fff3bf", laneHeaderBg: "#e8590c", laneHeaderText: "#ffffff", laneBorder: "#ffd43b",
    boardBg: "#fff9db",
    tagBg: "#ffe066", tagText: "#5c3d0e", tagBorder: "#ffd43b",
    accentColor: "#e8590c",
    priorityUrgent: "#c92a2a", priorityHigh: "#d9480f", priorityMedium: "#f08c00", priorityLow: "#5c940d",
    dueBadgeOverdue: "#c92a2a", dueBadgeSoon: "#e8590c",
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
    cardBg: "#1a1b2e", cardText: "#c1c2d3", cardBorder: "#2d2e4a",
    laneBg: "#141524", laneHeaderBg: "#3b3d8c", laneHeaderText: "#e0e0ff", laneBorder: "#2d2e4a",
    boardBg: "#0f1020",
    tagBg: "#2d2e4a", tagText: "#a5a6ff", tagBorder: "#3b3d8c",
    accentColor: "#5c5ce0",
    priorityUrgent: "#ff6b6b", priorityHigh: "#ff922b", priorityMedium: "#ffd43b", priorityLow: "#69db7c",
    dueBadgeOverdue: "#ff6b6b", dueBadgeSoon: "#ff922b",
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
    cardBg: "#fafafa", cardText: "#343a40", cardBorder: "#dee2e6",
    laneBg: "#f1f3f5", laneHeaderBg: "#868e96", laneHeaderText: "#ffffff", laneBorder: "#ced4da",
    boardBg: "#f8f9fa",
    tagBg: "#e9ecef", tagText: "#495057", tagBorder: "#ced4da",
    accentColor: "#495057",
    priorityUrgent: "#c92a2a", priorityHigh: "#d9480f", priorityMedium: "#e8590c", priorityLow: "#5c940d",
    dueBadgeOverdue: "#c92a2a", dueBadgeSoon: "#e8590c",
    fontFamily: "",
    defaultLaneColors: {}
  },
  candy: {
    name: "Candy",
    cardBg: "#fff0f6", cardText: "#6b1d3a", cardBorder: "#fcc2d7",
    laneBg: "#ffe3ec", laneHeaderBg: "#c2255c", laneHeaderText: "#ffffff", laneBorder: "#f783ac",
    boardBg: "#fff0f6",
    tagBg: "#fcc2d7", tagText: "#a61e4d", tagBorder: "#f783ac",
    accentColor: "#c2255c",
    priorityUrgent: "#e03131", priorityHigh: "#d9480f", priorityMedium: "#f08c00", priorityLow: "#37b24d",
    dueBadgeOverdue: "#e03131", dueBadgeSoon: "#e8590c",
    fontFamily: "",
    defaultLaneColors: {
      "Backlog": { bg: "#a61e4d", text: "#ffffff" },
      "Todo": { bg: "#c2255c", text: "#ffffff" },
      "In Progress": { bg: "#d6336c", text: "#ffffff" },
      "Done": { bg: "#e64980", text: "#ffffff" }
    }
  },
};

const DEFAULT_BOARD_CONFIG = {
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
  cardOrder: {},
};

const BOARD_CONFIG_KEYS = Object.freeze(Object.keys(DEFAULT_BOARD_CONFIG));

const DEFAULT_SETTINGS = {
  settingsSchemaVersion: SETTINGS_SCHEMA_VERSION,
  defaultBoardConfig: { ...DEFAULT_BOARD_CONFIG },
  ...DEFAULT_BOARD_CONFIG,
  refreshDebounceMs: 250,
  filterPresets: {},
  boards: [],
  activeBoardId: "",
  language: "en",
};

module.exports = {
  VIEW_TYPE_SMART_KANBAN,
  SETTINGS_SCHEMA_VERSION,
  THEME_PRESETS,
  DEFAULT_BOARD_CONFIG,
  BOARD_CONFIG_KEYS,
  DEFAULT_SETTINGS,
};

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
  warm: {
    name: "Warm Board",
    cardBg: "#ffffff", cardText: "#37352f", cardBorder: "#e7e4e1",
    laneBg: "#f7f6f3", laneHeaderBg: "#ece9e5", laneHeaderText: "#5f5a52", laneBorder: "#e9e6e2",
    boardBg: "#f5f4f1",
    tagBg: "#ebe9e6", tagText: "#6f6a64", tagBorder: "#ddd8d2",
    accentColor: "#2f80ed",
    priorityUrgent: "#e03e3e", priorityHigh: "#d9730d", priorityMedium: "#dfab01", priorityLow: "#0f7b6c",
    dueBadgeOverdue: "#e03e3e", dueBadgeSoon: "#d9730d",
    fontFamily: "",
    defaultLaneColors: {
      "Backlog": { bg: "#b08968", text: "#fffaf5" },
      "Todo": { bg: "#c08b5a", text: "#fffaf5" },
      "In Progress": { bg: "#ad7fa8", text: "#fff7ff" },
      "Follow": { bg: "#6f7f8f", text: "#f6fbff" },
      "Try": { bg: "#5f9bc9", text: "#f5fbff" },
      "Recurring": { bg: "#8f79bc", text: "#f8f5ff" },
      "Research": { bg: "#b57a7a", text: "#fff7f7" },
      "Done": { bg: "#7ca56c", text: "#f7fff5" }
    }
  },
  graphite: {
    name: "Graphite",
    cardBg: "#ffffff", cardText: "#2f3437", cardBorder: "#d8dde2",
    laneBg: "#f2f4f7", laneHeaderBg: "#e4e8ed", laneHeaderText: "#4a525a", laneBorder: "#d6dce3",
    boardBg: "#eef2f6",
    tagBg: "#e8edf2", tagText: "#58606a", tagBorder: "#d2d9e0",
    accentColor: "#4c6ef5",
    priorityUrgent: "#d94848", priorityHigh: "#e67700", priorityMedium: "#c99700", priorityLow: "#2f9e44",
    dueBadgeOverdue: "#d94848", dueBadgeSoon: "#e67700",
    fontFamily: "",
    defaultLaneColors: {
      "Backlog": { bg: "#7a8694", text: "#f8fbff" },
      "Todo": { bg: "#637381", text: "#f8fbff" },
      "In Progress": { bg: "#556270", text: "#f8fbff" },
      "Done": { bg: "#3f4a57", text: "#f6f9ff" }
    }
  },
  ocean: {
    name: "Ocean Mist",
    cardBg: "#f6fbff", cardText: "#1f3b53", cardBorder: "#d6e8f7",
    laneBg: "#edf6fd", laneHeaderBg: "#dcecf9", laneHeaderText: "#305672", laneBorder: "#d0e3f4",
    boardBg: "#eef7ff",
    tagBg: "#dcecf9", tagText: "#2f5d82", tagBorder: "#c7def1",
    accentColor: "#0b6e99",
    priorityUrgent: "#d94848", priorityHigh: "#d97706", priorityMedium: "#ca8a04", priorityLow: "#0f7b6c",
    dueBadgeOverdue: "#d94848", dueBadgeSoon: "#d97706",
    fontFamily: "",
    defaultLaneColors: {
      "Backlog": { bg: "#5f89ad", text: "#f5fbff" },
      "Todo": { bg: "#4f7ea8", text: "#f5fbff" },
      "In Progress": { bg: "#3f739f", text: "#f5fbff" },
      "Done": { bg: "#2f678f", text: "#f5fbff" }
    }
  },
  midnight: {
    name: "Midnight Pro",
    cardBg: "#1b1d22", cardText: "#e7e9ee", cardBorder: "#343841",
    laneBg: "#15171b", laneHeaderBg: "#23262d", laneHeaderText: "#f5f7fb", laneBorder: "#30343d",
    boardBg: "#101216",
    tagBg: "#2a2d34", tagText: "#d7dce6", tagBorder: "#3c4048",
    accentColor: "#8aa6ff",
    priorityUrgent: "#ff7b7b", priorityHigh: "#ffb366", priorityMedium: "#ffd98a", priorityLow: "#7cd9a4",
    dueBadgeOverdue: "#ff7b7b", dueBadgeSoon: "#ffb366",
    fontFamily: "",
    defaultLaneColors: {}
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

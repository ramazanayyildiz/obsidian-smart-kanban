const test = require("node:test");
const assert = require("node:assert/strict");
const Module = require("node:module");

const originalLoad = Module._load;
Module._load = function mockObsidian(request, parent, isMain) {
  if (request === "obsidian") {
    class Plugin {
      constructor(app) { this.app = app || {}; }
      async loadData() { return {}; }
      async saveData() {}
    }
    class Notice {
      constructor(_msg) {}
    }
    return {
      Plugin,
      ItemView: class {},
      Modal: class {},
      TFile: class {},
      TFolder: class {},
      Notice,
      PluginSettingTab: class {},
      Setting: class {},
      setIcon: () => {},
      parseYaml: () => ({}),
    };
  }
  return originalLoad(request, parent, isMain);
};

const SmartKanbanPlugin = require("../src/main");
const { DEFAULT_SETTINGS, DEFAULT_BOARD_CONFIG, SETTINGS_SCHEMA_VERSION } = require("../src/constants");

Module._load = originalLoad;

function createPluginWithBoard() {
  const plugin = new SmartKanbanPlugin();
  plugin.settings = {
    ...DEFAULT_SETTINGS,
    defaultBoardConfig: { ...DEFAULT_BOARD_CONFIG },
    sortBy: "none",
    sortDirection: "asc",
    priorityOrder: "Low,High",
    wipLimits: "",
    cardOrder: {},
    boards: [
      {
        id: "b1",
        name: "Board 1",
        type: "independent",
        sortBy: "priority",
        sortDirection: "asc",
        priorityOrder: "High,Low",
        wipLimits: "Todo:2",
        customFields: "Owner,Category",
        categoryField: "Category",
        cardOrder: {},
      },
    ],
  };
  return plugin;
}

test("sortCards uses board effective sort config", () => {
  const plugin = createPluginWithBoard();
  const cards = [
    { id: "a", title: "A", priority: "Low" },
    { id: "b", title: "B", priority: "High" },
  ];

  const globalSorted = plugin.sortCards(cards, "").map((c) => c.id);
  const boardSorted = plugin.sortCards(cards, "b1").map((c) => c.id);

  assert.deepEqual(globalSorted, ["a", "b"]);
  assert.deepEqual(boardSorted, ["b", "a"]);
});

test("getWipLimit reads board-level limits", () => {
  const plugin = createPluginWithBoard();
  assert.equal(plugin.getWipLimit("Todo", ""), 0);
  assert.equal(plugin.getWipLimit("Todo", "b1"), 2);
});

test("saveCardOrder persists into board cardOrder when boardId is provided", async () => {
  const plugin = createPluginWithBoard();

  await plugin.saveCardOrder("task-1", 1200, "b1");

  assert.equal(plugin.settings.boards[0].cardOrder["task-1"], 1200);
  assert.equal(plugin.settings.cardOrder["task-1"], undefined);
});

test("getCardMetaEntries uses board field config for reserved custom fields", () => {
  const plugin = createPluginWithBoard();
  const card = {
    category: "Feature",
    priority: "High",
    dueDate: "2026-03-05",
    customFields: {
      Owner: "Ramazan",
      Category: "Should not duplicate",
    },
  };

  const entries = plugin.getCardMetaEntries(card, "b1");
  const labels = entries.map(([label]) => label);

  assert.equal(labels.includes("Owner"), true);
  assert.equal(labels.includes("Category"), true);
  const ownerPair = entries.find(([label]) => label === "Owner");
  assert.equal(ownerPair[1], "Ramazan");
  const categoryCustomPair = entries.filter(([label, value]) => label === "Category" && value === "Should not duplicate");
  assert.equal(categoryCustomPair.length, 0);
});

test("migrateSettings creates schema/defaultBoardConfig and is idempotent", () => {
  const plugin = new SmartKanbanPlugin();
  const legacy = {
    sourceFolder: "LegacyTasks",
    sortBy: "priority",
    boards: [{ id: "b1", name: "Legacy", type: "independent" }],
  };

  const first = plugin.migrateSettings(legacy);
  assert.equal(first.didMigrate, true);
  assert.equal(first.migrated.settingsSchemaVersion, SETTINGS_SCHEMA_VERSION);
  assert.equal(first.migrated.defaultBoardConfig.sourceFolder, "LegacyTasks");
  assert.equal(first.migrated.defaultBoardConfig.sortBy, "priority");
  assert.equal(first.migrated.boards[0].noteTemplate, null);

  const second = plugin.migrateSettings(first.migrated);
  assert.equal(second.didMigrate, false);
  assert.equal(second.migrated.settingsSchemaVersion, SETTINGS_SCHEMA_VERSION);
  assert.equal(second.migrated.defaultBoardConfig.sourceFolder, "LegacyTasks");
});

test("getEffectiveSettings inherits from parent and object overrides are full-replace", () => {
  const plugin = new SmartKanbanPlugin();
  plugin.settings = {
    ...DEFAULT_SETTINGS,
    defaultBoardConfig: { ...DEFAULT_BOARD_CONFIG },
    sourceFolder: "GlobalFolder",
    tagColors: { global: { bg: "#111", text: "#eee" } },
    boards: [
      {
        id: "parent",
        name: "Parent",
        type: "independent",
        sourceFolder: "ParentFolder",
        tagColors: { p: { bg: "#222", text: "#ddd" } },
      },
      {
        id: "child",
        name: "Child",
        type: "filtered-view",
        parentBoardId: "parent",
        tagColors: { c: { bg: "#333", text: "#ccc" } },
      },
    ],
  };

  const eff = plugin.getEffectiveSettings("child");
  assert.equal(eff.sourceFolder, "ParentFolder");
  assert.deepEqual(eff.tagColors, { c: { bg: "#333", text: "#ccc" } });
});

test("getEffectiveSettings handles parent cycle and falls back to base settings", () => {
  const plugin = new SmartKanbanPlugin();
  plugin.settings = {
    ...DEFAULT_SETTINGS,
    defaultBoardConfig: { ...DEFAULT_BOARD_CONFIG, sourceFolder: "DefaultFolder" },
    sourceFolder: "GlobalFolder",
    boards: [
      { id: "a", name: "A", type: "filtered-view", parentBoardId: "b", sourceFolder: "AFolder" },
      { id: "b", name: "B", type: "filtered-view", parentBoardId: "a", sourceFolder: "BFolder" },
    ],
  };

  const eff = plugin.getEffectiveSettings("a");
  assert.equal(eff.sourceFolder, "AFolder");
  assert.equal(eff.settingsSchemaVersion, DEFAULT_SETTINGS.settingsSchemaVersion);
});

test("updateCardStatus uses board-specific status field mapping", async () => {
  const plugin = new SmartKanbanPlugin();
  plugin.settings = {
    ...DEFAULT_SETTINGS,
    defaultBoardConfig: { ...DEFAULT_BOARD_CONFIG },
    statusField: "Status",
    boards: [{ id: "b1", name: "Board 1", type: "independent", statusField: "State" }],
  };

  let captured = null;
  plugin.updateCardFields = async (_card, updates) => {
    captured = updates;
  };

  await plugin.updateCardStatus({ id: "x" }, "Done", "b1");
  assert.equal(captured.State, "Done");
  assert.equal(captured.Status, undefined);
});

test("createTaskEntry routes to source mode from board effective settings", async () => {
  const plugin = new SmartKanbanPlugin();
  plugin.settings = {
    ...DEFAULT_SETTINGS,
    defaultBoardConfig: { ...DEFAULT_BOARD_CONFIG },
    sourceMode: "notes",
    boards: [{ id: "b1", name: "Board 1", type: "independent", sourceMode: "tasks" }],
  };

  let routed = "";
  plugin.createTaskLine = async () => { routed = "tasks"; };
  plugin.createTaskNote = async () => { routed = "notes"; return null; };

  await plugin.createTaskEntry("Hello", {}, "b1");
  assert.equal(routed, "tasks");
});

test("getResolvedTheme returns board-specific theme overrides without mutating global", () => {
  const plugin = new SmartKanbanPlugin();
  plugin.settings = {
    ...DEFAULT_SETTINGS,
    defaultBoardConfig: { ...DEFAULT_BOARD_CONFIG },
    theme: { preset: "default", overrides: { accentColor: "#111111" }, laneColors: {} },
    boards: [
      {
        id: "b1",
        name: "Board 1",
        type: "independent",
        theme: {
          preset: "ocean",
          overrides: { accentColor: "#ff00aa", laneTintStrength: 33 },
          laneColors: { Todo: { bg: "#00aa88", text: "#ffffff" } },
        },
      },
    ],
  };

  const globalTheme = plugin.getResolvedTheme("");
  const boardTheme = plugin.getResolvedTheme("b1");

  assert.equal(globalTheme.accentColor, "#111111");
  assert.equal(boardTheme.accentColor, "#ff00aa");
  assert.equal(boardTheme.laneTintStrength, 33);
});

test("getResolvedLaneColor uses board lane color overrides", () => {
  const plugin = new SmartKanbanPlugin();
  plugin.settings = {
    ...DEFAULT_SETTINGS,
    defaultBoardConfig: { ...DEFAULT_BOARD_CONFIG },
    boards: [
      {
        id: "b1",
        name: "Board 1",
        type: "independent",
        theme: {
          preset: "default",
          overrides: {},
          laneColors: { Todo: { bg: "#123456", text: "#abcdef" } },
        },
      },
    ],
  };

  const lane = plugin.getResolvedLaneColor("Todo", "b1");
  assert.deepEqual(lane, { bg: "#123456", text: "#abcdef" });
});

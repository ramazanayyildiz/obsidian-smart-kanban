const test = require("node:test");
const assert = require("node:assert/strict");

const {
  normalizeDateInput,
  getDueInfo,
  parseTaskLine,
  updateTaskLineFields,
  parseWipLimits,
  sortCards,
} = require("../src/core");

test("normalizeDateInput handles ISO and invalid values", () => {
  assert.equal(normalizeDateInput("2026-02-14"), "2026-02-14");
  assert.equal(normalizeDateInput(" 2026-02-14 "), "2026-02-14");
  assert.equal(normalizeDateInput("not-a-date"), "");
});

test("getDueInfo computes overdue and due-soon labels", () => {
  const base = new Date("2026-02-14T10:00:00Z");

  const overdue = getDueInfo("2026-02-12", 2, base);
  assert.equal(overdue.label, "Overdue 2d");
  assert.equal(overdue.cls, "is-overdue");

  const soon = getDueInfo("2026-02-15", 2, base);
  assert.equal(soon.label, "Due in 1d");
  assert.equal(soon.cls, "is-due-soon");

  const later = getDueInfo("2026-02-20", 2, base);
  assert.equal(later.label, "Due in 6d");
  assert.equal(later.cls, "");
});

test("parseTaskLine extracts inline fields and tags", () => {
  const parsed = parseTaskLine(
    "- [ ] Prepare release [Status:: In Progress] [Category:: Work] [Priority:: High] [Due Date:: 2026-02-20] [Tags:: alpha, beta] #urgent",
    {
      statusField: "Status",
      categoryField: "Category",
      priorityField: "Priority",
      dueDateField: "Due Date",
      tagsField: "Tags",
      statusOrder: ["Todo", "In Progress", "Done"],
    }
  );

  assert.equal(parsed.status, "In Progress");
  assert.equal(parsed.category, "Work");
  assert.equal(parsed.priority, "High");
  assert.equal(parsed.dueDate, "2026-02-20");
  assert.deepEqual(parsed.tags.sort(), ["alpha", "beta", "urgent"].sort());
  assert.equal(parsed.title, "Prepare release");
});

test("updateTaskLineFields upserts and removes inline field values", () => {
  const initial = "- [ ] Task [Status:: Todo] [Category:: Work]";
  const updated = updateTaskLineFields(initial, {
    Status: "Done",
    Category: "",
    Priority: "High",
  });

  assert.match(updated, /\[Status:: Done\]/);
  assert.doesNotMatch(updated, /\[Category::/);
  assert.match(updated, /\[Priority:: High\]/);
});

test("parseWipLimits parses valid lane limits", () => {
  const map = parseWipLimits("Todo:10, In Progress:3,Invalid");
  assert.equal(map.get("todo"), 10);
  assert.equal(map.get("in progress"), 3);
  assert.equal(map.has("invalid"), false);
});

test("sortCards supports priority and due sorting", () => {
  const cards = [
    { title: "B", priority: "Low", dueTs: 3 },
    { title: "A", priority: "High", dueTs: 1 },
    { title: "C", priority: "Medium", dueTs: 2 },
  ];

  const priorityOrder = new Map([
    ["high", 0],
    ["medium", 1],
    ["low", 2],
  ]);

  const byPriority = sortCards(cards, "priority", "asc", priorityOrder).map((c) => c.title);
  assert.deepEqual(byPriority, ["A", "C", "B"]);

  const byDueDesc = sortCards(cards, "due", "desc", priorityOrder).map((c) => c.title);
  assert.deepEqual(byDueDesc, ["B", "C", "A"]);
});

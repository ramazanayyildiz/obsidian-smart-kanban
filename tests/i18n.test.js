const test = require("node:test");
const assert = require("node:assert/strict");
const { t, setLocale, getLocale } = require("../src/i18n");

test("i18n locale switch and fallback", () => {
  setLocale("tr");
  assert.equal(getLocale(), "tr");
  assert.equal(t("due.today"), "Bugun teslim");
  assert.equal(t("missing.key"), "missing.key");

  setLocale("en");
  assert.equal(t("due.today"), "Due today");
});

test("i18n interpolation", () => {
  setLocale("en");
  assert.equal(t("due.in_days", { days: 3 }), "Due in 3d");
  setLocale("tr");
  assert.equal(t("due.in_days", { days: 3 }), "3g sonra");
});


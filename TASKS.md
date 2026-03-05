# Smart Kanban Refactor Tasks

## Legend
- Priority: `P0` critical, `P1` high, `P2` medium
- Estimate: engineering days
- Status: `todo`, `in-progress`, `done`, `blocked`

## Phase 0 — New Settings & i18n

### P0-001: Create i18n system
- Status: `done`
- Priority: `P0`
- Estimate: `1d`
- Depends on: none
- Files:
  - `src/i18n.js` (new)
  - `src/main.js`
- Tasks:
  - Create `src/i18n.js` with `t()`, `setLocale()`, `getLocale()`, `LOCALES`.
  - Add `en` locale with ~80 keys (due labels, settings UI, menus, notices, empty states).
  - Add `tr` locale with Turkish translations.
  - Wire into `main.js`: `setLocale()` in `loadSettings()`.
  - Pass `t` into view.js, settings-tab.js, modals.js factory functions.
- Acceptance:
  - `t("due.today")` returns "Due today" in en, "Bugun" in tr.
  - Missing keys fall back to English.
  - `{param}` interpolation works.

### P0-002: Add new DEFAULT_SETTINGS keys
- Status: `done`
- Priority: `P0`
- Estimate: `0.25d`
- Depends on: none
- Files:
  - `src/constants.js`
- Tasks:
  - Add `noteTemplate: ""` — vault path to template file.
  - Add `tagColors: {}` — `{ "tagName": { bg, text } }`.
  - Add `categoryColors: {}` — `{ "catName": { bg, text } }`.
  - Add `dateFormat: "YYYY-MM-DD"` — moment save format.
  - Add `dateDisplayFormat: ""` — moment display format (empty = same as dateFormat).
  - Add `showRelativeDate: true` — relative vs absolute dates.
  - Add `language: "en"` — locale key.
- Acceptance:
  - Existing users get defaults on upgrade — no migration needed.

### P0-003: Date format & relative date support
- Status: `done`
- Priority: `P1`
- Estimate: `0.75d`
- Depends on: `P0-001`, `P0-002`
- Files:
  - `src/core-fallback.js`
  - `src/main.js`
- Tasks:
  - Modify `localGetDueInfo()` to accept `options = { showRelativeDate, dateDisplayFormat, t }`.
  - If `showRelativeDate` true: use `t()` for labels ("Overdue 3d", "Due today", "Due in 5d").
  - If `showRelativeDate` false: use `window.moment(dueDate).format(displayFormat)` for absolute date.
  - Thread options from `collectNoteCardsWithSettings()` and `collectTaskCardsWithSettings()`.
  - In `createTaskNote()`/`createTaskLine()`: use `window.moment().format(eff.dateFormat)` when writing dates.
  - Keep `normalizeDateInput()` parsing flexible — always parse any format, return YYYY-MM-DD internally.
- Acceptance:
  - Due badge shows "3 gun icinde" in Turkish, "In 3d" in English.
  - `showRelativeDate: false` shows formatted absolute date (e.g., "Mar 5, 2026").
  - New tasks save dates in configured format.

### P0-004: Tag & category colors
- Status: `done`
- Priority: `P1`
- Estimate: `0.5d`
- Depends on: `P0-002`
- Files:
  - `src/view.js`
- Tasks:
  - In `renderCard()`: cache `eff = this.plugin.getEffectiveSettings(this.boardId)` once.
  - Apply `eff.tagColors[tag]` inline styles (bg + text) on tag badges.
  - Apply `eff.categoryColors[category]` inline styles on category badges.
  - Case-insensitive fallback: try exact match, then lowercase.
  - Apply same pattern in `renderTable()`, `renderFeed()`, `renderList()`.
- Acceptance:
  - Tag badge "work" gets custom bg/text color from settings.
  - Category badge "Feature" gets custom bg/text color from settings.
  - Uncolored tags/categories keep default theme styling.

### P0-005: Tag & category click-to-filter
- Status: `done`
- Priority: `P1`
- Estimate: `0.25d`
- Depends on: `P0-004`
- Files:
  - `src/view.js`
- Tasks:
  - Add click handler on tag badges: `e.stopPropagation(); this.toggleFilterValue("tags", tag)`.
  - Add click handler on category badges: `e.stopPropagation(); this.toggleFilterValue("categories", category)`.
  - Set `cursor: pointer` on clickable badges.
  - Apply in board, table, feed, and list views.
- Acceptance:
  - Click tag → board filters to show only cards with that tag.
  - Click same tag again → filter removed.
  - Same behavior for category badges.

### P0-006: Note template support
- Status: `done`
- Priority: `P1`
- Estimate: `0.75d`
- Depends on: `P0-001`, `P0-002`
- Files:
  - `src/main.js`
- Tasks:
  - In `createTaskNote()`: if `eff.noteTemplate` is set, read template file.
  - Replace `{{title}}` and `{{date}}` in template content.
  - Add `mergeFieldsIntoTemplate(content, fields)` helper: parse template frontmatter, merge task fields (task fields override), reconstruct content.
  - If template not found, show notice and fall back to default behavior.
- Acceptance:
  - With template set: new task uses template content + merged frontmatter.
  - `{{title}}` and `{{date}}` replaced in template body.
  - Without template: existing behavior unchanged.

### P0-007: Settings UI for new features
- Status: `done`
- Priority: `P1`
- Estimate: `1.5d`
- Depends on: `P0-001`, `P0-002`
- Files:
  - `src/settings-tab.js`
- Tasks:
  - Data Source section: add "Note template" text input.
  - New "Date Display" section: dateFormat, dateDisplayFormat text inputs + showRelativeDate toggle.
  - Appearance section: add "Tag colors" subsection — per-tag bg/text color pickers + "Add tag color" input.
  - Appearance section: add "Category colors" subsection — same pattern.
  - Advanced section: add "Language" dropdown from `Object.keys(LOCALES)`.
  - All labels use `t()` for i18n.
- Acceptance:
  - All new settings visible and functional in Obsidian Settings > Smart Kanban.
  - Language switch re-renders settings UI in selected language.

### P0-008: i18n string replacement
- Status: `done`
- Priority: `P2`
- Estimate: `1d`
- Depends on: `P0-001`
- Files:
  - `src/view.js`
  - `src/settings-tab.js`
  - `src/modals.js`
  - `src/main.js`
- Tasks:
  - Replace all hardcoded strings with `t()` calls.
  - view.js: "Edit", "Open Note", "Mark Done", "Delete", "Move to", "+ New page", empty states.
  - settings-tab.js: section titles, setting names, descriptions.
  - modals.js: modal titles, button labels, confirmations.
  - main.js: all `Notice()` messages.
- Acceptance:
  - Switching language to Turkish → all UI text in Turkish.
  - No hardcoded English strings remain in UI-facing code.

### P0-009: Build & test Phase 0
- Status: `in-progress`
- Priority: `P0`
- Estimate: `0.5d`
- Depends on: all P0 tasks
- Files:
  - `tests/`
- Tasks:
  - Add i18n tests: `t()` fallback, interpolation, locale switch.
  - Add date format tests: relative vs absolute, custom patterns.
  - `npm run check && npm run build && npm test` — all pass.
- Acceptance:
  - All existing tests still pass.
  - New tests cover i18n and date formatting.

## Phase 1 — Foundation

### P1-001: Add board config schema + migration
- Status: `done`
- Priority: `P0`
- Estimate: `2d`
- Depends on: `P0-002`
- Files:
  - `src/constants.js`
  - `src/main.js`
- Tasks:
  - Add `DEFAULT_BOARD_CONFIG` with all overridable keys (including new P0 keys).
  - Add `settingsSchemaVersion`.
  - Migrate legacy global settings into `Default Board`.
  - Keep migration idempotent.
- Acceptance:
  - Existing users retain same behavior post-upgrade.
  - No data loss after reload/restart.

### P1-002: Harden effective settings resolver
- Status: `done`
- Priority: `P0`
- Estimate: `0.5d`
- Depends on: `P1-001`
- Files:
  - `src/main.js`
- Tasks:
  - Finalize cycle-safe resolver for filtered views. (cycle guard with `visited` Set exists)
  - Define strict parent inheritance + override merge rules.
  - Document object-type settings (tagColors, categoryColors, theme) are full-replace, not deep-merge.
- Acceptance:
  - Self/loop parent refs cannot crash view.
  - Fallback behavior is deterministic.

### P1-003: Enforce board-scoped CRUD everywhere
- Status: `done`
- Priority: `P0`
- Estimate: `1d`
- Depends on: `P1-001`, `P1-002`
- Files:
  - `src/main.js`
  - `src/view.js`
- Tasks:
  - Ensure create/update/status-move always use active board effective config.
  - Audit quick-add, modal create, context menu, DnD move.
- Acceptance:
  - Board A actions never write using board B settings.

### P1-004: Foundation tests
- Status: `done`
- Priority: `P0`
- Estimate: `1d`
- Depends on: `P1-001`, `P1-002`, `P1-003`
- Files:
  - `tests/core.test.js` (extend)
  - `tests/` (new files as needed)
- Tasks:
  - Add migration test coverage.
  - Add resolver cycle/inheritance tests.
  - Add board-isolation write path tests.
- Acceptance:
  - CI-like local test suite validates migration + isolation.

## Phase 2 — Board-Centric Settings

### P2-001: Split settings into Global vs Active Board
- Status: `done`
- Priority: `P1`
- Estimate: `1d`
- Depends on: `P1-001`
- Files:
  - `src/settings-tab.js`
- Tasks:
  - Add clear "Active board" context.
  - Move board-related controls under board section.
  - Keep global section minimal (language, refreshDebounceMs, boards).
- Acceptance:
  - User can tell exactly which board they are editing.

### P2-002: Move source + field mapping to board scope
- Status: `done`
- Priority: `P1`
- Estimate: `1.5d`
- Depends on: `P2-001`
- Files:
  - `src/settings-tab.js`
  - `src/main.js`
- Tasks:
  - Board-level source mode/folder/inbox/subfolder config.
  - Board-level status/category/priority/tags/due/custom field mapping.
  - Board-level noteTemplate.
- Acceptance:
  - Changing mapping in one board does not affect others.

### P2-003: Move layout + appearance to board scope
- Status: `done`
- Priority: `P1`
- Estimate: `1.5d`
- Depends on: `P2-001`
- Files:
  - `src/settings-tab.js`
  - `src/view.js`
  - `styles.css`
- Tasks:
  - Board-level status order, sort, WIP, due thresholds, theme controls.
  - Board-level tagColors, categoryColors, dateFormat, dateDisplayFormat, showRelativeDate.
  - Keep per-lane accent and tint strength board-specific.
- Acceptance:
  - Two boards can have completely different layout/theme/colors simultaneously.

### P2-004: Board manager UX hardening
- Status: `done`
- Priority: `P2`
- Estimate: `0.75d`
- Depends on: `P2-001`
- Files:
  - `src/view.js`
  - `src/modals.js`
  - `src/main.js`
- Tasks:
  - Create/edit/clone/delete flows with confirmations. (BoardManagerModal exists)
  - Add board-level override fields to edit modal (show inherited value as placeholder).
  - Validate board names and prevent invalid states.
- Acceptance:
  - Board lifecycle manageable without manual JSON edits.
  - Board edit modal shows all overridable settings with "Clear (use global)" option.

## Phase 3 — Dynamic Lanes

### P3-001: Dynamic status/lane discovery
- Status: `done`
- Priority: `P0`
- Estimate: `1d`
- Depends on: `P1-003`, `P2-002`
- Files:
  - `src/main.js`
  - `src/view.js`
- Tasks:
  - Build lane list from active board's `statusField` values.
  - Merge with `statusOrder` (ordered known + discovered unknown appended).
- Acceptance:
  - No hard runtime dependence on default backlog/todo list.

### P3-002: Lane manager
- Status: `done`
- Priority: `P1`
- Estimate: `1d`
- Depends on: `P3-001`
- Files:
  - `src/settings-tab.js` (or `src/modals.js`)
- Tasks:
  - Add discover/reorder UI for statuses.
  - Persist manual order per board.
- Acceptance:
  - User can control lane order without editing raw settings.

### P3-003: Create flow uses dynamic statuses
- Status: `done`
- Priority: `P1`
- Estimate: `0.5d`
- Depends on: `P3-001`
- Files:
  - `src/view.js`
- Tasks:
  - New Task modal status select uses board-specific dynamic lane list.
  - Quick-add remains lane-context aware.
- Acceptance:
  - Status options always match current board data model.

## Phase 4 — Hardening + Release

### P4-001: State isolation audit
- Status: `done`
- Priority: `P1`
- Estimate: `0.5d`
- Depends on: `P2-003`, `P3-003`
- Files:
  - `src/view.js`
  - `src/main.js`
- Tasks:
  - Ensure collapsed lanes/filters/presets/card order are board-isolated.
  - (`collapsedLanes.clear()` in `switchBoard()` already done)
- Acceptance:
  - Switching boards never carries unintended UI/behavior state.

### P4-002: Regression suite expansion
- Status: `done`
- Priority: `P1`
- Estimate: `1d`
- Depends on: all Phase 1–3 tasks
- Files:
  - `tests/`
- Tasks:
  - Add cross-board notes/tasks mode tests.
  - Add filtered-view inheritance regression tests.
  - Add tag/category color rendering tests.
- Acceptance:
  - Critical board-centric flows covered by automated tests.

### P4-003: Release package
- Status: `done`
- Priority: `P2`
- Estimate: `0.5d`
- Depends on: `P4-001`, `P4-002`
- Files:
  - `manifest.json` (if needed)
  - changelog/release notes docs
- Tasks:
  - Prepare migration notes and known limitations.
  - Document object-type settings override behavior (full replace).
  - Final smoke checklist before release.
- Acceptance:
  - Release notes clearly explain migration and board-centric behavior.

## Review Notes & Decisions Needed

### Already completed (from previous sessions)
- Bug fix: drag-drop cross-lane (drop handler + cardOrder tracking) — `done`
- Bug fix: overflow menu CSS positioning — `done`
- Bug fix: quick-add missing frontmatter fields — `done`
- Quick-add race condition fix (`quickAddPending` flag) — `done`
- `_keyHandler` listener cleanup in `onClose()` — `done`
- `collapsedLanes.clear()` in `switchBoard()` — `done`
- Card-list duplicate `min-height` fix — `done`
- Dark mode overrides for lanes, counts, quick-add — `done`
- Design token updates (radius 8/10px, lane gap 12px, title 1.9rem) — `done`

### filtered-view board type needs spec (blocks P1-002)
The plan mentions `parentBoardId` and filtered-view inheritance but never defines:
- How is a filtered-view board created? (UI flow)
- What does the user see? (same lanes, subset of cards?)
- How does a user interact with it? (can they create cards in it?)
Decision needed before P1-002 can be finalized.

### Path collision policy (blocks P2-002)
Two boards pointing at the same `sourceFolder` will show identical cards. Options:
1. Allow it silently (some users want filtered views of same folder)
2. Warn but allow
3. Block it
Decision needed before P2-002.

### Object-type settings override behavior
`tagColors`, `categoryColors`, `theme` at board level do full-replace (not deep-merge).
If a user wants to add one tag color on top of global, they must copy all global colors + their addition.
Acceptable for v1. Consider deep-merge as follow-up.

## Execution Order (Critical Path)

### Phase 0 (ships independently)
1. `P0-001` — i18n system
2. `P0-002` — new DEFAULT_SETTINGS keys
3. `P0-003` — date format + relative dates
4. `P0-004` — tag/category colors
5. `P0-005` — click-to-filter
6. `P0-006` — note template
7. `P0-007` — settings UI
8. `P0-008` — i18n string replacement
9. `P0-009` — build & test

### Phase 1–4 (board-centric refactor)
10. `P1-001`
11. `P1-002`
12. `P1-003`
13. `P1-004`
14. `P2-001`
15. `P2-002`
16. `P2-003`
17. `P2-004`
18. `P3-001`
19. `P3-002`
20. `P3-003`
21. `P4-001`
22. `P4-002`
23. `P4-003`

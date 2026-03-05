# Smart Kanban — Board-Centric Release Notes

## Summary
This release moves Smart Kanban from mostly global settings to a board-centric model.
Each board can now have its own source, lanes, sorting, filters, view defaults, and appearance overrides.

## Migration Notes
- Existing installations are migrated automatically on load.
- Legacy global configuration is copied into a `Default Board` record.
- Existing cards/notes are not rewritten during migration.
- Settings migration is idempotent: reloading does not duplicate board records.

## Behavior Changes
- Most operational settings now resolve per active board.
- New cards and updates are applied using the active board's effective configuration.
- Filter presets are stored per board.
- Lane collapse state is reset on board switch to prevent cross-board state bleed.
- Theme and lane colors can be overridden per board.

## Object-Type Override Rules
The following object settings are **full-replace** at board level (not deep-merge):
- `tagColors`
- `categoryColors`
- `theme`

Implication:
- If a board override is set for one of these objects, that board object fully replaces the inherited one.
- To extend global colors for a board, copy inherited entries first, then add/modify keys.

## Known Limitations
- Object-type overrides (`tagColors`, `categoryColors`, `theme`) are full-replace only.
- Filtered-view board inheritance works with cycle protection, but complex chained inheritance should still be kept simple.
- Existing UX assumes status names are stable identifiers; renaming statuses may affect user expectations for lane-specific history/state.

## Release Smoke Checklist
Run before publishing:

1. Build and tests:
   - `npm run check`
   - `npm test`
2. Migration:
   - Install over an older config.
   - Confirm `Default Board` is created and old behavior is preserved.
3. Board isolation:
   - Create 2 boards with different folders/status orders/sort options.
   - Verify create/edit/move actions in board A do not apply board B rules.
4. Filtered-view inheritance:
   - Create filtered-view child from a parent board.
   - Verify inherited settings resolve correctly and override fields apply.
5. UI state isolation:
   - Collapse lanes and save filter presets in board A.
   - Switch to board B and confirm state does not leak.
6. Appearance:
   - Verify lane backgrounds/header contrast in light and dark themes.
   - Verify search input and settings button render correctly.
7. Packaging:
   - Confirm `manifest.json` version and `main.js` build output are correct.
   - Reload plugin in Obsidian and validate no startup errors.

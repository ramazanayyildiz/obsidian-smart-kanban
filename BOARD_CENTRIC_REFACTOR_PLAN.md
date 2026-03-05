# Smart Kanban Board-Centric Refactor Plan

## Problem Statement
- Mevcut yapı plugin-level ayarlara fazla bağımlı.
- Board sayısı artsa da ayar izolasyonu zayıf.
- Status/lane modeli kısmen statik kalıyor.
- i18n desteği yok — tüm metinler hardcoded İngilizce.
- Tag/category renkleri, tarih formatı, note template gibi temel ayarlar eksik.

## Target Architecture
- `Board = bağımsız workspace`.
- Her board kendi veri kaynağı, field mapping, lane/status, sort, filter, theme, colors ve card order ayarlarına sahip.
- Global ayarlar minimuma iner — board ayarları initial değerleri global'den alır, override eder.
- i18n sistemi tüm UI string'lerini çevirilebilir kılar.

## Global-Only vs Board-Overridable

**Global-only (asla board'da override edilmez):**
- `boards` — board listesinin kendisi
- `activeBoardId` — aktif board UI state
- `refreshDebounceMs` — plugin performans ayarı
- `language` — tüm UI tek dilde render edilir

**Board-overridable (global'den initial değer alır, board override eder):**
- Tüm diğer ayarlar: sourceMode, sourceFolder, includeSubfolders, taskInboxFile
- Field mapping: statusField, categoryField, priorityField, tagsField, dueDateField, customFields
- Layout: statusOrder, priorityOrder, sortBy, sortDirection, dueSoonDays, wipLimits, autoArchiveDays
- Appearance: theme (preset, overrides, laneColors)
- Yeni ayarlar: noteTemplate, tagColors, categoryColors, dateFormat, dateDisplayFormat, showRelativeDate

## Scope
- Board-level configuration modeli.
- Dynamic status/lane discovery.
- Settings UI'nin board-centric hale gelmesi.
- Migration (backward-compatible).
- i18n sistemi (en + tr).
- Yeni ayarlar: note template, tag/category colors, date format, relative dates.
- Tag/category click-to-filter davranışı.
- Test ve release hardening.

## Data Model Changes
1. `DEFAULT_BOARD_CONFIG` oluştur.
2. `settings.boards[]` için genişletilmiş schema:
- `id`, `name`, `type`, `parentBoardId`
- `sourceMode`, `sourceFolder`, `includeSubfolders`, `taskInboxFile`
- `statusField`, `categoryField`, `priorityField`, `tagsField`, `dueDateField`, `customFields`
- `statusOrder`, `priorityOrder`, `sortBy`, `sortDirection`, `dueSoonDays`, `wipLimits`, `autoArchiveDays`
- `theme`: `preset`, `overrides`, `laneColors`
- `filterPresets`, `cardOrder`
- `noteTemplate` — vault path to template file
- `tagColors` — `{ "tagName": { bg, text } }`
- `categoryColors` — `{ "catName": { bg, text } }`
- `dateFormat` — moment pattern for saving (default: "YYYY-MM-DD")
- `dateDisplayFormat` — moment pattern for display (default: same as dateFormat)
- `showRelativeDate` — boolean (default: true)
3. Globalden board'a taşınan alanları deprecate et (read-only fallback ile).
4. `language` — global-only, default: "en"

## Settings Resolution
1. `getEffectiveSettings(boardId)` cycle-safe olsun. (kısmen mevcut)
2. Normal board'da doğrudan board config kullan.
3. `filtered-view` board'da parent inheritance + override merge.
4. Cycle tespitinde güvenli fallback + notice.
5. Object-type settings (tagColors, categoryColors, theme) tam replace — deep merge değil.

## i18n System
1. `src/i18n.js` — `{ t, setLocale, getLocale, LOCALES }` export eder.
2. `LOCALES` objesi: `en` ve `tr` locale'leri, flat key yapısı.
3. `t(key, params)` — `{param}` interpolasyonu, İngilizce fallback.
4. ~80 çevrilebilir string: due label'ları, settings UI, menü öğeleri, notice'lar, boş state'ler.
5. `main.js`'de `loadSettings()` sonrası `setLocale(this.settings.language)` çağrılır.

## Dynamic Lanes / Status
1. Lane listesi runtime'da board'un `statusField` değerlerinden üretilecek.
2. `statusOrder` sadece sıralama tercihi olacak.
3. Order'da olmayan yeni status'lar otomatik sona eklenecek.
4. Hardcoded status listeleri sadece template default olarak kalacak.

## UI / UX Changes
1. Board Settings paneli:
- "Active board" açıkça göster.
- Data source, fields, layout, appearance tamamen board-level düzenlenir.
2. Lane manager:
- Auto-discover statuses
- Manual order override
- (Opsiyonel) rename/merge lane
3. New Task modal:
- Status seçenekleri aktif board'dan dinamik gelir.
4. Settings tab'e yeni bölümler:
- "Date Display" section: dateFormat, dateDisplayFormat, showRelativeDate
- "Tag Colors" section: per-tag bg/text color pickers
- "Category Colors" section: per-category bg/text color pickers
- "Note Template" field in Data Source section
- "Language" dropdown in Advanced section
5. Tag/category click-to-filter:
- Tag badge'ine tıklayınca `toggleFilterValue("tags", tag)` — ayar gerekmez
- Category badge'ine tıklayınca `toggleFilterValue("categories", category)` — ayar gerekmez

## Creation/Update Flow
1. Create/update/status move operasyonları sadece aktif board effective config ile çalışır.
2. Quick-add, modal create ve context menu aynı resolver'ı kullanır.
3. Cross-board state leak engellenir (collapsed lanes, filters vb.).
4. Note template destegi: template varsa içeriği oku, `{{title}}` ve `{{date}}` replace et, frontmatter merge et.

## Migration Plan
1. Plugin version flag ekle (`settingsSchemaVersion`).
2. İlk açılışta legacy global ayarları `Default Board` içine taşı.
3. Eski davranışı koru (kullanıcı kesintisi olmasın).
4. Migration idempotent olmalı.
5. Yeni ayarlar için migration gerekmez — DEFAULT_SETTINGS fallback yeterli.

## Testing Plan
1. Unit tests:
- migration doğruluğu
- effective settings merge + cycle guard
- dynamic lane discovery ve order merge
- i18n: t() fallback, interpolation, locale switch
- date format: relative vs absolute, custom patterns
2. Integration tests:
- notes/tasks source mode board bazında
- create/update/move board izolasyonu
- filtered-view inheritance
- note template merge
3. Regression tests:
- board switch state isolation
- settings persistence
- tag/category color rendering

## Rollout Phases
1. Phase 0: New settings + i18n (no board refactor yet — ships independently).
2. Phase 1: Data model + migration + runtime resolver.
3. Phase 2: Board-centric settings UI.
4. Phase 3: Dynamic lane manager + polish.
5. Phase 4: Release hardening + docs.

## Acceptance Criteria
- Her board bağımsız konfig ile çalışır.
- Status/lane hardcoded bağımlılığı kalmaz.
- Legacy kullanıcıda migration sonrası davranış bozulmaz.
- Tüm create/update akışları board isolation kurallarına uyar.
- Tag/category badge'leri kullanıcı tanımlı renklerle render edilir.
- Tag/category'ye tıklayınca filtre uygulanır.
- Tarihler kullanıcı formatında gösterilir (relative veya absolute).
- Note template ile yeni task oluşturulabilir.
- Dil değiştirince tüm UI string'leri çevrilir.
- Test suite kritik senaryoları kapsar.

## Open Questions (decisions needed before implementation)

### 1. filtered-view board type spec
Plan mentions `parentBoardId` and filtered-view inheritance multiple times but never defines:
- How is a filtered-view board created? (dedicated UI button? board manager option?)
- What does the user see? (same lanes with subset of cards? different layout?)
- Can the user create/edit cards inside a filtered-view?
- What happens when parent board is deleted?
**Must be specified before P1-002 can be finalized.**

### 2. Path collision policy
Two boards pointing at the same `sourceFolder` will show identical cards. Options:
1. Allow silently — some users want filtered views of same folder with different settings
2. Warn but allow — show notice on board switch
3. Block — prevent saving duplicate sourceFolder across boards
**Must be decided before P2-002.**

### 3. What stays global? (explicit list)
The plan says "global ayarlar minimuma iner" but doesn't list them. Explicitly:
- `boards` — board registry
- `activeBoardId` — UI state
- `refreshDebounceMs` — plugin performance
- `language` — entire UI renders in one language
Everything else is board-overridable. Global values serve as defaults for new boards.

## Already Completed (from previous sessions)
- Drag-drop cross-lane fix (drop handler + cardOrder)
- Overflow menu CSS positioning
- Quick-add missing frontmatter fields
- Quick-add race condition (`quickAddPending` flag)
- `_keyHandler` listener cleanup in `onClose()`
- `collapsedLanes.clear()` in `switchBoard()`
- Card-list duplicate `min-height` fix
- Dark mode overrides
- Design tokens (radius 8/10px, lane gap 12px, title 1.9rem)
- `getEffectiveSettings(boardId)` with cycle guard (partial — needs hardening)
- `BoardManagerModal` (partial — needs override fields)

## Risks
- Migration sırasında veri alanı çakışmaları.
- Filtered-view parent cycle.
- Farklı board'larda aynı source path kullanımından kaynaklı belirsizlik.
- Object-type settings (tagColors, categoryColors, theme) board override'da deep merge beklentisi — v1'de full replace.
- Date format migration: existing dates saved as YYYY-MM-DD. Changing `dateFormat` only affects new tasks — existing notes keep old format. `normalizeDateInput()` must handle both.

## Mitigations
- Schema version + idempotent migration.
- Cycle guard + fallback.
- Path collision policy — decision pending.
- tagColors/categoryColors board override davranışı dokümante edilecek.
- Date parsing stays flexible (accept any format internally).

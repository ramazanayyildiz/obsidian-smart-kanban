# Smart Kanban Board-Centric Refactor Plan

## Problem Statement
- Mevcut yapı plugin-level ayarlara fazla bağımlı.
- Board sayısı artsa da ayar izolasyonu zayıf.
- Status/lane modeli kısmen statik kalıyor.

## Target Architecture
- `Board = bağımsız workspace`.
- Her board kendi veri kaynağı, field mapping, lane/status, sort, filter, theme ve card order ayarlarına sahip.
- Global ayarlar minimuma iner (`activeBoardId` + birkaç plugin davranışı).

## Scope
- Board-level configuration modeli.
- Dynamic status/lane discovery.
- Settings UI’nin board-centric hale gelmesi.
- Migration (backward-compatible).
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
3. Globalden board’a taşınan alanları deprecate et (read-only fallback ile).

## Settings Resolution
1. `getEffectiveSettings(boardId)` cycle-safe olsun.
2. Normal board’da doğrudan board config kullan.
3. `filtered-view` board’da parent inheritance + override merge.
4. Cycle tespitinde güvenli fallback + notice.

## Dynamic Lanes / Status
1. Lane listesi runtime’da board’un `statusField` değerlerinden üretilecek.
2. `statusOrder` sadece sıralama tercihi olacak.
3. Order’da olmayan yeni status’lar otomatik sona eklenecek.
4. Hardcoded status listeleri sadece template default olarak kalacak.

## UI / UX Changes
1. Board Settings paneli:
- “Active board” açıkça göster.
- Data source, fields, layout, appearance tamamen board-level düzenlenir.
2. Lane manager:
- Auto-discover statuses
- Manual order override
- (Opsiyonel) rename/merge lane
3. New Task modal:
- Status seçenekleri aktif board’dan dinamik gelir.

## Creation/Update Flow
1. Create/update/status move operasyonları sadece aktif board effective config ile çalışır.
2. Quick-add, modal create ve context menu aynı resolver’ı kullanır.
3. Cross-board state leak engellenir (collapsed lanes, filters vb.).

## Migration Plan
1. Plugin version flag ekle (`settingsSchemaVersion`).
2. İlk açılışta legacy global ayarları `Default Board` içine taşı.
3. Eski davranışı koru (kullanıcı kesintisi olmasın).
4. Migration idempotent olmalı.

## Testing Plan
1. Unit tests:
- migration doğruluğu
- effective settings merge + cycle guard
- dynamic lane discovery ve order merge
2. Integration tests:
- notes/tasks source mode board bazında
- create/update/move board izolasyonu
- filtered-view inheritance
3. Regression tests:
- board switch state isolation
- settings persistence

## Rollout Phases
1. Phase 1: Data model + migration + runtime resolver.
2. Phase 2: Board-centric settings UI.
3. Phase 3: Dynamic lane manager + polish.
4. Phase 4: release hardening + docs.

## Acceptance Criteria
- Her board bağımsız konfig ile çalışır.
- Status/lane hardcoded bağımlılığı kalmaz.
- Legacy kullanıcıda migration sonrası davranış bozulmaz.
- Tüm create/update akışları board isolation kurallarına uyar.
- Test suite kritik senaryoları kapsar.

## Risks
- Migration sırasında veri alanı çakışmaları.
- Filtered-view parent cycle.
- Farklı board’larda aynı source path kullanımından kaynaklı belirsizlik.

## Mitigations
- Schema version + idempotent migration.
- Cycle guard + fallback.
- Path collision warning.

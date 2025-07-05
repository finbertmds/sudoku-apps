// runMigrationsIfNeeded.ts

import {appStorage} from '@sudoku/shared-storages';
import {
  migrateGameLogsEntryV2,
  updateTotalGames,
} from '@sudoku/shared-storages/migrations';

export const CURRENT_MIGRATION_VERSION = 2;

export async function runMigrationsIfNeeded(language: string = 'en') {
  if (__DEV__) {
    // statsMock.saveMockGameLogsV2();
    // rankingMock.saveMockRanking();
  }

  const storedVersion = appStorage.getMigrationVersion() ?? 0;

  if (storedVersion >= CURRENT_MIGRATION_VERSION) {
    console.log('[MIGRATION] No migration needed: v =', storedVersion);
    return;
  }

  console.log(
    `[MIGRATION] Start from v${storedVersion} to v${CURRENT_MIGRATION_VERSION}`,
  );

  // Các bước migrate theo version
  if (storedVersion < 1) {
    await migrateGameLogsEntryV2(language);
  }

  if (storedVersion < 2) {
    await updateTotalGames();
  }

  // Cập nhật version sau khi migrate xong
  appStorage.setMigrationVersion(CURRENT_MIGRATION_VERSION);

  console.log('[MIGRATION] Done');
}

// gameLogsEntryV2.ts

import {PlayerService, StatsService} from '@sudoku/shared-services';
import {statsStorage} from '@sudoku/shared-storages';
import {GameLogEntryV3, LanguageCode, TimeFilter} from '@sudoku/shared-types';
import {ALL_AFFECTED_RANGES, DEFAULT_PLAYER_ID} from '@sudoku/shared-utils';

export async function migrateGameLogsEntryV2(language: LanguageCode) {
  console.log('[MIGRATION] Migrating game logs entry v2...');
  await PlayerService.createDefaultPlayerIfNeeded(language);
  const rawLogs = await statsStorage.getGameLogsV3();
  const migrated = rawLogs.map((entry) => {
    if (
      entry.playerId === undefined ||
      entry.playerId === null ||
      entry.playerId === ''
    ) {
      return {
        ...entry,
        playerId: DEFAULT_PLAYER_ID,
      } as GameLogEntryV3;
    }
    return entry;
  });
  await statsStorage.saveGameLogsV3(migrated);

  // update last stats cache update user id
  const affectedRanges: TimeFilter[] = ALL_AFFECTED_RANGES;

  const allLogs = await StatsService.getLogs();
  await StatsService.updateStatsWithAllCache(
    allLogs,
    affectedRanges,
    DEFAULT_PLAYER_ID,
  );

  await statsStorage.setLastStatsCacheUpdate();
  await statsStorage.setLastStatsCacheUpdateUserId(DEFAULT_PLAYER_ID);

  console.log('[MIGRATION] Game logs entry v2 migrated');
}

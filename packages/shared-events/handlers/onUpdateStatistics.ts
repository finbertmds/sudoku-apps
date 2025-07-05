// handlers/onUpdateStatistics.ts

import {StatisticsUpdatedCoreEvent} from '@sudoku/shared-events';
import {StatsService} from '@sudoku/shared-services';
import {playerProfileStorage} from '@sudoku/shared-storages';

export const handleUpdateStatistics = async (
  payload: StatisticsUpdatedCoreEvent,
) => {
  const allLogs = await StatsService.getLogs();
  // await GameStatsManager.updateStatsWithAllCache(allLogs, [
  //   'today',
  //   'week',
  //   'month',
  //   'year',
  //   'all',
  // ]);
  if (payload.logs.length > 0) {
    await StatsService.updateStatsWithCache(
      allLogs,
      payload.logs,
      playerProfileStorage.getCurrentPlayerId(),
    );
  }
};

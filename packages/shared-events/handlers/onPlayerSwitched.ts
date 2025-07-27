// handlers/onPlayerSwitched.ts

import {BoardService, StatsService} from '@sudoku/shared-services';
import {TimeFilter} from '@sudoku/shared-types';
import {ALL_AFFECTED_RANGES} from '@sudoku/shared-utils';

export const handleSwitchPlayer = async (playerId: string) => {
  await StatsService.beforeClear();
  await BoardService.clear();

  const affectedRanges: TimeFilter[] = ALL_AFFECTED_RANGES;

  const allLogsByPlayerId = await StatsService.getLogsByPlayerId(playerId);
  await StatsService.updateStatsWithAllCache(
    allLogsByPlayerId,
    affectedRanges,
    playerId,
  );

  await StatsService.updateStatsDone();
};

// handlers/onPlayerSwitched.ts

import {BoardService, StatsService} from '@sudoku/shared-services';
import {TimeFilter} from '@sudoku/shared-types';
import {ALL_AFFECTED_RANGES} from '@sudoku/shared-utils';

export const handleSwitchPlayer = async (playerId: string) => {
  const savedGame = await BoardService.loadSaved();
  if (savedGame) {
    let log = await StatsService.getLog(savedGame.savedId);
    if (log) {
      log = {
        ...log,
        completed: false,
        endTime: new Date().toISOString(),
        durationSeconds: savedGame.savedTimePlayed,
        mistakes: savedGame.savedMistake,
        hintCount: savedGame.savedHintCount,
      };
      await StatsService.saveLog(log, true);
    }
  }

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

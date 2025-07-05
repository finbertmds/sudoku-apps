// handlers/onGameEnded.ts

import {
  CORE_EVENTS,
  GameEndedCoreEvent,
  StatisticsUpdatedCoreEvent,
} from '@sudoku/shared-events';
import eventBus from '@sudoku/shared-events/eventBus';
import {PlayerService, StatsService} from '@sudoku/shared-services';

export const handleGameEnded = async (payload: GameEndedCoreEvent) => {
  const newEntry = await StatsService.recordGameEnd(payload);
  // Emit gameStarted in next tick
  requestAnimationFrame(() => {
    eventBus.emit(CORE_EVENTS.statisticsUpdated, {
      logs: [newEntry],
    } as StatisticsUpdatedCoreEvent);
  });
  if (payload.completed) {
    await PlayerService.incrementPlayerTotalGames();
  }
};

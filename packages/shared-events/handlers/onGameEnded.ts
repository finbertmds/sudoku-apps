// handlers/onGameEnded.ts

import {
  CORE_EVENTS,
  GameEndedCoreEvent,
  StatisticsUpdatedCoreEvent,
} from '@sudoku/shared-events';
import eventBus from '@sudoku/shared-events/eventBus';
import {PlayerService} from '@sudoku/shared-services';

export const handleGameEnded = async (payload: GameEndedCoreEvent) => {
  // Emit gameStarted in next tick
  requestAnimationFrame(() => {
    eventBus.emit(CORE_EVENTS.statisticsUpdated, {
      logs: [payload.newEntry],
    } as StatisticsUpdatedCoreEvent);
  });
  if (payload.completed) {
    await PlayerService.incrementPlayerTotalGames();
  }
};

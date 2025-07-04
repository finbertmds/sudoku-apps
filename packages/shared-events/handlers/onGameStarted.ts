// handlers/onGameStarted.ts

import {CORE_EVENTS} from '@/coreEvents';
import eventBus from '@/eventBus';
import {StatisticsUpdatedCoreEvent} from '@/types';
import {BoardService, StatsService} from '@sudoku/shared-services';

export const handleGameStarted = async () => {
  const initGame = await BoardService.loadInit();
  if (initGame) {
    const updatedLog = await StatsService.recordGameStart(initGame!);
    // Emit gameStarted in next tick
    requestAnimationFrame(() => {
      eventBus.emit(CORE_EVENTS.statisticsUpdated, {
        logs: [updatedLog],
      } as StatisticsUpdatedCoreEvent);
    });
  }
};

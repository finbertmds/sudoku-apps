// handlers/onInitGame.ts

import {
  CORE_EVENTS,
  getGenerateBoard,
  InitGameCoreEvent,
} from '@sudoku/shared-events';
import eventBus from '@sudoku/shared-events/eventBus';
import {BoardService} from '@sudoku/shared-services';

export const handleInitGame = async (payload: InitGameCoreEvent) => {
  try {
    const initGame = getGenerateBoard(payload.level, payload.id);
    await BoardService.save(initGame);
    // Emit gameStarted in next tick
    requestAnimationFrame(() => {
      eventBus.emit(CORE_EVENTS.gameStarted);
    });
  } catch (error) {
    console.error('Error in handleInitGame:', error);
  }
};

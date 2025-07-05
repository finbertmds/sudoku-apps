// setupEventListeners.ts

import {CORE_EVENTS} from '@sudoku/shared-events';
import eventBus from '@sudoku/shared-events/eventBus';
import {
  handleClearStorage,
  handleDefaultPlayerUpdated,
  handleGameEnded,
  handleGameStarted,
  handleInitGame,
  handleSwitchPlayer,
  handleUpdateStatistics,
} from '@sudoku/shared-events/handlers';

/**
 * Setup event listeners for the event bus.
 * Call setupInitGameHandler() before using any other methods
 *
 * @param options - The options for the event listeners.
 * @param options.generateBoard - The function to generate the board.
 */
export const setupEventListeners = () => {
  eventBus.on(CORE_EVENTS.initGame, handleInitGame);
  eventBus.on(CORE_EVENTS.gameStarted, handleGameStarted);
  eventBus.on(CORE_EVENTS.gameEnded, handleGameEnded);
  eventBus.on(CORE_EVENTS.statisticsUpdated, handleUpdateStatistics);
  eventBus.on(CORE_EVENTS.clearStorage, handleClearStorage);
  eventBus.on(CORE_EVENTS.defaultPlayerUpdated, handleDefaultPlayerUpdated);
  eventBus.on(CORE_EVENTS.switchPlayer, handleSwitchPlayer);
};

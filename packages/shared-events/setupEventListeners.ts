// setupEventListeners.ts

import {CORE_EVENTS} from '@/coreEvents';
import eventBus from '@/eventBus';
import {handleClearStorage} from '@/handlers/onClearStorage';
import {handleGameEnded} from '@/handlers/onGameEnded';
import {handleGameStarted} from '@/handlers/onGameStarted';
import {handleInitGame} from '@/handlers/onInitGame';
import {handleDefaultPlayerUpdated} from '@/handlers/onPlayerDefaultUpdated';
import {handleSwitchPlayer} from '@/handlers/onPlayerSwitched';
import {handleUpdateStatistics} from '@/handlers/onUpdateStatistics';

/**
 * Setup event listeners for the event bus.
 * Call setupInitGameHandler() first.
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

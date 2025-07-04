// handlers/onPlayerDefaultUpdated.ts

import {CORE_EVENTS} from '@/coreEvents';
import eventBus from '@/eventBus';
import {PlayerService} from '@sudoku/shared-services';

export const handleDefaultPlayerUpdated = async (playerId: string) => {
  await PlayerService.migrateDataFromDefaultPlayerToNewPlayer(playerId);
  // Emit defaultPlayerUpdated_Done in next tick
  requestAnimationFrame(() => {
    eventBus.emit(CORE_EVENTS.defaultPlayerUpdated_Done);
  });
};

// handlers/onDeletePlayer.ts

import {PlayerService} from '@sudoku/shared-services';

export const handleDeletePlayer = async (playerId: string) => {
  await PlayerService.deletePlayer(playerId);
};

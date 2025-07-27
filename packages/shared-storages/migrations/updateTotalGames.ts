// updateTotalGames.ts

import {playerProfileStorage, statsStorage} from '@sudoku/shared-storages';

export async function updateTotalGames() {
  console.log('[MIGRATION] Updating total games...');
  // lấy lại toàn bộ logs, update lại total games đã completed cho từng player
  const rawLogs = await statsStorage.getGameLogsV3();
  const players = await playerProfileStorage.getAllPlayers();
  const updatedPlayers = players.map((player) => {
    const totalGames = rawLogs.filter(
      (log) => log.playerId === player.id && log.completed,
    ).length;
    return {...player, totalGames};
  });
  await playerProfileStorage.savePlayers(updatedPlayers);
  console.log('[MIGRATION] Updating total games done');
}

// PlayerService.ts

import {StatsService} from '@sudoku/shared-services';
import {playerProfileStorage, statsStorage} from '@sudoku/shared-storages';
import {GameLogEntryV2, PlayerProfile} from '@sudoku/shared-types';
import {createDefaultPlayer, DEFAULT_PLAYER_ID} from '@sudoku/shared-utils';

export const PlayerService = {
  async createDefaultPlayerIfNeeded(language: string = 'en'): Promise<void> {
    const players = await playerProfileStorage.getAllPlayers();
    if (players.length === 0) {
      const rawLogs = await statsStorage.getGameLogsV2();
      // count total games from raw logs which completed
      const totalGames = rawLogs.filter((log) => log.completed).length;
      const player = createDefaultPlayer(totalGames, language);
      await playerProfileStorage.savePlayers([player]);
      await playerProfileStorage.setCurrentPlayerId(player.id);
    }
  },

  async migrateDataFromDefaultPlayerToNewPlayer(
    newPlayerId: string,
  ): Promise<void> {
    const rawLogs = await statsStorage.getGameLogsV2();
    const migrated = rawLogs.map((entry) => {
      if (entry.playerId === DEFAULT_PLAYER_ID) {
        return {
          ...entry,
          playerId: newPlayerId,
        } as GameLogEntryV2;
      }
      return entry;
    });
    await statsStorage.saveGameLogsV2(migrated);

    // move total games from default player to new player
    const defaultPlayer =
      await playerProfileStorage.getPlayerById(DEFAULT_PLAYER_ID);
    const newPlayer = await playerProfileStorage.getPlayerById(newPlayerId);
    if (defaultPlayer && newPlayer) {
      newPlayer.totalGames = defaultPlayer.totalGames;
      await playerProfileStorage.updatePlayer(newPlayer);
    }

    // delete default player
    const allPlayers = await playerProfileStorage.getAllPlayers();
    const updated = allPlayers.filter(
      (_player) => _player.id !== DEFAULT_PLAYER_ID,
    );
    await playerProfileStorage.savePlayers(updated);

    // nếu đổi default player và đang chọn default player thì update stats cache
    if (newPlayerId === (await playerProfileStorage.getCurrentPlayerId())) {
      const allLogs = await StatsService.getLogsByPlayerId(newPlayerId);
      await StatsService.updateStatsWithCache(allLogs, allLogs, newPlayerId);
    }
  },

  async clear(): Promise<void> {
    await playerProfileStorage.clearAll();
  },

  async deletePlayer(playerId: string): Promise<void> {
    await this.deletePlayerGameLogs(playerId);
    const allPlayers = await playerProfileStorage.getAllPlayers();
    const updated = allPlayers.filter((p) => p.id !== playerId);
    await playerProfileStorage.savePlayers(updated);
  },

  async deletePlayerGameLogs(playerId: string): Promise<void> {
    if (playerId === DEFAULT_PLAYER_ID) {
      return;
    }
    await statsStorage.deleteGameLogsV2ByPlayerId(playerId);
  },

  async incrementPlayerTotalGames(): Promise<void> {
    const player = await playerProfileStorage.getCurrentPlayer();
    if (!player) {
      return;
    }
    player.totalGames++;
    await playerProfileStorage.updatePlayer(player);
  },

  async canDeletePlayer(playerId: string): Promise<boolean> {
    if (playerId === DEFAULT_PLAYER_ID) {
      return false;
    }
    const allPlayers = await playerProfileStorage.getAllPlayers();
    return allPlayers.length > 1 && allPlayers.some((p) => p.id === playerId);
  },

  async getAllPlayers(): Promise<PlayerProfile[]> {
    return await playerProfileStorage.getAllPlayers();
  },

  async getCurrentPlayer(): Promise<PlayerProfile | null> {
    return await playerProfileStorage.getCurrentPlayer();
  },

  async getCurrentPlayerId(): Promise<string> {
    return await playerProfileStorage.getCurrentPlayerId();
  },

  async setCurrentPlayerId(playerId: string): Promise<void> {
    await playerProfileStorage.setCurrentPlayerId(playerId);
  },

  async getPlayerById(playerId: string): Promise<PlayerProfile | null> {
    return await playerProfileStorage.getPlayerById(playerId);
  },

  async savePlayers(players: PlayerProfile[]): Promise<void> {
    await playerProfileStorage.savePlayers(players);
  },

  async createPlayer(profile: PlayerProfile): Promise<void> {
    const all = await this.getAllPlayers();
    const updated = [...all, profile];
    await this.savePlayers(updated);
  },

  async updatePlayerName(playerId: string, name: string): Promise<void> {
    const all = await this.getAllPlayers();
    const updated = all.map((_player) =>
      _player.id === playerId ? {..._player, name} : _player,
    );
    await this.savePlayers(updated);
  },
};

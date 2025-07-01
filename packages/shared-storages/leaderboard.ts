import { PlayerStats, PlayerStatsThresholds } from '@sudoku/shared-types';
import {
  generateOverallRankingNotes,
  getPlayerNotes,
} from '@sudoku/shared-utils';
import { TFunction } from 'i18next';
import { playerProfileStorage } from './playerProfileStorage';
import { statsStorage } from './statsStorage';

const getAllPlayerStats = (t: TFunction, playerStatsThresholds: PlayerStatsThresholds): PlayerStats[] => {
  try {
    const players = playerProfileStorage.getAllPlayers();
    const logs = statsStorage.getGameLogsV2();

    return players.map((player) => {
      const playerLogs = logs.filter((log) => log.playerId === player.id);
      const completed = playerLogs.filter((l) => l.completed);

      const totalTime = completed.reduce(
        (sum, l) => sum + l.durationSeconds,
        0,
      );

      let stat: PlayerStats = {
        player,
        totalGames: playerLogs.length,
        completedGames: completed.length,
        totalTime,
        winRate: completed.length / playerLogs.length,
      };

      const notes = getPlayerNotes(stat, t, playerStatsThresholds);
      stat.notes = notes;

      return stat;
    });
  } catch (error) {
    console.error('Error getting all leaderboard stats:', error);
    return [];
  }
};

const getAllPlayerHighlights = (
  stats: PlayerStats[],
  t: TFunction,
): PlayerStats[] => {
  const highlights = generateOverallRankingNotes(stats, t);

  return stats.map((stat) => {
    const highlight = highlights.find((h) => h.id === stat.player.id);
    stat.highlights = highlight?.highlights;
    return stat;
  });
};

export const leaderboardStorage = {
  getAllPlayerStats,
  getAllPlayerHighlights,
};

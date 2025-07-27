// statsStorage.ts

import {storage} from '@sudoku/shared-storages';
import {
  DailyStats,
  GameLogEntry,
  GameLogEntryV2,
  GameLogEntryV3,
  GameStatsCache,
} from '@sudoku/shared-types';
import {
  STORAGE_KEY_DAILY_STATS,
  STORAGE_KEY_GAME_LOGS,
  STORAGE_KEY_GAME_STATS_CACHE,
  STORAGE_KEY_LAST_STATS_CACHE_UPDATE,
  STORAGE_KEY_LAST_STATS_CACHE_UPDATE_USER_ID,
  getTodayDateString,
} from '@sudoku/shared-utils';

/**
 * @deprecated
 */
const saveGameLogs = async (logs: GameLogEntry[]) => {
  try {
    await storage.set(STORAGE_KEY_GAME_LOGS, JSON.stringify(logs));
  } catch (_) {}
};

/**
 * @deprecated
 */
const getGameLogs = async (): Promise<GameLogEntry[]> => {
  try {
    const json = await storage.getString(STORAGE_KEY_GAME_LOGS);
    return json ? JSON.parse(json) : [];
  } catch (_) {
    return [];
  }
};

/**
 * @deprecated
 */
const clearGameLogs = async () => {
  try {
    await storage.delete(STORAGE_KEY_GAME_LOGS);
  } catch (_) {}
};

/**
 * @deprecated
 */
const saveGameLogsV2 = async (logs: GameLogEntryV2[]) =>
  await storage.set(STORAGE_KEY_GAME_LOGS, JSON.stringify(logs));

/**
 * @deprecated
 */
const getGameLogsV2 = async (): Promise<GameLogEntryV2[]> => {
  const json = await storage.getString(STORAGE_KEY_GAME_LOGS);
  return json ? JSON.parse(json) : [];
};

/**
 * @deprecated
 */
const clearGameLogsV2 = async () => {
  try {
    await storage.delete(STORAGE_KEY_GAME_LOGS);
  } catch (_) {}
};

/**
 * @deprecated
 */
const getGameLogsV2ByPlayerId = async (
  playerId: string,
): Promise<GameLogEntryV2[]> => {
  const logs = await getGameLogsV2();
  return logs.filter((log) => log.playerId === playerId);
};

/**
 * @deprecated
 */
const deleteGameLogsV2ByPlayerId = async (playerId: string) => {
  const logs = await getGameLogsV2();
  const updated = logs.filter((log) => log.playerId !== playerId);
  saveGameLogsV2(updated);
};

const saveGameLogsV3 = async (logs: GameLogEntryV3[]) => {
  try {
    await storage.set(STORAGE_KEY_GAME_LOGS, JSON.stringify(logs));
  } catch (_) {}
};

const getGameLogsV3 = async (): Promise<GameLogEntryV3[]> => {
  try {
    const json = await storage.getString(STORAGE_KEY_GAME_LOGS);
    return json ? JSON.parse(json) : [];
  } catch (_) {
    return [];
  }
};

const clearGameLogsV3 = async () => {
  try {
    await storage.delete(STORAGE_KEY_GAME_LOGS);
  } catch (_) {}
};

const getGameLogsV3ByPlayerId = async (
  playerId: string,
): Promise<GameLogEntryV3[]> => {
  const logs = await getGameLogsV3();
  return logs.filter((log) => log.playerId === playerId);
};

const deleteGameLogsV3ByPlayerId = async (playerId: string) => {
  const logs = await getGameLogsV3();
  const updated = logs.filter((log) => log.playerId !== playerId);
  saveGameLogsV3(updated);
};

const saveStatsCache = async (cache: GameStatsCache) => {
  try {
    await storage.set(STORAGE_KEY_GAME_STATS_CACHE, JSON.stringify(cache));
  } catch (_) {}
};

const getStatsCache = async (): Promise<GameStatsCache> => {
  try {
    const json = await storage.getString(STORAGE_KEY_GAME_STATS_CACHE);
    return json ? JSON.parse(json) : {};
  } catch (_) {
    return {};
  }
};

const clearStatsCache = async () => {
  try {
    await storage.delete(STORAGE_KEY_GAME_STATS_CACHE);
  } catch (_) {}
};

const saveDailyStats = async (dailyStats: DailyStats[]) => {
  try {
    await storage.set(STORAGE_KEY_DAILY_STATS, JSON.stringify(dailyStats));
  } catch (_) {}
};

const getDailyStats = async (): Promise<DailyStats[]> => {
  try {
    const json = await storage.getString(STORAGE_KEY_DAILY_STATS);
    return json ? JSON.parse(json) : [];
  } catch (_) {
    return [];
  }
};

const clearDailyStats = async () => {
  try {
    await storage.delete(STORAGE_KEY_DAILY_STATS);
  } catch (_) {}
};

const setLastStatsCacheUpdate = async () => {
  const today = getTodayDateString();
  try {
    await storage.set(STORAGE_KEY_LAST_STATS_CACHE_UPDATE, today);
  } catch (_) {}
};

const getLastStatsCacheUpdate = async (): Promise<string | null> => {
  try {
    return (
      (await storage.getString(STORAGE_KEY_LAST_STATS_CACHE_UPDATE)) || null
    );
  } catch (_) {
    return null;
  }
};

const clearLastStatsCacheUpdate = async () => {
  try {
    await storage.delete(STORAGE_KEY_LAST_STATS_CACHE_UPDATE);
  } catch (_) {}
};

const setLastStatsCacheUpdateUserId = async (userId: string) => {
  try {
    await storage.set(STORAGE_KEY_LAST_STATS_CACHE_UPDATE_USER_ID, userId);
  } catch (_) {}
};

const getLastStatsCacheUpdateUserId = async (): Promise<string | null> => {
  try {
    return (
      (await storage.getString(STORAGE_KEY_LAST_STATS_CACHE_UPDATE_USER_ID)) ||
      null
    );
  } catch (_) {
    return null;
  }
};

const clearLastStatsCacheUpdateUserId = async () => {
  try {
    await storage.delete(STORAGE_KEY_LAST_STATS_CACHE_UPDATE_USER_ID);
  } catch (_) {}
};

const clearStatsData = async () => {
  try {
    await clearDailyStats();
    await clearGameLogsV3();
    await clearStatsCache();
    await clearLastStatsCacheUpdate();
    await clearLastStatsCacheUpdateUserId();
  } catch (_) {}
};

export const statsStorage = {
  saveGameLogs,
  getGameLogs,
  clearGameLogs,
  saveGameLogsV2,
  getGameLogsV2,
  clearGameLogsV2,
  getGameLogsV2ByPlayerId,
  deleteGameLogsV2ByPlayerId,
  saveGameLogsV3,
  getGameLogsV3,
  clearGameLogsV3,
  getGameLogsV3ByPlayerId,
  deleteGameLogsV3ByPlayerId,
  saveStatsCache,
  getStatsCache,
  clearStatsCache,
  saveDailyStats,
  getDailyStats,
  clearDailyStats,
  setLastStatsCacheUpdate,
  getLastStatsCacheUpdate,
  clearLastStatsCacheUpdate,
  setLastStatsCacheUpdateUserId,
  getLastStatsCacheUpdateUserId,
  clearLastStatsCacheUpdateUserId,
  clearStatsData,
};

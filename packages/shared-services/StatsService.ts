// GameStatsManager.ts

import {BoardService, PlayerService} from '@sudoku/shared-services';
import {playerProfileStorage, statsStorage} from '@sudoku/shared-storages';
import {
  CageInfo,
  ConstantEnv,
  GameEndedCoreEvent,
  GameLogEntryV3,
  GameStats,
  GameStatsCache,
  GenericInitGame,
  GenericSavedGame,
  InitGame,
  Level,
  TimeFilter,
} from '@sudoku/shared-types';
import {
  getStatsFromLogs,
  getTodayDateString,
  isInTimeRange,
} from '@sudoku/shared-utils';
import uuid from 'react-native-uuid';

/**
 * Call init() before using any other methods
 *
 * @param env - ConstantEnv
 */
export const StatsService = {
  levels: [] as Level[],

  init(env: ConstantEnv) {
    this.levels = env.LEVELS;
  },

  async shouldUpdateStatsCache(): Promise<boolean> {
    const lastUpdateStr = await statsStorage.getLastStatsCacheUpdate();
    const lastUpdateUserId = await statsStorage.getLastStatsCacheUpdateUserId();
    const currentPlayerId = await playerProfileStorage.getCurrentPlayerId();

    if (lastUpdateUserId !== currentPlayerId) {
      return true;
    }

    const today = getTodayDateString(); // e.g., '2025-04-30'
    const isUpdatedToday = lastUpdateStr === today;
    return !isUpdatedToday;
  },

  async getStatsWithCache(
    logs: GameLogEntryV3[],
    filter: TimeFilter,
    userId: string,
  ): Promise<Record<Level, GameStats>> {
    try {
      const cache: GameStatsCache = await statsStorage.getStatsCache();

      if (cache[filter]) {
        return cache[filter]!;
      }

      const computedStats = getStatsFromLogs(logs, filter, userId, this.levels);
      const updatedCache = {...cache, [filter]: computedStats};

      await statsStorage.saveStatsCache(updatedCache);

      return computedStats;
    } catch (error) {
      console.error('Failed to get stats with cache:', error);
      return getStatsFromLogs(logs, filter, userId, this.levels); // fallback
    }
  },

  async updateStatsWithAllCache(
    logs: GameLogEntryV3[],
    affectedRanges: TimeFilter[],
    userId: string,
  ): Promise<void> {
    try {
      const cache: GameStatsCache = await statsStorage.getStatsCache();

      const updatedCache: GameStatsCache = {...cache};

      for (const range of affectedRanges) {
        const updatedStats = getStatsFromLogs(logs, range, userId, this.levels);
        updatedCache[range] = updatedStats;
      }

      await statsStorage.saveStatsCache(updatedCache);
    } catch (error) {
      console.error('Failed to update stats cache:', error);
    }
  },

  async updateStatsDone(): Promise<void> {
    await statsStorage.setLastStatsCacheUpdate();
    await statsStorage.setLastStatsCacheUpdateUserId(
      await playerProfileStorage.getCurrentPlayerId(),
    );
  },

  async updateStatsWithCache(
    logs: GameLogEntryV3[],
    updatedLogs: GameLogEntryV3[],
    userId: string,
  ): Promise<void> {
    try {
      const cache: GameStatsCache = await statsStorage.getStatsCache();

      // Xác định các khoảng thời gian cần cập nhật lại
      const rangesToUpdate = new Set<TimeFilter>();

      updatedLogs.forEach((log) => {
        if (isInTimeRange(log.endTime, 'today')) {
          rangesToUpdate.add('today');
        }
        if (isInTimeRange(log.endTime, 'week')) {
          rangesToUpdate.add('week');
        }
        if (isInTimeRange(log.endTime, 'month')) {
          rangesToUpdate.add('month');
        }
        if (isInTimeRange(log.endTime, 'year')) {
          rangesToUpdate.add('year');
        }
      });
      rangesToUpdate.add('all'); // luôn luôn cập nhật all

      const updatedCache = {...cache};

      for (const range of rangesToUpdate) {
        updatedCache[range] = getStatsFromLogs(
          logs,
          range,
          userId,
          this.levels,
        );
      }

      await statsStorage.saveStatsCache(updatedCache);
    } catch (error) {
      console.error('Failed to update stats with cache:', error);
    }
  },

  async getLog(id: string): Promise<GameLogEntryV3 | null> {
    try {
      const logs = await this.getLogs();
      const log = logs.find((_log) => _log.id === id);
      if (log) {
        return log;
      }
    } catch (error) {
      console.error('Error loading logs:', error);
    }
    return null;
  },

  async getLogs(): Promise<GameLogEntryV3[]> {
    try {
      return await statsStorage.getGameLogsV3();
    } catch (error) {
      console.error('Error loading logs:', error);
    }
    return [];
  },

  async getLogsDone(): Promise<GameLogEntryV3[]> {
    try {
      const logs = await this.getLogs();
      return logs.filter((log) => log.durationSeconds > 0);
    } catch (error) {
      console.error('Error loading logs:', error);
    }
    return [];
  },

  async getLogsByPlayerId(playerId: string): Promise<GameLogEntryV3[]> {
    try {
      return statsStorage.getGameLogsV3ByPlayerId(playerId);
    } catch (error) {
      console.error('Error loading logs:', error);
    }
    return [];
  },

  /**
   * Saves a log entry to AsyncStorage.
   * If override is true, it will replace the existing log with the same ID.
   * If override is false, it will append the new log to the existing logs.
   */
  async saveLog(log: GameLogEntryV3, override: boolean = true) {
    try {
      const existing = await this.getLogs();
      if (override) {
        const index = existing.findIndex((_log) => _log.id === log.id);
        if (index !== -1) {
          existing[index] = log;
        } else {
          console.error('Log not found for override:', log.id);
          return;
        }
      } else {
        existing.unshift(log);
      }

      await statsStorage.saveGameLogsV3(existing);
    } catch (error) {
      console.error('Error saving logs:', error);
    }
  },

  /**
   * Saves multiple log entries to AsyncStorage.
   * If append is true, it will append the new logs to the existing logs.
   * If append is false, it will replace the existing logs with the new logs.
   */
  async saveLogs(logs: GameLogEntryV3[], append: boolean = true) {
    try {
      let updated: GameLogEntryV3[] = logs;
      if (append) {
        const existing = await this.getLogs();
        const sortedLogs = logs.sort(
          (a, b) =>
            new Date(b.endTime).getTime() - new Date(a.endTime).getTime(),
        );
        updated = [...sortedLogs, ...existing];
      }

      await statsStorage.saveGameLogsV3(updated);
    } catch (error) {
      console.error('Error saving logs:', error);
    }
  },

  async recordGameStart(initGame: InitGame): Promise<GameLogEntryV3> {
    const newEntry: GameLogEntryV3 = {
      id: initGame.id,
      level: initGame.savedLevel,
      completed: false,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      durationSeconds: 0,
      mistakes: 0,
      hintCount: 0,
      playerId: await playerProfileStorage.getCurrentPlayerId(),
      initialBoard: (initGame as GenericInitGame<string>).initialBoard,
      solvedBoard: (initGame as GenericInitGame<string>).solvedBoard,
    };

    // use for killer sudoku
    if (initGame.cages) {
      newEntry.cages = initGame.cages;
    }

    await this.saveLog(newEntry, false);
    return newEntry;
  },

  async recordGameEnd(payload: GameEndedCoreEvent) {
    // 👉 Record daily log
    const oldEntry = await this.getLog(payload.id);
    let newEntry: GameLogEntryV3;
    if (oldEntry) {
      newEntry = {
        ...oldEntry,
        completed: payload.completed,
        endTime: new Date().toISOString(),
        durationSeconds: payload.timePlayed,
        mistakes: payload.mistakes,
        hintCount: payload.hintCount,
      };
      await this.saveLog(newEntry, true);
    } else {
      newEntry = {
        id: uuid.v4().toString(),
        playerId: await playerProfileStorage.getCurrentPlayerId(),
        level: payload.level,
        completed: payload.completed,
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
        durationSeconds: payload.timePlayed,
        mistakes: payload.mistakes,
        hintCount: payload.hintCount,
      };
      await this.saveLog(newEntry, false);
    }
    return newEntry;
  },

  async resetStatistics() {
    try {
      await statsStorage.clearStatsData();
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
  },

  async hasUnfinishedGame(): Promise<boolean> {
    const currentPlayerId = await PlayerService.getCurrentPlayerId();
    const logs = await this.getLogsByPlayerId(currentPlayerId);
    const unfinishedLogs = logs.filter(
      (log) => !log.completed && log.initialBoard && log.solvedBoard,
    );
    if (unfinishedLogs.length === 0) {
      return false;
    }
    return true;
  },

  async resumeRandomUnfinishedGame(): Promise<InitGame | null> {
    const currentPlayerId = await PlayerService.getCurrentPlayerId();
    const logs = await this.getLogsByPlayerId(currentPlayerId);
    const unfinishedLogs = logs.filter(
      (log) => !log.completed && log.initialBoard && log.solvedBoard,
    );
    if (unfinishedLogs.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * unfinishedLogs.length);
    const randomLog = unfinishedLogs[randomIndex];
    const initGame: GenericInitGame<string, {cages?: CageInfo[]}> = {
      id: randomLog.id,
      savedLevel: randomLog.level,
      initialBoard: randomLog.initialBoard!,
      solvedBoard: randomLog.solvedBoard!,
    };
    // use for killer sudoku
    if (randomLog.cages) {
      initGame.cages = randomLog.cages;
    }
    await BoardService.clear();
    await BoardService.save(initGame);
    await this.afterClear(randomLog.id);

    return initGame;
  },

  /**
   * Save log to resume unfinished game when clear board
   */
  async beforeClear() {
    const initGame = (await BoardService.loadInit()) as GenericInitGame<
      string,
      {cages?: CageInfo[]}
    >;
    const savedGame =
      (await BoardService.loadSaved()) as GenericSavedGame<string>;
    if (initGame && savedGame) {
      let log = await this.getLog(savedGame.savedId);
      if (log) {
        log = {
          ...log,
          completed: false,
          endTime: new Date().toISOString(),
          durationSeconds: savedGame.savedTimePlayed,
          mistakes: savedGame.savedMistake,
          hintCount: savedGame.savedHintCount,
          initialBoard: initGame.initialBoard,
          solvedBoard: initGame.solvedBoard,
        };
        // use for killer sudoku
        if (initGame.cages) {
          log.cages = initGame.cages;
        }
        await this.saveLog(log, true);
      }
    }
  },

  /**
   * Remove initBoard and solvedBoard from log when clear board
   */
  async afterClear(id: string) {
    const logNeedUpdated = await this.getLog(id);
    if (logNeedUpdated) {
      if (logNeedUpdated) {
        logNeedUpdated.initialBoard = undefined;
        logNeedUpdated.solvedBoard = undefined;
        logNeedUpdated.cages = undefined;
      }
      await this.saveLog(logNeedUpdated, true);
    }
  },
};

// stats.ts

import {CageInfo, CellValue, Level} from '@sudoku/shared-types';

/**
 * @deprecated
 */
export interface GameLogEntry {
  id: string; // unique ID (UUID)
  level: Level;
  completed: boolean;
  startTime: string; // ISO format: e.g., '2025-04-30T14:23:00Z'
  endTime: string; // ISO format: e.g., '2025-04-30T14:23:00Z'
  durationSeconds: number;
  mistakes?: number;
  hintCount?: number;
}

/**
 * @deprecated
 */
export type GameLogEntryV2 = GameLogEntry & {
  playerId: string; // player ID (UUID)
};

export type GameLogEntryV3 = GameLogEntryV2 & {
  initialBoard?: CellValue[][];
  solvedBoard?: CellValue[][];
  cages?: CageInfo[];
};

export type TimeFilter = 'today' | 'week' | 'month' | 'year' | 'all';

export type GameStatsCache = {
  [range in TimeFilter]?: Record<Level, GameStats> | null;
};
export interface GameStats {
  gamesStarted: number;
  gamesCompleted: number;
  bestTimeSeconds: number | null;
  averageTimeSeconds: number | null;
  totalTimeSeconds: number;
}

export interface DailyStats {
  date: string; // YYYY-MM-DD
  games: number;
  totalTimeSeconds: number;
}

export interface DailyStatsPieData {
  name: string;
  count: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

export interface DailyStatsStackedData {
  labels: string[];
  legend: string[];
  data: number[][];
  barColors: string[];
}

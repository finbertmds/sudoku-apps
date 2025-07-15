// constants.ts

import {Level, TimeRange} from '@sudoku/shared-types';

export const BOARD_SIZE = 9;
export const CELL_SIZE = 40;
export const CAGE_PADDING = 4.5;

export const ANIMATION_DURATION = 300; // in ms
export const ANIMATION_TYPE = {
  ROW: 1,
  COL: 2,
  ROW_COL: 3,
  NONE: 0,
};

// Game Storage Keys
export const STORAGE_KEY_INIT_GAME = 'sudoku_initGame';
export const STORAGE_KEY_SAVED_GAME = 'sudoku_savedGame';
export const STORAGE_KEY_GAME_STATS_CACHE = 'sudoku_gameStatsCache';
export const STORAGE_KEY_LAST_STATS_CACHE_UPDATE =
  'sudoku_lastStatsCacheUpdate';
export const STORAGE_KEY_LAST_STATS_CACHE_UPDATE_USER_ID =
  'sudoku_lastStatsCacheUpdateUserId';
export const STORAGE_KEY_GAME_LOGS = 'sudoku_gameLogs';
export const STORAGE_KEY_DAILY_STATS = 'sudoku_dailyStats';
export const STORAGE_KEY_LANG_KEY_DEFAULT = 'sudoku_defaultLanguage';
export const STORAGE_KEY_LANG_KEY_PREFERRED = 'sudoku_preferredLanguage';
export const STORAGE_KEY_SETTINGS = 'sudoku_settings';
export const STORAGE_KEY_BACKGROUNDS = 'sudoku_backgrounds';
export const STORAGE_KEY_HAS_PLAYED = 'sudoku_hasPlayed';
export const STORAGE_KEY_QUOTES = 'sudoku_quotes';
export const STORAGE_KEY_MIGRATION_VERSION = 'sudoku_migrationVersion';
export const STORAGE_KEY_PLAYERS = 'sudoku_players';
export const STORAGE_KEY_CURRENT_PLAYER_ID = 'sudoku_currentPlayerId';
export const STORAGE_KEY_LAST_APP_VERSION_KEY = 'sudoku_lastAppVersionKey';

export const CHART_WIDTH = 60;
export const CHART2_WIDTH = 70;

export const DAILY_STATS_DATE_FORMAT = 'yyyy-MM-dd';

// Unsplash
export const UNSPLASH_KEYWORDS_LIGHT = [
  'soft white background',
  'clean light texture',
  'minimal white pastel',
  'smooth cream background',
  'white paper texture',
  'light marble surface',
  'beige soft abstract',
];

export const UNSPLASH_KEYWORDS_DARK = [
  'dark matte texture',
  'black soft gradient',
  'minimal dark blur',
  'deep grey abstract',
  'night soft background',
  'charcoal surface texture',
  'dark fabric background',
];

export const UNSPLASH_URL = 'https://unsplash.com/';

export const DEFAULT_PLAYER_ID = '00000000-0000-4000-8000-000000000000'; // hoặc uuidv4() cố định

export const MAX_PLAYER_RANKING_COUNT = 3;

export const ALL_AFFECTED_RANGES: TimeRange[] = [
  'today',
  'week',
  'month',
  'year',
  'all',
];

export const AD_TYPE = {
  BANNER: 'banner',
  INTERSTITIAL: 'interstitial',
  REWARDED: 'rewarded',
  REWARDED_INTERSTITIAL: 'rewardedInterstitial',
};

export const BANNER_HEIGHT = 70;

export const NUMBERS_1_TO_9 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// ---------------- Killer Sudoku ----------------

export const CELLS_TO_REMOVE_RANGE: Record<Level, number[]> = {
  easy: [30, 34],
  medium: [40, 46],
  hard: [50, 54],
  expert: [60, 64],
};

// ---------------- Killer Sudoku ----------------

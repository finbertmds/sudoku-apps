import {AppSettings, Level} from '@sudoku/shared-types';
import {RequestOptions} from 'react-native-google-mobile-ads';

export const SCREENS = {
  HOME_TABS: 'HomeTabs',
  MAIN: 'Main',
  STATISTICS: 'Statistics',
  LEADERBOARD: 'Leaderboard',
  BOARD: 'Board',
  OPTIONS: 'Options',
  SETTINGS: 'Settings',
  HOW_TO_PLAY: 'HowToPlay',
  ABOUT_GAME: 'AboutGame',
  PLAYERS: 'Players',
  SK_WEBVIEW: 'SkWebView',
} as const;

export const AD_REQUEST_OPTIONS: RequestOptions = {
  requestNonPersonalizedAdsOnly: true,
  keywords: [
    // Education
    'education',
    'learning',
    'study',
    'student',
    'cognitive skills',
    'e-learning',
    'mental math',
    // Language
    'language learning',
    'English',
    'Japanese',
    'vocabulary',
    'grammar',
    // Mindfulness
    'focus',
    'meditation',
    'calm',
    'relaxation',
    'mental health',
    'wellness',
    // Sports
    'sports',
    'exercise',
    'fitness',
    'health',
    'yoga',
  ],
};

export const UNSPLASH_UTM = '?utm_source=sudoku-killer&utm_medium=referral';

export const LEVELS = ['easy', 'medium', 'hard', 'expert'] as const;
export const LEVEL_PRIORITY: Level[] = LEVELS.slice().reverse();
export const LEVEL_WEIGHT: Record<string, number> = {
  expert: 5,
  hard: 4,
  medium: 2.5,
  easy: 1,
};
// Ngưỡng đánh giá người chơi
export const PLAYER_STATS_THRESHOLDS = {
  fastPlayerAvgTime: 360, // Dưới 6 phút
  slowPlayerAvgTime: 600, // Trên 10 phút là hơi chậm
  verySlowPlayerAvgTime: 900, // Trên 15 phút là rất chậm

  minGamesForGoodPlayer: 5,
  highWinRate: 0.7,
  mediumWinRate: 0.4,

  strongPlayerScore: 50,
  strongPlayerWins: 10,
};

export const SHOW_UNSPLASH_IMAGE_INFO = false;
export const IS_UI_TESTING = false;

export const MAX_TIME_PLAYED = 3 * 60 * 60; // in seconds
export const MAX_MISTAKES = 5;
export const MAX_HINTS = 5;

export const LANGUAGES = [
  {code: 'en', label: 'English'},
  {code: 'vi', label: 'Tiếng Việt'},
  {code: 'ja', label: '日本語'},
];

export const CELLS_TO_REMOVE_RANGE: Record<Level, number[]> = {
  easy: [30, 34],
  medium: [40, 46],
  hard: [50, 54],
  expert: [60, 64],
};

export const DEFAULT_SETTINGS: AppSettings = {
  // sounds: true,
  // autoLock: false,
  timer: true,
  // score: true,
  // statisticsMsg: true,
  // numberFirst: false,
  mistakeLimit: true,
  autoCheckMistake: true,
  highlightDuplicates: true,
  highlightAreas: true,
  highlightIdenticalNumbers: true,
  hideUsedNumbers: true,
  autoRemoveNotes: true,
};

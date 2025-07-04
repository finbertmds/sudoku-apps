// handlers/onClearStorage.ts

import {
  BackgroundService,
  BoardService,
  PlayerService,
  SettingsService,
  StatsService,
} from '@sudoku/shared-services';

export const handleClearStorage = async () => {
  await BoardService.clear();
  await PlayerService.clear();
  await StatsService.resetStatistics();
  await SettingsService.clear();
  if (!__DEV__) {
    await BackgroundService.clear();
  }
  await PlayerService.createDefaultPlayerIfNeeded();

  // TODO: auto detect language
  // autoDetectLanguage();
};

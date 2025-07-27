// events.ts

import {AppSettings, GameLogEntryV3, Level} from '@sudoku/shared-types';

export type DynamicEvents = Record<string, any>;
export type AppEvents = CoreEvents & DynamicEvents;

export type InitGameCoreEvent = {
  level: Level;
  id: string;
};

export type GameEndedCoreEvent = {
  id: string;
  level: Level;
  timePlayed: number;
  mistakes: number;
  hintCount: number;
  completed: boolean;
};

export type StatisticsUpdatedCoreEvent = {
  logs: GameLogEntryV3[];
};

export type CoreEvents = {
  initGame: InitGameCoreEvent;
  gameStarted: void;
  gameEnded: GameEndedCoreEvent;
  statisticsUpdated: StatisticsUpdatedCoreEvent;
  settingsUpdated: AppSettings;
  clearStorage: void;
};

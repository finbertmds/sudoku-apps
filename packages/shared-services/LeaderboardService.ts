// src/services/LeaderboardService.ts

import { LevelPriority, LevelWeight, RankedPlayer } from '@sudoku/shared-types';
import {
  getAllPlayerHighlights,
  getAllStats,
  getRankedPlayers,
} from '@sudoku/shared-utils';
import { TFunction } from 'i18next';

const getAllPlayerStats = async (
  levelPriority: LevelPriority,
  levelWeight: LevelWeight,
  maxTimePlayed: number,
  t: TFunction,
): Promise<RankedPlayer[]> => {
  const playerStats = await getAllStats(
    levelPriority,
    levelWeight,
    maxTimePlayed,
  );
  const rankedPlayerStats = getRankedPlayers(
    levelPriority,
    levelWeight,
    playerStats,
  );
  const rankedPlayerHighlights = await getAllPlayerHighlights(
    rankedPlayerStats,
    t,
  );
  return rankedPlayerHighlights;
};

export const LeaderboardService = {
  getAllPlayerStats,
};

// src/types/killerGame.ts

import {LEVELS} from '@/utils/constants';
import {
  CageInfo,
  GenericInitGame,
  GenericSavedGame,
} from '@sudoku/shared-types';

export type KillerLevel = (typeof LEVELS)[number];

export type KillerInitGame = GenericInitGame<
  KillerLevel,
  {
    cages: CageInfo[];
  }
>;

export type KillerSavedGame = GenericSavedGame<KillerLevel>;

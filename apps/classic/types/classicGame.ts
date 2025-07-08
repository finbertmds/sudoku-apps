// types/classicGame.ts

import {LEVELS} from '@/utils/constants';
import {GenericInitGame, GenericSavedGame} from '@sudoku/shared-types';

export type ClassicLevel = (typeof LEVELS)[number];

export type ClassicInitGame = GenericInitGame<
  ClassicLevel,
  // TODO: add savedScore
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  {
    // savedScore: number;
  }
>;

export type ClassicSavedGame = GenericSavedGame<ClassicLevel>;

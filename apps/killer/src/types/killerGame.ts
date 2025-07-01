import { LEVELS } from '@/utils/constants';
import { GenericInitGame, GenericSavedGame } from '@sudoku/shared-types';

export type KillerLevel = (typeof LEVELS)[number];

export interface Cage {
  sum: number;
  cells: [number, number][];
}

export type KillerInitGame = GenericInitGame<KillerLevel, { cages: Cage[] }>;

export type KillerSavedGame = GenericSavedGame<KillerLevel>;

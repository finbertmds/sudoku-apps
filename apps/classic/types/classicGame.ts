import { LEVELS } from '@/utils/constants';
import { GenericInitGame, GenericSavedGame } from '@sudoku/shared-types';

export type ClassicLevel = (typeof LEVELS)[number];

export type ClassicInitGame = GenericInitGame<ClassicLevel, { savedScore: number }>;

export type ClassicSavedGame = GenericSavedGame<ClassicLevel, {
  savedScore: number;
}>;
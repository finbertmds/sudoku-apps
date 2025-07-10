// boardUtil.ts

import {KillerInitGame, KillerLevel} from '@/types';
import {
  CELLS_TO_REMOVE_RANGE,
  setRandomCellsToRemoveForLevel,
  sortAreasCells,
  stringToGrid,
} from '@sudoku/shared-utils';
import {generateKillerSudoku} from 'killer-sudoku-generator';
import {Difficulty} from 'sudoku-gen/dist/types/difficulty.type';

export const generateBoard = (level: KillerLevel, id: string) => {
  setRandomCellsToRemoveForLevel(level, CELLS_TO_REMOVE_RANGE);
  const sudoku = generateKillerSudoku(level as Difficulty);

  const initGame = {
    id,
    initialBoard: stringToGrid(sudoku.puzzle),
    solvedBoard: stringToGrid(sudoku.solution),
    cages: sortAreasCells(sudoku.areas),
    savedLevel: level,
  } as KillerInitGame;

  return initGame;
};

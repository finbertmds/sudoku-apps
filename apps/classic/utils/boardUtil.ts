// boardUtil.ts
import {InitGame, Level} from '@sudoku/shared-types';
import {stringToGrid} from '@sudoku/shared-utils';
import {getSudoku} from 'sudoku-gen';
import {Difficulty} from 'sudoku-gen/dist/types/difficulty.type';

export const generateBoard = (level: Level, id: string) => {
  const board = getSudoku(level as Difficulty);

  const initGame = {
    id,
    initialBoard: stringToGrid(board.puzzle),
    solvedBoard: stringToGrid(board.solution),
    savedLevel: level,
    savedScore: 0,
  } as InitGame;

  return initGame;
};

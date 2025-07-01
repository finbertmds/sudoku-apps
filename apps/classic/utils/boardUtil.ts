// boardUtil.ts

import { ClassicInitGame } from '@/types';
import { Level } from '@sudoku/shared-types';
import { convertBoardToGrid } from '@sudoku/shared-utils';
import { Board, generate, solve } from 'sudoku-core';
import { Difficulty } from 'sudoku-gen/dist/types/difficulty.type';

export const generateBoard = (level: Level, id: string) => {
  const board = generate(level as Difficulty);
  const solvedBoard = solve(board);

  const initGame = {
    id,
    initialBoard: convertBoardToGrid(board),
    solvedBoard: convertBoardToGrid(solvedBoard.board as Board),
    savedLevel: level,
    savedScore: solvedBoard.analysis?.score ?? 0,
  } as ClassicInitGame;

  return initGame;
};
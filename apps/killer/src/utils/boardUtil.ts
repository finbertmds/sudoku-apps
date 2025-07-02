// boardUtil.ts

import {stringToGrid} from '@sudoku/shared-utils';
import {
  generateKillerSudoku,
  overrideNumberOfCellsToRemove,
} from 'killer-sudoku-generator';
import {Cage, KillerInitGame, KillerLevel} from '../types';
import {CELLS_TO_REMOVE_RANGE} from './constants';

export function sortAreasCells(areas: Cage[]): Cage[] {
  return areas.map((cage) => ({
    ...cage,
    cells: [...cage.cells].sort((a, b) => {
      if (a[0] !== b[0]) {
        // Ưu tiên hàng (row) trước
        return a[0] - b[0];
      }
      // Nếu cùng hàng, ưu tiên cột (col)
      return a[1] - b[1];
    }),
  }));
}

export const getAdjacentCellsInSameCage = (
  row: number,
  col: number,
  cages: Cage[],
) => {
  const cage = cages.find((c) =>
    c.cells.some((cell) => cell[0] === row && cell[1] === col),
  );

  if (!cage) {
    return {
      top: false,
      bottom: false,
      left: false,
      right: false,
      topleft: false,
      topright: false,
      bottomleft: false,
      bottomright: false,
    };
  }

  const top = cage.cells.some((cell) => cell[0] === row - 1 && cell[1] === col);
  const bottom = cage.cells.some(
    (cell) => cell[0] === row + 1 && cell[1] === col,
  );
  const left = cage.cells.some(
    (cell) => cell[0] === row && cell[1] === col - 1,
  );
  const right = cage.cells.some(
    (cell) => cell[0] === row && cell[1] === col + 1,
  );
  const topleft = cage.cells.some(
    (cell) => cell[0] === row - 1 && cell[1] === col - 1,
  );
  const topright = cage.cells.some(
    (cell) => cell[0] === row - 1 && cell[1] === col + 1,
  );
  const bottomleft = cage.cells.some(
    (cell) => cell[0] === row + 1 && cell[1] === col - 1,
  );
  const bottomright = cage.cells.some(
    (cell) => cell[0] === row + 1 && cell[1] === col + 1,
  );

  return {
    top,
    bottom,
    left,
    right,
    topleft,
    topright,
    bottomleft,
    bottomright,
  };
};

const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const setRandomCellsToRemoveForLevel = (level: KillerLevel) => {
  const [min, max] = CELLS_TO_REMOVE_RANGE[level];
  const randomNumber = randomBetween(min, max);
  overrideNumberOfCellsToRemove(level, randomNumber);
};

export const generateBoard = (level: KillerLevel, id: string) => {
  setRandomCellsToRemoveForLevel(level);
  const sudoku = generateKillerSudoku(level);

  const initGame = {
    id,
    initialBoard: stringToGrid(sudoku.puzzle),
    solvedBoard: stringToGrid(sudoku.solution),
    cages: sortAreasCells(sudoku.areas),
    savedLevel: level,
  } as KillerInitGame;

  return initGame;
};

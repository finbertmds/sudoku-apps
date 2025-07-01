// boardUtil.ts

import { Cage, KillerInitGame, KillerLevel } from '@/types';
import { CELLS_TO_REMOVE_RANGE } from '@/utils/constants';
import { CellValue } from '@sudoku/shared-types';
import { BOARD_SIZE, stringToGrid } from '@sudoku/shared-utils';
import {
  generateKillerSudoku,
  overrideNumberOfCellsToRemove,
} from 'killer-sudoku-generator';

export function sortAreasCells(areas: Cage[]): Cage[] {
  return areas.map(cage => ({
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
  const cage = cages.find(c =>
    c.cells.some(cell => cell[0] === row && cell[1] === col),
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

  const top = cage.cells.some(cell => cell[0] === row - 1 && cell[1] === col);
  const bottom = cage.cells.some(
    cell => cell[0] === row + 1 && cell[1] === col,
  );
  const left = cage.cells.some(cell => cell[0] === row && cell[1] === col - 1);
  const right = cage.cells.some(cell => cell[0] === row && cell[1] === col + 1);
  const topleft = cage.cells.some(
    cell => cell[0] === row - 1 && cell[1] === col - 1,
  );
  const topright = cage.cells.some(
    cell => cell[0] === row - 1 && cell[1] === col + 1,
  );
  const bottomleft = cage.cells.some(
    cell => cell[0] === row + 1 && cell[1] === col - 1,
  );
  const bottomright = cage.cells.some(
    cell => cell[0] === row + 1 && cell[1] === col + 1,
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

export const isRowFilled = (
  row: number,
  newBoard: CellValue[][],
  solvedBoard: number[][],
): boolean => {
  if (!newBoard[row]) {
    return false;
  } // Nếu dòng không tồn tại, coi như chưa filled
  for (let col = 0; col < BOARD_SIZE; col++) {
    if (!newBoard[row][col] || newBoard[row][col] !== solvedBoard[row][col]) {
      return false; // Nếu có ô nào trong dòng là 0, coi như chưa filled
    }
  }
  return true; // Nếu tất cả ô trong dòng đều khác 0, coi như đã filled
};

export const isColFilled = (
  col: number,
  newBoard: CellValue[][],
  solvedBoard: number[][],
): boolean => {
  for (let row = 0; row < BOARD_SIZE; row++) {
    if (!newBoard[row][col] || newBoard[row][col] !== solvedBoard[row][col]) {
      return false; // Nếu có ô nào trong cột là 0, coi như chưa filled
    }
  }
  return true; // Nếu tất cả ô trong cột đều khác 0, coi như đã filled
};

export function getFontSizesFromCellSize() {
  return {
    cellText: 22,
    noteText: 8,
    cageText: 9,
    noteWidth: 9,
  };
}

// useInitGame.ts

import {BoardService} from '@sudoku/shared-services';
import {CellValue} from '@sudoku/shared-types';
import {useEffect, useState} from 'react';

interface UseInitGameResult {
  solvedBoard: CellValue[][] | null;
}

export const useInitGame = (id: string): UseInitGameResult => {
  const [solvedBoard, setSolvedBoard] = useState<CellValue[][] | null>(null);

  useEffect(() => {
    const loadInitGame = async () => {
      try {
        const initGame = await BoardService.loadInit();

        if (initGame && initGame.id === id) {
          setSolvedBoard(initGame.solvedBoard);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadInitGame();
  }, [id]);

  return {
    solvedBoard,
  };
};

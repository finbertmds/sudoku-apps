// inject/initGameHandlerConfig.ts

import type {GenerateBoardFn} from '@sudoku/shared-types';

let generateBoardFn: GenerateBoardFn;

export const setupInitGameHandler = (options: {
  generateBoard: GenerateBoardFn;
}) => {
  generateBoardFn = options.generateBoard;
};

export const getGenerateBoard: GenerateBoardFn = (level, id) => {
  if (!generateBoardFn) {
    throw new Error(
      'generateBoard function not set. Call setupInitGameHandler() before using any other methods',
    );
  }
  return generateBoardFn(level, id);
};

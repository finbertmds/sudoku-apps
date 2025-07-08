// getAdUnit.base.ts

import {AdType, AppEnv} from '@sudoku/shared-types';
import {isExpoGo} from '@sudoku/shared-utils/ExpoConstantsSafe';
import {Platform} from 'react-native';

const impl: () => (type: AdType, env: AppEnv | undefined) => string =
  Platform.select({
    web: () => {
      return require('@sudoku/shared-utils/getAdUnit.web').getAdUnit;
    },
    default: () => {
      if (isExpoGo) {
        return require('@sudoku/shared-utils/getAdUnit.web').getAdUnit;
      } else {
        // TODO: to run on web, change to .web
        return require('@sudoku/shared-utils/getAdUnit.native').getAdUnit;
      }
    },
  });

export const getAdUnitBase = impl();

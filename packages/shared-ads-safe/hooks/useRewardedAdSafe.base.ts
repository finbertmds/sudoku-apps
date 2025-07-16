// hooks/useRewardedAdSafe.base.ts

import {AppEnv} from '@sudoku/shared-types';
import {isExpoGo} from '@sudoku/shared-utils/ExpoConstantsSafe';
import {Platform} from 'react-native';

const impl: () => (env: AppEnv) => any = Platform.select({
  web: () => {
    const mod = require('./useRewardedAdSafe.web');
    return mod.useRewardedAdSafe;
  },
  default: () => {
    if (isExpoGo) {
      const mod = require('./useRewardedAdSafe.web');
      return mod.useRewardedAdSafe;
    } else {
      // TODO: to run on web, change to .web
      const mod = require('./useRewardedAdSafe.native');
      return mod.useRewardedAdSafe;
    }
  },
});

export const useRewardedAdSafe = impl();

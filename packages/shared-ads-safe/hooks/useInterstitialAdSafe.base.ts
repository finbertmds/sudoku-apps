// hooks/useInterstitialAdSafe.base.ts

import {AppEnv} from '@sudoku/shared-types';
import {isExpoGo} from '@sudoku/shared-utils/ExpoConstantsSafe';
import {Platform} from 'react-native';

const impl: () => (env: AppEnv) => any = Platform.select({
  web: () => {
    const mod = require('./useInterstitialAdSafe.web');
    return mod.useInterstitialAdSafe;
  },
  default: () => {
    if (isExpoGo) {
      const mod = require('./useInterstitialAdSafe.web');
      return mod.useInterstitialAdSafe;
    } else {
      // TODO: to run on web, change to .web
      const mod = require('./useInterstitialAdSafe.web');
      return mod.useInterstitialAdSafe;
    }
  },
});

export const useInterstitialAdSafe = impl();

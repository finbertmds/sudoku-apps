// hooks/useInterstitialAdSafe.base.ts

import {AppEnv} from '@sudoku/shared-types';
import {isExpoGo} from '@sudoku/shared-utils/ExpoConstantsSafe';
import {Platform} from 'react-native';

const impl: () => (env: AppEnv) => any = Platform.select({
  web: () => {
    console.log('ad use useInterstitialAdSafe.web');
    const mod = require('./useInterstitialAdSafe.web');
    return mod.useInterstitialAdSafe;
  },
  default: () => {
    if (isExpoGo) {
      console.log('ad use useInterstitialAdSafe.web expo go');
      const mod = require('./useInterstitialAdSafe.web');
      return mod.useInterstitialAdSafe;
    } else {
      // TODO: to run on web, change to .web
      console.log('ad use useInterstitialAdSafe.native');
      const mod = require('./useInterstitialAdSafe.native');
      return mod.useInterstitialAdSafe;
    }
  },
});

export const useInterstitialAdSafe = impl();

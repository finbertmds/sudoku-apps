// useInterstitialAdSafe.base.ts

import {isExpoGo} from '@sudoku/shared-utils/ExpoConstantsSafe';
import {Platform} from 'react-native';

const impl: () => (adUnitId: string) => any = Platform.select({
  web: () => {
    return require('@sudoku/shared-hooks/useInterstitialAdSafe.web')
      .useInterstitialAdSafe;
  },
  default: () => {
    if (isExpoGo) {
      return require('@sudoku/shared-hooks/useInterstitialAdSafe.web')
        .useInterstitialAdSafe;
    } else {
      // TODO: to run on web, change to .web
      return require('@sudoku/shared-hooks/useInterstitialAdSafe.native')
        .useInterstitialAdSafe;
    }
  },
});

export const useInterstitialAdSafeBase = impl();

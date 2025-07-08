// useInterstitialAdSafe.web.ts

import {AppEnv} from '@sudoku/shared-types';

export function useInterstitialAdSafe(env: AppEnv) {
  return {
    isLoaded: false,
    isEarnedReward: false,
    isClosed: false,
    load: () => {},
    show: () => {},
  };
}

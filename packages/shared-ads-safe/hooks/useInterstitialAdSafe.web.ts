// hooks/useInterstitialAdSafe.web.ts

import {AppEnv} from '@sudoku/shared-types';

const useInterstitialAdSafe = (env: AppEnv) => {
  return {
    isLoaded: false,
    isEarnedReward: false,
    isClosed: false,
    load: () => {},
    show: () => {},
  };
};

export {useInterstitialAdSafe};

// useRewardedAdSafe.web.ts

import {AppEnv} from '@sudoku/shared-types';

export function useRewardedAdSafe(env: AppEnv) {
  return {
    isLoaded: false,
    isEarnedReward: false,
    isClosed: false,
    load: () => {},
    show: () => {},
  };
}

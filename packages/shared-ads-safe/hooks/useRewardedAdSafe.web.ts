// hooks/useRewardedAdSafe.web.ts

import {AppEnv} from '@sudoku/shared-types';

const useRewardedAdSafe = (env: AppEnv) => {
  return {
    isLoaded: false,
    isEarnedReward: false,
    isClosed: false,
    load: () => {},
    show: () => {},
  };
};

export {useRewardedAdSafe};

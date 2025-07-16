// hooks/useRewardedAdSafe.native.ts

import {AppEnv} from '@sudoku/shared-types';
import {AD_TYPE} from '@sudoku/shared-utils/constants';
import {useRewardedAd} from 'react-native-google-mobile-ads';
import {AD_REQUEST_OPTIONS} from '../utils/constants';
import {getAdUnit} from '../utils/getAdUnit.native';

const useRewardedAdSafe = (env: AppEnv) => {
  const adUnit = getAdUnit(AD_TYPE.REWARDED, env);
  return useRewardedAd(adUnit, AD_REQUEST_OPTIONS);
};

export {useRewardedAdSafe};

// hooks/useInterstitialAdSafe.native.ts

import {AppEnv} from '@sudoku/shared-types';
import {AD_TYPE} from '@sudoku/shared-utils/constants';
import {useInterstitialAd} from 'react-native-google-mobile-ads';
import {AD_REQUEST_OPTIONS} from '../utils/constants';
import {getAdUnit} from '../utils/getAdUnit.native';

const useInterstitialAdSafe = (env: AppEnv) => {
  const adUnit = getAdUnit(AD_TYPE.INTERSTITIAL, env);

  return useInterstitialAd(adUnit, AD_REQUEST_OPTIONS);
};

export {useInterstitialAdSafe};

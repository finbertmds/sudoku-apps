// utils/getAdUnit.native.ts

import {AdType, AppEnv} from '@sudoku/shared-types';
import {Platform} from 'react-native';
import {TestIds} from 'react-native-google-mobile-ads';

const DEV_AD_UNITS: Record<AdType, string> = {
  banner: TestIds.BANNER,
  interstitial: TestIds.INTERSTITIAL,
  rewarded: TestIds.REWARDED,
  rewardedInterstitial: TestIds.REWARDED_INTERSTITIAL,
};

const getAdUnit = (type: AdType, env: AppEnv | undefined): string => {
  if (__DEV__ || !env) {
    return DEV_AD_UNITS[type];
  }

  const prodAdUnitsIOS: Record<AdType, string> = {
    banner: env.AD_UNIT_BANNER_IOS,
    interstitial: env.AD_UNIT_INTERSTITIAL_IOS,
    rewarded: env.AD_UNIT_REWARDED_IOS,
    rewardedInterstitial: env.AD_UNIT_REWARDED_I_IOS,
  };

  const prodAdUnitsAndroid: Record<AdType, string> = {
    banner: env.AD_UNIT_BANNER_ANDROID,
    interstitial: env.AD_UNIT_INTERSTITIAL_ANDROID,
    rewarded: env.AD_UNIT_REWARDED_ANDROID,
    rewardedInterstitial: env.AD_UNIT_REWARDED_I_ANDROID,
  };

  const platformUnits =
    Platform.OS === 'ios' ? prodAdUnitsIOS : prodAdUnitsAndroid;

  return platformUnits[type];
};

export {getAdUnit};

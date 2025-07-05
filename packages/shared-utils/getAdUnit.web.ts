// getAdUnit.web.ts

import {AdType, AppEnv} from '@sudoku/shared-types';

const DEV_AD_UNITS: Record<AdType, string> = {
  banner: '',
  interstitial: '',
  rewarded: '',
  rewardedInterstitial: '',
};

export function getAdUnit(type: AdType, env: AppEnv | undefined): string {
  return DEV_AD_UNITS[type];
}

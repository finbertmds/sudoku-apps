// getAdUnit.web.ts

import {AppEnv} from '@/env';
import {AdType} from '@sudoku/shared-types';

const DEV_AD_UNITS: Record<AdType, string> = {
  banner: '',
  interstitial: '',
  rewarded: '',
};

export function getAdUnit(type: AdType, env: AppEnv | undefined): string {
  return DEV_AD_UNITS[type];
}

// useRewardedAdSafe.native.ts

import {useRewardedAd} from 'react-native-google-mobile-ads';
import {AD_REQUEST_OPTIONS} from './useInterstitialAdSafe.native';

export function useRewardedAdSafe(adUnitId: string) {
  return useRewardedAd(adUnitId, AD_REQUEST_OPTIONS);
}

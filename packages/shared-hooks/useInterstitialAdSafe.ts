// useInterstitialAdSafe.ts

import {Platform} from 'react-native';
import {AdHookReturns} from 'react-native-google-mobile-ads/src/types/AdStates';

export const useInterstitialAdSafe: (
  adUnitId: string,
) => Omit<AdHookReturns, 'reward' | 'isEarnedReward'> =
  Platform.OS === 'web'
    ? require('./useInterstitialAdSafe.web').useInterstitialAdSafe
    : require('./useInterstitialAdSafe.native').useInterstitialAdSafe;

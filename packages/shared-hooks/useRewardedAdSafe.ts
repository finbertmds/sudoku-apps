// useRewardedAdSafe.ts

import {Platform} from 'react-native';
import {AdHookReturns} from 'react-native-google-mobile-ads/src/types/AdStates';

export const useRewardedAdSafe: (
  adUnitId: string,
) => Omit<AdHookReturns, 'reward' | 'isEarnedReward'> =
  Platform.OS === 'web'
    ? require('./useRewardedAdSafe.web').useRewardedAdSafe
    : require('./useRewardedAdSafe.native').useRewardedAdSafe;

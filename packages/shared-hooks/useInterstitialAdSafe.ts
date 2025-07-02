// useInterstitialAdSafe.ts

import {Platform} from 'react-native';

export const useInterstitialAdSafe =
  Platform.OS === 'web'
    ? require('./useInterstitialAdSafe.web').useInterstitialAdSafe
    : require('./useInterstitialAdSafe.native').useInterstitialAdSafe;

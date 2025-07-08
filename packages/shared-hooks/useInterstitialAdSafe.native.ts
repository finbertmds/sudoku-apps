// useInterstitialAdSafe.native.ts

import {AppEnv} from '@sudoku/shared-types';
import {AD_TYPE} from '@sudoku/shared-utils/constants';
import {getAdUnit} from '@sudoku/shared-utils/getAdUnit.native';
import {
  RequestOptions,
  useInterstitialAd,
} from 'react-native-google-mobile-ads';

export const AD_REQUEST_OPTIONS: RequestOptions = {
  requestNonPersonalizedAdsOnly: true,
  keywords: [
    // Sudoku
    'puzzle',
    'brain',
    'logic',
    'math',
    'killer sudoku',
    'sudoku',
    'mental training',
    // Education
    'education',
    'learning',
    'study',
    'student',
    'cognitive skills',
    'e-learning',
    'mental math',
    // Language
    'language learning',
    'English',
    'Japanese',
    'vocabulary',
    'grammar',
    // Mindfulness
    'focus',
    'meditation',
    'calm',
    'relaxation',
    'mental health',
    'wellness',
    // Sports
    'sports',
    'exercise',
    'fitness',
    'health',
    'yoga',
  ],
};

export function useInterstitialAdSafe(env: AppEnv) {
  const adUnit = getAdUnit(AD_TYPE.INTERSTITIAL, env);

  return useInterstitialAd(adUnit, AD_REQUEST_OPTIONS);
}

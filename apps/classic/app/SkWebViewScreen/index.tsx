// SkWebViewScreen/index.tsx

import {WebViewBase} from '@sudoku/shared-components';
import {SkWebViewParamProps} from '@sudoku/shared-types';
import {useLocalSearchParams} from 'expo-router';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Platform} from 'react-native';

export default function SkWebViewScreen() {
  const {t} = useTranslation();

  const rawParams = useLocalSearchParams();
  const {title, type, needPadding} =
    rawParams as unknown as SkWebViewParamProps;

  const licensesSource =
    Platform.OS === 'android'
      ? {uri: 'file:///android_asset/licenses.html'}
      : Platform.OS === 'ios'
        ? require('@/assets/htmls/licenses.html')
        : '/assets/assets/htmls/licenses.html';

  const privacyPolicySource =
    Platform.OS === 'android'
      ? {uri: 'file:///android_asset/privacypolicy.html'}
      : Platform.OS === 'ios'
        ? require('@/assets/htmls/privacypolicy.html')
        : '/assets/assets/htmls/privacypolicy.html';

  const termsSource =
    Platform.OS === 'android'
      ? {uri: 'file:///android_asset/terms.html'}
      : Platform.OS === 'ios'
        ? require('@/assets/htmls/terms.html')
        : '/assets/assets/htmls/terms.html';

  const getSource = () => {
    switch (type) {
      case 'licenses':
        return licensesSource;
      case 'privacy':
        return privacyPolicySource;
      case 'terms':
        return termsSource;
    }
  };

  return (
    <WebViewBase
      title={t(title)}
      source={getSource()}
      needPadding={needPadding}
    />
  );
}

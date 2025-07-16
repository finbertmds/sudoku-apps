// components/BannerAdSafe.native.tsx

import {useSafeAreaInsetsSafe} from '@sudoku/shared-hooks';
import {useTheme} from '@sudoku/shared-themes';
import {NativeAdSafeProps} from '@sudoku/shared-types';
import {AD_TYPE, BANNER_HEIGHT} from '@sudoku/shared-utils/constants';
import {useRef} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {
  BannerAd,
  BannerAdSize,
  useForeground,
} from 'react-native-google-mobile-ads';
import {AD_REQUEST_OPTIONS} from '../utils/constants';
import {getAdUnit} from '../utils/getAdUnit.native';

const BannerAdSafe = ({env}: NativeAdSafeProps) => {
  const {theme} = useTheme();
  const insets = useSafeAreaInsetsSafe();
  const bannerRef = useRef<BannerAd>(null);
  const bannerId = getAdUnit(AD_TYPE.BANNER, env);

  useForeground(() => {
    if (Platform.OS === 'ios' && bannerRef?.current?.load) {
      bannerRef.current.load();
    }
  });

  if (!env || !bannerId) {
    return null;
  }

  return (
    <View
      style={[
        styles.adContainer,
        {
          height: BANNER_HEIGHT,
          bottom: insets.bottom,
          backgroundColor: theme.background,
        },
      ]}>
      <BannerAd
        ref={bannerRef}
        unitId={bannerId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={AD_REQUEST_OPTIONS}
        onAdLoaded={() => {
          console.log('BannerAd loaded');
        }}
        onAdFailedToLoad={(error) => {
          console.log('BannerAd failed to load', JSON.stringify(error));
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  adContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
  },
});

export {BannerAdSafe};

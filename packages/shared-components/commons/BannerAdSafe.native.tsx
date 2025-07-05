// commons/BannerAdSafe.native.tsx

import {useSafeAreaInsetsSafe} from '@sudoku/shared-hooks';
import {AD_REQUEST_OPTIONS} from '@sudoku/shared-hooks/useInterstitialAdSafe.native';
import {useTheme} from '@sudoku/shared-themes';
import {AppEnv} from '@sudoku/shared-types';
import {getAdUnit} from '@sudoku/shared-utils/getAdUnit';
import {useRef} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {
  BannerAd,
  BannerAdSize,
  useForeground,
} from 'react-native-google-mobile-ads';

type BannerAdSafeProps = {
  env?: AppEnv;
};

export const BannerAdSafe = ({env}: BannerAdSafeProps) => {
  const {theme} = useTheme();
  const insets = useSafeAreaInsetsSafe();
  const bannerRef = useRef<BannerAd>(null);
  const bannerId = getAdUnit('banner', env);

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
          bottom: insets.bottom,
          backgroundColor: theme.background,
        },
      ]}>
      <BannerAd
        ref={bannerRef}
        unitId={bannerId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={AD_REQUEST_OPTIONS}
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

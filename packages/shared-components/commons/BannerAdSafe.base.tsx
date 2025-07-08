// commons/BannerAdSafe.base.tsx

import {NativeAdSafeProps} from '@sudoku/shared-types';
import {isExpoGo} from '@sudoku/shared-utils/ExpoConstantsSafe';
import {Platform} from 'react-native';

const impl: () => (props: NativeAdSafeProps) => any = Platform.select({
  web: () => {
    return require('@sudoku/shared-components/commons/BannerAdSafe.web')
      .BannerAdSafe;
  },
  default: () => {
    if (isExpoGo) {
      return require('@sudoku/shared-components/commons/BannerAdSafe.web')
        .BannerAdSafe;
    } else {
      // TODO: to run on web, change to .web
      return require('@sudoku/shared-components/commons/BannerAdSafe.native')
        .BannerAdSafe;
    }
  },
});

export const BannerAdSafeBase = impl();

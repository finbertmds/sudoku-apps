// components/BannerAdSafe.base.tsx

import {NativeAdSafeProps} from '@sudoku/shared-types';
import {isExpoGo} from '@sudoku/shared-utils/ExpoConstantsSafe';
import {Platform} from 'react-native';

const impl: () => (props: NativeAdSafeProps) => any = Platform.select({
  web: () => {
    const mod = require('./BannerAdSafe.web');
    return mod.BannerAdSafe;
  },
  default: () => {
    if (isExpoGo) {
      const mod = require('./BannerAdSafe.web');
      return mod.BannerAdSafe;
    } else {
      // TODO: to run on web, change to .web
      const mod = require('./BannerAdSafe.web');
      return mod.BannerAdSafe;
    }
  },
});

export const BannerAdSafe = impl();

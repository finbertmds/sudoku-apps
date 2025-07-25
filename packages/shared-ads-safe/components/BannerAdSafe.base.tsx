// components/BannerAdSafe.base.tsx

import {NativeAdSafeProps} from '@sudoku/shared-types';
import {isExpoGo} from '@sudoku/shared-utils/ExpoConstantsSafe';
import {Platform} from 'react-native';

const impl: () => (props: NativeAdSafeProps) => any = Platform.select({
  web: () => {
    console.log('ad use BannerAdSafe.web');
    const mod = require('./BannerAdSafe.web');
    return mod.BannerAdSafe;
  },
  default: () => {
    if (isExpoGo) {
      console.log('ad use BannerAdSafe.web expo go');
      const mod = require('./BannerAdSafe.web');
      return mod.BannerAdSafe;
    } else {
      // TODO: to run on web, change to .web
      console.log('ad use BannerAdSafe.native');
      const mod = require('./BannerAdSafe.native');
      return mod.BannerAdSafe;
    }
  },
});

export const BannerAdSafe = impl();

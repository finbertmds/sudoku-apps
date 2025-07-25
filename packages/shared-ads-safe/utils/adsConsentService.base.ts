// utils/adsConsentService.base.ts

import {isExpoGo} from '@sudoku/shared-utils/ExpoConstantsSafe';
import {Platform} from 'react-native';

const impl: () => () => Promise<string | null> = Platform.select({
  web: () => {
    console.log('ad use adsConsentService.web');
    const mod = require('./adsConsentService.web');
    return mod.checkAndRequestAdsConsent;
  },
  default: () => {
    if (isExpoGo) {
      console.log('ad use adsConsentService.web expo go');
      const mod = require('./adsConsentService.web');
      return mod.checkAndRequestAdsConsent;
    } else {
      // TODO: to run on web, change to .web
      console.log('ad use adsConsentService.native');
      const mod = require('./adsConsentService.native');
      return mod.checkAndRequestAdsConsent;
    }
  },
});

export const checkAndRequestAdsConsent = impl();

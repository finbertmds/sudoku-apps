// utils/getAdUnit.base.ts

import {AdType, AppEnv} from '@sudoku/shared-types';
import {isExpoGo} from '@sudoku/shared-utils/ExpoConstantsSafe';
import {Platform} from 'react-native';

const impl: () => (type: AdType, env: AppEnv | undefined) => string =
  Platform.select({
    web: () => {
      console.log('ad use getAdUnit.web');
      const mod = require('./getAdUnit.web');
      return mod.getAdUnit;
    },
    default: () => {
      if (isExpoGo) {
        console.log('ad use getAdUnit.web expo go');
        const mod = require('./getAdUnit.web');
        return mod.getAdUnit;
      } else {
        // TODO: to run on web, change to .web
        console.log('ad use getAdUnit.native');
        const mod = require('./getAdUnit.native');
        return mod.getAdUnit;
      }
    },
  });

export const getAdUnit = impl();

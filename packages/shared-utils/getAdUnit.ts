// getAdUnit.ts

import {AdType, AppEnv} from '@sudoku/shared-types';
import {Platform} from 'react-native';

export const getAdUnit: (type: AdType, env: AppEnv | undefined) => string =
  Platform.OS === 'web'
    ? require('./getAdUnit.web').getAdUnit
    : require('./getAdUnit.native').getAdUnit;

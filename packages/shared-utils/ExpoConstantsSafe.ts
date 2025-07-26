// ExpoConstantsSafe.ts

import {AppId} from '@sudoku/shared-types';
import {CLASSIC_APP_ID, KILLER_APP_ID} from '@sudoku/shared-utils/constants';

let Constants: any;
let appVariant: AppId | null = null;

try {
  const expoConstants = require('expo-constants');
  Constants = expoConstants.default ?? expoConstants;
  appVariant = Constants?.expoConfig?.extra?.APP_VARIANT || CLASSIC_APP_ID;
} catch (error) {
  Constants = {
    manifest: null,
    expoConfig: null,
    appOwnership: null,
  };
  appVariant = (process.env.APP_VARIANT as AppId) || KILLER_APP_ID;
}

const isExpo = appVariant === CLASSIC_APP_ID;

const isExpoGo = Constants.appOwnership === 'expo';

export {appVariant, isExpo, isExpoGo};

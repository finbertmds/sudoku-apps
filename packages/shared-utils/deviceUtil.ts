// deviceUtil.ts

import {isExpoGo} from '@sudoku/shared-utils/ExpoConstantsSafe';
import {NativeModules, Platform} from 'react-native';

let isTabletFn = () => false;

const isWeb = typeof window !== 'undefined' && Platform.OS === 'web';

if (!isWeb) {
  try {
    if (isExpoGo) {
      const Device = require('expo-device');
      isTabletFn = () => Device?.deviceType === Device?.DeviceType?.TABLET;
    } else {
      const DeviceInfo = require('react-native-device-info');
      isTabletFn = () => DeviceInfo.isTablet?.();
    }
  } catch (_) {}
}

const isMMKVAvailable = () => {
  let isAvailable = false;
  try {
    if (Platform.OS === 'web') {
      isAvailable = false;
    } else {
      if (isExpoGo) {
        isAvailable = false;
      } else {
        isAvailable = typeof NativeModules.MMKVStorage !== 'undefined';
      }
    }
  } catch (_) {
    isAvailable = false;
  }
  return isAvailable;
};

const DeviceUtil = {
  isTablet: isTabletFn,
  isWeb,
  isMMKVAvailable,
};

export {DeviceUtil};

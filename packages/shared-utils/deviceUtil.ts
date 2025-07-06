// deviceUtil.ts

import {isExpoGo} from '@sudoku/shared-utils/ExpoConstantsSafe';
import {NativeModules, Platform} from 'react-native';

let isTabletFn = () => false;

if (Platform.OS === 'web') {
  isTabletFn = () => false;
} else {
  if (isExpoGo) {
    const Device = require('expo-device');
    isTabletFn = () => Device?.deviceType === Device?.DeviceType?.TABLET;
  } else {
    try {
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        const DeviceInfo = require('react-native-device-info').default;
        isTabletFn = () => DeviceInfo.isTablet();
      }
    } catch (_) {}
  }
}

const isWeb = Platform.OS === 'web';

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

export const DeviceUtil = {
  isTablet: isTabletFn,
  isWeb,
  isMMKVAvailable,
};

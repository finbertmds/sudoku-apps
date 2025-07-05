// deviceUtil.ts

import Constants from 'expo-constants';
import {NativeModules, Platform} from 'react-native';

let isTabletFn = () => false;

const isExpo =
  Platform.OS === 'web' || Constants.expoConfig?.extra?.IS_EXPO_APP === true;

if (Platform.OS === 'web') {
  isTabletFn = () => false;
} else {
  if (isExpo) {
    const Device = require('expo-device');
    isTabletFn = () => Device?.deviceType === Device?.DeviceType?.TABLET;
  } else {
    try {
      // if (Platform.OS === 'ios' || Platform.OS === 'android') {
      //   const DeviceInfo = require('react-native-device-info').default;
      //   isTabletFn = () => DeviceInfo.isTablet();
      // }
    } catch (_) {}
  }
}

const isWeb = Platform.OS === 'web';

const isMMKVAvailable = () => {
  try {
    return !!NativeModules.MMKVStorage;
  } catch (_) {
    return false;
  }
};

export const DeviceUtil = {
  isTablet: isTabletFn,
  isWeb,
  isMMKVAvailable,
};

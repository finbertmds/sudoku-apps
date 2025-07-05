// deviceUtil.ts

import {Platform} from 'react-native';

let isTabletFn = () => false;

if (Platform.OS === 'web') {
  isTabletFn = () => false;
} else {
  try {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      const DeviceInfo = require('react-native-device-info').default;
      isTabletFn = () => DeviceInfo.isTablet();
    }
  } catch (e) {
    try {
      const Device = require('expo-device');
      isTabletFn = () => Device?.deviceType === Device?.DeviceType?.TABLET;
    } catch (_) {}
  }
}

const isWeb = Platform.OS === 'web';

export const DeviceUtil = {
  isTablet: isTabletFn,
  isWeb,
};

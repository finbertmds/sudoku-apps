// deviceUtil.ts

import {Platform} from 'react-native';

let isTabletFn = () => false;

// TODO: Web is always tablet
if (Platform.OS === 'web') {
  isTabletFn = () => true;
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

export const DeviceUtil = {
  isTablet: isTabletFn,
};

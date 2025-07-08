import {
  AD_UNIT_BANNER_ANDROID,
  AD_UNIT_BANNER_IOS,
  AD_UNIT_INTERSTITIAL_ANDROID,
  AD_UNIT_INTERSTITIAL_IOS,
  AD_UNIT_REWARDED_ANDROID,
  AD_UNIT_REWARDED_I_ANDROID,
  AD_UNIT_REWARDED_I_IOS,
  AD_UNIT_REWARDED_IOS,
  UNSPLASH_ACCESS_KEY,
} from '@env';
import {AppEnv} from '@sudoku/shared-types';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const appConfig = {
  iosAppId: '6746165333',
  androidPackageName: DeviceInfo.getBundleId(),
  developerMail: 'finbertngo@gmail.com',
  version: DeviceInfo.getVersion(),
  buildNumber: DeviceInfo.getBuildNumber(),
  getStoreUrl: () =>
    Platform.select({
      ios: `https://apps.apple.com/app/id${appConfig.iosAppId}`,
      android: `https://play.google.com/store/apps/details?id=${appConfig.androidPackageName}`,
    }),
  supportUrl: 'https://buymeacoffee.com/finbertngo',
};

export const env: AppEnv = {
  UNSPLASH_ACCESS_KEY: UNSPLASH_ACCESS_KEY,
  AD_UNIT_REWARDED_I_ANDROID: AD_UNIT_REWARDED_I_ANDROID,
  AD_UNIT_BANNER_ANDROID: AD_UNIT_BANNER_ANDROID,
  AD_UNIT_BANNER_IOS: AD_UNIT_BANNER_IOS,
  AD_UNIT_INTERSTITIAL_ANDROID: AD_UNIT_INTERSTITIAL_ANDROID,
  AD_UNIT_REWARDED_I_IOS: AD_UNIT_REWARDED_I_IOS,
  AD_UNIT_INTERSTITIAL_IOS: AD_UNIT_INTERSTITIAL_IOS,
  AD_UNIT_REWARDED_ANDROID: AD_UNIT_REWARDED_ANDROID,
  AD_UNIT_REWARDED_IOS: AD_UNIT_REWARDED_IOS,
  iosAppId: appConfig.iosAppId,
  androidPackageName: appConfig.androidPackageName,
};

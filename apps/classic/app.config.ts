import 'dotenv/config';
import {ConfigContext, ExpoConfig} from 'expo/config';
import version from './version.json';

export default ({config}: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'sudoku-classic',
  slug: 'sudoku-classic',
  version: version.version,
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'sudokuclassic',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.finbertngo.sudokuclassic',
    config: {
      googleMobileAdsAppId: process.env.AD_APP_ID_IOS,
    },
    infoPlist: {
      CFBundleLocalizations: ['en', 'vi', 'ja'],
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    edgeToEdgeEnabled: true,
    package: 'com.finbertngo.sudokuclassic',
    config: {
      googleMobileAdsAppId: process.env.AD_APP_ID_ANDROID,
    },
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
    [
      'react-native-google-mobile-ads',
      {
        iosAppId: process.env.AD_APP_ID_IOS,
        androidAppId: process.env.AD_APP_ID_ANDROID,
      },
    ],
    'expo-localization',
    [
      'expo-build-properties',
      {
        android: {
          minSdkVersion: 24,
          compileSdkVersion: 35,
          targetSdkVersion: 35,
          buildToolsVersion: '35.0.0',
          usesCleartextTraffic: true,
        },
        ios: {
          useFrameworks: 'static',
          deploymentTarget: '15.1',
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
    AD_APP_ID_IOS: process.env.AD_APP_ID_IOS,
    AD_UNIT_BANNER_IOS: process.env.AD_UNIT_BANNER_IOS,
    AD_UNIT_INTERSTITIAL_IOS: process.env.AD_UNIT_INTERSTITIAL_IOS,
    AD_UNIT_REWARDED_IOS: process.env.AD_UNIT_REWARDED_IOS,
    AD_UNIT_REWARDED_I_IOS: process.env.AD_UNIT_REWARDED_I_IOS,
    AD_APP_ID_ANDROID: process.env.AD_APP_ID_ANDROID,
    AD_UNIT_BANNER_ANDROID: process.env.AD_UNIT_BANNER_ANDROID,
    AD_UNIT_INTERSTITIAL_ANDROID: process.env.AD_UNIT_INTERSTITIAL_ANDROID,
    AD_UNIT_REWARDED_ANDROID: process.env.AD_UNIT_REWARDED_ANDROID,
    AD_UNIT_REWARDED_I_ANDROID: process.env.AD_UNIT_REWARDED_I_ANDROID,
    eas: {
      projectId: 'c2f9c7ae-a02f-4fbb-a814-c23d60bfc51e',
    },
  },
});

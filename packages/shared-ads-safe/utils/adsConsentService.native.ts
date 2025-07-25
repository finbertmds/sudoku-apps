// utils/adsConsentService.native.ts

import {Platform} from 'react-native';
import {
  AdsConsent,
  AdsConsentDebugGeography,
  AdsConsentStatus,
} from 'react-native-google-mobile-ads';

const checkAndRequestAdsConsent =
  async (): Promise<AdsConsentStatus | null> => {
    if (Platform.OS === 'web') return null;

    try {
      // Bước 1: Yêu cầu update thông tin consent
      const consentInfo = await AdsConsent.requestInfoUpdate({
        debugGeography: __DEV__ ? AdsConsentDebugGeography.EEA : undefined,
        tagForUnderAgeOfConsent: false,
      });

      console.log('ad use consentInfo', consentInfo);

      if (
        consentInfo.status === AdsConsentStatus.NOT_REQUIRED ||
        consentInfo.status === AdsConsentStatus.OBTAINED
      ) {
        return consentInfo.status;
      }

      // Bước 2: Nếu cần hiển thị form
      if (consentInfo.isConsentFormAvailable) {
        const consentResult = await AdsConsent.showForm();
        console.log('ad use consentResult', consentResult);
        return consentResult.status;
      }

      return consentInfo.status;
    } catch (e) {
      console.warn('Consent check failed:', e);
      return null;
    }
  };

export {checkAndRequestAdsConsent};

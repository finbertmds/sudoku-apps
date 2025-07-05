// i18n.ts

import {LANGUAGES} from '@/utils/constants';
import {appStorage} from '@sudoku/shared-storages';
import * as Localization from 'expo-localization';
import i18n, {changeLanguage} from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './locales/en.json';
import ja from './locales/ja.json';
import vi from './locales/vi.json';

const resources = {
  en: {translation: en},
  vi: {translation: vi},
  ja: {translation: ja},
};

const fallback = {languageTag: LANGUAGES[0].code};
const getBestLanguage = () => {
  const deviceLanguage = Localization.getLocales()[0].languageCode; // ví dụ: 'en', 'vi', 'ja'

  const matched = LANGUAGES.find((l) => l.code === deviceLanguage);
  return matched?.code || fallback.languageTag;
};

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: getBestLanguage(),
  fallbackLng: fallback.languageTag,
  interpolation: {
    escapeValue: false,
  },
});

/**
 * Auto-detects the system language and updates the i18n language if it differs from the stored language.
 * Also updates the stored language in AsyncStorage.
 */
export const autoDetectLanguage = async () => {
  try {
    const systemLang = getBestLanguage();
    const oldLanguage = await appStorage.getLangKeyDefault();

    if (systemLang !== oldLanguage) {
      changeLanguage(systemLang);
      await appStorage.saveLangKeyDefault(systemLang);
      await appStorage.saveLangKeyPreferred(systemLang);
      return systemLang;
    }

    const preferedLanguage = await appStorage.getLangKeyPreferred();
    if (preferedLanguage) {
      changeLanguage(preferedLanguage);
    }

    return preferedLanguage;
  } catch (_) {}
};

export const getLanguage = async () => {
  try {
    const systemLang = getBestLanguage();
    const oldLanguage = await appStorage.getLangKeyDefault();

    if (systemLang !== oldLanguage) {
      return systemLang;
    }

    const preferedLanguage = await appStorage.getLangKeyPreferred();
    return preferedLanguage || systemLang || fallback.languageTag;
  } catch (_) {}
};

export default i18n;

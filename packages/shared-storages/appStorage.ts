// appStorage.ts

import {storage} from '@sudoku/shared-storages';
import {AppSettings, DailyBackgrounds, DailyQuotes} from '@sudoku/shared-types';
import {
  STORAGE_KEY_BACKGROUNDS,
  STORAGE_KEY_HAS_PLAYED,
  STORAGE_KEY_LANG_KEY_DEFAULT,
  STORAGE_KEY_LANG_KEY_PREFERRED,
  STORAGE_KEY_LAST_APP_VERSION_KEY,
  STORAGE_KEY_MIGRATION_VERSION,
  STORAGE_KEY_QUOTES,
  STORAGE_KEY_SETTINGS,
} from '@sudoku/shared-utils';

// STORAGE_KEY_LANG_KEY_DEFAULT
const getLangKeyDefault = async (): Promise<string | null> => {
  try {
    return (await storage.getString(STORAGE_KEY_LANG_KEY_DEFAULT)) || null;
  } catch (_) {
    return null;
  }
};

const saveLangKeyDefault = async (key: string) => {
  try {
    await storage.set(STORAGE_KEY_LANG_KEY_DEFAULT, key);
  } catch (_) {}
};

const clearLangKeyDefault = async () => {
  try {
    await storage.delete(STORAGE_KEY_LANG_KEY_DEFAULT);
  } catch (_) {}
};

// STORAGE_KEY_LANG_KEY_PREFERRED
const getLangKeyPreferred = async (): Promise<string | null> => {
  try {
    return (await storage.getString(STORAGE_KEY_LANG_KEY_PREFERRED)) || null;
  } catch (_) {
    return null;
  }
};

const saveLangKeyPreferred = async (key: string) => {
  try {
    await storage.set(STORAGE_KEY_LANG_KEY_PREFERRED, key);
  } catch (_) {}
};

const clearLangKeyPreferred = async () => {
  try {
    await storage.delete(STORAGE_KEY_LANG_KEY_PREFERRED);
  } catch (_) {}
};

// STORAGE_KEY_SETTINGS
const getSettings = async (): Promise<AppSettings | null> => {
  try {
    const json = await storage.getString(STORAGE_KEY_SETTINGS);
    return json ? JSON.parse(json as string) : null;
  } catch (_) {
    return null;
  }
};

const setSettings = async (data: AppSettings) => {
  try {
    await storage.set(STORAGE_KEY_SETTINGS, JSON.stringify(data));
  } catch (_) {}
};

const clearSettings = async () => {
  try {
    await storage.delete(STORAGE_KEY_SETTINGS);
  } catch (_) {}
};

// STORAGE_KEY_BACKGROUNDS
const getBackgrounds = async (): Promise<DailyBackgrounds | null> => {
  try {
    const json = await storage.getString(STORAGE_KEY_BACKGROUNDS);
    return json ? JSON.parse(json) : null;
  } catch (_) {
    return null;
  }
};

const setBackgrounds = async (data: DailyBackgrounds) => {
  try {
    await storage.set(STORAGE_KEY_BACKGROUNDS, JSON.stringify(data));
  } catch (_) {}
};

const clearBackgrounds = async () => {
  try {
    await storage.delete(STORAGE_KEY_BACKGROUNDS);
  } catch (_) {}
};

// STORAGE_KEY_QUOTES
const getQuotes = async (): Promise<DailyQuotes | null> => {
  try {
    const json = await storage.getString(STORAGE_KEY_QUOTES);
    return json ? JSON.parse(json) : null;
  } catch (_) {
    return null;
  }
};

const setQuotes = async (data: DailyQuotes) => {
  try {
    await storage.set(STORAGE_KEY_QUOTES, JSON.stringify(data));
  } catch (_) {}
};

const clearQuotes = async () => {
  try {
    await storage.delete(STORAGE_KEY_QUOTES);
  } catch (_) {}
};

// STORAGE_KEY_HAS_PLAYED
const getHasPlayed = async (): Promise<boolean> => {
  try {
    return (await storage.getBoolean(STORAGE_KEY_HAS_PLAYED)) || false;
  } catch (_) {
    return false;
  }
};

const setHasPlayed = async (value: boolean) => {
  try {
    await storage.set(STORAGE_KEY_HAS_PLAYED, value);
  } catch (_) {}
};

const clearHasPlayed = async () => {
  try {
    await storage.delete(STORAGE_KEY_HAS_PLAYED);
  } catch (_) {}
};

// STORAGE_KEY_MIGRATION_VERSION
const getMigrationVersion = async (): Promise<number> => {
  try {
    return (await storage.getNumber(STORAGE_KEY_MIGRATION_VERSION)) || 0;
  } catch (_) {
    return 0;
  }
};

const setMigrationVersion = async (version: number) => {
  try {
    await storage.set(STORAGE_KEY_MIGRATION_VERSION, version);
  } catch (_) {}
};

const clearMigrationVersion = async () => {
  try {
    await storage.delete(STORAGE_KEY_MIGRATION_VERSION);
  } catch (_) {}
};

const clearAll = async () => {
  await clearLangKeyDefault();
  await clearLangKeyPreferred();
  await clearSettings();
  await clearHasPlayed();
};

const clearAllForDev = async () => {
  await clearBackgrounds();
  await clearQuotes();
  await clearMigrationVersion();
  await clearLastAppVersionKey();
};

const getLastAppVersionKey = async (): Promise<string | null> => {
  try {
    return (await storage.getString(STORAGE_KEY_LAST_APP_VERSION_KEY)) || null;
  } catch (_) {
    return null;
  }
};

const setLastAppVersionKey = async (version: string) => {
  try {
    await storage.set(STORAGE_KEY_LAST_APP_VERSION_KEY, version);
  } catch (_) {}
};

const clearLastAppVersionKey = async () => {
  try {
    await storage.delete(STORAGE_KEY_LAST_APP_VERSION_KEY);
  } catch (_) {}
};

export const appStorage = {
  getLangKeyDefault,
  saveLangKeyDefault,
  clearLangKeyDefault,
  getLangKeyPreferred,
  saveLangKeyPreferred,
  clearLangKeyPreferred,
  getSettings,
  setSettings,
  clearSettings,
  getBackgrounds,
  setBackgrounds,
  clearBackgrounds,
  getQuotes,
  setQuotes,
  clearQuotes,
  getHasPlayed,
  setHasPlayed,
  clearHasPlayed,
  clearAll,
  getMigrationVersion,
  setMigrationVersion,
  clearMigrationVersion,
  clearAllForDev,
  getLastAppVersionKey,
  setLastAppVersionKey,
  clearLastAppVersionKey,
};

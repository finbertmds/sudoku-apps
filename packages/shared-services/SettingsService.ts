// SettingsService.ts

import {appStorage} from '@sudoku/shared-storages';
import {AppSettings, ConstantEnv} from '@sudoku/shared-types';

/**
 * Call init() before using any other methods
 *
 * @param env - ConstantEnv
 */
export const SettingsService = {
  defaultSettings: {} as AppSettings,

  init(env: ConstantEnv) {
    this.defaultSettings = env.DEFAULT_SETTINGS;
  },

  normalizeSettings(settings: AppSettings): AppSettings {
    const normalized = {...settings};

    // Nếu mistakeLimit bị tắt ➝ autoCheckMistake cũng phải tắt
    if (!normalized.mistakeLimit) {
      normalized.autoCheckMistake = false;
    }

    return normalized;
  },

  async save(settings: AppSettings): Promise<void> {
    try {
      await appStorage.setSettings(settings);
    } catch (err) {
      console.error('Failed to save settings', err);
    }
  },

  async load(): Promise<AppSettings> {
    try {
      const settings = await appStorage.getSettings();
      if (settings) {
        return settings;
      }
    } catch (err) {
      console.error('Failed to load settings', err);
    }
    return this.defaultSettings;
  },

  async update(partial: Partial<AppSettings>): Promise<void> {
    const current = await SettingsService.load();
    const updated = {...current, ...partial};
    await SettingsService.save(updated);
  },

  async clear(): Promise<void> {
    try {
      await appStorage.clearAll();
      if (__DEV__) {
        await appStorage.clearAllForDev();
      }
    } catch (err) {
      console.error('Failed to clear settings', err);
    }
  },

  async getHasPlayed(): Promise<boolean> {
    return await appStorage.getHasPlayed();
  },

  async setHasPlayed(value: boolean): Promise<void> {
    await appStorage.setHasPlayed(value);
  },

  async getLastAppVersionKey(): Promise<string | null> {
    return await appStorage.getLastAppVersionKey();
  },

  async setLastAppVersionKey(version: string): Promise<void> {
    await appStorage.setLastAppVersionKey(version);
  },

  async clearLastAppVersionKey(): Promise<void> {
    await appStorage.clearLastAppVersionKey();
  },
};

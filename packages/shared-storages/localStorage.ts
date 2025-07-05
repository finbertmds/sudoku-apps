// localStorage.ts

import {AppStorage} from '@sudoku/shared-storages';

export const localStorageImpl: AppStorage = {
  getString: async (key: string): Promise<string | null> => {
    return localStorage.getItem(key) ?? null;
  },
  getBoolean: async (key: string): Promise<boolean | null> => {
    const value = localStorage.getItem(key);
    if (value === null) return null;
    return value === 'true';
  },
  getNumber: async (key: string): Promise<number | null> => {
    const value = localStorage.getItem(key);
    if (value === null) return null;
    try {
      const num = Number(value);
      if (!isNaN(num) && value.trim() !== '') return num;
    } catch (_) {}
    return null;
  },
  set: async (key: string, value: boolean | string | number | ArrayBuffer) => {
    localStorage.setItem(key, value as string);
  },
  delete: async (key: string) => {
    localStorage.removeItem(key);
  },
  clearAll: async () => {
    localStorage.clear();
  },
};

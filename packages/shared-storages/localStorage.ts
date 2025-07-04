// localStorage.ts

import {AppStorage} from '@/storage.interface';

export const localStorageImpl: AppStorage = {
  getString: (key: string): string | null => {
    return localStorage.getItem(key) ?? null;
  },
  getBoolean: (key: string): boolean | null => {
    const value = localStorage.getItem(key);
    if (value === null) return null;
    return value === 'true';
  },
  getNumber: (key: string): number | null => {
    const value = localStorage.getItem(key);
    if (value === null) return null;
    try {
      const num = Number(value);
      if (!isNaN(num) && value.trim() !== '') return num;
    } catch (_) {}
    return null;
  },
  set: (key: string, value: boolean | string | number | ArrayBuffer) => {
    localStorage.setItem(key, value as string);
  },
  delete: (key: string) => {
    localStorage.removeItem(key);
  },
  clearAll: () => {
    localStorage.clear();
  },
};

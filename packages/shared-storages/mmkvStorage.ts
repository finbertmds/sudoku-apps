// mmkvStorage.ts

import {AppStorage} from '@sudoku/shared-storages';
import {MMKV} from 'react-native-mmkv';

const mmkv = new MMKV();

export const mmkvStorage: AppStorage = {
  getString: async (key: string): Promise<string | null> => {
    return mmkv.getString(key) ?? null;
  },
  getBoolean: async (key: string): Promise<boolean | null> => {
    return mmkv.getBoolean(key) ?? null;
  },
  getNumber: async (key: string): Promise<number | null> => {
    return mmkv.getNumber(key) ?? null;
  },
  set: async (key: string, value: boolean | string | number | ArrayBuffer) => {
    mmkv.set(key, value);
  },
  delete: async (key: string) => {
    mmkv.delete(key);
  },
  clearAll: async () => {
    mmkv.clearAll();
  },
};

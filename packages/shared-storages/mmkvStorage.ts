// mmkvStorage.ts

import {AppStorage} from '@sudoku/shared-storages';
import {MMKV} from 'react-native-mmkv';

const mmkv = new MMKV();

export const mmkvStorage: AppStorage = {
  getString: (key: string): string | null => {
    return mmkv.getString(key) ?? null;
  },
  getBoolean: (key: string): boolean | null => {
    return mmkv.getBoolean(key) ?? null;
  },
  getNumber: (key: string): number | null => {
    return mmkv.getNumber(key) ?? null;
  },
  set: (key: string, value: boolean | string | number | ArrayBuffer) => {
    mmkv.set(key, value);
  },
  delete: (key: string) => {
    mmkv.delete(key);
  },
  clearAll: () => {
    mmkv.clearAll();
  },
};

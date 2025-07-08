// asyncStorage.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppStorage} from '@sudoku/shared-storages';

export const asyncStorageImpl: AppStorage = {
  getString: async (key: string): Promise<string | null> => {
    return (await AsyncStorage.getItem(key)) ?? null;
  },

  getBoolean: async (key: string): Promise<boolean | null> => {
    const value = await AsyncStorage.getItem(key);
    if (value === null) return null;
    return value === 'true';
  },

  getNumber: async (key: string): Promise<number | null> => {
    const value = await AsyncStorage.getItem(key);
    if (value === null) return null;
    try {
      const num = Number(value);
      if (!isNaN(num) && value.trim() !== '') return num;
    } catch (_) {}
    return null;
  },

  set: async (key: string, value: boolean | string | number | ArrayBuffer) => {
    let storeValue: string;

    if (typeof value === 'boolean' || typeof value === 'number') {
      storeValue = String(value);
    } else if (typeof value === 'string') {
      storeValue = value;
    } else if (value instanceof ArrayBuffer) {
      storeValue = JSON.stringify(Array.from(new Uint8Array(value)));
    } else {
      throw new Error('Unsupported value type in asyncStorageImpl.set');
    }

    await AsyncStorage.setItem(key, storeValue);
  },

  delete: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },

  clearAll: async () => {
    await AsyncStorage.clear();
  },
};

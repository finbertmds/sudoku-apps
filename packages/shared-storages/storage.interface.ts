// storage.interface.ts

export interface AppStorage {
  getString(key: string): Promise<string | null>;
  getBoolean(key: string): Promise<boolean | null>;
  getNumber(key: string): Promise<number | null>;
  set(
    key: string,
    value: boolean | string | number | ArrayBuffer,
  ): Promise<void>;
  delete(key: string): Promise<void>;
  clearAll(): Promise<void>;
}

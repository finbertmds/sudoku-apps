// storage.interface.ts

export interface AppStorage {
  getString(key: string): string | null;
  getBoolean(key: string): boolean | null;
  getNumber(key: string): number | null;
  set(key: string, value: boolean | string | number | ArrayBuffer): void;
  delete(key: string): void;
  clearAll(): void;
}

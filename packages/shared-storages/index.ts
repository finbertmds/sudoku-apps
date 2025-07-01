export * from './appStorage';
export * from './gameStorage';
export * from './playerProfileStorage';
export * from './statsStorage';

import { localStorageImpl } from './localStorage';
import { mmkvStorage } from './mmkvStorage';
import { isWeb } from './platform';

const localStorageAvailable = typeof localStorage !== 'undefined';
export const storage = isWeb && localStorageAvailable ? localStorageImpl : mmkvStorage;

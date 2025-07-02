// storage.ts
import {Platform} from 'react-native';
import {AppStorage} from './storage.interface';

const impl: () => AppStorage = Platform.select({
  web: () => require('./localStorage').localStorageImpl,
  default: () => require('./mmkvStorage').mmkvStorage,
});

export const storage = impl();

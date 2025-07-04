// storage.ts
import {AppStorage} from '@/storage.interface';
import {Platform} from 'react-native';

const impl: () => AppStorage = Platform.select({
  web: () => require('./localStorage').localStorageImpl,
  default: () => require('./mmkvStorage').mmkvStorage,
});

export const storage = impl();

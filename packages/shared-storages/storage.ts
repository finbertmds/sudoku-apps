// storage.ts

import {AppStorage} from '@sudoku/shared-storages';
import {DeviceUtil} from '@sudoku/shared-utils';
import {Platform} from 'react-native';

const impl: () => AppStorage = Platform.select({
  web: () => {
    return require('./localStorage').localStorageImpl;
  },
  default: () => {
    if (DeviceUtil.isMMKVAvailable()) {
      return require('./mmkvStorage').mmkvStorage;
    } else {
      return require('./asyncStorage').asyncStorageImpl;
    }
  },
});

export const storage = impl();

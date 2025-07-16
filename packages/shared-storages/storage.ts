// storage.ts

import {AppStorage} from '@sudoku/shared-storages';
import {DeviceUtil} from '@sudoku/shared-utils';
import {Platform} from 'react-native';

const impl: () => AppStorage = Platform.select({
  web: () => {
    console.log('Loaded storage.ts localStorage');
    return require('./localStorage').localStorageImpl;
  },
  default: () => {
    if (DeviceUtil.isMMKVAvailable()) {
      console.log('Loaded storage.ts mmkvStorage');
      return require('./mmkvStorage').mmkvStorage;
    } else {
      console.log('Loaded storage.ts asyncStorage');
      return require('./asyncStorage').asyncStorageImpl;
    }
  },
});

export const storage = impl();

// storage.ts

import {AppStorage} from '@sudoku/shared-storages';
import {DeviceUtil} from '@sudoku/shared-utils';
import {Platform} from 'react-native';

const impl: () => AppStorage = Platform.select({
  web: () => {
    console.log('Using localStorage implementation');
    return require('./localStorage').localStorageImpl;
  },
  default: () => {
    if (DeviceUtil.isMMKVAvailable()) {
      console.log('Using MMKV storage implementation');
      return require('./mmkvStorage').mmkvStorage;
    } else {
      console.log('Using AsyncStorage implementation');
      return require('./asyncStorage').asyncStorageImpl;
    }
  },
});

export const storage = impl();

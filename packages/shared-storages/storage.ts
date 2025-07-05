// storage.ts

import {AppStorage} from '@sudoku/shared-storages';
import {DeviceUtil} from '@sudoku/shared-utils';
import {Platform} from 'react-native';

const impl: () => AppStorage = Platform.select({
  web: () => require('./localStorage').localStorageImpl,
  default: () =>
    DeviceUtil.isMMKVAvailable()
      ? require('./mmkvStorage').mmkvStorage
      : require('./localStorage').localStorageImpl,
});

export const storage = impl();

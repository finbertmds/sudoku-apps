// createExpoNavigationImpl.ts

import type {NavigationImpl} from '@sudoku/shared-navigation/types';
import {router} from 'expo-router';

export const createExpoNavigationImpl = (): NavigationImpl => {
  return {
    push: (name, params) => router.push(name, params),
    replace: (name, params) => router.replace({pathname: name, params}),
    back: () => router.back(),
    goBack: () => router.back(),
    navigate: (name, params) => router.navigate(name, params),
    reset: (name, params) => {
      router.replace({pathname: name, params});
    },
    setParams: (params) => {
      router.setParams(params);
    },
    canGoBack: () => router.canGoBack?.() ?? false,
  };
};

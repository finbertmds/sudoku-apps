// useSafeGoBack.ts

import {router} from 'expo-router';

export const useSafeGoBack = () => {
  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return goBack;
};

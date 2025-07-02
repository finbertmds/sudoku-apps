// useSafeGoBack.ts

import {router, useNavigation} from 'expo-router';

export const useSafeGoBack = () => {
  const navigation = useNavigation();

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      router.replace('/');
    }
  };

  return goBack;
};

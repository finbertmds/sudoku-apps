// createExpoNavigationImpl.ts

import type {NavigationProp} from '@react-navigation/native';
import {router, useNavigation} from 'expo-router';
import type {NavigationImpl} from './types';

export const createExpoNavigationImpl = (): NavigationImpl => {
  const navigation = useNavigation<NavigationProp<any>>();

  return {
    push: (name, params) => navigation.navigate(name, params),
    replace: (name, params) => router.replace({pathname: name, params}),
    back: () => navigation.goBack(),
    goBack: () => navigation.goBack(),
    navigate: (name, params) => navigation.navigate(name, params),
    reset: (name, params) => {
      navigation.reset({
        index: 0,
        routes: [{name, params}],
      });
    },
    setParams: (params) => {
      navigation.setParams(params);
    },
    canGoBack: () => navigation.canGoBack?.() ?? false,
  };
};

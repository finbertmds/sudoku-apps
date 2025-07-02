// createReactNavigationImpl.ts

import type {NavigationImpl} from '@/types';
import type {NavigationContainerRef} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';

export const createReactNavigationImpl = (
  navigationRef: React.RefObject<NavigationContainerRef<any> | null>,
): NavigationImpl => {
  return {
    push: (name, params) => navigationRef.current?.navigate(name, params),
    replace: (name, params) => navigationRef.current?.navigate(name, params),
    back: () => navigationRef.current?.goBack(),
    goBack: () => navigationRef.current?.goBack(),
    navigate: (name, params) => navigationRef.current?.navigate(name, params),
    reset: (name, params) => {
      navigationRef.current?.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name, params}],
        }),
      );
    },
    setParams: (params) => {
      navigationRef.current?.dispatch(CommonActions.setParams(params));
    },
    canGoBack: () => navigationRef.current?.canGoBack?.() ?? false,
  };
};

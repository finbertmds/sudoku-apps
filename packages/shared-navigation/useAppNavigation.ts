// useAppNavigation.ts

import {getNavigation} from '@sudoku/shared-navigation/navigationAdapter';

export const useAppNavigation = () => {
  const nav = getNavigation();

  return {
    push: nav.push,
    replace: nav.replace ?? nav.push,
    goBack: nav.back ?? (() => {}),
  };
};

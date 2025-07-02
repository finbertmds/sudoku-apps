import {getNavigation} from './navigationAdapter';

export const useAppNavigation = () => {
  const nav = getNavigation();

  return {
    push: nav.push,
    replace: nav.replace ?? nav.push,
    goBack: nav.back ?? (() => {}),
  };
};

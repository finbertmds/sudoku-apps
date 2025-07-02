// types.ts

export type NavigationImpl = {
  push: (name: string, params?: any) => void;
  replace?: (name: string, params?: any) => void;
  back?: () => void;
  goBack?: () => void;
  navigate?: (name: string, params?: any) => void;
  reset?: (name: string, params?: any) => void;
  setParams?: (params: any) => void;
  canGoBack?: () => boolean;
};

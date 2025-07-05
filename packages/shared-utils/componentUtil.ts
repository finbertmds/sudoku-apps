// componentUtil.ts

import {TutorialImageMap, TutorialSlideItem} from '@sudoku/shared-types';
import {ColorSchemeName} from 'react-native';

export const getTutorialImageList = (
  tutorialImages: TutorialImageMap,
  mode: ColorSchemeName,
): TutorialSlideItem[] => {
  const fallbackMode = mode === 'dark' ? 'dark' : 'light';

  return Object.entries(tutorialImages).map(([key, imageObj]) => ({
    key,
    image: imageObj[fallbackMode],
    text: `howToPlay.${key}`,
  }));
};

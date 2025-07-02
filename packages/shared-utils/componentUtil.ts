import {TutorialImages} from '@sudoku/shared-types';
import {ColorSchemeName} from 'react-native';

export const getTutorialImage = (
  tutorialImages: TutorialImages,
  slide: keyof TutorialImages,
  mode: ColorSchemeName,
) => {
  const fallbackMode = mode === 'dark' ? 'dark' : 'light';
  return tutorialImages[slide]?.[fallbackMode];
};

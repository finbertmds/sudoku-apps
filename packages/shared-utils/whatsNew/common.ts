// whatsNew/common.ts

import {LanguageCode, TranslatedText} from '@sudoku/shared-types';

export function getTranslated(
  text: TranslatedText,
  lang: LanguageCode,
  fallback: LanguageCode = 'en',
): string {
  return text[lang] || text[fallback] || '';
}

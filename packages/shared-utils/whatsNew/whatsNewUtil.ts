// whatsNewUtil.ts

import {AppId, WhatsNewEntry} from '@sudoku/shared-types';
import {WHATS_NEW_CLASSIC} from '@sudoku/shared-utils/whatsNew/classic';
import {WHATS_NEW_KILLER} from '@sudoku/shared-utils/whatsNew/killer';

export const getWhatsNewLatest = (
  appId: AppId,
  currentVersion: string,
): WhatsNewEntry => {
  const entries = appId === 'classic' ? WHATS_NEW_CLASSIC : WHATS_NEW_KILLER;
  const currentVersionNumber = currentVersion.split('.').map(Number);
  const filteredEntries = entries.filter((entry) => {
    const entryVersionNumber = entry.version.split('.').map(Number);
    return (
      entryVersionNumber[0] > currentVersionNumber[0] ||
      (entryVersionNumber[0] === currentVersionNumber[0] &&
        entryVersionNumber[1] > currentVersionNumber[1])
    );
  });
  return filteredEntries[0];
};

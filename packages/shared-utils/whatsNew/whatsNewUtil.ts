// whatsNewUtil.ts

import {AppId, WhatsNewEntry} from '@sudoku/shared-types';
import {WHATS_NEW_CLASSIC, WHATS_NEW_KILLER} from '@sudoku/shared-utils';
import {semverLt} from '@sudoku/shared-utils/appUtil';
import {CLASSIC_APP_ID} from '@sudoku/shared-utils/constants';

export const getWhatsNewList = (
  appId: AppId,
  lastSeenVersion: string,
): WhatsNewEntry[] => {
  const entries =
    appId === CLASSIC_APP_ID ? WHATS_NEW_CLASSIC : WHATS_NEW_KILLER;

  const filteredEntries = entries
    .filter((entry) =>
      lastSeenVersion === '' ? true : semverLt(lastSeenVersion, entry.version),
    )
    .sort((a, b) => (semverLt(a.version, b.version) ? 1 : -1));

  return filteredEntries;
};

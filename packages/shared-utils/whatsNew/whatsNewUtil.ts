// whatsNewUtil.ts

import {AppId, WhatsNewEntry} from '@sudoku/shared-types';
import {WHATS_NEW_CLASSIC, WHATS_NEW_KILLER} from '@sudoku/shared-utils';
import {semverLt} from '@sudoku/shared-utils/appUtil';
import {CLASSIC_APP_ID} from '@sudoku/shared-utils/constants';

export const getWhatsNewList = (
  appId: AppId,
  lastSeenVersion: string,
  platform: string,
): WhatsNewEntry[] => {
  const releases =
    appId === CLASSIC_APP_ID ? WHATS_NEW_CLASSIC : WHATS_NEW_KILLER;

  return releases
    .flatMap((release): WhatsNewEntry[] => {
      const version = Object.entries(release.versions).find(
        ([name]) => name === platform,
      )?.[1];
      if (
        !version ||
        (lastSeenVersion !== '' && !semverLt(lastSeenVersion, version))
      ) {
        return [];
      }
      const changes = release.changes.filter(
        (change) =>
          !change.platforms ||
          change.platforms.some((name) => name === platform),
      );
      return changes.length ? [{version, changes}] : [];
    })
    .sort((a, b) => (semverLt(a.version, b.version) ? 1 : -1));
};

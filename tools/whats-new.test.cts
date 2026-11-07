import assert from 'node:assert/strict';
import {WHATS_NEW_CLASSIC} from '../packages/shared-utils/whatsNew/classic';
import {getWhatsNewList} from '../packages/shared-utils/whatsNew/whatsNewUtil';

for (const [app, version, previous] of [
  ['classic', '0.0.5', '0.0.3'],
  ['killer', '1.1.4', '1.1.2'],
] as const) {
  const android = getWhatsNewList(app, previous, 'android');
  const ios = getWhatsNewList(app, previous, 'ios');
  assert.equal(android[0].version, version);
  assert.equal(android[0].changes.length, 1);
  assert.equal(android[0].changes[0].title.en, 'Android 16 Support');
  assert.deepEqual(ios, []);
  assert.deepEqual(getWhatsNewList(app, version, 'android'), []);
  assert.deepEqual(getWhatsNewList(app, previous, 'web'), []);
  assert.ok(getWhatsNewList(app, '', 'ios').length > 1);
  assert.deepEqual(getWhatsNewList(app, '', 'windows'), []);
}

// A release can ship under different version numbers on Android and iOS.
WHATS_NEW_CLASSIC.unshift({
  versions: {android: '0.0.6', ios: '0.0.7'},
  changes: [
    {title: {en: 'Shared fix'}, description: {en: 'Both platforms'}},
    {
      platforms: ['android'],
      title: {en: 'Android fix'},
      description: {en: 'Android only'},
    },
  ],
});
try {
  assert.equal(
    getWhatsNewList('classic', '0.0.5', 'android')[0].version,
    '0.0.6',
  );
  assert.equal(getWhatsNewList('classic', '0.0.5', 'ios')[0].version, '0.0.7');
  assert.deepEqual(
    getWhatsNewList('classic', '0.0.5', 'android')[0].changes.map(
      (change) => change.title.en,
    ),
    ['Shared fix', 'Android fix'],
  );
  assert.deepEqual(
    getWhatsNewList('classic', '0.0.5', 'ios')[0].changes.map(
      (change) => change.title.en,
    ),
    ['Shared fix'],
  );
} finally {
  WHATS_NEW_CLASSIC.shift();
}

// Do not show an empty release when all changes target a different platform.
WHATS_NEW_CLASSIC.unshift({
  versions: {android: '0.0.6', ios: '0.0.6'},
  changes: [
    {
      platforms: ['android'],
      title: {en: 'Android'},
      description: {en: 'Android only'},
    },
  ],
});
try {
  assert.deepEqual(getWhatsNewList('classic', '0.0.5', 'ios'), []);
} finally {
  WHATS_NEW_CLASSIC.shift();
}
console.log(
  'PASS: platform-specific versions, shared changes, filtering and history.',
);

# What's New configuration

Edit `classic.ts` or `killer.ts`. Each release declares its version separately
for each platform. The version must match Android `versionName`, iOS
`CFBundleShortVersionString`, or the web app version. Build numbers/version codes
are not used to select release notes.

```ts
{
  versions: {android: '0.0.6', ios: '0.0.7'},
  changes: [
    {
      // No platforms means this change applies to all platforms in versions.
      title: {en: 'Shared improvement', vi: 'Cải tiến chung', ja: '共通の改善'},
      description: {en: 'Available on Android and iOS.'},
    },
    {
      platforms: ['android'],
      title: {en: 'Android improvement'},
      description: {en: 'Only shown on Android.'},
    },
  ],
}
```

Use `platforms: ['ios']` for iOS-only changes or `['android', 'ios']` for mobile
changes. Omit a platform from `versions` if that release does not apply to it.
Every change retains English, Vietnamese and Japanese translations as needed.

Both apps pass `Platform.OS` to `getWhatsNewList`. The helper selects the
platform's version, filters changes, removes empty releases, and compares against
the last seen version. Historical entries retain their existing content on all
three platforms.

Run the focused checks from the repository root:

```sh
yarn ts-node --compiler-options '{"module":"CommonJS"}' tools/whats-new.test.cts
```

# Mobile release triggers

On each push to `master`, the per-app Android and iOS workflows compare the complete
push range (`github.event.before` to `github.sha`). Each app builds/uploads to
Google Play **internal testing** or **TestFlight** only when the corresponding
platform release is affected.

- App code, assets, environment and app configuration: that app on both platforms.
- Android files: Android only. iOS files: iOS only.
- Shared `packages/**`, root dependencies/lockfile, Node and TypeScript/build
  configuration: both apps.
- Workflow/action versions and CI-only scripts: no automatic release.
- Markdown documentation, screenshots and test directories: no automatic release.
- `workflow_dispatch`: force a build/upload without a diff.
- Missing previous commit or a new branch: conservatively inspect all tracked files.

Both legacy combined workflows are manual-only so a shared-package push does not
upload each version twice. Uploads still require unused Android version codes,
valid signing/upload credentials, and a successful Fastlane build.
iOS uploads also require an unused build number. This does not
promote releases to production.

Run checks with:

```sh
python3 -m unittest discover -s tools/ci -p 'test_*.py' -v
```

Build jobs use `macos-latest`; change detection uses `ubuntu-latest`. iOS lanes
use the runner-selected Xcode and print its version. Yarn 1.22.22, JDK 17,
Android SDK 36/NDK 27.1, Ruby 3.2 and CocoaPods/Fastlane are installed explicitly
rather than relying on the image's preinstalled tools. Native compatibility with
new runner/Xcode images still needs validation on GitHub.

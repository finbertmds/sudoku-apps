import os
from pathlib import Path
import subprocess
import tempfile
import unittest
from unittest.mock import patch
from release_changes import main
from release_changes import affects_release, changed_files


class ReleaseChangesTest(unittest.TestCase):
    def test_release_paths(self):
        for app in ['classic', 'killer']:
            other = 'killer' if app == 'classic' else 'classic'
            for path in [f'apps/{app}/src/screens/Main.tsx', f'apps/{app}/android/app/build.gradle',
                         f'apps/{app}/package.json', f'apps/{app}/app.config.ts',
                         f'apps/{app}/version.json', 'packages/shared-utils/boardUtil.ts',
                         'packages/shared-types/package.json', 'package.json', 'yarn.lock',
                         '.nvmrc', 'tsconfig.base.json']:
                with self.subTest(app=app, path=path):
                    self.assertTrue(affects_release(path, app, 'android'))
            for path in ['README.md', 'packages/shared-utils/README.md', 'tools/whats-new.test.cts',
                         f'apps/{app}/ios/Info.plist', f'apps/{other}/src/App.tsx']:
                with self.subTest(app=app, path=path):
                    self.assertFalse(affects_release(path, app, 'android'))

    def test_ios_paths(self):
        for app in ['classic', 'killer']:
            other = 'killer' if app == 'classic' else 'classic'
            for path in [f'apps/{app}/ios/Podfile.lock', f'apps/{app}/ios/fastlane/Fastfile',
                         f'apps/{app}/src/screens/Main.tsx', f'apps/{app}/app/_layout.tsx',
                         f'apps/{app}/package.json', 'packages/shared-utils/boardUtil.ts',
                         'yarn.lock', '.nvmrc']:
                with self.subTest(app=app, path=path):
                    self.assertTrue(affects_release(path, app, 'ios'))
            for path in [f'apps/{app}/android/app/build.gradle', f'apps/{other}/ios/Podfile',
                         f'.github/workflows/android_internal_github_{app}.yml',
                         'README.md', 'tools/ci/test_release_changes.py']:
                with self.subTest(app=app, path=path):
                    self.assertFalse(affects_release(path, app, 'ios'))

    def test_workflow_only_and_mixed_changes(self):
        workflows = [str(p) for p in Path('.github/workflows').glob('*.yml')]
        self.assertEqual(len(workflows), 6)
        ci_only = workflows + ['tools/ci/release_changes.py']
        for app in ['classic', 'killer']:
            for platform in ['android', 'ios']:
                with self.subTest(app=app, platform=platform):
                    self.assertFalse(any(affects_release(p, app, platform) for p in ci_only))
                    mixed = ci_only + ['apps/killer/android/app/build.gradle']
                    self.assertEqual(
                        any(affects_release(p, app, platform) for p in mixed),
                        app == 'killer' and platform == 'android',
                    )

    def test_manual_run_outputs_true_without_diff(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / 'output'
            with patch.dict(os.environ, {'EVENT_NAME': 'workflow_dispatch', 'GITHUB_OUTPUT': str(output)}), \
                 patch('sys.argv', ['release_changes.py', '--app', 'classic', '--platform', 'android']):
                main()
            self.assertEqual(output.read_text(), 'should_run=true\n')

    def test_push_range_and_fallback(self):
        original = os.getcwd()
        with tempfile.TemporaryDirectory() as directory:
            try:
                os.chdir(directory)
                def git(*args):
                    return subprocess.check_output(['git', *args], stderr=subprocess.DEVNULL).decode().strip()
                git('init'); git('config', 'user.email', 'test@example.com'); git('config', 'user.name', 'Test')
                Path('package.json').write_text('{}')
                git('add', '.'); git('commit', '-m', 'base')
                before = git('rev-parse', 'HEAD')
                Path('README.md').write_text('docs')
                git('add', '.'); git('commit', '-m', 'docs')
                Path('yarn.lock').write_text('lock')
                git('add', '.'); git('commit', '-m', 'dependencies')
                head = git('rev-parse', 'HEAD')
                self.assertEqual(set(filter(None, changed_files(before, head))), {'README.md', 'yarn.lock'})
                for missing in ['', '0' * 40, 'f' * 40]:
                    self.assertIn('package.json', changed_files(missing, head))
            finally:
                os.chdir(original)


if __name__ == '__main__':
    unittest.main()

"""Select mobile releases affected by a push; used by Android and iOS workflows."""
import argparse
import os
from pathlib import PurePosixPath
import subprocess


def affects_release(path, app, platform):
    parts = PurePosixPath(path).parts
    if path.endswith('.md') or any(p in {'screenshots', '__tests__', 'tests'} for p in parts):
        return False
    if path.startswith('packages/'):
        return True
    if path.startswith(f'apps/{app}/'):
        other_platform = 'ios' if platform == 'android' else 'android'
        return not path.startswith(f'apps/{app}/{other_platform}/')
    if path in {'package.json', 'yarn.lock', '.nvmrc', '.yarnrc', '.yarnrc.yml',
                'tsconfig.base.json'}:
        return True
    if '/' not in path and path.startswith(('babel.config.', 'metro.config.', 'tsconfig.')):
        return True
    # Workflow/action and CI-only changes do not change the shipped app.
    return False


def changed_files(before, head):
    # New branch or unavailable previous commit: build conservatively from all files.
    if not before or set(before) == {'0'} or subprocess.run(
        ['git', 'cat-file', '-e', f'{before}^{{commit}}'],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    ).returncode:
        return subprocess.check_output(['git', 'ls-tree', '-r', '--name-only', '-z', head]).decode().split('\0')
    return subprocess.check_output(
        ['git', 'diff', '--no-renames', '--name-only', '-z', before, head],
    ).decode().split('\0')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--app', choices=['classic', 'killer'], required=True)
    parser.add_argument('--platform', choices=['android', 'ios'], required=True)
    args = parser.parse_args()
    manual = os.environ.get('EVENT_NAME') == 'workflow_dispatch'
    files = [] if manual else changed_files(os.environ.get('BEFORE_SHA', ''), os.environ['HEAD_SHA'])
    affected = [p for p in files if p and affects_release(p, args.app, args.platform)]
    should_run = manual or bool(affected)
    print(f'{args.app}/{args.platform}: should_run={str(should_run).lower()}')
    print('Manual build requested' if manual else '\n'.join(affected) or 'No release changes')
    with open(os.environ['GITHUB_OUTPUT'], 'a') as output:
        output.write(f'should_run={str(should_run).lower()}\n')


if __name__ == '__main__':
    main()

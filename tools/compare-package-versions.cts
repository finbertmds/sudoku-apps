// tools/compare-package-versions.cts
import fs from 'fs';
import path from 'path';

const killerPkg = JSON.parse(
  fs.readFileSync(path.resolve('apps/killer/package.json'), 'utf-8'),
);
const classicPkg = JSON.parse(
  fs.readFileSync(path.resolve('apps/classic/package.json'), 'utf-8'),
);

function compareDeps(depType: 'dependencies' | 'devDependencies') {
  const killerDeps = killerPkg[depType] || {};
  const classicDeps = classicPkg[depType] || {};

  const allDeps = new Set([
    ...Object.keys(killerDeps),
    ...Object.keys(classicDeps),
  ]);

  const mismatches: string[] = [];

  allDeps.forEach((dep) => {
    const kVer = killerDeps[dep];
    const cVer = classicDeps[dep];

    if (kVer && cVer && kVer !== cVer) {
      mismatches.push(`${dep}: killer=${kVer}, classic=${cVer}`);
    }
  });

  if (mismatches.length) {
    console.log(`❌ Mismatched ${depType}:`);
    mismatches.forEach((line) => console.log(`  - ${line}`));
  } else {
    console.log(`✅ ${depType} versions match.`);
  }
}

compareDeps('dependencies');
compareDeps('devDependencies');

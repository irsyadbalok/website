// Semak semua pautan dalaman dalam folder dist/ selepas "npm run build".
// Gagal (kod keluar 1) jika ada pautan yang menuju ke fail yang tidak wujud.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? htmlFiles(p) : p.endsWith('.html') ? [p] : [];
  });
}

const broken = [];
let checked = 0;
for (const file of htmlFiles(DIST)) {
  const html = readFileSync(file, 'utf8');
  for (const [, url] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    if (!url.startsWith('/') || url.startsWith('//')) continue; // pautan luar, mailto:, tel:, #
    let path = url.split('#')[0].split('?')[0];
    if (base && path.startsWith(base)) path = path.slice(base.length);
    const target = join(DIST, decodeURIComponent(path));
    const ok = existsSync(target) && (statSync(target).isFile() || existsSync(join(target, 'index.html')));
    checked++;
    if (!ok) broken.push(`${file}  ->  ${url}`);
  }
}

if (broken.length) {
  console.error(`Pautan rosak (${broken.length}):\n` + [...new Set(broken)].join('\n'));
  process.exit(1);
}
console.log(`Semua ${checked} pautan dalaman sah.`);

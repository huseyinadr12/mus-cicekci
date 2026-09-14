import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('tmp/pages-build/out');
function walk(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]); }
const pages = walk(root).filter(file => file.endsWith('.html'));
assert.ok(pages.length >= 75, `Expected all catalogue pages, found ${pages.length}`);
assert.equal(fs.readdirSync(path.join(root, 'urun')).length, 48);
assert.ok(!fs.existsSync(path.join(root, 'api')), 'Server APIs must not be published');
for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(/<(?:img|script)\b[^>]*\bsrc="([^"]+)"/g)) {
    const src = match[1].split('?')[0];
    if (!src.startsWith('/')) continue;
    assert.ok(src.startsWith('/mus-cicekci/'), `${file}: incorrect asset base path ${src}`);
    assert.ok(fs.existsSync(path.join(root, decodeURIComponent(src.slice('/mus-cicekci/'.length)))), `Missing asset ${src}`);
  }
}
for (const route of ['checkout', 'siparis-takip', 'admin']) {
  const html = fs.readFileSync(path.join(root, route, 'index.html'), 'utf8');
  assert.ok(html.includes('Gerçek sipariş alınmaz'));
  assert.ok(!/<input\b/.test(html), `${route} must not collect personal data`);
}
console.log(`PASS: ${pages.length} static pages, 48 product routes, local image/script paths and demo-only transaction pages.`);

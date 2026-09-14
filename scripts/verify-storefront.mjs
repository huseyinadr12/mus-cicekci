import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';
import sharp from 'sharp';

// Load the actual TS business modules, without starting a browser or a database.
const require = createRequire(import.meta.url);
const cache = new Map();
function load(file) {
  file = path.resolve(file);
  if (!path.extname(file)) file += '.ts';
  if (file.endsWith('.json')) return JSON.parse(fs.readFileSync(file, 'utf8'));
  if (cache.has(file)) return cache.get(file).exports;
  const loadedModule = { exports: {} };
  cache.set(file, loadedModule);
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  const localRequire = name => name.startsWith('.') ? load(path.resolve(path.dirname(file), name)) : name.startsWith('@/') ? load(path.resolve('src', name.slice(2))) : require(name);
  vm.runInThisContext(`(function(require,module,exports){${code}\n})`, { filename: file })(localRequire, loadedModule, loadedModule.exports);
  return loadedModule.exports;
}
const memory = new Map();
Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: { getItem: key => memory.get(key) || null, setItem: (key, value) => memory.set(key, value), removeItem: key => memory.delete(key) } });
globalThis.window = { localStorage: globalThis.localStorage };
const { PRODUCTS_CATALOG: products, ADD_ON_ITEMS: addons } = load('src/lib/catalog.ts');
const { searchCatalog } = load('src/lib/search.ts');
const { useCartStore } = load('src/lib/store.ts');
const { db } = load('src/lib/db.ts');
assert.equal(products.length, 48);
assert.equal(new Set(products.map(p => p.slug)).size, 48);
assert.equal(addons.length, 10);
for (const product of products) {
  assert.ok(product.images[0].startsWith('/images/source/'));
  assert.ok(product.price > 0 && Number.isFinite(product.price));
}
const manifest = JSON.parse(fs.readFileSync('public/images/source/manifest.json', 'utf8'));
assert.equal(manifest.failures.length, 0);
for (const asset of manifest.assets) {
  assert.ok(fs.existsSync(path.join('public', asset.localPath)), asset.localPath);
  await sharp(path.join('public', asset.localPath)).metadata();
}
for (const item of addons) assert.ok(fs.existsSync(path.join('public', item.image)));
assert.equal(searchCatalog(products, '1000 TL altı').length, 8);
assert.equal(searchCatalog(products, 'Beyaz Orkide').length, 3);
assert.ok(searchCatalog(products, 'doğum günü').length > 0);
assert.deepEqual(searchCatalog(products, 'KIRMIZI GÜL').map(p => p.id), searchCatalog(products, 'kirmizi gul').map(p => p.id));
assert.equal((await db.searchProducts('1000 TL altı')).length, 8);
const product = products.find(p => p.id === '52');
const first = { deliveryDate: '2026-10-10', cardMessage: { message: 'İyi ki doğdun.', isAnonymous: false } };
useCartStore.getState().addItem(product, 1, first);
useCartStore.getState().addItem(product, 2, first);
assert.equal(useCartStore.getState().items.length, 1);
assert.equal(useCartStore.getState().items[0].quantity, 3);
useCartStore.getState().addItem(product, 1, { ...first, deliveryDate: '2026-10-11' });
assert.equal(useCartStore.getState().items.length, 2, 'Different deliveries must stay separate.');
useCartStore.getState().addItem(product, 1, { ...first, cardMessage: { message: 'Seni seviyorum.', isAnonymous: false } });
assert.equal(useCartStore.getState().items.length, 3, 'Different card messages must stay separate.');
assert.equal(useCartStore.getState().getSubtotal(), product.price * 5);
useCartStore.getState().addItem(product, NaN);
assert.equal(useCartStore.getState().getItemCount(), 5);
assert.equal(await db.getOrderByIdOrNumber('ABC'), null);
console.log(`PASS: ${products.length} products, ${addons.length} extras, ${manifest.assets.length} valid source images; Turkish search, budgets, distinct delivery/card cart lines and totals.`);

if (process.env.PREVIEW_URL) {
  const base = process.env.PREVIEW_URL;
  const routes = ['/', '/cicekler', '/cicekler?cat=orkideler&delivery=same-day', '/hakkimizda', '/checkout', '/siparis-takip', '/ozel-gunler/sevgiliye', '/sitemap.xml', ...products.map(p => `/urun/${p.slug}`)];
  for (let i = 0; i < routes.length; i += 4) {
    await Promise.all(routes.slice(i, i + 4).map(async route => {
      const response = await fetch(base + route, { signal: AbortSignal.timeout(20000) });
      assert.equal(response.status, 200, route);
      await response.text();
    }));
  }
  for (const [route, method, status] of [['/api/orders?all=true', 'GET', 403], ['/api/orders?code=ABC', 'GET', 400], ['/api/orders', 'PATCH', 403], ['/api/checkout', 'POST', 503]]) {
    assert.equal((await fetch(base + route, { method })).status, status, route);
  }
  // Next.js streamed notFound() responses can have HTTP 200, with noindex.
  const missing = await fetch(base + '/urun/bulunmayan-cicek');
  const missingHtml = await missing.text();
  assert.ok(missingHtml.includes('noindex') && missingHtml.includes('Yeni bir çiçekle başlayalım.'));
  console.log(`PASS: ${routes.length} page URLs; unknown products render the noindex not-found page; unconfigured payment and unauthenticated order mutations are blocked.`);
}

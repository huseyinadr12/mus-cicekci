import fs from 'node:fs/promises';
import path from 'node:path';

// Read-only import of the public catalogue. Never submits an order or contact form.
const origin = 'https://www.muscicekci.net';
const pages = new Map();
const assets = new Map();
const failures = [];
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
async function read(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  return response.text();
}
const home = await read(origin);
pages.set(origin + '/', home);
const links = [...new Set([...home.matchAll(/href="([^"]+)"/g)].map(m => new URL(decode(m[1]), origin)).filter(u => /(^|\.)muscicekci\.net$/.test(u.hostname) && /^\/(urun|kategori|blog)\/|^\/(hakkimizda|iletisim)$/.test(u.pathname)).map(u => origin + u.pathname))];
for (let i = 0; i < links.length; i += 4) {
  await Promise.all(links.slice(i, i + 4).map(async url => {
    try { pages.set(url, await read(url)); } catch (e) { failures.push(String(e)); }
  }));
}
// Include any products linked only from a category page.
const extraProducts = [...new Set([...pages.values()].flatMap(html => [...html.matchAll(/href="([^"]*\/urun\/[^"?#]+)"/g)].map(m => origin + new URL(m[1], origin).pathname)))].filter(url => !pages.has(url));
for (const url of extraProducts) {
  try { pages.set(url, await read(url)); } catch (e) { failures.push(String(e)); }
}
for (const [pageUrl, html] of pages) {
  for (const match of html.matchAll(/(?:src|data-src)=["']([^"']+)["']|url\(["']?([^\s)'" ]+)/g)) {
    const url = new URL(decode(match[1] || match[2]), pageUrl);
    if (!/(^|\.)muscicekci\.net$/.test(url.hostname) || !/\.(jpg|jpeg|png|webp|gif|svg)$/i.test(url.pathname)) continue;
    url.hostname = 'www.muscicekci.net'; url.protocol = 'https:';
    const localPath = '/images/source' + url.pathname.replace(/^\/assets\/images/, '');
    if (!assets.has(url.href)) assets.set(url.href, { sourceUrl: url.href, localPath, usedOn: [] });
    assets.get(url.href).usedOn.push(pageUrl);
  }
}
const downloaded = [];
const entries = [...assets.values()];
for (let i = 0; i < entries.length; i += 4) {
  await Promise.all(entries.slice(i, i + 4).map(async asset => {
    try {
      const response = await fetch(asset.sourceUrl, { signal: AbortSignal.timeout(20000) });
      if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error(`Invalid image: ${asset.sourceUrl}`);
      const file = path.join('public', asset.localPath);
      await fs.mkdir(path.dirname(file), { recursive: true });
      await fs.writeFile(file, Buffer.from(await response.arrayBuffer()));
      downloaded.push(asset);
    } catch (e) { failures.push(String(e)); }
  }));
}
const productMap = new Map();
for (const html of pages.values()) {
  for (const match of html.matchAll(/<div class="product">\s*<a href="([^"]+)">([\s\S]*?)<\/a>/g)) {
    const [, url, card] = match;
    const parts = new URL(url).pathname.match(/\/urun\/(\d+)-(.+)/);
    if (!parts || productMap.has(parts[1])) continue;
    const name = card.match(/<h3>(.*?)<\/h3>/)?.[1];
    const previous = card.match(/class="oncekifiyat">([\d,.]+)/)?.[1];
    const price = card.match(/<\/span>\s*([\d,]+)<i>/)?.[1];
    const detail = pages.get(origin + new URL(url).pathname) || card;
    const photo = [...detail.matchAll(/<img[^>]+src="([^"]*\/products\/[^" ]+)"/g)].map(m => m[1]).find(src => !src.includes('/t_')) || card.match(/src="([^"]+)"/)?.[1];
    const asset = downloaded.find(a => a.sourceUrl === photo);
    if (!name || !price || !asset) { failures.push(`Incomplete product ${url}`); continue; }
    const categories = [...pages].filter(([u, h]) => u.includes('/kategori/') && h.includes(url)).map(([u]) => new URL(u).pathname.replace(/\/kategori\/\d+-/, ''));
    productMap.set(parts[1], { id: parts[1], slug: parts[2], name: decode(name), price: Number(price.replaceAll(',', '')), originalPrice: Number(previous?.replaceAll(',', '')), image: asset.localPath, sourceUrl: url, occasions: categories });
  }
}
await fs.mkdir('src/lib/data', { recursive: true });
const detailPage = [...pages].find(([url]) => url.includes('/urun/'))?.[1] || '';
const addons = [...detailPage.matchAll(/<div class="productcard">([\s\S]*?)<\/div>/g)].map(([, card]) => ({
  id: 'source-card-' + card.match(/value="(\d+)"/)?.[1],
  name: decode(card.match(/<img alt="([^"]+)"/)?.[1] || ''),
  category: 'card', price: Number(card.match(/data-fiyat="(\d+)"/)?.[1]),
  image: card.match(/src="([^"]+)"/)?.[1].replace(origin + '/assets/images/', '/images/source/'),
  description: 'Kaynak sitedeki orijinal kart / hediye seçeneği.',
}));
await fs.writeFile('src/lib/data/source-addons.json', JSON.stringify(addons, null, 2) + '\n');
await fs.writeFile('src/lib/data/source-products.json', JSON.stringify([...productMap.values()], null, 2) + '\n');
await fs.writeFile('public/images/source/manifest.json', JSON.stringify({ importedAt: new Date().toISOString(), source: origin, pageCount: pages.size, assets: downloaded, failures }, null, 2) + '\n');
console.log(JSON.stringify({ pages: pages.size, images: downloaded.length, products: productMap.size, failures }, null, 2));

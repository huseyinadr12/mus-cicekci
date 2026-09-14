import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

// Export from an isolated copy so the normal Next.js server and APIs stay intact.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const staging = path.join(root, 'tmp', 'pages-build');
if (path.dirname(staging) !== path.join(root, 'tmp')) throw new Error('Invalid staging directory');
await fs.rm(staging, { recursive: true, force: true });
await fs.mkdir(staging, { recursive: true });
for (const name of ['src', 'public', 'package.json', 'package-lock.json', 'tsconfig.json', 'next.config.ts', 'postcss.config.mjs']) {
  await fs.cp(path.join(root, name), path.join(staging, name), {
    recursive: true,
    filter: source => source !== path.join(root, 'src', 'app', 'api'),
  });
}
await fs.symlink(path.join(root, 'node_modules'), path.join(staging, 'node_modules'), process.platform === 'win32' ? 'junction' : 'dir');
// Pages is a visual demo: no order forms, authentication or server requests.
for (const route of ['checkout', 'siparis-takip', 'admin']) {
  await fs.writeFile(path.join(staging, 'src', 'app', route, 'page.tsx'), 'export { default } from "@/components/PreviewOnly";\n');
}
for (const route of ['robots.ts', 'sitemap.ts']) {
  const file = path.join(staging, 'src', 'app', route);
  await fs.writeFile(file, `export const dynamic = "force-static";\n${await fs.readFile(file, 'utf8')}`);
}
const result = spawnSync(process.execPath, [path.join(root, 'node_modules', 'next', 'dist', 'bin', 'next'), 'build', '--webpack'], {
  cwd: staging,
  env: { ...process.env, PAGES_WORKSPACE_ROOT: root, NEXT_PUBLIC_PAGES_DEMO: 'true', NEXT_TELEMETRY_DISABLED: '1' },
  stdio: 'inherit',
});
if (result.status !== 0) process.exit(result.status || 1);
await fs.writeFile(path.join(staging, 'out', '.nojekyll'), '');
console.log('GitHub Pages artifact: tmp/pages-build/out');

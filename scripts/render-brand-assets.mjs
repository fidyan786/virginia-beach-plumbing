import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function render(svgPath, outPath, width) {
  const svg = readFileSync(join(root, svgPath), 'utf8').replace(/^\uFEFF/, '');
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { loadSystemFonts: true },
  });
  writeFileSync(join(root, outPath), resvg.render().asPng());
}

render('public/favicon.svg', 'public/favicon-32.png', 32);
render('public/logo.svg', 'public/logo.png', 512);
render('public/apple-touch-icon.svg', 'public/apple-touch-icon.png', 180);
render('public/og-image.svg', 'public/og-image.png', 1200);

console.log('Rendered favicon-32, logo, apple-touch-icon, and og-image PNGs.');

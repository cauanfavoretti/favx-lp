// Regenerates index.html from "FAVX Landing Page.dc.html" for static hosting
// (Vercel / GitHub Pages / Netlify). The .dc.html is a builder format: its
// <x-dc>/<helmet> wrappers, its starter scaffolding and its <script
// type="text/x-dc"> logic all matter to the builder but are dead weight in a
// browser. This strips them so the shipped page is plain, browser-native HTML.
//
// Run after editing the .dc.html:  node build.js
const fs = require('fs');

const SRC = 'FAVX Landing Page.dc.html';
const OUT = 'index.html';

// Single lines removed wherever they appear.
const drop = new Set([
  '<script src="./support.js"></script>',
  // <image-slot> is builder starter scaffolding: 62 KB of render-blocking JS
  // for a custom element the page never instantiates. The CSS var that styles
  // it goes with it.
  '<script src="./image-slot.js"></script>',
  'image-slot{--is-bg:transparent;}',
  '<x-dc>', '</x-dc>',
  '<helmet>', '</helmet>',
]);

// Multi-line regions removed from the opening line through the closing one.
// The browser never runs a script with a non-JS type, but it still downloads it.
const dropBlocks = [
  { start: (ln) => ln.startsWith('<script type="text/x-dc"'), end: (ln) => ln === '</script>' },
];

const lines = fs.readFileSync(SRC, 'utf8').split('\n');
const out = [];
let closing = null;

for (const ln of lines) {
  const t = ln.trim();

  if (closing) {
    if (closing(t)) closing = null;
    continue;
  }

  const block = dropBlocks.find((b) => b.start(t));
  if (block) {
    closing = block.end;
    continue;
  }

  if (!drop.has(t)) out.push(ln);
}

if (closing) throw new Error('Unterminated drop block — refusing to write a truncated ' + OUT);

fs.writeFileSync(OUT, out.join('\n'));
console.log(`Wrote ${OUT} (${out.length} lines, ${(out.join('\n').length / 1024).toFixed(1)} KB) from "${SRC}"`);

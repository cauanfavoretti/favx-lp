// Regenerates index.html from "FAVX Landing Page.dc.html" for static hosting
// (Vercel / GitHub Pages / Netlify). The .dc.html is a builder format whose
// <x-dc>/<helmet> wrappers aren't needed by a browser — this strips them so the
// page is plain, browser-native HTML, and drops the dead ./support.js reference.
//
// Run after editing the .dc.html:  node build.js
const fs = require('fs');

const SRC = 'FAVX Landing Page.dc.html';
const OUT = 'index.html';
const drop = new Set([
  '<script src="./support.js"></script>',
  '<x-dc>', '</x-dc>',
  '<helmet>', '</helmet>',
]);

const out = fs.readFileSync(SRC, 'utf8').split('\n').filter((ln) => !drop.has(ln.trim()));
fs.writeFileSync(OUT, out.join('\n'));
console.log(`Wrote ${OUT} (${out.length} lines) from "${SRC}"`);

const fs = require('fs');

console.log("Reading tex file...");
const content = fs.readFileSync('fa8c40_805f3e454a164918a546493b6f238bcf.tex', 'utf8');

// A put line looks like: \put(x,y){...text...}
// We can extract put using regex matching \put\(([^,]+),([^)]+)\)\{(.*)\} where the last closing brace matches the line
const lines = content.split('\n');
console.log("Total lines:", lines.length);

const puts = [];
const lineRegex = /^\\put\(([-0-9.]+),([-0-9.]+)\)\{.*\\selectfont(?:\\color\{[^}]+\})?(.*)\}$/;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  const m = line.match(lineRegex);
  if (m) {
    const x = parseFloat(m[1]);
    const y = parseFloat(m[2]);
    let rawText = m[3];
    // clean rawText: remove trailing '}' if any from the put wrapping
    // rawText is what's inside
    puts.push({ lineNum: i + 1, x, y, text: rawText });
  }
}

console.log("Extracted puts:", puts.length);

// Let's find pages or reconstruct text
// In these documents, pages typically reset y or have distinct markers like \begin{tikzpicture}[overlay]
let pageNum = 1;
const pages = [[]];

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('\\begin{picture}')) {
    pages.push([]);
  }
  const m = lines[i].trim().match(lineRegex);
  if (m) {
    const x = parseFloat(m[1]);
    const y = parseFloat(m[2]);
    let text = m[3];
    pages[pages.length - 1].push({ x, y, text });
  }
}

console.log("Total pages detected:", pages.length);

function getPageText(pagePuts) {
  const sorted = [...pagePuts].sort((a, b) => {
    if (Math.abs(b.y - a.y) > 2) return b.y - a.y; // top to bottom
    return a.x - b.x; // left to right
  });

  let text = "";
  let lastY = null;
  for (const p of sorted) {
    if (lastY !== null && Math.abs(p.y - lastY) > 3) {
      text += "\n";
    }
    text += p.text;
    lastY = p.y;
  }
  return text;
}

// Print first 45 pages summary
for (let p = 1; p < Math.min(pages.length, 50); p++) {
  const txt = getPageText(pages[p]);
  const firstLine = txt.trim().split('\n').slice(0, 3).join(' | ');
  console.log(`Page ${p} (puts: ${pages[p].length}): ${firstLine.substring(0, 120)}`);
}

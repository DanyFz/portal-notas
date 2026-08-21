const fs = require('fs');

const content = fs.readFileSync('fa8c40_805f3e454a164918a546493b6f238bcf.tex', 'utf8');
const lines = content.split('\n');

const lineRegex = /^\\put\(([-0-9.]+),([-0-9.]+)\)\{.*\\selectfont(?:\\color\{[^}]+\})?(.*)\}$/;

const pageBlocks = [];
let cur = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('\\begin{picture}')) {
    if (cur.length > 0) pageBlocks.push(cur);
    cur = [];
  }
  const m = lines[i].trim().match(lineRegex);
  if (m) {
    const x = parseFloat(m[1]);
    const y = parseFloat(m[2]);
    let text = m[3].replace(/\\textbar/g, "|")
                   .replace(/\\emptyset/g, "∅")
                   .replace(/\\in/g, "∈")
                   .replace(/\\subseteq/g, "⊆")
                   .replace(/\\cup/g, "∪")
                   .replace(/\\cap/g, "∩")
                   .replace(/\\times/g, "×")
                   .replace(/\\cdot/g, "·")
                   .replace(/\\leq/g, "≤")
                   .replace(/\\geq/g, "≥")
                   .replace(/\\neq/g, "≠")
                   .replace(/6=/g, "≠")
                   .replace(/´ı/g, "í")
                   .replace(/´a/g, "á")
                   .replace(/´e/g, "é")
                   .replace(/´o/g, "ó")
                   .replace(/´u/g, "ú")
                   .replace(/\\textquestiondown/g, "¿");
    cur.push({ x, y, text });
  }
}
if (cur.length > 0) pageBlocks.push(cur);

function extractText(puts) {
  const sorted = [...puts].sort((a, b) => {
    if (Math.abs(b.y - a.y) > 2) return b.y - a.y;
    return a.x - b.x;
  });
  let text = "";
  let lastY = null;
  for (const p of sorted) {
    if (lastY !== null && Math.abs(p.y - lastY) > 3) text += "\n";
    text += p.text;
    lastY = p.y;
  }
  return text;
}

// Write out the text of the first 40 pages to a file
let fullFirst40 = "";
for (let i = 0; i < Math.min(pageBlocks.length, 600); i++) {
  const t = extractText(pageBlocks[i]).trim();
  if (t.length > 0) {
    fullFirst40 += `\n--- SECTION/PAGE ${i+1} ---\n` + t + "\n";
  }
}
fs.writeFileSync('scratch/extracted_book.txt', fullFirst40, 'utf8');
console.log("Extracted length:", fullFirst40.length);

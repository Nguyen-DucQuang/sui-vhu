const fs = require('fs');
const path = require('path');

function rand(seed) {
  // simple deterministic pseudo-random based on seed
  let x = Math.abs(Math.sin(seed) * 10000);
  return x - Math.floor(x);
}

function generate(count) {
  const items = [];
  for (let i = 1; i <= count; i++) {
    const id = `obj_mock_${String(i).padStart(3, '0')}`;
    const seed = Date.now() + i;
    const price = Math.round((rand(seed) * 500 + (i % 10)) * 100) / 100;
    const aiConfidence = Math.round(rand(seed + 1) * 100);
    const verified = rand(seed + 2) > 0.5;
    items.push({
      id,
      name: `Auto Mock NFT #${String(i).padStart(3, '0')}`,
      collection: `Auto Collection ${((i - 1) % 10) + 1}`,
      collectionAvatar: `https://picsum.photos/seed/${encodeURIComponent(id)}-col/80/80`,
      image: `https://picsum.photos/seed/${encodeURIComponent(id)}-img/600/600`,
      price,
      aiConfidence,
      verified
    });
  }
  return items;
}

async function main() {
  const arg = process.argv[2] || '50';
  const count = Math.max(1, Math.min(1000, parseInt(arg, 10) || 50));
  const out = generate(count);
  const outPath = path.join(__dirname, '..', 'public', 'mock-nfts.json');
  // ensure directory
  const outDir = path.dirname(outPath);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
  console.log(`Wrote ${out.length} mock NFTs to ${outPath}`);
}

main().catch((e) => { console.error(e); process.exit(1); });

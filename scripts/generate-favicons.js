const sharp = require('sharp');
const pngToIco = require('png-to-ico').default;
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'public', 'images', 'logo.png');
const outDir = path.join(__dirname, '..', 'public');

const sizes = [16, 32, 48, 180, 192, 512];

async function run() {
  if (!fs.existsSync(src)) {
    console.error('Source image not found:', src);
    process.exit(1);
  }

  const pngPaths = [];
  for (const size of sizes) {
    const p = path.join(outDir, `icon-${size}.png`);
    await sharp(src)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(p);
    pngPaths.push(p);
    console.log('Wrote', p);
  }

  // Create favicon.ico from 16,32,48
  const icoPngs = [
    path.join(outDir, 'icon-16.png'),
    path.join(outDir, 'icon-32.png'),
    path.join(outDir, 'icon-48.png'),
  ];

  const icoBuffer = await pngToIco(icoPngs);
  fs.writeFileSync(path.join(outDir, 'favicon.ico'), icoBuffer);
  console.log('Wrote', path.join(outDir, 'favicon.ico'));

  // apple touch icon
  fs.copyFileSync(path.join(outDir, 'icon-180.png'), path.join(outDir, 'apple-touch-icon.png'));
  console.log('Wrote', path.join(outDir, 'apple-touch-icon.png'));

  console.log('Icon generation complete.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

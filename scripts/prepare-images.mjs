// Resizes and compresses the photos in photos-original/ into public/images/.
// own-*.jpg are the studio's own photos; the rest are from Unsplash
// (free for commercial use, no attribution required).
import sharp from "sharp";
import { readdirSync } from "node:fs";

const SRC = "photos-original";
const OUT = "public/images";

// Crops the name labels off the bottom of the studio's own photos.
const CROPS = {
  "own-lash.jpg": { left: 0, top: 0, width: 1440, height: 1200 },
  "own-nails-red.jpg": { left: 0, top: 0, width: 1152, height: 1200 },
};

for (const file of readdirSync(SRC).filter((f) => f.endsWith(".jpg"))) {
  const img = sharp(`${SRC}/${file}`);
  if (CROPS[file]) img.extract(CROPS[file]);
  await img
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(`${OUT}/${file}`);
  console.log("✓", file);
}

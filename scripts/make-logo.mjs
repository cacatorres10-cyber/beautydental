/**
 * Derives every logo variant the site needs from one artwork file.
 *
 *   node scripts/make-logo.mjs [public/brand/logo.png]
 *
 * The clinic's logo is a stacked lockup: monogram over wordmark over
 * tagline. At the height of a navbar that whole stack shrinks until the
 * lettering is unreadable, so the pieces are also cut apart and set side by
 * side there. And the lettering is black, so anywhere the bar sits on the
 * dark opening photo needs a version with it in white; the monogram's gold
 * is left alone, which is what the saturation test below is for.
 *
 * Written out, all relative to public/brand/:
 *
 *   logo.png / logo-light.png              the full stacked lockup
 *   logo-mark.png / logo-mark-light.png    the monogram and its arc
 *   logo-word.png / logo-word-light.png    the wordmark and the tagline
 *
 * Re-run it whenever the clinic sends new artwork.
 */
import sharp from "sharp";
import path from "node:path";

const SOURCE = process.argv[2] ?? "public/brand/logo.png";
const OUT = path.dirname(SOURCE);

/** Bounding box of everything that is not transparent. */
async function contentBox(input) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let minX = Infinity, minY = Infinity, maxX = -1, maxY = -1;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * 4 + 3] > 12) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { minX, minY, maxX, maxY, width: info.width, height: info.height };
}

/** Rows with nothing on them, which is where one band ends and the next starts. */
async function emptyRows(input) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const empty = [];
  for (let y = 0; y < info.height; y++) {
    let filled = 0;
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * 4 + 3] > 12) filled++;
    }
    if (filled === 0) empty.push(y);
  }
  return { empty, height: info.height };
}

/**
 * Repaints the near-neutral dark pixels white and leaves the coloured ones
 * alone, so the lettering flips for a dark ground while the gold survives.
 */
async function toLight(input, output) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 8) continue;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const saturation = max === 0 ? 0 : (max - min) / max;
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    if (saturation < 0.28 && luminance < 150) {
      data[i] = 255;
      data[i + 1] = 253;
      data[i + 2] = 246;
    }
  }
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(output);
}

const box = await contentBox(SOURCE);
const pad = 8;
const trimmed = await sharp(SOURCE)
  .extract({
    left: Math.max(0, box.minX - pad),
    top: Math.max(0, box.minY - pad),
    width: Math.min(box.width, box.maxX - box.minX + 1 + pad * 2),
    height: Math.min(box.height, box.maxY - box.minY + 1 + pad * 2),
  })
  .png({ compressionLevel: 9 })
  .toBuffer();

await sharp(trimmed).toFile(path.join(OUT, "logo.png"));
await toLight(path.join(OUT, "logo.png"), path.join(OUT, "logo-light.png"));

// The widest empty gap splits the monogram from the lettering below it.
const { empty, height } = await emptyRows(trimmed);
const runs = [];
for (const y of empty) {
  const last = runs[runs.length - 1];
  if (last && last[1] === y - 1) last[1] = y;
  else runs.push([y, y]);
}
const inner = runs.filter(([a, b]) => a > height * 0.2 && b < height * 0.85);
const split = inner.length
  ? Math.round((inner[0][0] + inner[0][1]) / 2)
  : Math.round(height * 0.6);

for (const [name, top, bottom] of [
  ["logo-mark", 0, split],
  ["logo-word", split + 1, height - 1],
]) {
  const strip = await sharp(trimmed)
    .extract({ left: 0, top, width: box.maxX - box.minX + 1 + pad * 2, height: bottom - top + 1 })
    .toBuffer();
  const inked = await contentBox(strip);
  const file = path.join(OUT, `${name}.png`);
  await sharp(strip)
    .extract({
      left: Math.max(0, inked.minX - 2),
      top: 0,
      width: Math.min(inked.width, inked.maxX - inked.minX + 5),
      height: inked.height,
    })
    .png({ compressionLevel: 9 })
    .toFile(file);
  await toLight(file, path.join(OUT, `${name}-light.png`));
  console.log(name, "written");
}

console.log("split at row", split, "of", height);

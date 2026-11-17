import { readdir, readFile, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imageDir = path.resolve("out/images");
const imageNames = await readdir(imageDir);
let originalBytes = 0;
let optimizedBytes = 0;

for (const name of imageNames) {
  const file = path.join(imageDir, name);
  const source = await readFile(file);
  originalBytes += source.byteLength;
  if (name.endsWith(".webp")) {
    const optimized = await sharp(source).webp({ quality: 80, alphaQuality: 85, effort: 5 }).toBuffer();
    await writeFile(file, optimized);
    optimizedBytes += optimized.byteLength;
  } else if (name === "hero-ridge-ochre-patch-v2.png") {
    const webp = await sharp(source).webp({ quality: 84, alphaQuality: 90, effort: 6 }).toBuffer();
    await writeFile(path.join(imageDir, "hero-ridge-ochre-patch-v2.webp"), webp);
    optimizedBytes += webp.byteLength;
    await unlink(file);
  } else {
    optimizedBytes += source.byteLength;
  }
}

async function rewriteReferences(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await rewriteReferences(file);
    } else if ([".html", ".js", ".css", ".json"].includes(path.extname(entry.name))) {
      const original = await readFile(file, "utf8");
      const updated = original.replaceAll("hero-ridge-ochre-patch-v2.png", "hero-ridge-ochre-patch-v2.webp");
      if (updated !== original) await writeFile(file, updated, "utf8");
    }
  }
}

await rewriteReferences(path.resolve("out"));
const reduction = originalBytes ? Math.round((1 - optimizedBytes / originalBytes) * 100) : 0;
console.log(`Optimized Pages image assets: ${(originalBytes / 1048576).toFixed(2)} MiB -> ${(optimizedBytes / 1048576).toFixed(2)} MiB (${reduction}% smaller).`);


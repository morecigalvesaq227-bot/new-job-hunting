import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const assetPrefix = "/new-job-hunting";
const textExtensions = new Set([".html", ".js", ".css", ".json", ".xml", ".txt"]);

async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await visit(file);
      continue;
    }
    if (!textExtensions.has(path.extname(entry.name))) continue;
    const original = await readFile(file, "utf8");
    const updated = original
      .replace(/(?<![\w.-])\/images\//g, `${assetPrefix}/images/`)
      .replace(/(?<![\w.-])\/resume\.pdf(?=[?#"'\s)]|$)/g, `${assetPrefix}/resume.pdf`);
    if (updated !== original) await writeFile(file, updated, "utf8");
  }
}

await visit(root);

const missingAssets = new Set();
async function validateAssets(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await validateAssets(file);
      continue;
    }
    if (!textExtensions.has(path.extname(entry.name))) continue;
    const contents = await readFile(file, "utf8");
    for (const match of contents.matchAll(/\/new-job-hunting\/images\/([^"'\x60)\s?#]+)/g)) {
      const assetPath = path.resolve(root, "images", match[1]);
      if (!assetPath.startsWith(path.resolve(root, "images") + path.sep)) continue;
      try {
        await readFile(assetPath);
      } catch {
        missingAssets.add(match[0]);
      }
    }
  }
}

await validateAssets(root);
if (missingAssets.size) {
  throw new Error(`Missing exported image assets:\n${[...missingAssets].sort().join("\n")}`);
}
console.log(`Prepared ${root} for ${assetPrefix}/ and verified referenced images.`);

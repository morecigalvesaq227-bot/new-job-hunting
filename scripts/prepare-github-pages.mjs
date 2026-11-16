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
console.log(`Prepared ${root} for ${assetPrefix}/`);

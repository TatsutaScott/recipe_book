import fs from "node:fs/promises";
import path from "node:path";

const RECIPES_DIR = path.resolve("public/recipes");
const OUT_FILE = path.resolve("public/recipes-index.json");

// pick only the fields your TOC needs
function toIndexItem(recipe, fallbackId) {
  const id = recipe.id ?? fallbackId;

  return {
    id,
    title: recipe.title ?? id,
    // either store thumbnail in recipe json, or derive it from id:
    //thumbnail: recipe.thumbnail ?? `/thumbnails/${id}.jpg`,
    tags: recipe.tags ?? [],
    // optional extras for sorting/filtering:
    // category: recipe.category ?? null,
    // time: recipe.time ?? null,
  };
}

const files = (await fs.readdir(RECIPES_DIR)).filter((f) => f.endsWith(".json"));

const index = [];

for (const file of files) {
  const fullPath = path.join(RECIPES_DIR, file);
  const raw = await fs.readFile(fullPath, "utf8");

  let recipe;
  try {
    recipe = JSON.parse(raw);

  } catch (e) {
    throw new Error(`Invalid JSON in ${file}: ${e.message}`);
  }

  const fallbackId = file.replace(/\.json$/, "");
  index.push(toIndexItem(recipe, fallbackId));
}

// Sort however you like
index.sort((a, b) => String(a.title ?? "").localeCompare(String(b.title ?? "")));

await fs.writeFile(OUT_FILE, JSON.stringify(index, null, 2) + "\n", "utf8");
console.log(`✅ Generated ${index.length} recipes → ${OUT_FILE}`);

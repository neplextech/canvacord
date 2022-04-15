import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { performance } from "node:perf_hooks";

let i = 0, start_time = performance.now();
const possibleImageFormats = [".png", ".jpg", ".jpeg", ".bmp", ".webp", ".tiff"];
const imageDir = path.resolve("./data/images");
const files = await fs.readdir(imageDir).then(res => {
    return res
        .filter(item => possibleImageFormats.includes(path.extname(item)))
        .map(m => ({
            ext: path.extname(m),
            fileName: m.replace(path.extname(m), ""),
            name: m,
            path: path.join(imageDir, m)
        }));
});

for (i = 1; i < files.length; i++) {
    const file = files[i];
    if (file.ext === ".png" && file.fileName.toUpperCase() === file.fileName) {
        console.log("-".repeat(30));
        console.log(`[${i}] Skipping ${file.name}`);
        console.log("-".repeat(30) + "\n");
        continue;
    }
    
    console.log("-".repeat(30));
    console.log(`[${i}] Step 1: Reading file ${file.name}`);
    const binary = await fs.readFile(file.path);
    console.log(`[${i}] Step 2: PNG Encoding ${file.name}`);
    const img = await sharp(binary).png({
        effort: 10
    }).toBuffer();
    console.log(`[${i}] Step 3: Deleting file ${file.name}`);
    await fs.unlink(file.path, img);
    console.log(`[${i}] Step 4: Writing file ${file.fileName.toUpperCase()}.png`);
    await fs.writeFile(path.join(imageDir, `${file.fileName.toUpperCase()}.png`), img);
    console.log(`[${i}] Conversion completed: ${file.name} => ${file.fileName.toUpperCase()}.png`);
    console.log("-".repeat(30) + "\n");
}

console.log(`Finished conversion of ${i}/${files.length} files in ${(performance.now() - start_time).toFixed(2)}ms`);
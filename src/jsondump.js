import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { performance } from "node:perf_hooks";

const start_time = performance.now();
const date = new Date();
const imgDir = path.resolve("./data/images");
const fontsDir = path.resolve("./data/fonts");
const GH_RAW_URL_BASE = "https://raw.githubusercontent.com/DevAndromeda/canvacord/assets/data";
const GH_URL_BASE = "https://github.com/DevAndromeda/canvacord/blob/assets/data";

console.log("Building JSON data of assets");
const imageFiles = await fs.readdir(imgDir).then(res => {
    return Promise.all(res.map(async m => {
        const stat = await fs.stat(path.join(imgDir, m));
        return {
            name: m,
            size: stat.size,
            size_formatted: `${(stat.size / (1024 * 1024)).toFixed(2)} MB`,
            file_name: m.replace(path.extname(m), ""),
            ext: path.extname(m),
            url: `${GH_RAW_URL_BASE}/images/${m}`,
            file_url: `${GH_URL_BASE}/images/${m}`
        };
    }));
});

const fontFiles = await fs.readdir(fontsDir).then(res => {
    return Promise.all(res.map(async m => {
        const stat = await fs.stat(path.join(fontsDir, m));
        return {
            name: m,
            size: stat.size,
            size_formatted: `${(stat.size / (1024 * 1024)).toFixed(2)} MB`,
            file_name: m.replace(path.extname(m), ""),
            ext: path.extname(m),
            url: `${GH_RAW_URL_BASE}/fonts/${m}`,
            file_url: `${GH_URL_BASE}/fonts/${m}`
        };
    }));
});

const datasrc = {
    id: crypto.randomUUID(),
    data: {
        images: imageFiles,
        fonts: fontFiles,
    },
    total_files: imageFiles.length + fontFiles.length,
    images_count: imageFiles.length,
    fonts_count: fontFiles.length,
    github: "https://github.com/DevAndromeda/canvacord",
    website: "https://canvacord.js.org",
    npm: "https://www.npmjs.com/package/canvacord",
    generated_timestamp: date.getTime(),
    generated_timestamp_iso: date.toISOString(),
    shasum: "https://raw.githubusercontent.com/DevAndromeda/canvacord/assets/shasum.txt"
};

const datasrc_stringified = JSON.stringify(datasrc);

const shasum = crypto.createHash("sha1").update(datasrc_stringified).digest("hex");

await fs.writeFile(path.resolve("./datasrc.json"), datasrc_stringified);
await fs.writeFile(path.resolve("./shasum.txt"), shasum);
console.log(`Finished JSON output of assets data in ${(performance.now() - start_time).toFixed(2)}ms!\n
${"-".repeat(30)}
Build id: ${datasrc.id}
Shasum: ${shasum}
Generated Timestamp: ${datasrc.generated_timestamp_iso}
Total Files: ${datasrc.total_files} (${datasrc.fonts_count} fonts, ${datasrc.images_count} images)
Shasum URL: ${datasrc.shasum}
Endpoint: https://raw.githubusercontent.com/DevAndromeda/canvacord/assets/datasrc.json
${"-".repeat(30)}`);

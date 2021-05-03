const fs = require("fs").promises;
const path = require("path");
const tsconfig = require("../tsconfig.json");

const src = path.resolve(__dirname, "..", "lib");
const lib = path.resolve(__dirname, "..", tsconfig.compilerOptions.outDir);

const start = async () => {
    const imported = [];
    const exported = [];
    const types = [];

    const libFiles = await fs.readdir(src);
    for (const fname of libFiles.filter(x => x.endsWith(".js"))) {
        const file = path.join(src, fname);
        const fkeys = Object.keys(require(file));
        const fsname = fname.replace(".js", "");

        if (fkeys.length) {
            imported.push(`const { ${fkeys.join(", ")} } = require("./${fsname}");`);
            exported.push(...fkeys.map(x => `   ${x}`));
            types.push(`export * from "./${fsname}";`);
        }
    }

    const indexJs = `${imported.join("\n")}\n\nmodule.exports = {\n${exported.join(",\n")}\n};`;
    await fs.writeFile(path.join(lib, "index.js"), indexJs);

    const indexDJs = `${types.join("\n")}`;
    await fs.writeFile(path.join(lib, "index.d.ts"), indexDJs);
}

start();
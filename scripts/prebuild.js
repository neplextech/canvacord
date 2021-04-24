const fs = require("fs").promises;
const path = require("path");
const tsconfig = require("../tsconfig.json");

const lib = path.resolve(__dirname, "..", tsconfig.compilerOptions.outDir);

const start = async () => {
    fs.rm(lib, {
        recursive: true,
        force: true
    });
}

start();
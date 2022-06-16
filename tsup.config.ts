import { defineConfig } from "tsup";

export default defineConfig({
    clean: true,
    dts: true,
    keepNames: true,
    entry: ["./src/index.ts"],
    minify: false,
    outDir: "dist",
    skipNodeModulesBundle: true,
    sourcemap: true,
    format: ["cjs", "esm"]
});
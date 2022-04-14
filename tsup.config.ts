import { defineConfig } from "tsup";

export default defineConfig({
    clean: true,
    dts: true,
    entry: ["src"],
    keepNames: true,
    minify: false,
    outDir: "dist",
    skipNodeModulesBundle: true,
    sourcemap: true,
    format: ["cjs", "esm"]
});
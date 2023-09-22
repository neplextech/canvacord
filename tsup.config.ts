import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: 'inline',
  minify: false,
  clean: true,
  keepNames: true,
  skipNodeModulesBundle: true,
  outDir: 'dist'
});

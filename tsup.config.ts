import { defineConfig, Options } from 'tsup';

export function createConfig({
  entry,
  format = ['cjs', 'esm'],
  dts = true,
  sourcemap = 'inline',
  minify = false,
  clean = true,
  keepNames = true,
  skipNodeModulesBundle = true,
  outDir = 'dist'
}: Options) {
  return defineConfig({
    entry,
    format,
    dts,
    sourcemap,
    minify,
    clean,
    keepNames,
    skipNodeModulesBundle,
    outDir
  });
}

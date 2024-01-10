import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    watch: false,
    sequence: {
      concurrent: false,
    },
  },
});

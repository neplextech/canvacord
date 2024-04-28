import { createDocumentation } from "micro-docgen";
import fse from "fs-extra";

const result = await createDocumentation({
  clean: true,
  flattenSingleModule: true,
  jsonName: "docs.json",
  markdown: false,
  input: ["."],
  noEmit: true,
});

await fse.writeFile("./apps/docs/src/data/docs.json", JSON.stringify(result));

console.log(`Generated in ${result.metadata.generationMs.toFixed(2)}ms`);

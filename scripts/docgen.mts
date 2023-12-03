import { createDocumentation } from "micro-docgen";
import { readdir } from "node:fs/promises";
import fse from "fs-extra";

const dataDir = "./apps/docs/src/pages/guide/[topic]/_data.tsx";

const getDisplayName = (name: string) => {
  return name
    .split(".")
    .shift()!
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};

async function getGuidesMeta() {
  const files = await readdir("./guides");
  const guides = await Promise.all(
    files.map(async (file) => {
      const child = await readdir(`./guides/${file}`);

      return {
        name: file.toLowerCase(),
        displayName: getDisplayName(file),
        pages: child.map((c) => ({
          name: c.toLowerCase(),
          displayName: getDisplayName(c),
          component: `lazy(() => import('../_guides/${file}/${c}'))`,
        })),
      };
    })
  );
  return guides;
}

const result = await createDocumentation({
  clean: true,
  flattenSingleModule: true,
  jsonName: "docs.json",
  markdown: false,
  input: ["."],
  noEmit: true,
});

await fse.writeFile("./apps/docs/src/data/docs.json", JSON.stringify(result));

await fse.copy("./guides", "./apps/docs/src/pages/guide/_guides");

const meta = await getGuidesMeta();

await fse.writeFile(
  dataDir,
  [
    "import { lazy } from 'react';",
    "",
    "export default function GuideData() {\n    return null;\n}",
    "",
    "export const pages = [",
    ...meta.map(
      (m) => `{
      name: "${m.name}",
      displayName: "${m.displayName}",
      pages: [
        ${m.pages
          .map(
            (p) => `{
          name: "${p.name}",
          displayName: "${p.displayName}",
          component: ${p.component},
        }`
          )
          .join(",\n")}
      ]
    }`
    ),
    "];",
    "",
  ].join("\n")
);

console.log(`Generated in ${result.metadata.generationMs.toFixed(2)}ms`);

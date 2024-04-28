import { join } from "path";
import {
  createTemplate,
  createImageGenerator,
  TemplateImage,
  type ImageSource,
} from "../src/index";
import { writeFile } from "fs/promises";

const StewieGriffin = createTemplate((image: ImageSource) => {
  return {
    width: 1024,
    height: 1024,
    steps: [
      {
        image: [
          {
            source: new TemplateImage(image),
            x: 180,
            y: 0,
            width: 680,
            height: 680,
          },
        ],
      },
      {
        image: [
          {
            source: new TemplateImage(
              join(__dirname, "stewie-griffin-source.png")
            ),
            x: 0,
            y: 0,
          },
        ],
      },
    ],
  };
});

async function main() {
  const targetImage = "https://cdn.discordapp.com/embed/avatars/0.png";
  const output = await createImageGenerator(
    StewieGriffin(targetImage)
  ).render();

  const result = await output.encode("png");

  await writeFile(join(__dirname, "stewie-griffin-result.png"), result);
}

main();

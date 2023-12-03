## Custom Image Generation

```ts
import {
  createTemplate,
  ImageFactory,
  TemplateImage,
  createImageGenerator,
} from "canvacord";

const AffectedMeme = createTemplate((image: ImageSource) => {
  return {
    steps: [
      {
        image: [
          {
            source: new TemplateImage(ImageFactory.AFFECT),
            x: 0,
            y: 0,
          },
        ],
      },
      {
        image: [
          {
            source: new TemplateImage(image),
            x: 180,
            y: 383,
            width: 200,
            height: 157,
          },
        ],
      },
    ],
  };
});

// get target photo to use on "affected" meme image
const photo = await getPhotoForMemeSomehow();
const generator = createImageGenerator(AffectedMeme(photo));

// render out the image
await generator.render();

// get the resulting image in png format
const affectedMeme = await generator.encode("png");
```

## Result

![output](https://raw.githubusercontent.com/neplextech/canvacord/main/packages/canvacord/test/canvas/affected.png)

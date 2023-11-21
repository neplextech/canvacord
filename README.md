[![SWUbanner](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner2-direct.svg)](https://vshymanskyy.github.io/StandWithUkraine)

# Canvacord

Easily generate images on-the-fly with node.js using wide range of templates.

> **Warning**
>
> You are looking at the next version of canvacord, which is under development. Go to the [legacy branch](https://github.com/neplextech/canvacord/tree/legacy) to view legacy codebase.

## Features

- image generation _(wip)_
- image manipulation _(wip)_
- image templates _(wip)_
- image filters _(wip)_
- complex layouts _(wip)_
- templates api _(wip)_
- builder api _(wip)_

## Example

### Image Generation

#### Using built-in templates (New "Legacy api")

<!-- prettier-ignore -->
```ts
import { canvacord } from 'canvacord';
import fs from 'node:fs';

// triggered gif
const triggered = await canvacord.triggered(image);
triggered.pipe(fs.createWriteStream('triggered.gif'));

// image generation
const beautiful = await canvacord.beautiful(img);
const facepalm = await canvacord.facepalm(img);

// filters
const filtered = await canvacord
    .filters(512, 512)
    .drawImage(image)
    .hueRotate(90)
    .invert(2)
    .sepia(1)
    .opacity(0.5)
    .saturate(2)
    .encode();

// alternative syntax
const filtered = await canvacord(image, 512, 512)
    .hueRotate(90)
    .invert(2)
    .sepia(1)
    .opacity(0.5)
    .saturate(2)
    .encode();

fs.writeFileSync('filtered.png', filtered);
```

## XP Card

```ts
import { Font, RankCardBuilder } from 'canvacord';
import { writeFile } from 'fs/promises';

// load default font
Font.loadDefault();

const card = new RankCardBuilder()
  .setUsername('Lost Ctrl')
  .setDisplayName('thearchaeopteryx')
  .setAvatar('...')
  .setCurrentXP(3800)
  .setRequiredXP(2500)
  .setLevel(54)
  .setRank(32)
  .setStatus('online');

const image = await card.build({
  format: 'png'
});

await writeFileSync('./card.png', data);
```

![xp-card](https://raw.githubusercontent.com/neplextech/canvacord/main/test/jsx/test2.svg)

## Creating images using custom template

```ts
import { createTemplate, ImageFactory, TemplateImage, createImageGenerator } from 'canvacord';

const AffectedMeme = createTemplate((image: ImageSource) => {
  return {
    steps: [
      {
        image: [
          {
            source: new TemplateImage(ImageFactory.AFFECT),
            x: 0,
            y: 0
          }
        ]
      },
      {
        image: [
          {
            source: new TemplateImage(image),
            x: 180,
            y: 383,
            width: 200,
            height: 157
          }
        ]
      }
    ]
  };
});

// get target photo to use on "affected" meme image
const photo = await getPhotoForMemeSomehow();
const generator = createImageGenerator(AffectedMeme(photo));

// render out the image
await generator.render();

// get the resulting image in png format
const affectedMeme = await generator.encode('png');
```

#### Result

![output](https://raw.githubusercontent.com/neplextech/canvacord/main/test/canvas/affected.png)

## Creating images using custom builder

This is an advanced method of creating images. Canvacord builder api allows you to create your own image generator using JSX elements and a subset of tailwind class names. This is also possible without JSX, you can find an example [here](https://github.com/neplextech/canvacord/blob/7651c1aa51a844c2591cbe68a6e21eb9d1d6287a/benchmark/jsx-renderer.mjs).

If you want to use JSX with typescript, you need to add the following options to your `tsconfig.json`:

```jsonc
{
  "compilerOptions": {
    // other options
    "jsx": "react",
    "jsxFactory": "JSX.createElement",
    "jsxFragmentFactory": "JSX.Fragment"
  }
  // other options
}
```

You can also use pragma comments to define JSX factory and fragment factory:

```js
/** @jsx JSX */
/** @jsxFrag JSX */
```

```tsx
// JSX import is required if you want to use JSX syntax
// Builder is a base class to create your own builders
// Font is a utility class to load fonts
import { JSX, Builder, Font } from 'canvacord';
import { writeFile } from 'fs/promises';

// declare props types
interface Props {
  text: string;
}

class Design extends Builder<Props> {
  constructor() {
    // set width and height
    super(500, 500);
    // initialize props
    this.bootstrap({ text: '' });
  }

  // define custom methods for your builder
  setText(text: string) {
    this.options.set('text', text);
    return this;
  }

  // this is where you have to define how the resulting image should look like
  async render() {
    return (
      <div className="flex items-center justify-center h-full w-full bg-teal-500">
        <h1 className="text-white font-bold text-7xl">{this.options.get('text')}</h1>
      </div>
    );
  }
}

// usage
// load font
Font.loadDefault();

// create design
const design = new Design().setText('Hello World');
const image = await design.build({ format: 'png' });

// do something with generated image
await writeFile('./test.png', image);
```

#### Result

![output](https://github.com/neplextech/canvacord/assets/46562212/c50d09d6-33c4-4b44-81c2-aed6783f503c)

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

## Example

### Image Generation

<!-- prettier-ignore -->
```ts
import { canvacord } from 'canvacord';
import fs from 'node:fs';

// triggered gif
const triggered = await canvacord.triggered(image);
triggered.pipe(fs.createWriteStream('triggered.gif'));

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

## XP Card Preview

![xp-card](https://raw.githubusercontent.com/neplextech/canvacord/main/test/jsx/test2.svg)

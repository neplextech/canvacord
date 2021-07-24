# Canvacord
Simple & easy to use image manipulation module.

# v6 WIP

> [https://canvacord.js.org](https://canvacord.js.org)


# Example
## Triggered
```js
import { MemeCanvas } from "canvacord";
import { promises as fs } from "fs";

const memegen = new MemeCanvas();
const image = getImageSomehow();
const triggered = await memegen.trigger(image);
await fs.writeFile("./triggered.gif", triggered);
```

![img](https://i.imgur.com/tes5yE2.gif)
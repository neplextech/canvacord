```ts
import { canvacord } from "canvacord";
import { createWriteStream, promises as fs } from "fs";

const img = "image-1.png";
const img2 = "image-2.png";
const img3 = "image-3.png";

// template
const affected = await canvacord.affect(img);
fs.writeFile("./affected.png", affected);

// gif
const triggered = await canvacord.triggered(img);
triggered.pipe(createWriteStream("./triggered.gif"));

// filters
const filtered = await canvacord
  .filters(500, 500)
  .drawImage(img)
  .hueRotate(70)
  .encode();

fs.writeFile("./filtered.png", filtered);

// image
const manipulated = await canvacord(img).pixelate(5).encode();
fs.writeFile("./manipulated.png", manipulated);

// fuse
const fused = await canvacord.fuse(img, img2);
fs.writeFile("./fused.png", fused);

// kiss
const kissed = await canvacord.kiss(img, img2);
fs.writeFile("./kissed.png", kissed);

// spank
const spanked = await canvacord.spank(img, img2);
fs.writeFile("./spanked.png", spanked);

// slap
const slapped = await canvacord.slap(img, img2);
fs.writeFile("./slapped.png", slapped);

// beautiful
const beautiful = await canvacord.beautiful(img);
fs.writeFile("./beautiful.png", beautiful);

// facepalm
const facepalm = await canvacord.facepalm(img);
fs.writeFile("./facepalm.png", facepalm);

// rainbow
const rainbow = await canvacord.rainbow(img);
fs.writeFile("./rainbow.png", rainbow);

// rip
const rip = await canvacord.rip(img);
fs.writeFile("./rip.png", rip);

// trash
const trash = await canvacord.trash(img);
fs.writeFile("./trash.png", trash);

// hitler
const hitler = await canvacord.hitler(img);
fs.writeFile("./hitler.png", hitler);

// distracted
const distracted = await canvacord.distracted(img, img2, img3);
fs.writeFile("./distracted.png", distracted);
```

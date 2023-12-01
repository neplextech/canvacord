import { canvacord } from '../src';
import { createWriteStream, promises as fsp } from 'fs';

const img = 'https://cdn.discordapp.com/embed/avatars/0.png?size=512';
const img2 = 'https://cdn.discordapp.com/embed/avatars/2.png?size=512';
const img3 = 'https://cdn.discordapp.com/embed/avatars/3.png?size=512';

(async () => {
  // template
  const affected = await canvacord.affect(img);
  fsp.writeFile(`${__dirname}/canvas/affected.png`, affected);

  // gif
  const triggered = await canvacord.triggered(img);
  triggered.pipe(createWriteStream(`${__dirname}/canvas/triggered.gif`));

  // filters
  const filtered = await canvacord.filters(500, 500).drawImage(img).hueRotate(70).encode();
  fsp.writeFile(`${__dirname}/canvas/filtered.png`, filtered);

  // image
  const manipulated = await canvacord(img).pixelate(5).encode();
  fsp.writeFile(`${__dirname}/canvas/manipulated.png`, manipulated);

  // fuse
  const fused = await canvacord.fuse(img, img2);
  fsp.writeFile(`${__dirname}/canvas/fused.png`, fused);

  // kiss
  const kissed = await canvacord.kiss(img, img2);
  fsp.writeFile(`${__dirname}/canvas/kissed.png`, kissed);

  // spank
  const spanked = await canvacord.spank(img, img2);
  fsp.writeFile(`${__dirname}/canvas/spanked.png`, spanked);

  // slap
  const slapped = await canvacord.slap(img, img2);
  fsp.writeFile(`${__dirname}/canvas/slapped.png`, slapped);

  // beautiful
  const beautiful = await canvacord.beautiful(img);
  fsp.writeFile(`${__dirname}/canvas/beautiful.png`, beautiful);

  // facepalm
  const facepalm = await canvacord.facepalm(img);
  fsp.writeFile(`${__dirname}/canvas/facepalm.png`, facepalm);

  // rainbow
  const rainbow = await canvacord.rainbow(img);
  fsp.writeFile(`${__dirname}/canvas/rainbow.png`, rainbow);

  // rip
  const rip = await canvacord.rip(img);
  fsp.writeFile(`${__dirname}/canvas/rip.png`, rip);

  // trash
  const trash = await canvacord.trash(img);
  fsp.writeFile(`${__dirname}/canvas/trash.png`, trash);

  // hitler
  const hitler = await canvacord.hitler(img);
  fsp.writeFile(`${__dirname}/canvas/hitler.png`, hitler);

  // distracted
  const distracted = await canvacord.distracted(img, img2, img3);
  fsp.writeFile(`${__dirname}/canvas/distracted.png`, distracted);
})();

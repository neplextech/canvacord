import { canvacord } from '../src';
import { createWriteStream, promises as fsp } from 'fs';

const img = 'https://cdn.discordapp.com/embed/avatars/0.png?size=512';

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
})();

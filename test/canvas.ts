import { canvacord } from '../src';
import { createWriteStream, promises as fsp } from 'fs';

const img = 'https://cdn.discordapp.com/embed/avatars/1.png?size=512';

(async () => {
  const affected = await canvacord.affect(img);
  fsp.writeFile(`${__dirname}/canvas/affected.png`, affected);

  const triggered = await canvacord.triggered(img);
  triggered.pipe(createWriteStream(`${__dirname}/canvas/triggered.gif`));
})();

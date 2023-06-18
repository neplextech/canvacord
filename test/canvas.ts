import { ImageManipulation } from '../src';
import { writeFileSync } from 'fs';

const img = 'https://cdn.discordapp.com/embed/avatars/2.png?size=512';

ImageManipulation.invert(img).then(data => writeFileSync(`${__dirname}/canvas/invert.png`, data));
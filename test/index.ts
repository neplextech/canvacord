import { Builder, ContainerNode, ImageNode, TextNode } from '../src/index';
import { writeFileSync } from 'fs';
import { styles } from './common';

const img = new Builder(700, 300);

img.style = styles.root;

img.addComponent([
  new ImageNode({
    src: 'https://cdn.discordapp.com/embed/avatars/0.png?size=256',
    style: styles.image
  }),
  new ContainerNode({
    children: [
      new TextNode({
        data: 'Canva',
        style: styles.canva
      }),
      new TextNode({
        data: 'cord',
        style: styles.cord
      })
    ],
    style: styles.container
  })
]);

img.build().then((data) => {
  writeFileSync(`${__dirname}/normal/test.png`, data);
});

img
  .build({
    format: 'svg'
  })
  .then((data) => {
    writeFileSync(`${__dirname}/normal/test.svg`, data);
  });

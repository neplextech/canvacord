import { JSX, Text, Image, Container, Builder } from '../src/index';

import { writeFileSync } from 'fs';
import { styles } from './common';

const img = new Builder(700, 300);

img.style = styles.root;

img.addComponent(
  <>
    <Image src="https://cdn.discordapp.com/embed/avatars/0.png?size=256" style={styles.image} />
    <Container style={styles.container}>
      <Text data="Canva" style={styles.canva} />
      <Text data="cord" style={styles.cord} />
    </Container>
  </>
);

img.build().then((data) => {
  writeFileSync(`${__dirname}/jsx/test.png`, data);
});

img
  .build({
    format: 'svg'
  })
  .then((data) => {
    writeFileSync(`${__dirname}/jsx/test.svg`, data);
  });

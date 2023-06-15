import { JSX, Text, Image, Container, Builder, loadImage } from '../src/index';

import { writeFileSync } from 'fs';
import { styles } from './common';

async function main() {
  const img = new Builder(700, 300);

  img.style = styles.root;

  const avatar = await loadImage('https://cdn.discordapp.com/embed/avatars/0.png?size=256');

  img.addComponent(
    <>
      <Image src={avatar} style={styles.image} />
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
}

main();

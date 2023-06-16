import { RankCardBuilder, loadImage } from '../src/index';
import { writeFileSync } from 'fs';
import { manrope, manropeBold, roboto } from './common';

async function main() {
  const card = new RankCardBuilder()
    .setAvatar('https://cdn.discordapp.com/embed/avatars/0.png?size=256')
    .setCurrentXP(300)
    .setRequiredXP(600)
    .setLevel(2)
    .setRank(5)
    .setFonts({
      progress: roboto.name,
      stats: manrope.name,
      username: manropeBold.name
    })
    .setUsername('@wumpus');

  card.build().then((data) => {
    writeFileSync(`${__dirname}/normal/rankCard.png`, data);
  });

  card
    .build({
      format: 'svg'
    })
    .then((data) => {
      writeFileSync(`${__dirname}/normal/rankCard.svg`, data);
    });
}

main();

import { Font, LeaderboardBuilder } from "../src/index";
import { writeFileSync } from "fs";

Font.loadDefault();

const lb = new LeaderboardBuilder()
  .setHeader({
    title: "NeplexLabs",
    image: "https://github.com/neplextech.png",
    subtitle: "3258 members",
  })
  .setPlayers(
    [
      {
        avatar: "https://github.com/twlite.png",
        username: "twlite",
        displayName: "Archaeopteryx",
        level: 32,
        xp: 2420,
        rank: 1,
      },
      {
        avatar: "https://github.com/notunderctrl.png",
        username: "avrajs",
        displayName: "Avraj",
        level: 30,
        xp: 2390,
        rank: 2,
      },
      {
        avatar: "https://github.com/insypher.png",
        username: "insypher01",
        displayName: "insypher",
        level: 29,
        xp: 2280,
        rank: 3,
      },
      {
        avatar: "https://github.com/Luna-devv.png",
        username: "mwlica",
        displayName: "Luna",
        level: 27,
        xp: 2280,
        rank: 4,
      },
      {
        avatar: "https://github.com/insypher.png",
        username: "com6235",
        displayName: "CatGPT",
        level: 24,
        xp: 2280,
        rank: 5,
      },
      {
        avatar: "https://github.com/insypher.png",
        username: "talyzman",
        displayName: "Talisman",
        level: 21,
        xp: 2280,
        rank: 6,
      },
      {
        avatar: "https://github.com/insypher.png",
        username: "madaleine",
        displayName: "Madaleine Sakurai",
        level: 20,
        xp: 2280,
        rank: 7,
      },
      {
        avatar: "https://github.com/insypher.png",
        username: "tempest0006",
        displayName: "Tempest",
        level: 17,
        xp: 2280,
        rank: 8,
      },
      {
        avatar: "https://github.com/insypher.png",
        username: "rinceri",
        displayName: "bottle",
        level: 16,
        xp: 2280,
        rank: 9,
      },
      {
        avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
        username: "mrcrack_",
        displayName: "MrCRACK",
        level: 14,
        xp: 2280,
        rank: 10,
      },
    ].slice(0, 6)
  )
  .setBackground(`${__dirname}/bg.png`);

lb.build({
  format: "svg",
}).then((res) => {
  writeFileSync(`${__dirname}/leaderboard.svg`, res);
});

lb.build().then((res) => {
  writeFileSync(`${__dirname}/leaderboard.png`, res);
});

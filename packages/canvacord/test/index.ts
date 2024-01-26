import { Font, LeaderboardBuilder, LeaderboardVariants } from "../src/index";
import { writeFileSync } from "fs";

Font.loadDefault();

async function main() {
  const leaderboard = new LeaderboardBuilder()
    .setHeader({
      title: "NeplexLabs",
      image: "https://github.com/neplextech.png",
      subtitle: "3258 members",
    })
    .setPlayers([
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
        avatar: "https://github.com/twlite.png",
        username: "twlite",
        displayName: "Archaeopteryx",
        level: 32,
        xp: 2420,
        rank: 6,
      },
      {
        avatar: "https://github.com/notunderctrl.png",
        username: "avrajs",
        displayName: "Avraj",
        level: 30,
        xp: 2390,
        rank: 7,
      },
      {
        avatar: "https://github.com/insypher.png",
        username: "insypher01",
        displayName: "insypher",
        level: 29,
        xp: 2280,
        rank: 9,
      },
      {
        avatar: "https://github.com/Luna-devv.png",
        username: "mwlica",
        displayName: "Luna",
        level: 27,
        xp: 2280,
        rank: 9,
      },
      {
        avatar: "https://github.com/insypher.png",
        username: "com6235",
        displayName: "CatGPT",
        level: 24,
        xp: 2280,
        rank: 10,
      },
    ])
    .setVariant(LeaderboardVariants.Horizontal);

  leaderboard
    .build({
      format: "png",
    })
    .then((data) => {
      writeFileSync(`${__dirname}/normal/leaderboard2.png`, data);
    });

  leaderboard
    .build({
      format: "svg",
    })
    .then((data) => {
      writeFileSync(`${__dirname}/normal/leaderboard.svg`, data);
    });
}

main();

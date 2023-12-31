# Leaderboard image generation

```ts
import { Font, LeaderboardBuilder } from "canvacord";

// load font
Font.loadDefault();

// generate image
const lb = new LeaderboardBuilder()
  // set title, image and subtitle
  .setHeader({
    title: "NeplexLabs",
    image: "https://github.com/neplextech.png",
    subtitle: "3258 members",
  })
  // set players, usually you would get this from a database but for this example we will hardcode it
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
    // ...
  ])
  .setBackground("./my-background-image.jpg");

const image = await lb.build({ format: "png" });
```

Canvacord automatically adjusts the size of the output image based on the number of players. Maximum number of players is 10, but recommended size is 8 players or less.

# Output

![Leaderboard](https://raw.githubusercontent.com/neplextech/canvacord/main/packages/canvacord/test/leaderboard.svg)

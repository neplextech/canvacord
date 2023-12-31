## Rank Card

```ts
import { Font, RankCardBuilder } from "canvacord";
import { writeFile } from "fs/promises";

// load default font
Font.loadDefault();

const card = new RankCardBuilder()
  .setDisplayName("Wumpus 😍")
  .setUsername("@wumpus")
  .setAvatar("https://cdn.discordapp.com/embed/avatars/0.png?size=256")
  .setCurrentXP(300)
  .setRequiredXP(600)
  .setProgressCalculator(() => {
    return Math.floor(Math.random() * 100);
  })
  .setLevel(2)
  .setRank(5)
  .setOverlay(90)
  .setBackground("#23272a")
  .setStatus(RankCardUserStatus.Online)
  .setGraphemeProvider(BuiltInGraphemeProvider.FluentEmojiFlat);

const image = await card.build({
  format: "png",
});

await writeFileSync("./card.png", data);
```

![xp-card](https://raw.githubusercontent.com/neplextech/canvacord/main/packages/canvacord/test/normal/rankCard.svg)

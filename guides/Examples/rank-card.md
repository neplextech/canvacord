## Rank Card

```ts
import { Font, RankCardBuilder } from "canvacord";
import { writeFile } from "fs/promises";

// load default font
Font.loadDefault();

const card = new RankCardBuilder()
  .setUsername("Lost Ctrl")
  .setDisplayName("thearchaeopteryx")
  .setAvatar("...")
  .setCurrentXP(3800)
  .setRequiredXP(2500)
  .setLevel(54)
  .setRank(32)
  .setStatus("online");

const image = await card.build({
  format: "png",
});

await writeFileSync("./card.png", data);
```

![xp-card](https://raw.githubusercontent.com/neplextech/canvacord/main/packages/canvacord/test/jsx/test2.svg)

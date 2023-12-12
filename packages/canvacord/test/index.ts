import { RankCardBuilder, Font } from "../src/index";
import { writeFileSync } from "fs";
import { RankCardUserStatus } from "../src/components/rank-card/NeoClassicalCard";

Font.loadDefault();

async function main() {
  const card = new RankCardBuilder()
    .setUsername("Wumpus")
    .setHandle("wumpus")
    .setAvatar("https://cdn.discordapp.com/embed/avatars/0.png?size=256")
    .setCurrentXP(300)
    .setRequiredXP(600)
    .setLevel(2)
    .setRank(5)
    .setOverlay(90)
    .setBackground("#23272a")
    .setBackground(`${__dirname}/minecraft.png`)
    .setStatus(RankCardUserStatus.None);

  card
    .build({
      format: "png",
    })
    .then((data) => {
      writeFileSync(`${__dirname}/normal/rankCard.png`, data);
    });

  card
    .build({
      format: "svg",
    })
    .then((data) => {
      writeFileSync(`${__dirname}/normal/rankCard.svg`, data);
    });
}

main();

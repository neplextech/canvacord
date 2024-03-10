import { RankCardBuilder, Font, BuiltInGraphemeProvider } from "../src";
import { writeFileSync } from "fs";
import { RankCardUserStatus } from "../src/components/rank-card/NeoClassicalCard";

Font.loadDefault();

async function main() {
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
    .setTextStyles({level: 'NIVEAU :', xp: 'EXP :', rank: 'CLASSEMENT :'})
    .setStatus(RankCardUserStatus.Online)
    .setGraphemeProvider(BuiltInGraphemeProvider.FluentEmojiFlat);

  card
    .build({
      format: "png",
    })
    .then((data) => {
      writeFileSync(`${__dirname}/normal/cardTranslated.png`, data);
    });

  card
    .build({
      format: "svg",
    })
    .then((data) => {
      writeFileSync(`${__dirname}/normal/cardTranslated.svg`, data);
    });
}

main();

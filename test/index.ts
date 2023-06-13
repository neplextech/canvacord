import { RankCard, Font } from "../src/index";
import { writeFileSync } from "fs";

const roboto = Font.fromFileSync(`${__dirname}/Roboto-Regular.ttf`, "Roboto");
const manrope = Font.fromFileSync(
  `${__dirname}/Manrope-Regular.ttf`,
  "Manrope"
);

const card = new RankCard(700, 300);

card.addText({
  color: "#AA0000",
  data: "Canva",
  fontSize: "48px",
  x: 0,
  y: 0,
  font: roboto,
});

card.addText({
  color: "#00EEFF",
  data: "cord",
  fontSize: "36px",
  x: 0,
  y: 0,
  font: manrope,
});

card.build().then((data) => {
  writeFileSync(`${__dirname}/test.png`, data);
});
card.build(true).then((data) => {
  writeFileSync(`${__dirname}/test.svg`, data);
});

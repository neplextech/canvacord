import { ImageGen } from "../dist/index.mjs";
import fs from "fs/promises";

const output = await ImageGen.triggered("https://cdn.discordapp.com/embed/avatars/0.png?size=2048");
fs.writeFile("./triggered.gif", output);
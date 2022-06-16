import { Filters } from "../dist/index.mjs";
import fs from "fs/promises";

const output = await Filters.invert("https://cdn.discordapp.com/embed/avatars/0.png?size=2048");
fs.writeFile("./inverted.png", output);
const canvacord = require("../index");
const img = "https://cdn.discordapp.com/avatars/480933736276426763/1ed14839f98137052373097a77e31510.png?size=1024";
const img2 = "https://cdn.discordapp.com/embed/avatars/1.png";

const i = canvacord.tictactoe({
    a1: "X",
    b1: "O",
    c1: "X",
    a2: "X",
    b2: "O",
    c2: "X",
    a3: "X",
    b3: "O",
    c3: "X",
});
canvacord.write(i, "./tictactoe.png")
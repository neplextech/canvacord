const canvacord = require("../index");
const img = "https://cdn.discordapp.com/avatars/480933736276426763/1ed14839f98137052373097a77e31510.png?size=1024";
const img2 = "https://cdn.discordapp.com/embed/avatars/1.png";

canvacord.opinion(img, "holy wars punishment due").then(i => {
    canvacord.write(i, "./opinion.png");
});
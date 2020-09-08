const canvacord = require("../index");
const img = "https://cdn.discordapp.com/avatars/480933736276426763/8a37af5b5bd9c318d7525bfef8f36b53.png?size=1024";
const img2 = "https://cdn.discordapp.com/embed/avatars/1.png";

canvacord.hitler(img, img2)
    .then(res => canvacord.write(res, "./hitler.png"));
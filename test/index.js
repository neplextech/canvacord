const canvacord = require("../index");
const img = "https://cdn.discordapp.com/avatars/480933736276426763/8a37af5b5bd9c318d7525bfef8f36b53.png?size=1024";

const i = canvacord.rectangle(0, 0, 600, 100, "#7289da", false, 0, 30);

canvacord.write(i, "rect.png")
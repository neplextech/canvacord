const canvacord = require("../index");
const img = "https://cdn.discordapp.com/embed/avatars/0.png";

canvacord.ohno("that's stupid boi asdf asdf")
    .then(buffer => {
        canvacord.write(buffer, "ohno.png");
    });
const canvacord = require("../index");
const img = "https://cdn.discordapp.com/embed/avatars/0.png";

canvacord.delete(img)
    .then(data => {
        canvacord.write(data, "./images/delete.png");
    });
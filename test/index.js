(async () => {
    const canvacord = require("../index");

    const img = await canvacord.clyde("😩 What do u want? <:kek:706738061265993831>");

    canvacord.write(img, "clyde.png");
})();
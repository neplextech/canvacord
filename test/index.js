const canvacord = require("../index");
const img = "https://cdn.discordapp.com/embed/avatars/0.png";

const rank = new canvacord.Rank()
    .setAvatar(img)
    .setCurrentXP(356)
    .setRequiredXP(500)
    .setStatus("dnd")
    .setProgressBar("#FFFFFF", "COLOR")
    .setUsername("Snowflake")
    .setDiscriminator("0007");

rank.build()
    .then(data => {
        canvacord.write(data, "./images/RankCard.png");
    });
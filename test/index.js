const canvacord = require("../index");
const img = "https://cdn.discordapp.com/embed/avatars/0.png";

const userData = {
    xp: 500,
    requiredXP: 845
};

const rank = new canvacord.Rank()
    .setAvatar(img)
    .setCurrentXP(userData.xp)
    .setRequiredXP(userData.requiredXP)
    .setStatus("dnd")
    .setProgressBar(["#14C49E", "#FF0000"], "GRADIENT", true)
    .setProgressBarTrack("#FFFFFF")
    .setUsername("Snowflake")
    .setMinXP(300);

rank.build()
    .then(data => {
        canvacord.write(data, "./card.png");
    });
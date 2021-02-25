const canvacord = require("../index");
const img = "https://cdn.discordapp.com/embed/avatars/0.png";
const img2 = "https://cdn.discordapp.com/embed/avatars/4.png";

// console.log(canvacord)

// const rank = new canvacord.Rank()
//     .setAvatar(img)
//     .setCurrentXP(50)
//     .setRequiredXP(360)
//     .setStatus("dnd")
//     .setProgressBar("#FFFFFF", "COLOR")
//     .setUsername("Snowflake")
//     .setDiscriminator("0007");

// rank.build()
//     .then(data => {
//         // canvacord.write(data, "RankCard.png");
//     });

canvacord.Canvas.reply({
    avatar1: img,
    avatar2: img2,
    user1: "Maximus",
    user2: "Snowflake",
    hex1: "#ff00ff",
    hex2: "#7289da",
    mainText: "kok 😋",
    replyText: "Pog 😋"
})
.then(img => canvacord.write(img, "reply.png"));
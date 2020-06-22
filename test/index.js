const Canvacord = require("../index");
const canvacord = new Canvacord();

// changemymind
canvacord.changemymind("YouTube ads are annoying").then(img => canvacord.write(img, "changemymind.png"));

// rank default
canvacord.rank({
    username: "Snowflake", 
    discrim: "0007", 
    level: 4, 
    rank: 12, 
    neededXP: 500, 
    currentXP: 407, 
    avatarURL: "https://cdn.discordapp.com/avatars/648875676186968065/86caa762fabb3c6fe4fbbd9c8a9672df.png"
}).then(img => canvacord.write(img, "rank-default.png"));

// rank custom color
canvacord.rank({
    username: "Snowflake",
    discrim: "0007",
    level: 4,
    rank: 12,
    neededXP: 500,
    currentXP: 407,
    avatarURL: "https://cdn.discordapp.com/avatars/648875676186968065/86caa762fabb3c6fe4fbbd9c8a9672df.png",
    color: "pink"
}).then(img => canvacord.write(img, "rank-custom-color.png"));

// rank custom bg
canvacord.rank({
    username: "Snowflake",
    discrim: "0007",
    level: 4,
    rank: 12,
    neededXP: 500,
    currentXP: 407,
    avatarURL: "https://cdn.discordapp.com/avatars/648875676186968065/86caa762fabb3c6fe4fbbd9c8a9672df.png",
    background: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQWT5_yv_xAO2vN6BqlS1PNwhHa2zkMAlDzIkmTnmB3OLEcnkCP&usqp=CAU"
}).then(img => canvacord.write(img, "rank-custom-bg.png"));

// rank custom bg and color
canvacord.rank({
    username: "Snowflake",
    discrim: "0007",
    level: 4,
    rank: 12,
    neededXP: 500,
    currentXP: 407,
    avatarURL: "https://cdn.discordapp.com/avatars/648875676186968065/86caa762fabb3c6fe4fbbd9c8a9672df.png",
    background: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQWT5_yv_xAO2vN6BqlS1PNwhHa2zkMAlDzIkmTnmB3OLEcnkCP&usqp=CAU",
    color: "#7289DA"
}).then(img => canvacord.write(img, "rank-custom-bg-and-color.png"));

// rank custom bg no overlay
canvacord.rank({
    username: "Snowflake",
    discrim: "0007",
    level: 4,
    rank: 12,
    neededXP: 500,
    currentXP: 407,
    avatarURL: "https://cdn.discordapp.com/avatars/648875676186968065/86caa762fabb3c6fe4fbbd9c8a9672df.png",
    background: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQWT5_yv_xAO2vN6BqlS1PNwhHa2zkMAlDzIkmTnmB3OLEcnkCP&usqp=CAU",
    overlay: false
}).then(img => canvacord.write(img, "rank-custom-bg-no-overlay.png"));

// rank custom color, bg no overlay
canvacord.rank({
    username: "Snowflake",
    discrim: "0007",
    level: 4,
    rank: 12,
    neededXP: 500,
    currentXP: 407,
    avatarURL: "https://cdn.discordapp.com/avatars/648875676186968065/86caa762fabb3c6fe4fbbd9c8a9672df.png",
    background: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQWT5_yv_xAO2vN6BqlS1PNwhHa2zkMAlDzIkmTnmB3OLEcnkCP&usqp=CAU",
    color: "#FF0000",
    overlay: false
}).then(img => canvacord.write(img, "rank-custom-color-bg-no-overlay.png"));

// deepfry
canvacord.deepfry("https://cdn.discordapp.com/avatars/648875676186968065/86caa762fabb3c6fe4fbbd9c8a9672df.png").then(img => canvacord.write(img, "deepfried.png"));

// trigger
canvacord.trigger("https://cdn.discordapp.com/avatars/648875676186968065/86caa762fabb3c6fe4fbbd9c8a9672df.png").then(img => canvacord.write(img, "triggered.gif"));
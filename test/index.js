const canvacord = require("../index");
const img = "https://cdn.discordapp.com/embed/avatars/0.png";

canvacord.Canvas.youtube({
    username: "Canvacord",
    content: "Fluttering in the moonlight 🙂",
    avatar: img,
    dark: true
})
    .then(data => {
        canvacord.write(data, "./images/youtubecomment.png");
    });
const emoji = require("node-canvas-with-twemoji-and-discord-emoji");

module.exports = async (ctx, message, x, y) => {
    await emoji.fillTextWithTwemoji(ctx, message, x, y);
};
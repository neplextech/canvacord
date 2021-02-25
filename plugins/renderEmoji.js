const emoji = require("@canvacord/emoji-parser");

module.exports = async (ctx, message, x, y) => {
    return await emoji.fillTextWithTwemoji(ctx, message, x, y);
};
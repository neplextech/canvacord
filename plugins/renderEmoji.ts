import emoji from "node-canvas-with-twemoji-and-discord-emoji";

export default async (ctx, message, x, y) => {
    return await emoji.fillTextWithTwemoji(ctx, message, x, y);
};
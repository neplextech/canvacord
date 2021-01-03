import emoji from "node-canvas-with-twemoji-and-discord-emoji";
import { CanvasRenderingContext2D } from "canvas";

export default async (ctx: CanvasRenderingContext2D, message: string, x: number, y: number) => {
    return await emoji.fillTextWithTwemoji(ctx, message, x, y);
};
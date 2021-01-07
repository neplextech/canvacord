import { fillTextWithTwemoji } from "@canvacord/emoji-parser";
import { CanvasRenderingContext2D } from "canvas";

export default async (ctx: CanvasRenderingContext2D, message: string, x: number, y: number) => {
    return await fillTextWithTwemoji(ctx, message, x, y);
};
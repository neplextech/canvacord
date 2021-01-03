import { CanvasRenderingContext2D } from 'canvas';

declare module 'node-canvas-with-twemoji-and-discord-emoji' {
    function fillTextWithTwemoji (ctx: CanvasRenderingContext2D, message: string, x: number, y: number): Promise<void>;
    export = fillTextWithTwemoji
}

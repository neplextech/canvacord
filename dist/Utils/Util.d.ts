/// <reference types="node" />
import { loadImage } from "./loadImage";
import { SKRSContext2D as CanvasRenderingContext2D } from "@napi-rs/canvas";
import type { Readable } from "stream";
/**
 * Canvacord Utils
 */
export declare class Util {
    static loadImage: typeof loadImage;
    constructor();
    static createImage(src: Buffer): void;
    /**
     * Renders emoji in canvas
     * @param ctx Canvas rendering context
     * @param message message to render
     * @param x x co-ordinate
     * @param y y co-ordinate
     */
    static renderEmoji(ctx: CanvasRenderingContext2D, message: string, x: number, y: number): Promise<void>;
    /**
     * Abbreviate the given number
     * @param num The number to abbreviate
     */
    static toAbbrev(num: number): string;
    static get assets(): {
        font(name: string): Promise<string>;
        image(name: string): Promise<string>;
    };
    static cleanText(text: string): string;
    static is(prop: any, propType: string): boolean;
    static streamToBuffer(stream: Readable): Promise<Buffer>;
    static noop(): void;
}

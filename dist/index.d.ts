/// <reference types="node" />
import * as _napi_rs_canvas from '@napi-rs/canvas';
import { Image, Canvas, SKRSContext2D } from '@napi-rs/canvas';
import { Readable } from 'stream';

declare type CanvacordOutputFormat = "png" | "jpeg" | "webp";
declare type ImageSourceType = string | Buffer | Image;

/**
 * Utility function to load images
 * @param source Image source
 */
declare function loadImage(source: ImageSourceType, createSkImage?: true): Promise<Image>;
declare function loadImage(source: ImageSourceType, createSkImage?: false): Promise<Buffer>;

declare class BaseCanvas {
    #private;
    loadImage: typeof loadImage;
    get mimeType(): CanvacordOutputFormat;
    set mimeType(value: CanvacordOutputFormat);
    makeCanvas(width: number, height: number): {
        canvas: Canvas;
        ctx: _napi_rs_canvas.SKRSContext2D;
    };
    buildImage(canvas: Canvas): Promise<Buffer>;
    buildImageSync(canvas: Canvas): Buffer;
    getImageInfo(image: ImageSourceType): Promise<{
        width: number;
        height: number;
        source: Buffer;
    }>;
}

declare class MemeCanvas extends BaseCanvas {
    constructor();
    trigger(image: ImageSourceType): Promise<Buffer>;
    triggered(image: ImageSourceType): Promise<Buffer>;
    kiss(image1: ImageSourceType, image2: ImageSourceType): Promise<Buffer>;
    spank(image1: ImageSourceType, image2: ImageSourceType): Promise<Buffer>;
    slap(image1: ImageSourceType, image2: ImageSourceType): Promise<Buffer>;
    beautiful(image: ImageSourceType): Promise<Buffer>;
    facepalm(image: ImageSourceType): Promise<Buffer>;
    rainbow(image: ImageSourceType): Promise<Buffer>;
    rip(image: ImageSourceType): Promise<Buffer>;
    trash(image: ImageSourceType): Promise<Buffer>;
    hitler(image: ImageSourceType): Promise<Buffer>;
    jokeOverHead(image: ImageSourceType): Promise<Buffer>;
    distracted(image1: ImageSourceType, image2: ImageSourceType, image3?: ImageSourceType): Promise<Buffer>;
    affect(image: ImageSourceType): Promise<Buffer>;
    jail(image: ImageSourceType, greyscale?: boolean): Promise<Buffer>;
    bed(image1: ImageSourceType, image2: ImageSourceType): Promise<Buffer>;
    delete(image: ImageSourceType, dark?: boolean): Promise<Buffer>;
    wanted(image: ImageSourceType): Promise<Buffer>;
    wasted(image: ImageSourceType): Promise<Buffer>;
    shit(image: ImageSourceType): Promise<Buffer>;
}

declare class UtilityCanvas extends BaseCanvas {
    constructor();
    blur(image: ImageSourceType, pixels?: number): Promise<Buffer>;
    brighten(img: ImageSourceType, amount?: number): Promise<Buffer>;
    darken(img: ImageSourceType, amount?: number): Promise<Buffer>;
    greyscale(img: ImageSourceType): Promise<Buffer>;
    grayscale(img: ImageSourceType): Promise<Buffer>;
    invert(img: ImageSourceType): Promise<Buffer>;
    sepia(img: ImageSourceType): Promise<Buffer>;
    threshold(img: ImageSourceType, amount: number): Promise<Buffer>;
    circle(image: ImageSourceType): Promise<Buffer>;
    convolute(ctx: SKRSContext2D, canvas: Canvas, matrix: number[], opaque?: boolean): Promise<SKRSContext2D>;
    colorfy(image: ImageSourceType, color: string): Promise<Buffer>;
    colourfy(image: ImageSourceType, colour: string): Promise<Buffer>;
    color(color: string, width: number, height: number): Promise<Buffer>;
    colour(colour: string, width: number, height: number): Promise<Buffer>;
}

/**
 * Canvacord Utils
 */
declare class Util {
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
    static renderEmoji(ctx: SKRSContext2D, message: string, x: number, y: number): Promise<void>;
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

export { BaseCanvas, MemeCanvas, Util, UtilityCanvas };

/// <reference types="node" />
import { ImageSourceType } from "../typings/types";
import { BaseCanvas } from "./BaseCanvas";
import { SKRSContext2D, Canvas as SkCanvas } from "@napi-rs/canvas";
export declare class UtilityCanvas extends BaseCanvas {
    blur(image: ImageSourceType, pixels?: number): Promise<Buffer>;
    brighten(img: ImageSourceType, amount?: number): Promise<Buffer>;
    darken(img: ImageSourceType, amount?: number): Promise<Buffer>;
    greyscale(img: ImageSourceType): Promise<Buffer>;
    grayscale(img: ImageSourceType): Promise<Buffer>;
    invert(img: ImageSourceType): Promise<Buffer>;
    sepia(img: ImageSourceType): Promise<Buffer>;
    threshold(img: ImageSourceType, amount: number): Promise<Buffer>;
    circle(image: ImageSourceType): Promise<Buffer>;
    convolute(ctx: SKRSContext2D, canvas: SkCanvas, matrix: number[], opaque?: boolean): Promise<SKRSContext2D>;
    colorfy(image: ImageSourceType, color: string): Promise<Buffer>;
    colourfy(image: ImageSourceType, colour: string): Promise<Buffer>;
    color(color: string, width: number, height: number): Promise<Buffer>;
    colour(colour: string, width: number, height: number): Promise<Buffer>;
}

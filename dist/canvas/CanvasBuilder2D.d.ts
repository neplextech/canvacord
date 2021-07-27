/// <reference types="node" />
import { Canvas as SkCanvas, SKRSContext2D, Image as SkImage } from "@napi-rs/canvas";
import { BaseCanvas } from "./BaseCanvas";
import { CanvacordOutputFormat } from "../typings/types";
export declare enum BuilderReadyState {
    NOT_READY = 0,
    READY = 1
}
export declare class CanvasBuilder2D extends BaseCanvas {
    #private;
    readonly width: number;
    readonly height: number;
    readonly engine = "skia";
    constructor(width: number, height: number, autoInstance?: boolean);
    get canvas(): SkCanvas;
    get ctx(): SKRSContext2D;
    get readyState(): BuilderReadyState;
    instantiate(): this;
    drawImage(image: SkImage, dx: number, dy: number, dw?: number, dh?: number): CanvasBuilder2D;
    clearRect(x: number, y: number, w: number, h: number): this;
    drawRect(x: number, y: number, width: number, height: number): this;
    strokeRect(x: number, y: number, width: number, height: number): this;
    setColorFill(color: string): this;
    setColorStroke(color: string): this;
    toBuffer(format?: CanvacordOutputFormat): Buffer;
    toBufferAsync(format?: CanvacordOutputFormat): Promise<Buffer>;
    save(): this;
    restore(): this;
    valueOf(): {
        canvas: SkCanvas;
        ctx: SKRSContext2D;
    };
    toString(): string;
}

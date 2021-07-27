/// <reference types="node" />
import { Canvas as SkCanvas } from "@napi-rs/canvas";
import { loadImage } from "../Utils/loadImage";
import { CanvacordOutputFormat, ImageSourceType } from "../typings/types";
export declare class BaseCanvas {
    #private;
    loadImage: typeof loadImage;
    get mimeType(): CanvacordOutputFormat;
    set mimeType(value: CanvacordOutputFormat);
    makeCanvas(width: number, height: number): {
        canvas: SkCanvas;
        ctx: import("@napi-rs/canvas").SKRSContext2D;
    };
    buildImage(canvas: SkCanvas): Promise<Buffer>;
    buildImageSync(canvas: SkCanvas): Buffer;
    getImageInfo(image: ImageSourceType): Promise<{
        width: number;
        height: number;
        source: Buffer;
    }>;
}

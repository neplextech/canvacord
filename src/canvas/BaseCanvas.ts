import { createCanvas, Canvas as SkCanvas, SKRSContext2D } from "@napi-rs/canvas";
import { loadImage } from "../Utils/loadImage";
import { CanvacordOutputFormat, ImageSourceType } from "../typings/types";

export class BaseCanvas {
    private _mimeType: CanvacordOutputFormat = "png";
    private _skctx: SKRSContext2D;
    private _skcanvas: SkCanvas;
    public loadImage = loadImage;

    public get mimeType(): CanvacordOutputFormat {
        return this._mimeType ?? "png";
    }

    public set mimeType(value: CanvacordOutputFormat) {
        this._mimeType = value ?? "png";
    }

    public get canvas() {
        return this._skcanvas ?? null;
    }

    public get ctx() {
        return this._skctx ?? null;
    }

    public makeCanvas(width: number, height: number) {
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");

        this._skcanvas = canvas;
        this._skctx = ctx;

        return { canvas, ctx };
    }

    public async buildImage(canvas: SkCanvas = this.canvas): Promise<Buffer> {
        return await canvas.encode(this.mimeType as "png");
    }

    public buildImageSync(canvas: SkCanvas = this.canvas): Buffer {
        return canvas.encodeSync(this.mimeType as "png");
    }

    public async getImageInfo(image: ImageSourceType) {
        const img = await this.loadImage(image);

        return {
            width: img.width,
            height: img.height,
            source: img.src
        };
    }
}

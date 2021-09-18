import { Canvas as SkCanvas, SKRSContext2D, Image as SkImage } from "@napi-rs/canvas";
import { BaseCanvas } from "./BaseCanvas";
import { CanvacordOutputFormat } from "../typings/types";

export enum BuilderReadyState {
    NOT_READY,
    READY
}

export class CanvasBuilder2D extends BaseCanvas {
    private _canvas: SkCanvas;
    private _ctx: SKRSContext2D;
    public readonly engine = "skia";

    constructor(public readonly width: number, public readonly height: number, autoInstance = true) {
        super();

        if (autoInstance) this.instantiate();
    }

    get canvas() {
        return this._canvas ?? null;
    }

    get ctx() {
        return this._ctx ?? null;
    }

    get readyState(): BuilderReadyState {
        if (this._canvas && this._ctx) return BuilderReadyState.READY;
        return BuilderReadyState.NOT_READY;
    }

    public instantiate() {
        if (this._canvas) return this;
        const { canvas, ctx } = this.makeCanvas(this.width, this.height);

        this._canvas = canvas;
        this._ctx = ctx;

        return this;
    }

    public drawImage(image: SkImage, dx: number, dy: number, dw?: number, dh?: number): CanvasBuilder2D {
        if (typeof dw !== "number" && typeof dh !== "number") this._ctx.drawImage(image, dx, dy);
        else this._ctx.drawImage(image, dx, dy, dw, dh);
        return this;
    }

    public clearRect(x: number, y: number, w: number, h: number) {
        this._ctx.clearRect(x, y, w, h);
        return this;
    }

    public drawRect(x: number, y: number, width: number, height: number) {
        this._ctx.fillRect(x, y, width, height);
        return this;
    }

    public strokeRect(x: number, y: number, width: number, height: number) {
        this._ctx.strokeRect(x, y, width, height);
        return this;
    }

    public setColorFill(color: string) {
        this._ctx.fillStyle = color;
        return this;
    }

    public setColorStroke(color: string) {
        this._ctx.strokeStyle = color;
        return this;
    }

    public toBuffer(format?: CanvacordOutputFormat): Buffer {
        if (format) this.mimeType = format;
        return this.buildImageSync(this.canvas);
    }

    public async toBufferAsync(format?: CanvacordOutputFormat): Promise<Buffer> {
        if (format) this.mimeType = format;
        return await this.buildImage(this.canvas);
    }

    public save() {
        this._ctx.save();
        return this;
    }

    public restore() {
        this._ctx.restore();
        return this;
    }

    public valueOf() {
        return {
            canvas: this._canvas,
            ctx: this._ctx
        };
    }

    public toString() {
        return `<CanvasBuilder2D ${this.width}x${this.height}>`;
    }
}

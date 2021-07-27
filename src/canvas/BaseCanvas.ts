import { createCanvas, Canvas as SkCanvas } from "@napi-rs/canvas";
import { loadImage } from "../Utils/loadImage";
import { CanvacordOutputFormat, ImageSourceType } from "../typings/types";

export class BaseCanvas {
    #mimeType: CanvacordOutputFormat = "png";
    public loadImage = loadImage;

    public get mimeType(): CanvacordOutputFormat {
        return this.#mimeType ?? "png";
    }

    public set mimeType(value: CanvacordOutputFormat) {
        this.#mimeType = value ?? "png";
    }

    public makeCanvas(width: number, height: number) {
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");

        return { canvas, ctx };
    }

    public async buildImage(canvas: SkCanvas): Promise<Buffer> {
        return await canvas.encode(this.mimeType as "png");
    }

    public buildImageSync(canvas: SkCanvas): Buffer {
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

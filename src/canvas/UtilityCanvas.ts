import { ImageSourceType } from "../typings/types";
import { BaseCanvas } from "./BaseCanvas";
import { SKRSContext2D, Canvas as SkCanvas } from "@napi-rs/canvas";
import singleton from "../decorators/Singleton";

@singleton()
export class UtilityCanvas extends BaseCanvas {
    public async blur(image: ImageSourceType, pixels?: number): Promise<Buffer> {
        if (!image) throw new Error("Image was not provided!");
        const img = await this.loadImage(image);
        const { canvas, ctx } = this.makeCanvas(img.width, img.height);

        ctx.filter = `blur(${pixels ?? 0}px)`;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        return await this.buildImage(canvas);
    }

    public async brighten(img: ImageSourceType, amount?: number): Promise<Buffer> {
        amount ??= 50;
        const image = await this.loadImage(img);
        const { canvas, ctx } = this.makeCanvas(image.width, image.height);

        ctx.drawImage(image, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] += amount;
            imgData.data[i + 1] += amount;
            imgData.data[i + 2] += amount;
        }

        ctx.putImageData(imgData, 0, 0);

        return await this.buildImage(canvas);
    }

    public async darken(img: ImageSourceType, amount?: number): Promise<Buffer> {
        return await this.brighten(img, -amount);
    }

    public async greyscale(img: ImageSourceType): Promise<Buffer> {
        const image = await this.loadImage(img);
        const { canvas, ctx } = this.makeCanvas(image.width, image.height);

        ctx.drawImage(image, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imgData.data.length; i += 4) {
            const brightness = 0.34 * imgData.data[i] + 0.5 * imgData.data[i + 1] + 0.16 * imgData.data[i + 2];
            imgData.data[i] = brightness;
            imgData.data[i + 1] = brightness;
            imgData.data[i + 2] = brightness;
        }

        ctx.putImageData(imgData, 0, 0);

        return await this.buildImage(canvas);
    }

    public async grayscale(img: ImageSourceType): Promise<Buffer> {
        return await this.greyscale(img);
    }

    public async invert(img: ImageSourceType) {
        const image = await this.loadImage(img);
        const { canvas, ctx } = this.makeCanvas(image.width, image.height);

        ctx.drawImage(image, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] = 255 - imgData.data[i];
            imgData.data[i + 1] = 255 - imgData.data[i + 1];
            imgData.data[i + 2] = 255 - imgData.data[i + 2];
            imgData.data[i + 3] = 255;
        }

        ctx.putImageData(imgData, 0, 0);

        return await this.buildImage(canvas);
    }

    public async sepia(img: ImageSourceType): Promise<Buffer> {
        const image = await this.loadImage(img);
        const { canvas, ctx } = this.makeCanvas(image.width, image.height);

        ctx.drawImage(image, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] = imgData.data[i] * 0.393 + imgData.data[i + 1] * 0.769 + imgData.data[i + 2] * 0.189;
            imgData.data[i + 1] = imgData.data[i] * 0.349 + imgData.data[i + 1] * 0.686 + imgData.data[i + 2] * 0.168;
            imgData.data[i + 2] = imgData.data[i] * 0.272 + imgData.data[i + 1] * 0.534 + imgData.data[i + 2] * 0.131;
        }

        ctx.putImageData(imgData, 0, 0);

        return await this.buildImage(canvas);
    }

    public async threshold(img: ImageSourceType, amount: number): Promise<Buffer> {
        const image = await this.loadImage(img);
        const { canvas, ctx } = this.makeCanvas(image.width, image.height);

        ctx.drawImage(image, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imgData.data.length; i += 4) {
            const r = imgData.data[i];
            const g = imgData.data[i + 1];
            const b = imgData.data[i + 2];
            const v = 0.2126 * r + 0.7152 * g + 0.0722 * b >= amount ? 255 : 0;
            imgData.data[i] = imgData.data[i + 1] = imgData.data[i + 2] = v;
        }

        ctx.putImageData(imgData, 0, 0);

        return await this.buildImage(canvas);
    }

    public async circle(image: ImageSourceType): Promise<Buffer> {
        if (!image) throw new Error("Image was not provided!");

        const img = await this.loadImage(image);
        const { canvas, ctx } = this.makeCanvas(img.width, img.height);

        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        return await this.buildImage(canvas);
    }

    public async convolute(ctx: SKRSContext2D, canvas: SkCanvas, matrix: number[], opaque?: boolean): Promise<SKRSContext2D> {
        const side = Math.round(Math.sqrt(matrix.length));
        const halfSide = Math.floor(side / 2);
        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const src = pixels.data;
        const sw = pixels.width;
        const sh = pixels.height;
        const w = sw;
        const h = sh;
        const output = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const dst = output.data;
        const alphaFac = opaque ? 1 : 0;

        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const sy = y;
                const sx = x;
                const dstOff = (y * w + x) * 4;
                let r = 0;
                let g = 0;
                let b = 0;
                let a = 0;
                for (let cy = 0; cy < side; cy++) {
                    for (let cx = 0; cx < side; cx++) {
                        const scy = sy + cy - halfSide;
                        const scx = sx + cx - halfSide;
                        if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                            const srcOff = (scy * sw + scx) * 4;
                            const wt = matrix[cy * side + cx];
                            r += src[srcOff] * wt;
                            g += src[srcOff + 1] * wt;
                            b += src[srcOff + 2] * wt;
                            a += src[srcOff + 3] * wt;
                        }
                    }
                }
                dst[dstOff] = r;
                dst[dstOff + 1] = g;
                dst[dstOff + 2] = b;
                dst[dstOff + 3] = a + alphaFac * (255 - a);
            }
        }

        ctx.putImageData(output, 0, 0);
        return ctx;
    }

    public async colorfy(image: ImageSourceType, color: string): Promise<Buffer> {
        if (!image) throw new Error("Image was not provided!");
        const img = await this.loadImage(image);
        const { canvas, ctx } = this.makeCanvas(img.width, img.height);

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        if (color) {
            ctx.globalCompositeOperation = "color";
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        return await this.buildImage(canvas);
    }

    public async colourfy(image: ImageSourceType, colour: string): Promise<Buffer> {
        return await this.colorfy(image, colour);
    }

    public async color(color: string, width: number, height: number): Promise<Buffer> {
        const { canvas, ctx } = this.makeCanvas(width ?? 1024, height ?? 1024);

        ctx.beginPath();
        ctx.fillStyle = color ?? "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        return await this.buildImage(canvas);
    }

    public async colour(colour: string, width: number, height: number): Promise<Buffer> {
        return this.color(colour, width, height);
    }
}

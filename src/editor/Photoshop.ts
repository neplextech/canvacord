import { GIFData, ImageSource, SketchConstructorOptions } from "../types/globalTypes";
import { createCanvas, SKRSContext2D, Canvas as SkCanvas } from "@napi-rs/canvas";
import { Util } from "../Utils/Util";
import { Sketcher } from "../include/Sketch";
import { loadImage } from "../Utils/loadImage";
import { Decoder } from "@canvacord/gif";
import { Readable } from "stream";

/**
 * Basic photo editing
 */
export class Photoshop {
    constructor() {
        throw new Error("Cannot instantiate static class");
    }

    static async blur(image: ImageSource, pixels?: number): Promise<Buffer> {
        if (!image) throw new Error("Image was not provided!");
        const img = await Util.loadImage(image);
        const canvas = createCanvas(img.width, img.height);

        const ctx = canvas.getContext("2d");

        // experiment
        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter
        // currently not supported
        ctx.filter = `blur(${pixels ?? 0}px)`;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        return await canvas.encode("png");
    }

    static async brighten(img: ImageSource, amount?: number): Promise<Buffer> {
        amount ??= 50;
        const image = await Util.loadImage(img);
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(image, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] += amount;
            imgData.data[i + 1] += amount;
            imgData.data[i + 2] += amount;
        }

        ctx.putImageData(imgData, 0, 0);

        return await canvas.encode("png");
    }

    static async darken(img: ImageSource, amount?: number): Promise<Buffer> {
        return await Photoshop.brighten(img, -amount);
    }

    static async greyscale(img: ImageSource): Promise<Buffer> {
        const image = await Util.loadImage(img);
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(image, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imgData.data.length; i += 4) {
            const brightness = 0.34 * imgData.data[i] + 0.5 * imgData.data[i + 1] + 0.16 * imgData.data[i + 2];
            imgData.data[i] = brightness;
            imgData.data[i + 1] = brightness;
            imgData.data[i + 2] = brightness;
        }

        ctx.putImageData(imgData, 0, 0);

        return await canvas.encode("png");
    }

    static async grayscale(img: ImageSource): Promise<Buffer> {
        return await Photoshop.greyscale(img);
    }

    static async invert(img: ImageSource) {
        const image = await Util.loadImage(img);
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(image, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] = 255 - imgData.data[i];
            imgData.data[i + 1] = 255 - imgData.data[i + 1];
            imgData.data[i + 2] = 255 - imgData.data[i + 2];
            imgData.data[i + 3] = 255;
        }

        ctx.putImageData(imgData, 0, 0);

        return await canvas.encode("png");
    }

    static async sepia(img: ImageSource): Promise<Buffer> {
        const image = await Util.loadImage(img);
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(image, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] = imgData.data[i] * 0.393 + imgData.data[i + 1] * 0.769 + imgData.data[i + 2] * 0.189;
            imgData.data[i + 1] = imgData.data[i] * 0.349 + imgData.data[i + 1] * 0.686 + imgData.data[i + 2] * 0.168;
            imgData.data[i + 2] = imgData.data[i] * 0.272 + imgData.data[i + 1] * 0.534 + imgData.data[i + 2] * 0.131;
        }

        ctx.putImageData(imgData, 0, 0);

        return await canvas.encode("png");
    }

    static async threshold(img: ImageSource, amount: number): Promise<Buffer> {
        const image = await Util.loadImage(img);
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext("2d");

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

        return await canvas.encode("png");
    }

    static async circle(image: ImageSource): Promise<Buffer> {
        if (!image) throw new Error("Image was not provided!");
        const img = await Util.loadImage(image);
        const canvas = createCanvas(img.width, img.height);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0);
        ctx.globalCompositeOperation = "destination-in";
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        return await canvas.encode("png");
    }

    static async convolute(ctx: SKRSContext2D, canvas: SkCanvas, matrix: number[], opaque?: boolean): Promise<SKRSContext2D> {
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

    static async colorfy(image: ImageSource, color: string): Promise<Buffer> {
        if (!image) throw new Error("Image was not provided!");
        const img = await Util.loadImage(image);
        const canvas = createCanvas(img.width, img.height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        if (color) {
            ctx.globalCompositeOperation = "color";
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        return await canvas.encode("png");
    }

    static async colourfy(image: ImageSource, colour: string): Promise<Buffer> {
        return await this.colorfy(image, colour);
    }

    static async color(color: string, width: number, height: number): Promise<Buffer> {
        const canvas = createCanvas(width ?? 1024, height ?? 1024);
        const ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.fillStyle = color ?? "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        return await canvas.encode("png");
    }

    static async colour(colour: string, width: number, height: number): Promise<Buffer> {
        return this.color(colour, width, height);
    }

    static async sketch(image: ImageSource, options: SketchConstructorOptions = {}): Promise<Buffer> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            if (!image) return reject(new Error("Source image was not provided"));
            const img = await loadImage(image);
            const canvas = createCanvas(img.width, img.height);
            const ctx = canvas.getContext("2d");

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            Object.assign<SketchConstructorOptions, SketchConstructorOptions, SketchConstructorOptions>(
                {},
                {
                    levelSteps: 6,
                    lineAlpha: 0.1,
                    lineThickness: 2,
                    lineDensity: 0.5,
                    lightness: 4,
                    edgeBlurAmount: 2,
                    edgeAmount: 0.5
                },
                options
            );

            const greyscale = Boolean(options.greyscale);
            delete options["greyscale"];

            Object.keys(options)
                .filter((x) => x !== "greyscale")
                .forEach((fn: string) => {
                    if (!Util.is(options[fn as keyof SketchConstructorOptions], "number") || options[fn as keyof SketchConstructorOptions] === Infinity) return reject(new TypeError(`options.${fn} must be a finite number, received ${fn}!`));
                });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const sketcher = new (Sketcher as any)(canvas.width, canvas.height);

            for (const prop of Object.keys(options)) {
                sketcher[prop] = options[prop as keyof SketchConstructorOptions];
            }

            sketcher.transformCanvas(canvas, greyscale).whenReady(async () => resolve(await canvas.encode("png")));
        });
    }

    static async parseGIF(gif: string | Buffer) {
        const binary = await loadImage(gif, false);
        const decoder = new Decoder(binary);
        const rawFrames = decoder.decode();

        return {
            height: decoder.height,
            width: decoder.width,
            frameCount: rawFrames.length,

            async frames(buffer?: boolean): Promise<Buffer[] | Readable[]> {
                const frameStream = decoder.toPNG(rawFrames);
                return buffer ? await Promise.all(frameStream.map((m) => Util.streamToBuffer(m))) : frameStream;
            }
        } as GIFData;
    }
}

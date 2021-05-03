import { ImageSource } from "../types/globalTypes";
import { createCanvas } from "@napi-rs/canvas";
import { Util } from "../Utils/Util";

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

        return await canvas.png();
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

        return await canvas.png();
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

        return await canvas.png();
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

        return await canvas.png();
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

        return await canvas.png();
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

        return await canvas.png();
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

        return await canvas.png();
    }
}

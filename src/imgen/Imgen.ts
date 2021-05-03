import { createCanvas } from "@napi-rs/canvas";
import GIFEncoder from "gifencoder";
import { Util } from "../Utils/Util";
import { ImageSource } from "../types/globalTypes";
import { Photoshop } from "../editor/Photoshop";

/**
 * Housing for memes
 */
export class CanvacordImgen {
    constructor() {
        throw new Error("Cannot instantiate static class");
    }

    static async trigger(img: ImageSource): Promise<Buffer> {
        const base = await Util.loadImage(await Util.assets.image("TRIGGERED"));
        const image = await Util.loadImage(img);
        const GIF = new GIFEncoder(256, 310);

        GIF.start();
        GIF.setRepeat(0);
        GIF.setDelay(15);

        const canvas = createCanvas(256, 310);
        const ctx = canvas.getContext("2d");

        const BR = 30;
        const LR = 20;

        let i = 0;
        while (i < 9) {
            ctx.clearRect(0, 0, 256, 310);
            ctx.drawImage(
                image,
                Math.floor(Math.random() * BR) - BR,
                Math.floor(Math.random() * BR) - BR,
                256 + BR,
                310 - 54 + BR
            );
            ctx.save();
            ctx.fillStyle = "#FF000033";
            ctx.fillRect(0, 0, 256, 310);
            ctx.restore();
            ctx.drawImage(
                base,
                Math.floor(Math.random() * LR) - LR,
                310 - 54 + Math.floor(Math.random() * LR) - LR,
                256 + LR,
                54 + LR
            );

            // @ts-ignore
            GIF.addFrame(ctx);
            i++;
        }

        GIF.finish();

        return GIF.out.getData();
    }

    static async triggered(img: ImageSource) {
        return this.trigger(img);
    }

    static async kiss(image1: ImageSource, image2: ImageSource): Promise<Buffer> {
        if (!image1) throw new Error("First image was not provided!");
        if (!image2) throw new Error("Second image was not provided!");
        const canvas = createCanvas(768, 574);
        const ctx = canvas.getContext("2d");
        const background = await Util.loadImage(await Util.assets.image("KISS"));
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const avatar = await Util.loadImage(image1);
        const avatar1 = await Util.loadImage(image2);
        ctx.drawImage(avatar1, 370, 25, 200, 200);
        ctx.drawImage(avatar, 150, 25, 200, 200);

        return await canvas.png();
    }

    static async spank(image1: ImageSource, image2: ImageSource): Promise<Buffer> {
        if (!image1) throw new Error("First image was not provided!");
        if (!image2) throw new Error("Second image was not provided!");
        const canvas = createCanvas(500, 500);
        const ctx = canvas.getContext("2d");
        const background = await Util.loadImage(await Util.assets.image("SPANK"));
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const avatar = await Util.loadImage(image1);
        const avatar1 = await Util.loadImage(image2);
        ctx.drawImage(avatar1, 350, 220, 120, 120);
        ctx.drawImage(avatar, 225, 5, 140, 140);
        return await canvas.png();
    }

    static async slap(image1: ImageSource, image2: ImageSource): Promise<Buffer> {
        if (!image1) throw new Error("First image was not provided!");
        if (!image2) throw new Error("Second image was not provided!");
        const canvas = createCanvas(1000, 500);
        const ctx = canvas.getContext("2d");
        const background = await Util.loadImage(await Util.assets.image("BATSLAP"));
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const avatar = await Util.loadImage(image1);
        const avatar1 = await Util.loadImage(image2);
        ctx.drawImage(avatar1, 580, 260, 200, 200);
        ctx.drawImage(avatar, 350, 70, 220, 220);
        return await canvas.png();
    }

    static async beautiful(image: ImageSource): Promise<Buffer> {
        if (!image) throw new Error("Image was not provided!");
        const img = await Util.loadImage(image);
        const base = await Util.loadImage(await Util.assets.image("BEAUTIFUL"));
        const canvas = createCanvas(376, 400);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(base, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 258, 28, 84, 95);
        ctx.drawImage(img, 258, 229, 84, 95);

        return await canvas.png();
    }

    static async facepalm(image: ImageSource): Promise<Buffer> {
        if (!image) throw new Error("image was not provided!");
        let layer = await Util.loadImage(await Util.assets.image("FACEPALM"));
        let canvas = createCanvas(632, 357);
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 632, 357);
        let avatar = await Util.loadImage(image);
        ctx.drawImage(avatar, 199, 112, 235, 235);
        ctx.drawImage(layer, 0, 0, 632, 357);
        return await canvas.png();
    }

    static async rainbow(image: ImageSource): Promise<Buffer> {
        if (!image) throw new Error("image was not provided!");
        let bg = await Util.loadImage(await Util.assets.image("GAY"));
        let img = await Util.loadImage(image);
        const canvas = createCanvas(img.width, img.height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
        return await canvas.png();
    }

    static async rip(image: ImageSource): Promise<Buffer> {
        if (!image) throw new Error("Image was not provided!");
        const img = await Util.loadImage(image);
        const bg = await Util.loadImage(await Util.assets.image("RIP"));
        const canvas = createCanvas(244, 253);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 63, 110, 90, 90);
        return await canvas.png();
    }

    static async trash(image: ImageSource): Promise<Buffer> {
        if (!image) throw new Error("Image was not provided!");
        const blur = await Photoshop.blur(image, 3);
        const img = await Util.loadImage(blur);
        const bg = await Util.loadImage(await Util.assets.image("TRASH"));

        const canvas = createCanvas(bg.width, bg.height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(bg, 0, 0);
        ctx.drawImage(img, 309, 0, 309, 309);
        return await canvas.png();
    }

    static async hitler(image: ImageSource): Promise<Buffer> {
        if (!image) throw new Error("image was not provided!");
        const img = await Util.loadImage(image);
        const bg = await Util.loadImage(await Util.assets.image("HITLER"));

        const canvas = createCanvas(bg.width, bg.height);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(bg, 0, 0);
        ctx.drawImage(img, 46, 43, 140, 140);

        return await canvas.png();
    }
}

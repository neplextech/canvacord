import { BaseCanvas } from "./BaseCanvas";
import GIFEncoder from "gifencoder";
import { ImageSourceType } from "../typings/types";
import { Util } from "../Utils/Util";
import { UtilityCanvas } from "./UtilityCanvas";

const canvasUtils = new UtilityCanvas();

export class MemeCanvas extends BaseCanvas {
    constructor() {
        super();
    }

    public async trigger(image: ImageSourceType): Promise<Buffer> {
        if (!image) throw new Error("no image was provided");
        const img = await this.loadImage(image);
        const base = await this.loadImage(await Util.assets.image("TRIGGERED"));

        const GIF = new GIFEncoder(256, 310);

        GIF.start();
        GIF.setRepeat(0);
        GIF.setDelay(15);

        const { ctx } = this.makeCanvas(256, 310);

        const BR = 30;
        const LR = 20;

        let i = 0;
        while (i < 9) {
            ctx.clearRect(0, 0, 256, 310);
            ctx.drawImage(img, Math.floor(Math.random() * BR) - BR, Math.floor(Math.random() * BR) - BR, 256 + BR, 310 - 54 + BR);
            ctx.save();
            ctx.fillStyle = "#FF000033";
            ctx.fillRect(0, 0, 256, 310);
            ctx.restore();
            ctx.drawImage(base, Math.floor(Math.random() * LR) - LR, 310 - 54 + Math.floor(Math.random() * LR) - LR, 256 + LR, 54 + LR);

            GIF.addFrame(ctx as unknown as CanvasRenderingContext2D);
            i++;
        }

        GIF.finish();

        return GIF.out.getData();
    }

    public async triggered(image: ImageSourceType): Promise<Buffer> {
        return await this.trigger(image);
    }

    public async kiss(image1: ImageSourceType, image2: ImageSourceType): Promise<Buffer> {
        if (!image1) throw new Error("First image was not provided!");
        if (!image2) throw new Error("Second image was not provided!");
        const { canvas, ctx } = this.makeCanvas(768, 574);

        const background = await this.loadImage(await Util.assets.image("KISS"));
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const avatar = await this.loadImage(image1);
        const avatar1 = await this.loadImage(image2);
        ctx.drawImage(avatar1, 370, 25, 200, 200);
        ctx.drawImage(avatar, 150, 25, 200, 200);

        return await this.buildImage(canvas);
    }

    public async spank(image1: ImageSourceType, image2: ImageSourceType): Promise<Buffer> {
        if (!image1) throw new Error("First image was not provided!");
        if (!image2) throw new Error("Second image was not provided!");
        const { canvas, ctx } = this.makeCanvas(500, 500);

        const background = await this.loadImage(await Util.assets.image("SPANK"));
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const avatar = await this.loadImage(image1);
        const avatar1 = await this.loadImage(image2);
        ctx.drawImage(avatar1, 350, 220, 120, 120);
        ctx.drawImage(avatar, 225, 5, 140, 140);
        return await this.buildImage(canvas);
    }

    public async slap(image1: ImageSourceType, image2: ImageSourceType): Promise<Buffer> {
        if (!image1) throw new Error("First image was not provided!");
        if (!image2) throw new Error("Second image was not provided!");
        const { canvas, ctx } = this.makeCanvas(1000, 500);

        const background = await this.loadImage(await Util.assets.image("BATSLAP"));
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const avatar = await this.loadImage(image1);
        const avatar1 = await this.loadImage(image2);
        ctx.drawImage(avatar1, 580, 260, 200, 200);
        ctx.drawImage(avatar, 350, 70, 220, 220);
        return await this.buildImage(canvas);
    }

    public async beautiful(image: ImageSourceType): Promise<Buffer> {
        if (!image) throw new Error("Image was not provided!");
        const img = await this.loadImage(image);
        const base = await this.loadImage(await Util.assets.image("BEAUTIFUL"));
        const { canvas, ctx } = this.makeCanvas(376, 400);

        ctx.drawImage(base, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 258, 28, 84, 95);
        ctx.drawImage(img, 258, 229, 84, 95);

        return await this.buildImage(canvas);
    }

    public async facepalm(image: ImageSourceType): Promise<Buffer> {
        if (!image) throw new Error("image was not provided!");
        const layer = await this.loadImage(await Util.assets.image("FACEPALM"));
        const { canvas, ctx } = this.makeCanvas(632, 357);

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 632, 357);
        const avatar = await this.loadImage(image);
        ctx.drawImage(avatar, 199, 112, 235, 235);
        ctx.drawImage(layer, 0, 0, 632, 357);
        return await this.buildImage(canvas);
    }

    public async rainbow(image: ImageSourceType): Promise<Buffer> {
        if (!image) throw new Error("image was not provided!");
        const bg = await this.loadImage(await Util.assets.image("GAY"));
        const img = await this.loadImage(image);
        const { canvas, ctx } = this.makeCanvas(img.width, img.height);

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
        return await this.buildImage(canvas);
    }

    public async rip(image: ImageSourceType): Promise<Buffer> {
        if (!image) throw new Error("Image was not provided!");
        const img = await this.loadImage(image);
        const bg = await this.loadImage(await Util.assets.image("RIP"));
        const { canvas, ctx } = this.makeCanvas(244, 253);

        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 63, 110, 90, 90);
        return await this.buildImage(canvas);
    }

    public async trash(image: ImageSourceType): Promise<Buffer> {
        if (!image) throw new Error("Image was not provided!");
        const blur = await canvasUtils.blur(image, 3);
        const img = await this.loadImage(blur);
        const bg = await this.loadImage(await Util.assets.image("TRASH"));

        const { canvas, ctx } = this.makeCanvas(bg.width, bg.height);

        ctx.drawImage(bg, 0, 0);
        ctx.drawImage(img, 309, 0, 309, 309);
        return await this.buildImage(canvas);
    }

    public async hitler(image: ImageSourceType): Promise<Buffer> {
        if (!image) throw new Error("image was not provided!");
        const img = await this.loadImage(image);
        const bg = await this.loadImage(await Util.assets.image("HITLER"));

        const { canvas, ctx } = this.makeCanvas(bg.width, bg.height);

        ctx.drawImage(bg, 0, 0);
        ctx.drawImage(img, 46, 43, 140, 140);

        return await this.buildImage(canvas);
    }

    public async jokeOverHead(image: ImageSourceType): Promise<Buffer> {
        if (!image) throw new Error("Image wasn ot provided!");
        const layer = await this.loadImage(await Util.assets.image("JOKEOVERHEAD"));
        const img = await this.loadImage(image);
        const { canvas, ctx } = this.makeCanvas(425, 404);

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 425, 404);
        ctx.drawImage(img, 125, 130, 140, 135);
        ctx.drawImage(layer, 0, 0, 425, 404);
        return await this.buildImage(canvas);
    }

    public async distracted(image1: ImageSourceType, image2: ImageSourceType, image3: ImageSourceType = null): Promise<Buffer> {
        if (!image1) throw new Error("First image was not provided!");
        if (!image2) throw new Error("Second image was not provided!");
        const background = await this.loadImage(await Util.assets.image("DISTRACTED"));
        const avatar1 = await this.loadImage(await canvasUtils.circle(image1));
        const avatar2 = await this.loadImage(await canvasUtils.circle(image2));
        const avatar3 = image3 ? await this.loadImage(await canvasUtils.circle(image3)) : null;

        const { canvas, ctx } = this.makeCanvas(background.width, background.height);

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(avatar1, 180, 90, 150, 150);
        ctx.drawImage(avatar2, 480, 35, 130, 130);
        if (avatar3) ctx.drawImage(avatar3, 730, 110, 130, 130);

        return await this.buildImage(canvas);
    }

    public async affect(image: ImageSourceType): Promise<Buffer> {
        if (!image) throw new Error("image was not provided!");
        const img = await this.loadImage(image);
        const bg = await this.loadImage(await Util.assets.image("AFFECT"));

        const { canvas, ctx } = this.makeCanvas(bg.width, bg.height);

        ctx.drawImage(bg, 0, 0);
        ctx.drawImage(img, 180, 383, 200, 157);

        return await this.buildImage(canvas);
    }

    public async jail(image: ImageSourceType, greyscale = false): Promise<Buffer> {
        if (!image) throw new Error("image was not provided!");
        const img = await this.loadImage(greyscale ? await canvasUtils.greyscale(image) : image);
        const bg = await this.loadImage(await Util.assets.image("JAIL"));

        const { canvas, ctx } = this.makeCanvas(350, 350);

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        return await this.buildImage(canvas);
    }

    public async bed(image1: ImageSourceType, image2: ImageSourceType): Promise<Buffer> {
        if (!image1) throw new Error("First image was not provided!");
        if (!image2) throw new Error("Second image was not provided!");
        const avatar = await this.loadImage(image1);
        const avatar1 = await this.loadImage(image2);
        const background = await this.loadImage(await Util.assets.image("BED"));

        const { canvas, ctx } = this.makeCanvas(background.width, background.height);

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.drawImage(avatar, 25, 100, 100, 100);
        ctx.drawImage(avatar, 25, 300, 100, 100);
        ctx.drawImage(avatar, 53, 450, 70, 70);
        ctx.drawImage(avatar1, 53, 575, 100, 100);

        return await this.buildImage(canvas);
    }

    public async delete(image: ImageSourceType, dark = false): Promise<Buffer> {
        if (!image) throw new Error("image was not provided!");
        const img = await this.loadImage(image);
        const bg = await this.loadImage(dark ? await canvasUtils.invert(await Util.assets.image("DELETE")) : await Util.assets.image("DELETE"));

        const { canvas, ctx } = this.makeCanvas(bg.width, bg.height);

        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 120, 135, 195, 195);

        return await this.buildImage(canvas);
    }

    public async wanted(image: ImageSourceType): Promise<Buffer> {
        if (!image) throw new Error("image was not provided!");
        const img = await this.loadImage(image);
        const bg = await this.loadImage(await Util.assets.image("WANTED"));

        const { canvas, ctx } = this.makeCanvas(bg.width, bg.height);

        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 145, 282, 447, 447);

        return await this.buildImage(canvas);
    }

    public async wasted(image: ImageSourceType): Promise<Buffer> {
        if (!image) throw new Error("image was not provided!");
        const img = await this.loadImage(await canvasUtils.greyscale(image));
        const bg = await this.loadImage(await Util.assets.image("WASTED"));

        const { canvas, ctx } = this.makeCanvas(512, 512);

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        return await this.buildImage(canvas);
    }

    public async shit(image: ImageSourceType): Promise<Buffer> {
        if (!image) throw new Error("image was not provided!");
        const img = await this.loadImage(await canvasUtils.circle(image));
        const bg = await this.loadImage(await Util.assets.image("SHIT"));

        const { canvas, ctx } = this.makeCanvas(bg.width, bg.height);

        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 210, 700, 170, 170);

        return await this.buildImage(canvas);
    }
}

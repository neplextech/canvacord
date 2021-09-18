import { BaseCanvas } from "./BaseCanvas";
import GIFEncoder from "gifencoder";
import { ImageSourceType } from "../typings/types";
import { Util } from "../Utils/Util";
import { UtilityCanvas } from "./UtilityCanvas";
import { CanvasBuilder2D } from "./CanvasBuilder2D";
import Singleton from "../decorators/Singleton";

const canvasUtils = new UtilityCanvas();

@Singleton
export class MemeCanvas extends BaseCanvas {
    public async trigger(image: ImageSourceType): Promise<Buffer> {
        if (!image) throw new Error("no image was provided");
        const img = await this.loadImage(image);
        const base = await this.loadImage(await Util.assets.image("TRIGGERED"));

        const GIF = new GIFEncoder(256, 310);

        GIF.start();
        GIF.setRepeat(0);
        GIF.setDelay(15);

        const canvas = new CanvasBuilder2D(256, 310);

        const BR = 30;
        const LR = 20;

        let i = 0;
        while (i < 9) {
            canvas
                .clearRect(0, 0, 256, 310)
                .drawImage(img, Math.floor(Math.random() * BR) - BR, Math.floor(Math.random() * BR) - BR, 256 + BR, 310 - 54 + BR)
                .save()
                .setColorFill("#FF000033")
                .drawRect(0, 0, 256, 310)
                .restore()
                .drawImage(base, Math.floor(Math.random() * LR) - LR, 310 - 54 + Math.floor(Math.random() * LR) - LR, 256 + LR, 54 + LR);

            GIF.addFrame(canvas.ctx as unknown as CanvasRenderingContext2D);
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

        const background = await this.loadImage(await Util.assets.image("KISS"));
        const avatar = await this.loadImage(image1);
        const avatar1 = await this.loadImage(image2);

        const canvas = new CanvasBuilder2D(background.width, background.height);
        canvas.drawImage(background, 0, 0, canvas.width, canvas.height);
        canvas.drawImage(avatar1, 370, 25, 200, 200);
        canvas.drawImage(avatar, 150, 25, 200, 200);

        return canvas.toBufferAsync(this.mimeType);
    }

    public async spank(image1: ImageSourceType, image2: ImageSourceType): Promise<Buffer> {
        if (!image1) throw new Error("First image was not provided!");
        if (!image2) throw new Error("Second image was not provided!");

        const background = await this.loadImage(await Util.assets.image("SPANK"));
        const avatar = await this.loadImage(image1);
        const avatar1 = await this.loadImage(image2);

        const canvas = new CanvasBuilder2D(500, 500);
        canvas.drawImage(background, 0, 0, canvas.width, canvas.height);
        canvas.drawImage(avatar1, 350, 220, 120, 120);
        canvas.drawImage(avatar, 225, 5, 140, 140);

        return canvas.toBufferAsync(this.mimeType);
    }

    public async slap(image1: ImageSourceType, image2: ImageSourceType): Promise<Buffer> {
        if (!image1) throw new Error("First image was not provided!");
        if (!image2) throw new Error("Second image was not provided!");

        const background = await this.loadImage(await Util.assets.image("BATSLAP"));
        const avatar = await this.loadImage(image1);
        const avatar1 = await this.loadImage(image2);

        const canvas = new CanvasBuilder2D(1000, 500);
        canvas.drawImage(background, 0, 0, canvas.width, canvas.height);
        canvas.drawImage(avatar1, 580, 260, 200, 200);
        canvas.drawImage(avatar, 350, 70, 220, 220);

        return canvas.toBufferAsync(this.mimeType);
    }

    public async beautiful(image: ImageSourceType): Promise<Buffer> {
        if (!image) throw new Error("Image was not provided!");
        const img = await this.loadImage(image);
        const base = await this.loadImage(await Util.assets.image("BEAUTIFUL"));

        const canvas = new CanvasBuilder2D(376, 400);
        canvas.drawImage(base, 0, 0, canvas.width, canvas.height);
        canvas.drawImage(img, 258, 28, 84, 95);
        canvas.drawImage(img, 258, 229, 84, 95);

        return canvas.toBufferAsync(this.mimeType);
    }

    public async facepalm(image: ImageSourceType): Promise<Buffer> {
        if (!image) throw new Error("image was not provided!");
        const layer = await this.loadImage(await Util.assets.image("FACEPALM"));
        const avatar = await this.loadImage(image);

        const canvas = new CanvasBuilder2D(632, 357).setColorFill("black").drawRect(0, 0, 632, 357).drawImage(avatar, 199, 112, 235, 235).drawImage(layer, 0, 0, 632, 357);

        return canvas.toBufferAsync(this.mimeType);
    }

    public async rainbow(image: ImageSourceType): Promise<Buffer> {
        if (!image) throw new Error("image was not provided!");
        const bg = await this.loadImage(await Util.assets.image("GAY"));
        const img = await this.loadImage(image);

        const canvas = new CanvasBuilder2D(img.width, img.height);
        canvas.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.drawImage(bg, 0, 0, canvas.width, canvas.height);

        return canvas.toBufferAsync(this.mimeType);
    }

    public async rip(image: ImageSourceType): Promise<Buffer> {
        if (!image) throw new Error("Image was not provided!");
        const img = await this.loadImage(image);
        const bg = await this.loadImage(await Util.assets.image("RIP"));
        const canvas = new CanvasBuilder2D(244, 253);
        canvas.drawImage(bg, 0, 0, canvas.width, canvas.height);
        canvas.drawImage(img, 63, 110, 90, 90);

        return canvas.toBufferAsync(this.mimeType);
    }

    public async trash(image: ImageSourceType): Promise<Buffer> {
        if (!image) throw new Error("Image was not provided!");
        const blur = await canvasUtils.blur(image, 3);
        const img = await this.loadImage(blur);
        const bg = await this.loadImage(await Util.assets.image("TRASH"));

        const canvas = new CanvasBuilder2D(bg.width, bg.height).drawImage(bg, 0, 0).drawImage(img, 309, 0, 309, 309);

        return canvas.toBufferAsync(this.mimeType);
    }

    public async hitler(image: ImageSourceType): Promise<Buffer> {
        if (!image) throw new Error("image was not provided!");
        const img = await this.loadImage(image);
        const bg = await this.loadImage(await Util.assets.image("HITLER"));

        const canvas = new CanvasBuilder2D(bg.width, bg.height).drawImage(bg, 0, 0).drawImage(img, 46, 43, 140, 140);

        return canvas.toBufferAsync(this.mimeType);
    }

    public async jokeOverHead(image: ImageSourceType): Promise<Buffer> {
        if (!image) throw new Error("Image wasn ot provided!");
        const layer = await this.loadImage(await Util.assets.image("JOKEOVERHEAD"));
        const img = await this.loadImage(image);
        const canvas = new CanvasBuilder2D(425, 404).setColorFill("black").drawRect(0, 0, 425, 404).drawImage(img, 125, 130, 140, 135).drawImage(layer, 0, 0, 425, 404);

        return canvas.toBufferAsync(this.mimeType);
    }

    public async distracted(image1: ImageSourceType, image2: ImageSourceType, image3: ImageSourceType = null): Promise<Buffer> {
        if (!image1) throw new Error("First image was not provided!");
        if (!image2) throw new Error("Second image was not provided!");
        const background = await this.loadImage(await Util.assets.image("DISTRACTED"));
        const avatar1 = await this.loadImage(await canvasUtils.circle(image1));
        const avatar2 = await this.loadImage(await canvasUtils.circle(image2));
        const avatar3 = image3 ? await this.loadImage(await canvasUtils.circle(image3)) : null;

        const canvas = new CanvasBuilder2D(background.width, background.height);
        canvas.drawImage(background, 0, 0, canvas.width, canvas.height);
        canvas.drawImage(avatar1, 180, 90, 150, 150);
        canvas.drawImage(avatar2, 480, 35, 130, 130);

        if (avatar3) canvas.drawImage(avatar3, 730, 110, 130, 130);

        return canvas.toBufferAsync(this.mimeType);
    }

    public async affect(image: ImageSourceType): Promise<Buffer> {
        if (!image) throw new Error("image was not provided!");
        const img = await this.loadImage(image);
        const bg = await this.loadImage(await Util.assets.image("AFFECT"));

        const canvas = new CanvasBuilder2D(bg.width, bg.height).drawImage(bg, 0, 0).drawImage(img, 180, 383, 200, 157);

        return canvas.toBufferAsync(this.mimeType);
    }

    public async jail(image: ImageSourceType, greyscale = false): Promise<Buffer> {
        if (!image) throw new Error("image was not provided!");
        const img = await this.loadImage(greyscale ? await canvasUtils.greyscale(image) : image);
        const bg = await this.loadImage(await Util.assets.image("JAIL"));

        const canvas = new CanvasBuilder2D(350, 350);
        canvas.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.drawImage(bg, 0, 0, canvas.width, canvas.height);

        return canvas.toBufferAsync(this.mimeType);
    }

    public async bed(image1: ImageSourceType, image2: ImageSourceType): Promise<Buffer> {
        if (!image1) throw new Error("First image was not provided!");
        if (!image2) throw new Error("Second image was not provided!");
        const avatar = await this.loadImage(image1);
        const avatar1 = await this.loadImage(image2);
        const background = await this.loadImage(await Util.assets.image("BED"));

        const canvas = new CanvasBuilder2D(background.width, background.height);
        canvas.drawImage(background, 0, 0, canvas.width, canvas.height);
        canvas.drawImage(avatar, 25, 100, 100, 100);
        canvas.drawImage(avatar, 25, 300, 100, 100);
        canvas.drawImage(avatar, 53, 450, 70, 70);
        canvas.drawImage(avatar1, 53, 575, 100, 100);

        return canvas.toBufferAsync(this.mimeType);
    }

    public async delete(image: ImageSourceType, dark = false): Promise<Buffer> {
        if (!image) throw new Error("image was not provided!");
        const img = await this.loadImage(image);
        const bg = await this.loadImage(dark ? await canvasUtils.invert(await Util.assets.image("DELETE")) : await Util.assets.image("DELETE"));

        const canvas = new CanvasBuilder2D(bg.width, bg.height);
        canvas.drawImage(bg, 0, 0, canvas.width, canvas.height);
        canvas.drawImage(img, 120, 135, 195, 195);

        return canvas.toBufferAsync(this.mimeType);
    }

    public async wanted(image: ImageSourceType): Promise<Buffer> {
        if (!image) throw new Error("image was not provided!");
        const img = await this.loadImage(image);
        const bg = await this.loadImage(await Util.assets.image("WANTED"));

        const canvas = new CanvasBuilder2D(bg.width, bg.height);
        canvas.drawImage(bg, 0, 0, canvas.width, canvas.height);
        canvas.drawImage(img, 145, 282, 447, 447);

        return canvas.toBufferAsync(this.mimeType);
    }

    public async wasted(image: ImageSourceType): Promise<Buffer> {
        if (!image) throw new Error("image was not provided!");
        const img = await this.loadImage(await canvasUtils.greyscale(image));
        const bg = await this.loadImage(await Util.assets.image("WASTED"));

        const canvas = new CanvasBuilder2D(512, 512);
        canvas.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.drawImage(bg, 0, 0, canvas.width, canvas.height);

        return canvas.toBufferAsync(this.mimeType);
    }

    public async shit(image: ImageSourceType): Promise<Buffer> {
        if (!image) throw new Error("image was not provided!");
        const img = await this.loadImage(await canvasUtils.circle(image));
        const bg = await this.loadImage(await Util.assets.image("SHIT"));

        const canvas = new CanvasBuilder2D(bg.width, bg.height);
        canvas.drawImage(bg, 0, 0, canvas.width, canvas.height);
        canvas.drawImage(img, 210, 700, 170, 170);

        return canvas.toBufferAsync(this.mimeType);
    }
}

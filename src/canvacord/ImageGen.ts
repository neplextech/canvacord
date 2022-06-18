/**
 *! TO-DO
 - fix: changeMyMind
 - create: impostor, youtube, phub
 */

import { Illustrator, IllustratorImageSource, ImageLoader, Tools } from "illustrator.js";
import { AssetsManager } from "./AssetsManager";
import { buffer as streamToBuffer } from "stream/consumers";

export class ImageGen extends null {
    private constructor() { }

    public static async triggered(image: IllustratorImageSource) {
        if (!image) throw new Error("image source is required");
        const img = await ImageLoader.loadImage(image);
        const base = await ImageLoader.loadImage(AssetsManager.images.get("TRIGGERED").path);
        const OVERLAY_COLOR = "#FF000033";

        const illustrator = new Illustrator(256, 310);
        illustrator.backgroundLayer.hide();
        illustrator.animation.setRepeat(0);

        for (let i = 0; i < 9; i++) {
            const layer = illustrator.layers.createLayer({ name: `Layer ${i}` });
            const imgTool = layer.tools.get("ImageTool");
            const bgTool = layer.tools.get("BackgroundColorTool");

            imgTool.draw(
                img,
                Math.floor(Math.random() * 30) - 30,
                Math.floor(Math.random() * 30) - 30,
                286,
                286
            );

            imgTool.draw(
                base,
                Math.floor(Math.random() * 20) - 20,
                256 + Math.floor(Math.random() * 20) - 20,
                276,
                74
            );

            imgTool.render();

            bgTool.setFillColor(OVERLAY_COLOR);
            bgTool.fill(0, 0, illustrator.width, illustrator.height);
            bgTool.render();
        }

        const layers = illustrator.layers.getAllLayers().map(m => ({
            frame: m.layer,
            duration: 15
        }));

        illustrator.animation.addFrames(layers);

        return streamToBuffer(await illustrator.animation.createAnimation());
    }

    static async affect(image: IllustratorImageSource): Promise<Buffer> {
        if (!image) throw new Error("image source is required");

        const img = await ImageLoader.loadImage(image);
        const background = await ImageLoader.loadImage(AssetsManager.images.get("AFFECT").path);

        const illustrator = new Illustrator(background.width, background.height);

        illustrator.backgroundLayer.unlock();

        const imageTool = new Tools.ImageTool(illustrator.backgroundLayer);
        const imageTool_2 = new Tools.ImageTool(illustrator.layers.createLayer({ name: "main" }));
        const transformTool = new Tools.TransformTool(imageTool_2.layer);

        imageTool.draw(background, 0, 0, illustrator.width, illustrator.height);
        imageTool_2.draw(img, 195, 365, 207, 155);

        transformTool.rotate(0.053);

        transformTool.render();
        imageTool.render();
        imageTool_2.render();

        return await illustrator.export();
    }

    static async batslap(image: IllustratorImageSource, batman?: IllustratorImageSource): Promise<Buffer> {
        if (!image) throw new Error("image source is required");

        const img = await ImageLoader.loadImage(image);
        const background = await ImageLoader.loadImage(AssetsManager.images.get("BATSLAP").path);

        const illustrator = new Illustrator(background.width, background.height);

        const imageTool = new Tools.ImageTool(illustrator.layers.createLayer({ name: "main" }));

        imageTool.draw(background, 0, 0, illustrator.width, illustrator.height);
        imageTool.draw(img, 860, 350, 270, 270);

        if (batman) {
            const bat = await ImageLoader.loadImage(batman);
            imageTool.draw(bat, 515, 150, 215, 215);
        }

        imageTool.render();

        return await illustrator.export();
    }

    static async beautiful(image: IllustratorImageSource): Promise<Buffer> {
        if (!image) throw new Error("image source is required");

        const img = await ImageLoader.loadImage(image);
        const background = await ImageLoader.loadImage(AssetsManager.images.get("BEAUTIFUL").path);

        const illustrator = new Illustrator(background.width, background.height);

        const imageTool = new Tools.ImageTool(illustrator.layers.createLayer({ name: "main" }));

        imageTool.draw(img, 255, 25, 90, 105);
        imageTool.draw(img, 255, 225, 90, 105);
        imageTool.draw(background, 0, 0, illustrator.width, illustrator.height);

        imageTool.render();

        return await illustrator.export();
    }

    static async bed(image: IllustratorImageSource): Promise<Buffer> {
        if (!image) throw new Error("image source is required");

        const img = await ImageLoader.loadImage(image);
        const background = await ImageLoader.loadImage(AssetsManager.images.get("BED").path);

        const illustrator = new Illustrator(background.width, background.height);

        const imageTool = new Tools.ImageTool(illustrator.layers.createLayer({ name: "main" }));

        imageTool.draw(background, 0, 0, illustrator.width, illustrator.height);
        imageTool.draw(img, 65, 585, 50, 50);

        imageTool.render();

        return await illustrator.export();
    }

    //! Not Completed
    // Need to add slight rotation in the text + text thing is not done at all
    static async changeMyMind(text: string, image?: IllustratorImageSource): Promise<Buffer> {
        if (!text) throw new Error("text is required");

        const background = await ImageLoader.loadImage(AssetsManager.images.get("CHANGEMYMIND").path);

        const illustrator = new Illustrator(background.width, background.height);

        const imageTool = new Tools.ImageTool(illustrator.layers.createLayer({ name: "main", position: 3 }));
        const textTool = new Tools.TextTool(illustrator.layers.createLayer({ name: "text_layer", position: 1 }));

        imageTool.draw(background, 0, 0, illustrator.width, illustrator.height);

        let l = text.length, size;

        textTool.setFont("Arial", "20px");
        textTool.writeText(text, 200, 450, Infinity);

        if (image) {
            const transformTool = new Tools.TransformTool(illustrator.layers.createLayer({ name: "image", position: 2 }))
            const imageTool_2 = new Tools.ImageTool(transformTool.layer);
            const img = await ImageLoader.loadImage(image);

            imageTool_2.draw(img, 105, 135, 70, 70);
            transformTool.rotate(-0.5)

            imageTool.render();
            transformTool.render();
            imageTool_2.render();
            textTool.render();
        } else {
            imageTool.render();
            textTool.render();
        }

        return await illustrator.export();
    }

    static async delete(image: IllustratorImageSource): Promise<Buffer> {
        if (!image) throw new Error("image source is required");

        const img = await ImageLoader.loadImage(image);
        const background = await ImageLoader.loadImage(AssetsManager.images.get("DELETE").path);

        const illustrator = new Illustrator(background.width, background.height);

        const imageTool = new Tools.ImageTool(illustrator.layers.createLayer({ name: "main" }));

        imageTool.draw(background, 0, 0, illustrator.width, illustrator.height);
        imageTool.draw(img, 155, 135, 120, 120);

        imageTool.render();

        return await illustrator.export();
    }

    static async distracted(boy: IllustratorImageSource, distractedFrom: IllustratorImageSource, distractedTo: IllustratorImageSource): Promise<Buffer> {
        if (!boy) throw new Error("boy image source is required");
        if (!distractedFrom) throw new Error("distractedFrom image source is required");
        if (!distractedTo) throw new Error("distractedTo image source is required");

        const boyLoaded = await ImageLoader.loadImage(boy),
            distractedFromLoaded = await ImageLoader.loadImage(distractedFrom),
            distractedToLoaded = await ImageLoader.loadImage(distractedTo),
            background = await ImageLoader.loadImage(AssetsManager.images.get("DISTRACTED").path);

        const illustrator = new Illustrator(background.width, background.height);

        const imageTool = new Tools.ImageTool(illustrator.layers.createLayer({ name: "main" }));

        imageTool.draw(background, 0, 0, illustrator.width, illustrator.height);
        imageTool.draw(boyLoaded, 480, 20, 120, 120);
        imageTool.draw(distractedToLoaded, 190, 80, 190, 190);
        imageTool.draw(distractedFromLoaded, 760, 120, 120, 120);

        imageTool.render();

        return await illustrator.export();
    }

    static async facepalm(image: IllustratorImageSource): Promise<Buffer> {
        if (!image) throw new Error("image source is required");

        const img = await ImageLoader.loadImage(image);
        const background = await ImageLoader.loadImage(AssetsManager.images.get("FACEPALM").path);

        const illustrator = new Illustrator(background.width, background.height);

        const imageTool = new Tools.ImageTool(illustrator.layers.createLayer({ name: "main" }));

        imageTool.draw(img, illustrator.width / 2 - 120, illustrator.height / 2 - 65, 220, 230);
        imageTool.draw(background, 0, 0, illustrator.width, illustrator.height);

        imageTool.render();

        return await illustrator.export();
    }

    static async hitler(image: IllustratorImageSource): Promise<Buffer> {
        if (!image) throw new Error("image source is required");

        const img = await ImageLoader.loadImage(image);
        const background = await ImageLoader.loadImage(AssetsManager.images.get("HITLER").path);

        const illustrator = new Illustrator(background.width, background.height);

        const imageTool = new Tools.ImageTool(illustrator.layers.createLayer({ name: "main" }));

        imageTool.draw(background, 0, 0, illustrator.width, illustrator.height);
        imageTool.draw(img, 43.5, 32, 146, 146);

        imageTool.render();

        return await illustrator.export();
    }

    static async jokeOverhead(image: IllustratorImageSource): Promise<Buffer> {
        if (!image) throw new Error("image source is required");

        const img = await ImageLoader.loadImage(image);
        const background = await ImageLoader.loadImage(AssetsManager.images.get("JOKEOVERHEAD").path);

        const illustrator = new Illustrator(background.width, background.height);

        const imageTool = new Tools.ImageTool(illustrator.layers.createLayer({ name: "main" }));

        imageTool.draw(img, 122, 128, 140, 140);
        imageTool.draw(background, 0, 0, illustrator.width, illustrator.height);

        imageTool.render();

        return await illustrator.export();
    }

    static async kiss(boy: IllustratorImageSource, girl: IllustratorImageSource): Promise<Buffer> {
        if (!boy) throw new Error("boy source is required");
        if (!girl) throw new Error("girl source is required");

        const boyLoaded = await ImageLoader.loadImage(boy);
        const girlLoaded = await ImageLoader.loadImage(girl);
        const background = await ImageLoader.loadImage(AssetsManager.images.get("KISS").path);

        const illustrator = new Illustrator(background.width, background.height);

        const imageTool = new Tools.ImageTool(illustrator.layers.createLayer({ name: "main" }));

        imageTool.draw(background, 0, 0, illustrator.width, illustrator.height);
        imageTool.draw(girlLoaded, 180, 40, 170, 170);
        imageTool.draw(boyLoaded, 370, 40, 170, 170);

        imageTool.render();

        return await illustrator.export();
    }

    static async ohno(image: IllustratorImageSource): Promise<Buffer> {
        if (!image) throw new Error("image source is required");

        const img = await ImageLoader.loadImage(image);
        const background = await ImageLoader.loadImage(AssetsManager.images.get("OHNO").path);

        const illustrator = new Illustrator(background.width, background.height);

        const imageTool = new Tools.ImageTool(illustrator.layers.createLayer({ name: "main" }));

        imageTool.draw(background, 0, 0, illustrator.width, illustrator.height);
        imageTool.draw(img, 380, 140, 160, 160);

        imageTool.render();

        return await illustrator.export();
    }

    static async opinion(kid: IllustratorImageSource, text: string, dad?: IllustratorImageSource): Promise<Buffer> {
        if (!kid) throw new Error("image source is required");
        if (typeof text !== "string") throw new Error("text is supposed to be a string but recived " + JSON.stringify(text));

        const img = await ImageLoader.loadImage(kid);
        const background = await ImageLoader.loadImage(AssetsManager.images.get("OPINION").path);

        const illustrator = new Illustrator(background.width, background.height);

        const imageTool = new Tools.ImageTool(illustrator.layers.createLayer({ name: "main", position: 2 }));
        const textLayer = illustrator.layers.createLayer({ name: "text_layer", position: 1 });
        const textTool = textLayer.tools.get("TextTool");

        imageTool.draw(img, 94, 491, 114, 114);
        imageTool.draw(img, 375, 264, 85, 85);
        imageTool.draw(background, 0, 0, illustrator.width, illustrator.height);

        textTool.setColor("#000000");
        textTool.setFont("Arial", "20px")
        textTool.writeText(text, 200, 445, 280)

        imageTool.render();
        textTool.render();

        return await illustrator.export();
    }

    static async rip(image: IllustratorImageSource): Promise<Buffer> {
        if (!image) throw new Error("image source is required");

        const img = await ImageLoader.loadImage(image);
        const background = await ImageLoader.loadImage(AssetsManager.images.get("RIP").path);

        const illustrator = new Illustrator(background.width, background.height);

        const imageTool = new Tools.ImageTool(illustrator.layers.createLayer({ name: "main" }));

        imageTool.draw(background, 0, 0, illustrator.width, illustrator.height);
        imageTool.draw(img, 200, 400, 350, 350);

        imageTool.render();

        return await illustrator.export();
    }

    static async shit(image: IllustratorImageSource): Promise<Buffer> {
        if (!image) throw new Error("image source is required");

        const img = await ImageLoader.loadImage(image);
        const background = await ImageLoader.loadImage(AssetsManager.images.get("SHIT").path);

        const illustrator = new Illustrator(background.width, background.height);

        illustrator.backgroundLayer.unlock()

        const imageTool = new Tools.ImageTool(illustrator.backgroundLayer);
        const transformTool = new Tools.TransformTool(illustrator.layers.createLayer({ name: "main" }));
        const imageTool_2 = new Tools.ImageTool(transformTool.layer);

        imageTool.draw(background, 0, 0, illustrator.width, illustrator.height);
        imageTool_2.draw(img, 560, 570, 85, 85);

        transformTool.rotate(0.45);

        transformTool.render();
        imageTool.render();
        imageTool_2.render();

        return await illustrator.export();
    }

    static async spank(kid: IllustratorImageSource, father: IllustratorImageSource): Promise<Buffer> {
        if (!kid) throw new Error("kid source is required");
        if (!father) throw new Error("father source is required");

        const kidLoaded = await ImageLoader.loadImage(kid);
        const fatherLoaded = await ImageLoader.loadImage(father);
        const background = await ImageLoader.loadImage(AssetsManager.images.get("SPANK").path);

        const illustrator = new Illustrator(background.width, background.height);

        const imageTool = new Tools.ImageTool(illustrator.layers.createLayer({ name: "main" }));

        imageTool.draw(background, 0, 0, illustrator.width, illustrator.height);
        imageTool.draw(fatherLoaded, 460, 30, 220, 220);
        imageTool.draw(kidLoaded, 700, 430, 200, 200);

        imageTool.render();

        return await illustrator.export();
    }

    static async trash(image: IllustratorImageSource): Promise<Buffer> {
        if (!image) throw new Error("image source is required");

        const img = await ImageLoader.loadImage(image);
        const background = await ImageLoader.loadImage(AssetsManager.images.get("TRASH").path);

        const illustrator = new Illustrator(background.width, background.height);

        const imageTool = new Tools.ImageTool(illustrator.layers.createLayer({ name: "main" }));

        imageTool.draw(background, 0, 0, illustrator.width, illustrator.height);
        imageTool.draw(img, 309, 0, 309, 304);

        imageTool.render();

        return await illustrator.export();
    }
}
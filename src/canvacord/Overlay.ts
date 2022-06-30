import { Illustrator, IllustratorImageSource, ImageLoader, Tools } from "illustrator.js";
import { AssetsManager } from "./AssetsManager";

export class Overlay extends null {
    private constructor() { }

    static async gay(image: IllustratorImageSource): Promise<Buffer> {
        if (!image) throw new Error("image source is required");

        const img = await ImageLoader.loadImage(image);
        const overlay = await ImageLoader.loadImage(AssetsManager.images.get("GAY").path);

        const illustrator = new Illustrator(img.width, img.height);

        const imageTool = new Tools.ImageTool(illustrator.layers.createLayer({ name: "main" }));

        imageTool.draw(img, 0, 0, illustrator.width, illustrator.height);
        imageTool.draw(overlay, 0, 0, illustrator.width, illustrator.height);

        imageTool.render();

        return await illustrator.export();
    }

    static async jail(image: IllustratorImageSource): Promise<Buffer> {
        if (!image) throw new Error("image source is required");

        const img = await ImageLoader.loadImage(image);
        const overlay = await ImageLoader.loadImage(AssetsManager.images.get("JAIL").path);

        const illustrator = new Illustrator(img.width, img.height);

        const imageTool = new Tools.ImageTool(illustrator.layers.createLayer({ name: "main" }));

        imageTool.draw(img, 0, 0, illustrator.width, illustrator.height);
        imageTool.draw(overlay, 0, 0, illustrator.width, illustrator.height);

        imageTool.render();

        return await illustrator.export();
    }

    static async colorify(image: IllustratorImageSource, color: string): Promise<Buffer> {
        if (!image) throw new Error("image source is required");
        if (!color) throw new Error("color is required");

        const img = await ImageLoader.loadImage(image);

        const illustrator = new Illustrator(img.width, img.height);

        const imageTool = new Tools.ImageTool(illustrator.layers.createLayer({ name: "main", position: 2 }));
        const overlayLayer = illustrator.layers.createLayer({ name: "overlay", position: 1 });
        const ctx = overlayLayer.context;

        imageTool.draw(img, 0, 0, illustrator.width, illustrator.height);

        ctx.fillStyle = color;
        ctx.globalAlpha = 0.5;
        ctx.fillRect(0, 0, illustrator.width, illustrator.height);

        imageTool.render();

        return await illustrator.export();
    }

    static async snowflake(image: IllustratorImageSource): Promise<Buffer> {
        if (!image) throw new Error("image source is required");

        const img = await ImageLoader.loadImage(image);
        const overlay = await ImageLoader.loadImage(AssetsManager.images.get("SNOWFLAKE").path);

        const illustrator = new Illustrator(img.width, img.height);

        const imageTool = new Tools.ImageTool(illustrator.layers.createLayer({ name: "main" }));

        imageTool.draw(img, 0, 0, illustrator.width, illustrator.height);
        imageTool.draw(overlay, 0, 0, illustrator.width, illustrator.height);

        imageTool.render();

        return await illustrator.export();
    }

    static async wasted(image: IllustratorImageSource): Promise<Buffer> {
        if (!image) throw new Error("image source is required");

        const img = await ImageLoader.loadImage(image);
        const overlay = await ImageLoader.loadImage(AssetsManager.images.get("WASTED").path);

        const illustrator = new Illustrator(overlay.width, overlay.height);

        const imageTool = new Tools.ImageTool(illustrator.layers.createLayer({ name: "main" }));

        imageTool.draw(img, 0, 0, illustrator.width, illustrator.height);
        imageTool.draw(overlay, 0, 0, illustrator.width, illustrator.height);

        imageTool.render();

        return await illustrator.export();
    }

    // Need to find a good busted img
    // static async busted(image: IllustratorImageSource): Promise<Buffer> {
    //     if (!image) throw new Error("image source is required");

    //     const img = await ImageLoader.loadImage(image);
    //     const overlay = await ImageLoader.loadImage(AssetsManager.images.get("BUSTED").path);

    //     const illustrator = new Illustrator(img.width, img.height);

    //     const imageTool = new Tools.ImageTool(illustrator.layers.createLayer({ name: "main" }));

    //     imageTool.draw(img, 0, 0, illustrator.width, illustrator.height);
    //     imageTool.draw(overlay, 0, 0, (illustrator.width / 2) - overlayWidth, illustrator.height - overlayHeight);

    //     imageTool.render();

    //     return await illustrator.export();
    // }

    static async toBeContinued(image: IllustratorImageSource): Promise<Buffer> {
        if (!image) throw new Error("image source is required");

        const img = await ImageLoader.loadImage(image);
        const overlay = await ImageLoader.loadImage(AssetsManager.images.get("TOBECONTINUED").path);

        const illustrator = new Illustrator(img.width, img.height);

        const imageTool = new Tools.ImageTool(illustrator.layers.createLayer({ name: "main" }));

        imageTool.draw(img, 0, 0, illustrator.width, illustrator.height);
        imageTool.draw(overlay, 0, 0, illustrator.width, illustrator.height);

        imageTool.render();

        return await illustrator.export();
    }
    
}
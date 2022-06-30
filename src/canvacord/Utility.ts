import { IllustratorImageSource, ImageLoader, IllustratorImage, Tools, Illustrator } from "illustrator.js";

export interface CanvacordCropOptions {
    from: number;
    to: number;
    width: number;
    height: number;
}
export class Utility extends null {
    private constructor() { }

    static async crop(image: IllustratorImageSource, options: CanvacordCropOptions): Promise<Buffer> {
        if (!image) throw new Error("image source is required");
        const img = await ImageLoader.loadImage(image, true);

        return new IllustratorImage(img).crop(options.from, options.to, options.width, options.height).png();
    }

    static async resize(image: IllustratorImageSource, width: number, height: number): Promise<Buffer> {
        if (!image) throw new Error("image source is required");
        if (typeof width !== "number") throw new Error("Width is a required parameter and it should be a number");
        if (typeof height !== "number") throw new Error("Height is a required parameter and it should be a number");

        const img = await ImageLoader.loadImage(image);
        const illustrator = new Illustrator(width, height);

        const imageTool = new Tools.ImageTool(illustrator.layers.createLayer({ name: "main" }));

        imageTool.draw(img, 0, 0, illustrator.width, illustrator.height);

        imageTool.render();

        return await illustrator.export();
    }

    static async fuse(image1: IllustratorImageSource, image2: IllustratorImageSource): Promise<Buffer> {
        if (!image1) throw new Error("image1 source is required");
        if (!image2) throw new Error("image2 source is required");

        const img1 = await ImageLoader.loadImage(image1);
        const img2 = await ImageLoader.loadImage(image2);
        const illustrator = new Illustrator(img1.width, img2.height);

        const imageTool = new Tools.ImageTool(illustrator.layers.createLayer({ name: "main" }));

        imageTool.layer.context.globalAlpha = 0.5;
        imageTool.draw(img1, 0, 0, illustrator.width, illustrator.height);
        imageTool.draw(img2, 0, 0, illustrator.width, illustrator.height);

        imageTool.render();

        return await illustrator.export();
    }
}
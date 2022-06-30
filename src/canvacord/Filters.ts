import { ImageLoader, IllustratorImageSource, IllustratorImage, Illustrator } from 'illustrator.js';

export class Filters extends null {
    private constructor() { }

    static async invert(image: IllustratorImageSource): Promise<Buffer> {
        if (!image) throw new Error("image source is required");
        const img = await ImageLoader.loadImage(image, true);
        return new IllustratorImage(img).invert().png();
    }

    static async blur(image: IllustratorImageSource, sigma = 3): Promise<Buffer> {
        if (!image) throw new Error("image source is required");
        const img = await ImageLoader.loadImage(image, true);
        return new IllustratorImage(img).blur(sigma).png();
    }

    static async grayscale(image: IllustratorImageSource): Promise<Buffer> {
        if (!image) throw new Error("image source is required");
        const img = await ImageLoader.loadImage(image, true);
        return new IllustratorImage(img).grayscale().png();
    }

    static async huerotate(image: IllustratorImageSource, hue: number): Promise<Buffer> {
        if (!image) throw new Error("image source is required");
        const img = await ImageLoader.loadImage(image, true);
        return new IllustratorImage(img).huerotate(hue).png();
    }

    static async brighten(image: IllustratorImageSource, brightness: number): Promise<Buffer> {
        if (!image) throw new Error("image source is required");
        const img = await ImageLoader.loadImage(image, true);
        return new IllustratorImage(img).brighten(brightness).png();
    }

    static async contrast(image: IllustratorImageSource, contrast: number): Promise<Buffer> {
        if (!image) throw new Error("image source is required");
        const img = await ImageLoader.loadImage(image, true);

        return new IllustratorImage(img).adjustContrast(contrast).png();
    }

    static async pixelate(image: IllustratorImageSource, pixles: number = 5): Promise<Buffer> {
        if (!image) throw new Error("image source is required");
        if (typeof pixles !== "number" || pixles < 1 || pixles > 100) throw Error("Pixles should be a number from 1 to 100");

        const img = await ImageLoader.loadImage(image);
        const illustrator = new Illustrator(img.width, img.height);
        const layer = illustrator.layers.createLayer({ name: 'main' });
        const ctx = layer.context;

        const p = pixles / 100;

        ctx.drawImage(img, 0, 0, img.width * p, img.height * p);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, img.width * p, img.height * p, 0, 0, img.width + 5, img.height + 5);

        ctx.imageSmoothingEnabled = true;

        return await illustrator.export()
    }
}
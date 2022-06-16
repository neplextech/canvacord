import { ImageLoader, IllustratorImageSource, IllustratorImage } from 'illustrator.js';

export interface CanvacordCropOptions {
    from: number;
    to: number;
    width: number;
    height: number;
}

export class Filters extends null {
    private constructor() {}

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

    static async crop(image: IllustratorImageSource, options: CanvacordCropOptions): Promise<Buffer> {
        if (!image) throw new Error("image source is required");
        const img = await ImageLoader.loadImage(image, true);
        return new IllustratorImage(img).crop(options.from, options.to, options.width, options.height).png();
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
}
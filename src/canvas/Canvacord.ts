import GIFEncoder from "gifencoder";
import { Canvas, loadImage } from "canvas";
import * as Types from "../types/types";

class Canvacord {

    constructor() {
        throw new Error(`The class ${this.constructor.name} may not be instantiated!`);
    }

    /**
     * Creates new canvas instance
     * @param width Canvas width
     * @param height Canvas height
     */
    static MakeCanvas(width: number, height: number): Canvas {
        return new Canvas(width, height);
    }

    async triggered(image: Types.CanvacordImage): Promise<Buffer> {
        const img = await loadImage(image);
        const canvas = Canvacord.MakeCanvas(img.width, img.height);
        const ctx = canvas.getContext("2d");

        return canvas.toBuffer();
    }

}

export { Canvacord }
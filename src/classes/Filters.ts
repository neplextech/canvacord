import { Illustrator, Tools, loadImage, IllustratorImageSource } from 'illustrator.js';

export default class Filters {
    /**
     * **⚠ You may not instantiate Canvacord class! ⚠**
     * @hideconstructor
     */
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated!`);
    }

    static async invert(image: IllustratorImageSource, amount: number = 100): Promise<Buffer> {
        if (!image) throw new Error("Please provide a image");

        const loadedImage = await loadImage(image);
        const illustrator = new Illustrator(loadedImage.width, loadedImage.height);

        const imageTool = new Tools.ImageTool(illustrator.backgroundLayer);

        illustrator.backgroundLayer.unlock();

        imageTool.draw(loadedImage, 0, 0);
        imageTool.render();

        const filterTool = new Tools.FilterTool(illustrator.backgroundLayer);

        filterTool.invert(amount);
        filterTool.render();

        return await illustrator.export();
    }
}
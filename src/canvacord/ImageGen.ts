import { Illustrator, IllustratorImageSource, ImageLoader } from "illustrator.js";
import { AssetsManager } from "./AssetsManager";
import { buffer as streamToBuffer } from "stream/consumers";

export class ImageGen extends null {
    private constructor() {}

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
}
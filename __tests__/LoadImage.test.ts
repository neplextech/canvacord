import { Util, UtilityCanvas } from "../src/index";
import { Image as SkImage } from "@napi-rs/canvas";
import FileType from "file-type";

const canvasInstance = new UtilityCanvas();
const IMAGE_PATH = `${__dirname}/assets/img.jpg`;

describe("Load image", () => {
    test("it should be a buffer", () => {
        return Util.loadImage(IMAGE_PATH, false).then((img) => {
            expect(img).toBeInstanceOf(Buffer);
        });
    });

    test("it should be a skia image instance", () => {
        return Util.loadImage(IMAGE_PATH, true).then((img) => {
            expect(img).toBeInstanceOf(SkImage);
        });
    });

    test("it should load webp images", () => {
        canvasInstance.mimeType = "webp";
        return canvasInstance.invert(IMAGE_PATH).then(async (img) => {
            const image = await Util.loadImage(img, true);

            expect((await FileType.fromBuffer(image.src)).mime).toBe("image/webp");
        });
    });
});

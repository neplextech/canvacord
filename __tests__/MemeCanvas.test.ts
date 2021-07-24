import { MemeCanvas } from "../src/index";
import FileType from "file-type";

const canvasInstance = new MemeCanvas();
const IMAGE_PATH = `${__dirname}/assets/img.jpg`;

describe("Canvacord utility canvas", () => {
    test("it should be GIF", () => {
        return canvasInstance.trigger(IMAGE_PATH).then(async (res) => {
            expect((await FileType.fromBuffer(res)).mime).toStrictEqual("image/gif");
        });
    });

    test("it should be PNG", () => {
        return canvasInstance.facepalm(IMAGE_PATH).then(async (res) => {
            expect((await FileType.fromBuffer(res)).mime).toStrictEqual("image/png");
        });
    });

    test("it should be WEBP", () => {
        canvasInstance.mimeType = "webp";

        return canvasInstance.facepalm(IMAGE_PATH).then(async (res) => {
            expect((await FileType.fromBuffer(res)).mime).toStrictEqual("image/webp");
        });
    });

    test("it should be JPEG", () => {
        canvasInstance.mimeType = "jpeg";

        return canvasInstance.jail(IMAGE_PATH).then(async (res) => {
            expect((await FileType.fromBuffer(res)).mime).toStrictEqual("image/jpeg");
        });
    });
});

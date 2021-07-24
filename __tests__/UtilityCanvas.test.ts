import { UtilityCanvas } from "../src/index";
import FileType from "file-type";

const canvasInstance = new UtilityCanvas();
const IMAGE_PATH = `${__dirname}/assets/img.jpg`;

describe("Canvacord utility canvas", () => {
    test("it should be PNG", () => {
        return canvasInstance.color("#FF0000", 16, 16).then(async (res) => {
            expect((await FileType.fromBuffer(res)).mime).toStrictEqual("image/png");
        });
    });

    test("it should be JPEG", () => {
        canvasInstance.mimeType = "jpeg";

        return canvasInstance.colorfy(IMAGE_PATH, "#FF0000").then(async (res) => {
            expect((await FileType.fromBuffer(res)).mime).toStrictEqual("image/jpeg");
        });
    });

    test("it should be WEBP", () => {
        canvasInstance.mimeType = "webp";

        return canvasInstance.circle(IMAGE_PATH).then(async (res) => {
            expect((await FileType.fromBuffer(res)).mime).toStrictEqual("image/webp");
        });
    });
});

import { Photoshop } from '../src/index';
import FileType from "file-type";

const IMAGE_PATH = `${__dirname}/assets/img.jpg`;

describe('Canvacord Photoshop', () => {
    test('ImageMaker.color() should be PNG', () => {
        return Photoshop.color("#FF0000", 16, 16).then(async (res) => {
            expect((await (FileType.fromBuffer(res))).mime).toBe('image/png');
        });
    });

    test('ImageMaker.colorfy() should be PNG', () => {
        return Photoshop.colorfy(IMAGE_PATH, "#FF0000").then((res) => {
            expect(res).toBeInstanceOf(Buffer);
        });
    });

});

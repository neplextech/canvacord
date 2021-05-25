import { ImageMaker } from '../src/index';
import FileType from "file-type";

const IMAGE_PATH = `${__dirname}/assets/img.jpg`;

describe('Canvacord ImageMaker', () => {
    test('ImageMaker.triggered() should be GIF', () => {
        return ImageMaker.triggered(IMAGE_PATH).then(async (res) => {
            expect((await (FileType.fromBuffer(res))).mime).toBe('image/gif');
        });
    });

    test('ImageMaker.rainbow() should return buffer', () => {
        return ImageMaker.rainbow(IMAGE_PATH).then((res) => {
            expect(res).toBeInstanceOf(Buffer);
        });
    });

    test('ImageMaker.beautiful() should be png', () => {
        return ImageMaker.beautiful(IMAGE_PATH).then(async (res) => {
            expect((await (FileType.fromBuffer(res))).mime).toBe('image/png');
        });
    });
});

import { Photoshop } from '../src/index';
import FileType from 'file-type';

const IMAGE_PATH = `${__dirname}/assets/img.jpg`;
const GIF_IMAGE_PATH = `${__dirname}/assets/img.gif`;

describe('Canvacord Photoshop', () => {
    test('PhotoShop.color() should be PNG', () => {
        return Photoshop.color('#FF0000', 16, 16).then(async (res) => {
            expect((await FileType.fromBuffer(res)).mime).toStrictEqual('image/png');
        });
    });

    test('PhotoShop.colorfy() should be PNG', () => {
        return Photoshop.colorfy(IMAGE_PATH, '#FF0000').then((res) => {
            expect(res).toBeInstanceOf(Buffer);
        });
    });

    test('Photoshop.parseFrames() test gif should have 333x498 res and 52 frames', () => {
        return Photoshop.parseGIF(GIF_IMAGE_PATH).then((res) => {
            expect({ width: res.width, height: res.height, frames: res.frameCount }).toStrictEqual({ width: 333, height: 498, frames: 52 });
        });
    });
});

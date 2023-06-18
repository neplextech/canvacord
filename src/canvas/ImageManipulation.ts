import { createCanvas, loadImage as createImage } from '@napi-rs/canvas';
import { ImageSource, loadImage } from '../helpers';

const createCanvasImage = async (img: ImageSource) => {
  const canvacordImg = await loadImage(img);
  const nativeImage = await createImage(canvacordImg.data);

  return nativeImage;
};

class ImageManipulation {
  protected createCanvas(width: number, height: number) {
    return createCanvas(width, height).getContext('2d');
  }

  public invert(source: ImageSource, value = 100) {
    return this.filter(source, `invert(${value}%)`);
  }

  public grayscale(source: ImageSource, value = 100) {
    return this.filter(source, `grayscale(${value}%)`);
  }

  public sepia(source: ImageSource, value = 100) {
    return this.filter(source, `sepia(${value}%)`);
  }

  public opacity(source: ImageSource, value: number) {
    return this.filter(source, `opacity(${value}%)`);
  }

  public saturate(source: ImageSource, value: number) {
    return this.filter(source, `saturate(${value}%)`);
  }

  public hueRotate(source: ImageSource, value: number) {
    return this.filter(source, `hue-rotate(${value}deg)`);
  }

  public contrast(source: ImageSource, value: number) {
    return this.filter(source, `contrast(${value}%)`);
  }

  public brightness(source: ImageSource, value: number) {
    return this.filter(source, `brightness(${value}%)`);
  }

  public blur(source: ImageSource, value = 3) {
    return this.filter(source, `blur(${value}px)`);
  }

  public dropShadow(source: ImageSource, x: number, y: number, radius: number, color: string) {
    return this.filter(source, `drop-shadow(${[x, y, radius, color].join(' ')})`);
  }

  public async filter(source: ImageSource, filter: string = 'none') {
    const img = await createCanvasImage(source);
    const ctx = this.createCanvas(img.width, img.height);

    ctx.filter = filter;

    ctx.drawImage(img, 0, 0);

    return ctx.canvas.encode('png');
  }
}

const manipulator = new ImageManipulation();

export { manipulator as ImageManipulation };

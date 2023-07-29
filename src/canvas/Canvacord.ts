import { TemplateFactory } from '../assets/TemplateFactory';
import { ImageSource } from '../helpers';
import { ImageGen } from './ImageGen';
import { buffer } from 'stream/consumers';
import type { Readable } from 'stream';
import { ImageFilterer } from './ImageFilterer';
import { CanvasImage } from './CanvasImage';

export interface CanvacordFactory {
  /**
   * Creates a new ImageFilterer instance.
   * @param width The width of the image
   * @param height The height of the image
   */
  filters(width: number, height: number): ImageFilterer;

  /**
   * Generates "No this does not affect my baby" meme with the provided image.
   * @param image The image to use
   * @returns The generated image
   */
  affect(image: ImageSource): Promise<Buffer>;

  /**
   * Fuse two images together.
   * @param destination The destination image
   * @param source The source image
   * @returns The generated image
   */
  fuse(destination: ImageSource, source: ImageSource): Promise<Buffer>;

  /**
   * Kisses the provided image.
   * @param image The image to use
   * @param image2 The image to use
   * @returns The generated image
   */
  kiss(image: ImageSource, image2: ImageSource): Promise<Buffer>;

  /**
   * Spanks the provided image.
   * @param image The image to use
   * @param image2 The image to use
   * @returns The generated image
   */
  spank(image: ImageSource, image2: ImageSource): Promise<Buffer>;

  /**
   * Slaps the provided image.
   * @param image The image to use
   * @param image2 The image to use
   * @returns The generated image
   */
  slap(image: ImageSource, image2: ImageSource): Promise<Buffer>;

  /**
   * Oh this? This is beautiful.
   * @param image The image to use
   * @returns The generated image
   */
  beautiful(image: ImageSource): Promise<Buffer>;

  /**
   * Rainbow.
   * @param image The image to use
   * @returns The generated image
   */
  rainbow(image: ImageSource): Promise<Buffer>;

  /**
   * Facepalm.
   * @param image The image to use
   * @returns The generated image
   */
  facepalm(image: ImageSource): Promise<Buffer>;

  /**
   * RIP!
   * @param image The image to use
   */
  rip(image: ImageSource): Promise<Buffer>;

  /**
   * A trash.
   * @param image The image to use
   * @returns The generated image
   */
  trash(image: ImageSource): Promise<Buffer>;

  /**
   * Worse than hitler.
   * @param image The image to use
   * @returns The generated image
   */
  hitler(image: ImageSource): Promise<Buffer>;

  /**
   * Generates Triggered gif with the provided image.
   * @param image The image to use
   * @param [asBuffer] Whether to return a buffer instead of a stream
   * @returns The generated gif
   */
  triggered(image: ImageSource): Promise<Readable>;
  /**
   * Generates Triggered gif with the provided image.
   * @param image The image to use
   * @param [asBuffer] Whether to return a buffer instead of a stream
   * @returns The generated gif
   */
  triggered(image: ImageSource, asBuffer: false): Promise<Readable>;
  /**
   * Generates Triggered gif with the provided image.
   * @param image The image to use
   * @param [asBuffer] Whether to return a buffer instead of a stream
   * @returns The generated gif
   */
  triggered(image: ImageSource, asBuffer: true): Promise<Buffer>;
  /**
   * Generates Triggered gif with the provided image.
   * @param image The image to use
   * @param [asBuffer] Whether to return a buffer instead of a stream
   * @returns The generated gif
   */
  triggered(image: ImageSource, asBuffer?: boolean): Promise<Readable | Buffer>;
}

const factory = {
  filters(width: number, height: number) {
    return new ImageFilterer(width, height);
  },
  async triggered(image: ImageSource, asBuffer?: boolean): Promise<Readable | Buffer> {
    const generator = new ImageGen(TemplateFactory.Triggered(image));
    const img = await generator.generateGif();

    if (!asBuffer) return img;
    return buffer(img);
  }
} as CanvacordFactory;

// TODO: Add more methods
const simpleImageGeneratorMethods = [
  'affect',
  'fuse',
  'kiss',
  'spank',
  'slap',
  'beautiful',
  'facepalm',
  'rainbow',
  'rip',
  'trash',
  'hitler'
] as Readonly<Array<Exclude<keyof CanvacordFactory, 'triggered' | 'filters'>>>;

const capitalize = <S extends string>(str: S) => (str[0].toUpperCase() + str.slice(1)) as Capitalize<S>;

for (const method of simpleImageGeneratorMethods) {
  factory[method] = async function (...args: Parameters<CanvacordFactory[typeof method]>) {
    // @ts-expect-error
    const template = TemplateFactory[capitalize(method)](...args);
    const generator = new ImageGen(template);

    await generator.render();

    return generator.encode();
  };
}

export interface CanvacordInit {
  /**
   * The width of the image. Defaults to `-1` (auto).
   */
  width?: number;

  /**
   * The height of the image. Defaults to `-1` (auto).
   */
  height?: number;
}

/**
 * Creates a new Canvacord image processor.
 * @param source The image source to use
 * @param options The options to use
 * @returns The image processor
 */
function CanvacordConstructor(source: ImageSource, options?: CanvacordInit) {
  options ??= {};

  const img = new CanvasImage(source, options?.width ?? -1, options?.height ?? -1);
  img.draw();

  return img;
}

Object.assign(CanvacordConstructor, factory);

export type Canvacord = CanvacordFactory & typeof CanvacordConstructor;

export const canvacord = CanvacordConstructor as Canvacord;

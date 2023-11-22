import { ImageSource } from '../helpers';
import { ImageGen, ImageGenerationTemplate } from './ImageGen';
import { buffer } from 'stream/consumers';
import type { Readable } from 'stream';
import { ImageFilterer } from './ImageFilterer';
import { CanvasImage } from './CanvasImage';
import { TemplateFactory } from '../assets/TemplateFactory';

export type ImageGeneratorImplementor = {
  [K in Lowercase<Exclude<keyof typeof TemplateFactory, 'Triggered'>>]: (
    // @ts-expect-error
    ...args: Parameters<(typeof TemplateFactory)[Capitalize<K>]>
  ) => Promise<Buffer>;
};

export interface CanvacordFactory extends ImageGeneratorImplementor {
  /**
   * Creates a new ImageFilterer instance.
   * @param width The width of the image
   * @param height The height of the image
   */
  filters(width: number, height: number): ImageFilterer;

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

const capitalize = <S extends string>(str: S) => (str[0].toUpperCase() + str.slice(1)) as Capitalize<S>;

for (const key in TemplateFactory) {
  const method = key.toLowerCase() as Lowercase<keyof typeof TemplateFactory>;
  if (method === 'triggered') continue;

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

/**
 * Creates a new Canvacord image processor.
 * @param source The image source to use
 * @param options The options to use
 * @returns The image processor
 */
export const canvacord = CanvacordConstructor as Canvacord;

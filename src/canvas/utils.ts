import { ImageSource, loadImage } from '../helpers';
import { loadImage as createImage, SKRSContext2D } from '@napi-rs/canvas';

/**
 * Creates a canvas image from the image source.
 * @param img The image source
 * @returns The canvas image
 * @example ```typescript
 * const image = await createCanvasImage('https://example.com/image.png');
 * ```
 */
export const createCanvasImage = async (img: ImageSource) => {
  const canvacordImg = await loadImage(img);
  const nativeImage = await createImage(canvacordImg.data);

  return nativeImage;
};

/**
 * The steps to apply to the canvas.
 * @param ctx The canvas context
 */
export type ContextManipulationStep = (ctx: SKRSContext2D) => Awaited<void>;

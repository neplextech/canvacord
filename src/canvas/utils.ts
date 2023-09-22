import { ImageSource, loadImage } from '../helpers';
import { loadImage as createImage, SKRSContext2D } from '@napi-rs/canvas';

export const createCanvasImage = async (img: ImageSource) => {
  const canvacordImg = await loadImage(img);
  const nativeImage = await createImage(canvacordImg.data);

  return nativeImage;
};

export type ContextManipulationStep = (ctx: SKRSContext2D) => Awaited<void>;

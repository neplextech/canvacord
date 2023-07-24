import { Canvas, SKRSContext2D } from '@napi-rs/canvas';
import { ImageSource } from '../helpers';
import { CanvasHelper } from './CanvasHelper';
import { CanvasImage } from './CanvasImage';
import { createCanvasImage } from './utils';

export class ImageFilterer extends CanvasHelper {
  #filters = [] as string[];

  public invert(value: number) {
    if (typeof value !== 'number') throw new TypeError(`Expected "value" to be a number, received ${typeof value}`);
    this.#filters.push(`invert(${value}%)`);
    return this;
  }

  public grayscale(value = 100) {
    this.#filters.push(`grayscale(${value}%)`);
    return this;
  }

  public sepia(value: number) {
    if (typeof value !== 'number') throw new TypeError(`Expected "value" to be a number, received ${typeof value}`);
    this.#filters.push(`sepia(${value}%)`);
    return this;
  }

  public opacity(value: number) {
    if (typeof value !== 'number') throw new TypeError(`Expected "value" to be a number, received ${typeof value}`);
    this.#filters.push(`opacity(${value}%)`);
    return this;
  }

  public saturate(value: number) {
    if (typeof value !== 'number') throw new TypeError(`Expected "value" to be a number, received ${typeof value}`);
    this.#filters.push(`saturate(${value}%)`);
    return this;
  }

  public hueRotate(value: number) {
    if (typeof value !== 'number') throw new TypeError(`Expected "value" to be a number, received ${typeof value}`);
    this.#filters.push(`hue-rotate(${value}deg)`);
    return this;
  }

  public contrast(value: number) {
    if (typeof value !== 'number') throw new TypeError(`Expected "value" to be a number, received ${typeof value}`);
    this.#filters.push(`contrast(${value}%)`);
    return this;
  }

  public brightness(value: number) {
    if (typeof value !== 'number') throw new TypeError(`Expected "value" to be a number, received ${typeof value}`);
    this.#filters.push(`brightness(${value}%)`);
    return this;
  }

  public blur(value: number) {
    if (typeof value !== 'number') throw new TypeError(`Expected "value" to be a number, received ${typeof value}`);
    this.#filters.push(`blur(${value}px)`);
    return this;
  }

  public dropShadow(config: DropShadowConfig) {
    const { x, y, radius, color } = config;

    this.#filters.push(`drop-shadow(${[x, y, `${radius}px`, color].join(' ')})`);
    return this;
  }

  public async process(canvas: Canvas, ctx: SKRSContext2D) {
    ctx.filter = this.#filters.join(' ') || 'none';
  }
}

export interface DropShadowConfig {
  x: number;
  y: number;
  radius: number;
  color: string;
}

export const filterer = async (source: ImageSource) => {
  const img = await createCanvasImage(source);

  return new CanvasImage(img, img.width, img.height);
};

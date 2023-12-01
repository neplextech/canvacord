import { Canvas, Image, SKRSContext2D } from "@napi-rs/canvas";
import { ImageSource } from "../helpers";
import { CanvasHelper } from "./CanvasHelper";
import { createCanvasImage } from "./utils";

export class ImageFilterer extends CanvasHelper {
  #filters = [] as string[];

  /**
   * Draws the image to the canvas.
   * @param image The image to draw
   * @param x The x position to draw the image
   * @param y The y position to draw the image
   * @param [width] The width of the image
   * @param [height] The height of the image
   */
  public drawImage(image: ImageSource, x = 0, y = 0, width = this.width, height = this.height) {
    this.steps.push(async (ctx) => {
      const img = await createCanvasImage(image);
      ctx.drawImage(img, x, y, width, height);
    });

    return this;
  }

  /**
   * Applies invert filter to the image.
   * @param value The filter intensity
   */
  public invert(value: number) {
    if (typeof value !== "number") throw new TypeError(`Expected "value" to be a number, received ${typeof value}`);
    this.#filters.push(`invert(${value}%)`);
    return this;
  }

  /**
   * Applies grayscale filter to the image.
   * @param value The filter intensity
   */
  public grayscale(value = 100) {
    this.#filters.push(`grayscale(${value}%)`);
    return this;
  }

  /**
   * Applies sepia filter to the image.
   * @param value The filter intensity
   */
  public sepia(value: number) {
    if (typeof value !== "number") throw new TypeError(`Expected "value" to be a number, received ${typeof value}`);
    this.#filters.push(`sepia(${value}%)`);
    return this;
  }

  /**
   * Applies opacity filter to the image.
   * @param value The filter intensity
   */
  public opacity(value: number) {
    if (typeof value !== "number") throw new TypeError(`Expected "value" to be a number, received ${typeof value}`);
    this.#filters.push(`opacity(${value}%)`);
    return this;
  }

  /**
   * Applies saturate filter to the image.
   * @param value The filter intensity
   */
  public saturate(value: number) {
    if (typeof value !== "number") throw new TypeError(`Expected "value" to be a number, received ${typeof value}`);
    this.#filters.push(`saturate(${value}%)`);
    return this;
  }

  /**
   * Applies hue-rotate filter to the image.
   * @param value The degrees to rotate
   */
  public hueRotate(value: number) {
    if (typeof value !== "number") throw new TypeError(`Expected "value" to be a number, received ${typeof value}`);
    this.#filters.push(`hue-rotate(${value}deg)`);
    return this;
  }

  /**
   * Applies contrast filter to the image.
   * @param value The filter intensity
   */
  public contrast(value: number) {
    if (typeof value !== "number") throw new TypeError(`Expected "value" to be a number, received ${typeof value}`);
    this.#filters.push(`contrast(${value}%)`);
    return this;
  }

  /**
   * Applies brightness filter to the image.
   * @param value The filter intensity
   */
  public brightness(value: number) {
    if (typeof value !== "number") throw new TypeError(`Expected "value" to be a number, received ${typeof value}`);
    this.#filters.push(`brightness(${value}%)`);
    return this;
  }

  /**
   * Applies blur filter to the image.
   * @param value The filter intensity
   */
  public blur(value: number) {
    if (typeof value !== "number") throw new TypeError(`Expected "value" to be a number, received ${typeof value}`);
    this.#filters.push(`blur(${value}px)`);
    return this;
  }

  /**
   * Applies drop-shadow filter to the image.
   * @param config The drop-shadow config
   * @param config.x The x offset of the shadow
   * @param config.y The y offset of the shadow
   * @param config.radius The blur radius of the shadow
   * @param config.color The color of the shadow
   */
  public dropShadow(config: DropShadowConfig) {
    const { x, y, radius, color } = config;

    this.#filters.push(`drop-shadow(${[x, y, `${radius}px`, color].join(" ")})`);
    return this;
  }

  /**
   * Renders the applied filters to the canvas.
   * @param canvas The canvas to render the filters to
   * @param ctx The canvas context
   */
  public async process(canvas: Canvas, ctx: SKRSContext2D) {
    if (this.#filters.length) ctx.filter = this.#filters.join(" ");

    while (this.steps.length > 0) {
      await this.steps.shift()!(ctx);
    }
  }
}

export interface DropShadowConfig {
  x: number;
  y: number;
  radius: number;
  color: string;
}

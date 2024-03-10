import { Canvas, Image, SKRSContext2D } from "@napi-rs/canvas";
import { ImageSource } from "../helpers";
import { ImageFilterer } from "./ImageFilterer";
import { createCanvasImage } from "./utils";

export class CanvasImage extends ImageFilterer {
  #img: Image | null = null;

  /**
   * Creates a new CanvasImage instance.
   * @param source The image source
   * @param [width] The width of the image
   * @param [height] The height of the image
   */
  public constructor(
    public source: ImageSource,
    width = -1,
    height = -1,
  ) {
    super(width, height);
    if (source instanceof Image) this.#setImg(source);
  }

  #setImg(src: Image) {
    this.#img = src;
    if (this.width === -1) this.width = src.width;
    if (this.height === -1) this.height = src.height;
    return this.#img;
  }

  /**
   * Draws the image to the canvas.
   * @param x The x position to draw the image
   * @param y The y position to draw the image
   * @param [width] The width of the image
   * @param [height] The height of the image
   */
  public draw(x = 0, y = 0, width?: number, height?: number) {
    this.steps.push(async (ctx) => {
      const img = this.#img || this.#setImg(await createCanvasImage(this.source));

      // biome-ignore lint: reassignment
      width ??= this.width;
      // biome-ignore lint: reassignment
      height ??= this.height;

      ctx.drawImage(img, x, y, width, height);
    });

    return this;
  }

  /**
   * Draws the image to the canvas with a circle clip.
   * @param [width] The width of the image
   * @param [height] The height of the image
   */
  public circle(width?: number, height?: number) {
    this.steps.push((ctx) => {
      // biome-ignore lint: reassignment
      width ??= ctx.canvas.width;
      // biome-ignore lint: reassignment
      height ??= ctx.canvas.height;

      ctx.globalCompositeOperation = "destination-in";
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, width / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    });

    return this;
  }

  /**
   * Draws pixelated image to the canvas.
   * @param [pixels=5] The amount of pixels to use
   */
  public pixelate(pixels = 5) {
    this.steps.push((ctx) => {
      const pixel = pixels / 100;
      const { canvas } = ctx;

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(
        canvas,
        0,
        0,
        canvas.width * pixel,
        canvas.height * pixel,
        0,
        0,
        canvas.width + 5,
        canvas.height + 5,
      );
    });

    return this;
  }

  /**
   * Saves the canvas context state.
   */
  public save() {
    this.steps.push((ctx) => {
      ctx.save();
    });

    return this;
  }

  /**
   * Restores the last saved canvas context state.
   */
  public restore() {
    this.steps.push((ctx) => {
      ctx.restore();
    });

    return this;
  }

  /**
   * Returns the canvas instance by applying the steps.
   */
  public async getFinalCanvas(): Promise<Canvas> {
    if (this.width === -1 || this.height === -1) {
      if (!this.#img) this.#setImg(await createCanvasImage(this.source));
    }

    return super.getFinalCanvas();
  }
}

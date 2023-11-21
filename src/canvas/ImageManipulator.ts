import { Canvas, SKRSContext2D } from '@napi-rs/canvas';
import { CanvasImage } from './CanvasImage';
import { ContextManipulationStep } from './utils';

export class ImageManipulator extends CanvasImage {
  #steps: ContextManipulationStep[] = [];

  /**
   * Rotates the canvas.
   */
  public rotate(degrees: number) {
    this.#steps.push((ctx) => {
      ctx.rotate(degrees);
    });

    return this;
  }

  /**
   * Flips the canvas.
   * @param axis The axis to flip, `x` or `y`.
   */
  public flip(axis: 'x' | 'y') {
    this.#steps.push((ctx) => {
      switch (axis) {
        case 'x':
          ctx.scale(-1, 1);
          break;
        case 'y':
          ctx.scale(1, -1);
          break;
      }
    });
  }

  /**
   * Scales the canvas.
   * @param x The x scale
   * @param y The y scale
   */
  public scale(x: number, y: number) {
    this.#steps.push((ctx) => {
      ctx.scale(x, y);
    });
  }

  /**
   * Translates the canvas.
   * @param x The x position to translate
   * @param y The y position to translate
   */
  public translate(x: number, y: number) {
    this.#steps.push((ctx) => {
      ctx.translate(x, y);
    });
  }

  /**
   * Erases a part of the canvas.
   * @param x The x position to erase
   * @param y The y position to erase
   * @param width The width of the area to erase
   * @param height The height of the area to erase
   */
  public erase(x: number, y: number, width: number, height: number) {
    this.#steps.push((ctx) => {
      ctx.clearRect(x, y, width, height);
    });
  }

  /**
   * Applies a transform to the canvas.
   */
  public transform(a: number, b: number, c: number, d: number, e: number, f: number) {
    this.#steps.push((ctx) => {
      ctx.transform(a, b, c, d, e, f);
    });
  }

  /**
   * Resets the transform of the canvas.
   */
  public resetTransform() {
    this.#steps.push((ctx) => {
      ctx.resetTransform();
    });
  }

  /**
   * Applies a circular clip to the image.
   * @param width The width of the image
   * @param height The height of the image
   */
  public circularize(width: number, height: number) {
    // TODO: Implement this
  }

  /**
   * Processes the steps and applies them to the canvas.
   * @param canvas The canvas to apply the steps to
   * @param ctx The canvas context to apply the steps to
   */
  public async process(canvas: Canvas, ctx: SKRSContext2D) {
    for (const step of this.#steps) {
      await step(ctx);
    }
  }
}

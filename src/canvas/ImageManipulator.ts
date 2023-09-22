import { Canvas, SKRSContext2D } from '@napi-rs/canvas';
import { CanvasImage } from './CanvasImage';
import { ContextManipulationStep } from './utils';

export class ImageManipulator extends CanvasImage {
  #steps: ContextManipulationStep[] = [];

  public rotate(degrees: number) {
    this.#steps.push((ctx) => {
      ctx.rotate(degrees);
    });

    return this;
  }

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

  public scale(x: number, y: number) {
    this.#steps.push((ctx) => {
      ctx.scale(x, y);
    });
  }

  public translate(x: number, y: number) {
    this.#steps.push((ctx) => {
      ctx.translate(x, y);
    });
  }

  public erase(x: number, y: number, width: number, height: number) {
    this.#steps.push((ctx) => {
      ctx.clearRect(x, y, width, height);
    });
  }

  public transform(a: number, b: number, c: number, d: number, e: number, f: number) {
    this.#steps.push((ctx) => {
      ctx.transform(a, b, c, d, e, f);
    });
  }

  public resetTransform() {
    this.#steps.push((ctx) => {
      ctx.resetTransform();
    });
  }

  public circularize(width: number, height: number) {}

  public async process(canvas: Canvas, ctx: SKRSContext2D) {
    for (const step of this.#steps) {
      await step(ctx);
    }
  }
}

import { Canvas, Image, SKRSContext2D } from '@napi-rs/canvas';
import { ImageSource } from '../helpers';
import { ImageFilterer } from './ImageFilterer';
import { ContextManipulationStep, createCanvasImage } from './utils';

export class CanvasImage extends ImageFilterer {
  #img: Image | null = null;

  public constructor(public source: ImageSource, width: number, height: number) {
    super(width, height);
    if (source instanceof Image) this.#img = source;
  }

  public draw(x = this.width, y = this.height) {
    this.steps.push(async (ctx) => {
      const img = this.#img || (this.#img = await createCanvasImage(this.source));

      ctx.drawImage(img, x, y);
    });
  }

  public drawImage(img: Image, x = this.width, y = this.height) {
    this.steps.push((ctx) => {
      ctx.drawImage(img, x, y);
    });
  }

  public circle() {
    this.steps.push((ctx) => {
      ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, ctx.canvas.width / 2, 0, Math.PI * 2);
      ctx.clip();
    });
  }

  public save() {
    this.steps.push((ctx) => {
      ctx.save();
    });
  }

  public restore() {
    this.steps.push((ctx) => {
      ctx.restore();
    });
  }

  async process(canvas: Canvas, ctx: SKRSContext2D) {
    for (const step of this.steps) {
      await step(ctx);
    }
  }
}

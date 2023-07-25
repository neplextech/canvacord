import { Canvas, createCanvas, SKRSContext2D } from '@napi-rs/canvas';
import { ImageSource } from '../helpers';
import { createCanvasImage } from './utils';
import { GifEncoder, EncoderOptions } from '@skyra/gifenc';
import { Encodable } from './Encodable';
import { TemplateImage } from '../assets';

export interface ImageGenerationStep {
  image?: ImgenStep[];
  text?: TextGenerationStep[];
  process?: (canvas: Canvas, ctx: SKRSContext2D) => Awaited<void>;
}

export interface ImgenStep {
  source: TemplateImage;
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export interface TextGenerationStep {
  value: string;
  font: string;
  color: string;
  stroke?: boolean;
  x: number;
  y: number;
  maxWidth?: number;
  lineHeight?: number;
  lineWidth?: number;
  align?: 'left' | 'center' | 'right';
  baseline?: 'top' | 'middle' | 'bottom';
  direction?: 'inherit' | 'ltr' | 'rtl';
}

export interface ImageGenerationTemplate {
  width?: number;
  height?: number;
  steps: ImageGenerationStep[];
  gif?: EncoderOptions;
}

export class ImageGen extends Encodable {
  private _canvas!: Canvas;
  public constructor(public template: ImageGenerationTemplate) {
    super();
  }

  public addStep(step: ImageGenerationStep) {
    this.template.steps.push(step);
    return this;
  }

  public addSteps(steps: ImageGenerationStep[]) {
    this.template.steps.push(...steps);
    return this;
  }

  public setGifOptions(options?: EncoderOptions) {
    this.template.gif = options;
    return this;
  }

  public isGif() {
    return this.template.gif != null;
  }

  async #inferSize() {
    const { width, height } = this.template;

    if ([width, height].some((r) => r != null)) return { width: (width ?? height)!, height: (height ?? width)! };

    if (!this.template.steps.length) throw new Error('Cannot infer size from empty template');
    const firstImg = this.template.steps[0].image?.[0];
    if (!firstImg) throw new Error('Cannot infer size from non-image template');

    const img = await firstImg.source.resolve();

    return { width: img.width, height: img.height };
  }

  public async generateGif() {
    if (this.template.gif == null) throw new Error('Cannot generate gif on non-gif template');
    const options = this.template.gif;

    const { width, height } = await this.#inferSize();

    const encoder = new GifEncoder(width, height);

    if (options.repeat != null) encoder.setRepeat(options.repeat);
    if (options.delay != null) encoder.setDelay(options.delay);
    if (options.quality != null) encoder.setQuality(options.quality);
    if (options.dispose != null) encoder.setDispose(options.dispose);
    if (options.framerate != null) encoder.setFramerate(options.framerate);
    if (options.transparent != null) encoder.setTransparent(options.transparent);

    const canvas = (this._canvas = createCanvas(width, height));
    const ctx = canvas.getContext('2d');

    const stream = encoder.createReadStream();

    encoder.start();

    for (const step of this.template.steps) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      await this.#applyGeneration(canvas, ctx, step);
      encoder.addFrame(ctx);
    }

    encoder.finish();

    return stream;
  }

  public async render() {
    const { width, height } = await this.#inferSize();

    const canvas = (this._canvas = createCanvas(width, height));
    const ctx = canvas.getContext('2d');

    for (const step of this.template.steps) {
      await this.#applyGeneration(canvas, ctx, step);
    }

    return this;
  }

  public getFinalCanvas(): Promise<Canvas> {
    if (!this._canvas) throw new Error('render() or generateGif() must be called before accessing the final canvas');
    return Promise.resolve(this._canvas);
  }

  async #applyGeneration(canvas: Canvas, ctx: SKRSContext2D, step: ImageGenerationStep) {
    if (step.image) {
      for (const img of step.image) {
        const image = await img.source.resolve();
        if (!img.width || !img.height) {
          ctx.drawImage(image, img.x, img.y);
        } else {
          ctx.drawImage(image, img.x, img.y, img.width, img.height);
        }
      }
    }

    if (step.text) {
      for (const text of step.text) {
        if (text.font != null) ctx.font = text.font;
        if (text.color != null) ctx[text.stroke ? 'strokeStyle' : 'fillStyle'] = text.color;
        if (text.align != null) ctx.textAlign = text.align;
        if (text.baseline != null) ctx.textBaseline = text.baseline;
        if (text.direction != null) ctx.direction = text.direction;
        if (text.lineWidth != null) ctx.lineWidth = text.lineWidth;

        ctx[text.stroke ? 'strokeText' : 'fillText'](text.value, text.x, text.y, text.maxWidth);
      }
    }

    if (step.process) {
      await step.process(canvas, ctx);
    }
  }
}

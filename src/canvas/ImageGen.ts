import { Canvas, createCanvas, Image, SKRSContext2D } from '@napi-rs/canvas';
import { GifEncoder, EncoderOptions } from '@skyra/gifenc';
import { Encodable } from './Encodable';
import { TemplateImage } from '../assets/TemplateFactory';

export interface ImageGenerationStep {
  image?: ImgenStep[];
  text?: TextGenerationStep[];
  custom?: CustomGenerationStep[];
  preprocess?: (canvas: Canvas, ctx: SKRSContext2D, step: ImageGenerationStep) => Awaited<void>;
  process?: (canvas: Canvas, ctx: SKRSContext2D, step: ImageGenerationStep) => Awaited<void>;
  postprocess?: (canvas: Canvas, ctx: SKRSContext2D, step: ImageGenerationStep) => Awaited<void>;
}

export interface CustomGenerationStep {
  process: (canvas: Canvas, ctx: SKRSContext2D, step: ImageGenerationStep) => Awaited<void>;
}

export interface ImgenStep {
  source: TemplateImage;
  x: number;
  y: number;
  width?: number;
  height?: number;
  preprocess?: (canvas: Canvas, ctx: SKRSContext2D, source: ImgenStep) => Awaited<void>;
  process?: (canvas: Canvas, ctx: SKRSContext2D, source: ImgenStep) => Awaited<void>;
  postprocess?: (canvas: Canvas, ctx: SKRSContext2D, source: ImgenStep) => Awaited<void>;
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
  preprocess?: (canvas: Canvas, ctx: SKRSContext2D, text: TextGenerationStep) => Awaited<void>;
  process?: (canvas: Canvas, ctx: SKRSContext2D, text: TextGenerationStep) => Awaited<void>;
  postprocess?: (canvas: Canvas, ctx: SKRSContext2D, text: TextGenerationStep) => Awaited<void>;
}

export interface IImageGenerationTemplate {
  width?: number;
  height?: number;
  steps: ImageGenerationStep[];
  gif?: EncoderOptions;
}

export class ImageGenerationTemplate implements IImageGenerationTemplate {
  public steps: ImageGenerationStep[] = [];
  public gif?: EncoderOptions;

  public static from(template: IImageGenerationTemplate) {
    return new ImageGenerationTemplate(template.width, template.height)
      .setSteps(template.steps)
      .setGifOptions(template.gif);
  }

  public constructor(public readonly width?: number, public readonly height?: number) {}

  public setSteps(steps: ImageGenerationStep[]) {
    this.steps = steps;
    return this;
  }

  public setGifOptions(options?: EncoderOptions) {
    this.gif = options;
    return this;
  }

  public isGif() {
    return this.gif != null;
  }

  public addStep(step: ImageGenerationStep) {
    this.steps.push(step);
    return this;
  }

  public addSteps(steps: ImageGenerationStep[]) {
    this.steps.push(...steps);
    return this;
  }

  public clearSteps() {
    this.steps = [];
    return this;
  }

  public isInferrable() {
    return [this.width, this.height].some((r) => r != null);
  }

  public getWidth() {
    return this.width ?? this.height;
  }

  public getHeight() {
    return this.height ?? this.width;
  }

  public toJSON(): IImageGenerationTemplate {
    return {
      width: this.width,
      height: this.height,
      steps: this.steps,
      gif: this.gif
    };
  }
}

export class ImageGen extends Encodable {
  private _canvas!: Canvas;
  public constructor(public template: ImageGenerationTemplate) {
    super();
  }

  public addStep(step: ImageGenerationStep) {
    this.template.addStep(step);
    return this;
  }

  public addSteps(steps: ImageGenerationStep[]) {
    this.template.addSteps(steps);
    return this;
  }

  public setGifOptions(options?: EncoderOptions) {
    this.template.setGifOptions(options);
    return this;
  }

  public isGif() {
    return this.template.isGif();
  }

  async #inferSize() {
    if (this.template.isInferrable()) return { width: this.template.getWidth()!, height: this.template.getHeight()! };

    if (!this.template.steps.length) throw new Error('Cannot infer size from empty template');
    const firstImg = this.template.steps.find((s) => s.image?.length)?.image?.[0];
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
    if (step.preprocess) {
      await step.preprocess(canvas, ctx, step);
    }

    if (step.process) {
      await step.process(canvas, ctx, step);
    } else {
      if (step.custom) {
        for (const custom of step.custom) {
          await custom.process(canvas, ctx, step);
        }
      }

      if (step.image) {
        for (const img of step.image) {
          if (img.preprocess) {
            await img.preprocess(canvas, ctx, img);
          }

          if (img.process) {
            await img.process(canvas, ctx, img);
          } else {
            const image = await img.source.resolve();

            if (!img.width || !img.height) {
              ctx.drawImage(image, img.x, img.y, canvas.width, canvas.height);
            } else {
              ctx.drawImage(image, img.x, img.y, img.width, img.height);
            }
          }

          if (img.postprocess) {
            await img.postprocess(canvas, ctx, img);
          }
        }
      }

      if (step.text) {
        for (const text of step.text) {
          if (text.preprocess) {
            await text.preprocess(canvas, ctx, text);
          }

          if (text.process) {
            await text.process(canvas, ctx, text);
          } else {
            if (text.font != null) ctx.font = text.font;
            if (text.color != null) ctx[text.stroke ? 'strokeStyle' : 'fillStyle'] = text.color;
            if (text.align != null) ctx.textAlign = text.align;
            if (text.baseline != null) ctx.textBaseline = text.baseline;
            if (text.direction != null) ctx.direction = text.direction;
            if (text.lineWidth != null) ctx.lineWidth = text.lineWidth;

            ctx[text.stroke ? 'strokeText' : 'fillText'](text.value, text.x, text.y, text.maxWidth);
          }

          if (text.postprocess) {
            await text.postprocess(canvas, ctx, text);
          }
        }
      }
    }

    if (step.postprocess) {
      await step.postprocess(canvas, ctx, step);
    }
  }
}

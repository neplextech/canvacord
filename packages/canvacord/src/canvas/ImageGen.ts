import { Canvas, createCanvas, SKRSContext2D } from "@napi-rs/canvas";
import { GifEncoder, EncoderOptions } from "@skyra/gifenc";
import { Encodable } from "./Encodable";
import { TemplateImage } from "../assets/TemplateFactory";

export interface ImageGenerationStep {
  /**
   * The image to render.
   */
  image?: ImgenStep[];
  /**
   * The text to render.
   */
  text?: TextGenerationStep[];
  /**
   * The custom steps to apply to the canvas.
   */
  custom?: CustomGenerationStep[];
  /**
   * The function to call before processing this step.
   */
  preprocess?: (canvas: Canvas, ctx: SKRSContext2D, step: ImageGenerationStep) => Awaited<void>;
  /**
   * The function to call when processing this step.
   */
  process?: (canvas: Canvas, ctx: SKRSContext2D, step: ImageGenerationStep) => Awaited<void>;
  /**
   * The function to call after processing has finished.
   */
  postprocess?: (canvas: Canvas, ctx: SKRSContext2D, step: ImageGenerationStep) => Awaited<void>;
}

export interface CustomGenerationStep {
  /**
   * The function to call when processing this step.
   */
  process: (canvas: Canvas, ctx: SKRSContext2D, step: ImageGenerationStep) => Awaited<void>;
}

export interface ImgenStep {
  /**
   * The image to render.
   */
  source: TemplateImage;
  /**
   * The x position of the image.
   */
  x: number;
  /**
   * The y position of the image.
   */
  y: number;
  /**
   * The width of the image.
   */
  width?: number;
  /**
   * The height of the image.
   */
  height?: number;
  /**
   * The function to call before processing this step.
   */
  preprocess?: (canvas: Canvas, ctx: SKRSContext2D, source: ImgenStep) => Awaited<void>;
  /**
   * The function to call when processing this step.
   */
  process?: (canvas: Canvas, ctx: SKRSContext2D, source: ImgenStep) => Awaited<void>;
  /**
   * The function to call after processing has finished.
   */
  postprocess?: (canvas: Canvas, ctx: SKRSContext2D, source: ImgenStep) => Awaited<void>;
}

export interface TextGenerationStep {
  /**
   * The text to render.
   */
  value: string;
  /**
   * The font of the text.
   */
  font: string;
  /**
   * The color of the text.
   */
  color: string;
  /**
   * Whether to stroke the text.
   */
  stroke?: boolean;
  /**
   * The x position of the text.
   */
  x: number;
  /**
   * The y position of the text.
   */
  y: number;
  /**
   * The maximum width of the text.
   */
  maxWidth?: number;
  /**
   * The line height of the text.
   */
  lineHeight?: number;
  /**
   * The line width of the text.
   */
  lineWidth?: number;
  /**
   * The alignment of the text.
   */
  align?: "left" | "center" | "right";
  /**
   * The baseline of the text.
   */
  baseline?: "top" | "middle" | "bottom";
  /**
   * The directionality of the text.
   */
  direction?: "inherit" | "ltr" | "rtl";
  /**
   * The function to call before processing this step.
   */
  preprocess?: (canvas: Canvas, ctx: SKRSContext2D, text: TextGenerationStep) => Awaited<void>;
  /**
   * The function to call when processing this step.
   */
  process?: (canvas: Canvas, ctx: SKRSContext2D, text: TextGenerationStep) => Awaited<void>;
  /**
   * The function to call after processing has finished.
   */
  postprocess?: (canvas: Canvas, ctx: SKRSContext2D, text: TextGenerationStep) => Awaited<void>;
}

/**
 * The template to use for image generation.
 */
export interface IImageGenerationTemplate {
  /**
   * The width of the template.
   */
  width?: number;
  /**
   * The height of the template.
   */
  height?: number;
  /**
   * The steps to apply to the canvas.
   */
  steps: ImageGenerationStep[];
  /**
   * The gif options.
   */
  gif?: EncoderOptions;
}

export class ImageGenerationTemplate implements IImageGenerationTemplate {
  /**
   * The steps to apply to the canvas.
   */
  public steps: ImageGenerationStep[] = [];
  /**
   * The gif options.
   */
  public gif?: EncoderOptions;

  /**
   * Creates a new ImageGenerationTemplate instance from a template.
   * @param template The template to use
   * @returns The created template
   */
  public static from(template: IImageGenerationTemplate) {
    return new ImageGenerationTemplate(template.width, template.height)
      .setSteps(template.steps)
      .setGifOptions(template.gif);
  }

  /**
   * Creates a new ImageGenerationTemplate instance.
   * @param width The width of the template
   * @param height The height of the template
   */
  public constructor(public readonly width?: number, public readonly height?: number) {}

  /**
   * Sets the steps. This will overwrite any existing steps.
   * @param steps The steps to set
   */
  public setSteps(steps: ImageGenerationStep[]) {
    this.steps = steps;
    return this;
  }

  /**
   * Sets the gif options.
   * @param options The gif options
   */
  public setGifOptions(options?: EncoderOptions) {
    this.gif = options;
    return this;
  }

  /**
   * Returns whether the template is a gif.
   */
  public isGif() {
    return this.gif != null;
  }

  /**
   * Adds a step to the template.
   * @param step The step to add
   */
  public addStep(step: ImageGenerationStep) {
    this.steps.push(step);
    return this;
  }

  /**
   * Adds steps to the template.
   * @param steps The steps to add
   */
  public addSteps(steps: ImageGenerationStep[]) {
    this.steps.push(...steps);
    return this;
  }

  /**
   * Clears the steps.
   */
  public clearSteps() {
    this.steps = [];
    return this;
  }

  /**
   * Returns whether the size is inferrable.
   */
  public isInferrable() {
    return [this.width, this.height].some((r) => r != null);
  }

  /**
   * Returns the width of the template.
   */
  public getWidth() {
    return this.width ?? this.height;
  }

  /**
   * Returns the height of the template.
   */
  public getHeight() {
    return this.height ?? this.width;
  }

  /**
   * Returns the JSON representation of the template.
   */
  public toJSON(): IImageGenerationTemplate {
    return {
      width: this.width,
      height: this.height,
      steps: this.steps,
      gif: this.gif,
    };
  }
}

export class ImageGen extends Encodable {
  private _canvas!: Canvas;
  /**
   * Creates a new ImageGen instance.
   * @param template The template to use
   */
  public constructor(public template: ImageGenerationTemplate) {
    super();
  }

  /**
   * Adds a step to the template.
   * @param step The step to add
   */
  public addStep(step: ImageGenerationStep) {
    this.template.addStep(step);
    return this;
  }

  /**
   * Adds steps to the template.
   * @param steps The steps to add
   */
  public addSteps(steps: ImageGenerationStep[]) {
    this.template.addSteps(steps);
    return this;
  }

  /**
   * Sets the gif options.
   * @param options The gif options
   */
  public setGifOptions(options?: EncoderOptions) {
    this.template.setGifOptions(options);
    return this;
  }

  /**
   * Returns whether the template is a gif.
   */
  public isGif() {
    return this.template.isGif();
  }

  async #inferSize() {
    if (this.template.isInferrable())
      return {
        // biome-ignore lint: non-null assertion
        width: this.template.getWidth()!,
        // biome-ignore lint: non-null assertion
        height: this.template.getHeight()!,
      };

    if (!this.template.steps.length) throw new Error("Cannot infer size from empty template");
    const firstImg = this.template.steps.find((s) => s.image?.length)?.image?.[0];
    if (!firstImg) throw new Error("Cannot infer size from non-image template");

    const img = await firstImg.source.resolve();

    return { width: img.width, height: img.height };
  }

  /**
   * Generates a readable stream containing GIF data by applying the steps.
   */
  public async generateGif() {
    if (this.template.gif == null) throw new Error("Cannot generate gif on non-gif template");
    const options = this.template.gif;

    const { width, height } = await this.#inferSize();

    const encoder = new GifEncoder(width, height);

    if (options.repeat != null) encoder.setRepeat(options.repeat);
    if (options.delay != null) encoder.setDelay(options.delay);
    if (options.quality != null) encoder.setQuality(options.quality);
    if (options.dispose != null) encoder.setDispose(options.dispose);
    if (options.framerate != null) encoder.setFramerate(options.framerate);
    if (options.transparent != null) encoder.setTransparent(options.transparent);

    // biome-ignore lint: assignment should not be an expression
    const canvas = (this._canvas = createCanvas(width, height));
    const ctx = canvas.getContext("2d");

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

  /**
   * Renders the image by applying the steps.
   */
  public async render() {
    const { width, height } = await this.#inferSize();

    // biome-ignore lint: assignment should not be an expression
    const canvas = (this._canvas = createCanvas(width, height));
    const ctx = canvas.getContext("2d");

    for (const step of this.template.steps) {
      await this.#applyGeneration(canvas, ctx, step);
    }

    return this;
  }

  /**
   * Returns the canvas instance by applying the steps.
   */
  public getFinalCanvas(): Promise<Canvas> {
    if (!this._canvas) throw new Error("render() or generateGif() must be called before accessing the final canvas");
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
            if (text.color != null) ctx[text.stroke ? "strokeStyle" : "fillStyle"] = text.color;
            if (text.align != null) ctx.textAlign = text.align;
            if (text.baseline != null) ctx.textBaseline = text.baseline;
            if (text.direction != null) ctx.direction = text.direction;
            if (text.lineWidth != null) ctx.lineWidth = text.lineWidth;

            ctx[text.stroke ? "strokeText" : "fillText"](text.value, text.x, text.y, text.maxWidth);
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

/**
 * Creates a new image generator.
 * @param template The template to use
 */
export function createImageGenerator(template: ImageGenerationTemplate) {
  const gen = new ImageGen(template);

  return gen;
}

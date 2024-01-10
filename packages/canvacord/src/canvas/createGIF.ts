import { DisposalCode, GifEncoder } from "@skyra/gifenc";
import { Builder } from "../runtime";
import type { Readable } from "stream";

export { DisposalCode };

type GifInit = {
  delay: number;
  repeat?: number;
  framerate: number;
  dispose: DisposalCode;
  quality: number;
  transparent?: number | null;
};

type GIFConfig<BuilderSource extends boolean = false> =
  BuilderSource extends true
    ? GifInit
    : GifInit & { width: number; height: number };

export async function createGIF(
  // biome-ignore lint:
  source: Builder<any, any>,
  config: GIFConfig<true>
): Promise<Readable>;
export async function createGIF(
  source: Buffer[] | Promise<Buffer>,
  config: GIFConfig
): Promise<Readable>;
export async function createGIF(
  source: Buffer[] | Promise<Buffer> | Builder,
  config: GIFConfig<boolean>
): Promise<Readable> {
  const src = await source;
  if (Builder.isBuilder(src)) {
    // @ts-expect-error
    config.width = src.width;
    // @ts-expect-error
    config.height = src.height;
  }

  const { width, height } = config as GIFConfig<false>;
  const encoder = new GifEncoder(width, height);

  encoder.setDelay(config.delay);
  if (config.repeat != null) encoder.setRepeat(config.repeat);
  encoder.setFramerate(config.framerate);
  encoder.setDispose(config.dispose);
  encoder.setQuality(config.quality);
  if (config.transparent !== undefined)
    encoder.setTransparent(config.transparent);

  setImmediate(async () => {
    let frames: Buffer[] = [];
    if (Builder.isBuilder(src)) {
      frames = await src.build({ format: "raw", skipSingleCapture: true });
    } else {
      frames = Array.isArray(src) ? src : [src];
    }

    encoder.start();

    for (const frame of frames) {
      const raw = new Uint8ClampedArray(frame.buffer);
      encoder.addFrame(raw);
    }

    encoder.finish();
  });

  return encoder.createReadStream();
}

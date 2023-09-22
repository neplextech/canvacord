// import { renderAsync } from '@resvg/resvg-js';
import { EncodingFormat } from '../canvas/Encodable';
import { AvifConfig, PngEncodeOptions, Transformer } from '@napi-rs/image';

export type RenderSvgOptions = PngEncodeOptions | AvifConfig | number | null;

export async function renderSvg(
  svg: string,
  format: EncodingFormat,
  options?: RenderSvgOptions,
  signal?: AbortSignal | null
): Promise<Buffer> {
  const transformer = Transformer.fromSvg(svg);
  options ??= null;
  signal ??= null;

  switch (format) {
    case 'png':
      return transformer.png(options as PngEncodeOptions, signal);
    case 'avif':
      return transformer.avif(options as AvifConfig, signal);
    case 'jpeg':
      return transformer.jpeg(options as number, signal);
    case 'webp':
      return transformer.webp(options as number, signal);
    default:
      throw new TypeError(`Unsupported encoding format: "${format}"`);
  }
}

export class CanvacordImage {
  public constructor(public data: Buffer, public mime: string) {}

  public toBase64() {
    return this.data.toString('base64');
  }

  public toDataURL() {
    return `data:${this.mime};base64,${this.toBase64()}`;
  }
}

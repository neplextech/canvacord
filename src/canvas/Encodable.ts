import { AvifConfig, Canvas } from '@napi-rs/canvas';

export type EncodingFormat = 'png' | 'jpeg' | 'webp' | 'avif';

export abstract class Encodable {
  public abstract getFinalCanvas(): Canvas;

  public async encode(): Promise<Buffer>;
  public async encode(format: 'png'): Promise<Buffer>;
  public async encode(format: 'jpeg' | 'webp', options?: number): Promise<Buffer>;
  public async encode(format: 'avif', options?: AvifConfig): Promise<Buffer>;
  public async encode(format: EncodingFormat = 'png', options?: number | AvifConfig): Promise<Buffer> {
    const canvas = this.getFinalCanvas();

    switch (format) {
      case 'png':
        return canvas.encode(format);
      case 'jpeg':
      case 'webp':
        // Passing args conditionally because canvas may panic due to `undefined` value
        if (typeof options === 'number') return canvas.encode(format, options);
        return canvas.encode(format);
      case 'avif':
        if (typeof options === 'object') return canvas.encode(format, options);
        return canvas.encode(format);
      default:
        throw new TypeError(`Invalid encoding format: "${format}"`);
    }
  }
}

import { AvifConfig, Canvas } from "@napi-rs/canvas";

export type EncodingFormat = "png" | "jpeg" | "webp" | "avif" | "raw";

export abstract class Encodable {
  /**
   * Returns the canvas instance by applying the steps.
   */
  public abstract getFinalCanvas(): Promise<Canvas>;

  /**
   * Encodes the canvas to a buffer.
   */
  public async encode(): Promise<Buffer>;
  /**
   * Encodes the canvas to a png buffer.
   * @param format The encoding format - `png`
   */
  public async encode(format: "png"): Promise<Buffer>;
  /**
   * Encodes the canvas to a jpeg or webp buffer.
   * @param format The encoding format - `jpeg` or `webp`
   * @param [options] The quality of the image
   */
  public async encode(
    format: "jpeg" | "webp",
    options?: number
  ): Promise<Buffer>;
  /**
   * Encodes the canvas to an avif buffer.
   * @param format The encoding format - `avif`
   * @param [options] The encoding options
   */
  public async encode(format: "avif", options?: AvifConfig): Promise<Buffer>;
  /**
   * Encodes the canvas to a buffer.
   * @param format The encoding format
   * @param [options] The encoding options or quality
   */
  public async encode(
    format: EncodingFormat = "png",
    options?: number | AvifConfig
  ): Promise<Buffer> {
    const canvas = await this.getFinalCanvas();

    switch (format) {
      case "raw":
        return canvas.data();
      case "png":
        return canvas.encode(format);
      case "jpeg":
      case "webp":
        // Passing args conditionally because canvas may panic due to `undefined` value
        if (typeof options === "number") return canvas.encode(format, options);
        return canvas.encode(format);
      case "avif":
        if (typeof options === "object") return canvas.encode(format, options);
        return canvas.encode(format);
      default:
        throw new TypeError(`Invalid encoding format: "${format}"`);
    }
  }
}

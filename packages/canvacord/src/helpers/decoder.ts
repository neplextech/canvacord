import { Transformer } from "@napi-rs/image";

export async function getSharp() {
  try {
    const { default: sharp } = await import("sharp");
    return sharp;
  } catch {
    return null;
  }
}

export async function getResvg() {
  try {
    const { renderAsync } = await import("@resvg/resvg-js");
    return renderAsync;
  } catch {
    return null;
  }
}

export enum OutputType {
  PNG = 0,
  JPEG = 1,
  WEBP = 2,
}

export async function decodeImage(src: Buffer, output: OutputType): Promise<Buffer> {
  const sharp = await getSharp();

  if (!sharp) {
    const transformer = new Transformer(src);

    switch (output) {
      case OutputType.PNG:
        return transformer.png();
      case OutputType.JPEG:
        return transformer.jpeg(100);
      case OutputType.WEBP:
        return transformer.webp(100);
      default:
        throw new Error("Invalid output type");
    }
  }

  const image = sharp(src, {
    animated: false,
    unlimited: false,
  });

  switch (output) {
    case OutputType.JPEG:
      image.jpeg({ quality: 100 });
      break;
    case OutputType.WEBP:
      image.webp({ quality: 100 });
      break;
    case OutputType.PNG:
      image.png({ quality: 100 });
      break;
    default:
      throw new Error("Invalid output type");
  }

  const result = await image.toBuffer({ resolveWithObject: false });

  return result;
}

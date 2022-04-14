import { Image, Canvas } from "@napi-rs/canvas";
import { request } from "../simple_fetch/mod";

/**
 * Loads the source into Image object
 * @param src The source to load
 * @returns {Promise<Image>}
 */
export async function loadImage(src: string | URL | Buffer | Image | Canvas) {
    if (src instanceof Image) return __buildImageSrc(src.src);
    if (Buffer.isBuffer(src)) return __buildImageSrc(src);
    if (typeof src === "string" || src instanceof URL) {
        const res = await request(src);
        return __buildImageSrc(res);
    }
    if (src instanceof Canvas) {
        const res = await src.encode("png");
        return __buildImageSrc(res);
    }

    throw new Error("Unsupported image source");
}

function __buildImageSrc(data: Buffer): Image {
    const image = new Image();
    image.src = data;
    return image;
}
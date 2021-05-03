import { Image as SkImage } from "@napi-rs/canvas";
import { promises as fs, existsSync } from "fs";
import fetch from "node-fetch";

export async function loadImage(source: string | Buffer): Promise<SkImage> {
    if (Buffer.isBuffer(source)) {
        return createImage(source);
    } else if (typeof source === "string" && existsSync(source)) {
        const data = await fs.readFile(source);
        return createImage(data);
    } else if (typeof source === "string") {
        const res = await fetch(source);
        if (res.status !== 200) throw new Error(`Server responded with status ${res.status}`);
        const data = await res.buffer();
        return createImage(data);
    } else {
        throw new TypeError("Invalid image source");
    }
}

export function createImage(src: Buffer): SkImage {
    const imageConstructor = new SkImage();
    imageConstructor.src = src;

    return imageConstructor;
}
import type { Image as SkImage } from "@napi-rs/canvas";

export type CanvacordOutputFormat = "png" | "jpeg" | "webp";
export type ImageSourceType = string | Buffer | SkImage;

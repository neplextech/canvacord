/// <reference types="node" />
import type { Image as SkImage } from "@napi-rs/canvas";
export declare type CanvacordOutputFormat = "png" | "jpeg" | "webp";
export declare type ImageSourceType = string | Buffer | SkImage;

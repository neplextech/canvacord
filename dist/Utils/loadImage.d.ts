/// <reference types="node" />
import { Image as SkImage } from "@napi-rs/canvas";
import { ImageSourceType } from "../typings/types";
/**
 * Utility function to load images
 * @param source Image source
 */
declare function loadImage(source: ImageSourceType, createSkImage?: true): Promise<SkImage>;
declare function loadImage(source: ImageSourceType, createSkImage?: false): Promise<Buffer>;
declare function createImage(src: Buffer): SkImage;
export { loadImage, createImage };

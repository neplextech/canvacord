/// <reference types="node" />
import { BaseCanvas } from "./BaseCanvas";
import { ImageSourceType } from "../typings/types";
export declare class MemeCanvas extends BaseCanvas {
    trigger(image: ImageSourceType): Promise<Buffer>;
    triggered(image: ImageSourceType): Promise<Buffer>;
    kiss(image1: ImageSourceType, image2: ImageSourceType): Promise<Buffer>;
    spank(image1: ImageSourceType, image2: ImageSourceType): Promise<Buffer>;
    slap(image1: ImageSourceType, image2: ImageSourceType): Promise<Buffer>;
    beautiful(image: ImageSourceType): Promise<Buffer>;
    facepalm(image: ImageSourceType): Promise<Buffer>;
    rainbow(image: ImageSourceType): Promise<Buffer>;
    rip(image: ImageSourceType): Promise<Buffer>;
    trash(image: ImageSourceType): Promise<Buffer>;
    hitler(image: ImageSourceType): Promise<Buffer>;
    jokeOverHead(image: ImageSourceType): Promise<Buffer>;
    distracted(image1: ImageSourceType, image2: ImageSourceType, image3?: ImageSourceType): Promise<Buffer>;
    affect(image: ImageSourceType): Promise<Buffer>;
    jail(image: ImageSourceType, greyscale?: boolean): Promise<Buffer>;
    bed(image1: ImageSourceType, image2: ImageSourceType): Promise<Buffer>;
    delete(image: ImageSourceType, dark?: boolean): Promise<Buffer>;
    wanted(image: ImageSourceType): Promise<Buffer>;
    wasted(image: ImageSourceType): Promise<Buffer>;
    shit(image: ImageSourceType): Promise<Buffer>;
}

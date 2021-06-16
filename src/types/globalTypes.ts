import { Readable } from 'stream';

export type ImageSource = string | Buffer;
export interface SketchConstructorOptions {
    levelSteps?: number;
    lineAlpha?: number;
    lineThickness?: number;
    lineDensity?: number;
    lightness?: number;
    edgeBlurAmount?: number;
    edgeAmount?: number;
    greyscale?: boolean;
}

export interface GIFData {
    height: number;
    width: number;
    frameCount: number;
    frames(buffer?: false): Promise<Readable[]>;
    frames(buffer?: true): Promise<Buffer[]>;
    frames(buffer?: boolean): Promise<Buffer[] | Readable[]>;
}

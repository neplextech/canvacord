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

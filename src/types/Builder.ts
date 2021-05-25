import { Canvas, SKRSContext2D as CanvasRenderingContext2D } from '@napi-rs/canvas';

export interface BuilderInternalData {
    canvas: Canvas;
    ctx: CanvasRenderingContext2D;
    elements?: any;
}

export interface ElementType {
    class?: string;
}

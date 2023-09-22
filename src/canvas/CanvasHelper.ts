import { Canvas, createCanvas, SKRSContext2D } from '@napi-rs/canvas';
import { Encodable } from './Encodable';
import { ContextManipulationStep } from './utils';

export abstract class CanvasHelper extends Encodable {
  public steps: ContextManipulationStep[] = [];
  private _canvas!: Canvas;
  public constructor(public width: number, public height: number) {
    super();
  }

  public async getFinalCanvas(): Promise<Canvas> {
    this._canvas ??= createCanvas(this.width, this.height);
    const ctx = this._canvas.getContext('2d');

    await this.process(this._canvas, ctx);

    return this._canvas;
  }

  public abstract process(canvas: Canvas, ctx: SKRSContext2D): Promise<void>;
}

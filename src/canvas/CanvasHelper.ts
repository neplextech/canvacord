import { AvifConfig, Canvas, createCanvas, SKRSContext2D } from '@napi-rs/canvas';
import { Encodable } from './Encodable';
import { ContextManipulationStep } from './utils';

export abstract class CanvasHelper extends Encodable {
  public steps: ContextManipulationStep[] = [];
  private _canvas!: Canvas;
  public constructor(public width: number, public height: number) {
    super();
  }

  public getFinalCanvas(): Canvas {
    if (!this._canvas) this._canvas = createCanvas(this.width, this.height);
    this.process(this._canvas, this._canvas.getContext('2d'));
    return this._canvas;
  }

  public abstract process(canvas: Canvas, ctx: SKRSContext2D): Promise<void>;
}

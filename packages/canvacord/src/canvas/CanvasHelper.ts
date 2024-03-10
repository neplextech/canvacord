import { Canvas, createCanvas, SKRSContext2D } from "@napi-rs/canvas";
import { Encodable } from "./Encodable";
import { ContextManipulationStep } from "./utils";

export abstract class CanvasHelper extends Encodable {
  /**
   * The steps to apply to the canvas.
   */
  public steps: ContextManipulationStep[] = [];
  private _canvas!: Canvas;

  /**
   * Creates a new CanvasHelper instance.
   * @param width The width of the canvas
   * @param height The height of the canvas
   */
  public constructor(
    public width: number,
    public height: number,
  ) {
    super();
  }

  /**
   * Returns the canvas instance by applying the steps.
   */
  public async getFinalCanvas(): Promise<Canvas> {
    this._canvas ??= createCanvas(this.width, this.height);
    const ctx = this._canvas.getContext("2d");

    await this.process(this._canvas, ctx);

    return this._canvas;
  }

  /**
   * Processes the steps and applies them to the canvas.
   */
  public abstract process(canvas: Canvas, ctx: SKRSContext2D): Promise<void>;
}

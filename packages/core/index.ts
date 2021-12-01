import { Canvas, createCanvas, loadImage } from "canvas";
import { CanvacordOptions, CanvacordPlugin } from "./types";
import { CanvacordPluginManager } from "./src/PluginManager";

export default class CanvacordCore<T extends Record<string, CanvacordPlugin> = {}> {
    public canvas: Canvas | undefined;
    public ctx: CanvasRenderingContext2D | undefined;
    public manager: CanvacordPluginManager;

    constructor(public options: CanvacordOptions = {}) {
        this.canvas = this.createCanvas(options.width, options.height);
        this.ctx = this.getContext();
        this.manager = new CanvacordPluginManager(this);

        // @ts-ignore
        if (options.plugins) options.plugins.forEach((plugin) => plugin?.(this.manager.context) && console.log(plugin));
        return this as unknown as CanvacordCore & T;
    }

    public createCanvas(width?: number, height?: number) {
        return createCanvas(width ?? 100, height ?? 100);
    }

    public getCanvas() {
        return this.canvas;
    }

    public getContext() {
        if (this.canvas) return this.canvas.getContext("2d");
    }

    public getImage() {
        if (this.canvas) return this.canvas.toBuffer();
    }

    public async loadImage<T extends string | Buffer>(url: T) {
        return loadImage(url);
    }

    public async build() {
        if (this.canvas) return this.canvas.toBuffer();
    }

    public async buildBase64() {
        if (this.canvas) return this.canvas.toDataURL();
    }

    public static default(width: number, height: number) {
        return new this({ width, height });
    }
}

export { CanvacordCore as Canvacord };

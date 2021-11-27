import { Canvas, createCanvas, loadImage } from "canvas";
import { CanvasInitOptions } from "./types";
import { CanvacordPluginManager } from "./src/PluginManager";
import { getAllMethods } from "./utils/getMethods";

type ExtendedProperties<T> = { [P in keyof T]: T[P] };

export default class CanvacordCore {
    public canvas: Canvas | undefined;
    public ctx: CanvasRenderingContext2D | undefined;
    public manager: CanvacordPluginManager;

    constructor(public options: CanvasInitOptions) {
        this.canvas = this.createCanvas();
        this.ctx = this.getContext();
        this.manager = new CanvacordPluginManager();

        if (this.options.Plugins) {
            this.options.Plugins.forEach((plugin, _posx) => {
                if (typeof this.getClassName(plugin) == "string") {
                    let methods = this.manager.extratPluginMethods(plugin);
                    if (methods === undefined) throw new Error(`${this.getClassName(plugin)} is not valid`);
                    this.manager.addPlugin(this.getClassName(plugin), methods);
                } else throw new Error(`${this.getClassName(plugin)} is not valid`);
            });

            this.addFns();
        }
    }

    public createCanvas(width?: number, height?: number) {
        if (width && height) return createCanvas(this.options.width ?? width, this.options.height ?? height);
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

    private getClassName(obj: any): string {
        if (typeof obj === "undefined") return "undefined";
        else if (obj === null) return "null";
        else return obj.constructor.name;
    }

    private addFns<T>(): CanvacordCore & ExtendedProperties<T> {
        this?.options?.Plugins?.forEach((plugin) => {
            let methods = this.manager.extratPluginMethods(plugin);
            let baseMethods = getAllMethods(this);
            methods = methods?.filter((method) => !baseMethods.includes(method));
            if (methods) for (let i of methods) this.constructor.prototype[i] = new plugin()[i];
        });

        return new CanvacordCore({}) as CanvacordCore & ExtendedProperties<T>;
    }
}

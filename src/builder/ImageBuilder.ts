import { createCanvas } from "@napi-rs/canvas";
import { BuilderInternalData } from "../types/Builder";
import { Util } from "../Utils/Util"

class CanvacordImageBuilder {
    width: number;
    height: number;
    internal?: BuilderInternalData;

    constructor(width: number, height: number) {
        if (!Util.is(width, "number") || width < 1) throw new TypeError(`Expected "width" to be a positive number, received ${width}!`);
        if (!Util.is(height, "number") || height < 1) throw new TypeError(`Expected "height" to be a positive number, received ${height}!`);

        Object.defineProperty(this, "internal", { enumerable: false, writable: true, configurable: true });

        this.width = width;
        this.height = height;
    }

    get canvas() {
        if (this.internal) return this.internal.canvas ?? null;
        throw new Error("Canvas is not instantiated");
    }

    init() {
        const canvas = createCanvas(this.width, this.height);
        const ctx = canvas.getContext("2d");
        
        this.internal = { canvas, ctx };
    }

    createRectangle() {}
    
}

export { CanvacordImageBuilder }
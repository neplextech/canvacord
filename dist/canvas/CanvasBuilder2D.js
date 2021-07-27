"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _CanvasBuilder2D_canvas, _CanvasBuilder2D_ctx;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasBuilder2D = exports.BuilderReadyState = void 0;
const BaseCanvas_1 = require("./BaseCanvas");
var BuilderReadyState;
(function (BuilderReadyState) {
    BuilderReadyState[BuilderReadyState["NOT_READY"] = 0] = "NOT_READY";
    BuilderReadyState[BuilderReadyState["READY"] = 1] = "READY";
})(BuilderReadyState = exports.BuilderReadyState || (exports.BuilderReadyState = {}));
class CanvasBuilder2D extends BaseCanvas_1.BaseCanvas {
    constructor(width, height, autoInstance = true) {
        super();
        this.width = width;
        this.height = height;
        _CanvasBuilder2D_canvas.set(this, void 0);
        _CanvasBuilder2D_ctx.set(this, void 0);
        this.engine = "skia";
        if (autoInstance)
            this.instantiate();
    }
    get canvas() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _CanvasBuilder2D_canvas, "f")) !== null && _a !== void 0 ? _a : null;
    }
    get ctx() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _CanvasBuilder2D_ctx, "f")) !== null && _a !== void 0 ? _a : null;
    }
    get readyState() {
        if (__classPrivateFieldGet(this, _CanvasBuilder2D_canvas, "f") && __classPrivateFieldGet(this, _CanvasBuilder2D_ctx, "f"))
            return BuilderReadyState.READY;
        return BuilderReadyState.NOT_READY;
    }
    instantiate() {
        if (__classPrivateFieldGet(this, _CanvasBuilder2D_canvas, "f"))
            return this;
        const { canvas, ctx } = this.makeCanvas(this.width, this.height);
        __classPrivateFieldSet(this, _CanvasBuilder2D_canvas, canvas, "f");
        __classPrivateFieldSet(this, _CanvasBuilder2D_ctx, ctx, "f");
        return this;
    }
    drawImage(image, dx, dy, dw, dh) {
        if (typeof dw !== "number" && typeof dh !== "number")
            __classPrivateFieldGet(this, _CanvasBuilder2D_ctx, "f").drawImage(image, dx, dy);
        else
            __classPrivateFieldGet(this, _CanvasBuilder2D_ctx, "f").drawImage(image, dx, dy, dw, dh);
        return this;
    }
    clearRect(x, y, w, h) {
        __classPrivateFieldGet(this, _CanvasBuilder2D_ctx, "f").clearRect(x, y, w, h);
        return this;
    }
    drawRect(x, y, width, height) {
        __classPrivateFieldGet(this, _CanvasBuilder2D_ctx, "f").fillRect(x, y, width, height);
        return this;
    }
    strokeRect(x, y, width, height) {
        __classPrivateFieldGet(this, _CanvasBuilder2D_ctx, "f").strokeRect(x, y, width, height);
        return this;
    }
    setColorFill(color) {
        __classPrivateFieldGet(this, _CanvasBuilder2D_ctx, "f").fillStyle = color;
        return this;
    }
    setColorStroke(color) {
        __classPrivateFieldGet(this, _CanvasBuilder2D_ctx, "f").strokeStyle = color;
        return this;
    }
    toBuffer(format) {
        if (format)
            this.mimeType = format;
        return this.buildImageSync(this.canvas);
    }
    toBufferAsync(format) {
        return __awaiter(this, void 0, void 0, function* () {
            if (format)
                this.mimeType = format;
            return yield this.buildImage(this.canvas);
        });
    }
    save() {
        __classPrivateFieldGet(this, _CanvasBuilder2D_ctx, "f").save();
        return this;
    }
    restore() {
        __classPrivateFieldGet(this, _CanvasBuilder2D_ctx, "f").restore();
        return this;
    }
    valueOf() {
        return {
            canvas: __classPrivateFieldGet(this, _CanvasBuilder2D_canvas, "f"),
            ctx: __classPrivateFieldGet(this, _CanvasBuilder2D_ctx, "f")
        };
    }
    toString() {
        return `<CanvasBuilder2D ${this.width}x${this.height}>`;
    }
}
exports.CanvasBuilder2D = CanvasBuilder2D;
_CanvasBuilder2D_canvas = new WeakMap(), _CanvasBuilder2D_ctx = new WeakMap();

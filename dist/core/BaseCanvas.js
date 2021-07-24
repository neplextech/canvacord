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
var _BaseCanvas_mimeType;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCanvas = void 0;
const canvas_1 = require("@napi-rs/canvas");
const loadImage_1 = require("../Utils/loadImage");
class BaseCanvas {
    constructor() {
        _BaseCanvas_mimeType.set(this, "png");
        this.loadImage = loadImage_1.loadImage;
    }
    get mimeType() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _BaseCanvas_mimeType, "f")) !== null && _a !== void 0 ? _a : "png";
    }
    set mimeType(value) {
        __classPrivateFieldSet(this, _BaseCanvas_mimeType, value !== null && value !== void 0 ? value : "png", "f");
    }
    makeCanvas(width, height) {
        const canvas = canvas_1.createCanvas(width, height);
        const ctx = canvas.getContext("2d");
        return { canvas, ctx };
    }
    buildImage(canvas) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield canvas.encode(this.mimeType);
        });
    }
    buildImageSync(canvas) {
        return canvas.encodeSync(this.mimeType);
    }
    getImageInfo(image) {
        return __awaiter(this, void 0, void 0, function* () {
            const img = yield this.loadImage(image);
            return {
                width: img.width,
                height: img.height,
                source: img.src
            };
        });
    }
}
exports.BaseCanvas = BaseCanvas;
_BaseCanvas_mimeType = new WeakMap();

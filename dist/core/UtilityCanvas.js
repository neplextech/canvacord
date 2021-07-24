"use strict";
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilityCanvas = void 0;
const BaseCanvas_1 = require("./BaseCanvas");
class UtilityCanvas extends BaseCanvas_1.BaseCanvas {
    constructor() {
        super();
    }
    blur(image, pixels) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image) throw new Error("Image was not provided!");
            const img = yield this.loadImage(image);
            const { canvas, ctx } = this.makeCanvas(img.width, img.height);
            ctx.filter = `blur(${pixels !== null && pixels !== void 0 ? pixels : 0}px)`;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            return yield this.buildImage(canvas);
        });
    }
    brighten(img, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            amount !== null && amount !== void 0 ? amount : (amount = 50);
            const image = yield this.loadImage(img);
            const { canvas, ctx } = this.makeCanvas(image.width, image.height);
            ctx.drawImage(image, 0, 0);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < imgData.data.length; i += 4) {
                imgData.data[i] += amount;
                imgData.data[i + 1] += amount;
                imgData.data[i + 2] += amount;
            }
            ctx.putImageData(imgData, 0, 0);
            return yield this.buildImage(canvas);
        });
    }
    darken(img, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.brighten(img, -amount);
        });
    }
    greyscale(img) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield this.loadImage(img);
            const { canvas, ctx } = this.makeCanvas(image.width, image.height);
            ctx.drawImage(image, 0, 0);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < imgData.data.length; i += 4) {
                const brightness = 0.34 * imgData.data[i] + 0.5 * imgData.data[i + 1] + 0.16 * imgData.data[i + 2];
                imgData.data[i] = brightness;
                imgData.data[i + 1] = brightness;
                imgData.data[i + 2] = brightness;
            }
            ctx.putImageData(imgData, 0, 0);
            return yield this.buildImage(canvas);
        });
    }
    grayscale(img) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.greyscale(img);
        });
    }
    invert(img) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield this.loadImage(img);
            const { canvas, ctx } = this.makeCanvas(image.width, image.height);
            ctx.drawImage(image, 0, 0);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < imgData.data.length; i += 4) {
                imgData.data[i] = 255 - imgData.data[i];
                imgData.data[i + 1] = 255 - imgData.data[i + 1];
                imgData.data[i + 2] = 255 - imgData.data[i + 2];
                imgData.data[i + 3] = 255;
            }
            ctx.putImageData(imgData, 0, 0);
            return yield this.buildImage(canvas);
        });
    }
    sepia(img) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield this.loadImage(img);
            const { canvas, ctx } = this.makeCanvas(image.width, image.height);
            ctx.drawImage(image, 0, 0);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < imgData.data.length; i += 4) {
                imgData.data[i] = imgData.data[i] * 0.393 + imgData.data[i + 1] * 0.769 + imgData.data[i + 2] * 0.189;
                imgData.data[i + 1] = imgData.data[i] * 0.349 + imgData.data[i + 1] * 0.686 + imgData.data[i + 2] * 0.168;
                imgData.data[i + 2] = imgData.data[i] * 0.272 + imgData.data[i + 1] * 0.534 + imgData.data[i + 2] * 0.131;
            }
            ctx.putImageData(imgData, 0, 0);
            return yield this.buildImage(canvas);
        });
    }
    threshold(img, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield this.loadImage(img);
            const { canvas, ctx } = this.makeCanvas(image.width, image.height);
            ctx.drawImage(image, 0, 0);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < imgData.data.length; i += 4) {
                const r = imgData.data[i];
                const g = imgData.data[i + 1];
                const b = imgData.data[i + 2];
                const v = 0.2126 * r + 0.7152 * g + 0.0722 * b >= amount ? 255 : 0;
                imgData.data[i] = imgData.data[i + 1] = imgData.data[i + 2] = v;
            }
            ctx.putImageData(imgData, 0, 0);
            return yield this.buildImage(canvas);
        });
    }
    circle(image) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image) throw new Error("Image was not provided!");
            const img = yield this.loadImage(image);
            const { canvas, ctx } = this.makeCanvas(img.width, img.height);
            ctx.drawImage(img, 0, 0);
            ctx.globalCompositeOperation = "destination-in";
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            return yield this.buildImage(canvas);
        });
    }
    convolute(ctx, canvas, matrix, opaque) {
        return __awaiter(this, void 0, void 0, function* () {
            const side = Math.round(Math.sqrt(matrix.length));
            const halfSide = Math.floor(side / 2);
            const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const src = pixels.data;
            const sw = pixels.width;
            const sh = pixels.height;
            const w = sw;
            const h = sh;
            const output = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const dst = output.data;
            const alphaFac = opaque ? 1 : 0;
            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    const sy = y;
                    const sx = x;
                    const dstOff = (y * w + x) * 4;
                    let r = 0;
                    let g = 0;
                    let b = 0;
                    let a = 0;
                    for (let cy = 0; cy < side; cy++) {
                        for (let cx = 0; cx < side; cx++) {
                            const scy = sy + cy - halfSide;
                            const scx = sx + cx - halfSide;
                            if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                                const srcOff = (scy * sw + scx) * 4;
                                const wt = matrix[cy * side + cx];
                                r += src[srcOff] * wt;
                                g += src[srcOff + 1] * wt;
                                b += src[srcOff + 2] * wt;
                                a += src[srcOff + 3] * wt;
                            }
                        }
                    }
                    dst[dstOff] = r;
                    dst[dstOff + 1] = g;
                    dst[dstOff + 2] = b;
                    dst[dstOff + 3] = a + alphaFac * (255 - a);
                }
            }
            ctx.putImageData(output, 0, 0);
            return ctx;
        });
    }
    colorfy(image, color) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image) throw new Error("Image was not provided!");
            const img = yield this.loadImage(image);
            const { canvas, ctx } = this.makeCanvas(img.width, img.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            if (color) {
                ctx.globalCompositeOperation = "color";
                ctx.fillStyle = color;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            return yield this.buildImage(canvas);
        });
    }
    colourfy(image, colour) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.colorfy(image, colour);
        });
    }
    color(color, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            const { canvas, ctx } = this.makeCanvas(width !== null && width !== void 0 ? width : 1024, height !== null && height !== void 0 ? height : 1024);
            ctx.beginPath();
            ctx.fillStyle = color !== null && color !== void 0 ? color : "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            return yield this.buildImage(canvas);
        });
    }
    colour(colour, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.color(colour, width, height);
        });
    }
}
exports.UtilityCanvas = UtilityCanvas;

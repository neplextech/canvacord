"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilityCanvas = void 0;
var BaseCanvas_1 = require("./BaseCanvas");
var UtilityCanvas = /** @class */ (function (_super) {
    __extends(UtilityCanvas, _super);
    function UtilityCanvas() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UtilityCanvas.prototype.blur = function (image, pixels) {
        return __awaiter(this, void 0, void 0, function () {
            var img, _a, canvas, ctx;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!image)
                            throw new Error("Image was not provided!");
                        return [4 /*yield*/, this.loadImage(image)];
                    case 1:
                        img = _b.sent();
                        _a = this.makeCanvas(img.width, img.height), canvas = _a.canvas, ctx = _a.ctx;
                        ctx.filter = "blur(" + (pixels !== null && pixels !== void 0 ? pixels : 0) + "px)";
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        return [4 /*yield*/, this.buildImage(canvas)];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    UtilityCanvas.prototype.brighten = function (img, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var image, _a, canvas, ctx, imgData, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        amount !== null && amount !== void 0 ? amount : (amount = 50);
                        return [4 /*yield*/, this.loadImage(img)];
                    case 1:
                        image = _b.sent();
                        _a = this.makeCanvas(image.width, image.height), canvas = _a.canvas, ctx = _a.ctx;
                        ctx.drawImage(image, 0, 0);
                        imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        for (i = 0; i < imgData.data.length; i += 4) {
                            imgData.data[i] += amount;
                            imgData.data[i + 1] += amount;
                            imgData.data[i + 2] += amount;
                        }
                        ctx.putImageData(imgData, 0, 0);
                        return [4 /*yield*/, this.buildImage(canvas)];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    UtilityCanvas.prototype.darken = function (img, amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.brighten(img, -amount)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UtilityCanvas.prototype.greyscale = function (img) {
        return __awaiter(this, void 0, void 0, function () {
            var image, _a, canvas, ctx, imgData, i, brightness;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.loadImage(img)];
                    case 1:
                        image = _b.sent();
                        _a = this.makeCanvas(image.width, image.height), canvas = _a.canvas, ctx = _a.ctx;
                        ctx.drawImage(image, 0, 0);
                        imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        for (i = 0; i < imgData.data.length; i += 4) {
                            brightness = 0.34 * imgData.data[i] + 0.5 * imgData.data[i + 1] + 0.16 * imgData.data[i + 2];
                            imgData.data[i] = brightness;
                            imgData.data[i + 1] = brightness;
                            imgData.data[i + 2] = brightness;
                        }
                        ctx.putImageData(imgData, 0, 0);
                        return [4 /*yield*/, this.buildImage(canvas)];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    UtilityCanvas.prototype.grayscale = function (img) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.greyscale(img)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UtilityCanvas.prototype.invert = function (img) {
        return __awaiter(this, void 0, void 0, function () {
            var image, _a, canvas, ctx, imgData, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.loadImage(img)];
                    case 1:
                        image = _b.sent();
                        _a = this.makeCanvas(image.width, image.height), canvas = _a.canvas, ctx = _a.ctx;
                        ctx.drawImage(image, 0, 0);
                        imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        for (i = 0; i < imgData.data.length; i += 4) {
                            imgData.data[i] = 255 - imgData.data[i];
                            imgData.data[i + 1] = 255 - imgData.data[i + 1];
                            imgData.data[i + 2] = 255 - imgData.data[i + 2];
                            imgData.data[i + 3] = 255;
                        }
                        ctx.putImageData(imgData, 0, 0);
                        return [4 /*yield*/, this.buildImage(canvas)];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    UtilityCanvas.prototype.sepia = function (img) {
        return __awaiter(this, void 0, void 0, function () {
            var image, _a, canvas, ctx, imgData, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.loadImage(img)];
                    case 1:
                        image = _b.sent();
                        _a = this.makeCanvas(image.width, image.height), canvas = _a.canvas, ctx = _a.ctx;
                        ctx.drawImage(image, 0, 0);
                        imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        for (i = 0; i < imgData.data.length; i += 4) {
                            imgData.data[i] = imgData.data[i] * 0.393 + imgData.data[i + 1] * 0.769 + imgData.data[i + 2] * 0.189;
                            imgData.data[i + 1] = imgData.data[i] * 0.349 + imgData.data[i + 1] * 0.686 + imgData.data[i + 2] * 0.168;
                            imgData.data[i + 2] = imgData.data[i] * 0.272 + imgData.data[i + 1] * 0.534 + imgData.data[i + 2] * 0.131;
                        }
                        ctx.putImageData(imgData, 0, 0);
                        return [4 /*yield*/, this.buildImage(canvas)];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    UtilityCanvas.prototype.threshold = function (img, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var image, _a, canvas, ctx, imgData, i, r, g, b, v;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.loadImage(img)];
                    case 1:
                        image = _b.sent();
                        _a = this.makeCanvas(image.width, image.height), canvas = _a.canvas, ctx = _a.ctx;
                        ctx.drawImage(image, 0, 0);
                        imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        for (i = 0; i < imgData.data.length; i += 4) {
                            r = imgData.data[i];
                            g = imgData.data[i + 1];
                            b = imgData.data[i + 2];
                            v = 0.2126 * r + 0.7152 * g + 0.0722 * b >= amount ? 255 : 0;
                            imgData.data[i] = imgData.data[i + 1] = imgData.data[i + 2] = v;
                        }
                        ctx.putImageData(imgData, 0, 0);
                        return [4 /*yield*/, this.buildImage(canvas)];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    UtilityCanvas.prototype.circle = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            var img, _a, canvas, ctx;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!image)
                            throw new Error("Image was not provided!");
                        return [4 /*yield*/, this.loadImage(image)];
                    case 1:
                        img = _b.sent();
                        _a = this.makeCanvas(img.width, img.height), canvas = _a.canvas, ctx = _a.ctx;
                        ctx.drawImage(img, 0, 0);
                        ctx.globalCompositeOperation = "destination-in";
                        ctx.beginPath();
                        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, 0, Math.PI * 2);
                        ctx.closePath();
                        ctx.fill();
                        return [4 /*yield*/, this.buildImage(canvas)];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    UtilityCanvas.prototype.convolute = function (ctx, canvas, matrix, opaque) {
        return __awaiter(this, void 0, void 0, function () {
            var side, halfSide, pixels, src, sw, sh, w, h, output, dst, alphaFac, y, x, sy, sx, dstOff, r, g, b, a, cy, cx, scy, scx, srcOff, wt;
            return __generator(this, function (_a) {
                side = Math.round(Math.sqrt(matrix.length));
                halfSide = Math.floor(side / 2);
                pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
                src = pixels.data;
                sw = pixels.width;
                sh = pixels.height;
                w = sw;
                h = sh;
                output = ctx.getImageData(0, 0, canvas.width, canvas.height);
                dst = output.data;
                alphaFac = opaque ? 1 : 0;
                for (y = 0; y < h; y++) {
                    for (x = 0; x < w; x++) {
                        sy = y;
                        sx = x;
                        dstOff = (y * w + x) * 4;
                        r = 0;
                        g = 0;
                        b = 0;
                        a = 0;
                        for (cy = 0; cy < side; cy++) {
                            for (cx = 0; cx < side; cx++) {
                                scy = sy + cy - halfSide;
                                scx = sx + cx - halfSide;
                                if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                                    srcOff = (scy * sw + scx) * 4;
                                    wt = matrix[cy * side + cx];
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
                return [2 /*return*/, ctx];
            });
        });
    };
    UtilityCanvas.prototype.colorfy = function (image, color) {
        return __awaiter(this, void 0, void 0, function () {
            var img, _a, canvas, ctx;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!image)
                            throw new Error("Image was not provided!");
                        return [4 /*yield*/, this.loadImage(image)];
                    case 1:
                        img = _b.sent();
                        _a = this.makeCanvas(img.width, img.height), canvas = _a.canvas, ctx = _a.ctx;
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        if (color) {
                            ctx.globalCompositeOperation = "color";
                            ctx.fillStyle = color;
                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                        }
                        return [4 /*yield*/, this.buildImage(canvas)];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    UtilityCanvas.prototype.colourfy = function (image, colour) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.colorfy(image, colour)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UtilityCanvas.prototype.color = function (color, width, height) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, canvas, ctx;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.makeCanvas(width !== null && width !== void 0 ? width : 1024, height !== null && height !== void 0 ? height : 1024), canvas = _a.canvas, ctx = _a.ctx;
                        ctx.beginPath();
                        ctx.fillStyle = color !== null && color !== void 0 ? color : "#FFFFFF";
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                        return [4 /*yield*/, this.buildImage(canvas)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    UtilityCanvas.prototype.colour = function (colour, width, height) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.color(colour, width, height)];
            });
        });
    };
    return UtilityCanvas;
}(BaseCanvas_1.BaseCanvas));
exports.UtilityCanvas = UtilityCanvas;

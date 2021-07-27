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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemeCanvas = void 0;
var BaseCanvas_1 = require("./BaseCanvas");
var gifencoder_1 = __importDefault(require("gifencoder"));
var Util_1 = require("../Utils/Util");
var UtilityCanvas_1 = require("./UtilityCanvas");
var CanvasBuilder2D_1 = require("./CanvasBuilder2D");
var canvasUtils = new UtilityCanvas_1.UtilityCanvas();
var MemeCanvas = /** @class */ (function (_super) {
    __extends(MemeCanvas, _super);
    function MemeCanvas() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MemeCanvas.prototype.trigger = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            var img, base, _a, GIF, canvas, BR, LR, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!image)
                            throw new Error("no image was provided");
                        return [4 /*yield*/, this.loadImage(image)];
                    case 1:
                        img = _b.sent();
                        _a = this.loadImage;
                        return [4 /*yield*/, Util_1.Util.assets.image("TRIGGERED")];
                    case 2: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 3:
                        base = _b.sent();
                        GIF = new gifencoder_1.default(256, 310);
                        GIF.start();
                        GIF.setRepeat(0);
                        GIF.setDelay(15);
                        canvas = new CanvasBuilder2D_1.CanvasBuilder2D(256, 310);
                        BR = 30;
                        LR = 20;
                        i = 0;
                        while (i < 9) {
                            canvas
                                .clearRect(0, 0, 256, 310)
                                .drawImage(img, Math.floor(Math.random() * BR) - BR, Math.floor(Math.random() * BR) - BR, 256 + BR, 310 - 54 + BR)
                                .save()
                                .setColorFill("#FF000033")
                                .drawRect(0, 0, 256, 310)
                                .restore()
                                .drawImage(base, Math.floor(Math.random() * LR) - LR, 310 - 54 + Math.floor(Math.random() * LR) - LR, 256 + LR, 54 + LR);
                            GIF.addFrame(canvas.ctx);
                            i++;
                        }
                        GIF.finish();
                        return [2 /*return*/, GIF.out.getData()];
                }
            });
        });
    };
    MemeCanvas.prototype.triggered = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.trigger(image)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MemeCanvas.prototype.kiss = function (image1, image2) {
        return __awaiter(this, void 0, void 0, function () {
            var background, _a, avatar, avatar1, canvas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!image1)
                            throw new Error("First image was not provided!");
                        if (!image2)
                            throw new Error("Second image was not provided!");
                        _a = this.loadImage;
                        return [4 /*yield*/, Util_1.Util.assets.image("KISS")];
                    case 1: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 2:
                        background = _b.sent();
                        return [4 /*yield*/, this.loadImage(image1)];
                    case 3:
                        avatar = _b.sent();
                        return [4 /*yield*/, this.loadImage(image2)];
                    case 4:
                        avatar1 = _b.sent();
                        canvas = new CanvasBuilder2D_1.CanvasBuilder2D(background.width, background.height);
                        canvas.drawImage(background, 0, 0, canvas.width, canvas.height);
                        canvas.drawImage(avatar1, 370, 25, 200, 200);
                        canvas.drawImage(avatar, 150, 25, 200, 200);
                        return [2 /*return*/, canvas.toBufferAsync(this.mimeType)];
                }
            });
        });
    };
    MemeCanvas.prototype.spank = function (image1, image2) {
        return __awaiter(this, void 0, void 0, function () {
            var background, _a, avatar, avatar1, canvas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!image1)
                            throw new Error("First image was not provided!");
                        if (!image2)
                            throw new Error("Second image was not provided!");
                        _a = this.loadImage;
                        return [4 /*yield*/, Util_1.Util.assets.image("SPANK")];
                    case 1: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 2:
                        background = _b.sent();
                        return [4 /*yield*/, this.loadImage(image1)];
                    case 3:
                        avatar = _b.sent();
                        return [4 /*yield*/, this.loadImage(image2)];
                    case 4:
                        avatar1 = _b.sent();
                        canvas = new CanvasBuilder2D_1.CanvasBuilder2D(500, 500);
                        canvas.drawImage(background, 0, 0, canvas.width, canvas.height);
                        canvas.drawImage(avatar1, 350, 220, 120, 120);
                        canvas.drawImage(avatar, 225, 5, 140, 140);
                        return [2 /*return*/, canvas.toBufferAsync(this.mimeType)];
                }
            });
        });
    };
    MemeCanvas.prototype.slap = function (image1, image2) {
        return __awaiter(this, void 0, void 0, function () {
            var background, _a, avatar, avatar1, canvas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!image1)
                            throw new Error("First image was not provided!");
                        if (!image2)
                            throw new Error("Second image was not provided!");
                        _a = this.loadImage;
                        return [4 /*yield*/, Util_1.Util.assets.image("BATSLAP")];
                    case 1: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 2:
                        background = _b.sent();
                        return [4 /*yield*/, this.loadImage(image1)];
                    case 3:
                        avatar = _b.sent();
                        return [4 /*yield*/, this.loadImage(image2)];
                    case 4:
                        avatar1 = _b.sent();
                        canvas = new CanvasBuilder2D_1.CanvasBuilder2D(1000, 500);
                        canvas.drawImage(background, 0, 0, canvas.width, canvas.height);
                        canvas.drawImage(avatar1, 580, 260, 200, 200);
                        canvas.drawImage(avatar, 350, 70, 220, 220);
                        return [2 /*return*/, canvas.toBufferAsync(this.mimeType)];
                }
            });
        });
    };
    MemeCanvas.prototype.beautiful = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            var img, base, _a, canvas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!image)
                            throw new Error("Image was not provided!");
                        return [4 /*yield*/, this.loadImage(image)];
                    case 1:
                        img = _b.sent();
                        _a = this.loadImage;
                        return [4 /*yield*/, Util_1.Util.assets.image("BEAUTIFUL")];
                    case 2: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 3:
                        base = _b.sent();
                        canvas = new CanvasBuilder2D_1.CanvasBuilder2D(376, 400);
                        canvas.drawImage(base, 0, 0, canvas.width, canvas.height);
                        canvas.drawImage(img, 258, 28, 84, 95);
                        canvas.drawImage(img, 258, 229, 84, 95);
                        return [2 /*return*/, canvas.toBufferAsync(this.mimeType)];
                }
            });
        });
    };
    MemeCanvas.prototype.facepalm = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            var layer, _a, avatar, canvas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!image)
                            throw new Error("image was not provided!");
                        _a = this.loadImage;
                        return [4 /*yield*/, Util_1.Util.assets.image("FACEPALM")];
                    case 1: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 2:
                        layer = _b.sent();
                        return [4 /*yield*/, this.loadImage(image)];
                    case 3:
                        avatar = _b.sent();
                        canvas = new CanvasBuilder2D_1.CanvasBuilder2D(632, 357).setColorFill("black").drawRect(0, 0, 632, 357).drawImage(avatar, 199, 112, 235, 235).drawImage(layer, 0, 0, 632, 357);
                        return [2 /*return*/, canvas.toBufferAsync(this.mimeType)];
                }
            });
        });
    };
    MemeCanvas.prototype.rainbow = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            var bg, _a, img, canvas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!image)
                            throw new Error("image was not provided!");
                        _a = this.loadImage;
                        return [4 /*yield*/, Util_1.Util.assets.image("GAY")];
                    case 1: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 2:
                        bg = _b.sent();
                        return [4 /*yield*/, this.loadImage(image)];
                    case 3:
                        img = _b.sent();
                        canvas = new CanvasBuilder2D_1.CanvasBuilder2D(img.width, img.height);
                        canvas.drawImage(img, 0, 0, canvas.width, canvas.height);
                        canvas.drawImage(bg, 0, 0, canvas.width, canvas.height);
                        return [2 /*return*/, canvas.toBufferAsync(this.mimeType)];
                }
            });
        });
    };
    MemeCanvas.prototype.rip = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            var img, bg, _a, canvas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!image)
                            throw new Error("Image was not provided!");
                        return [4 /*yield*/, this.loadImage(image)];
                    case 1:
                        img = _b.sent();
                        _a = this.loadImage;
                        return [4 /*yield*/, Util_1.Util.assets.image("RIP")];
                    case 2: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 3:
                        bg = _b.sent();
                        canvas = new CanvasBuilder2D_1.CanvasBuilder2D(244, 253);
                        canvas.drawImage(bg, 0, 0, canvas.width, canvas.height);
                        canvas.drawImage(img, 63, 110, 90, 90);
                        return [2 /*return*/, canvas.toBufferAsync(this.mimeType)];
                }
            });
        });
    };
    MemeCanvas.prototype.trash = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            var blur, img, bg, _a, canvas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!image)
                            throw new Error("Image was not provided!");
                        return [4 /*yield*/, canvasUtils.blur(image, 3)];
                    case 1:
                        blur = _b.sent();
                        return [4 /*yield*/, this.loadImage(blur)];
                    case 2:
                        img = _b.sent();
                        _a = this.loadImage;
                        return [4 /*yield*/, Util_1.Util.assets.image("TRASH")];
                    case 3: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 4:
                        bg = _b.sent();
                        canvas = new CanvasBuilder2D_1.CanvasBuilder2D(bg.width, bg.height).drawImage(bg, 0, 0).drawImage(img, 309, 0, 309, 309);
                        return [2 /*return*/, canvas.toBufferAsync(this.mimeType)];
                }
            });
        });
    };
    MemeCanvas.prototype.hitler = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            var img, bg, _a, canvas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!image)
                            throw new Error("image was not provided!");
                        return [4 /*yield*/, this.loadImage(image)];
                    case 1:
                        img = _b.sent();
                        _a = this.loadImage;
                        return [4 /*yield*/, Util_1.Util.assets.image("HITLER")];
                    case 2: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 3:
                        bg = _b.sent();
                        canvas = new CanvasBuilder2D_1.CanvasBuilder2D(bg.width, bg.height).drawImage(bg, 0, 0).drawImage(img, 46, 43, 140, 140);
                        return [2 /*return*/, canvas.toBufferAsync(this.mimeType)];
                }
            });
        });
    };
    MemeCanvas.prototype.jokeOverHead = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            var layer, _a, img, canvas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!image)
                            throw new Error("Image wasn ot provided!");
                        _a = this.loadImage;
                        return [4 /*yield*/, Util_1.Util.assets.image("JOKEOVERHEAD")];
                    case 1: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 2:
                        layer = _b.sent();
                        return [4 /*yield*/, this.loadImage(image)];
                    case 3:
                        img = _b.sent();
                        canvas = new CanvasBuilder2D_1.CanvasBuilder2D(425, 404).setColorFill("black").drawRect(0, 0, 425, 404).drawImage(img, 125, 130, 140, 135).drawImage(layer, 0, 0, 425, 404);
                        return [2 /*return*/, canvas.toBufferAsync(this.mimeType)];
                }
            });
        });
    };
    MemeCanvas.prototype.distracted = function (image1, image2, image3) {
        if (image3 === void 0) { image3 = null; }
        return __awaiter(this, void 0, void 0, function () {
            var background, _a, avatar1, _b, avatar2, _c, avatar3, _d, _e, canvas;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!image1)
                            throw new Error("First image was not provided!");
                        if (!image2)
                            throw new Error("Second image was not provided!");
                        _a = this.loadImage;
                        return [4 /*yield*/, Util_1.Util.assets.image("DISTRACTED")];
                    case 1: return [4 /*yield*/, _a.apply(this, [_f.sent()])];
                    case 2:
                        background = _f.sent();
                        _b = this.loadImage;
                        return [4 /*yield*/, canvasUtils.circle(image1)];
                    case 3: return [4 /*yield*/, _b.apply(this, [_f.sent()])];
                    case 4:
                        avatar1 = _f.sent();
                        _c = this.loadImage;
                        return [4 /*yield*/, canvasUtils.circle(image2)];
                    case 5: return [4 /*yield*/, _c.apply(this, [_f.sent()])];
                    case 6:
                        avatar2 = _f.sent();
                        if (!image3) return [3 /*break*/, 9];
                        _e = this.loadImage;
                        return [4 /*yield*/, canvasUtils.circle(image3)];
                    case 7: return [4 /*yield*/, _e.apply(this, [_f.sent()])];
                    case 8:
                        _d = _f.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        _d = null;
                        _f.label = 10;
                    case 10:
                        avatar3 = _d;
                        canvas = new CanvasBuilder2D_1.CanvasBuilder2D(background.width, background.height);
                        canvas.drawImage(background, 0, 0, canvas.width, canvas.height);
                        canvas.drawImage(avatar1, 180, 90, 150, 150);
                        canvas.drawImage(avatar2, 480, 35, 130, 130);
                        if (avatar3)
                            canvas.drawImage(avatar3, 730, 110, 130, 130);
                        return [2 /*return*/, canvas.toBufferAsync(this.mimeType)];
                }
            });
        });
    };
    MemeCanvas.prototype.affect = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            var img, bg, _a, canvas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!image)
                            throw new Error("image was not provided!");
                        return [4 /*yield*/, this.loadImage(image)];
                    case 1:
                        img = _b.sent();
                        _a = this.loadImage;
                        return [4 /*yield*/, Util_1.Util.assets.image("AFFECT")];
                    case 2: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 3:
                        bg = _b.sent();
                        canvas = new CanvasBuilder2D_1.CanvasBuilder2D(bg.width, bg.height).drawImage(bg, 0, 0).drawImage(img, 180, 383, 200, 157);
                        return [2 /*return*/, canvas.toBufferAsync(this.mimeType)];
                }
            });
        });
    };
    MemeCanvas.prototype.jail = function (image, greyscale) {
        if (greyscale === void 0) { greyscale = false; }
        return __awaiter(this, void 0, void 0, function () {
            var img, _a, _b, bg, _c, canvas;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!image)
                            throw new Error("image was not provided!");
                        _a = this.loadImage;
                        if (!greyscale) return [3 /*break*/, 2];
                        return [4 /*yield*/, canvasUtils.greyscale(image)];
                    case 1:
                        _b = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = image;
                        _d.label = 3;
                    case 3: return [4 /*yield*/, _a.apply(this, [_b])];
                    case 4:
                        img = _d.sent();
                        _c = this.loadImage;
                        return [4 /*yield*/, Util_1.Util.assets.image("JAIL")];
                    case 5: return [4 /*yield*/, _c.apply(this, [_d.sent()])];
                    case 6:
                        bg = _d.sent();
                        canvas = new CanvasBuilder2D_1.CanvasBuilder2D(350, 350);
                        canvas.drawImage(img, 0, 0, canvas.width, canvas.height);
                        canvas.drawImage(bg, 0, 0, canvas.width, canvas.height);
                        return [2 /*return*/, canvas.toBufferAsync(this.mimeType)];
                }
            });
        });
    };
    MemeCanvas.prototype.bed = function (image1, image2) {
        return __awaiter(this, void 0, void 0, function () {
            var avatar, avatar1, background, _a, canvas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!image1)
                            throw new Error("First image was not provided!");
                        if (!image2)
                            throw new Error("Second image was not provided!");
                        return [4 /*yield*/, this.loadImage(image1)];
                    case 1:
                        avatar = _b.sent();
                        return [4 /*yield*/, this.loadImage(image2)];
                    case 2:
                        avatar1 = _b.sent();
                        _a = this.loadImage;
                        return [4 /*yield*/, Util_1.Util.assets.image("BED")];
                    case 3: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 4:
                        background = _b.sent();
                        canvas = new CanvasBuilder2D_1.CanvasBuilder2D(background.width, background.height);
                        canvas.drawImage(background, 0, 0, canvas.width, canvas.height);
                        canvas.drawImage(avatar, 25, 100, 100, 100);
                        canvas.drawImage(avatar, 25, 300, 100, 100);
                        canvas.drawImage(avatar, 53, 450, 70, 70);
                        canvas.drawImage(avatar1, 53, 575, 100, 100);
                        return [2 /*return*/, canvas.toBufferAsync(this.mimeType)];
                }
            });
        });
    };
    MemeCanvas.prototype.delete = function (image, dark) {
        if (dark === void 0) { dark = false; }
        return __awaiter(this, void 0, void 0, function () {
            var img, bg, _a, _b, _c, _d, canvas;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!image)
                            throw new Error("image was not provided!");
                        return [4 /*yield*/, this.loadImage(image)];
                    case 1:
                        img = _e.sent();
                        _a = this.loadImage;
                        if (!dark) return [3 /*break*/, 4];
                        _d = (_c = canvasUtils).invert;
                        return [4 /*yield*/, Util_1.Util.assets.image("DELETE")];
                    case 2: return [4 /*yield*/, _d.apply(_c, [_e.sent()])];
                    case 3:
                        _b = _e.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, Util_1.Util.assets.image("DELETE")];
                    case 5:
                        _b = _e.sent();
                        _e.label = 6;
                    case 6: return [4 /*yield*/, _a.apply(this, [_b])];
                    case 7:
                        bg = _e.sent();
                        canvas = new CanvasBuilder2D_1.CanvasBuilder2D(bg.width, bg.height);
                        canvas.drawImage(bg, 0, 0, canvas.width, canvas.height);
                        canvas.drawImage(img, 120, 135, 195, 195);
                        return [2 /*return*/, canvas.toBufferAsync(this.mimeType)];
                }
            });
        });
    };
    MemeCanvas.prototype.wanted = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            var img, bg, _a, canvas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!image)
                            throw new Error("image was not provided!");
                        return [4 /*yield*/, this.loadImage(image)];
                    case 1:
                        img = _b.sent();
                        _a = this.loadImage;
                        return [4 /*yield*/, Util_1.Util.assets.image("WANTED")];
                    case 2: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 3:
                        bg = _b.sent();
                        canvas = new CanvasBuilder2D_1.CanvasBuilder2D(bg.width, bg.height);
                        canvas.drawImage(bg, 0, 0, canvas.width, canvas.height);
                        canvas.drawImage(img, 145, 282, 447, 447);
                        return [2 /*return*/, canvas.toBufferAsync(this.mimeType)];
                }
            });
        });
    };
    MemeCanvas.prototype.wasted = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            var img, _a, bg, _b, canvas;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!image)
                            throw new Error("image was not provided!");
                        _a = this.loadImage;
                        return [4 /*yield*/, canvasUtils.greyscale(image)];
                    case 1: return [4 /*yield*/, _a.apply(this, [_c.sent()])];
                    case 2:
                        img = _c.sent();
                        _b = this.loadImage;
                        return [4 /*yield*/, Util_1.Util.assets.image("WASTED")];
                    case 3: return [4 /*yield*/, _b.apply(this, [_c.sent()])];
                    case 4:
                        bg = _c.sent();
                        canvas = new CanvasBuilder2D_1.CanvasBuilder2D(512, 512);
                        canvas.drawImage(img, 0, 0, canvas.width, canvas.height);
                        canvas.drawImage(bg, 0, 0, canvas.width, canvas.height);
                        return [2 /*return*/, canvas.toBufferAsync(this.mimeType)];
                }
            });
        });
    };
    MemeCanvas.prototype.shit = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            var img, _a, bg, _b, canvas;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!image)
                            throw new Error("image was not provided!");
                        _a = this.loadImage;
                        return [4 /*yield*/, canvasUtils.circle(image)];
                    case 1: return [4 /*yield*/, _a.apply(this, [_c.sent()])];
                    case 2:
                        img = _c.sent();
                        _b = this.loadImage;
                        return [4 /*yield*/, Util_1.Util.assets.image("SHIT")];
                    case 3: return [4 /*yield*/, _b.apply(this, [_c.sent()])];
                    case 4:
                        bg = _c.sent();
                        canvas = new CanvasBuilder2D_1.CanvasBuilder2D(bg.width, bg.height);
                        canvas.drawImage(bg, 0, 0, canvas.width, canvas.height);
                        canvas.drawImage(img, 210, 700, 170, 170);
                        return [2 /*return*/, canvas.toBufferAsync(this.mimeType)];
                }
            });
        });
    };
    return MemeCanvas;
}(BaseCanvas_1.BaseCanvas));
exports.MemeCanvas = MemeCanvas;

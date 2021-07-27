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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemeCanvas = void 0;
const BaseCanvas_1 = require("./BaseCanvas");
const gifencoder_1 = __importDefault(require("gifencoder"));
const Util_1 = require("../Utils/Util");
const UtilityCanvas_1 = require("./UtilityCanvas");
const CanvasBuilder2D_1 = require("./CanvasBuilder2D");
const canvasUtils = new UtilityCanvas_1.UtilityCanvas();
class MemeCanvas extends BaseCanvas_1.BaseCanvas {
    trigger(image) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image)
                throw new Error("no image was provided");
            const img = yield this.loadImage(image);
            const base = yield this.loadImage(yield Util_1.Util.assets.image("TRIGGERED"));
            const GIF = new gifencoder_1.default(256, 310);
            GIF.start();
            GIF.setRepeat(0);
            GIF.setDelay(15);
            const canvas = new CanvasBuilder2D_1.CanvasBuilder2D(256, 310);
            const BR = 30;
            const LR = 20;
            let i = 0;
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
            return GIF.out.getData();
        });
    }
    triggered(image) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.trigger(image);
        });
    }
    kiss(image1, image2) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image1)
                throw new Error("First image was not provided!");
            if (!image2)
                throw new Error("Second image was not provided!");
            const background = yield this.loadImage(yield Util_1.Util.assets.image("KISS"));
            const avatar = yield this.loadImage(image1);
            const avatar1 = yield this.loadImage(image2);
            const canvas = new CanvasBuilder2D_1.CanvasBuilder2D(background.width, background.height);
            canvas.drawImage(background, 0, 0, canvas.width, canvas.height);
            canvas.drawImage(avatar1, 370, 25, 200, 200);
            canvas.drawImage(avatar, 150, 25, 200, 200);
            return canvas.toBufferAsync(this.mimeType);
        });
    }
    spank(image1, image2) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image1)
                throw new Error("First image was not provided!");
            if (!image2)
                throw new Error("Second image was not provided!");
            const background = yield this.loadImage(yield Util_1.Util.assets.image("SPANK"));
            const avatar = yield this.loadImage(image1);
            const avatar1 = yield this.loadImage(image2);
            const canvas = new CanvasBuilder2D_1.CanvasBuilder2D(500, 500);
            canvas.drawImage(background, 0, 0, canvas.width, canvas.height);
            canvas.drawImage(avatar1, 350, 220, 120, 120);
            canvas.drawImage(avatar, 225, 5, 140, 140);
            return canvas.toBufferAsync(this.mimeType);
        });
    }
    slap(image1, image2) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image1)
                throw new Error("First image was not provided!");
            if (!image2)
                throw new Error("Second image was not provided!");
            const background = yield this.loadImage(yield Util_1.Util.assets.image("BATSLAP"));
            const avatar = yield this.loadImage(image1);
            const avatar1 = yield this.loadImage(image2);
            const canvas = new CanvasBuilder2D_1.CanvasBuilder2D(1000, 500);
            canvas.drawImage(background, 0, 0, canvas.width, canvas.height);
            canvas.drawImage(avatar1, 580, 260, 200, 200);
            canvas.drawImage(avatar, 350, 70, 220, 220);
            return canvas.toBufferAsync(this.mimeType);
        });
    }
    beautiful(image) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image)
                throw new Error("Image was not provided!");
            const img = yield this.loadImage(image);
            const base = yield this.loadImage(yield Util_1.Util.assets.image("BEAUTIFUL"));
            const canvas = new CanvasBuilder2D_1.CanvasBuilder2D(376, 400);
            canvas.drawImage(base, 0, 0, canvas.width, canvas.height);
            canvas.drawImage(img, 258, 28, 84, 95);
            canvas.drawImage(img, 258, 229, 84, 95);
            return canvas.toBufferAsync(this.mimeType);
        });
    }
    facepalm(image) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image)
                throw new Error("image was not provided!");
            const layer = yield this.loadImage(yield Util_1.Util.assets.image("FACEPALM"));
            const avatar = yield this.loadImage(image);
            const canvas = new CanvasBuilder2D_1.CanvasBuilder2D(632, 357).setColorFill("black").drawRect(0, 0, 632, 357).drawImage(avatar, 199, 112, 235, 235).drawImage(layer, 0, 0, 632, 357);
            return canvas.toBufferAsync(this.mimeType);
        });
    }
    rainbow(image) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image)
                throw new Error("image was not provided!");
            const bg = yield this.loadImage(yield Util_1.Util.assets.image("GAY"));
            const img = yield this.loadImage(image);
            const canvas = new CanvasBuilder2D_1.CanvasBuilder2D(img.width, img.height);
            canvas.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.drawImage(bg, 0, 0, canvas.width, canvas.height);
            return canvas.toBufferAsync(this.mimeType);
        });
    }
    rip(image) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image)
                throw new Error("Image was not provided!");
            const img = yield this.loadImage(image);
            const bg = yield this.loadImage(yield Util_1.Util.assets.image("RIP"));
            const canvas = new CanvasBuilder2D_1.CanvasBuilder2D(244, 253);
            canvas.drawImage(bg, 0, 0, canvas.width, canvas.height);
            canvas.drawImage(img, 63, 110, 90, 90);
            return canvas.toBufferAsync(this.mimeType);
        });
    }
    trash(image) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image)
                throw new Error("Image was not provided!");
            const blur = yield canvasUtils.blur(image, 3);
            const img = yield this.loadImage(blur);
            const bg = yield this.loadImage(yield Util_1.Util.assets.image("TRASH"));
            const canvas = new CanvasBuilder2D_1.CanvasBuilder2D(bg.width, bg.height).drawImage(bg, 0, 0).drawImage(img, 309, 0, 309, 309);
            return canvas.toBufferAsync(this.mimeType);
        });
    }
    hitler(image) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image)
                throw new Error("image was not provided!");
            const img = yield this.loadImage(image);
            const bg = yield this.loadImage(yield Util_1.Util.assets.image("HITLER"));
            const canvas = new CanvasBuilder2D_1.CanvasBuilder2D(bg.width, bg.height).drawImage(bg, 0, 0).drawImage(img, 46, 43, 140, 140);
            return canvas.toBufferAsync(this.mimeType);
        });
    }
    jokeOverHead(image) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image)
                throw new Error("Image wasn ot provided!");
            const layer = yield this.loadImage(yield Util_1.Util.assets.image("JOKEOVERHEAD"));
            const img = yield this.loadImage(image);
            const canvas = new CanvasBuilder2D_1.CanvasBuilder2D(425, 404).setColorFill("black").drawRect(0, 0, 425, 404).drawImage(img, 125, 130, 140, 135).drawImage(layer, 0, 0, 425, 404);
            return canvas.toBufferAsync(this.mimeType);
        });
    }
    distracted(image1, image2, image3 = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image1)
                throw new Error("First image was not provided!");
            if (!image2)
                throw new Error("Second image was not provided!");
            const background = yield this.loadImage(yield Util_1.Util.assets.image("DISTRACTED"));
            const avatar1 = yield this.loadImage(yield canvasUtils.circle(image1));
            const avatar2 = yield this.loadImage(yield canvasUtils.circle(image2));
            const avatar3 = image3 ? yield this.loadImage(yield canvasUtils.circle(image3)) : null;
            const canvas = new CanvasBuilder2D_1.CanvasBuilder2D(background.width, background.height);
            canvas.drawImage(background, 0, 0, canvas.width, canvas.height);
            canvas.drawImage(avatar1, 180, 90, 150, 150);
            canvas.drawImage(avatar2, 480, 35, 130, 130);
            if (avatar3)
                canvas.drawImage(avatar3, 730, 110, 130, 130);
            return canvas.toBufferAsync(this.mimeType);
        });
    }
    affect(image) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image)
                throw new Error("image was not provided!");
            const img = yield this.loadImage(image);
            const bg = yield this.loadImage(yield Util_1.Util.assets.image("AFFECT"));
            const canvas = new CanvasBuilder2D_1.CanvasBuilder2D(bg.width, bg.height).drawImage(bg, 0, 0).drawImage(img, 180, 383, 200, 157);
            return canvas.toBufferAsync(this.mimeType);
        });
    }
    jail(image, greyscale = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image)
                throw new Error("image was not provided!");
            const img = yield this.loadImage(greyscale ? yield canvasUtils.greyscale(image) : image);
            const bg = yield this.loadImage(yield Util_1.Util.assets.image("JAIL"));
            const canvas = new CanvasBuilder2D_1.CanvasBuilder2D(350, 350);
            canvas.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.drawImage(bg, 0, 0, canvas.width, canvas.height);
            return canvas.toBufferAsync(this.mimeType);
        });
    }
    bed(image1, image2) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image1)
                throw new Error("First image was not provided!");
            if (!image2)
                throw new Error("Second image was not provided!");
            const avatar = yield this.loadImage(image1);
            const avatar1 = yield this.loadImage(image2);
            const background = yield this.loadImage(yield Util_1.Util.assets.image("BED"));
            const canvas = new CanvasBuilder2D_1.CanvasBuilder2D(background.width, background.height);
            canvas.drawImage(background, 0, 0, canvas.width, canvas.height);
            canvas.drawImage(avatar, 25, 100, 100, 100);
            canvas.drawImage(avatar, 25, 300, 100, 100);
            canvas.drawImage(avatar, 53, 450, 70, 70);
            canvas.drawImage(avatar1, 53, 575, 100, 100);
            return canvas.toBufferAsync(this.mimeType);
        });
    }
    delete(image, dark = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image)
                throw new Error("image was not provided!");
            const img = yield this.loadImage(image);
            const bg = yield this.loadImage(dark ? yield canvasUtils.invert(yield Util_1.Util.assets.image("DELETE")) : yield Util_1.Util.assets.image("DELETE"));
            const canvas = new CanvasBuilder2D_1.CanvasBuilder2D(bg.width, bg.height);
            canvas.drawImage(bg, 0, 0, canvas.width, canvas.height);
            canvas.drawImage(img, 120, 135, 195, 195);
            return canvas.toBufferAsync(this.mimeType);
        });
    }
    wanted(image) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image)
                throw new Error("image was not provided!");
            const img = yield this.loadImage(image);
            const bg = yield this.loadImage(yield Util_1.Util.assets.image("WANTED"));
            const canvas = new CanvasBuilder2D_1.CanvasBuilder2D(bg.width, bg.height);
            canvas.drawImage(bg, 0, 0, canvas.width, canvas.height);
            canvas.drawImage(img, 145, 282, 447, 447);
            return canvas.toBufferAsync(this.mimeType);
        });
    }
    wasted(image) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image)
                throw new Error("image was not provided!");
            const img = yield this.loadImage(yield canvasUtils.greyscale(image));
            const bg = yield this.loadImage(yield Util_1.Util.assets.image("WASTED"));
            const canvas = new CanvasBuilder2D_1.CanvasBuilder2D(512, 512);
            canvas.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.drawImage(bg, 0, 0, canvas.width, canvas.height);
            return canvas.toBufferAsync(this.mimeType);
        });
    }
    shit(image) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image)
                throw new Error("image was not provided!");
            const img = yield this.loadImage(yield canvasUtils.circle(image));
            const bg = yield this.loadImage(yield Util_1.Util.assets.image("SHIT"));
            const canvas = new CanvasBuilder2D_1.CanvasBuilder2D(bg.width, bg.height);
            canvas.drawImage(bg, 0, 0, canvas.width, canvas.height);
            canvas.drawImage(img, 210, 700, 170, 170);
            return canvas.toBufferAsync(this.mimeType);
        });
    }
}
exports.MemeCanvas = MemeCanvas;

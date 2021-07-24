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
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImage = exports.loadImage = void 0;
const canvas_1 = require("@napi-rs/canvas");
const fs_1 = require("fs");
const node_fetch_1 = __importDefault(require("node-fetch"));
function loadImage(source, createSkImage = true) {
    return __awaiter(this, void 0, void 0, function* () {
        if (source instanceof canvas_1.Image) return createSkImage ? source : source.src;
        if (typeof source === "string" && fs_1.existsSync(source)) {
            const data = yield fs_1.promises.readFile(source);
            return createSkImage ? createImage(data) : data;
        } else if (typeof source === "string") {
            const res = yield node_fetch_1.default(source);
            if (!res.ok) throw new Error(`Server responded with status ${res.status}`);
            const data = yield res.buffer();
            return createSkImage ? createImage(data) : data;
        } else {
            return createSkImage ? createImage(source) : source;
        }
    });
}
exports.loadImage = loadImage;
function createImage(src) {
    const imageConstructor = new canvas_1.Image();
    imageConstructor.src = src;
    return imageConstructor;
}
exports.createImage = createImage;

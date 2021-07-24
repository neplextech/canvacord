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
exports.Util = void 0;
const emoji_parser_1 = require("@canvacord/emoji-parser");
const assets_1 = __importDefault(require("@canvacord/assets"));
const loadImage_1 = require("./loadImage");
const weird_to_normal_chars_1 = require("weird-to-normal-chars");
/**
 * Canvacord Utils
 */
class Util {
    constructor() {
        throw new Error("Cannot instantiate util");
    }
    static createImage(src) {
        loadImage_1.createImage(src);
    }
    /**
     * Renders emoji in canvas
     * @param ctx Canvas rendering context
     * @param message message to render
     * @param x x co-ordinate
     * @param y y co-ordinate
     */
    static renderEmoji(ctx, message, x, y) {
        // @todo: fix this
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return emoji_parser_1.fillTextWithTwemoji(ctx, message, x, y);
    }
    /**
     * Abbreviate the given number
     * @param num The number to abbreviate
     */
    static toAbbrev(num) {
        if (!num || isNaN(num)) return "0";
        if (typeof num === "string") num = parseInt(num);
        const decPlaces = Math.pow(10, 1);
        const abbrev = ["K", "M", "B", "T"];
        let dat = "";
        for (let i = abbrev.length - 1; i >= 0; i--) {
            const size = Math.pow(10, (i + 1) * 3);
            if (size <= num) {
                num = Math.round((num * decPlaces) / size) / decPlaces;
                if (num == 1000 && i < abbrev.length - 1) {
                    num = 1;
                    i++;
                }
                dat = `${num}${abbrev[i]}`;
                break;
            }
        }
        return dat;
    }
    static get assets() {
        return {
            font(name) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (!assets_1.default.font.loaded) yield assets_1.default.font.load();
                    return assets_1.default.font.get(name);
                });
            },
            image(name) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (!assets_1.default.image.loaded) yield assets_1.default.image.load();
                    return assets_1.default.image.get(name);
                });
            }
        };
    }
    static cleanText(text) {
        return weird_to_normal_chars_1.weirdToNormalChars(text);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static is(prop, propType) {
        if (propType === "array") return Array.isArray(prop);
        return typeof prop === propType;
    }
    static streamToBuffer(stream) {
        return new Promise((resolve, reject) => {
            const d = [];
            stream.on("data", (chunk) => d.push(chunk));
            stream.on("error", reject);
            stream.on("end", () => resolve(Buffer.concat(d)));
        });
    }
    static noop() {} // eslint-disable-line @typescript-eslint/no-empty-function
}
exports.Util = Util;
Util.loadImage = loadImage_1.loadImage;

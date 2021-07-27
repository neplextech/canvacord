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
exports.Util = void 0;
var emoji_parser_1 = require("@canvacord/emoji-parser");
var assets_1 = __importDefault(require("@canvacord/assets"));
var loadImage_1 = require("./loadImage");
var weird_to_normal_chars_1 = require("weird-to-normal-chars");
/**
 * Canvacord Utils
 */
var Util = /** @class */ (function () {
    function Util() {
        throw new Error("Cannot instantiate util");
    }
    Util.createImage = function (src) {
        loadImage_1.createImage(src);
    };
    /**
     * Renders emoji in canvas
     * @param ctx Canvas rendering context
     * @param message message to render
     * @param x x co-ordinate
     * @param y y co-ordinate
     */
    Util.renderEmoji = function (ctx, message, x, y) {
        // @todo: fix this
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return emoji_parser_1.fillTextWithTwemoji(ctx, message, x, y);
    };
    /**
     * Abbreviate the given number
     * @param num The number to abbreviate
     */
    Util.toAbbrev = function (num) {
        if (!num || isNaN(num))
            return "0";
        if (typeof num === "string")
            num = parseInt(num);
        var decPlaces = Math.pow(10, 1);
        var abbrev = ["K", "M", "B", "T"];
        var dat = "";
        for (var i = abbrev.length - 1; i >= 0; i--) {
            var size = Math.pow(10, (i + 1) * 3);
            if (size <= num) {
                num = Math.round((num * decPlaces) / size) / decPlaces;
                if (num == 1000 && i < abbrev.length - 1) {
                    num = 1;
                    i++;
                }
                dat = "" + num + abbrev[i];
                break;
            }
        }
        return dat;
    };
    Object.defineProperty(Util, "assets", {
        get: function () {
            return {
                font: function (name) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!assets_1.default.font.loaded) return [3 /*break*/, 2];
                                    return [4 /*yield*/, assets_1.default.font.load()];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/, assets_1.default.font.get(name)];
                            }
                        });
                    });
                },
                image: function (name) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!assets_1.default.image.loaded) return [3 /*break*/, 2];
                                    return [4 /*yield*/, assets_1.default.image.load()];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/, assets_1.default.image.get(name)];
                            }
                        });
                    });
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    Util.cleanText = function (text) {
        return weird_to_normal_chars_1.weirdToNormalChars(text);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Util.is = function (prop, propType) {
        if (propType === "array")
            return Array.isArray(prop);
        return typeof prop === propType;
    };
    Util.streamToBuffer = function (stream) {
        return new Promise(function (resolve, reject) {
            var d = [];
            stream.on("data", function (chunk) { return d.push(chunk); });
            stream.on("error", reject);
            stream.on("end", function () { return resolve(Buffer.concat(d)); });
        });
    };
    Util.noop = function () { }; // eslint-disable-line @typescript-eslint/no-empty-function
    Util.loadImage = loadImage_1.loadImage;
    return Util;
}());
exports.Util = Util;

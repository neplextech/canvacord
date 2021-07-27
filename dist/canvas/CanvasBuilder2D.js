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
exports.CanvasBuilder2D = exports.BuilderReadyState = void 0;
var BaseCanvas_1 = require("./BaseCanvas");
var BuilderReadyState;
(function (BuilderReadyState) {
    BuilderReadyState[BuilderReadyState["NOT_READY"] = 0] = "NOT_READY";
    BuilderReadyState[BuilderReadyState["READY"] = 1] = "READY";
})(BuilderReadyState = exports.BuilderReadyState || (exports.BuilderReadyState = {}));
var CanvasBuilder2D = /** @class */ (function (_super) {
    __extends(CanvasBuilder2D, _super);
    function CanvasBuilder2D(width, height, autoInstance) {
        if (autoInstance === void 0) { autoInstance = true; }
        var _this = _super.call(this) || this;
        _this.width = width;
        _this.height = height;
        _this.engine = "skia";
        if (autoInstance)
            _this.instantiate();
        return _this;
    }
    Object.defineProperty(CanvasBuilder2D.prototype, "canvas", {
        get: function () {
            var _a;
            return (_a = this._canvas) !== null && _a !== void 0 ? _a : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CanvasBuilder2D.prototype, "ctx", {
        get: function () {
            var _a;
            return (_a = this._ctx) !== null && _a !== void 0 ? _a : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CanvasBuilder2D.prototype, "readyState", {
        get: function () {
            if (this._canvas && this._ctx)
                return BuilderReadyState.READY;
            return BuilderReadyState.NOT_READY;
        },
        enumerable: false,
        configurable: true
    });
    CanvasBuilder2D.prototype.instantiate = function () {
        if (this._canvas)
            return this;
        var _a = this.makeCanvas(this.width, this.height), canvas = _a.canvas, ctx = _a.ctx;
        this._canvas = canvas;
        this._ctx = ctx;
        return this;
    };
    CanvasBuilder2D.prototype.drawImage = function (image, dx, dy, dw, dh) {
        if (typeof dw !== "number" && typeof dh !== "number")
            this._ctx.drawImage(image, dx, dy);
        else
            this._ctx.drawImage(image, dx, dy, dw, dh);
        return this;
    };
    CanvasBuilder2D.prototype.clearRect = function (x, y, w, h) {
        this._ctx.clearRect(x, y, w, h);
        return this;
    };
    CanvasBuilder2D.prototype.drawRect = function (x, y, width, height) {
        this._ctx.fillRect(x, y, width, height);
        return this;
    };
    CanvasBuilder2D.prototype.strokeRect = function (x, y, width, height) {
        this._ctx.strokeRect(x, y, width, height);
        return this;
    };
    CanvasBuilder2D.prototype.setColorFill = function (color) {
        this._ctx.fillStyle = color;
        return this;
    };
    CanvasBuilder2D.prototype.setColorStroke = function (color) {
        this._ctx.strokeStyle = color;
        return this;
    };
    CanvasBuilder2D.prototype.toBuffer = function (format) {
        if (format)
            this.mimeType = format;
        return this.buildImageSync(this.canvas);
    };
    CanvasBuilder2D.prototype.toBufferAsync = function (format) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (format)
                            this.mimeType = format;
                        return [4 /*yield*/, this.buildImage(this.canvas)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CanvasBuilder2D.prototype.save = function () {
        this._ctx.save();
        return this;
    };
    CanvasBuilder2D.prototype.restore = function () {
        this._ctx.restore();
        return this;
    };
    CanvasBuilder2D.prototype.valueOf = function () {
        return {
            canvas: this._canvas,
            ctx: this._ctx
        };
    };
    CanvasBuilder2D.prototype.toString = function () {
        return "<CanvasBuilder2D " + this.width + "x" + this.height + ">";
    };
    return CanvasBuilder2D;
}(BaseCanvas_1.BaseCanvas));
exports.CanvasBuilder2D = CanvasBuilder2D;

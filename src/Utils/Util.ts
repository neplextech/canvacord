import { fillTextWithTwemoji } from "@canvacord/emoji-parser";
import Assets from "@canvacord/assets";
import { loadImage, createImage } from "./loadImage";
import { SKRSContext2D as CanvasRenderingContext2D } from "@napi-rs/canvas";
import { weirdToNormalChars } from "weird-to-normal-chars";
import type { Readable } from "stream";

/**
 * Canvacord Utils
 */
export class Util {
    public static loadImage = loadImage;

    constructor() {
        throw new Error("Cannot instantiate util");
    }

    public static createImage(src: Buffer) {
        createImage(src);
    }

    /**
     * Renders emoji in canvas
     * @param ctx Canvas rendering context
     * @param message message to render
     * @param x x co-ordinate
     * @param y y co-ordinate
     */
    public static renderEmoji(ctx: CanvasRenderingContext2D, message: string, x: number, y: number) {
        // @todo: fix this
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return fillTextWithTwemoji(ctx, message, x, y);
    }

    /**
     * Abbreviate the given number
     * @param num The number to abbreviate
     */
    public static toAbbrev(num: number) {
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

    public static get assets() {
        return {
            async font(name: string) {
                if (!Assets.font.loaded) await Assets.font.load();
                return Assets.font.get(name);
            },
            async image(name: string) {
                if (!Assets.image.loaded) await Assets.image.load();
                return Assets.image.get(name);
            }
        };
    }

    public static get assetsSync() {
        return {
            font(name: string) {
                if (!Assets.font.loaded) Assets.font.loadSync();
                return Assets.font.get(name);
            },
            image(name: string) {
                if (!Assets.image.loaded) Assets.image.loadSync();
                return Assets.image.get(name);
            }
        };
    }

    public static cleanText(text: string) {
        return weirdToNormalChars(text);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static is(prop: any, propType: string) {
        if (propType === "array") return Array.isArray(prop);
        return typeof prop === propType;
    }

    public static streamToBuffer(stream: Readable): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const d: Buffer[] = [];

            stream.on("data", (chunk) => d.push(chunk));
            stream.on("error", reject);
            stream.on("end", () => resolve(Buffer.concat(d)));
        });
    }

    public static noop() {} // eslint-disable-line @typescript-eslint/no-empty-function

    public static hexToRGBA(hex: string, alpha: number, stringify: true): string;
    public static hexToRGBA(hex: string, alpha: number, stringify: false | undefined): { r: number; g: number; b: number; a: number };
    public static hexToRGBA(hex: string, alpha?: number, stringify = false): string | { r: number; g: number; b: number; a: number } {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        const final = result
            ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16),
                  a: alpha ?? 1
              }
            : null;

        if (!stringify) return final;
        return `rgba(${final.r}, ${final.g}, ${final.b}, ${final.a})`;
    }
}

import sharp from "sharp";

type optNum = number | undefined;

function fmtImage(converter: sharp.Sharp, format?: keyof sharp.FormatEnum) {
    if (format) converter.toFormat(format);
    return converter.toBuffer();
}

export function loadImage(image: string | Buffer, format?: keyof sharp.FormatEnum) {
    const converter = sharp(image);
    if (format) converter.toFormat(format);
    return converter.toBuffer();
}

export function resizeImage(image: string | Buffer, width: number, height: number, format?: keyof sharp.FormatEnum) {
    return fmtImage(sharp(image).resize(width, height), format);
}

export function rotateImage(image: string | Buffer, angle: number, format?: keyof sharp.FormatEnum) {
    return fmtImage(sharp(image).rotate(angle), format);
}

export function blurImage(image: string | Buffer, intensity: optNum = undefined, format?: keyof sharp.FormatEnum) {
    return fmtImage(sharp(image).blur(intensity), format);
}

export function compositeImage(image: string | Buffer, options: sharp.OverlayOptions[], format?: keyof sharp.FormatEnum) {
    return fmtImage(sharp(image).composite(options), format);
}

export function flattenImage(image: string | Buffer, flatten: boolean | undefined | sharp.FlattenOptions = undefined, format?: keyof sharp.FormatEnum) {
    return fmtImage(sharp(image).flatten(flatten), format);
}

export function flipImage(image: string | Buffer, format?: keyof sharp.FormatEnum) {
    return fmtImage(sharp(image).flip(), format);
}

export function flopImage(image: string | Buffer, format?: keyof sharp.FormatEnum) {
    return fmtImage(sharp(image).flop(), format);
}

// Functions which might be useful in future.
// Only add functions which is useful for the core package.

// export function extendImage(image: string | Buffer, options: sharp.ExtendOptions, format?: keyof sharp.FormatEnum) {
//     return fmtImage(sharp(image).extend(options), format);
// }

// export function extractImage(image: string | Buffer, options: sharp.Region, format?: keyof sharp.FormatEnum) {
//     return fmtImage(sharp(image).extract(options), format);
// }

// export function sharpenImage(image: string | Buffer, sigma: optNum = undefined, flat: optNum = undefined, jagged: optNum = undefined, format?: keyof sharp.FormatEnum) {
//     return fmtImage(sharp(image).sharpen(sigma, flat, jagged), format);
// }

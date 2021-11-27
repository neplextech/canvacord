import sharp from "sharp";

export default function loadImage(image: string | Buffer, format?: keyof sharp.FormatEnum) {
    const converter = sharp(image);
    if (format) converter.toFormat(format);
    return converter.toBuffer();
}
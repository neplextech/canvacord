import sharp from "sharp";

export default function resizeImage(
    image: string | Buffer, 
    width: number, 
    height: number, 
    format?: keyof sharp.FormatEnum
) {
    const converter = sharp(image).resize(width, height);
    if (format) converter.toFormat(format);
    return converter.toBuffer();
}
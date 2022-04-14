import type { Readable } from "stream";

/**
 * Converts `Readable` stream into `Buffer` object
 * @param stream The stream to convert to Buffer
 * @returns {Promise<Buffer>}
 */
export function streamBuffer(stream: Readable) {
    return new Promise<Buffer>((resolve, reject) => {
        const chunks: Buffer[] = [];

        stream
            .on("data", (chunk: Buffer) => chunks.push(chunk))
            .once("error", (err: Error) => reject(err))
            .once("end", () => resolve(Buffer.concat(chunks)));
    });
}
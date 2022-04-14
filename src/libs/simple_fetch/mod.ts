import https from "https";
import http from "http";
import { Buffer } from "buffer";
import { URL } from "url";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import { streamBuffer } from "../stream_buffer/mod";

/**
 * Makes simple `GET` request
 * @param url The url to send request to
 * @returns {Promise<Buffer>}
 */
export async function request(url: string | URL) {
    if (!(url instanceof URL)) url = new URL(url);

    if (existsSync(url) || url.protocol === "file:") return await readFile(url);

    if (typeof fetch === "function") {
        return await fetch(url, {
            redirect: "follow"
        })
            .then(async res => {
                if (!res.ok) throw new Error(`Request to ${(url as URL).href} rejected with status code "${res.status}"`);
                return Buffer.from(await res.arrayBuffer());
            });
    }

    if (!["http:", "https:"].includes(url.protocol)) throw new Error(`Unsupported protocol ${url.protocol}`);

    const lib = url.protocol === "https:" ? https : http;

    return new Promise<Buffer>((resolve, reject) => {
        lib.get(url, async (response) => {
            if (typeof response.statusCode === "number" && response.statusCode >= 200 && response.statusCode <= 299) {
                const data = await streamBuffer(response);
                return resolve(data);
            }

            reject(new Error(`Request to "${(url as URL).href}" rejected with status code "${response.statusCode}"`));
        });
    });
}
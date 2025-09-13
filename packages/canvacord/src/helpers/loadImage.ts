// https://github.com/Brooooooklyn/canvas/blob/db81050f0f2064b4b544575db9db318ab5847d33/load-image.js

import { Readable } from "stream";
import * as fs from "fs";
import { CanvacordImage } from "./image";
import * as fileType from "file-type";
import { Image } from "@napi-rs/canvas";
import { buffer } from "stream/consumers";
import { OutputType, decodeImage } from "./decoder";

// biome-ignore lint: declare variables separately
let http: typeof import("http"), https: typeof import("https");

// biome-ignore lint: declare variables separately
const MAX_REDIRECTS = 20,
  REDIRECT_STATUSES = new Set([301, 302]),
  DATA_URI = /^\s*data:/;

const NEEDS_TRANSFORMATION = [
  "image/webp",
  "image/gif",
  "image/bmp",
  "image/icns",
  "image/tiff",
  "image/avif",
];

/**
 * The supported image sources. It can be a buffer, a readable stream, a string, a URL instance or an Image instance.
 */
export type ImageSource =
  | CanvacordImage
  | Buffer
  | ArrayBuffer
  | Uint16Array
  | Uint32Array
  | Uint8Array
  | Uint8ClampedArray
  | SharedArrayBuffer
  | Readable
  | string
  | URL
  | Image;

/**
 * The options for loading an image.
 */
export interface LoadImageOptions {
  /**
   * The headers to use when downloading the image.
   */
  headers?: Record<string, string>;
  /**
   * The maximum number of redirects to follow.
   */
  maxRedirects?: number;
  /**
   * Other request options to use when downloading the image.
   */
  requestOptions?: import("http").RequestOptions;
}

/**
 * Loads an image from the specified source.
 * @param source The image source
 * @param [options] The options for loading the image
 */
export async function loadImage(
  source: ImageSource,
  options: LoadImageOptions = {}
) {
  // load canvacord image
  if (source instanceof CanvacordImage) return source;
  // load readable stream as image
  if (source instanceof Readable) return createImage(await buffer(source));
  // use the same buffer without copying if the source is a buffer
  if (Buffer.isBuffer(source)) return createImage(source);
  // construct a buffer if the source is buffer-like
  // @ts-expect-error
  if (isBufferLike(source)) return createImage(Buffer.from(source));
  // if the source is Image instance, copy the image src to new image
  if (source instanceof Image) return createImage(source.src as Buffer);
  // if source is string and in data uri format, construct image using data uri
  if (typeof source === "string" && DATA_URI.test(source)) {
    const commaIdx = source.indexOf(",");
    const encoding =
      source.lastIndexOf("base64", commaIdx) < 0 ? "utf-8" : "base64";
    const data = Buffer.from(source.slice(commaIdx + 1), encoding);
    return createImage(data);
  }
  // if source is a string or URL instance
  if (typeof source === "string" || source instanceof URL) {
    // if the source exists as a file, construct image from that file
    if (await exists(source)) {
      return createImage(await fs.promises.readFile(source));
    }
    if (typeof fetch !== "undefined") {
      return fetch(source, {
        redirect: "follow",
        // @ts-expect-error
        headers: options.requestOptions?.headers,
      }).then(async (res) => {
        if (!res.ok)
          throw new Error(
            `remote source rejected with status code ${res.status}`
          );
        return await createImage(Buffer.from(await res.arrayBuffer()));
      });
    }
    // the source is a remote url here
    // biome-ignore lint: any is tolerated here
    source = source instanceof URL ? source : new URL(source);
    // attempt to download the remote source and construct image
    const data = await new Promise<Buffer>((resolve, reject) =>
      makeRequest(
        source as URL,
        resolve,
        reject,
        typeof options.maxRedirects === "number" && options.maxRedirects >= 0
          ? options.maxRedirects
          : MAX_REDIRECTS,
        options.requestOptions || {}
      )
    );
    return createImage(data);
  }

  // throw error as don't support that source
  throw new TypeError("unsupported image source");
}

function makeRequest(
  url: URL,
  resolve: (res: Buffer) => void,
  reject: (err: unknown) => void,
  redirectCount: number,
  requestOptions: import("http").RequestOptions
) {
  const isHttps = url.protocol === "https:";
  // lazy load the lib
  const lib: typeof import("http") = isHttps
    ? !https
      ? // biome-ignore lint: assignment should not be an expression
        (https = require("https"))
      : https
    : !http
    ? // biome-ignore lint: assignment should not be an expression
      (http = require("http"))
    : http;

  lib
    .get(url.toString(), requestOptions || {}, (res) => {
      const shouldRedirect =
        // biome-ignore lint: forbidden non-null-assertion
        REDIRECT_STATUSES.has(res.statusCode!) &&
        typeof res.headers.location === "string";
      if (shouldRedirect && redirectCount > 0)
        return makeRequest(
          // biome-ignore lint: forbidden non-null-assertion
          new URL(res.headers.location!),
          resolve,
          reject,
          redirectCount - 1,
          requestOptions
        );
      if (
        typeof res.statusCode === "number" &&
        (res.statusCode < 200 || res.statusCode >= 300)
      ) {
        return reject(
          new Error(`remote source rejected with status code ${res.statusCode}`)
        );
      }

      buffer(res).then(resolve, reject);
    })
    .on("error", reject);
}

async function createImage(src: Buffer) {
  const mime = await fileType.fromBuffer(src);
  if (!mime?.mime) throw new Error("failed to load image");

  if (NEEDS_TRANSFORMATION.includes(mime.mime)) {
    const transformed = await decodeImage(src, OutputType.PNG);
    return new CanvacordImage(transformed, "image/png");
  }

  return new CanvacordImage(src, mime.mime);
}

function isBufferLike(src: ImageSource) {
  return (
    // @ts-ignore
    (src && src.type === "Buffer") ||
    Array.isArray(src) ||
    src instanceof ArrayBuffer ||
    src instanceof SharedArrayBuffer ||
    src instanceof Object.getPrototypeOf(Uint8Array)
  );
}

async function exists(path: string | URL) {
  try {
    await fs.promises.access(path, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

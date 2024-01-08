import { AsyncLocalStorage } from "node:async_hooks";
import satori, { type SatoriOptions, type Font } from "satori";
import { FontFactory } from "../assets/AssetsFactory";
import { type CSSPropertiesLike, StyleSheet } from "../helpers";
import { renderSvg, RenderSvgOptions } from "../helpers/image";
import { JSX, Element } from "../helpers/jsx";
import { BuilderOptionsManager } from "./BuilderOptionsManager";
import type { EncodingFormat } from "../canvas";
import type { CSSProperties } from "react";

export type GraphemeProvider = Record<string, string>;

const isEmoji = (str: string) => {
  const emojiRegex = /^[\p{Emoji}]$/u;
  return emojiRegex.test(str);
};

function emojiToUnicode(emoji: string): string {
  if (emoji.length === 1) return emoji.charCodeAt(0).toString(16);
  const comp =
    (emoji.charCodeAt(0) - 0xd800) * 0x400 +
    (emoji.charCodeAt(1) - 0xdc00) +
    0x10000;
  if (comp < 0) return emoji.charCodeAt(0).toString(16);
  return comp.toString(16).toLowerCase();
}

export const createEmojiProvider = (
  builder: (code: string) => string
): GraphemeProvider => {
  const graphemeProvider: GraphemeProvider = {};

  const handler: ProxyHandler<GraphemeProvider> = {
    has(target, p) {
      return isEmoji(p as string) || p in target;
    },
    get(target, prop: string) {
      if (isEmoji(prop)) {
        const code = emojiToUnicode(prop);
        const url = builder(code);

        return url;
      }

      return prop;
    },
  };

  return new Proxy(graphemeProvider, handler);
};

const FluentEmojiBase = (s: string) =>
  `https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/${s}.svg`;

export const BuiltInGraphemeProvider = {
  Twemoji: createEmojiProvider(
    (code: string) =>
      `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${code}.svg`
  ),
  FluentEmojiHighContrast: createEmojiProvider((code) =>
    FluentEmojiBase(`${code}_high-contrast`)
  ),
  FluentEmojiFlat: createEmojiProvider((code) =>
    FluentEmojiBase(`${code}_flat`)
  ),
  FluentEmojiColor: createEmojiProvider((code) =>
    FluentEmojiBase(`${code}_color`)
  ),
  Openmoji: createEmojiProvider(
    (code) =>
      `https://cdn.jsdelivr.net/npm/@svgmoji/openmoji@2.0.0/svg/${code.toUpperCase()}.svg`
  ),
  Noto: createEmojiProvider(
    (code) =>
      `https://cdn.jsdelivr.net/gh/svgmoji/svgmoji/packages/svgmoji__noto/svg/${code.toUpperCase()}.svg`
  ),
  Blobmoji: createEmojiProvider(
    (code) =>
      `https://cdn.jsdelivr.net/npm/@svgmoji/blob@2.0.0/svg/${code.toUpperCase()}.svg`
  ),
  None: {} as GraphemeProvider,
};

export type BuilderBuildInit = Partial<BuilderBuildOptions> & {
  skipSingleCapture?: boolean;
};

export type BuilderResultInner<O extends BuilderBuildInit> =
  O["format"] extends "svg" ? string : Buffer;
export type BuilderResult<O extends BuilderBuildInit> =
  O["skipSingleCapture"] extends true
    ? BuilderResultInner<O>[]
    : BuilderResultInner<O>;

export const EmojiCache = new Map<string, string>();
export const ExecutionContext = new AsyncLocalStorage<Builder>();

/**
 * The builder template.
 */
export interface BuilderTemplate {
  /**
   * The components of this template.
   */
  components: Array<Node | Element>;
  /**
   * The width of this template.
   */
  width: number;
  /**
   * The height of this template.
   */
  height: number;
  /**
   * The style of this template.
   */
  style?: CSSProperties;
}

/**
 * The build output format.
 */
export type BuildFormat = "svg" | "png" | "avif" | "jpeg" | "webp" | "raw";

/**
 * The builder build options.
 */
export type BuilderBuildOptions = {
  /**
   * The output format.
   */
  format?: BuildFormat;
  /**
   * The options for this build.
   */
  options?: RenderSvgOptions;
  /**
   * The abort signal.
   */
  signal?: AbortSignal;
} & SatoriOptions;

/**
 * The builder node.
 */
export interface Node {
  /**
   * Convert this node to element.
   */
  toElement(): Element;
}

export class Builder<
  // biome-ignore lint: we do not know the type of the component
  T extends Record<string, any> = Record<string, unknown>,
  S = unknown
> {
  #style: CSSPropertiesLike = {};
  #state?: S;
  // svg frames
  #frames: string[] = [];
  #renderCalls = 0;
  #iterations = 1;
  #resolve?: () => void;

  /**
   * The tailwind subset to apply to this builder.
   */
  public tw = "";
  /**
   * The components of this builder.
   */
  public components = new Array<Node | Element>();
  /**
   * The options manager of this builder.
   */
  public options = new BuilderOptionsManager<T>();

  /**
   * The grapheme provider of this builder.
   */
  public graphemeProvider: GraphemeProvider = BuiltInGraphemeProvider.Twemoji;

  /**
   * Create a new builder.
   * @param width the width of this builder.
   * @param height the height of this builder.
   */
  public constructor(public width: number, public height: number) {
    this.adjustCanvas();
  }

  /**
   * The total number of iterations of this builder.
   */
  public setIterations(iterations: number) {
    this.#iterations = iterations;
    return this;
  }

  /**
   * Calling this method completes one iteration of this builder.
   */
  private _tick() {
    if (this.#iterations-- <= 0) {
      this.#resolve?.();
    }
  }

  /**
   * The state of this builder.
   */
  public get state() {
    return this.#state as S;
  }

  /**
   * Set the state of this builder.
   */
  public set state(newState: S) {
    this.setState(newState);
  }

  /**
   * Set the state of this builder. Calling this method will re-render the builder and capture the result as a new frame.
   */
  public setState(newState: S, silent = false) {
    // skip setting state if it is the same
    if (Object.is(this.#state, newState)) return;
    this.#state = newState;
    if (!silent) {
      this.#render();
    }
  }

  /**
   * Bootstrap this builder with data.
   */
  public bootstrap(data: T) {
    this.options.setOptions(data);
  }

  /**
   * Adjust the canvas size.
   */
  public adjustCanvas() {
    this.#style = StyleSheet.create({
      root: {
        width: `${this.width}px`,
        height: `${this.height}px`,
      },
    });
    return this;
  }

  /**
   * Get the style of this builder.
   */
  public get style() {
    return this.#style.root;
  }

  /**
   * Set the style of this builder.
   */
  public set style(newStyle: CSSProperties) {
    StyleSheet.compose(this.#style.root, newStyle);
  }

  /**
   * Add component to this builder.
   * @param component the component to add.
   */
  public addComponent<T extends Node | Element>(component: T | T[]) {
    if (
      component instanceof Element &&
      // biome-ignore lint: Function could be a component
      (component.type as unknown as Function) === JSX.Fragment
    )
      // biome-ignore lint: Reassigning is considered
      component = component.children;
    // biome-ignore lint: Reassigning is considered
    if (!Array.isArray(component)) component = [component];
    this.components.push(...component);
    return this;
  }

  /**
   * Set grapheme image provider for this builder.
   */
  public setGraphemeProvider(provider: GraphemeProvider) {
    this.graphemeProvider = provider;
    return this;
  }

  /**
   * Set the style of this builder.
   * @param newStyle the new style.
   */
  public setStyle(newStyle: CSSProperties) {
    StyleSheet.compose(this.#style.root || {}, newStyle || {});
    return this;
  }

  private _render() {
    return this.components.flatMap((component) => {
      if (component == null) return [];
      if (component instanceof Element) return component;
      if (component.toElement) return component.toElement();
      return <span>{String(component)}</span>;
    }) as React.ReactNode[];
  }

  /**
   * Render this builder.
   */
  public async render(): Promise<React.ReactNode> {
    return <div style={this.style}>{this._render()}</div>;
  }

  async #render(options: Partial<BuilderBuildOptions> = {}) {
    if (this.#iterations < 0) return;
    this.#renderCalls++;
    const element = await this.render();

    const fonts = Array.from(FontFactory.values()).map((font) =>
      font.getData()
    );

    const svg = await satori(element, {
      ...options,
      height: this.height,
      width: this.width,
      fonts,
      embedFont: true,
      loadAdditionalAsset: async (languageCode, segment) => {
        const fallback = () =>
          options?.loadAdditionalAsset?.(languageCode, segment) ?? segment;
        if (languageCode === "emoji" && this.graphemeProvider) {
          const cached = EmojiCache.get(segment);
          if (cached) return cached;
          const isSupported = segment in this.graphemeProvider;
          if (!isSupported) return fallback();

          try {
            const url = this.graphemeProvider[segment];
            const response = await fetch(url);
            if (!response.ok) return fallback();
            const svg = await response.arrayBuffer();
            const base64 = `data:image/svg+xml;base64,${Buffer.from(
              svg
            ).toString("base64")}`;
            EmojiCache.set(segment, base64);
            return base64;
          } catch {
            return fallback();
          }
        }

        return fallback();
      },
    });

    this.#frames.push(svg);
    this._tick();
  }

  /**
   * Convert this builder into an image.
   * @param options the build options.
   * @returns the image buffer or svg string.
   */
  public async build<O extends BuilderBuildInit>(
    options: O = {} as O
  ): Promise<BuilderResult<O>> {
    options.format ??= "png";

    await ExecutionContext.run(this, () => {
      // biome-ignore lint:
      return new Promise<void>(async (resolve) => {
        this.#resolve = resolve;
        this.#render({
          ...options,
        });
      });
    });

    const frames = this.#frames;

    if (!frames.length) {
      throw new Error(
        `No frames were rendered, did you forget to implement "render()" in ${this.constructor.name}?`
      );
    }

    this.flush();

    const encoder = (svg: string) => {
      return options?.format === "svg"
        ? svg
        : renderSvg({
            svg,
            format: options.format as EncodingFormat,
            options: options.options,
            signal: options.signal,
          });
    };

    if (!options.skipSingleCapture) {
      return encoder(frames[0]) as BuilderResult<O>;
    }

    const renderedFrames = await Promise.all(frames.map(encoder));
    return renderedFrames as BuilderResult<O>;
  }

  /**
   * Flush the frames.
   */
  public flush() {
    this.#frames = [];
    this.#renderCalls = 0;
    this.#state = undefined as S;
    this.#iterations = 0;
  }

  /**
   * Create a builder from builder template.
   */
  public static from(template: BuilderTemplate) {
    const builder = new Builder(template.width, template.height);

    if (template.style) builder.style = template.style;
    builder.components = template.components;

    return builder;
  }

  public static isBuilder(builder: unknown): builder is Builder {
    return builder instanceof Builder;
  }
}

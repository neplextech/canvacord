import type { CSSProperties } from "react";
import satori, { SatoriOptions } from "satori";
import { FontFactory } from "../assets/AssetsFactory";
import { CSSPropertiesLike, StyleSheet } from "../helpers";
import { renderSvg, RenderSvgOptions } from "../helpers/image";
import { JSX, Element } from "../helpers/jsx";
import { BuilderOptionsManager } from "./BuilderOptionsManager";

export type GraphemeProvider = Record<string, string>;

const isEmoji = (str: string) => {
  const emojiRegex = /^[\p{Emoji}]$/u;
  return emojiRegex.test(str);
};

function emojiToUnicode(emoji: string): string {
  if (emoji.length === 1) return emoji.charCodeAt(0).toString(16);
  let comp =
    (emoji.charCodeAt(0) - 0xd800) * 0x400 +
    (emoji.charCodeAt(1) - 0xdc00) +
    0x10000;
  if (comp < 0) return emoji.charCodeAt(0).toString(16);
  return comp.toString(16).toLowerCase();
}

const createTwemojiProxy = (
  graphemeProvider: GraphemeProvider
): GraphemeProvider => {
  const handler: ProxyHandler<GraphemeProvider> = {
    has(target, p) {
      return isEmoji(p as string) || p in target;
    },
    get(target, prop: string) {
      if (isEmoji(prop)) {
        const url = (code: string) =>
          `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${code}.svg`;
        const code = emojiToUnicode(prop);
        const urlCode = url(code);

        return urlCode;
      }

      return prop;
    },
  };

  return new Proxy(graphemeProvider, handler);
};

export const BuiltInGraphemeProvider = {
  TWEMOJI: createTwemojiProxy({}),
};

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
export type BuildFormat = "svg" | "png" | "avif" | "jpeg" | "webp";

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

export class Builder<T extends Record<string, any> = Record<string, unknown>> {
  #style: CSSPropertiesLike = {};
  /**
   * The tailwind subset to apply to this builder.
   */
  public tw: string = "";
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
  public graphemeProvider: GraphemeProvider = BuiltInGraphemeProvider.TWEMOJI;

  /**
   * Create a new builder.
   * @param width the width of this builder.
   * @param height the height of this builder.
   */
  public constructor(public width: number, public height: number) {
    this.adjustCanvas();
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
      (component.type as unknown as Function) === JSX.Fragment
    )
      component = component.children;
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
    return this.components
      .map((component) => {
        if (component == null) return [];
        if (component instanceof Element) return component;
        if (component.toElement) return component.toElement();
        return <span>{String(component)}</span>;
      })
      .flat(1) as React.ReactNode[];
  }

  /**
   * Render this builder.
   */
  public async render(): Promise<React.ReactNode> {
    return <div style={this.style}>{this._render()}</div>;
  }

  /**
   * Convert this builder into an image.
   * @param options the build options.
   * @returns the image buffer or svg string.
   */
  public async build(options: Partial<BuilderBuildOptions> = {}) {
    options.format ??= "png";

    const fonts = Array.from(FontFactory.values()).map((font) =>
      font.getData()
    );
    const element = await this.render();

    const svg = await satori(element, {
      ...options,
      height: this.height,
      width: this.width,
      fonts,
      embedFont: true,
      graphemeImages: this.graphemeProvider,
    });

    return options?.format === "svg"
      ? svg
      : renderSvg({
          svg,
          format: options.format,
          options: options.options,
          signal: options.signal,
        });
  }

  /**
   * Create a builder from builder template.
   */
  public static from(template: BuilderTemplate) {
    const builder = new this(template.width, template.height);

    if (template.style) builder.style = template.style;
    builder.components = template.components;

    return builder;
  }
}

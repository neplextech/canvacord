import { CSSProperties } from 'react';
import satori, { SatoriOptions } from 'satori';
import { FontFactory } from '../assets/AssetsFactory';
import { Node } from '../fabric/Node';
import { CSSPropertiesLike, StyleSheet } from '../helpers';
import { renderSvg, RenderSvgOptions } from '../helpers/image';
import { JSX, Element } from '../helpers/jsx';

export interface BuilderTemplate {
  components: Array<Node | Element>;
  width: number;
  height: number;
  style?: CSSProperties;
}

export type BuildFormat = 'svg' | 'png' | 'avif' | 'jpeg' | 'webp';

export type BuilderBuildOptions = {
  format?: BuildFormat;
  options?: RenderSvgOptions;
  signal?: AbortSignal;
} & SatoriOptions;

export class Builder {
  #style: CSSPropertiesLike = {};
  public components = new Array<Node | Element>();

  public constructor(public readonly width: number, public readonly height: number) {
    this.#style = StyleSheet.create({
      root: {
        width: `${this.width}px`,
        height: `${this.height}px`
      }
    });
  }

  public get style() {
    return this.#style.root;
  }

  public set style(newStyle: CSSProperties) {
    StyleSheet.compose(this.#style.root, newStyle);
  }

  public addComponent<T extends Node | Element>(component: T | T[]) {
    if (component instanceof Element && (component.type as unknown as Function) === JSX.Fragment)
      component = component.children;
    if (!Array.isArray(component)) component = [component];
    this.components.push(...component);
  }

  private _render() {
    return this.components
      .map((component) => {
        if (component == null) return [];
        if (component instanceof Element) return component;
        if (component instanceof Node) return component.toElement();
        return <span>{String(component)}</span>;
      })
      .flat(1);
  }

  public async render(): Promise<Element> {
    return <div style={this.style}>{this._render()}</div>;
  }

  public async build(options: Partial<BuilderBuildOptions> = {}) {
    options.format ??= 'png';

    const svg = await satori(await this.render(), {
      height: this.height,
      width: this.width,
      fonts: Array.from(FontFactory.values()).map((font) => font.getData()),
      embedFont: true,
      ...options
    });

    return options?.format === 'svg' ? svg : renderSvg(svg, options.format, options.options, options.signal);
  }

  public static from(template: BuilderTemplate) {
    const builder = new this(template.width, template.height);

    if (template.style) builder.style = template.style;
    builder.components = template.components;

    return builder;
  }
}

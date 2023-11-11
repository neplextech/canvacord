import type { CSSProperties } from 'react';
import satori, { SatoriOptions } from 'satori';
import { FontFactory } from '../assets/AssetsFactory';
import { CSSPropertiesLike, StyleSheet } from '../helpers';
import { renderSvg, RenderSvgOptions } from '../helpers/image';
import { JSX, Element } from '../helpers/jsx';
import { BuilderOptionsManager } from './BuilderOptionsManager';

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

export interface Node {
  toElement(): Element;
}

export class Builder<T extends Record<string, any> = Record<string, unknown>> {
  #style: CSSPropertiesLike = {};
  public tw: string = '';
  public components = new Array<Node | Element>();
  public options = new BuilderOptionsManager<T>();

  public constructor(public width: number, public height: number) {
    this.adjustCanvas();
  }

  public bootstrap(data: T) {
    this.options.setOptions(data);
  }

  public adjustCanvas() {
    this.#style = StyleSheet.create({
      root: {
        width: `${this.width}px`,
        height: `${this.height}px`
      }
    });
    return this;
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
    return this;
  }

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
      .flat(1);
  }

  public async render(): Promise<Element> {
    return <div style={this.style}>{this._render()}</div>;
  }

  public async build(options: Partial<BuilderBuildOptions> = {}) {
    options.format ??= 'png';

    const fonts = Array.from(FontFactory.values()).map((font) => font.getData());
    const element = await this.render();

    const svg = await satori(element, {
      ...options,
      height: this.height,
      width: this.width,
      fonts,
      embedFont: true
    });

    return options?.format === 'svg'
      ? svg
      : renderSvg({
          svg,
          format: options.format,
          options: options.options,
          signal: options.signal
        });
  }

  public static from(template: BuilderTemplate) {
    const builder = new this(template.width, template.height);

    if (template.style) builder.style = template.style;
    builder.components = template.components;

    return builder;
  }
}

import type { CSSProperties } from 'react';
import { Element, JSX, render } from '../helpers/jsx';

export interface NodeProperties {
  style?: CSSProperties;
  children?: Node | Element | Node[] | Element[];
  tw?: string;
}

export type NodeProps<T extends object = {}> = NodeProperties & T;

export class Node<T extends object = {}> {
  public constructor(public props: NodeProps<T>) {
    this.props.style ??= {};
    this.props.style.display ??= 'flex';
  }

  public get children() {
    return this.getProperty('children');
  }

  public get style() {
    return this.props.style || {};
  }

  public set style(style: CSSProperties) {
    this.props.style = style;
  }

  public getProperty<K extends keyof NodeProps<T>>(propertyName: K): NodeProps<T>[K] {
    return this.props[propertyName];
  }

  public setProperty<K extends keyof NodeProps<T>>(propertyName: K, value: NodeProps<T>[K]) {
    this.props[propertyName] = value;
  }

  public toElement(): Element {
    return <>{render(this.children as unknown[])}</>;
  }
}

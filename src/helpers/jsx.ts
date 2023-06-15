import type { Key } from 'react';
import { Node } from '../fabric';
import { performObjectCleanup } from './StyleSheet';

export type ElementInit = {
  type: string;
  props: Record<string, unknown>;
  key?: Key | null;
  children?: any;
};

export class Element {
  public type: string;
  public props: Record<string, unknown>;
  public key: Key | null;
  public children?: any;

  public constructor(_init: ElementInit) {
    this.type = _init.type;
    this.props = _init.props;
    this.key = _init.key ?? null;
    this.children = _init.children;
  }
}

const cleanStyles = <T extends Record<string, unknown>>(properties: T): T => {
  performObjectCleanup(properties, true);
  return properties;
};

export const JSX = {
  Element,
  createElement(type: string | Element, props: Record<string, unknown>, ...children: Element[]): Element {
    if (type instanceof Element) return type;
    return new Element({
      type,
      props: {
        ...cleanStyles(props),
        children
      },
      children
    });
  },
  Fragment({ children }: { children: Element[] | string }): Element {
    return new Element({ type: 'Fragment', props: { children }, children });
  }
};

export function render(components: (Node | Element | unknown)[]) {
  return components
    .map((component) => {
      if (component == null) return [];
      if (component instanceof Element) return component;
      if (component instanceof Node) return component.toElement();

      const child = String(component) as unknown as Element;
      return JSX.createElement('span', { children: child }, child);
    })
    .flat(1);
}

import type * as React from 'react';
import { Node } from '../fabric';
import { performObjectCleanup, StyleSheet } from './StyleSheet';

export type ElementInit = {
  type: string;
  props: Record<string, unknown>;
  key?: React.Key | null;
  children?: any;
};

export class Element {
  public type: string;
  public props: Record<string, unknown>;
  public key: React.Key | null;
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

    // monkey-patch layout issues
    if ('className' in props) props.tw ??= props.className;

    if (type === 'div') {
      if ('tw' in props) {
        props.tw = StyleSheet.cn('flex flex-col content-start shrink-0', props.tw as string);
      } else if ('style' in props) {
        props.style = StyleSheet.compose(
          { display: 'flex', flexDirection: 'column', alignContent: 'flex-start', flexShrink: 0 },
          props.style as Record<string, unknown>
        );
      }
    }

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

declare module 'react' {
  interface DOMAttributes<T> {
    tw?: string;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      tw?: string;
    }
  }
}

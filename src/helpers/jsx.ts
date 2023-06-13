import type { Key } from "react";

export type Element = {
  type: string;
  props: Record<string, unknown>;
  key: Key | null;
  children?: any;
};

const cleanStyles = <T extends Record<string, unknown>>(properties: T): T => {
  if ("style" in properties && typeof properties.style === "object") {
    const style = properties.style as Record<string, unknown>;
    for (const prop in style) {
      if (style[prop] === undefined) delete style[prop];
    }
  }

  return properties;
};

export const JSX = {
  createElement(
    type: string,
    props: Record<string, unknown>,
    children: Element
  ): Element {
    return {
      type,
      props: {
        ...cleanStyles(props),
        children,
      },
      children,
      key: null,
    };
  },
  Fragment(type: null, props: null, children: Element): Element {
    // @ts-expect-error
    return { type: null, props: {}, children };
  },
};

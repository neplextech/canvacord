import type * as React from "react";
import { performObjectCleanup, StyleSheet } from "./StyleSheet";
import { Node } from "..";

const isNode = (node: unknown): node is Node => {
  return typeof node === "object" && node != null && "toElement" in node;
};

/**
 * The element initialization options.
 */
export type ElementInit = {
  type: string;
  props: Record<string, unknown>;
  key?: React.Key | null;
  children?: any;
};

/**
 * The JSX element.
 */
export class Element {
  /**
   * The type of the element.
   */
  public type: string;
  /**
   * The props of the element.
   */
  public props: Record<string, unknown>;
  /**
   * The key of the element.
   */
  public key: React.Key | null;
  /**
   * The children of the element.
   */
  public children?: any;

  /**
   * Creates a new JSX element.
   * @param _init The initialization options
   */
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

/**
 * The JSX factory for canvacord jsx.
 */
export const JSX = {
  /**
   * The JSX element instance.
   */
  Element,
  /**
   * Creates a new JSX element.
   * @param type The type of the element
   * @param props The props of the element
   * @param children The children of the element
   * @returns The created element
   */
  createElement(type: string | Element, props: Record<string, unknown>, ...children: Element[]): Element {
    if (type instanceof Element) return type;

    props ??= {};

    // monkey-patch layout issues
    if ("className" in props) props.tw ??= props.className;

    if (type === "div") {
      if (!("tw" in props) && !("style" in props)) {
        props.tw = StyleSheet.cn("flex flex-col content-start shrink-0", props.tw as string);
      }
    }

    return new Element({
      type,
      props: {
        ...cleanStyles(props),
        children,
      },
      children,
    });
  },
  /**
   * Creates a new JSX fragment.
   * @param children The children of the fragment
   */
  Fragment({ children }: { children: Element[] | string }): Element {
    return new Element({ type: "Fragment", props: { children }, children });
  },
};

/**
 * Renders the components.
 */
export function render(components: (Node | Element | unknown)[]) {
  return components
    .map((component) => {
      if (component == null) return [];
      if (component instanceof Element) return component;
      if (isNode(component)) return component.toElement();

      const child = String(component) as unknown as Element;
      return JSX.createElement("span", { children: child }, child);
    })
    .flat(1);
}

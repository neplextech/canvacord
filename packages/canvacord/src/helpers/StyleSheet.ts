import type { CSSProperties } from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";

export type Stylable =
  | {
      style: CSSPropertiesLike;
      className?: string;
    }
  | string;

/**
 * The CSS properties like object.
 */
export type CSSPropertiesLike<K extends string | number | symbol = string> = Record<K, CSSProperties>;

/**
 * Performs object cleanup by deleting all undefined properties that could interfere with builder methods.
 */
export const performObjectCleanup = (
  // biome-ignore lint: any is tolerated here
  obj: Record<string, any>,
  deep = false,
) => {
  for (const prop in obj) {
    if (obj[prop] === undefined) delete obj[prop];
    if (typeof obj[prop] === "object" && deep) performObjectCleanup(obj[prop], deep);
  }
};

export class StyleSheet extends null {
  private constructor() {}

  /**
   * Creates a new CSSPropertiesLike object.
   */
  public static create<O extends CSSPropertiesLike, K extends keyof O>(
    styles: CSSPropertiesLike<K>,
  ): CSSPropertiesLike<K> {
    if (!styles || typeof styles !== "object") return {} as O;

    performObjectCleanup(styles);

    return styles as O;
  }

  /**
   * Composes two CSSPropertiesLike objects.
   */
  public static compose(style1: CSSProperties, style2: CSSProperties) {
    performObjectCleanup(style1);
    performObjectCleanup(style2);

    return Object.assign(style1, style2);
  }

  /**
   * Flattens an array of CSSPropertiesLike objects.
   */
  public static flatten(style: CSSProperties[]) {
    return style.reduce((previous, current) => {
      performObjectCleanup(current);
      return Object.assign(previous, current);
    }, {} as CSSProperties);
  }

  /**
   * Merges multiple tailwind-like class names into appropriate class names.
   */
  public static cn(...classes: ClassNameValue[]) {
    return twMerge(...classes);
  }

  /**
   * Returns the className string from stylable data.
   */
  public static tw(data?: Stylable) {
    if (typeof data === "string") return data;
    return data?.className ?? "";
  }

  /**
   * Returns the style object from stylable data.
   */
  public static css(data?: Stylable) {
    if (typeof data === "string") return {};
    return data?.style ?? {};
  }
}

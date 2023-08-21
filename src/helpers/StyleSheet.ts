import type { CSSProperties } from 'react';
import { twMerge, ClassNameValue } from 'tailwind-merge';

export type CSSPropertiesLike<K extends string | number | symbol = string> = Record<K, CSSProperties>;

export const performObjectCleanup = (obj: Record<string, any>, deep = false) => {
  for (const prop in obj) {
    if (obj[prop] === undefined) delete obj[prop];
    if (typeof obj[prop] === 'object' && deep) performObjectCleanup(obj[prop], deep);
  }
};

export class StyleSheet extends null {
  private constructor() {}

  public static create<O extends CSSPropertiesLike, K extends keyof O>(
    styles: CSSPropertiesLike<K>
  ): CSSPropertiesLike<K> {
    if (!styles || typeof styles !== 'object') return {} as O;

    performObjectCleanup(styles);

    return styles as O;
  }

  public static compose(style1: CSSProperties, style2: CSSProperties) {
    performObjectCleanup(style1);
    performObjectCleanup(style2);

    return Object.assign(style1, style2);
  }

  public static flatten(style: CSSProperties[]) {
    return style.reduce((previous, current) => {
      performObjectCleanup(current);
      return Object.assign(previous, current);
    }, {} as CSSProperties);
  }

  public static cn(...classes: ClassNameValue[]) {
    return twMerge(...classes);
  }
}

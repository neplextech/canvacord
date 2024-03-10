import { Font, FontFactory } from "../assets";

/**
 * Abbreviates the given number.
 */
export const fixed = (v: number, r: boolean) => {
  if (!r) return v;
  const formatter = new Intl.NumberFormat("en-US", { notation: "compact" });
  return formatter.format(v);
};

/**
 * Resolves the first registered font instance if available.
 */
export const getDefaultFont = () => {
  return (FontFactory.values().next().value ?? null) as Font | null;
};

export const chunkArrayInGroups = <T>(arr: T[], size: number): T[][] => {
  const result: T[][] = [];

  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }

  return result;
};

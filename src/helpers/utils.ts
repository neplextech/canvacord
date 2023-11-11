import { Font, FontFactory } from '../assets';

export const fixed = (v: number) => {
  const formatter = new Intl.NumberFormat('en-US', { notation: 'compact' });
  return formatter.format(v);
};

export const getDefaultFont = () => {
  return (FontFactory.values().next().value ?? null) as Font | null;
};

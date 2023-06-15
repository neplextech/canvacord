import { Resvg } from '@resvg/resvg-js';

export function toPNG(svg: string) {
  const resvg = new Resvg(svg);
  return resvg.render().asPng();
}

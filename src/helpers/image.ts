import { Resvg } from '@resvg/resvg-js';

export function toPNG(svg: string) {
  const resvg = new Resvg(svg);
  return resvg.render().asPng();
}

export class CanvacordImage {
  public constructor(public data: Buffer, public mime: string) {}

  public toBase64() {
    return this.data.toString('base64');
  }

  public toDataURL() {
    return `data:${this.mime};base64,${this.toBase64()}`;
  }
}

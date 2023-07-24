import { TemplateFactory } from '../assets/TemplateFactory';
import { ImageSource } from '../helpers';
import { ImageGen } from './ImageGen';
import { buffer } from 'stream/consumers';

export class Canvacord {
  public async affect(image: ImageSource) {
    const generator = new ImageGen(TemplateFactory.Affect(image));
    await generator.render();

    return generator.encode();
  }

  public async triggered(image: ImageSource): Promise<import('stream').Readable>;
  public async triggered(image: ImageSource, asBuffer: false): Promise<import('stream').Readable>;
  public async triggered(image: ImageSource, asBuffer: true): Promise<Buffer>;
  public async triggered(image: ImageSource, asBuffer = false): Promise<import('stream').Readable | Buffer> {
    const generator = new ImageGen(TemplateFactory.Triggered(image));
    const img = await generator.generateGif();

    if (!asBuffer) return img;
    return buffer(img);
  }
}

export const canvacord = new Canvacord();

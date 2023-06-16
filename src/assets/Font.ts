import { randomUUID } from 'crypto';
import { readFileSync } from 'fs';
import { readFile } from 'fs/promises';
import { Font as FontData } from 'satori';
import { FontFactory } from './FontFactory';
import { GlobalFonts } from '@napi-rs/canvas';

const randomAlias = () => randomUUID() as string;

export class Font {
  public constructor(public data: Buffer, public alias = randomAlias()) {
    GlobalFonts.register(data, alias);
    FontFactory.set(this.alias, this);
  }

  public get name() {
    return this.alias;
  }

  public getData(): FontData {
    return {
      data: this.data,
      name: this.alias,
      weight: 400,
      style: 'normal'
    };
  }

  public toString() {
    return this.alias;
  }

  public toJSON() {
    return this.getData();
  }

  public static async fromFile(path: string, alias?: string) {
    const buffer = await readFile(path);
    return new Font(buffer, alias);
  }

  public static fromFileSync(path: string, alias?: string) {
    const buffer = readFileSync(path);
    return new Font(buffer, alias);
  }
}

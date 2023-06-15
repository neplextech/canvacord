import { readFileSync } from 'fs';
import { readFile } from 'fs/promises';
import { Font as FontData } from 'satori';
import { FontFactory } from './FontFactory';

export class Font {
  public constructor(public data: Buffer | ArrayBuffer, public alias: string) {
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

  public static async fromFile(path: string, alias: string) {
    const buffer = await readFile(path);
    return new Font(buffer, alias);
  }

  public static fromFileSync(path: string, alias: string) {
    const buffer = readFileSync(path);
    return new Font(buffer, alias);
  }
}

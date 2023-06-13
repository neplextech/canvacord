import satori from "satori";
import { FontFactory } from "../assets/FontFactory";
import { Node, NodeProps } from "../fabric/Node";
import { TextNode, TextNodeProps } from "../fabric/TextNode";
import { toPNG } from "../helpers/image";
import { Element } from "../helpers/jsx";

export class Builder {
  public components = new Array<Node>();

  public constructor(
    public readonly width: number,
    public readonly height: number
  ) {}

  public addText(data: NodeProps<TextNodeProps>) {
    const node = new TextNode(data);
    this.components.push(node);
  }

  public render(): Element {
    throw new Error("NOT IMPLEMENTED");
  }

  public async build(rawSVG = false) {
    const svg = await satori(this.render(), {
      height: this.height,
      width: this.width,
      fonts: Array.from(FontFactory.values()).map((font) => font.getData()),
      embedFont: true
    });

    return rawSVG ? svg : toPNG(svg);
  }
}

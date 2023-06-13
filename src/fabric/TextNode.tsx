import { Node } from "./Node";
import { JSX } from "../helpers/jsx";
import { Font } from "../assets/Font";

export interface TextNodeProps {
  data: string;
  fontSize: string;
  font?: Font;
  color: string;
}

export class TextNode extends Node<TextNodeProps> {
  public setPosition(x: number, y: number) {
    this.props.x = x;
    this.props.y = y;
  }

  public writeText(text: string) {
    this.props.data = text;
  }

  public setFontSize(size: string) {
    this.props.fontSize = size;
  }

  public setFont(font: Font) {
    this.setProperty("font", font);
  }

  public setColor(color: string) {
    this.props.color = color;
  }

  public getValue() {
    return this.getProperty("data");
  }

  public toElement() {
    return (
      <h1
        style={{
          fontFamily: this.getProperty("font")?.alias,
          fontSize: this.getProperty('fontSize'),
          color: this.getProperty("color"),
          textAlign: 'center'
        }}
      >
        {this.getValue()}
      </h1>
    );
  }
}

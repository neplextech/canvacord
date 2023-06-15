import { Node, NodeProps } from './Node';
import { JSX } from '../helpers/jsx';

export interface TextNodeProps {
  data: string;
}

export class TextNode extends Node<TextNodeProps> {
  public setValue(newValue: string) {
    this.setProperty('data', newValue);
  }

  public get value() {
    return this.getProperty('data');
  }

  public set value(value: string) {
    this.setValue(value);
  }

  public toElement() {
    return <h1 style={this.getProperty('style')}>{this.getProperty('data')}</h1>;
  }
}

export function Text(props: NodeProps<TextNodeProps>) {
  const node = new TextNode(props);

  return node.toElement();
}

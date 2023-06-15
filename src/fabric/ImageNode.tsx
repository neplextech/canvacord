import { Node, NodeProps } from './Node';
import { JSX } from '../helpers';

export interface ImageNodeProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export class ImageNode extends Node<ImageNodeProps> {
  public toElement(): JSX.Element {
    return (
      <img
        src={this.getProperty('src')}
        alt={this.getProperty('alt')}
        style={this.getProperty('style')}
        width={this.getProperty('width')}
        height={this.getProperty('height')}
      />
    );
  }
}

export function Image(props: NodeProps<ImageNodeProps>) {
  const node = new ImageNode(props);
  return node.toElement();
}

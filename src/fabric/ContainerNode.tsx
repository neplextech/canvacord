import { Node, NodeProps } from './Node';
import { Element, JSX, render } from '../helpers';

export class ContainerNode extends Node {
  public toElement(): Element {
    return <div style={this.style}>{render(this.children as unknown[])}</div>;
  }
}

export function Container(props: NodeProps) {
  const node = new ContainerNode(props);

  return node.toElement();
}

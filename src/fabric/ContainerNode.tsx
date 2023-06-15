import { Node, NodeProps } from './Node';
import { Element, JSX } from '../helpers';

export class ContainerNode extends Node {
  public toElement(): Element {
    return (
      <div style={this.style}>
        {Array.isArray(this.children)
          ? this.children.map((c) => (c instanceof Element ? c : c.toElement()))
          : this.children instanceof Element
          ? this.children
          : this.children?.toElement()}
      </div>
    );
  }
}

export function Container(props: NodeProps) {
  const node = new ContainerNode(props);

  return node.toElement();
}

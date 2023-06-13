import { JSX } from "../helpers/jsx";

export interface NodeProperties {
  x: number;
  y: number;
}

export type NodeProps<T extends object = {}> = NodeProperties & T;

export class Node<T extends object = {}> {
  public x!: number;
  public y!: number;

  public constructor(public props: NodeProps<T>) {}

  public getProperty<K extends keyof NodeProps<T>>(
    propertyName: K
  ): NodeProps<T>[K] {
    return this.props[propertyName];
  }

  public setProperty<K extends keyof NodeProps<T>>(propertyName: K, value: NodeProps<T>[K]) {
    this.props[propertyName] = value;
  }

  public toElement() {
    return <></>;
  }
}

[![SWUbanner](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner2-direct.svg)](https://vshymanskyy.github.io/StandWithUkraine)

# Canvacord

Easily generate images on-the-fly with node.js using wide range of templates.

> **Warning**
> 
> You are looking at the next version of canvacord, which is under development. Go to the [main branch](https://github.com/neplextech/canvacord/tree/main) to view legacy codebase.

## Features

**Coming Soon!**

# Contributing

## About the project

Unlike previous versions, this project internally uses react-like elements (JSX) to generate an image with the help of [satori](https://github.com/vercel/satori), without depending upon [canvas](https://npm.im/canvas) libraries. Internally, there exists a concept of `Node`s which are basically components for canvacord template. The root node is known as a template. Templates are dynamic, which makes it easier to customize each and every part of the image you are generating. You can follow the example below to add your own components/templates to this library:

### Adding custom template and node

```tsx
import { JSX, Node, Builder } from "canvacord";

// JSX refers to JSX factory
// Builder refers to template builder
// Node refers to component base

class TextNode extends Node<{
  data: string;
  color: string;
}> {
  /*
   * Visual representation of this node
   */
  public toElement() {
    return (
      <h1
        style={{
          color: this.getProperty("color"),
        }}
      >
        {this.getProperty("data")}
      </h1>
    );
  }
}

class ProfileCard extends Builder {
  public setUsername(name: string, color: string) {
    const node = new TextNode({
      data: name,
      color,
    });

    super.addComponent(node);
  }

  public render() {
    // return root layout along with components
    return (
      <div
        style={{
          width: `${this.width}px`,
          height: `${this.height}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1A1A23",
        }}
      >
        {/* Render all of the components in the canvas */}
        {this.components.map((component) => {
          return component.toElement();
        })}
      </div>
    );
  }
}
```

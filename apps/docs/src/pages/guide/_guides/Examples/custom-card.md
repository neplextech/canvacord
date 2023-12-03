## Creating a custom card

```tsx
/** @jsx JSX.createElement */
/** @jsxFrag JSX.Fragment */

// JSX import is required if you want to use JSX syntax
// Builder is a base class to create your own builders
// Font is a utility class to load fonts
import { JSX, Builder, Font } from "canvacord";
import { writeFile } from "fs/promises";

// declare props types
interface Props {
  text: string;
}

class Design extends Builder<Props> {
  constructor() {
    // set width and height
    super(500, 500);
    // initialize props
    this.bootstrap({ text: "" });
  }

  // define custom methods for your builder
  setText(text: string) {
    this.options.set("text", text);
    return this;
  }

  // this is where you have to define how the resulting image should look like
  async render() {
    return (
      <div className="flex items-center justify-center h-full w-full bg-teal-500">
        <h1 className="text-white font-bold text-7xl">
          {this.options.get("text")}
        </h1>
      </div>
    );
  }
}

// usage
// load default font
Font.loadDefault();

// create design
const design = new Design().setText("Hello World");
const image = await design.build({ format: "png" });

// do something with generated image
await writeFile("./test.png", image);
```

## Result

![output](https://github.com/neplextech/canvacord/assets/46562212/c50d09d6-33c4-4b44-81c2-aed6783f503c)

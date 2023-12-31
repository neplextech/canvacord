## Creating a greetings card

In this example we will create a greetings card builder that can be used to create greetings card images. Canvacord is very flexible and you can create any type of image builder you want. Canvacord builder uses JSX syntax to define how the output image should look like. In this example, we will use typescript as a way to transpile jsx to valid javascript code. You can also use tools like babel to transpile jsx to javascript.

If you want to quickly transpile this example, you can use online tool [https://babeljs.io/repl](https://babeljs.io/repl). Just copy and paste the code and make sure to use the following configuration:

- Presets
  - `react`
  - `typescript`
  - `stage-2`
- React runtime: `classic`

and leave everything else as it is.

### Code

The `@jsx` and `@jsxFrag` comments are required to tell the transpiler that we are using jsx syntax. This can also be set in tsconfig file, but for this example we will use comments. These comments are called pragmas and are used by transpilers to know what to do with the code.

```tsx
/** @jsx JSX.createElement */
/** @jsxFrag JSX.Fragment */

// JSX import is required if you want to use JSX syntax
// Builder is a base class to create your own builders
// loadImage is a helper function to load images from url or path
import { JSX, Builder, loadImage } from "canvacord";

interface Props {
  displayName: string;
  type: "welcome" | "goodbye";
  avatar: string;
  message: string;
}

class GreetingsCard extends Builder<Props> {
  constructor() {
    // set width and height
    super(930, 280);
    // initialize props
    this.bootstrap({
      displayName: "",
      type: "welcome",
      avatar: "",
      message: "",
    });
  }

  setDisplayName(value: string) {
    this.options.set("displayName", value);
    return this;
  }

  setType(value: Props["type"]) {
    this.options.set("type", value);
    return this;
  }

  setAvatar(value: string) {
    this.options.set("avatar", value);
    return this;
  }

  setMessage(value: string) {
    this.options.set("message", value);
    return this;
  }

  // this is where you have to define output ui
  async render() {
    const { type, displayName, avatar, message } = this.options.getOptions();

    // make sure to use the loadImage helper function to load images, otherwise you may get errors
    const image = await loadImage(avatar);

    return (
      <div className="h-full w-full flex flex-col items-center justify-center bg-[#23272A] rounded-xl">
        <div className="px-6 bg-[#2B2F35AA] w-[96%] h-[84%] rounded-lg flex items-center">
          <img
            src={image.toDataURL()}
            className="flex h-[40] w-[40] rounded-full"
          />
          <div className="flex flex-col ml-6">
            <h1 className="text-5xl text-white font-bold m-0">
              {type === "welcome" ? "Welcome" : "Goodbye"},{" "}
              <span className="text-blue-500">{displayName}!</span>
            </h1>
            <p className="text-gray-300 text-3xl m-0">{message}</p>
          </div>
        </div>
      </div>
    );
  }
}
```

That's it! You can now use this builder to dynamically create new greetings card images.

```ts
import { Font } from "canvacord";
import { GreetingsCard } from "./GreetingsCard";

// load font, in this case we are loading the bundled font from canvacord
Font.loadDefault();

// loading font from file would be like this
await Font.fromFile("path/to/font.ttf");
// or synchronously
Font.fromFileSync("path/to/font.ttf");

// create card
const card = new GreetingsCard()
  .setAvatar("https://cdn.discordapp.com/embed/avatars/0.png")
  .setDisplayName("Wumpus")
  .setType("welcome")
  .setMessage("Welcome to the server!");

const image = await card.build({ format: "png" });

// now do something with the image buffer
```

## Result of the above code

![output](https://raw.githubusercontent.com/neplextech/canvacord/main/packages/canvacord/test/test.png)

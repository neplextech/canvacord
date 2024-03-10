## Rank Card

In this tutorial, we'll learn how to use the `RankCardBuilder` class from the Canvacord library to create a custom rank card.

### Importing the Required Classes

First, we need to import the `Font` and `RankCardBuilder` classes from the canvacord module.

```js
// ESM
import { Font, RankCardBuilder } from "canvacord";

// CJS
const { Font, RankCardBuilder } = require("canvacord");
```

### Loading fonts

Canvacord does not load fonts by default. If your use case does not involve writing texts, this step can be omitted. However, rank cards require texts to be written on them, so we need to load the font into canvacord's font registry.

Canvacord by default ships with a font called [`Geist`](https://vercel.com/font?utm_source=canvacord&utm_campaign=rank-card) (by [Vercel](https://vercel.com/?utm_source=canvacord&utm_campaign=rank-card)). This font can be loaded with the `Font.loadDefault()` method:

```js
Font.loadDefault();
```

If you want to use a custom font instead, you can skip `Font.loadDefault()` method and utilize `Font.fromFile` or `Font.fromBuffer` method to load the font from a file or buffer respectively.

```js
// loading from a file
// synchronous method
Font.fromFileSync("./my-font.ttf");

// asynchronous method
await Font.fromFile("./my-font.ttf");

// loading from a buffer
Font.fromBuffer(buffer);
```

> Good to know: Currently only `TTF`, `OTF` and `WOFF` font formats are supported.

### Creating a rank card builder

Now that we have loaded the font, we can create a new `RankCardBuilder` instance. This is a builder class exported by canvacord to specifically create rank cards. It offers a lot of helper methods to customize the rank card to your liking.

The following is an example of a rank card builder with common properties set:

```js
const card = new RankCardBuilder()
  .setDisplayName("Wumpus") // Big name
  .setUsername("@wumpus") // small name, do not include it if you want to hide it
  .setAvatar("https://cdn.discordapp.com/embed/avatars/0.png?size=256") // user avatar
  .setCurrentXP(300) // current xp
  .setRequiredXP(600) // required xp
  .setLevel(2) // user level
  .setRank(5) // user rank
  .setOverlay(90) // overlay percentage. Overlay is a semi-transparent layer on top of the background
  .setBackground("#23272a") // set background color or,
  .setBackground("./path/to/image.png") // set background image
  .setStatus("online"); // user status. Omit this if you want to hide it
```

### Generating the image

```ts
const image = await card.build({
  format: "png",
});

// image is a buffer. It can be written to a file or sent as an attachment over internet
```

### Result

![xp-card](https://raw.githubusercontent.com/neplextech/canvacord/main/packages/canvacord/test/normal/rankCard.svg)

## Advanced Usage

### Overriding default texts

The `setTextStyles` method is used to customize the text styles for different elements in a rank card or leaderboard. This method allows for the modification of default labels for level, experience points (XP), and rank display.

```js
card.setTextStyles({
  level: "NIVEAU :", // Custom text for the level
  xp: "EXP :", // Custom text for the experience points
  rank: "CLASSEMENT :", // Custom text for the rank
});
```

### Result

![xp-card](https://raw.githubusercontent.com/neplextech/canvacord/main/packages/canvacord/test/normal/cardTranslated.svg)

### Customizing the colors

The `setStyles` method can be used to customize the colors of different elements in a rank card or leaderboard. This method allows for the modification of the background, progress bar, and text colors, etc. The style object is a key-value pair of the style name and the value to be set.
The style behaves similar to css properties.

#### Syntax 1 (Style object)

```scss
// Group of elements
ElementGroup {
  // Element name
  ElementName {
    // Style object
    style {
      attribute-name: value;
    }
  }
}
```

#### Syntax 2 (Tailwind classes)

```scss
// Group of elements
ElementGroup {
  // Element name
  ElementName {
    // Style object
    tw = "tailwind-classes"
  }
}
```

#### Examples

```js
// changing progress bar thumb color
card.setStyles({
  progressbar: {
    thumb: {
      style: {
        backgroundColor: "red",
      },
    },
  },
});

// alternative syntax
card.setStyles({
  progressbar: {
    thumb: {
      tw: "bg-red-500",
    },
  },
});
```

### Modifying progress bar width

The internal progress calculator may not be suitable for all use cases. You can set a custom progress calculator using the `setProgressCalculator` method. The progress calculator is a function that returns a number between 0 and 100, representing the progress percentage.

```js
card.setProgressCalculator((currentXP, requiredXP) => {
  // do some crazy math here
  // The value returned must be in the range of 0 to 100. It represents the width of the progress bar
  return Math.floor((currentXP / requiredXP) * 100);
});
```

### Overriding emoji providers

Canvacord uses the `twemoji` provider by default. You can override this by using the `setGraphemeProvider` method. The `setGraphemeProvider` method accepts a `GraphemeProvider` enum value.

```js
// Twemoji
card.setGraphemeProvider(BuiltInGraphemeProvider.Twemoji);

// FluentEmojiHighContrast
card.setGraphemeProvider(BuiltInGraphemeProvider.FluentEmojiHighContrast);

// FluentEmoji
card.setGraphemeProvider(BuiltInGraphemeProvider.FluentEmoji);

// FluentEmojiColor
card.setGraphemeProvider(BuiltInGraphemeProvider.FluentEmojiColor);

// FluentEmojiFlat
card.setGraphemeProvider(BuiltInGraphemeProvider.FluentEmojiFlat);

// Openmoji
card.setGraphemeProvider(BuiltInGraphemeProvider.Openmoji);

// Noto
card.setGraphemeProvider(BuiltInGraphemeProvider.Noto);

// Blobmoji
card.setGraphemeProvider(BuiltInGraphemeProvider.Blobmoji);

// None
card.setGraphemeProvider(BuiltInGraphemeProvider.None);
```

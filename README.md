# Canvacord
Powerful image manipulation tool to generate images at easily.

# Installation

```sh
npm i Snowflake107/Canvacord#v5-alpha
```

# Examples
## Rank Card

```js
const canvacord = require("canvacord-v5");
const img = "https://cdn.discordapp.com/embed/avatars/0.png";

const rank = new canvacord.Rank()
    .registerFonts()
    .setAvatar(img)
    .setCurrentXP(250)
    .setRequiredXP(500)
    .setStatus("dnd")
    .setProgressBar("#FFFFFF", "COLOR")
    .setUsername("Snowflake")
    .setDiscriminator("0007");

rank.build()
    .then(data => {
        canvacord.write(data, "RankCard.png");
    });
```

## Preview
![RankCard](test/images/RankCard.png)

# Docs
**[https://canvacord.js.org/v5](https://canvacord.js.org/v5)**
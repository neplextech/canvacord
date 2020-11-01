# Example Rank Card

```js
const canvacord = require("canvacord");
const img = getImageSomehow();
const data = getDataSomehow();

const rank = new canvacord.Rank()
    .setAvatar(img)
    .setCurrentXP(data.currentXP)
    .setRequiredXP(data.requiredXP)
    .setStatus(data.status)
    .setProgressBar("#FFFFFF", "COLOR")
    .setUsername(data.username)
    .setDiscriminator(data.discriminator);

rank.build()
    .then(buffer => {
        canvacord.write(buffer, "RankCard.png");
    });
```

# Example Rank Card
![RankCard](https://raw.githubusercontent.com/DevSnowflake/canvacord/v5/test/images/RankCard.png)
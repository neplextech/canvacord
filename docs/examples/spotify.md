# Example Spotify Card

```js
const canvacord = require("canvacord");
const image = "https://is5-ssl.mzstatic.com/image/thumb/Features111/v4/a4/89/a1/a489a1cb-4543-6861-a276-4470d41d6a90/mzl.zcdmhnlk.jpg/800x800bb.jpeg";
const data = getDataSomehow();

const card = new canvacord.Spotify()
    .setAuthor(data.author)
    .setAlbum(data.album)
    .setStartTimestamp(data.start)
    .setEndTimestamp(data.end)
    .setImage(image)
    .setTitle(data.title);

card.build()
    .then(buffer => {
        canvacord.write(buffer, "spotify.png");
    });
```

# Example Spotify Card
![Spotify](https://raw.githubusercontent.com/DevSnowflake/canvacord/v5/test/images/spotify.png)
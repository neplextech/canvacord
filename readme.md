# Canvacord
Simple & easy to use image manipulation module.

# Installing

```bash
npm i --save canvacord
```

# Features
- Supports Buffer, image url or path
- Super fast image manipulation
- Welcomer and leaver images
- Rank card
- and more...

# Functions
- batslap(image1, image2)
- beautiful(image)
- facepalm(image)
- gay(image)
- kiss(image1, image2)
- rip(image)
- spank(image1, image2)
- trash(image)
- blur(image, level = 5)
- greyscale(image)
- sepia(image)
- invert(image)
- delete(image)
- color(color_hex_or_html5_color_name)
- trigger(image)
- hitler(image)
- bed(image1, image2)
- wanted(image)
- circle(image)
- jail(image)
- dither(image)
- wasted(image)
- welcomer({ username, discrim, avatarURL })
- leaver({ username, discrim, avatarURL })
- rank({ username, discrim, level, rank, neededXP, currentXP, avatarURL })
- pixelate(image, level)
- write(buffer, filename)

# Example

```js

const Canvacord = require("canvacord");
const canva = new Canvacord();

async function create() {
    let img = await canva.trigger("./image.png");
    canva.write(img, "triggered.gif");

    let color = await canva.color("#4E5D94");
    canva.write(color, "color.png");
}

create();

```

# Discord.js Example

```js
const Discord = require("discord.js");
const client = new Discord.Client();
const Canvacord = require("canvacord");
const canva = new Canvacord();

client.on("ready", () => {
    console.log("I'm online!");
});

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content === "!trigger") {
        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canva.trigger(avatar);
        let attachment = new Discord.MessageAttachment(image, "triggered.gif");
        return message.channel.send(attachment);
    }
    if (message.content === "!delete") {
        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canva.delete(avatar);
        let attachment = new Discord.MessageAttachment(image, "deleted.png");
        return message.channel.send(attachment);
    }
});

client.login("Your_Bot_Token_here");

```

# Preview
![image](https://raw.githubusercontent.com/Snowflake107/canvacord/master/screenshot.png)

# Join Our Discord Server
**[discord.gg/uqB8kxh](https://discord.gg/uqB8kxh)**

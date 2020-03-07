# Canvacord
Simple & easy to use image manipulation module.

# Installing

```bash
npm i --save canvacord
```

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

# Example

```js

const Canvacord = require("canvacord");
const canva = new Canvacord.Canvas();
const fs = require("fs");

function create() {
    fs.readFile("./image.png", async (err, data) => {
        let img = await canva.trigger(data);
        return fs.writeFile("./triggered.gif", img, (err) => {
            if (err) console.error(err);
        });
    });
}

create();

```

# Discord.js Example

```js
const Discord = require("discord.js");
const client = new Discord.Client();
const Canvacord = require("canvacord");
const canva = new Canvacord.Canvas();

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
![image](screenshot.png)

# Discord
**[https://discord.gg/AHdaSqr](https://discord.gg/AHdaSqr)**
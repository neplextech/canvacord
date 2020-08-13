const Canvas = require("canvas");
const jimp = require("jimp");
const GIFEncoder = require("gifencoder");
const circle = require("@jimp/plugin-circle");
const configure = require("@jimp/custom");
const fs = require("fs");
const Util = require("./CanvasUtil");
const statuses = {
    dnd: __dirname + "/assets/images/dnd.png",
    idle: __dirname + "/assets/images/idle.png",
    online: __dirname + "/assets/images/online.png",
    offline: __dirname + "/assets/images/offline.png"
};

// load custom plugins
configure({ plugins: [circle] }, jimp);

/**
 * Canvacord
 * Simple and easy to use image manipulation module
 * created and maintained by Snowflake107.
 */
class Canvacord {
    constructor() {
        throw new Error(`The class ${this.constructor.name} may not be instantiated!`);
    }

    /**
     * batslap
     * @param {Image1} image1 first image
     * @param {Image2} image2 second image
     * @returns {Promise<Buffer>}
     * @example let img = await canva.batslap(img, img1);
     * canva.write(img, "img.png");
     */
    static async batslap(image1, image2) {
        if (!image1) throw new Error("first image was not provided!");
        if (!image2) throw new Error("second image was not provided!");
        let base = await jimp.read(__dirname + "/assets/images/batslap.png");
        image1 = await jimp.read(image1);
        image2 = await jimp.read(image2);
        base.resize(1000, 500);
        image1.resize(220, 220);
        image2.resize(200, 200);
        base.composite(image2, 580, 260);
        base.composite(image1, 350, 70);
        let raw = await base.getBufferAsync("image/png");
        return raw;
    }

    /**
     * beautiful
     * @param {Image} image image
     * @returns {Promise<Buffer>}
     * @example let img = await canva.beautiful(img);
     * canva.write(img, "img.png");
     */
    static async beautiful(image) {
        if (!image) throw new Error("image was not provided!");
        let base = await jimp.read(__dirname + "/assets/images/beautiful.png");
        base.resize(376, 400);
        let img = await jimp.read(image);
        img.resize(84, 95);
        base.composite(img, 258, 28);
        base.composite(img, 258, 229);
        let raw = await base.getBufferAsync("image/png");
        return raw;
    }

    /**
     * facepalm
     * @param {Image} image image
     * @returns {Promise<Buffer>}
     * @example let img = await canva.facepalm(img);
     * canva.write(img, "img.png");
     */
    static async facepalm(image) {
        if (!image) throw new Error("image was not provided!");
        let canvas = Canvas.createCanvas(632, 357);
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 632, 357);
        let avatar = await Canvas.loadImage(image);
        ctx.drawImage(avatar, 199, 112, 235, 235);
        let layer = await Canvas.loadImage(__dirname + "/assets/images/facepalm.png");
        ctx.drawImage(layer, 0, 0, 632, 357);
        return canvas.toBuffer();
    }

    /**
     * gay
     * @param {Image} image Image
     * @returns {Promise<Buffer>}
     * @example let img = await canva.gay(img);
     * canva.write(img, "img.png");
     */
    static async gay(image) {
        if (!image) throw new Error("image was not provided!");
        let bg = await Canvas.loadImage(__dirname + "/assets/images/gay.png");
        let img = await Canvas.loadImage(image);
        const canvas = Canvas.createCanvas(400, 400);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, 400, 400);
        ctx.drawImage(bg, 0, 0, 400, 400);
        return canvas.toBuffer();
    }

    /**
     * kiss
     * @param {image1} image1 first image
     * @param {image2} image2 second image
     * @returns {Promise<Buffer>}
     * @example let img = await canva.kiss(img);
     * canva.write(img, "img.png");
     */
    static async kiss(image1, image2) {
        if (!image1) throw new Error("first image was not provided!");
        if (!image2) throw new Error("second image was not provided!");
        const canvas = Canvas.createCanvas(768, 574);
        const ctx = canvas.getContext("2d");
        const background = await Canvas.loadImage(__dirname + "/assets/images/kiss.png");
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const avatar = await Canvas.loadImage(image1);
        const avatar1 = await Canvas.loadImage(image2);
        ctx.drawImage(avatar1, 370, 25, 200, 200);
        ctx.drawImage(avatar, 150, 25, 200, 200);
        return canvas.toBuffer();
    }

    /**
     * rip
     * @param {Image} image Image
     * @returns {Promise<Buffer>}
     * @example let img = await canva.rip(img);
     * canva.write(img, "img.png");
     */
    static async rip(image) {
        if (!image) throw new Error("image was not provided!");
        const canvas = Canvas.createCanvas(244, 253);
        const ctx = canvas.getContext("2d");
        const background = await Canvas.loadImage(__dirname + "/assets/images/rip.png");
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const avatar = await Canvas.loadImage(image);
        ctx.drawImage(avatar, 63, 110, 90, 90);
        return canvas.toBuffer();
    }

    /**
     * spank
     * @param {image1} image1 first image
     * @param {image2} image2 second image
     * @returns {Promise<Buffer>}
     * @example let img = await canva.spank(img, img1);
     * canva.write(img, "img.png");
     */
    static async spank(image1, image2) {
        if (!image1) throw new Error("first image was not provided!");
        if (!image2) throw new Error("second image was not provided!");
        let bg = await jimp.read(__dirname + "/assets/images/spank.png");
        image1 = await jimp.read(image1);
        image2 = await jimp.read(image2);
        bg.resize(500, 500);
        image1.resize(140, 140);
        image2.resize(120, 120);
        bg.composite(image2, 350, 220);
        bg.composite(image1, 225, 5);
        let raw = await bg.getBufferAsync("image/png");
        return raw;
    }

    /**
     * trash
     * @param {Image} image Image
     * @returns {Promise<Buffer>}
     * @example let img = await canva.trash(img);
     * canva.write(img, "img.png");
     */
    static async trash(image) {
        if (!image) throw new Error("image was not provided!");
        let bg = await jimp.read(__dirname + "/assets/images/trash.png");
        image = await jimp.read(image);
        image.resize(309, 309);
        image.blur(5);
        bg.composite(image, 309, 0);
        let raw = await bg.getBufferAsync("image/png");
        return raw;
    }

    /**
     * blur
     * @param {Image} image Image
     * @param {Number} level blur level
     * @returns {Promise<Buffer>}
     * @example let img = await canva.blur(img);
     * canva.write(img, "img.png");
     */
    static async blur(image, level = 5) {
        if (!image) throw new Error("image was not provided!");
        image = await jimp.read(image);
        image.blur(isNaN(level) ? 5 : parseInt(level));
        let raw = await image.getBufferAsync("image/png");
        return raw;
    }

    /**
     * greyscale
     * @param {Image} image Image
     * @returns {Promise<Buffer>}
     * @example let img = await canva.greyscale(img);
     * canva.write(img, "img.png");
     */
    static async greyscale(image) {
        if (!image) throw new Error("image was not provided!");
        image = await jimp.read(image);
        image.greyscale();
        let raw = await image.getBufferAsync("image/png");
        return raw;
    }

    /**
     * sepia
     * @param {Image} image Image
     * @returns {Promise<Buffer>}
     * @example let img = await canva.sepia(img);
     * canva.write(img, "img.png");
     */
    static async sepia(image) {
        if (!image) throw new Error("image was not provided!");
        image = await jimp.read(image);
        image.sepia();
        let raw = await image.getBufferAsync("image/png");
        return raw;
    }

    /**
     * invert
     * @param {Image} image Image
     * @returns {Promise<Buffer>}
     * @example let img = await canva.invert(img);
     * canva.write(img, "img.png");
     */
    static async invert(image) {
        if (!image) throw new Error("image was not provided!");
        image = await jimp.read(image);
        image.invert();
        let raw = await image.getBufferAsync("image/png");
        return raw;
    }

    /**
     * delete
     * @param {Image} image Image
     * @returns {Promise<Buffer>}
     * @example let img = await canva.delete(img);
     * canva.write(img, "img.png");
     */
    static async delete(image) {
        if (!image) throw new Error("image was not provided!");
        let bg = await jimp.read(__dirname + "/assets/images/delete.png");
        image = await jimp.read(image);
        image.resize(195, 195);
        bg.composite(image, 120, 135);
        let raw = await bg.getBufferAsync("image/png");
        return raw;
    }

    /**
     * color
     * @param {Color} color name/hex
     * @returns {Promise<Buffer>}
     * @example let img = await canva.color("#FF0000");
     * canva.write(img, "img.png");
     */
    static async color(color = "RANDOM") {
        const canvas = Canvas.createCanvas(2048, 2048);
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = Canvacord._getHex(color);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return canvas.toBuffer();
    }

    /**
     * Resolves Color
     * @param {Color} color HTML5 color
     * @returns {Color}
     * @example const color = canva._getHex([255,89,56])
     * console.log(color);
     * @private
     * @ignore
     */
    static _getHex(color) {
        if (!color) return "#000000";
        if (color === "RANDOM") return "#" + Math.floor(Math.random() * (0xffffff + 1)).toString(16);
        if (["dnd", "online", "idle", "offline"].includes(color.toLowerCase())) return status[color.toLowerCase()];
        if (Array.isArray(color)) return "#" + ((color[0] << 16) + (color[1] << 8) + color[2]).toString(16);
        if (isNaN(color) && (color.startsWith("#") || color.startsWith("0x"))) return color.replace("0x", "#");
        if (!isNaN(color) && String(color).startsWith("0x")) return String(color).replace("0x", "#");
        if (!isNaN(color)) return `#${color.toString(16)}`;
        return color;
    }

    /**
     * trigger
     * @param {Image} image image
     * @returns {Promise<Buffer>}
     * @example let img = await canva.trigger(img);
     * canva.write(img, "img.gif");
     */
    static async trigger(image) {
        if (!image) throw new Error("image was not provided!");
        const base = await Canvas.loadImage(__dirname + "/assets/images/triggered.png");
        const img = await Canvas.loadImage(image);
        const GIF = new GIFEncoder(256, 310);
        GIF.start();
        GIF.setRepeat(0);
        GIF.setDelay(15);
        const canvas = Canvas.createCanvas(256, 310);
        const ctx = canvas.getContext("2d");
        const BR = 20;
        const LR = 10;
        let i = 0;
        while (i < 9) {
            ctx.clearRect(0, 0, 256, 310);
            ctx.drawImage(
                img,
                Math.floor(Math.random() * BR) - BR,
                Math.floor(Math.random() * BR) - BR,
                256 + BR,
                310 - 54 + BR
            );
            ctx.fillStyle = "#FF000033";
            ctx.fillRect(0, 0, 256, 310);
            ctx.drawImage(
                base,
                Math.floor(Math.random() * LR) - LR,
                310 - 54 + Math.floor(Math.random() * LR) - LR,
                256 + LR,
                54 + LR
            );
            GIF.addFrame(ctx);
            i++;
        }
        GIF.finish();
        return GIF.out.getData();
    }

    /**
     * hitler
     * @param {Image} image Image
     * @returns {Promise<Buffer>}
     * @example let img = await canva.hitler(img);
     * canva.write(img, "img.png");
     */
    static async hitler(image) {
        if (!image) throw new Error("Image was not provided!");
        let bg = await jimp.read(__dirname + "/assets/images/hitler.png");
        let img = await jimp.read(image);
        img.resize(140, 140);
        bg.composite(img, 46, 43);
        let raw = await bg.getBufferAsync("image/png");
        return raw;
    }

    /**
     * bed
     * @param {image1} image1 first image
     * @param {image2} image2 second image
     * @returns {Promise<Buffer>}
     * @example let img = await canva.bed(img, img1);
     * canva.write(img, "img.png");
     */
    static async bed(image1, image2) {
        if (!image1) throw new Error("first image was not provided!");
        if (!image2) throw new Error("second image was not provided!");
        let bg = await jimp.read(__dirname + "/assets/images/bed.png");
        image1 = await jimp.read(image1);
        image2 = await jimp.read(image2);
        image1.resize(100, 100);
        image2.resize(70, 70);
        let image3 = image1.clone().resize(70, 70);
        bg.composite(image1, 25, 100);
        bg.composite(image1, 25, 300);
        bg.composite(image3, 53, 450);
        bg.composite(image2, 53, 575);
        let raw = await bg.getBufferAsync("image/png");
        return raw;
    }

    /**
     * wanted
     * @param {image} Image image
     * @returns {Promise<Buffer>}
     * @example let img = await canva.wanted(img);
     * canva.write(img, "img.png");
     */
    static async wanted(image) {
        if (!image) throw new Error("no image provided!");
        let base = await jimp.read(__dirname + "/assets/images/wanted.png");
        let img = await jimp.read(image);
        img.resize(447, 447);
        base.composite(img, 145, 282);
        let raw = await base.getBufferAsync("image/png");
        return raw;
    }

    /**
     * circle
     * @param {Image} image Image
     * @returns {Promise<Buffer>}
     * @example let img = await canva.circle(img);
     * canva.write(img, "img.png");
     */
    static async circle(image) {
        if (!image) throw new Error("image was not provided!");
        image = await jimp.read(image);
        image.circle();
        let raw = await image.getBufferAsync("image/png");
        return raw;
    }

    /**
     * jail
     * @param {image} Image image
     * @returns {Promise<Buffer>}
     * @example let img = await canva.jail(img);
     * canva.write(img, "img.png");
     */
    static async jail(image) {
        if (!image) throw new Error("no image provided!");
        let canvas = Canvas.createCanvas(350, 350);
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 350, 350);
        let avatar = await Canvas.loadImage(image);
        ctx.drawImage(avatar, 0, 0, 350, 350);
        let layer = await Canvas.loadImage(__dirname + "/assets/images/jail.png");
        ctx.drawImage(layer, 0, 0, 350, 350);
        return canvas.toBuffer();
    }

    /**
     * affect
     * @param {image} Image image
     * @returns {Promise<Buffer>}
     * @example let img = await canva.affect(img);
     * canva.write(img, "img.png");
     */
    static async affect(image) {
        if (!image) throw new Error("no image provided!");
        let base = await jimp.read(__dirname + "/assets/images/affect.png");
        let img = await jimp.read(image);
        img.resize(200, 157);
        base.composite(img, 180, 383);
        let raw = await base.getBufferAsync("image/png");
        return raw;
    }

    /**
     * dither
     * @param {Image} image Image
     * @returns {Promise<Buffer>}
     * @example let img = await canva.dither(img);
     * canva.write(img, "img.png");
     */
    static async dither(image) {
        if (!image) throw new Error("image was not provided!");
        image = await jimp.read(image);
        image.dither565();
        let raw = await image.getBufferAsync("image/png");
        return raw;
    }

    /**
     * wasted
     * @param {Buffer} Image Image to manipulate
     * @returns {Promise<Buffer>}
     * @example let img = await canva.wasted(img);
     * canva.write(img, "img.png");
     */
    static async wasted(Image) {
        let converted = await Canvacord.greyscale(Image);
        const canvas = Canvas.createCanvas(500, 500);
        const ctx = canvas.getContext("2d");
        const base = await Canvas.loadImage(__dirname + "/assets/images/wasted.png");
        const img = await Canvas.loadImage(converted);
        ctx.drawImage(img, 0, 0, 500, 500);
        ctx.drawImage(base, 0, 0, 500, 500);
        return canvas.toBuffer();
    }

    /**
     * Reads the image
     * @param {Buffer|String} image buffer or string to read image from.
     * @returns {Promise<Buffer>}
     */
    static async read(image) {
        if (!image) throw new Error("No image provided!");
        let i = await Canvas.loadImage(image);
        return i;
    }

    /**
     * rank card
     * @param {String} username Username
     * @param {String} discrim Discriminator
     * @param {String} level User level
     * @param {String} rank User rank
     * @param {String} neededXP XP needed to reach next level
     * @param {String} currentXP Current XP of a user
     * @param {Buffer|String} avatarURL Avatar URL or {Buffer} or Canvacord {Buffer} itself
     * @param {String} color Hex or HTML5 color name or rgb
     * @param {String|Buffer} background Rank card background image
     * @param {Boolean} overlay Keep overlay or not
     * @param {String} status The user status. Must be one of online, idle, offline or dnd
     * @param {Array} gradient Creates the gradient filled progress bar. Color will be ignored!
     * @returns {Promise<Buffer>}
     * @example let img = await canva.rank({ username: "Snowflake", discrim: "0007", level: 4, rank: 12, neededXP: 500, currentXP: 407, avatarURL: "...", color: "#FFFFFF" });
     * canva.write(img, "img.png");
     */
    static async rank(
        options = {
            username,
            discrim,
            level,
            rank,
            neededXP,
            currentXP,
            avatarURL,
            color: "#FFFFFF",
            background,
            overlay: true,
            status: "online",
            gradient: []
        }
    ) {
        if (!options.username) throw new Error("No username was provided!");
        if (!options.level) throw new Error("No level was provided!");
        if (!options.rank) throw new Error("No rank was provided!");
        if (!options.neededXP) throw new Error("No totalXP was provided!");
        if (!options.currentXP) throw new Error("No currentXP was provided!");
        if (!options.avatarURL) throw new Error("No avatarURL was provided!");
        if (!options.color || typeof options.color !== "string") options.color = "#FFFFFF";
        if (options.overlay !== false) options.overlay = true;
        if (!options.status) options.status = "online";
        if (
            typeof options.status !== "string" ||
            !["online", "offline", "idle", "dnd"].includes(options.status.toLowerCase())
        )
            throw new Error("Status must be one of online, idle, dnd or offline.");
        let {
            username,
            discrim,
            level,
            rank,
            neededXP,
            currentXP,
            avatarURL,
            color,
            background,
            overlay,
            status,
            gradient
        } = options;

        Canvas.registerFont(__dirname + "/assets/fonts/regular-font.ttf", {
            family: "Manrope",
            weight: "regular",
            style: "normal"
        });
        Canvas.registerFont(__dirname + "/assets/fonts/bold-font.ttf", {
            family: "Manrope",
            weight: "bold",
            style: "normal"
        });
        const canvas = Canvas.createCanvas(934, 282);
        const ctx = canvas.getContext("2d");
        let bg;
        let rankCard;
        if ((overlay && typeof background === "string") || Buffer.isBuffer(background)) {
            bg = await Canvas.loadImage(background);
            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
            rankCard = await Canvas.loadImage(__dirname + "/assets/images/rankcard2.png");
        } else if (!overlay && (typeof background === "string" || Buffer.isBuffer(background))) {
            bg = await Canvas.loadImage(background);
            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
            rankCard = await Canvas.loadImage(__dirname + "/assets/images/rankcard3.png");
        } else rankCard = await Canvas.loadImage(__dirname + "/assets/images/rankcard.png");
        ctx.drawImage(rankCard, 0, 0, canvas.width, canvas.height);

        const avatar = await Canvas.loadImage(await Canvacord.circle(avatarURL));
        ctx.drawImage(avatar, 70, 50, 180, 180);

        let i = await Canvas.loadImage(await Canvacord.circle(statuses[status.toLowerCase() || "online"]));
        ctx.drawImage(i, 200, 185, 40, 40);

        const font = "Manrope";

        ctx.font = `bold 36px ${font}`;
        ctx.fillStyle = color || "#FFFFFF";
        ctx.textAlign = "start";
        const name = username.length > 12 ? username.substring(0, 12).trim() + "..." : username;
        ctx.fillText(`${name}`, 280, 164);
        ctx.font = `36px ${font}`;
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.textAlign = "center";
        if (discrim) ctx.fillText(`#${discrim}`, ctx.measureText(name).width + 20 + 335, 164);

        ctx.font = `bold 36px ${font}`;
        ctx.fillStyle = color || "#FFFFFF";
        ctx.textAlign = "end";
        ctx.fillText(level, 934 - 64, 82);
        ctx.fillStyle = color || "#FFFFFF";
        ctx.fillText("LEVEL", 934 - 64 - ctx.measureText(level).width - 16, 82);

        ctx.font = `bold 36px ${font}`;
        ctx.fillStyle = color || "#FFFFFF";
        ctx.textAlign = "end";
        ctx.fillText(rank, 934 - 64 - ctx.measureText(level).width - 16 - ctx.measureText(`LEVEL`).width - 16, 82);
        ctx.fillStyle = color || "#FFFFFF";
        ctx.fillText(
            "RANK",
            934 -
                64 -
                ctx.measureText(level).width -
                16 -
                ctx.measureText(`LEVEL`).width -
                16 -
                ctx.measureText(rank).width -
                16,
            82
        );

        ctx.font = `bold 36px ${font}`;
        ctx.fillStyle = color || "#FFFFFF";
        ctx.textAlign = "start";
        ctx.fillText("/ " + Util.toAbbrev(neededXP), 670 + ctx.measureText(Util.toAbbrev(currentXP)).width + 15, 164);
        ctx.fillStyle = color || "#FFFFFF";
        ctx.fillText(Util.toAbbrev(currentXP), 670, 164);

        let widthXP = (currentXP * 615) / neededXP;
        if (widthXP > 615 - 18.5) widthXP = 615 - 18.5;

        ctx.beginPath();
        ctx.fillStyle = "#424751";
        ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
        ctx.fill();
        ctx.fillRect(257 + 18.5, 147.5 + 36.25, 615 - 18.5, 37.5);
        ctx.arc(257 + 615, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
        ctx.fill();

        ctx.beginPath();
        if (Array.isArray(gradient) && gradient.length > 0) {
            gradient.length = 2;
            let gradientContext = ctx.createRadialGradient(widthXP, 0, 500, 0);
            gradient.forEach((i) => {
                gradientContext.addColorStop(gradient.indexOf(i), i);
            });
            ctx.fillStyle = gradientContext;
        } else {
            ctx.fillStyle = color;
        }
        ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
        ctx.fill();
        ctx.fillRect(257 + 18.5, 147.5 + 36.25, widthXP, 37.5);
        ctx.arc(257 + 18.5 + widthXP, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
        ctx.fill();

        return canvas.toBuffer();
    }

    /**
     * welcome
     * @param {String} username Username
     * @param {String} discrim Discriminator
     * @param {String} avatarURL Avatar URL or {Buffer} or Canvacord {Buffer} itself
     * @param {String} color Hex or HTML5 color name or rgb
     * @returns {Promise<Buffer>}
     * @example let img = await canva.welcome({ username: "Snowflake", discrim: "0007", avatarURL: "..." });
     * canva.write(img, "img.png");
     */
    static async welcome({ username, discrim, avatarURL }) {
        if (!username) throw new Error("No username was provided!");
        if (!discrim) throw new Error("No discrim was provided!");
        if (!avatarURL) throw new Error("No avatarURL was provided!");

        Canvas.registerFont(__dirname + "/assets/fonts/regular-font.ttf", {
            family: "Manrope",
            weight: "regular",
            style: "normal"
        });
        Canvas.registerFont(__dirname + "/assets/fonts/bold-font.ttf", {
            family: "Manrope",
            weight: "bold",
            style: "normal"
        });

        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext("2d");

        const background = await Canvas.loadImage(__dirname + "/assets/images/welcomebg.png");
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        const font = "Manrope";

        ctx.font = `20px ${font}`;
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "start";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "black";
        ctx.fillText("Welcome", 260, 100);

        const welcometextPosition = { width: 260, height: 150 };

        let fontSize = 55;
        ctx.font = `bold ${fontSize}px ${font}`;

        do {
            fontSize -= 1;
            ctx.font = `bold ${fontSize}px ${font}`;
        } while (ctx.measureText(`${username}#${discrim}!`).width > 430);

        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "start";
        ctx.fillText(`${username}`, welcometextPosition.width, welcometextPosition.height, 455);

        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.textAlign = "start";
        ctx.fillText(
            `#${discrim}!`,
            ctx.measureText(`${username}`).width + welcometextPosition.width,
            welcometextPosition.height
        );

        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const avatar = await Canvas.loadImage(avatarURL);
        ctx.drawImage(avatar, 25, 25, 200, 200);

        return canvas.toBuffer();
    }

    /**
     * welcome
     * @param {String} username Username
     * @param {String} discrim Discriminator
     * @param {String} avatarURL Avatar URL or {Buffer} or Canvacord {Buffer} itself
     * @param {String} color Hex or HTML5 color name or rgb
     * @returns {Promise<Buffer>}
     * @example let img = await canva.welcomer({ username: "Snowflake", discrim: "0007", avatarURL: "..." });
     * canva.write(img, "img.png");
     */
    static async welcomer(...options) {
        return Canvacord.welcome(...options);
    }

    /**
     * leaver
     * @param {String} username Username
     * @param {String} discrim Discriminator
     * @param {String} avatarURL Avatar URL or {Buffer} or Canvacord {Buffer} itself
     * @param {String} color Hex or HTML5 color name or rgb
     * @returns {Promise<Buffer>}
     * @example let img = await canva.leaver({ username: "Snowflake", discrim: "0007", avatarURL: "..." });
     * canva.write(img, "img.png");
     */
    static async leaver({ username, discrim, avatarURL, color }) {
        if (!username) throw new Error("No username was provided!");
        if (!discrim) throw new Error("No discrim was provided!");
        if (!avatarURL) throw new Error("No avatarURL was provided!");

        Canvas.registerFont(__dirname + "/assets/fonts/regular-font.ttf", {
            family: "Manrope",
            weight: "regular",
            style: "normal"
        });
        Canvas.registerFont(__dirname + "/assets/fonts/bold-font.ttf", {
            family: "Manrope",
            weight: "bold",
            style: "normal"
        });

        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext("2d");

        const background = await Canvas.loadImage(__dirname + "/assets/images/welcomebg.png");
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        const font = "Manrope";

        ctx.font = `20px ${font}`;
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "start";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "black";
        ctx.fillText("Goodbye", 260, 100);

        const welcometextPosition = { width: 260, height: 150 };

        let fontSize = 55;
        ctx.font = `bold ${fontSize}px ${font}`;

        do {
            fontSize -= 1;
            ctx.font = `bold ${fontSize}px ${font}`;
        } while (ctx.measureText(`${username}#${discrim}!`).width > 430);

        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "start";
        ctx.fillText(`${username}`, welcometextPosition.width, welcometextPosition.height, 455);

        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.textAlign = "start";
        ctx.fillText(
            `#${discrim}!`,
            ctx.measureText(`${username}`).width + welcometextPosition.width,
            welcometextPosition.height
        );

        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const avatar = await Canvas.loadImage(avatarURL);
        ctx.drawImage(avatar, 25, 25, 200, 200);

        return canvas.toBuffer();
    }

    /**
     * leaver
     * @param {String} username Username
     * @param {String} discrim Discriminator
     * @param {String} avatarURL Avatar URL or {Buffer} or Canvacord {Buffer} itself
     * @param {String} color Hex or HTML5 color name or rgb
     * @returns {Promise<Buffer>}
     * @example let img = await canva.leave({ username: "Snowflake", discrim: "0007", avatarURL: "..." });
     * canva.write(img, "img.png");
     */
    static async leave(...options) {
        return Canvacord.leaver(...options);
    }

    /**
     * pixelate
     * @param {Image} image Image
     * @param {Number} level pixelation level
     * @returns {Promise<Buffer>}
     * @example let img = await canva.pixelate({ username: "Snowflake", discrim: "0007", avatarURL: "..." });
     * canva.write(img, "img.png");
     */
    static async pixelate(image, level = 10) {
        if (!image) throw new Error("image was not provided!");
        image = await jimp.read(image);
        image.pixelate(isNaN(level) ? 10 : parseInt(level));
        let raw = await image.getBufferAsync("image/png");
        return raw;
    }

    /**
     * writes the buffer to a file
     * @param {{Buffer}} buffer
     * @param {String} filename
     * @returns {Promise<void>}
     * @example canva.write(await canva.color("RED"), "redColor.png");
     */
    static async write(buffer, filename) {
        if (!buffer) throw new Error("No buffer provided!");
        if (!filename) filename = "image.png";
        return fs.writeFileSync(filename, buffer);
    }

    /**
     * JokeOverTheHead
     * @param {String|Buffer} image Image to manipulate
     * @returns {Promise<Buffer>}
     * @example let img = await canva.jokeoverhead(image);
     * canva.write(img, "img.png");
     */
    static async jokeoverhead(image) {
        if (!image) throw new Error("no image provided!");
        let canvas = Canvas.createCanvas(425, 404);
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 425, 404);
        image = await Canvas.loadImage(await Canvacord.circle(image));
        ctx.drawImage(image, 125, 130, 140, 135);
        let layer = await Canvas.loadImage(__dirname + "/assets/images/jokeoverhead.png");
        ctx.drawImage(layer, 0, 0, 425, 404);
        return canvas.toBuffer();
    }

    /**
     * Blurplefy the image
     * @param {String|Buffer} image Image to manipulate
     * @param {Number} r Red color placeholder
     * @param {Number} g Green color placeholder
     * @param {Number} b Blue color placeholder
     * @returns {Promise<Buffer>}
     * @example let img = await canva.replaceColor(image, { r, g, b });
     * canva.write(img, "img.png");
     */
    static async replaceColor(image, { r, g, b }) {
        if (!image) throw new Error("No image provided!");

        image = await jimp.read(image);
        if (Array.isArray(r) && Array.isArray(g) && Array.isArray(b)) {
            image.color([
                { apply: "red", params: r },
                { apply: "green", params: g },
                { apply: "blue", params: b }
            ]);
        }
        if (!r || !g || !b || isNaN(r) || isNaN(g) || isNaN(b)) return image;
        image.color([
            { apply: "red", params: [parseInt(r)] },
            { apply: "green", params: [parseInt(g)] },
            { apply: "blue", params: [parseInt(b)] }
        ]);

        return await image.getBufferAsync("image/png");
    }

    /**
     * Change my mind
     * @param {String} text Text
     * @returns {Promise<Buffer>}
     * @example let img = await canva.changemymind(text);
     * canva.write(img, "img.png");
     */
    static async changemymind(text) {
        if (!text) throw new Error("No text was provided!");
        const base = await Canvas.loadImage(__dirname + "/assets/images/changemymind.jpg");
        const canvas = Canvas.createCanvas(base.width, base.height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(base, 0, 0, canvas.width, canvas.height);
        let x = text.length;
        let fontSize = 70;
        if (x <= 15) {
            ctx.translate(310, 365);
        } else if (x <= 30) {
            fontSize = 50;
            ctx.translate(315, 365);
        } else if (x <= 70) {
            fontSize = 40;
            ctx.translate(315, 365);
        } else if (x <= 85) {
            fontSize = 32;
            ctx.translate(315, 365);
        } else if (x < 100) {
            fontSize = 26;
            ctx.translate(315, 365);
        } else if (x < 120) {
            fontSize = 21;
            ctx.translate(315, 365);
        } else if (x < 180) {
            fontSize = 0.0032 * (x * x) - 0.878 * x + 80.545;
            ctx.translate(315, 365);
        } else if (x < 700) {
            fontSize = 0.0000168 * (x * x) - 0.0319 * x + 23.62;
            ctx.translate(310, 338);
        } else {
            fontSize = 7;
            ctx.translate(310, 335);
        }
        ctx.font = `${fontSize}px 'Arial'`;
        ctx.rotate(-0.39575);

        const lines = Util.getLines({ text, ctx, maxWidth: 345 });
        let i = 0;
        while (i < lines.length) {
            ctx.fillText(lines[i], 10, i * fontSize - 5);
            i++;
        }
        return canvas.toBuffer();
    }

    /**
     * Deepfry the image
     * @param {String|Buffer} image image to deepfry
     * @returns {Promise<Buffer>}
     * @example let img = await canva.deepfry(image);
     * canva.write(img, "img.png");
     */
    static async deepfry(image) {
        if (!image) throw new Error("No image provided!");
        image = await Canvas.loadImage(image);
        const canvas = Canvas.createCanvas(1024, 1024);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0;
        ctx.fillStyle = "#FF591A";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1.0;
        ctx.globalCompositeOperation = "saturation";
        ctx.fillStyle = "hsl(0, 100%, 50%)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "source-over";

        let data = ctx.getImageData(0, 0, canvas.width, canvas.height);
        data = Util.brightnessContrastPhotoshop(data, 52, 60);
        ctx.putImageData(data, 0, 0);
        data = Util.brightnessContrastPhotoshop(data, 32, 40);
        data = Util.grain(data);
        ctx.putImageData(data, 0, 0);

        return canvas.toBuffer();
    }

    /**
     * Creates qr code
     * @param {String} text text for the qr code
     * @param {Object} options QR code options
     * @param {String} [options.color] QR Code color
     * @param {String} [options.background] Background color of the qr code
     * @returns {Promise<Buffer>}
     * @example let img = await canva.createQRCode(text);
     * canva.write(img, "img.png");
     */
    static async createQRCode(text, options = { background: "#FFFFFF", color: "#000000" }) {
        if (!text) throw new Error("No text specified!");
        let img = `https://api.qrserver.com/v1/create-qr-code/?size=1024x1024&data=${encodeURIComponent(
            text
        )}&color=${options.color.replace("#", "")}&bgcolor=${options.background.replace("#", "")}`;
        img = await jimp.read(img);
        return await img.getBufferAsync("image/png");
    }

    /**
     * YouTube comment
     * @param {String|Buffer} image Image
     * @param {String} username Username
     * @param {String} comment Comment
     * @returns {Promise<Buffer>}
     * @example let img = await canva.youtube(image, "PewDiePie", "B*tch Lasagna");
     * canva.write(img, "img.png");
     */
    static async youtube(image, username, comment) {
        if (!image) throw new Error("No image provided!");
        if (!username) throw new Error("No username provided!");
        if (!comment) throw new Error("No comment provided!");

        let base = await jimp.read(__dirname + "/assets/images/youtube.png");
        base.resize(650, 183);
        let avatar = await await jimp.read(await Canvacord.circle(image));
        avatar.resize(52, 52);

        base.composite(avatar, 17, 33);

        let font = await jimp.loadFont(jimp.FONT_SANS_16_BLACK);

        let time = Math.floor(Math.random() * (59 - 1)) + 1;
        time = `${time + (time == 1 ? " minute" : " minutes")} ago`;

        base.print(font, 92, 34, username.substr(0, 20));
        base.print(font, 200, 34, time);
        base.print(font, 92, 59, comment.substr(0, 40));

        return await base.getBufferAsync("image/png");
    }

    /**
     * Ew, I stepped in shit...
     * @param {String|Buffer} image Image source
     * @returns {Promise<Buffer>}
     * @example let img = await canva.shit(image);
     * canva.write(img, "img.png");
     */
    static async shit(image) {
        if (!image) throw new Error("No image provided!");
        image = await jimp.read(image);
        image.resize(170, 170);
        let base = await jimp.read(__dirname + "/assets/images/shit.png");
        image.rotate(52, false);
        base.composite(image, 210, 700);
        return await base.getBufferAsync("image/png");
    }

    /**
     * Distracted boyfriend
     * @param {String|Buffer} image1 Face for the girl in red color
     * @param {String|Buffer} image2 Face for the boy
     * @param {String|Buffer} image3 Face for the other girl [optional]
     * @returns {Promise<Buffer>}
     * @example let img = await canvacord.distracted("firstImage.png", "secondImage.png", "thirdImage.png")
     * canvacord.write(img, "distracted.png");
     */
    static async distracted(image1, image2, image3 = null) {
        if (!image1) throw new Error("No image1 provided!");
        if (!image2) throw new Error("No image2 provided!");
        let base = await jimp.read(__dirname + "/assets/images/distracted.jpg");

        image1 = await jimp.read(await Canvacord.circle(image1));
        image1.resize(150, 150);

        image2 = await jimp.read(await Canvacord.circle(image2));
        image2.resize(130, 130);

        base.composite(image1, 180, 90);
        base.composite(image2, 480, 35);
        if (image3 && image3 !== null) {
            image3 = await jimp.read(await Canvacord.circle(image3));
            image3.resize(130, 130);
            base.composite(image3, 730, 110);
        }

        return await base.getBufferAsync("image/png");
    }

    /**
     * Clyde
     * @param {String} message Message
     * @returns {Promise<Buffer>}
     * @example const image = await canvacord.clyde("You can't do that");
     * canva.write(image, "clyde.png");
     */
    static async clyde(message) {
        if (!message) messgae = "Please provide text!";
        let avatar = await Canvas.loadImage(
            await Canvacord.circle(
                "https://images.discordapp.net/avatars/536953835361665024/ea7664a628a7a4b772dd06ed81637334.png?size=512"
            )
        );
        let badge = await Canvas.loadImage("https://i.imgur.com/f3sGMSW.png");
        Canvas.registerFont(__dirname + "/assets/fonts/Whitney-medium.otf", {
            family: "Whitney",
            weight: "regular",
            style: "normal"
        });

        Canvas.registerFont(__dirname + "/assets/fonts/regular-font.ttf", {
            family: "Manrope",
            weight: "regular",
            style: "normal"
        });

        const canvas = Canvas.createCanvas(1500, 300);

        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#36393E";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(avatar, 75, 30, 130, 130);
        ctx.drawImage(badge, 360, 45, 100, 40);

        ctx.font = "40px Manrope";
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "start";
        await Util.toEmojiMessage(ctx, message.substr(0, 66), 230, 150);

        ctx.font = "50px Whitney";
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "start";
        ctx.fillText("Clyde", 230, 80);

        ctx.font = "40px Whitney";
        ctx.fillStyle = "#7D7D7D";
        ctx.textAlign = "start";
        ctx.fillText(Util.toDiscordTime(), 470, 80);

        ctx.font = "20px Manrope";
        ctx.fillStyle = "#7D7D7D";
        ctx.textAlign = "start";
        ctx.fillText("Only you can see this  —", 240, 190);

        ctx.font = "20px Manrope";
        ctx.fillStyle = "#2785C7";
        ctx.textAlign = "start";
        ctx.fillText("delete this message.", 240 + ctx.measureText("Only you can see this  —").width + 10, 190);

        return canvas.toBuffer();
    }

    /**
     * Fake Quote
     * @param {Object} options Options
     * @param {Buffer|String} [options.image] Image
     * @param {String} [options.message] Message
     * @param {String} [options.username] Username
     * @param {String} [options.color] Color
     * @returns {Promise<Buffer>}
     * @example const image = await canvacord.quote({ image: "...", message: "You can't do that", username: "Canvacord", color: "pink" });
     * canva.write(image, "quote.png");
     */
    static async quote(options = { image, message, username, color }) {
        if (!options.image)
            options.image =
                "https://images.discordapp.net/avatars/536953835361665024/ea7664a628a7a4b772dd06ed81637334.png?size=512";
        if (!options.message) options.message = "Please provide text!";
        if (!options.username) options.username = "Clyde";
        if (!options.color) options.color = "#FFFFFF";

        options.image = await Canvas.loadImage(await Canvacord.circle(options.image));

        Canvas.registerFont(__dirname + "/assets/fonts/Whitney-medium.otf", {
            family: "Whitney",
            weight: "regular",
            style: "normal"
        });

        Canvas.registerFont(__dirname + "/assets/fonts/regular-font.ttf", {
            family: "Manrope",
            weight: "regular",
            style: "normal"
        });

        const canvas = Canvas.createCanvas(1500, 300);

        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#36393E";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(options.image, 75, 30, 130, 130);

        ctx.font = "40px Manrope";
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "start";
        await Util.toEmojiMessage(ctx, options.message.substr(0, 66), 230, 150);

        ctx.font = "50px Whitney";
        ctx.fillStyle = typeof options.color == "string" ? options.color : "#FFFFFF";
        ctx.textAlign = "start";
        ctx.fillText(typeof options.username === "string" ? options.username.substr(0, 17) : "Clyde", 230, 80);

        ctx.font = "40px Whitney";
        ctx.fillStyle = "#7D7D7D";
        ctx.textAlign = "start";
        ctx.fillText(Util.toDiscordTime(), 240 + ctx.measureText(options.username.substr(0, 17)).width + 110, 80);

        return canvas.toBuffer();
    }

    /**
     * PornHub Comment
     * @param {Object} options Options
     * @param {String} [options.username] Username
     * @param {String} [options.message] Comment
     * @param {String|Buffer} [options.image] Image
     * @returns {Promise<Buffer>}
     * @example const image = await canvacord.phub({ username: "User", message: "Looks good 👏🏻", image: "..." });
     */
    static async phub(options = { username, message, image }) {
        if (!options.username) throw new Error("Username may not be empty!");
        if (!options.message) throw new Error("Message may not be empty!");
        if (!options.image) throw new Error("Image may not be empty!");

        let image = await Canvas.loadImage(options.image);
        let baseImage = await Canvas.loadImage(__dirname + "/assets/images/phub.png");

        let canvas = Canvas.createCanvas(baseImage.width, baseImage.height);
        let ctx = canvas.getContext("2d");

        ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 30, 310, 70, 70);

        ctx.font = "32px Arial";
        ctx.fillStyle = "#F99600";
        ctx.textAlign = "start";
        ctx.fillText(options.username.substr(0, 20), 115, 350);

        ctx.font = "32px Arial";
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "start";
        await Util.toEmojiMessage(ctx, options.message.substr(0, 50), 30, 430);

        return canvas.toBuffer();
    }

    /**
     * Canvacord Version
     */
    static get version() {
        return require("../package.json").version;
    }

    /**
     * Spotify card
     * @param {object} options required params
     * @param {string} [options.title] Song name
     * @param {string} [options.artist] Song name
     * @param {string} [options.album] Ablum
     * @param {string|Buffer} [options.image] Image
     * @param {number} [options.start] Timestamp when song started
     * @param {number} [options.end] Timestamp when song ends
     * @returns {Promise<Buffer>}
     * @example const img = await canvacord.spotify({
     *     title: "Faded",
     *     artist: "Alan Walker",
     *     album: "Different World",
     *     image: "...",
     *     start: START_TIMESTAMP,
     *     end: END_TIMESTAMP
     * });
     *
     * canvacord.write(img, "spotify.png");
     */
    static async spotify(options = { title: null, image: null, artist: null, album: null, start: null, end: null }) {
        if (!options) throw new Error('Missing parameter "options".');
        if (!options.title) throw new Error('Missing "title" in options.');
        if (!options.artist) throw new Error('Missing "artist" in options.');
        if (!options.start) throw new Error('Missing "start" in options.');
        if (!options.end) throw new Error('Missing "end" in options.');

        const total = options.end - options.start;
        const progress = Date.now() - options.start;
        const progressF = Util.formatTime(progress > total ? total : progress);
        const ending = Util.formatTime(total);

        const getProgress = () => {
            let prg = (progress / total) * 300;
            if (isNaN(prg) || prg < 0) return 0;
            if (prg > 300) return 300;
            return prg;
        };

        Canvas.registerFont(__dirname + "/assets/fonts/regular-font.ttf", {
            family: "Manrope",
            weight: "regular",
            style: "normal"
        });

        Canvas.registerFont(__dirname + "/assets/fonts/bold-font.ttf", {
            family: "Manrope",
            weight: "bold",
            style: "normal"
        });

        const canvas = Canvas.createCanvas(600, 150);
        const ctx = canvas.getContext("2d");

        // background
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#2F3136";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // draw image
        const img = await Canvas.loadImage(options.image);

        ctx.drawImage(img, 20, 20, 100, 100);

        // draw songname
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 20px Manrope";
        ctx.fillText(Util.shorten(options.title, 30), 170, 40);

        // draw artist name
        ctx.fillStyle = "#F1F1F1";
        ctx.font = "14px Manrope";
        ctx.fillText(`by ${Util.shorten(options.artist, 40)}`, 170, 70);

        // add album
        if (options.album && typeof options.album === "string") {
            ctx.fillStyle = "#F1F1F1";
            ctx.font = "14px Manrope";
            ctx.fillText(`on ${Util.shorten(options.album, 40)}`, 170, 90);
        }

        // ending point
        ctx.fillStyle = "#B3B3B3";
        ctx.font = "14px Manrope";
        ctx.fillText(ending, 430, 130);

        // progress
        ctx.fillStyle = "#B3B3B3";
        ctx.font = "14px Manrope";
        ctx.fillText(progressF, 170, 130);

        // progressbar track
        ctx.rect(170, 170, 300, 4);
        ctx.fillStyle = "#E8E8E8";
        ctx.fillRect(170, 110, 300, 4);

        // progressbar
        ctx.fillStyle = "#1DB954";
        ctx.fillRect(170, 110, getProgress(), 4);

        // return
        return canvas.toBuffer();
    }

    /**
     * Attachment object for discord.js
     * @param {string|Buffer} data Data
     * @param {string} name name
     * @example const data = await canvacord.color("blue");
     * const img = canvacord.Attachment(data, "color.png");
     * return message.channel.send(img);
     */
    static Attachment(data, name, raw = false) {
        if (!raw)
            return {
                files: [{ attachment: data, name: name || null }]
            };

        return { attachment: data, name: name || null };
    }

    /**
     * Rotates image
     * @param {string|Buffer} image Image to rotate
     * @param {number} angle Rotation angle
     * @example const img = await canvacord.rotate(image, 90);
     * canvacord.write(img, "image.png");
     * @returns {Promise<Buffer>}
     */
    static async rotate(image, angle = 0) {
        if (!image) throw new Error("Invalid image provided!");
        image = await jimp.read(image);
        image.rotate(angle);
        return await image.getBufferAsync("image/png");
    }
}

module.exports = Canvacord;

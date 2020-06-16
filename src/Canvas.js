/**
  * Initial Release - 7 March 2020
  * @author Snowflake107, Zyrouge
  * @license Apache License 2.0
  * xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  * A permissive license whose main conditions 
  * require preservation of copyright and license 
  * notices. Contributors provide an express grant 
  * of patent rights. Licensed works, modifications, 
  * and larger works may be distributed under different
  * terms and without source code.
  * xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  */

const Canvas = require("canvas");
const jimp = require("jimp");
const GIFEncoder = require("gifencoder");
const circle = require('@jimp/plugin-circle');
const configure = require('@jimp/custom');
const fetch = require("node-fetch");

// load custom plugins
configure({ plugins: [circle] }, jimp);

/**
  * Canvacord
  * Simple and easy to use image manipulation module 
  * created and maintained by Snowflake107.
  * @example const Canvacord = require("canvacord");
  * const canva = new Canvacord.Canvas();
  */
class Canvacord {

    /**
     * batslap
     * @param {Image1} image1 first image
     * @param {Image2} image2 second image
     * @returns <Buffer>
     */
    async batslap(image1, image2) {
        if (!image1) throw new Error("first image was not provided!");
        if (!image2) throw new Error("second image was not provided!");
        let base = await jimp.read(__dirname+"/assets/batslap.png");
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
     * @returns <Buffer>
     */
    async beautiful(image) {
        if (!image) throw new Error("image was not provided!");
        let base = await jimp.read(__dirname +"/assets/beautiful.png");
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
     * @returns <Buffer>
     */
    async facepalm(image) {
        if (!image) throw new Error("image was not provided!");
        let canvas = Canvas.createCanvas(632, 357);
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 632, 357);
        let avatar = await Canvas.loadImage(image);
        ctx.drawImage(avatar, 199, 112, 235, 235);
        let layer = await Canvas.loadImage(__dirname +"/assets/facepalm.png");
        ctx.drawImage(layer, 0, 0, 632, 357);
        return canvas.toBuffer();
    }

    /**
     * gay
     * @param {Image} image Image
     * @returns <Buffer>
     */
    async gay(image) {
        if (!image) throw new Error("image was not provided!");
        let bg = await Canvas.loadImage(__dirname +"/assets/gay.png");
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
     * @returns <Buffer>
     */
    async kiss(image1, image2) {
        if (!image1) throw new Error("first image was not provided!");
        if (!image2) throw new Error("second image was not provided!");
        const canvas = Canvas.createCanvas(768, 574);
        const ctx = canvas.getContext("2d");
        const background = await Canvas.loadImage(__dirname +"/assets/kiss.png");
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
     * @returns <Buffer>
     */
    async rip(image) {
        if (!image) throw new Error("image was not provided!");
        const canvas = Canvas.createCanvas(244, 253);
        const ctx = canvas.getContext("2d");
        const background = await Canvas.loadImage(__dirname +"/assets/rip.png");
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const avatar = await Canvas.loadImage(image);
        ctx.drawImage(avatar, 63, 110, 90, 90);
        return canvas.toBuffer();
    }

    /**
     * spank
     * @param {image1} image1 first image
     * @param {image2} image2 second image
     * @returns <Buffer>
     */
    async spank(image1, image2) {
        if (!image1) throw new Error("first image was not provided!");
        if (!image2) throw new Error("second image was not provided!");
        let bg = await jimp.read(__dirname +"/assets/spank.png");
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
     * @returns <Buffer>
     */
    async trash(image) {
        if (!image) throw new Error("image was not provided!");
        let bg = await jimp.read(__dirname +"/assets/trash.png");
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
     * @returns <Buffer>
     */
    async blur(image, level = 5) {
        if (!image) throw new Error("image was not provided!");
        image = await jimp.read(image);
        image.blur(isNaN(level) ? 5 : parseInt(level));
        let raw = await image.getBufferAsync("image/png");
        return raw;
    }

    /**
     * greyscale
     * @param {Image} image Image
     * @returns <Buffer>
     */
    async greyscale(image) {
        if (!image) throw new Error("image was not provided!");
        image = await jimp.read(image);
        image.greyscale();
        let raw = await image.getBufferAsync("image/png");
        return raw;
    }

    /**
     * sepia
     * @param {Image} image Image
     * @returns <Buffer>
     */
    async sepia(image) {
        if (!image) throw new Error("image was not provided!");
        image = await jimp.read(image);
        image.sepia();
        let raw = await image.getBufferAsync("image/png");
        return raw;
    }

    /**
     * invert
     * @param {Image} image Image
     * @returns <Buffer>
     */
    async invert(image) {
        if (!image) throw new Error("image was not provided!");
        image = await jimp.read(image);
        image.invert();
        let raw = await image.getBufferAsync("image/png");
        return raw;
    }

    /**
     * delete
     * @param {Image} image Image
     * @returns <Buffer>
     */
    async delete(image) {
        if (!image) throw new Error("image was not provided!");
        let bg = await jimp.read(__dirname + "/assets/delete.png");
        image = await jimp.read(image);
        image.resize(195, 195);
        bg.composite(image, 120, 135);
        let raw = await bg.getBufferAsync("image/png");
        return raw;
    }

    /**
     * color
     * @param {Color} color name/hex
     * @returns <Buffer>
     */
    async color(color = "RANDOM") {
        const canvas = Canvas.createCanvas(2048, 2048);
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = this._getHex(color);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return canvas.toBuffer();
    }

    /**
      * Resolves Color
      * @param {Color} color HTML5 color
      * @private
      */
    _getHex(color) {
        if (!color) return "#000000";
        if (color === "RANDOM") return "#"+(Math.floor(Math.random() * (0xFFFFFF + 1))).toString(16);
        if (typeof color == "string" && color.startsWith("rgb(") return this._getHex(color.replace("rgb(", "").replace(")", "").split(",").map(x => parseInt(x)));
        if (Array.isArray(color)) return "#"+((color[0] << 16) + (color[1] << 8) + color[2]).toString(16);
        if (isNaN(color) && (color.startsWith("#") || color.startsWith("0x"))) return color.replace("0x", "#");;
        if (!isNaN(color) && String(color).startsWith("0x")) return String(color).replace("0x", "#");
        if (!isNaN(color)) return `#${color.toString(16)}`;
        return color;
    }

    /**
     * trigger
     * @param {Image} image image
     * @returns <Buffer>
     */
    async trigger(image) {
        if (!image) throw new Error("image was not provided!");
        const base = await Canvas.loadImage(__dirname +"/assets/triggered.png");
        const img = await Canvas.loadImage(image);
        const GIF = new GIFEncoder(256, 310);
        GIF.start();
        GIF.setRepeat(0);
        GIF.setDelay(15);
        const canvas = Canvas.createCanvas(256, 310);
        const ctx = canvas.getContext('2d');
        const BR = 20;
        const LR = 10;
        let i = 0;
        while (i < 9) {
            ctx.clearRect(0, 0, 256, 310);
            ctx.drawImage(img, Math.floor(Math.random() * BR) - BR, Math.floor(Math.random() * BR) - BR, 256 + BR, 310 - 54 + BR);
            ctx.fillStyle = '#FF000033';
            ctx.fillRect(0, 0, 256, 310);
            ctx.drawImage(base, Math.floor(Math.random() * LR) - LR, 310 - 54 + Math.floor(Math.random() * LR) - LR, 256 + LR, 54 + LR);
            GIF.addFrame(ctx);
            i++
        };
        GIF.finish();
        return GIF.out.getData();
    }
    
    /**
     * hitler
     * @param {Image} image Image
     * @returns <Buffer>
     */
    async hitler(image) {
        if (!image) throw new Error("Image was not provided!");
        let bg = await jimp.read(__dirname + "/assets/hitler.png");
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
     * @returns <Buffer>
     */
    async bed(image1, image2) {
        if (!image1) throw new Error("first image was not provided!");
        if (!image2) throw new Error("second image was not provided!");
        let bg = await jimp.read(__dirname +"/assets/bed.png");
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
     * @param {image} Image
     * @returns <Buffer>
     */
    async wanted(image) {
        if (!image) throw new Error("no image provided!");
        let base = await jimp.read(__dirname + "/assets/wanted.png");
        let img = await jimp.read(image);
        img.resize(447, 447);
        base.composite(img, 145, 282);
        let raw = await base.getBufferAsync("image/png");
        return raw;
    }

    /**
     * circle
     * @param {Image} image Image
     * @returns <Buffer>
     */
    async circle(image) {
        if (!image) throw new Error("image was not provided!");
        image = await jimp.read(image);
        image.circle();
        let raw = await image.getBufferAsync("image/png");
        return raw;
    }
    
    /**
     * jail
     * @param {image} Image
     * @returns <Buffer>
     */
    async jail(image) {
        if (!image) throw new Error("no image provided!");
        let canvas = Canvas.createCanvas(350, 350);
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 350, 350);
        let avatar = await Canvas.loadImage(image);
        ctx.drawImage(avatar, 0, 0, 350, 350);
        let layer = await Canvas.loadImage(__dirname +"/assets/jail.png");
        ctx.drawImage(layer, 0, 0, 350, 350);
        return canvas.toBuffer();
    }

    /**
     * affect
     * @param {image} Image
     * @returns <Buffer>
     */
    async affect(image) {
        if (!image) throw new Error("no image provided!");
        let base = await jimp.read(__dirname + "/assets/affect.png");
        let img = await jimp.read(image);
        img.resize(200, 157);
        base.composite(img, 180, 383);
        let raw = await base.getBufferAsync("image/png");
        return raw;
    }

    /**
     * dither
     * @param {Image} image Image
     * @returns <Buffer>
     */
    async dither(image) {
        if (!image) throw new Error("image was not provided!");
        image = await jimp.read(image);
        image.dither565();
        let raw = await image.getBufferAsync("image/png");
        return raw;
    }

    /**
      * wasted
      * @param {Buffer} Image Image to manipulate
      * @returns <Buffer>
      */
    async wasted(Image) {
        let converted = await this.greyscale(Image);
        const canvas = Canvas.createCanvas(500, 500);
        const ctx = canvas.getContext('2d');
        const base = await Canvas.loadImage(__dirname + "/assets/wasted.png");
        const img = await Canvas.loadImage(converted);
        ctx.drawImage(img, 0, 0, 500, 500);
        ctx.drawImage(base, 0, 0, 500, 500);
        return canvas.toBuffer();
    }

    /**
     * rank
     * @param {String} username Username
     * @param {String} discrim Discriminator
     * @param {String} level User level
     * @param {String} rank User rank
     * @param {String} neededXP XP needed to reach next level
     * @param {String} currentXP Current XP of a user
     * @param {Buffer} avatarURL Avatar URL or Buffer or Canvacord Buffer itself
     * @param {String} color Hex or HTML5 color name or rgb
     * @returns <Buffer>
     */
    async rank({ username, discrim, level, rank, neededXP, currentXP, avatarURL, color }) {
        if(!username) throw new Error("No username was provided!");
        if(!level) throw new Error("No level was provided!");
        if(!rank) throw new Error("No rank was provided!");
        if(!neededXP) throw new Error("No totalXP was provided!");
        if(!currentXP) throw new Error("No currentXP was provided!");
        if(!avatarURL) throw new Error("No avatarURL was provided!");
        if(!color || typeof color !== "string") color ="#FFFFFF";

        Canvas.registerFont(__dirname + '/assets/regular-font.ttf', { family: 'Manrope', weight: "regular", style: "normal" });
        Canvas.registerFont(__dirname + '/assets/bold-font.ttf', { family: 'Manrope', weight: "bold", style: "normal" });

        const canvas = Canvas.createCanvas(934, 282);
        const ctx = canvas.getContext("2d");

        const rankCard = await Canvas.loadImage(__dirname + "/assets/rankcard.png");
        ctx.drawImage(rankCard, 0, 0, canvas.width, canvas.height);

        const font = "Manrope";

        ctx.font = `bold 36px ${font}`;
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "start";
        const name = username >= 7 ? username.substring(0, 7).trim() + '...' : username;
        ctx.fillText(`${name}`, 264, 164);
        ctx.font = `36px ${font}`;
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.textAlign = "center";
        if(discrim) ctx.fillText(`#${discrim}`, ctx.measureText(name).width + 10 + 316, 164);

        ctx.font = `bold 36px ${font}`;
        ctx.fillStyle = color;
        ctx.textAlign = "end";
        ctx.fillText(level, 934 - 64, 82);
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fillText("LEVEL", 934 - 64 - ctx.measureText(level).width - 16, 82);

        ctx.font = `bold 36px ${font}`;
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "end";
        ctx.fillText(rank, 934 - 64 - ctx.measureText(level).width - 16 - ctx.measureText(`LEVEL`).width - 16, 82);
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fillText("RANK", 934 - 64 - ctx.measureText(level).width - 16 - ctx.measureText(`LEVEL`).width - 16 - ctx.measureText(rank).width - 16, 82);
        
        ctx.font = `bold 36px ${font}`;
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.textAlign = "start";
        ctx.fillText("/ " + neededXP, 624 + ctx.measureText(currentXP).width + 10, 164);
        ctx.fillStyle = "#ffffff";
        ctx.fillText(currentXP, 624, 164);

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
        ctx.fillStyle = color;
        ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
        ctx.fill();
        ctx.fillRect(257 + 18.5, 147.5 + 36.25, widthXP, 37.5);
        ctx.arc(257 + 18.5 + widthXP, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
        ctx.fill();

        const avatar = await Canvas.loadImage(await this.circle(avatarURL));
        ctx.drawImage(avatar, 85, 66, 150, 150);

        return canvas.toBuffer();
    }
    async rankCard(...options) {
        return this.rank(...options);
    }

    /**
     * welcome
     * @param {String} username Username
     * @param {String} discrim Discriminator
     * @param {String} avatarURL Avatar URL or Buffer or Canvacord Buffer itself
     * @param {String} color Hex or HTML5 color name or rgb
     * @returns <Buffer>
     */
    async welcome({ username, discrim, avatarURL }) {
        if(!username) throw new Error("No username was provided!");
        if(!discrim) throw new Error("No discrim was provided!");
        if(!avatarURL) throw new Error("No avatarURL was provided!");

        Canvas.registerFont(__dirname + '/assets/regular-font.ttf', { family: 'Manrope', weight: "regular", style: "normal" });
        Canvas.registerFont(__dirname + '/assets/bold-font.ttf', { family: 'Manrope', weight: "bold", style: "normal" });

        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage(__dirname + "/assets/welcomebg.png");
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        const font = "Manrope";

        ctx.font = `20px ${font}`;
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = "start";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "black";
	ctx.fillText('Welcome', 260, 100);
  
        const welcometextPosition = { width: 260, height: 150 };
        
        let fontSize = 55;
        ctx.font = `bold ${fontSize}px ${font}`;
        
        do {
           fontSize -= 1;
	   ctx.font = `bold ${fontSize}px ${font}`;
        } while (ctx.measureText(`${username}#${discrim}!`).width > 430);
        
	ctx.fillStyle = '#ffffff';
        ctx.textAlign = "start";
	ctx.fillText(`${username}`, welcometextPosition.width, welcometextPosition.height, 455);
        
	ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.textAlign = "start";
        ctx.fillText(`#${discrim}!`, ctx.measureText(`${username}`).width + welcometextPosition.width, welcometextPosition.height);

        ctx.shadowBlur = 0;
      	ctx.beginPath();
      	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
      	ctx.closePath();
      	ctx.clip();

      	const avatar = await Canvas.loadImage(avatarURL);
        ctx.drawImage(avatar, 25, 25, 200, 200);
        
        return canvas.toBuffer();
    }
    async welcomer(...options) {
        return this.welcome(...options);
    }

    /**
     * leaver
     * @param {String} username Username
     * @param {String} discrim Discriminator
     * @param {String} avatarURL Avatar URL or Buffer or Canvacord Buffer itself
     * @param {String} color Hex or HTML5 color name or rgb
     * @returns <Buffer>
     */
    async leaver({ username, discrim, avatarURL, color }) {
        if(!username) throw new Error("No username was provided!");
        if(!discrim) throw new Error("No discrim was provided!");
        if(!avatarURL) throw new Error("No avatarURL was provided!");

        Canvas.registerFont(__dirname + '/assets/regular-font.ttf', { family: 'Manrope', weight: "regular", style: "normal" });
        Canvas.registerFont(__dirname + '/assets/bold-font.ttf', { family: 'Manrope', weight: "bold", style: "normal" });

        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage(__dirname + "/assets/welcomebg.png");
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        const font = "Manrope";

        ctx.font = `20px ${font}`;
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = "start";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "black";
	ctx.fillText('Goodbye', 260, 100);
  
        const welcometextPosition = { width: 260, height: 150 };
        
        let fontSize = 55;
        ctx.font = `bold ${fontSize}px ${font}`;
        
        do {
           fontSize -= 1;
	   ctx.font = `bold ${fontSize}px ${font}`;
	} while (ctx.measureText(`${username}#${discrim}!`).width > 430);
        
	ctx.fillStyle = '#ffffff';
        ctx.textAlign = "start";
	ctx.fillText(`${username}`, welcometextPosition.width, welcometextPosition.height, 455);
        
	ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.textAlign = "start";
	ctx.fillText(`#${discrim}!`, ctx.measureText(`${username}`).width + welcometextPosition.width, welcometextPosition.height);

        ctx.shadowBlur = 0;
      	ctx.beginPath();
      	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
      	ctx.closePath();
      	ctx.clip();

      	const avatar = await Canvas.loadImage(avatarURL);
        ctx.drawImage(avatar, 25, 25, 200, 200);
        
        return canvas.toBuffer();
    }
    async leave(...options) {
        return this.leaver(...options);
    }

    /**
     * pixelate
     * @param {Image} image Image
     * @param {Number} level pixelation level
     * @returns <Buffer>
     */
    async pixelate(image, level = 10) {
        if (!image) throw new Error("image was not provided!");
        image = await jimp.read(image);
        image.pixelate(isNaN(level) ? 10 : parseInt(level));
        let raw = await image.getBufferAsync("image/png");
        return raw;
    }
}

module.exports = Canvacord;

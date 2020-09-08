const Trigger = require("../libs/Trigger");
const Greyscale = require("../libs/Greyscale");
const Invert = require("../libs/Invert");
const Sepia = require("../libs/Sepia");
const assets = require("./Assets");
const Attachment = require("./Attachment");
const fs = require("fs");
const Brightness = require("../libs/Brightness");
const Threshold = require("../libs/Threshold");
const Convolute = require("../libs/Convolute");
const rect = require("../plugins/rect");
const Canvas = require("canvas");
const Darkness = require("../libs/Darkness");
const circle = require("../plugins/circle");
const round = require("../plugins/round");

class Canvacord {

    /**
     * **⚠ You may not instantiate Canvacord class! ⚠**
     * @hideconstructor
     */
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated!`);
    }

    /**
     * This method can be used to apply Triggered effect on image.
     * @param {string|Buffer} image Image to trigger
     * @returns {Promise<Buffer>}
     */
    static async trigger(image) {
        if (!image) throw new Error("Expected image, received nothing!");
        await Canvacord.__wait();
        return await Trigger(image, assets("IMAGE").TRIGGERED);
    }

    /**
     * Inverts color of the image
     * @param {string|Buffer} image Img to invert
     * @returns {Promise<Buffer>}
     */
    static async invert(image) {
        if (!image) throw new Error("Expected image, received nothing!");
        return await Invert(image);
    }

    /**
     * Apply sepia wash on img
     * @param {string|Buffer} image Img
     * @returns {Promise<Buffer>}
     */
    static async sepia(image) {
        if (!image) throw new Error("Expected image, received nothing!");
        return await Sepia(image);
    }

    /**
     * Greyscale effect over image
     * @param {string|Buffer} image Img
     * @returns {Promise<Buffer>}
     */
    static async greyscale(image) {
        if (!image) throw new Error("Expected image, received nothing!");
        return await Greyscale(image);
    }

    /**
     * Edit image brightness
     * @param {string|Buffer} image Img
     * @param {number} amount Brightness amount
     * @returns {Promise<Buffer>}
     */
    static async brightness(image, amount) {
        if (!image) throw new Error("Expected image, received nothing!");
        if (isNaN(amount)) throw new Error("Amount must be a number!");
        return await Brightness(image, amount);
    }

    /**
     * Edit image darkness
     * @param {string|Buffer} image Img
     * @param {number} amount Darkness amount
     * @returns {Promise<Buffer>}
     */
    static async darkness(image, amount) {
        if (!image) throw new Error("Expected image, received nothing!");
        if (isNaN(amount)) throw new Error("Amount must be a number!");
        return await Darkness(image, amount);
    }

    /**
     * Image threshold
     * @param {string|Buffer} img Image
     * @param {number} amount Threshold amount
     */
    static async threshold(img, amount) {
        if (!img) throw new Error("Expected image, received nothing!");
        if (isNaN(amount)) throw new Error("Amount must be a number!");
        return await Threshold(img, amount);
    }

    /**
     * Image Convolution
     * @param {string|Buffer} img Image
     * @param {number[]} matrix Convolution matrix
     * @param {boolean} opaque If convolution should be opaque
     */
    static async convolute(img, matrix, opaque) {
        if (!img) throw new Error("Expected image, received nothing!");
        if (!Array.isArray(matrix)) throw new Error("Convolution matrix must be Array.");
        return await Convolute(img, matrix, opaque);
    }

    /**
     * Creates Progress bar
     * @param {object} track Progressbar track options
     * @param {number} [track.x] The x-axis
     * @param {number} [track.y] The y-axis
     * @param {number} [track.width] Progressbar track width
     * @param {number} [track.height] Progressbar track height
     * @param {string} [track.color] Progressbar track color
     * @param {boolean} [track.stroke] Use stroke for track
     * @param {number} [track.lineWidth] This param will be used if `track.stroke` is set to `true`
     * @param {object} bar Progressbar options
     * @param {number} [bar.width] Progressbar width
     * @param {string} [bar.color] Progressbar color
     * @param {boolean|number} rounded If the bar should be rounded
     */
    static createProgressBar(
        track = { x, y, width, height, color, stroke, lineWidth }, 
        bar = { width, color }
    ) {
        if (!track) throw new Error("Invalid track args!");
        if (!bar) throw new Error("Invalid progressbar args!");

        const canvas = Canvas.createCanvas(track.width, track.height);
        const ctx = canvas.getContext("2d");
        
        if (bar.width > track.width) bar.width = track.width;
        if (bar.width < 0) bar.width = 0;

        if (track.stroke) {
            rect(ctx, track.x, track.y, track.height, bar.width, bar.color, false);
            rect(ctx, track.x, track.y, track.height, track.width, track.color, track.stroke, track.lineWidth);
        } else {
            rect(ctx, track.x, track.y, track.height, track.width, track.color, track.stroke, track.lineWidth);
            rect(ctx, track.x, track.y, track.height, bar.width, bar.color, false);
        }

        return canvas.toBuffer();
    }

    /**
     * Blur an image
     * @param {string|Buffer} image Image to blur 
     * @param {number} lvl Blur intensity
     */
    static async blur(image, lvl = 1) {
        if (!image) throw new Error("Image was not provided!");
        return await Convolute(image, Canvacord.CONVOLUTION_MATRIX.BLUR, true, lvl);
    }

    /**
     * Sharpen an image
     * @param {string|Buffer} image Image to sharpen 
     * @param {number} lvl sharpness intensity
     */
    static async sharpen(image, lvl = 1) {
        if (!image) throw new Error("Image was not provided!");
        return await Convolute(image, Canvacord.CONVOLUTION_MATRIX.SHARPEN, true, lvl);
    }

    /**
     * Applies burn effect on an image
     * @param {string|Buffer} image Image source 
     * @param {number} lvl intensity
     */
    static async burn(image, lvl = 1) {
        if (!image) throw new Error("Image was not provided!");
        return await Convolute(image, Canvacord.CONVOLUTION_MATRIX.BURN, true, lvl);
    }

    /**
     * HTML5 color to image
     * @param {string} color HTML5 color
     */
    static color(color = "#FFFFFF", height = 1024, width = 1024) {
        const canvas = Canvas.createCanvas(width, height);
        const ctx = canvas.getContext("2d");

        rect(ctx, 0, 0, height, width, color);
        return canvas.toBuffer();
    }

    /**
     * Creates circular image
     * @param {string|Buffer} image Image source
     */
    static async circle(image) {
        if (!image) throw new Error("Image was not provided!");
        const img = await Canvas.loadImage(image);
        const canvas = Canvas.createCanvas(img.width, img.height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        circle(ctx, canvas.width, canvas.height);
        return canvas.toBuffer();
    }

    /**
     * Creates a rectangle
     * @param {number} x x-axis
     * @param {number} y y-axis
     * @param {number} width width
     * @param {number} height height
     * @param {string} color color
     * @param {boolean} stroke If it should stroke
     * @param {number} lineWidth line width
     * @param {boolean} rounded If it should be rounded
     */
    static rectangle(x, y, width, height, color, stroke, lineWidth, rounded = false) {
        const canvas = Canvas.createCanvas(width, height);
        const ctx = canvas.getContext("2d");
        rect(ctx, x, y, canvas.height, canvas.width, color, !!stroke, lineWidth);
        round(ctx, x, y, canvas.width, canvas.height, rounded);
        return canvas.toBuffer();
    }

    /**
     * Fuse two images
     * @param {string|Buffer} image1 First image
     * @param {string|Buffer} image2 Second image
     */
    static async fuse(image1, image2) {
        if (!image1) throw new Error("Missing parameter 'image1'!");
        if (!image2) throw new Error("Missing parameter 'image2'!");

        const img1 = await Canvas.loadImage(image1);
        const img2 = await Canvas.loadImage(image2);

        const canvas = Canvas.createCanvas(img1.width, img1.height);
        const ctx = canvas.getContext("2d");
        ctx.globalAlpha = 0.5;
        ctx.drawImage(img1, 0, 0);
        ctx.drawImage(img2, 0, 0, canvas.width, canvas.height);

        return canvas.toBuffer();
    }

    /**
     * Resize an image
     * @param {string|Buffer} image Image source
     * @param {number} width width
     * @param {number} height height
     */
    static async resize(image, width, height) {
        if (!image) throw new Error("Image was not provided!");
        const img = await Canvas.loadImage(image);
        const w = width && !isNaN(width) ? width : img.width;
        const h = height && !isNaN(height) ? width : img.height;
        const canvas = await Canvas.createCanvas(w, h);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        return canvas.toBuffer();
    }

    /**
     * Kiss each other ( ͡° ͜ʖ ͡°)
     * @param {string|Buffer} image1 First image
     * @param {string|Buffer} image2 Second image
     */
    static async kiss(image1, image2) {
        if (!image1) throw new Error("First image was not provided!");
        if (!image2) throw new Error("Second image was not provided!");
        await this.__wait();
        const canvas = Canvas.createCanvas(768, 574);
        const ctx = canvas.getContext("2d");
        const background = await Canvas.loadImage(Canvacord.assets("IMAGE").KISS);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const avatar = await Canvas.loadImage(image1);
        const avatar1 = await Canvas.loadImage(image2);
        ctx.drawImage(avatar1, 370, 25, 200, 200);
        ctx.drawImage(avatar, 150, 25, 200, 200);
        return canvas.toBuffer();
    }

    /**
     * Spank someone ( ͡° ͜ʖ ͡°)
     * @param {string|Buffer} image1 First image
     * @param {string|Buffer} image2 Second image
     */
    static async spank(image1, image2) {
        if (!image1) throw new Error("First image was not provided!");
        if (!image2) throw new Error("Second image was not provided!");
        await this.__wait();
        const canvas = Canvas.createCanvas(500, 500);
        const ctx = canvas.getContext("2d");
        const background = await Canvas.loadImage(Canvacord.assets("IMAGE").SPANK);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const avatar = await Canvas.loadImage(image1);
        const avatar1 = await Canvas.loadImage(image2);
        ctx.drawImage(avatar1, 350, 220, 120, 120);
        ctx.drawImage(avatar, 225, 5, 140, 140);
        return canvas.toBuffer();
    }

    /**
     * Slap someone ( ͡° ͜ʖ ͡°)
     * @param {string|Buffer} image1 First image
     * @param {string|Buffer} image2 Second image
     */
    static async slap(image1, image2) {
        if (!image1) throw new Error("First image was not provided!");
        if (!image2) throw new Error("Second image was not provided!");
        await this.__wait();
        const canvas = Canvas.createCanvas(1000, 500);
        const ctx = canvas.getContext("2d");
        const background = await Canvas.loadImage(Canvacord.assets("IMAGE").BATSLAP);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const avatar = await Canvas.loadImage(image1);
        const avatar1 = await Canvas.loadImage(image2);
        ctx.drawImage(avatar1, 580, 260, 200, 200);
        ctx.drawImage(avatar, 350, 70, 220, 220);
        return canvas.toBuffer();
    }

    /**
     * Slap someone ( ͡° ͜ʖ ͡°)
     * @param {string|Buffer} image1 First image
     * @param {string|Buffer} image2 Second image
     * @deprecated
     */
    static async batslap(image1, image2) {
        console.warn("Canvacord#batslap() is deprecated, use Canvacord#slap() instead!");
        return await Canvacord.slap(image1, image2);
    }

    /**
     * Oh this? This is beautiful!
     * @param {string|Buffer} image Source image
     */
    static async beautiful(image) {
        if (!image) throw new Error("Image was not provided!");
        await this.__wait();
        const img = await Canvas.loadImage(image);
        const base = await Canvas.loadImage(Canvacord.assets("IMAGE").BEAUTIFUL);
        const canvas = Canvas.createCanvas(376, 400);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(base, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 258, 28, 84, 95);
        ctx.drawImage(img, 258, 229, 84, 95);

        return canvas.toBuffer();
    }

    /**
     * facepalm
     * @param {string|Buffer} image image
     */
    static async facepalm(image) {
        if (!image) throw new Error("image was not provided!");
        await this.__wait();
        let layer = await Canvas.loadImage(Canvacord.assets("IMAGE").FACEPALM);
        let canvas = Canvas.createCanvas(632, 357);
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 632, 357);
        let avatar = await Canvas.loadImage(image);
        ctx.drawImage(avatar, 199, 112, 235, 235);
        ctx.drawImage(layer, 0, 0, 632, 357);
        return canvas.toBuffer();
    }

    /**
     * Rainbow ( ͡° ͜ʖ ͡°)
     * @param {string|Buffer} image Image source
     */
    static async rainbow(image) {
        if (!image) throw new Error("image was not provided!");
        await this.__wait();
        let bg = await Canvas.loadImage(Canvacord.assets("IMAGE").GAY);
        let img = await Canvas.loadImage(image);
        const canvas = Canvas.createCanvas(400, 400);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, 400, 400);
        ctx.drawImage(bg, 0, 0, 400, 400);
        return canvas.toBuffer();
    }

    /**
     * Rainbow ( ͡° ͜ʖ ͡°)
     * @param {string|Buffer} image Image source
     * @deprecated
     */
    static async gay(image) {
        console.warn("Canvacord#gay() is deprecated, use Canvacord#rainbow() instead!");
        return await Canvacord.rainbow(image);
    }

    /**
     * "F" in the chat
     * @param {string|Buffer} image image source
     */
    static async rip(image) {
        if (!image) throw new Error("Image was not provided!");
        await this.__wait();
        const img = await Canvas.loadImage(image);
        const bg = await Canvas.loadImage(Canvacord.assets("IMAGE").RIP);
        const canvas = Canvas.createCanvas(244, 253);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 63, 110, 90, 90);
        return canvas.toBuffer();
    }

    /**
     * Trash?
     * @param {string|Buffer} image Image source
     */
    static async trash(image) {
        if (!image) throw new Error("Image was not provided!");
        await this.__wait();
        const blur = await Canvacord.blur(image, 50);
        const img = await Canvas.loadImage(blur);
        const bg = await Canvas.loadImage(Canvacord.assets("IMAGE").TRASH);

        const canvas = Canvas.createCanvas(bg.width, bg.height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(bg, 0, 0);
        ctx.drawImage(img, 309, 0, 309, 309);
        return canvas.toBuffer();
    }

    /**
     * Worse than hitler
     * @param {string|Buffer} image Source image
     */
    static async hitler(image) {
        if (!image) throw new Error("image was not provided!");
        await this.__wait();
        const img = await Canvas.loadImage(image);
        const bg = await Canvas.loadImage(Canvacord.assets("IMAGE").HITLER);

        const canvas = Canvas.createCanvas(bg.width, bg.height);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(bg, 0, 0);
        ctx.drawImage(img, 46, 43, 140, 140);

        return canvas.toBuffer();
    }

    /**
     * Something similar to discord.js attachment
     * @param {Buffer} buffer Attachment data
     * @param {string} name Attachment name
     * @param {boolean} wrap If attachment should be wrapped as message object
     */
    static toAttachment(buffer, name, wrap = true) {
        const attachment = new Attachment(buffer, name ? name : "attachment.png");
        if (!wrap) return attachment;
        return { files: [attachment] };
    }

    /**
     * Writes the data as file
     * @param {Buffer} data data to write
     * @param {string} name file name
     */
    static write(data, name) {
        return fs.writeFileSync(name, data);
    }

    /**
     * Canvacord assets
     */
    static get assets() {
        return assets;
    }

    /**
     * @private
     * @ignore
     */
    static __wait(dur) {
        return new Promise((res) => {
            setTimeout(() => res(), dur || 500);
        });
    }

    /**
     * Matrix data for **Canvacord.convolute()**
     */
    static get CONVOLUTION_MATRIX() {
        return {
            EDGES: [0, -1, 0, -1, 4, -1, 0, -1, 0],
            BLUR: [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9],
            SHARPEN: [0, -1, 0, -1, 5, -1, 0, -1, 0],
            BURN: [1 / 11, 1 / 11, 1 / 11, 1 / 11, 1 / 11, 1 / 11, 1 / 11, 1 / 11, 1 / 11]
        };
    }

}

module.exports = Canvacord;
const Trigger = require("../libs/Trigger");
const Greyscale = require("../libs/Greyscale");
const Invert = require("../libs/Invert");
const Sepia = require("../libs/Sepia");
const assets = require("./Assets");
const fs = require("fs");
const Brightness = require("../libs/Brightness");
const Threshold = require("../libs/Threshold");
const Convolute = require("../libs/Convolute");
const rect = require("../plugins/rect");
const Canvas = require("canvas");
const Darkness = require("../libs/Darkness");
const circle = require("../plugins/circle");
const round = require("../plugins/round");
const Util = require("../plugins/Util");

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
     * @returns {Promise<Buffer>}
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
     * @returns {Promise<Buffer>}
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
     * @returns {Buffer}
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
     * @returns {Promise<Buffer>}
     */
    static async blur(image, lvl = 1) {
        if (!image) throw new Error("Image was not provided!");
        return await Convolute(image, Canvacord.CONVOLUTION_MATRIX.BLUR, true, lvl);
    }

    /**
     * Sharpen an image
     * @param {string|Buffer} image Image to sharpen 
     * @param {number} lvl sharpness intensity
     * @returns {Promise<Buffer>}
     */
    static async sharpen(image, lvl = 1) {
        if (!image) throw new Error("Image was not provided!");
        return await Convolute(image, Canvacord.CONVOLUTION_MATRIX.SHARPEN, true, lvl);
    }

    /**
     * Applies burn effect on an image
     * @param {string|Buffer} image Image source 
     * @param {number} lvl intensity
     * @returns {Promise<Buffer>}
     */
    static async burn(image, lvl = 1) {
        if (!image) throw new Error("Image was not provided!");
        return await Convolute(image, Canvacord.CONVOLUTION_MATRIX.BURN, true, lvl);
    }

    /**
     * HTML5 color to image
     * @param {string} color HTML5 color
     * @returns {Buffer}
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
     * @returns {Promise<Buffer>}
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
     * @returns {Buffer}
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
     * @returns {Promise<Buffer>}
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
     * @returns {Promise<Buffer>}
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
     * @returns {Promise<Buffer>}
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
    * Displays an opinion comic strip image :V
    * @param {string|Buffer} avatar avatar
    * @param {string} string text
    * @returns {Promise<Buffer>}
    */
    
    static async opinion(avatar, msg) {
    
        const font = (canvas, text) => {
	        const ctx = canvas.getContext('2d');
	        let x = 29;
	        while (ctx.measureText(text).width > canvas.width / 2.39) {
		    ctx.font = `${x -= 1}px sans-serif`;
	        }
	        return ctx.font;
        };

      
    const image = "https://i.imgur.com/EcGmZiB.png";
    const canvas = Canvas.createCanvas(482, 481);
    const ctx = canvas.getContext('2d');
    
    const bg = await Canvas.loadImage(image, {format: "jpg"});
    const ava = await Canvas.loadImage(avatar);
    
    ctx.drawImage(ava, 62,340,85,85);  
    ctx.drawImage(ava, 260,180,70,70);
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);   
    
    ctx.font = font(canvas, msg);
	  ctx.fillStyle = '#000000';
	  ctx.fillText(msg, canvas.width / 10, canvas.height / 1.51);
      
        return canvas.toBuffer()   
    }

    /**
     * Spank someone ( ͡° ͜ʖ ͡°)
     * @param {string|Buffer} image1 First image
     * @param {string|Buffer} image2 Second image
     * @returns {Promise<Buffer>}
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
     * @returns {Promise<Buffer>}
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
     * @returns {Promise<Buffer>}
     * @deprecated
     */
    static async batslap(image1, image2) {
        console.warn("Canvacord#batslap() is deprecated, use Canvacord#slap() instead!");
        return await Canvacord.slap(image1, image2);
    }

    /**
     * Oh this? This is beautiful!
     * @param {string|Buffer} image Source image
     * @returns {Promise<Buffer>}
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
     * @returns {Promise<Buffer>}
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
     * @returns {Promise<Buffer>}
     */
    static async rainbow(image) {
        if (!image) throw new Error("image was not provided!");
        await this.__wait();
        let bg = await Canvas.loadImage(Canvacord.assets("IMAGE").GAY);
        let img = await Canvas.loadImage(image);
        const canvas = Canvas.createCanvas(img.width, img.height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
        return canvas.toBuffer();
    }

    /**
     * Rainbow ( ͡° ͜ʖ ͡°)
     * @param {string|Buffer} image Image source
     * @returns {Promise<Buffer>}
     * @deprecated
     */
    static async gay(image) {
        console.warn("Canvacord#gay() is deprecated, use Canvacord#rainbow() instead!");
        return await Canvacord.rainbow(image);
    }

    /**
     * "F" in the chat
     * @param {string|Buffer} image image source
     * @returns {Promise<Buffer>}
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
     * @returns {Promise<Buffer>}
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
     * @returns {Promise<Buffer>}
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
     * Updates image color
     * @param {string|Buffer} image Image source
     * @param {string} color HTML5 color
     * @returns {Promise<Buffer>}
     */
    static async colorfy(image, color) {
        if (!image) throw new Error("Image was not provided!");
        const img = await Canvas.loadImage(image);
        const canvas = Canvas.createCanvas(img.width, img.height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        if (color) {
            ctx.globalCompositeOperation = "color";
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        return canvas.toBuffer();
    }

    /**
     * whoosh
     * @param {string|Buffer} image Image source
     * @returns {Promise<Buffer>}
     */
    static async jokeOverHead(image) {
        if (!image) throw new Error("Image wasn ot provided!");
        await this.__wait();
        const layer = await Canvas.loadImage(Canvacord.assets("IMAGE").JOKEOVERHEAD);
        const img = await Canvas.loadImage(image)
        const canvas = Canvas.createCanvas(425, 404);
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 425, 404);
        ctx.drawImage(img, 125, 130, 140, 135);
        ctx.drawImage(layer, 0, 0, 425, 404);
        return canvas.toBuffer();
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
        await this.__wait();
        Canvas.registerFont(Canvacord.assets("FONT").MANROPE_REGULAR, {
            family: "Manrope",
            weight: "regular",
            style: "normal"
        });

        Canvas.registerFont(Canvacord.assets("FONT").MANROPE_BOLD, {
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
        ctx.drawImage(img, 30, 15, 120, 120);

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
     * TicTacToe
     * @param {object} fill TicTacToe params
     * @param {"X"|"O"} [fill.a1] a1 value
     * @param {"X"|"O"} [fill.b1] b1 value
     * @param {"X"|"O"} [fill.c1] c1 value
     * @param {"X"|"O"} [fill.a2] a2 value
     * @param {"X"|"O"} [fill.b2] b2 value
     * @param {"X"|"O"} [fill.c2] c2 value
     * @param {"X"|"O"} [fill.a3] a3 value
     * @param {"X"|"O"} [fill.b3] b3 value
     * @param {"X"|"O"} [fill.c3] c3 value
     * @param {object} color Color params
     * @param {string} [color.bg] Background clolor
     * @param {string} [color.bar] TicTacToe bar color
     * @param {string} [color.x] Color of **X**
     * @param {string} [color.o] Color of **O**
     * @returns {Buffer}
     */
    static tictactoe(fill = { a1: 0, b1: 0, c1: 0, a2: 0, b2: 0, c2: 0, a3: 0, b3: 0, c3: 0 }, color = { bg: 0, bar: 0, x: 0, o: 0 }) {
        color = {
            bg: color.bg || "white",
            bar: color.bar || "black",
            x: color.x || "red",
            o: color.o || "blue"
        };

        const canvas = Canvas.createCanvas(2048, 2048);
        const ctx = canvas.getContext("2d");

        const drawO = (x, y) => {
            let halfSectionSize = (0.5 * 682);
            let centerX = x + halfSectionSize;
            let centerY = y + halfSectionSize;
            let radius = (682 - 100) / 2;
            let startAngle = 0 * Math.PI;
            let endAngle = 2 * Math.PI;

            ctx.lineWidth = 40;
            ctx.strokeStyle = color.o;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.stroke();
        };

        const drawX = (x, y) => {
            ctx.strokeStyle = color.x;
            ctx.lineWidth = 40;
            ctx.beginPath();
            let offset = 50;
            ctx.moveTo(x + offset, y + offset);
            ctx.lineTo(x + 682 - offset, y + 682 - offset);
            ctx.moveTo(x + offset, y + 682 - offset);
            ctx.lineTo(x + 682 - offset, y + offset);
            ctx.stroke();
        };

        const params = {
            a1: {
                x: 5,
                y: 5
            },
            b1: {
                x: 682,
                y: 5
            },
            c1: {
                x: 1364,
                y: 5
            },
            a2: {
                x: 5,
                y: 682
            },
            b2: {
                x: 682,
                y: 682
            },
            c2: {
                x: 1364,
                y: 682
            },
            a3: {
                x: 5,
                y: 1364
            },
            b3: {
                x: 682,
                y: 1364
            },
            c3: {
                x: 1364,
                y: 1364
            }
        };

        // background
        ctx.fillStyle = color.bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Lines
        ctx.lineWidth = 30;
        ctx.lineCap = "round";
        ctx.strokeStyle = color.bar;
        ctx.beginPath();

        //Horizontal lines 
        for (var y = 1; y <= 2; y++) {
            ctx.moveTo(4, y * 682);
            ctx.lineTo(2043, y * 682);
        }
        // Vertical lines 
        for (var x = 1; x <= 2; x++) {
            ctx.moveTo(x * 682, 4);
            ctx.lineTo(x * 682, 2043);
        }

        ctx.stroke();

        // apply
        Object.keys(fill).forEach(x => {
            if (!fill[x] || !["X", "O"].includes(fill[x])) return;
            const data = params[x];
            fill[x] === "X" ? drawX(data.x, data.y) : drawO(data.x, data.y);
        });

        return canvas.toBuffer();
    }

    /**
     * Writes the data as file
     * @param {Buffer} data data to write
     * @param {string} name file name
     * @returns {void}
     */
    static write(data, name) {
        return fs.writeFileSync(name, data);
    }

    /**
     * Canvacord assets
     * @ignore
     */
    static get assets() {
        return assets;
    }

    /**
     * @ignore
     */
    static __wait(dur) {
        return new Promise((res) => {
            setTimeout(() => res(), dur || 500);
        });
    }

    /**
     * Matrix data for **Canvacord.convolute()**
     * @ignore
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

const Canvas = require("canvas");
const GIFEncoder = require("gifencoder");

module.exports = async (image, TRIGGERED) => {
    const base = await Canvas.loadImage(TRIGGERED);
    const img = await Canvas.loadImage(image);
    const GIF = new GIFEncoder(256, 310);
    GIF.start();
    GIF.setRepeat(0);
    GIF.setDelay(15);
    const canvas = Canvas.createCanvas(256, 310);
    const ctx = canvas.getContext("2d");
    const BR = 30;
    const LR = 20;
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
};
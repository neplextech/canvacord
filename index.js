const fs = require("fs");
const chalk = require("chalk");
const dir = {
    IMAGES: `${__dirname}/data/images`,
    FONTS: `${__dirname}/data/fonts`
};
const obj = {
    images: {},
    fonts: {}
};

const clean = (str) => {
    return str.toUpperCase().split(" ").join("_");
};

console.log(chalk.blueBright("[Canvacord] Loading assets..."));

// load images
fs.readdir(dir.IMAGES, (error, files) => {
    console.log(chalk.blueBright("[Canvacord] Loading images..."));
    if (error) console.log(chalk.redBright(`[Canvacord] Error while loading assets: ${error.message}!`));

    if (!files.length) return console.log(chalk.redBright("[Canvacord] Assets dir is corrupted, please re-install canvacord."));

    files.forEach((x, i) => {
        const name = clean(x.split(".")[0]);
        obj.images[name] = `${dir.IMAGES}/${x}`;
        console.log(chalk.greenBright(`[${i+1}] Loaded image ${x}!`));
    });
});

// load fonts
fs.readdir(dir.FONTS, (error, files) => {
    console.log(chalk.blueBright("[Canvacord] Loading fonts..."));
    if (error) console.log(chalk.redBright(`[Canvacord] Error while loading assets: ${error.message}!`));

    if (!files.length) return console.log(chalk.redBright("[Canvacord] Assets dir is corrupted, please re-install canvacord."));

    files.forEach((x, i) => {
        const name = x.split(".")[0];
        obj.fonts[name] = `${dir.FONTS}/${x}`;
        console.log(chalk.greenBright(`[${i+1}] Loaded font ${x}!`));
    });
});

/**
 * Canvacord assets loader
 * @param {"FONT"|"IMAGE"} type assets type
 */
module.exports = (type) => {
    switch(type) {
        case "FONT":
            return obj.fonts;
            break;
        case "IMAGE":
            return obj.images;
            break;
        default:
            throw new Error("CANVACORD_INVALID_ASSETS_TYPE");
    }
};
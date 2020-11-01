// Created and maintained by Snowflake Studio ❄

const Canvacord = require("./src/Canvacord");

// load default fonts
try {
    setTimeout(() => {
        Canvacord.registerFonts();
    });
} catch(e) {}

/**
 * @param {stirng} moduleName module name
 */
function load(moduleName) {
    try {
        return require(moduleName);
    } catch(e) {
        return null;
    }
}

module.exports = {
    Canvas: Canvacord,
    ConvolutionMatrix: Canvacord.CONVOLUTION_MATRIX,
    Rank: require("./src/Rank"),
    Spotify: require("./src/Spotify"),
    Welcomer: load("./src/Welcomer"),
    Leaver: load("./src/Leaver"),
    CaptchaGen: load("captcha-canvas") ? load("captcha-canvas").CaptchaGenerator : null,
    FortniteShop: load("discord-canvas") ? load("discord-canvas").FortniteShop : null,
    FortniteStats: load("discord-canvas") ? load("discord-canvas").FortniteStats : null,
    Plugins: require("./src/Plugins"),
    Util: require("./src/Util"),
    Assets: require("@canvacord/assets"),
    MSX: {
        Brightness: require("./libs/Brightness"),
        Convolute: require("./libs/Convolute"),
        Darkness: require("./libs/Darkness"),
        Greyscale: require("./libs/Greyscale"),
        Invert: require("./libs/Invert"),
        Sepia: require("./libs/Sepia"),
        Threshold: require("./libs/Threshold"),
        Trigger: require("./libs/Trigger")
    },
    write: Canvacord.write,
    author: "Snowflake Studio ❄",
    version: require("./package.json").version
};
// Created and maintained by Snowflake Studio ❄

const Canvacord = require("./src/Canvacord");

// load default fonts
try {
    setTimeout(() => {
        Canvacord.registerFonts();
    });
} catch(e) {}

module.exports = {
    Canvas: Canvacord,
    ConvolutionMatrix: Canvacord.CONVOLUTION_MATRIX,
    Rank: require("./src/Rank"),
    Spotify: require("./src/Spotify"),
    Welcomer: require("./src/Welcomer"),
    Leaver: require("./src/Leaver"),
    Plugins: require("./src/Plugins"),
    Util: require("./plugins/Util"),
    Assets: require("canvacord-assets"),
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
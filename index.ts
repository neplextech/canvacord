// Created and maintained by Snowflake Studio ❄

import Brightness from './libs/Brightness';
import Convolute from './libs/Convolute';
import Darkness from './libs/Darkness';
import Greyscale from './libs/Greyscale';
import Invert from './libs/Invert';
import Sepia from './libs/Sepia';
import Threshold from './libs/Threshold';
import Trigger from './libs/Trigger';
import Canvacord from './src/Canvacord';
import Leaver from './src/Leaver';
import Plugins from './src/Plugins';
import Rank from './src/Rank';
import Spotify from './src/Spotify';
import Util from './src/Util';
import Welcomer from './src/Welcomer';
import { version } from './package.json';

// load default fonts
try {
    setTimeout(() => {
        Canvacord.registerFonts();
    });
} catch (e) { }

/**
 * @param moduleName module name
 * @param exportName the export to return
 */
function load(moduleName: string, exportName?: string) {
    try {
        const _module = require(moduleName);
        return exportName ? _module[exportName] : _module;
    } catch (e) {
        return null;
    }
}

export default {
    Canvas: Canvacord,
    ConvolutionMatrix: Canvacord.CONVOLUTION_MATRIX,
    Rank,
    Spotify,
    Welcomer,
    Leaver,
    CaptchaGen: load("captcha-canvas", 'CaptchaGenerator'),
    FortniteShop: load("discord-canvas", 'FortniteShop'),
    FortniteStats: load("discord-canvas", 'FortniteStats'),
    Plugins,
    Util,
    Assets: require("@canvacord/assets"),
    MSX: {
        Brightness,
        Convolute,
        Darkness,
        Greyscale,
        Invert,
        Sepia,
        Threshold,
        Trigger,
    },
    write: Canvacord.write,
    author: "Snowflake Studio ❄",
    version
};

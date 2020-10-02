const Canvacord = require("./src/Canvacord");
const captcha = require('captcha-canvas')
module.exports = Canvacord;
module.exports.plugins = require("./src/Plugins");
module.exports.Captcha = captcha.CaptchaGenerator;
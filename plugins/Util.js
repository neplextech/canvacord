const moment = require("moment");
const abbrev = require("./abbrev");
require("moment-duration-format");

class Util {

    /**
     * Canvacord Util
     */
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated!`);
    }

    /**
     * Converts regular timestamp to discord like time
     * @param {Date} time Timestamp to convert
     */
    static discordTime(time = new Date()) {
        let date = time && time  instanceof Date ? time : new Date();
        let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        return `Today at ${hours}:${minutes}`;
    }

    /**
     * Formats time
     * @param {number} time Time to format
     */
    static formatTime(time) {
        if (!time) return "00:00";
        const fmt = moment.duration(time).format("dd:hh:mm:ss");

        const chunk = fmt.split(":");
        if (chunk.length < 2) chunk.unshift("00");
        return chunk.join(":");
    }

    /**
     * Shorten text.
     * @param {string} text Text to shorten 
     * @param {number} len Max Length
     */
    static shorten(text, len) {
        if (typeof text !== "string") return "";
        if (text.length <= len) return text;
        return text.substr(0, len).trim() + "...";
    }

    /**
     * Converts numbers into units like `1K`, `1M`, `1B` etc.
     * @param {number|string} num
     * @returns {string} 
     */
    static toAbbrev(num) {
        return abbrev(num);
    }

}

module.exports = Util;
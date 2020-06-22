const Canvas = require('canvas');

class CanvasUtil {
    constructor() {
        throw new Error(`Class ${this.constructor.name} may not be instantiated!`);
    }

    static getLines({ text, ctx, maxWidth }) {
        if (!text) return [];
        if (!ctx) throw new Error('Canvas context was not provided!');
        if (!maxWidth) throw new Error('No max-width provided!');
        const lines = [];

        while (text.length) {
            let i;
            for (i = text.length; ctx.measureText(text.substr(0, i)).width > maxWidth; i -= 1);
            const result = text.substr(0, i);
            let j;
            if (i !== text.length) for (j = 0; result.indexOf(' ', j) !== -1; j = result.indexOf(' ', j) + 1);
            lines.push(result.substr(0, j || result.length));
            text = text.substr(lines[lines.length - 1].length, text.length);
        }

        return lines;
    }

    static twitterTimeFormat(date = new Date()) {
        if (typeof date === 'number') date = new Date(date);
        if (!date instanceof Date) date = new Date();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const day = date.getDate();
        let month = date.getMonth();
        const year = date.getFullYear();
        month = months[month];
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours %= 12;
        hours = hours || 12;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${hours}:${minutes} ${ampm} - ${day} ${month} ${year}`;
    }

    static grain(image) {
        const pixels = image.data;

        for (let idx = 0; idx < pixels.length; idx++) {
            if (Math.random() > 0.98) {
                pixels[idx] = Math.max(128, Math.floor(Math.random() * 255));
                pixels[idx + 1] = Math.max(128, Math.floor(Math.random() * 255));
            }

            if (Math.random() > 0.98) {
                const v = Math.random() * 60;
                pixels[idx] = Math.max(pixels[idx] - v, 0);
            }
        }

        return image;
    }

    static brightnessContrastPhotoshop(image, brightness, contrast) {
        const pixels = image.data;
        const data = Canvas.createImageData(image.width, image.height);
        const dataPixels = data.data;

        brightness = (brightness + 100) / 100;
        contrast = (contrast + 100) / 100;

        this.mapRGB(pixels, dataPixels, (value) => {
            value *= brightness;
            value = (value - 127.5) * contrast + 127.5;
            return (value + 0.5) | 0;
        });
        return data;
    }

    static buildMap(f) {
        const m = [];
        for (let k = 0, v; k < 256; k += 1) {
            m[k] = (v = f(k)) > 255 ? 255 : v < 0 ? 0 : v | 0;
        }
        return m;
    }

    static applyMap(src, dst, map) {
        for (let i = 0, l = src.length; i < l; i += 4) {
            dst[i] = map[src[i]];
            dst[i + 1] = map[src[i + 1]];
            dst[i + 2] = map[src[i + 2]];
            dst[i + 3] = src[i + 3];
        }
    }

    static mapRGB(src, dst, func) {
        this.applyMap(src, dst, this.buildMap(func));
    }

    static toAbbrev(num) {
        if (!num) return 'NaN';
        if (typeof num === 'string') num = parseInt(num);
        let decPlaces = Math.pow(10, 1);
        var abbrev = ['K', 'M', 'B', 'T'];
        for (var i = abbrev.length - 1; i >= 0; i--) {
            var size = Math.pow(10, (i + 1) * 3);
            if (size <= num) {
                num = Math.round((num * decPlaces) / size) / decPlaces;
                if (num == 1000 && i < abbrev.length - 1) {
                    num = 1;
                    i++;
                }
                num += abbrev[i];
                break;
            }
        }
        return num;
    }

    static resolveColor(color) {
        if (!color) return '#000000';
        if (color === 'RANDOM') return '#' + Math.floor(Math.random() * (0xffffff + 1)).toString(16);
        if (Array.isArray(color)) return '#' + ((color[0] << 16) + (color[1] << 8) + color[2]).toString(16);
        if (isNaN(color) && (color.startsWith('#') || color.startsWith('0x'))) return color.replace('0x', '#');
        if (!isNaN(color) && String(color).startsWith('0x')) return String(color).replace('0x', '#');
        if (!isNaN(color)) return `#${color.toString(16)}`;
        return color;
    }
}

module.exports = CanvasUtil;

/*
 * Taken from https://github.com/geraintluff/canvas-sketch/blob/master/sketch.js
 */

// @ts-nocheck

import { loadImage, createCanvas } from '../Canvas/module';

var Sketcher = (function () {
    function Sketcher(width: number, height: number) {
        var thisSketcher = this;
        this.width = width;
        this.height = height;
        this.levelSteps = 2;
        this.textureCanvases = null;
        this.textureImageDatas = null;

        this.lineThickness = 1;
        this.maxTextures = NaN;
        this.lineLength = Math.sqrt(width * height) * 0.2;
        this.darkeningFactor = 0.1;
        this.lineAlpha = 0.1;
        this.lineDensity = 0.5;

        this.lightness = 4;

        this.edgeBlurAmount = 4;
        this.edgeAmount = 0.5;

        /* noop */
        this.progressUpdate = function () {};
        this.sendProgressUpdate = function (proportion, message) {};

        this.preparationFunctions = [];
        var totalPrepFunctions = 1;
        var startedInit = false;
        this.requiredColours = null;

        var whenReadyFunctions = [];
        this.whenReady = function (callback) {
            if (!startedInit) {
                this.createTextures();
                totalPrepFunctions = this.preparationFunctions.length;
                startedInit = true;
                var intervalKey = setInterval(function () {
                    if (thisSketcher.preparationFunctions.length == 0) {
                        clearInterval(intervalKey);
                        while (whenReadyFunctions.length > 0) {
                            whenReadyFunctions.shift()();
                        }
                        thisSketcher.whenReady = function (callback) {
                            callback();
                        };
                        thisSketcher.progressUpdate = function () {};
                        thisSketcher.progressUpdateFunctions = null;
                    } else {
                        var message = thisSketcher.preparationFunctions.shift()();
                        var proportion = 1 - thisSketcher.preparationFunctions.length / totalPrepFunctions;
                        thisSketcher.sendProgressUpdate(proportion, message);
                    }
                }, 10);
            }
            whenReadyFunctions.push(callback);
            return this;
        };
    }
    Sketcher.prototype = {
        transformCanvas: function (canvas, greyscale) {
            var context = canvas.getContext('2d');
            var width = canvas.width;
            var height = canvas.height;
            var imageData = context.getImageData(0, 0, width, height);
            var pixels = imageData.data;

            this.sendProgressUpdate(0, 'Calculating required textures');
            var pixelCodes = {};
            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    var index = (x + y * width) * 4;
                    var pixelCode = pixels[index] + ':' + pixels[index + 1] + ':' + pixels[index + 2];
                    pixelCodes[pixelCode] = true;
                }
            }
            while (true) {
                this.requiredColours = {};
                for (var key in pixelCodes) {
                    var parts = key.split(':');
                    var red = parseInt(parts[0]);
                    var green = parseInt(parts[1]);
                    var blue = parseInt(parts[2]);
                    var redIndex = Math.round((red / 255) * (this.levelSteps - 1));
                    var greenIndex = Math.round((green / 255) * (this.levelSteps - 1));
                    var blueIndex = Math.round((blue / 255) * (this.levelSteps - 1));
                    for (var ri = -1; ri <= 1; ri++) {
                        for (var gi = -1; gi <= 1; gi++) {
                            for (var bi = -1; bi <= 1; bi++) {
                                var key = redIndex + ri + ':' + (greenIndex + gi) + ':' + (blueIndex + bi);
                                this.requiredColours[key] = true;
                            }
                        }
                    }
                }

                if (Object.keys(this.requiredColours).length > this.maxTextures && this.levelSteps > 2) {
                    this.levelSteps--;
                    continue;
                }
                break;
            }
            var thisSketcher = this;
            this.whenReady(function () {
                thisSketcher.transformCanvasInner(canvas, greyscale);
            });
            return this;
        },
        transformCanvasInner: function transformCanvasInner(canvas, greyscale) {
            var context = canvas.getContext('2d');
            var width = canvas.width;
            var height = canvas.height;
            var imageData = context.getImageData(0, 0, width, height);
            var pixels = imageData.data;

            var edges = [];
            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    var index = x + y * width;
                    edges[index * 3] = pixels[index * 4];
                    edges[index * 3 + 1] = pixels[index * 4 + 1];
                    edges[index * 3 + 2] = pixels[index * 4 + 2];
                }
            }
            this.sendProgressUpdate(1, 'Calculating edges');
            var edges = this.calculateStandardDeviation(edges, this.edgeBlurAmount);

            this.sendProgressUpdate(1, 'Assembling final image');
            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    var index = x + y * width;
                    var red = pixels[index * 4];
                    var green = pixels[index * 4 + 1];
                    var blue = pixels[index * 4 + 2];
                    var rgb = this.getPixel(index, red, green, blue);
                    if (greyscale) {
                        var value = Math.round((rgb.red + rgb.green + rgb.blue) / 3);
                        rgb.red = rgb.green = rgb.blue = value;
                    }
                    var edgeFactor = Math.max(0, (255 - edges[x + y * width] * this.edgeAmount) / 255);
                    var edgeFactor = Math.min(1, Math.max(0.5, edgeFactor * edgeFactor));
                    pixels[index * 4] = Math.round(rgb.red * edgeFactor);
                    pixels[index * 4 + 1] = Math.round(rgb.green * edgeFactor);
                    pixels[index * 4 + 2] = Math.round(rgb.blue * edgeFactor);
                }
            }
            context.putImageData(imageData, 0, 0);
        },
        calculateStandardDeviation: function (inputRgb, blurAmount) {
            var width = this.width;
            var height = this.height;
            var vsum = [];
            var vsum2 = [];
            for (var x = 0; x < width; x++) {
                var totals = [0, 0, 0];
                var totals2 = [0, 0, 0];
                for (var y = 0; y < height; y++) {
                    var index = x + y * width;
                    totals[0] += inputRgb[index * 3 + 0];
                    totals[1] += inputRgb[index * 3 + 1];
                    totals[2] += inputRgb[index * 3 + 2];
                    totals2[0] += inputRgb[index * 3 + 0] * inputRgb[index * 3 + 0];
                    totals2[1] += inputRgb[index * 3 + 1] * inputRgb[index * 3 + 1];
                    totals2[2] += inputRgb[index * 3 + 2] * inputRgb[index * 3 + 2];
                    vsum[index] = totals.slice(0);
                    vsum2[index] = totals2.slice(0);
                }
            }
            var hsum = [];
            var hsum2 = [];
            for (var y = 0; y < height; y++) {
                var totals = [0, 0, 0];
                var totals2 = [0, 0, 0];
                for (var x = 0; x < width; x++) {
                    var index = x + y * width;
                    var startIndex = x + Math.max(0, Math.round(y - blurAmount / 2)) * width;
                    var endIndex = x + Math.min(height - 1, Math.round(y + blurAmount / 2)) * width;
                    totals[0] += ((vsum[endIndex][0] - vsum[startIndex][0]) / (endIndex - startIndex)) * width;
                    totals[1] += ((vsum[endIndex][1] - vsum[startIndex][1]) / (endIndex - startIndex)) * width;
                    totals[2] += ((vsum[endIndex][2] - vsum[startIndex][2]) / (endIndex - startIndex)) * width;
                    totals2[0] += ((vsum2[endIndex][0] - vsum2[startIndex][0]) / (endIndex - startIndex)) * width;
                    totals2[1] += ((vsum2[endIndex][1] - vsum2[startIndex][1]) / (endIndex - startIndex)) * width;
                    totals2[2] += ((vsum2[endIndex][2] - vsum2[startIndex][2]) / (endIndex - startIndex)) * width;
                    hsum[index] = totals.slice(0);
                    hsum2[index] = totals2.slice(0);
                }
            }
            var sd = [];
            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    var index = x + y * width;
                    var startIndex = Math.max(0, Math.round(x - blurAmount / 2)) + y * width;
                    var endIndex = Math.min(width - 1, Math.round(x + blurAmount / 2)) + y * width;
                    var avgR = (hsum[endIndex][0] - hsum[startIndex][0]) / (endIndex - startIndex);
                    var avgG = (hsum[endIndex][1] - hsum[startIndex][1]) / (endIndex - startIndex);
                    var avgB = (hsum[endIndex][2] - hsum[startIndex][2]) / (endIndex - startIndex);
                    var avgR2 = (hsum2[endIndex][0] - hsum2[startIndex][0]) / (endIndex - startIndex);
                    var avgG2 = (hsum2[endIndex][1] - hsum2[startIndex][1]) / (endIndex - startIndex);
                    var avgB2 = (hsum2[endIndex][2] - hsum2[startIndex][2]) / (endIndex - startIndex);
                    sd[index] = Math.sqrt(avgR2 + avgG2 + avgB2 - (avgR * avgR + avgG * avgG + avgB * avgB));
                    if (isNaN(sd[index])) {
                        sd[index] = 0;
                    }
                }
            }
            return sd;
        },
        createTextures: function createTextures() {
            var thisSketcher = this;
            var width = this.width;
            var height = this.height;
            var steps = this.levelSteps;
            var canvases = (this.textureCanvases = []);
            var imageDatas = (this.textureImageDatas = []);

            var thickness = this.lineThickness;
            var length = this.lineLength;
            var darkeningFactor = 1 - this.darkeningFactor;
            var alpha = this.lineAlpha;
            var densityFactor = this.lineDensity * 2;
            var lightness = this.lightness;
            for (var ri = -1; ri <= steps; ri++) {
                canvases[ri] = {};
                imageDatas[ri] = {};
                for (var gi = -1; gi <= steps; gi++) {
                    canvases[ri][gi] = {};
                    imageDatas[ri][gi] = {};
                }
            }
            for (var key in this.requiredColours) {
                var parts = key.split(':');
                var ri = parseInt(parts[0]);
                var gi = parseInt(parts[1]);
                var bi = parseInt(parts[2]);
                var red = (255 * ri) / (steps - 1);
                var green = (255 * gi) / (steps - 1);
                var blue = (255 * bi) / (steps - 1);
                var value = (red + green + blue) / 3 / 255;
                red = Math.min(255, Math.max(0, red));
                green = Math.min(255, Math.max(0, green));
                blue = Math.min(255, Math.max(0, blue));

                var minimum = 1 - Math.min(red, green, blue) / 255;
                if (minimum > 0) {
                    var scaling = Math.pow(1 / minimum, 1.0 / lightness);
                    var displayRed = Math.round((255 - (255 - red) * scaling) * darkeningFactor);
                    var displayGreen = Math.round((255 - (255 - green) * scaling) * darkeningFactor);
                    var displayBlue = Math.round((255 - (255 - blue) * scaling) * darkeningFactor);
                    var colour = 'rgb(' + displayRed + ',' + displayGreen + ',' + displayBlue + ')';
                } else {
                    var displayRed = Math.round(red * darkeningFactor);
                    var displayGreen = Math.round(green * darkeningFactor);
                    var displayBlue = Math.round(blue * darkeningFactor);
                    var colour = 'rgb(' + displayRed + ',' + displayGreen + ',' + displayBlue + ')';
                }

                if (Math.abs(green - blue) > 0.1 || Math.abs(2 * red - green - blue) > 0.1) {
                    var hue = Math.atan2(Math.sqrt(3) * (green - blue), 2 * red - green - blue);
                    var maxRgb = Math.max(255 - red, 255 - green, 255 - blue);
                    var minRgb = Math.min(255 - red, 255 - green, 255 - blue);
                    var saturation = (maxRgb - minRgb) / maxRgb;
                    if (saturation == 0) {
                        hue = Math.random() * Math.PI * 2;
                    }
                } else {
                    var hue = 0;
                    var saturation = 0;
                }

                (function (ri, gi, bi, hue, saturation, thickness, length, minimum, colour, alpha, densityFactor) {
                    thisSketcher.preparationFunctions.push(function () {
                        var angleVariation = Math.PI * (0.1 + 0.9 * Math.pow(1 - saturation, 3));
                        var canvas = directionalStrokes(width, height, hue / 2 + Math.PI * 0.3, angleVariation, thickness, length, minimum * densityFactor, colour, alpha);
                        canvases[ri][gi][bi] = canvas;
                        imageDatas[ri][gi][bi] = canvas.getContext('2d').getImageData(0, 0, width, height);
                        return [ri, gi, bi].join(':');
                    });
                })(ri, gi, bi, hue, saturation, thickness, length, minimum, colour, alpha, densityFactor);
            }
        },
        getPixel: function getPixel(pixelIndex, r, g, b) {
            var imageDatas = this.textureImageDatas;
            pixelIndex *= 4;
            var redIndex = (r / 255) * (this.levelSteps - 1);
            var greenIndex = (g / 255) * (this.levelSteps - 1);
            var blueIndex = (b / 255) * (this.levelSteps - 1);

            var redBlend = redIndex;
            var greenBlend = greenIndex;
            var blueBlend = blueIndex;
            redIndex = Math.round(redIndex);
            greenIndex = Math.round(greenIndex);
            blueIndex = Math.round(blueIndex);

            var blendTotal = 0;
            for (var ri = -1; ri <= 1; ri++) {
                for (var gi = -1; gi <= 1; gi++) {
                    for (var bi = -1; bi <= 1; bi++) {
                        var blend = (0.75 - Math.abs(redIndex + ri - redBlend) / 2) * (0.75 - Math.abs(greenIndex + gi - greenBlend) / 2) * (0.75 - Math.abs(blueIndex + bi - blueBlend) / 2);
                        if (blend < 0) {
                            throw new Error('debug');
                        }
                        blendTotal += blend;
                    }
                }
            }
            var red = 0;
            var green = 0;
            var blue = 0;
            for (var ri = -1; ri <= 1; ri++) {
                for (var gi = -1; gi <= 1; gi++) {
                    for (var bi = -1; bi <= 1; bi++) {
                        var blend = (0.75 - Math.abs(redIndex + ri - redBlend) / 2) * (0.75 - Math.abs(greenIndex + gi - greenBlend) / 2) * (0.75 - Math.abs(blueIndex + bi - blueBlend) / 2);
                        blend /= blendTotal;

                        var imageData = imageDatas[redIndex + ri][greenIndex + gi][blueIndex + bi];
                        if (imageData == undefined) {
                            throw new Error('debug me!');
                        }
                        red += imageData.data[pixelIndex] * blend;
                        green += imageData.data[pixelIndex + 1] * blend;
                        blue += imageData.data[pixelIndex + 2] * blend;
                    }
                }
            }
            var brighteningFactor = 1 - (1 - (this.levelSteps + 1) / this.levelSteps) * 0.25;
            return {
                red: Math.min(255, Math.round(red * brighteningFactor)),
                green: Math.min(255, Math.round(green * brighteningFactor)),
                blue: Math.min(255, Math.round(blue * brighteningFactor))
            };
        }
    };

    function directionalStrokes(width, height, angle, angleVariation, thickness, length, density, lineStyle, alpha) {
        var count = (density * width * height) / length / thickness / alpha;
        var canvas = createCanvas(width, height);
        var context = canvas.getContext('2d');
        context.strokeStyle = lineStyle;
        context.globalAlpha = 1;
        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, width, height);
        context.globalAlpha = alpha;
        context.lineWidth = thickness;
        for (var i = 0; i < count; i++) {
            var lineAngle = angle + (Math.round(Math.random() * 2 - 1) / 2) * angleVariation;
            var midX = Math.random() * width;
            var midY = Math.random() * height;
            var deltaX = (length / 2) * Math.cos(lineAngle);
            var deltaY = (length / 2) * Math.sin(lineAngle);

            var startX = midX + deltaX;
            var endX = midX - deltaX;
            var startY = midY + deltaY;
            var endY = midY - deltaY;
            context.beginPath();
            context.moveTo(startX, startY);
            context.lineTo(endX, endY);
            context.stroke();
        }
        return canvas;
    }

    return Sketcher;
})();

export default Sketcher;
export { Sketcher };

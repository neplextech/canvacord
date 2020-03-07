module.exports = class CanvaError {
    constructor(reason) {
        console.error(`[CanvacordError] ${reason}`);
        process.exit(1);
    }
}
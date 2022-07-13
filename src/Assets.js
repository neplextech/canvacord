const fs = require("fs");

const ASSETS_DIR = "CANVACORD_ASSETS" in process.env ? process.env.CANVACORD_ASSETS : `${__dirname}/../assets`;

let loaded = false;

const store = {
    fonts: {},
    images: {}
};

function loadAssets(warnIfFailed = true) {
    for (const asset of ["fonts", "images"]) {
        try {
            const data = fs.readdirSync(`${ASSETS_DIR}/${asset}`);
            data.forEach(d => {
                const name = d.split(".").shift();
                (asset === "fonts" ? store.fonts : store.images)[name] = {
                    name,
                    path: `${ASSETS_DIR}/${asset}/${d}`,
                    type: asset === "fonts" ? "FONT" : "IMAGE"
                };
            });
        } catch {
            if (warnIfFailed) process.emitWarning("[Canvacord] Could not load assets. Try running \"npx canvacord rebuild --force\"");
        }
    }
}

const ensureLoaded = () => {
    if (!loaded) {
        loadAssets();
        loaded = true;
    }
};

module.exports = {
    load: loadAssets,
    ASSETS_DIR,
    font: {
        get(name) {
            if (!name || typeof name !== "string") throw new TypeError("font name must be a string");
            ensureLoaded();
            return store.fonts[name]?.path;
        },
        getMetadata(name) {
            if (!name || typeof name !== "string") throw new TypeError("image name must be a string");
            ensureLoaded();
            return store.fonts[name];
        },
        all() {
            ensureLoaded();
            return store.fonts;
        }
    },
    image: {
        get(name) {
            if (!name || typeof name !== "string") throw new TypeError("image name must be a string");
            ensureLoaded();
            return store.images[name]?.path;
        },
        getMetadata(name) {
            if (!name || typeof name !== "string") throw new TypeError("image name must be a string");
            ensureLoaded();
            return store.images[name];
        },
        all() {
            ensureLoaded();
            return store.images;
        }
    }
};
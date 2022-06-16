import fs from "node:fs";

interface Store {
    path: string;
    name: string;
}

type FontStore = Store & { type: "FONT" };
type ImageStore = Store & { type: "IMAGE" };

const store = {
    fonts: {} as Record<string, FontStore>,
    images: {} as Record<string, ImageStore>
};

let loaded = false;

function loadAssets(warnIfFailed = true) {
    for (const asset of ["fonts", "images"]) {
        try {
            const data = fs.readdirSync(`${__dirname}/../assets/${asset}`);
            data.forEach(d => {
                const name = d.split(".").shift() as string;
                (asset === "fonts" ? store.fonts : store.images)[name] = {
                    name,
                    path: `${__dirname}/../assets/${asset}/${d}`,
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

export const AssetsManager = {
    load: loadAssets,
    fonts: {
        get(name: string) {
            if (!name || typeof name !== "string") throw new TypeError("font name must be a string");
            ensureLoaded();
            return store.fonts[name];
        },
        all() {
            ensureLoaded();
            return store.fonts;
        }
    },
    images: {
        get(name: string) {
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
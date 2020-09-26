class Rank {

    /**
     * Creates Rank card
     */
    constructor() {

        /**
         * Rank card data
         */
        this.data = {
            background: {
                type: "color",
                image: "#23272A"
            },
            progressBar: {
                track: {
                    color: "#484b4E"
                },
                bar: {
                    type: "color",
                    color: "#FFFFFF"
                }
            },
            overlay: {
                display: true,
                color: "rgba(51, 54, 64, 0.4)"
            },
            avatar: null,
            status: "online",
            rank: {
                display: true,
                data: 1
            },
            level: {
                display: true,
                data: 1
            },
            currentXP: 0,
            requiredXP: 1
        };

    }

    /**
     * Set progressbar style
     * @param {string|string[]} color Progressbar Color
     * @param {"COLOR"|"GRADIENT"} [type] Progressbar type
     */
    setProgressBar(color, type = "COLOR") {

        switch(type) {
            case "COLOR":
                if (typeof color !== "string") throw new Error(`Color type must be a string, received ${typeof color}!`);
                this.data.progressBar.bar.color = color;
                this.data.progressBar.bar.type = "color";
                break;
            case "GRADIENT":
                if (!Array.isArray(color)) throw new Error(`Color type must be Array, received ${typeof color}!`);
                this.data.progressBar.bar.color = color.slice(0, 2);
                this.data.progressBar.bar.type = "gradient";
                break;
            default:
                throw new Error(`Unsupported progressbar type "${type}"!`);
        }

        return this;

    }

    /**
     * Set progressbar track
     * @param {string} color Track color
     */
    setProgressBarTrack(color) {
        if (typeof color !== "string") throw new Error(`Color type must be a string, received "${typeof color}"!`);
        this.data.progressBar.track.color = color;

        return this;
    }

    /**
     * Set card overlay
     * @param {string} color Overlay color
     * @param {boolean} display IF it should display overlay
     */
    setOverlay(color, display = true) {
        if (typeof color !== "string") throw new Error(`Color type must be a string, received "${typeof color}"!`);
        this.data.overlay.color = color;
        this.data.overlay.display = !!display;

        return this;
    }

    /**
     * Set required xp
     * @param {number} data Required xp
     */
    setRequiredXP(data) {
        if (typeof data !== "number") throw new Error(`Required xp data type must be a number, received ${typeof data}!`);
        this.data.requiredXP = data;

        return this;
    }

    /**
     * Set current xp
     * @param {number} data Current xp
     */
    setCurrentXP(data) {
        if (typeof data !== "number") throw new Error(`Current xp data type must be a number, received ${typeof data}!`);
        this.data.currentXP = data;

        return this;
    }

    /**
     * Set Rank
     * @param {number} data Current Rank
     * @param {boolean} [display=true] If it should display rank
     */
    setRank(data, display = true) {
        if (typeof data !== "number") throw new Error(`Level data must be a number, received ${typeof data}!`);
        this.data.rank.data = data;
        this.data.rank.display = !!display;

        return this;
    }

    /**
     * Set Level
     * @param {number} data Current Level
     * @param {boolean} [display=true] If it should display level
     */
    setLevel(data, display = true) {
        if (typeof data !== "number") throw new Error(`Level data must be a number, received ${typeof data}!`);
        this.data.level.data = data;
        this.data.level.display = !!display;

        return this;
    }

    /**
     * Set status
     * @param {"online"|"idle"|"dnd"|"offline"|"streaming"} status User status
     */
    setStatus(status) {
        switch(status) {
            case "online":
                this.data.status = "online";
                break;
            case "idle":
                this.data.status = "idle";
                break;
            case "dnd":
                this.data.status = "dnd";
                break;
            case "offline":
                this.data.status = "offline";
                break;
            case "streaming":
                this.data.status = "stream";
                break;
            default:
                throw new Error(`Invalid status "${status}"`);
        }

        return this;
    }

    /**
     * Set background image/color
     * @param {"COLOR"|"IMAGE"} type Background type
     * @param {string|Buffer} [data] Background color or image
     */
    setBackground(type, data) {
        if (!data) throw new Error("Missing field : data");
        switch(type) {
            case "COLOR":
                this.data.background.type = "color";
                this.data.background.image = data && typeof data === "string" ? data : "#23272A";
                break;
            case "IMAGE":
                if (!Buffer.isBuffer(data) || typeof data !== "string") throw new Error(`Unsupported background data type "${typeof data}"`);
                this.data.background.type = "image";
                this.data.background.image = data;
                break;
            default:
                throw new Error(`Unsupported background type "${type}"`);
        }

        return this;
    }

    /**
     * User avatar
     * @param {string|Buffer} data Avatar data
     */
    setAvatar(data) {
        if (typeof data !== "string" || !Buffer.isBuffer(data)) throw new Error(`Invalid avatar type "${typeof data}"!`);
        this.avatar = data;
    }

    async build() {}

}

module.exports = Rank;
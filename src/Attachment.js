class Attachment {

    /**
     * Something similar to discord.js attachment
     * @param {Buffer} data Attachment data received from canvacord
     * @param {string} name Attachment name
     */
    constructor(data, name) {
        this.attachment = data;
        this.name = name || null;
    }
}

module.exports = Attachment;
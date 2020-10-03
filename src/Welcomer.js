const { Base } = require("discord-canvas");
const Util = require("../plugins/Util");

class Welcomer extends Base {

    /**
     * Welcome image builder
     * @see https://www.discord-canvas.net/functions/welcome
     * @example
     * const card = new canvacord.Welcomer()
            .setUsername("Snowflake")
            .setDiscriminator("0007")
            .setGuildName("Snowflake Studio");

        card.build()
            .then(data => {
                canvacord.write(data, "welcomer.png");
            })
     */
    constructor() {
        super();

        this.textTitle = "WELCOME";
        this.textMessage = "Welcome to {server}";
        this.colorTitle = "#03A9F4";
        
        // update default data
        this.__updateData();
    }

    /**
     * Updates default state
     * @private
     * @ignore
     */
    __updateData() {
        this.setUsername("Discord User");
        this.setDiscriminator("0000");
        this.setMemberCount(100);
        this.setGuildName("Discord Server");
        this.setAvatar(`https://cdn.discordapp.com/embed/avatars/0.png`);
        this.setColor("border", "#4D5E94");
        this.setColor("username-box", "#4D5E94");
        this.setColor("discriminator-box", "#4D5E94");
        this.setColor("message-box", "#4D5E94");
        this.setColor("title", "#4D5E94");
        this.setColor("avatar", "#4D5E94");
    }

    /**
     * Set color
     * @param {"title"|"title-border"|"avatar"|"username"|"username-box"|"hashtag"|"discriminator"|"discriminator-box"|"message"|"message-box"|"member-count"|"background"|"border"} id
     * @param {string} color HTML5 color code
     */
    setColor(id, color) {
        super.setColor(id, color);
        return this;
    }

    /**
     * Ser member count
     * @param {number|string} memberCount Guild member count
     */
    setMemberCount(memberCount = 100) {
        super.setMemberCount(Util.toAbbrev(memberCount));
        return this;
    }

    /**
     * Builds welcome image
     * @returns {Promise<Buffer>}
     */
    async build() {
        return (await this.toAttachment()).toBuffer();
    }

}

module.exports = Welcomer;
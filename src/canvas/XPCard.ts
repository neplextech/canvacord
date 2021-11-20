import { BaseCanvas } from "./BaseCanvas";
import { XPCardRenderData, ImageSourceType, CanvacordOutputFormat } from "../typings/types";
import { BackgroundType } from "../enums/Builders";
import { ActivityType } from "../enums/Activities";
import { UtilityCanvas } from "./UtilityCanvas";
import { Image, GlobalFonts } from "@napi-rs/canvas";
import { Util } from "../Utils/Util";

export class XPCard extends BaseCanvas {
    public renderingData: XPCardRenderData;
    public utils = new UtilityCanvas();
    constructor(rdata ?: XPCardRenderData) {
        super();
        if(rdata) this.renderingData = rdata;
        else if(!rdata) {
        this.renderingData = {
            width: 934,
            height: 282,
            background: {
                type: BackgroundType.COLOR,
                source: "#23272A",
                opacity: 1
            },
            overlay: {
                visible: true,
                type: BackgroundType.COLOR,
                source: "#333640",
                opacity: 0.5,
                width: 894,
                height: 242,
                x: 20,
                y: 20
            },
            avatar: {
                visible: true,
                circular: true,
                x: 70,
                y: 50,
                source: null,
                height: 180,
                width: 180
            },
            activityStatus: {
                visible: true,
                ring: true,
                x: 70,
                y: 50,
                type: ActivityType.ONLINE
            },
            progressBar: {
                visible: true,
                x: 275.5,
                y: 183.75,
                height: 37.5,
                width: 596.5,
                rounded: true,
                track: {
                    color: "#484b4E"
                },
                bar: {
                    color: "#FFFFFF"
                }
            },
            xp: {
                required: {
                    color: "#FFFFFF",
                    fontSize: 30,
                    font: "Manrope Bold",
                    fontPath: Util.assetsSync.font("MANROPE_BOLD"),
                    x: 685,
                    y: 164,
                    opacity: 1,
                    visible: true,
                    value: "0"
                },
                current: {
                    color: "#FFFFFF",
                    fontSize: 30,
                    font: "Manrope Bold",
                    fontPath: Util.assetsSync.font("MANROPE_BOLD"),
                    x: 670,
                    y: 164,
                    opacity: 1,
                    visible: true,
                    value: "0"
                },
                divider: {
                    color: "#FFFFFF",
                    fontSize: 30,
                    font: "Manrope Bold",
                    fontPath: Util.assetsSync.font("MANROPE_BOLD"),
                    x: 674,
                    y: 164,
                    opacity: 1,
                    visible: true,
                    value: "/"
                }
            },
            username: {
                color: "#FFFFFF",
                fontSize: 34,
                font: "Manrope Bold",
                fontPath: Util.assetsSync.font("MANROPE_BOLD"),
                x: 275.5,
                y: 164,
                opacity: 1,
                visible: true,
                value: "UNKNOWN"
            },
            tag: {
                color: "#FFFFFF",
                fontSize: 28,
                font: "Manrope Bold",
                fontPath: Util.assetsSync.font("MANROPE_BOLD"),
                x: 355,
                y: 164,
                opacity: 0.4,
                visible: true,
                value: "#0000"
            },
            text: {
                rank: {
                    color: "#FFFFFF",
                    fontSize: 36,
                    font: "Manrope Bold",
                    fontPath: Util.assetsSync.font("MANROPE_BOLD"),
                    x: 786,
                    y: 82,
                    opacity: 1,
                    visible: true,
                    text: "RANK",
                    value: "0",
                    textColor: "#FFFFFF"
                },
                level: {
                    color: "#FFFFFF",
                    fontSize: 36,
                    font: "Manrope Bold",
                    fontPath: Util.assetsSync.font("MANROPE_BOLD"),
                    x: 800,
                    y: 82,
                    opacity: 1,
                    visible: true,
                    text: "LEVEL",
                    value: "0",
                    textColor: "#FFFFFF"
                }
            }
        };
    };
    }

    setSize(width: number, height: number) {
        this.renderingData.width = width;
        this.renderingData.height = height;
    }

    setBackgroundImage(source: ImageSourceType, opacity?: number) {
        this.renderingData.background.source = source;
        this.renderingData.background.type = BackgroundType.IMAGE;
        this.renderingData.background.opacity = opacity ?? 1;
    }

    setBackgroundColor(source: string, opacity?: number) {
        this.renderingData.background.source = source;
        this.renderingData.background.type = BackgroundType.COLOR;
        this.renderingData.background.opacity = opacity ?? 1;
    }

    setAvatar(source: ImageSourceType, circular = true) {
        this.renderingData.avatar.source = source;
        this.renderingData.avatar.circular = !!circular;
        return this;
    }

    setAvatarVisibility(visible = true) {
        this.renderingData.avatar.visible = !!visible;
        return this;
    }

    setAvatarPosition(x: number, y: number) {
        this.renderingData.avatar.x = x;
        this.renderingData.avatar.y = y;
        return this;
    }

    setAvatarSize(width: number, height: number) {
        this.renderingData.avatar.width = width;
        this.renderingData.avatar.height = height;
        return this;
    }

    setOverlayVisibility(visible = true) {
        this.renderingData.overlay.visible = !!visible;
        return this;
    }

    setOverlayImage(source: ImageSourceType, opacity?: number) {
        this.renderingData.overlay.source = source;
        this.renderingData.overlay.type = BackgroundType.IMAGE;
        this.renderingData.overlay.opacity = opacity ?? 1;
        return this;
    }

    setOverlayColor(source: string, opacity?: number) {
        this.renderingData.overlay.source = source;
        this.renderingData.overlay.type = BackgroundType.COLOR;
        this.renderingData.overlay.opacity = opacity ?? 1;
        return this;
    }

    setOverlayPosition(x: number, y: number) {
        this.renderingData.overlay.x = x;
        this.renderingData.overlay.y = y;
        return this;
    }

    setOverlaySize(width: number, height: number) {
        this.renderingData.overlay.width = width;
        this.renderingData.overlay.height = height;
        return this;
    }

    setActivityStatus(type: ActivityType, ring = true) {
        this.renderingData.activityStatus.type = type;
        this.renderingData.activityStatus.ring = !!ring;
        return this;
    }

    setActivityStatusPosition(x: number, y: number) {
        this.renderingData.activityStatus.x = x;
        this.renderingData.activityStatus.y = y;
        return this;
    }

    setActivityStatusVisibility(visible = true) {
        this.renderingData.activityStatus.visible = !!visible;
        return this;
    }

    setProgressBarVisibility(visible = false) {
        this.renderingData.progressBar.visible = !!visible;
        return this;
    }

    setProgressBarPosition(x: number, y: number) {
        this.renderingData.progressBar.x = x;
        this.renderingData.progressBar.y = y;
        return this;
    }

    setProgressBarSize(width: number, height: number) {
        this.renderingData.progressBar.width = width;
        this.renderingData.progressBar.height = height;
        return this;
    }

    setProgressBarTrack(color: string | string[]) {
        this.renderingData.progressBar.track.color = color;
        return this;
    }

    setProgressBar(color: string | string[], rounded = true) {
        this.renderingData.progressBar.track.color = color;
        this.renderingData.progressBar.rounded = !!rounded;
        return this;
    }

    setUsername(name: string, color?: string) {
        this.renderingData.username.value = name;
        if (color) this.renderingData.username.color = color;

        return this;
    }

    setUsernameVisibility(visible = true) {
        this.renderingData.username.visible = !!visible;
        return this;
    }

    setUsernamePosition(x: number, y: number) {
        this.renderingData.username.x = x;
        this.renderingData.username.y = y;
        return this;
    }

    setUsernameFont(data: Pick<XPCardRenderData["username"], "font" | "fontPath" | "fontSize">) {
        if (!data || typeof data !== "object") throw new TypeError("font data must be an object");
        this.renderingData.username.font = data.font;
        this.renderingData.username.fontPath = data.fontPath;
        this.renderingData.username.fontSize = data.fontSize;
        return this;
    }

    setRank(value: number | string, text: string, opacity?: number) {
        this.renderingData.text.rank.text = text;
        this.renderingData.text.rank.value = `${value}`;
        this.renderingData.text.rank.opacity = opacity ?? 1;
        return this;
    }

    setRankColor(color: string, textColor?: string) {
        this.renderingData.text.rank.color = color;
        this.renderingData.text.rank.textColor = textColor ?? color;
        return this;
    }

    setRankPosition(x: number, y: number) {
        this.renderingData.text.rank.x = x;
        this.renderingData.text.rank.y = y;
        return this;
    }

    setRankVisibility(visible = true) {
        this.renderingData.text.rank.visible = !!visible;
        return this;
    }

    setRankFont(data: Pick<XPCardRenderData["text"]["rank"], "font" | "fontPath" | "fontSize">) {
        if (!data || typeof data !== "object") throw new TypeError("font data must be an object");
        this.renderingData.text.rank.font = data.font;
        this.renderingData.text.rank.fontPath = data.fontPath;
        this.renderingData.text.rank.fontSize = data.fontSize;
        return this;
    }

    setLevel(value: number | string, text: string, opacity?: number) {
        this.renderingData.text.level.text = text;
        this.renderingData.text.level.value = `${value}`;
        this.renderingData.text.level.opacity = opacity ?? 1;
        return this;
    }

    setLevelColor(color: string, textColor?: string) {
        this.renderingData.text.level.color = color;
        this.renderingData.text.level.textColor = textColor ?? color;
        return this;
    }

    setLevelPosition(x: number, y: number) {
        this.renderingData.text.level.x = x;
        this.renderingData.text.level.y = y;
        return this;
    }

    setLevelVisibility(visible = true) {
        this.renderingData.text.level.visible = !!visible;
        return this;
    }

    setLevelFont(data: Pick<XPCardRenderData["text"]["level"], "font" | "fontPath" | "fontSize">) {
        if (!data || typeof data !== "object") throw new TypeError("font data must be an object");
        this.renderingData.text.level.font = data.font;
        this.renderingData.text.level.fontPath = data.fontPath;
        this.renderingData.text.level.fontSize = data.fontSize;
        return this;
    }

    setTagFont(data: Pick<XPCardRenderData["tag"], "font" | "fontPath" | "fontSize">) {
        if (!data || typeof data !== "object") throw new TypeError("font data must be an object");
        this.renderingData.tag.font = data.font;
        this.renderingData.tag.fontPath = data.fontPath;
        this.renderingData.tag.fontSize = data.fontSize;
        return this;
    }

    setXPRequiredFont(data: Pick<XPCardRenderData["xp"]["required"], "font" | "fontPath" | "fontSize">) {
        if (!data || typeof data !== "object") throw new TypeError("font data must be an object");
        this.renderingData.xp.required.font = data.font;
        this.renderingData.xp.required.fontPath = data.fontPath;
        this.renderingData.xp.required.fontSize = data.fontSize;
        return this;
    }

    setXPCurrentFont(data: Pick<XPCardRenderData["xp"]["current"], "font" | "fontPath" | "fontSize">) {
        if (!data || typeof data !== "object") throw new TypeError("font data must be an object");
        this.renderingData.xp.current.font = data.font;
        this.renderingData.xp.current.fontPath = data.fontPath;
        this.renderingData.xp.current.fontSize = data.fontSize;
        return this;
    }

    setXPDividerFont(data: Pick<XPCardRenderData["xp"]["divider"], "font" | "fontPath" | "fontSize">) {
        if (!data || typeof data !== "object") throw new TypeError("font data must be an object");
        this.renderingData.xp.divider.font = data.font;
        this.renderingData.xp.divider.fontPath = data.fontPath;
        this.renderingData.xp.divider.fontSize = data.fontSize;
        return this;
    }

    async render(mimeType?: CanvacordOutputFormat): Promise<Buffer> {
        if (typeof mimeType === "string") this.mimeType = mimeType;

        void this.makeCanvas(this.renderingData.width, this.renderingData.height);

        await this.drawBackground();
        await this.drawOverlay();
        await this.drawAvatar();

        return this.buildImage();
    }

    registerFonts() {
        const fonts = {
            username: this.renderingData.username,
            tag: this.renderingData.tag,
            level: this.renderingData.text.level,
            rank: this.renderingData.text.rank,
            currentXP: this.renderingData.xp.current,
            divider: this.renderingData.xp.divider,
            requiredXP: this.renderingData.xp.required
        };

        const failures: string[] = [];

        for (const [name, item] of Object.entries(fonts)) {
            const success = GlobalFonts.registerFromPath(item.fontPath, item.font);
            if (!success) failures.push(name);
        }

        if (failures.length)
            process.emitWarning(new Error(`Could not register fonts for ${failures.map((m) => `"${m}"`).join(", ")}`), {
                code: "CANVACORD_FONT_FACTORY",
                detail: `Fonts information:\n${failures
                    .map((m, i) => {
                        // @ts-expect-error font registry
                        const picked = fonts[m];

                        return `${"-".repeat(50)}\n[${i + 1}. ${m}]\nName: ${picked.font}\nPath: ${picked.fontPath}`;
                    })
                    .join("\n")}`
            });

        return this;
    }

    private async drawOverlay() {
        const data = this.renderingData.overlay;
        if (!data.visible) return;

        this.ctx.save();
        if (data.type === BackgroundType.IMAGE) {
            const loadedImage = await this.loadImage(data.source);
            this.ctx.drawImage(loadedImage, data.x, data.y, data.width, data.height);
        } else {
            this.ctx.fillStyle = Util.hexToRGBA(data.source as string, data.opacity, true);
            this.ctx.fillRect(data.x, data.y, data.width, data.height);
        }
        this.ctx.restore();
    }

    private async drawAvatar() {
        const rdata = this.renderingData.avatar;
        if (!rdata.visible) return;
        if (!rdata.source) throw new Error("No avatar source found");
        const source = await this.loadImage(rdata.source);
        let img: Image;

        if (rdata.circular) {
            img = await this.loadImage(await this.utils.circle(source));
        } else {
            img = await this.loadImage(source);
        }

        this.ctx.drawImage(img, rdata.x, rdata.y, rdata.width, rdata.height);
    }

    private async drawBackground() {
        this.ctx.save();
        this.ctx.globalAlpha = this.renderingData.background.opacity;

        if (this.renderingData.background.type === BackgroundType.IMAGE) {
            const loadedImage = await this.loadImage(this.renderingData.background.source);
            this.ctx.drawImage(loadedImage, 0, 0);
        } else {
            this.ctx.fillStyle = this.renderingData.background.source as string;
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        }

        this.ctx.globalAlpha = 1;
        this.ctx.restore();
    }
}

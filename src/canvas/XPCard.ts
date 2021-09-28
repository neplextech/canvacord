import { BaseCanvas } from "./BaseCanvas";
import { XPCardRenderData, ImageSourceType, CanvacordOutputFormat } from "../typings/types";
import { BackgroundType } from "../enums/Builders";
import { ActivityType } from "../enums/Activities";
import { UtilityCanvas } from "./UtilityCanvas";
import { Image } from "@napi-rs/canvas";
import { Util } from "../Utils/Util";

export class XPCard extends BaseCanvas {
    public renderingData: XPCardRenderData;
    public utils = new UtilityCanvas();
    constructor() {
        super();

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
                    font: "Manrope",
                    x: 685,
                    y: 164,
                    opacity: 1,
                    visible: true,
                    value: "0"
                },
                current: {
                    color: "#FFFFFF",
                    fontSize: 30,
                    font: "Manrope",
                    x: 670,
                    y: 164,
                    opacity: 1,
                    visible: true,
                    value: "0"
                },
                divider: {
                    color: "#FFFFFF",
                    fontSize: 30,
                    font: "Manrope",
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
                font: "Manrope",
                x: 275.5,
                y: 164,
                opacity: 1,
                visible: true,
                value: "UNKNOWN"
            },
            tag: {
                color: "#FFFFFF",
                fontSize: 28,
                font: "Manrope",
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
                    font: "Manrope",
                    x: 786,
                    y: 82,
                    opacity: 1,
                    visible: true,
                    value: "0",
                    textColor: "#FFFFFF"
                },
                level: {
                    color: "#FFFFFF",
                    fontSize: 36,
                    font: "Manrope",
                    x: 800,
                    y: 82,
                    opacity: 1,
                    visible: true,
                    value: "0",
                    textColor: "#FFFFFF"
                }
            }
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

    async render(mimeType?: CanvacordOutputFormat): Promise<Buffer> {
        if (typeof mimeType === "string") this.mimeType = mimeType;

        void this.makeCanvas(this.renderingData.width, this.renderingData.height);

        // draw background
        await this.drawBackground();
        await this.drawOverlay();
        await this.drawAvatar();

        return this.buildImage();
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

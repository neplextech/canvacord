import { BaseCanvas } from "./BaseCanvas";
import { XPCardRenderData } from "../typings/types";
import { BackgroundType } from "../enums/Builders";
import { ActivityType } from "../enums/Activities";

export class XPCard extends BaseCanvas {
    private renderingData: XPCardRenderData;
    constructor() {
        super();

        this.renderingData = {
            height: 934,
            width: 282,
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
                width: this.renderingData.width - 40,
                height: this.renderingData.height - 40,
                x: 20,
                y: 20
            },
            avatar: {
                visible: true,
                circular: true,
                x: 70,
                y: 50,
                source: "#FFFFFF",
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
}

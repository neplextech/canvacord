import type { Image as SkImage } from "@napi-rs/canvas";
import type { ActivityType } from "../enums/Activities";
import type { BackgroundType } from "../enums/Builders";

export type CanvacordOutputFormat = "png" | "jpeg" | "webp";
export type ImageSourceType = string | Buffer | SkImage;

export interface XPCardRenderData {
    height: number;
    width: number;
    background: {
        type: BackgroundType;
        source: ImageSourceType;
        opacity: number;
    };
    overlay: {
        visible: boolean;
        type: BackgroundType;
        source: ImageSourceType;
        opacity: number;
        x: number;
        y: number;
        width: number;
        height: number;
    };
    avatar: {
        visible: boolean;
        circular: boolean;
        x: number;
        y: number;
        source: ImageSourceType;
        height: number;
        width: number;
    };
    activityStatus: {
        visible: boolean;
        ring: boolean;
        x: number;
        y: number;
        type: ActivityType;
    };
    progressBar: {
        visible: boolean;
        x: number;
        y: number;
        height: number;
        width: number;
        rounded: boolean;
        track: {
            color: string | string[];
        };
        bar: {
            color: string | string[];
        };
    };
    xp: {
        required: {
            color: string;
            fontSize: number;
            font: string;
            fontPath: string;
            x: number;
            y: number;
            opacity: number;
            visible: boolean;
            value: string;
        };
        current: {
            color: string;
            fontSize: number;
            font: string;
            fontPath: string;
            x: number;
            y: number;
            opacity: number;
            visible: boolean;
            value: string;
        };
        divider: {
            color: string;
            fontSize: number;
            font: string;
            fontPath: string;
            x: number;
            y: number;
            opacity: number;
            visible: boolean;
            value: string;
        };
    };
    username: {
        color: string;
        fontSize: number;
        font: string;
        fontPath: string;
        x: number;
        y: number;
        opacity: number;
        visible: boolean;
        value: string;
    };
    tag: {
        color: string;
        fontSize: number;
        font: string;
        fontPath: string;
        x: number;
        y: number;
        opacity: number;
        visible: boolean;
        value: string;
    };
    text: {
        rank: {
            color: string;
            fontSize: number;
            font: string;
            fontPath: string;
            x: number;
            y: number;
            opacity: number;
            visible: boolean;
            value: string;
            text: string;
            textColor: string;
        };
        level: {
            color: string;
            fontSize: number;
            font: string;
            fontPath: string;
            x: number;
            y: number;
            opacity: number;
            visible: boolean;
            value: string;
            text: string;
            textColor: string;
        };
    };
}

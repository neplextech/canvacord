// Work all the cards listed on issue #124

import { IllustratorImageSource, Illustrator, Layer, IllustratorExportConfig } from "illustrator.js";

export class RankCard extends null {
    private illustrator: Illustrator;
    private backgroundLayer: Layer;
    private textLayer: Layer;
    private imageLayer: Layer;

    private usernameData: usernameData = {
        username: "Shisui",
        color: "#FFFFFF",
        fontFamily: "Arial",
        fontSize: 24,
        visible: true,
        x: 0,
        y: 0,
    }

    private rankData: rankData = {
        fontFamily: "Arial",
        color: "#FFFFFF",
        fontSize: 24,
        rank: 1,
        visible: true,
        x: 0,
        y: 0,
    }

    private levelData: levelData = {
        fontFamily: "Arial",
        color: "#FFFFFF",
        fontSize: 24,
        level: 1,
        visible: true,
        x: 0,
        y: 0,
    }

    private requiredXpData: xpData = {
        fontFamily: "Arial",
        color: "#FFFFFF",
        fontSize: 24,
        xp: 1,
        visible: true,
        x: 0,
        y: 0,
    }

    private currentXpData: xpData = {
        fontFamily: "Arial",
        color: "#FFFFFF",
        fontSize: 24,
        xp: 1,
        visible: true,
        x: 0,
        y: 0,
    }

    private avatarData: avatarData = {
        visible: true,
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        avatar: "",
        borderWidth: 3,
        borderColor: "#ffffff",
        rounded: true
    }

    private backgroundData: backgroundData = {
        visible: true,
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        background: ""
    }

    private currentXpLabelData: textProperty = {
        fontFamily: "Arial",
        color: "#FFFFFF",
        fontSize: 24,
        visible: true,
        x: 0,
        y: 0,
    }

    private requiredXpLabelData: textProperty = {
        fontFamily: "Arial",
        color: "#FFFFFF",
        fontSize: 24,
        visible: true,
        x: 0,
        y: 0,
    }

    private levelLabelData: textProperty = {
        fontFamily: "Arial",
        color: "#FFFFFF",
        fontSize: 24,
        visible: true,
        x: 0,
        y: 0,
    }

    private rankLabelData: textProperty = {
        fontFamily: "Arial",
        color: "#FFFFFF",
        fontSize: 24,
        visible: true,
        x: 0,
        y: 0,
    }

    private xpBarData: barData = {
        emptyColor: "#ffffff",
        x: 50,
        y: 50,
        visible: true,
        filledColor: "#ffffff",
        height: 50,
        barRadius: 50,
        maxWidth: 1413
    }

    constructor(height: number = 512, width: number = 2048) {
        this.illustrator = new Illustrator(width, height);
        this.backgroundLayer = this.illustrator.backgroundLayer;
        this.textLayer = this.illustrator.layers.createLayer({ name: "text-layer", position: 1 });
        this.imageLayer = this.illustrator.layers.createLayer({ name: "avatar-layer", position: 2 });
    }

    public setUsername({
        username, fontSize = 24, color = "#ffffff", x = 50, y = 50, visible = true, fontFamily = "Arial"
    }: usernameData) {
        this.usernameData = {
            username,
            fontSize,
            color,
            visible,
            x,
            y,
            fontFamily
        };

        return this;
    }

    public setRank({
        rank, fontSize = 24, color = "#ffffff", x = 50, y = 50, visible = true, fontFamily = "Arial"
    }: rankData) {
        this.rankData = {
            rank,
            fontSize,
            color,
            visible,
            x,
            y,
            fontFamily
        };

        return this;
    }

    public setLevel({
        level, fontSize = 24, color = "#ffffff", x = 50, y = 50, visible = true, fontFamily = "Arial"
    }: levelData) {
        this.levelData = {
            level,
            fontSize,
            color,
            visible,
            x,
            y,
            fontFamily
        };

        return this;
    }

    public setRequiredXp({
        xp, fontSize = 24, color = "#ffffff", x = 50, y = 50, visible = true, fontFamily = "Arial"
    }: xpData) {
        this.requiredXpData = {
            xp,
            fontSize,
            color,
            visible,
            x,
            y,
            fontFamily
        };

        return this;
    }

    public setCurrentXp({
        xp, fontSize = 24, color = "#ffffff", x = 50, y = 50, visible = true, fontFamily = "Arial"
    }: xpData) {
        this.requiredXpData = {
            xp,
            fontSize,
            color,
            visible,
            x,
            y,
            fontFamily
        };

        return this;
    }

    public setAvatar({
        avatar, width = 24, height = 24, x = 50, y = 50, borderWidth = 3, borderColor = "#ffff00", visible = true, rounded = true
    }: avatarData) {
        this.avatarData = {
            avatar,
            width,
            height,
            x,
            y,
            visible,
            borderWidth,
            borderColor,
            rounded
        }

        return this;
    }

    public setBackground({
        background, width = 24, height = 24, x = 50, y = 50, visible = true
    }: backgroundData) {
        this.backgroundData = {
            background,
            width,
            height,
            x,
            y,
            visible,
        }

        return this;
    }

    setFont(path: string, name: string) {
        this.textLayer.tools.get("TextTool").registerFontPath(path, name);

        return this;
    }

    setRankLabel({ fontSize = 24, color = "#ffffff", x = 50, y = 50, visible = true, fontFamily = "Arial" }: textProperty) {
        this.rankLabelData = {
            fontFamily,
            color,
            x,
            y,
            fontSize,
            visible,
        }

        return this;
    }

    setLevelLabel({ fontSize = 24, color = "#ffffff", x = 50, y = 50, visible = true, fontFamily = "Arial" }: textProperty) {
        this.levelLabelData = {
            fontFamily,
            color,
            x,
            y,
            fontSize,
            visible,
        }

        return this;
    }

    setCurrentXpLabel({ fontSize = 24, color = "#ffffff", x = 50, y = 50, visible = true, fontFamily = "Arial" }: textProperty) {
        this.currentXpLabelData = {
            fontFamily,
            color,
            x,
            y,
            fontSize,
            visible,
        }

        return this;
    }

    setRequiredXpLabel({ fontSize = 24, color = "#ffffff", x = 50, y = 50, visible = true, fontFamily = "Arial" }: textProperty) {
        this.requiredXpLabelData = {
            fontFamily,
            color,
            x,
            y,
            fontSize,
            visible,
        }

        return this;
    }

    setXpBar({ emptyColor = "#ffffff", x = 50, y = 50, visible = true, filledColor = "#ffffff", height = 50, barRadius = 50, maxWidth = 1413 }: barData) {
        this.xpBarData = {
            emptyColor,
            x,
            y,
            visible,
            filledColor,
            height,
            barRadius,
            maxWidth,
        }

        return this;
    }

    async build(config: IllustratorExportConfig) {
        // Acutally do the building :)
        await this.illustrator.export(config);
    }
}

interface basicProperty {
    visible: boolean,
    x: number,
    y: number
}

interface textProperty extends basicProperty {
    fontSize: number,
    color: Color,
    fontFamily: string
}

interface imageProperty extends basicProperty {
    width: number,
    height: number,
}

interface usernameData extends textProperty {
    username: string
}

interface rankData extends textProperty {
    rank: number
}

interface levelData extends textProperty {
    level: number
}

interface xpData extends textProperty {
    xp: number
}

interface avatarData extends imageProperty {
    avatar: IllustratorImageSource,
    borderWidth: number,
    borderColor: Color,
    rounded: boolean
}

interface backgroundData extends imageProperty {
    background: IllustratorImageSource
}

interface barData extends basicProperty {
    maxWidth: number,
    height: number,
    barRadius: number,
    emptyColor: Color,
    filledColor: Color,
}


type Color = number[] | number | `#${string}` | `rgb(${number}, ${number}, ${number})` | `rgba(${number}, ${number})` | `cmyk(${number}%, ${number}%, ${number}%, ${number}%)` | `hsl(${number}%, ${number}%, ${number}%)` | `hsla(${number}%, ${number}%, ${number}%, ${number}%)`;

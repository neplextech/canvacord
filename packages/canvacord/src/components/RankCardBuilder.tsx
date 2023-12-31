import { Transformer } from "@napi-rs/image";
import { FontFactory } from "../assets";
import { ImageSource, JSX, loadImage } from "../helpers";
import { getDefaultFont } from "../helpers/utils";
import { Builder } from "../templates/Builder";
import {
  NeoClassicalCard,
  RankCardProps,
  RankCardUserStatus,
  StatusData,
} from "./rank-card/NeoClassicalCard";

/**
 * The rank card builder props.
 */
interface RankCardBuilderProps
  extends Omit<RankCardProps, "avatar" | "backgroundColor"> {
  avatar: ImageSource;
  background: ImageSource;
  backgroundCrop?: Partial<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
  fonts: Partial<{
    username: Partial<{
      name: string;
      handle: string;
    }>;
    progress: Partial<{
      level: Partial<{
        text: string;
        value: string;
      }>;
      xp: Partial<{
        text: string;
        value: string;
      }>;
      rank: Partial<{
        text: string;
        value: string;
      }>;
    }>;
  }>;
}

export class RankCardBuilder extends Builder<RankCardBuilderProps> {
  /**
   * Creates a new rank card builder.
   * @example
   * const card = new RankCardBuilder()
   *     .setUsername('kiki')
   *     .setDisplayName('Kiki')
   *     .setDiscriminator('1234')
   *     .setAvatar('...')
   *     .setCurrentXP(300)
   *     .setRequiredXP(600)
   *     .setLevel(2)
   *     .setRank(5)
   *     .setStatus('online');
   *
   * const pngBuffer = await card.build({
   *   format: 'png'
   * });
   */
  public constructor() {
    super(930, 280);

    this.bootstrap({
      avatar: "",
      abbreviate: true,
      background: "#2C2F33",
      currentXP: 0,
      handle: null,
      level: null,
      overlay: 90,
      rank: null,
      requiredXP: 0,
      status: RankCardUserStatus.None,
      styles: {},
      texts: {},
      username: null,
      fonts: {},
      calculateProgress: (currentXP, requiredXP) =>
        ((currentXP ?? 0) / (requiredXP ?? 0)) * 100,
    });
  }

  /**
   * Sets the fonts to be used for this rank card.
   * @param fontConfig The fonts to be used for this rank card.
   */
  public setFonts(fontConfig: Required<RankCardBuilderProps["fonts"]>) {
    this.options.set("fonts", fontConfig);
    return this;
  }

  /**
   * Sets the avatar for this rank card.
   * @param image The avatar for this rank card.
   */
  public setAvatar(image: ImageSource) {
    this.options.set("avatar", image);
    return this;
  }

  /**
   * Sets the background for this rank card.
   * @param image The background for this rank card.
   */
  public setBackground(image: ImageSource) {
    this.options.set("background", image);
    return this;
  }

  /**
   * Sets the status for this rank card.
   * @param status The status for this rank card.
   */
  public setStatus(status: RankCardUserStatus | StatusData) {
    this.options.set("status", status);
    return this;
  }

  /**
   * Sets the username for this rank card.
   * @param name The username for this rank card.
   */
  public setDisplayName(name: string) {
    this.options.set("username", name);
    return this;
  }

  /**
   * Sets the handle name for this rank card.
   * @param name The handle name for this rank card.
   */
  public setUsername(name: string) {
    this.options.set("handle", name);
    return this;
  }

  /**
   * Set overlay for this rank card.
   */
  public setOverlay(overlay: RankCardProps["overlay"]) {
    this.options.set("overlay", overlay);
    return this;
  }

  /**
   * Sets the current xp for this rank card.
   * @param xp The current xp for this rank card.
   */
  public setCurrentXP(xp: number) {
    this.options.set("currentXP", xp);
    return this;
  }

  /**
   * Sets the required xp for this rank card.
   * @param xp The required xp for this rank card.
   */
  public setRequiredXP(xp: number) {
    this.options.set("requiredXP", xp);
    return this;
  }

  /**
   * Sets the level of this rank card.
   * @param level The level of this rank card.
   */
  public setLevel(level: number) {
    this.options.set("level", level);
    return this;
  }

  /**
   * Sets the rank of this rank card.
   * @param rank The rank of this rank card.
   */
  public setRank(rank: number) {
    this.options.set("rank", rank);
    return this;
  }

  /**
   * Configures the renderer for this rank card.
   * @param config The configuration for this rank card.
   */
  public setStyles(config: Partial<RankCardBuilderProps["styles"]>) {
    this.options.merge("styles", config);
    return this;
  }

  /**
   * Set background crop for this rank card.
   */
  public setBackgroundCrop(
    pos: Partial<RankCardBuilderProps["backgroundCrop"]>
  ) {
    this.options.set("backgroundCrop", pos);
    return this;
  }

  /**
   * Configures the texts for this rank card.
   * @param config The configuration for this rank card.
   */
  public setTextStyles(config: Partial<RankCardBuilderProps["texts"]>) {
    this.options.merge("texts", config);
    return this;
  }

  /**
   * Sets the progress calculator for this rank card. The value returned by this calculator defines the width of the progress bar.
   * Valid range is 0-100. Returning a number less than 0 or greater than 100 will be clamped within this range, or invalid values will result in 0% width.
   * @param calc The progress calculator for this rank card.
   */
  public setProgressCalculator(calc: RankCardProps["calculateProgress"]) {
    this.options.set("calculateProgress", calc);
    return this;
  }

  /**
   * Renders this rank card into the canvas.
   */
  public async render() {
    const options = this.options.getOptions();

    if (!options.avatar) throw new Error("Avatar is required.");
    if (!FontFactory.size) throw new Error("No fonts are loaded.");

    const avatar = await loadImage(options.avatar);

    let background;
    if (options.background) {
      background = await loadImage(options.background).then(
        async (e) => {
          if (options.backgroundCrop) {
            const x = options.backgroundCrop.x ?? 0;
            const y = options.backgroundCrop.y ?? 0;
            const width = options.backgroundCrop.width ?? this.width;
            const height = options.backgroundCrop.height ?? this.height;

            const buffer = await new Transformer(e.data)
              .crop(x, y, width, height)
              .png();

            e.data = buffer;
          }

          return `url(${e.toDataURL()})`;
        },
        () => options.background as string
      );
    }

    const firstFont = getDefaultFont();

    if (firstFont) {
      options.fonts.username ??= {
        name: firstFont.name,
        handle: firstFont.name,
      };
      options.fonts.progress ??= {
        level: {
          text: firstFont.name,
          value: firstFont.name,
        },
        xp: {
          text: firstFont.name,
          value: firstFont.name,
        },
        rank: {
          text: firstFont.name,
          value: firstFont.name,
        },
      };
    }

    return (
      <NeoClassicalCard
        {...{
          ...options,
          avatar: avatar.toDataURL(),
          backgroundColor: background!,
        }}
      />
    );
  }
}

import { FontFactory } from "../assets";
import { CSSPropertiesLike, ImageSource, JSX, loadImage, StyleSheet } from "../helpers";
import { fixed, getDefaultFont } from "../helpers/utils";
import { Builder } from "../templates/Builder";

/**
 * The user status type.
 */
type StatusType = "online" | "idle" | "dnd" | "invisible";

/**
 * The rank card builder props.
 */
interface RankCardBuilderProps {
  /**
   * The avatar for this rank card.
   */
  avatar: ImageSource | null;
  /**
   * The style for this rank card.
   */
  style: CSSPropertiesLike | null;
  /**
   * The fonts to be used for this rank card.
   */
  fonts: Partial<{
    /**
     * The username font.
     */
    username: string;
    /**
     * The progress font.
     */
    progress: string;
    /**
     * The stats font.
     */
    stats: string;
  }>;
  /**
   * The status for this rank card.
   */
  status: StatusType;
  /**
   * The current xp for this rank card.
   */
  currentXP: number;
  /**
   * The required xp for this rank card.
   */
  requiredXP: number;
  /**
   * The username for this rank card.
   */
  username: string;
  /**
   * The display name for this rank card.
   */
  displayName: string;
  /**
   * The discriminator for this rank card.
   */
  discriminator: string;
  /**
   * The level of this rank card.
   */
  level: number;
  /**
   * The rank of this rank card.
   */
  rank: number;
  /**
   * The background for this rank card.
   */
  background: ImageSource;
  /**
   * The styles for each element of this rank card.
   */
  tw: {
    /**
     * The username style.
     */
    username: string;
    /**
     * The discriminator style.
     */
    discriminator: string;
    /**
     * The display name style.
     */
    displayName: string;
    /**
     * The level style.
     */
    level: string;
    /**
     * The rank style.
     */
    rank: string;
    /**
     * The xp style.
     */
    xp: string;
    /**
     * The progressbar style.
     */
    progress: {
      /**
       * The progressbar track style.
       */
      track: string;
      /**
       * The progressbar thumb style.
       */
      thumb: string;
    };
    /**
     * The overlay style.
     */
    overlay: string;
    /**
     * The percentage style.
     */
    percentage: string;
    /**
     * The avatar style.
     */
    avatar: string;
    /**
     * The status style.
     */
    status: string;
  };
  /**
   * The renderer configuration for this rank card.
   */
  renders: {
    /**
     * Whether to render the avatar.
     */
    avatar: boolean;
    /**
     * Whether to render the background.
     */
    background: boolean;
    /**
     * Whether to render the level.
     */
    level: boolean;
    /**
     * Whether to render the rank.
     */
    rank: boolean;
    /**
     * Whether to render the status.
     */
    status: boolean;
    /**
     * Whether to render the username.
     */
    username: boolean;
    /**
     * Whether to render the display name.
     */
    displayName: boolean;
    /**
     * Whether to render the discriminator.
     */
    discriminator: boolean;
    /**
     * Whether to render the progress.
     */
    progress: boolean;
    /**
     * Whether to render the xp.
     */
    xp: boolean;
    /**
     * Whether to render the progressbar.
     */
    progressbar: boolean;
    /**
     * The constants for this rank card.
     */
    constants: {
      /**
       * The rank constant.
       */
      rank: string;
      /**
       * The level constant.
       */
      level: string;
      /**
       * The xp constant.
       */
      xp: string;
      /**
       * The status colors constant.
       */
      statusColors: {
        /**
         * The light gray color.
         */
        LightGray: string;
        /**
         * The gray color.
         */
        Gray: string;
        /**
         * The dark gray color.
         */
        DarkGray: string;
        /**
         * The white color.
         */
        White: string;
        /**
         * The green color.
         */
        Green: string;
        /**
         * The yellow color.
         */
        Yellow: string;
        /**
         * The red color.
         */
        Red: string;
        /**
         * The blue color.
         */
        Blue: string;
      };
    };
  };
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
    super(2000, 512);

    this.bootstrap({
      avatar: null,
      style: null,
      tw: {
        username: "",
        discriminator: "",
        displayName: "",
        level: "",
        rank: "",
        xp: "",
        progress: {
          track: "",
          thumb: "",
        },
        overlay: "",
        percentage: "",
        avatar: "",
        status: "",
      },
      level: 0,
      rank: 0,
      username: "",
      displayName: "",
      discriminator: "",
      currentXP: 0,
      requiredXP: 0,
      status: "invisible",
      background: "",
      fonts: {},
      renders: {
        constants: {
          rank: "RANK",
          level: "LEVEL",
          xp: "XP",
          statusColors: {
            LightGray: "#A0A1A3",
            Gray: "#474B4E",
            DarkGray: "#272A2D",
            White: "#FFFFFF",
            Green: "#22A559",
            Yellow: "#F0B332",
            Red: "#F24043",
            Blue: "#8ACDFF",
          },
        },
        avatar: true,
        background: true,
        level: true,
        rank: true,
        status: true,
        username: true,
        discriminator: true,
        progress: true,
        xp: true,
        progressbar: true,
        displayName: true,
      },
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
  public setStatus(status: StatusType) {
    this.options.set("status", status);
    return this;
  }

  /**
   * Sets the username for this rank card.
   * @param name The username for this rank card.
   */
  public setUsername(name: string) {
    this.options.set("username", name);
    return this;
  }

  /**
   * Sets the display name for this rank card.
   * @param name The display name for this rank card.
   */
  public setDisplayName(name: string) {
    this.options.set("displayName", name);
    return this;
  }

  /**
   * Sets the discriminator for this rank card.
   * @param discriminator The discriminator for this rank card.
   */
  public setDiscriminator(discriminator: string) {
    this.options.set("discriminator", discriminator);
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
  public configureRenderer(config: Partial<RankCardBuilderProps["renders"]>) {
    this.options.merge("renders", config);
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
      background = await loadImage(options.background);
    }

    const firstFont = getDefaultFont();

    if (firstFont) {
      options.fonts.username ??= firstFont.name;
      options.fonts.progress ??= firstFont.name;
      options.fonts.stats ??= firstFont.name;
    }

    const { currentXP: xp, requiredXP, status, level, rank } = options;
    const username = options.username || options.discriminator;
    const displayName = options.displayName || options.username;

    const percentage = ((xp / requiredXP) * 100).toFixed(0);
    const config = options.renders;
    const tws = options.tw;
    const colors = config.constants.statusColors;

    const statusColor =
      status === "online"
        ? colors.Green
        : status === "idle"
          ? colors.Yellow
          : status === "dnd"
            ? colors.Red
            : colors.Gray;

    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "1.5rem",
          background: background ? `url(${background.toDataURL()})` : options.style?.root?.backgroundColor ?? "#4FBEFA",
        }}
      >
        <div
          className={StyleSheet.cn(
            "flex bg-[#2F3136]/80 h-[80%] w-[95%] items-center justify-around rounded-3xl",
            tws.overlay,
          )}
        >
          <div className="flex relative">
            {config.avatar ? (
              <>
                <img
                  src={avatar.toDataURL()}
                  alt="avatar"
                  className={StyleSheet.cn(
                    `h-[311px] w-[311px] rounded-full mr-8 ${config.status ? "border-[#272A2D]/80" : ""} border-8`,
                    tws.avatar,
                  )}
                />
                {config.status ? (
                  <div
                    className={StyleSheet.cn(
                      `bg-[${statusColor}] h-16 w-16 rounded-full flex absolute bottom-12 right-5 border-[#272A2D]/80 border-8`,
                      tws.status,
                    )}
                  ></div>
                ) : null}
              </>
            ) : null}
          </div>
          <div className="flex flex-col">
            <div className="flex items-end justify-between">
              <div className="flex flex-col">
                {config.displayName && (
                  <h1 className={StyleSheet.cn(`${username ? "-mb-2" : ""} text-white text-6xl mr-5`, tws.displayName)}>
                    {displayName}
                  </h1>
                )}
                {username && (
                  <h1
                    className={StyleSheet.cn(
                      !config.displayName ? "text-white text-6xl" : "text-[#A7A7A7] text-4xl mb-7",
                      tws.username,
                    )}
                  >
                    @{username}
                  </h1>
                )}
              </div>
              {config.progress && (
                <h1 className={StyleSheet.cn("text-[#A7A7A7] text-4xl", tws.percentage)}>{percentage}%</h1>
              )}
            </div>
            {config.progressbar && (
              <div
                className={StyleSheet.cn("flex bg-[#292929]/70 h-[50px] w-[1413px] rounded-full", tws.progress.track)}
              >
                <div
                  className={StyleSheet.cn(
                    `flex bg-[#5865F2] h-[50px] w-[${percentage}%] rounded-full`,
                    tws.progress.thumb,
                  )}
                ></div>
              </div>
            )}
            <div className="flex justify-between w-[55%] font-bold">
              {config.level && (
                <h1 className={StyleSheet.cn("text-4xl", tws.level)}>
                  <span className="text-[#A7A7A7] mr-2">{config.constants.level}:</span>
                  <span className="text-white">{level}</span>
                </h1>
              )}
              {config.xp && (
                <h1 className={StyleSheet.cn("text-4xl", tws.xp)}>
                  <span className="text-[#A7A7A7] mr-2">{config.constants.xp}:</span>
                  <span className="text-white">
                    {fixed(xp)}/{fixed(requiredXP)}
                  </span>
                </h1>
              )}
              {config.rank && (
                <h1 className={StyleSheet.cn("text-4xl", tws.rank)}>
                  <span className="text-[#A7A7A7] mr-2">{config.constants.rank}:</span>
                  <span className="text-white">#{rank}</span>
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

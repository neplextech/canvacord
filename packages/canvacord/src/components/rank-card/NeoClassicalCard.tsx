import { JSX, Stylable, StyleSheet } from "../..";
import { fixed } from "../../helpers/utils";

export enum RankCardUserStatus {
  Online = "online",
  Idle = "idle",
  DoNotDisturb = "dnd",
  Offline = "offline",
  Streaming = "streaming",
  None = "none",
}

export type StatusData =
  | "online"
  | "idle"
  | "dnd"
  | "offline"
  | "streaming"
  | "none";

export interface RankCardProps {
  handle: string | null;
  username: string | null;
  avatar: string;
  status: RankCardUserStatus | StatusData | null;
  currentXP: number | null;
  requiredXP: number | null;
  rank: number | null;
  level: number | null;
  backgroundColor: string;
  overlay: boolean | number | string;
  abbreviate: boolean;
  texts: Partial<{
    level: string;
    xp: string;
    rank: string;
  }>;
  styles: Partial<{
    container: Stylable;
    background: Stylable;
    overlay: Stylable;
    avatar: Partial<{
      container: Stylable;
      image: Stylable;
      status: Stylable;
    }>;
    username: Partial<{
      container: Stylable;
      name: Stylable;
      handle: Stylable;
    }>;
    progressbar: Partial<{
      container: Stylable;
      thumb: Stylable;
      track: Stylable;
    }>;
    statistics: Partial<{
      container: Stylable;
      level: Partial<{
        container: Stylable;
        text: Stylable;
        value: Stylable;
      }>;
      xp: Partial<{
        container: Stylable;
        text: Stylable;
        value: Stylable;
      }>;
      rank: Partial<{
        container: Stylable;
        text: Stylable;
        value: Stylable;
      }>;
    }>;
  }>;
}

const Colors = {
  online: "#43b581",
  idle: "#faa61a",
  dnd: "#f04747",
  offline: "#747f8d",
  streaming: "#593695",
};

export function NeoClassicalCard(props: RankCardProps) {
  const {
    rank,
    level,
    currentXP,
    requiredXP,
    abbreviate,
    username,
    handle,
    avatar,
    status,
    styles,
    texts,
    backgroundColor,
    overlay,
  } = props;

  const shouldSkipStats = currentXP == null && requiredXP == null;
  const progressWidth = ((currentXP ?? 0) / (requiredXP ?? 0)) * 100;

  return (
    <div
      className={StyleSheet.cn(
        backgroundColor && !backgroundColor.startsWith("url(")
          ? `bg-[${backgroundColor}]`
          : "bg-[#23272a]",
        "flex flex-col h-full rounded-md w-full p-6",
        StyleSheet.tw(styles.background)
      )}
      style={StyleSheet.compose(
        {
          backgroundImage:
            backgroundColor && backgroundColor.startsWith("url(")
              ? backgroundColor
              : undefined,
          backgroundSize:
            backgroundColor && backgroundColor.startsWith("url(")
              ? "100% 100%"
              : undefined,
        },
        StyleSheet.css(styles.background)
      )}
    >
      <div
        className={StyleSheet.cn(
          overlay
            ? `bg-[${typeof overlay === "string" ? overlay : "#2b2f35"}]/${
                typeof overlay === "number" ? overlay : "90"
              }`
            : null,
          "flex items-center rounded-lg h-full w-full px-4",
          StyleSheet.tw(styles.overlay)
        )}
        style={StyleSheet.css(styles.overlay)}
      >
        <div
          className={StyleSheet.cn(
            "flex relative",
            StyleSheet.tw(styles.avatar?.container)
          )}
          style={StyleSheet.css(styles.avatar?.container)}
        >
          <img
            src={avatar}
            className={StyleSheet.cn(
              "h-38 w-38 rounded-full ml-4",
              StyleSheet.tw(styles.avatar?.image)
            )}
            style={StyleSheet.css(styles.avatar?.image)}
          />
          {status && status !== RankCardUserStatus.None ? (
            <div
              className={StyleSheet.cn(
                "absolute h-8 w-8 rounded-full bottom-5 right-0 flex",
                `bg-[${Colors[status]}]`,
                StyleSheet.tw(styles.avatar?.status)
              )}
              style={StyleSheet.css(styles.avatar?.status)}
            />
          ) : null}
        </div>
        <div
          className={StyleSheet.cn(
            "flex flex-col ml-8",
            StyleSheet.tw(styles.container)
          )}
          style={StyleSheet.css(styles.container)}
        >
          <div
            className={StyleSheet.cn(
              "flex flex-col",
              StyleSheet.tw(styles.username?.container)
            )}
            style={StyleSheet.css(styles.username?.container)}
          >
            {username && (
              <h1
                className={StyleSheet.cn(
                  "text-white font-semibold text-3xl mb-0",
                  StyleSheet.tw(styles.username?.name)
                )}
                style={StyleSheet.css(styles.username?.name)}
              >
                {username}
              </h1>
            )}
            {handle && (
              <p
                className={StyleSheet.cn(
                  "text-[#808386] font-semibold text-lg mt-0",
                  StyleSheet.tw(styles.username?.handle)
                )}
                style={StyleSheet.css(styles.username?.handle)}
              >
                @{handle}
              </p>
            )}
          </div>
          <div
            className={StyleSheet.cn(
              "flex relative",
              StyleSheet.tw(styles.progressbar?.container)
            )}
            style={StyleSheet.css(styles.progressbar?.container)}
          >
            <div
              className={StyleSheet.cn(
                "bg-[#484b4e] w-160 h-6 rounded-xl flex",
                StyleSheet.tw(styles.progressbar?.track)
              )}
              style={StyleSheet.css(styles.progressbar?.track)}
            />
            <div
              className={StyleSheet.cn(
                "bg-[#fff] max-w-160 h-6 rounded-xl absolute flex",
                `w-[${progressWidth}%]`,
                StyleSheet.tw(styles.progressbar?.thumb)
              )}
              style={StyleSheet.css(styles.progressbar?.thumb)}
            />
          </div>
          <div
            className={StyleSheet.cn(
              "flex",
              StyleSheet.tw(styles.statistics?.container)
            )}
            style={StyleSheet.css(styles.statistics?.container)}
          >
            {level != null && (
              <div
                className={StyleSheet.cn(
                  "flex items-center text-[#808386] font-medium",
                  StyleSheet.tw(styles.statistics?.level?.container)
                )}
                style={StyleSheet.css(styles.statistics?.level?.container)}
              >
                <h3
                  className={StyleSheet.tw(styles.statistics?.level?.text)}
                  style={StyleSheet.css(styles.statistics?.level?.text)}
                >
                  {texts.level || "LEVEL:"}
                  <span
                    className={StyleSheet.cn(
                      "text-white ml-1",
                      StyleSheet.tw(styles.statistics?.level?.value)
                    )}
                    style={StyleSheet.css(styles.statistics?.level?.value)}
                  >
                    {fixed(level, abbreviate)}
                  </span>
                </h3>
              </div>
            )}
            {!shouldSkipStats && (
              <div
                className={StyleSheet.cn(
                  "flex items-center text-[#808386] font-medium ml-8",
                  StyleSheet.tw(styles.statistics?.xp?.container)
                )}
                style={StyleSheet.css(styles.statistics?.xp?.container)}
              >
                <h3
                  className={StyleSheet.tw(styles.statistics?.xp?.text)}
                  style={StyleSheet.css(styles.statistics?.xp?.text)}
                >
                  {texts.xp || "XP:"}
                  <span
                    className={StyleSheet.cn(
                      "text-white ml-1",
                      StyleSheet.tw(styles.statistics?.xp?.value)
                    )}
                    style={StyleSheet.css(styles.statistics?.xp?.value)}
                  >
                    {fixed(currentXP ?? 0, abbreviate)}/
                    {fixed(requiredXP ?? 0, abbreviate)}
                  </span>
                </h3>
              </div>
            )}
            {rank != null && (
              <div
                className={StyleSheet.cn(
                  "flex items-center text-[#808386] font-medium ml-8",
                  StyleSheet.tw(styles.statistics?.rank?.container)
                )}
                style={StyleSheet.css(styles.statistics?.rank?.container)}
              >
                <h3
                  className={StyleSheet.tw(styles.statistics?.rank?.text)}
                  style={StyleSheet.css(styles.statistics?.rank?.text)}
                >
                  {texts.rank || "RANK:"}
                  <span
                    className={StyleSheet.cn(
                      "text-white ml-1",
                      StyleSheet.tw(styles.statistics?.rank?.value)
                    )}
                    style={StyleSheet.css(styles.statistics?.rank?.value)}
                  >
                    #{fixed(rank, abbreviate)}
                  </span>
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

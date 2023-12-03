import { JSX, StyleSheet } from "../..";
import { fixed } from "../../helpers/utils";

export enum RankCardUserStatus {
  Online = "ONLINE",
  Idle = "IDLE",
  DoNotDisturb = "DND",
  Offline = "OFFLINE",
  Streaming = "STREAMING",
  None = "NONE",
}

export interface RankCardProps {
  handle: string | null;
  username: string | null;
  avatar: string;
  status: RankCardUserStatus | null;
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
    container: string;
    background: string;
    overlay: string;
    avatar: Partial<{
      container: string;
      image: string;
      status: string;
    }>;
    username: Partial<{
      container: string;
      name: string;
      handle: string;
    }>;
    progressbar: Partial<{
      container: string;
      thumb: string;
      track: string;
    }>;
    statistics: Partial<{
      container: string;
      level: Partial<{
        container: string;
        text: string;
        value: string;
      }>;
      xp: Partial<{
        container: string;
        text: string;
        value: string;
      }>;
      rank: Partial<{
        container: string;
        text: string;
        value: string;
      }>;
    }>;
  }>;
}

const Colors = {
  ONLINE: "#43b581",
  IDLE: "#faa61a",
  DND: "#f04747",
  OFFLINE: "#747f8d",
  STREAMING: "#593695",
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
        styles.background
      )}
      style={{
        backgroundImage:
          backgroundColor && backgroundColor.startsWith("url(")
            ? backgroundColor
            : undefined,
      }}
    >
      <div
        className={StyleSheet.cn(
          overlay
            ? `bg-[${typeof overlay === "string" ? overlay : "#2b2f35"}]/${
                typeof overlay === "number" ? overlay : "80"
              }`
            : null,
          "flex items-center rounded-lg h-full w-full px-4",
          styles.overlay
        )}
      >
        <div
          className={StyleSheet.cn("flex relative", styles.avatar?.container)}
        >
          <img
            src={avatar}
            className={StyleSheet.cn(
              "h-38 w-38 rounded-full ml-4",
              styles.avatar?.image
            )}
          />
          {status && status !== RankCardUserStatus.None ? (
            <div
              className={StyleSheet.cn(
                "absolute h-8 w-8 rounded-full bottom-5 right-0 flex",
                `bg-[${Colors[status]}]`,
                styles.avatar?.status
              )}
            />
          ) : null}
        </div>
        <div className={StyleSheet.cn("flex flex-col ml-8", styles.container)}>
          <div
            className={StyleSheet.cn(
              "flex flex-col",
              styles.username?.container
            )}
          >
            {username && (
              <h1
                className={StyleSheet.cn(
                  "text-white font-semibold text-3xl mb-0",
                  styles.username?.name
                )}
              >
                {username}
              </h1>
            )}
            {handle && (
              <p
                className={StyleSheet.cn(
                  "text-[#808386] font-semibold text-lg mt-0",
                  styles.username?.handle
                )}
              >
                @{handle}
              </p>
            )}
          </div>
          <div
            className={StyleSheet.cn(
              "flex relative",
              styles.progressbar?.container
            )}
          >
            <div
              className={StyleSheet.cn(
                "bg-[#484b4e] w-160 h-6 rounded-xl flex",
                styles.progressbar?.track
              )}
            />
            <div
              className={StyleSheet.cn(
                "bg-[#fff] max-w-160 h-6 rounded-xl absolute flex",
                `w-[${progressWidth}%]`,
                styles.progressbar?.thumb
              )}
            />
          </div>
          <div className={StyleSheet.cn("flex", styles.statistics?.container)}>
            {level != null && (
              <div
                className={StyleSheet.cn(
                  "flex items-center text-[#808386] font-medium",
                  styles.statistics?.level?.container
                )}
              >
                <h3 className={styles.statistics?.level?.text}>
                  {texts.level || "LEVEL:"}
                  <span
                    className={StyleSheet.cn(
                      "text-white ml-1",
                      styles.statistics?.level?.value
                    )}
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
                  styles.statistics?.xp?.container
                )}
              >
                <h3 className={styles.statistics?.xp?.text}>
                  {texts.xp || "XP:"}
                  <span
                    className={StyleSheet.cn(
                      "text-white ml-1",
                      styles.statistics?.xp?.value
                    )}
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
                  styles.statistics?.rank?.container
                )}
              >
                <h3 className={styles.statistics?.rank?.text}>
                  {texts.rank || "RANK:"}
                  <span
                    className={StyleSheet.cn(
                      "text-white ml-1",
                      styles.statistics?.rank?.value
                    )}
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

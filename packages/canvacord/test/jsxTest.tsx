import { JSX, Builder, StyleSheet, loadImage } from "../src/index";
import { writeFileSync } from "fs";
import { manropeBold } from "./common";
import path from "path";

const colors = {
  LightGray: "#A0A1A3",
  Gray: "#474B4E",
  DarkGray: "#272A2D",
  White: "#FFFFFF",
  Green: "#22A559",
  Yellow: "#F0B332",
  Red: "#F24043",
  Blue: "#8ACDFF",
} as const;

function RankCard({
  avatar,
  level,
  xp,
  requiredXP,
  rank,
  displayName,
  username,
  status,
  hidePercentage,
}: {
  avatar: string;
  level: number;
  xp: number;
  requiredXP: number;
  rank: number;
  displayName?: string;
  username?: string;
  status: "online" | "idle" | "dnd" | "invisible";
  hidePercentage?: boolean;
}) {
  if (!displayName && !username) {
    throw new Error(
      "A displayName or username is required when instantiating RankCard."
    );
  }

  const fixed = (v: number) => {
    const formatter = new Intl.NumberFormat("en-US", { notation: "compact" });
    return formatter.format(v);
  };

  const percentage = Math.floor((xp / requiredXP) * 100);

  if (displayName && displayName.length > 30) {
    displayName = displayName.substring(0, 30) + "...";
  }

  if (username && username.length > 30) {
    username = username.substring(0, 30) + "...";
  }

  const statusColor =
    status === "online"
      ? colors.Green
      : status === "idle"
      ? colors.Yellow
      : status === "dnd"
      ? colors.Red
      : colors.Gray;

  return (
    <div className="flex bg-[#2F3136]/80 h-[80%] w-[95%] items-center justify-around rounded-3xl">
      <div className="flex relative">
        <img
          src={avatar}
          alt="avatar"
          className={`h-[311px] w-[311px] rounded-full mr-8 border-[#272A2D]/80 border-8`}
        />
        <div
          className={`bg-[${statusColor}] h-20 w-20 rounded-full flex absolute bottom-3 right-7 border-[#272A2D]/80 border-8`}
        ></div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {displayName && (
              <h1
                className={`${
                  username ? "-mb-2" : ""
                } text-white text-6xl mr-5`}
              >
                {displayName}
              </h1>
            )}
            {username && (
              <h1
                className={
                  !displayName
                    ? "text-white text-6xl"
                    : "text-[#A7A7A7] text-4xl mb-7"
                }
              >
                @{username}
              </h1>
            )}
          </div>

          {!hidePercentage && (
            <h1 className="text-[#A7A7A7] text-6xl">{percentage}%</h1>
          )}
        </div>
        <div className="flex bg-[#292929]/70 h-[50px] w-[1413px] rounded-full">
          <div
            className={`flex bg-[#5865F2] h-[50px] w-[${percentage}%] rounded-full`}
          ></div>
        </div>

        <div className="flex justify-between w-[55%] font-bold">
          <h1 className="text-[45px] mr-16">
            <span className="text-[#A7A7A7] mr-2">LEVEL:</span>
            <span className="text-white">{level}</span>
          </h1>

          <h1 className="text-[45px] mr-16">
            <span className="text-[#A7A7A7] mr-2">XP:</span>
            <span className="text-white">
              {fixed(xp)}/{fixed(requiredXP)}
            </span>
          </h1>

          <h1 className="text-[45px]">
            <span className="text-[#A7A7A7] mr-2">RANK:</span>
            <span className="text-white">#{rank}</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

async function main() {
  const bg = await loadImage(path.join(__dirname, "background.jpg"));

  const styles = StyleSheet.create({
    root: {
      fontFamily: manropeBold.name,
      display: "flex",
      backgroundImage: `url("${bg.toDataURL()}")`,
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "1.5rem",
    },
  });

  const builder = new Builder(2000, 512);

  builder.style = styles.root;

  builder
    .addComponent(
      <RankCard
        {...{
          avatar:
            "https://cdn.discordapp.com/avatars/916316955772862475/1c03b69ec36f2fda15a0131cdbd70018.png?size=2048",
          level: 54,
          xp: 2548,
          requiredXP: 3796,
          rank: 32,
          displayName: "Lost Ctrl",
          username: "thearchaeopteryx",
          status: "online",
          // hidePercentage: true
        }}
      />
    )
    .setStyle(styles.root);

  const pngBuildStart = performance.now();
  builder
    .build({
      debug: false,
    })
    .then((data) => {
      const pngBuildEnd = performance.now();
      console.log(
        `PNG Build Time: ${(pngBuildEnd - pngBuildStart).toFixed(2)}ms`
      );
      writeFileSync(`${__dirname}/jsx/test2.png`, data);
    });

  const svgBuildStart = performance.now();
  builder
    .build({
      format: "svg",
    })
    .then((data) => {
      const svgBuildEnd = performance.now();
      console.log(
        `SVG Build Time: ${(svgBuildEnd - svgBuildStart).toFixed(2)}ms`
      );
      writeFileSync(`${__dirname}/jsx/test2.svg`, data);
    });
}

main();

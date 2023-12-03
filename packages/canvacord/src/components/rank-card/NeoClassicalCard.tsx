// TODO

import { JSX } from "../..";
import { fixed } from "../../helpers/utils";

export interface RankCardProps {
  handle: string | null;
  avatar: string;
  currentXP: number | null;
  requiredXP: number | null;
  rank: number | null;
  level: number | null;
  backgroundColor: string;
  overlay: boolean | number;
  abbreviate: boolean;
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
    dataContainer: string;
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

export function NeoClassicalCard(props: RankCardProps) {
  const { rank, level, currentXP, requiredXP, abbreviate } = props;

  const shouldSkipStats = currentXP == null && requiredXP == null;

  return (
    <div className="flex flex-col bg-[#23272a] h-full rounded-md w-full p-6">
      <div className="bg-[#2b2f35]/80 flex items-center gap-6 rounded-lg h-full w-full px-4">
        <div className="flex relative">
          <img src="https://cdn.discordapp.com/embed/avatars/0.png" className="h-38 w-38 rounded-full" />
          <div className="absolute h-8 w-8 rounded-full bg-green-500 bottom-5 right-0" />
        </div>
        <div className="flex flex-col ml-12">
          <div className="flex flex-col">
            <h1 className="text-white font-semibold text-3xl mb-0">Lost Ctrl</h1>
            <p className="text-[#8a8d92] font-semibold text-lg mt-0">@twlite</p>
          </div>
          <div className="flex relative">
            <div className="bg-[#484b4e] w-160 h-6 rounded-xl" />
            <div className="bg-[#fff] w-50 h-6 rounded-xl absolute" />
          </div>
          <div className="flex">
            <div className="flex items-center text-[#7d8189] font-medium">
              <h3>
                LEVEL:<span className="text-white ml-1">54</span>
              </h3>
            </div>
            {!shouldSkipStats && (
              <div className="flex items-center text-[#7d8189] font-medium ml-8">
                <h3>
                  XP:
                  <span className="text-white ml-1">
                    {fixed(currentXP ?? 0, abbreviate)}/{fixed(requiredXP ?? 0, abbreviate)}
                  </span>
                </h3>
              </div>
            )}
            <div className="flex items-center text-[#7d8189] font-medium ml-8">
              <h3>
                RANK:<span className="text-white ml-1">#{rank}</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

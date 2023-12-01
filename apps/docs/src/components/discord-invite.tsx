import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

function Icon() {
  return (
    <Avatar className="flex justify-center items-center h-14 w-14 rounded-xl">
      <AvatarImage
        src="https://github.com/neplextech.png"
        alt="neplex"
        className="rounded-none h-14 w-14"
      />
      <AvatarFallback className="text-[#dadde1] bg-[#313338] font-light text-xl rounded-none h-14 w-14">
        N
      </AvatarFallback>
    </Avatar>
  );
}

function StatusIndicator({ online = false }: { online?: boolean }) {
  return (
    <svg
      className={cn(
        online ? "fill-[#23a559]" : "fill-[#b5bac1] dark:fill-[#4e5058]",
        "h-[0.6rem] w-[0.6rem]"
      )}
      strokeWidth="0"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M256 23.05C127.5 23.05 23.05 127.5 23.05 256S127.5 488.9 256 488.9 488.9 384.5 488.9 256 384.5 23.05 256 23.05z"></path>
    </svg>
  );
}

export default function DiscordInvite() {
  return (
    <div className="bg-[#f2f3f5] dark:bg-[#2b2d31] p-4 rounded-sm select-none cursor-default space-y-2">
      <p className="text-[#4e5058] dark:text-[#b5bac1] uppercase text-xs font-semibold">
        Join our official support server
      </p>
      <div className="flex justify-between items-center gap-16">
        <div className="flex items-center gap-4">
          <Icon />
          <div>
            <Link
              href={"https://neplextech.com/discord"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h1 className="dark:text-white text-[#060607] font-normal hover:underline cursor-pointer">
                NeplexLabs
              </h1>
            </Link>
            <div className="flex items-center justify-between gap-3 text-xs">
              <p className="text-[#80848e]">
                <span className="inline-flex">
                  <StatusIndicator online />
                </span>{" "}
                123 Online
              </p>
              <p className="text-[#80848e]">
                <span className="inline-flex">
                  <StatusIndicator />
                </span>{" "}
                456 Members
              </p>
            </div>
          </div>
        </div>
        <Link
          href={"https://neplextech.com/discord"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="bg-[#248046] hover:bg-[#1a6334] text-[#e9ffec]">
            Join
          </Button>
        </Link>
      </div>
    </div>
  );
}

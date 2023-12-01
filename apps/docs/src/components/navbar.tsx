import Link from "next/link";
import React from "react";
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { ThemeSwitch } from "./theme-switch";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold">
          canvacord
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="cursor-pointer">
            Home
          </Link>
          <Link href="/docs" className="cursor-pointer">
            Docs
          </Link>
          <Link href="/examples" className="cursor-pointer">
            Examples
          </Link>
          <Link href="/support" className="cursor-pointer">
            Gallery
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/support">
            <Button
              variant="outline"
              size="icon"
              className="border-none shadow-none"
            >
              <GitHubLogoIcon className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/support">
            <Button
              variant="outline"
              size="icon"
              className="border-none shadow-none"
            >
              <DiscordLogoIcon className="h-5 w-5" />
            </Button>
          </Link>
          <ThemeSwitch />
        </div>
      </nav>
    </header>
  );
}

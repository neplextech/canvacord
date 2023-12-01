import DiscordInvite from "@/components/discord-invite";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Features } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { JetBrains_Mono, Orbitron } from "next/font/google";
import Link from "next/link";

const orbitron = Orbitron({ subsets: ["latin"] });
const jbMono = JetBrains_Mono({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="min-h-[80vh] grid place-items-center">
      <div className="mt-5 flex items-center justify-center flex-col min-h-[75vh]">
        <div className="text-center flex flex-col items-center md:max-w-[90%] lg:max-w-[70%] mt-16 space-y-10">
          <h1
            className={cn(
              "lg:text-8xl md:text-7xl text-6xl uppercase select-none font-extrabold",
              orbitron.className
            )}
          >
            canvacord
          </h1>
          <h5 className="mt-2 text-muted-foreground font-normal border-t-0 text-center">
            Canvacord allows you to easily generate custom images using React
            and tailwindcss-like syntax.
          </h5>
        </div>
        <div className="mt-5">
          <Link
            href={"https://canvacord-v5.neplextech.com"}
            className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
          >
            📖 <Separator orientation="vertical" /> Looking for v5 docs?{" "}
            <span className="font-bold ml-1">Click here</span>{" "}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <div className="flex items-center gap-4 mt-6 px-4 flex-col md:flex-row w-full md:w-auto">
          <Link href="/docs" className="w-full md:w-auto">
            <Button size="lg" className="w-full md:w-auto">
              Get Started
            </Button>
          </Link>
          <Link
            href="https://github.com/neplextech/canvacord"
            target="_blank"
            rel="noreferrer noopener"
            className="w-full md:w-auto"
          >
            <Button
              variant="outline"
              className="gap-1 w-full  md:w-auto"
              size="lg"
            >
              <GitHubLogoIcon className="h-5 w-5" />
              GitHub
            </Button>
          </Link>
        </div>
        <div className="mt-5">
          <Label className={cn(jbMono.className, "text-muted-foreground")}>
            <span className="select-none">$</span> npm i --save canvacord
          </Label>
        </div>

        <div className="mt-5">
          <DiscordInvite />
        </div>
      </div>
      <section className="container mb-16">
        <h2 className="text-2xl font-bold mb-2">Why choose canvacord?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-8">
          {Features.map((feature) => (
            <Card className="bg-transparent" key={feature.title}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
      <section></section>
    </main>
  );
}

import { JetBrains_Mono, Inter, Orbitron } from "next/font/google";

interface IFeature {
  title: string;
  description: string;
}

interface ITools extends IFeature {
  link: string;
}

export const features: IFeature[] = [
  {
    title: "React-like Syntax for Image Creation",
    description:
      "Canvacord allows developers to create images using syntax inspired by React, providing a familiar and expressive way to design and customize graphics.",
  },
  {
    title: "Tailwind CSS-style Class Names",
    description:
      "Developers can style their generated images using class names inspired by Tailwind CSS, facilitating a straightforward and efficient approach to designing visuals with ease.",
  },
  {
    title: "Node.js Environment Compatibility",
    description:
      "Canvacord is designed to run in a Node.js environment, allowing developers to leverage its image generation capabilities on the server side for efficient and scalable processing.",
  },
  {
    title: "Canvas API Image Manipulation",
    description:
      "Canvacord supports image manipulation using the Canvas API, backed by @napi-rs/canvas. This enables developers to utilize the powerful features of the Canvas API for precise and sophisticated image editing.",
  },
  {
    title: "Developer-Friendly API",
    description:
      "Canvacord offers a developer-friendly API that simplifies the image generation process. With clear documentation and easy-to-understand methods, developers can quickly integrate Canvacord into their Node.js projects for efficient image creation.",
  },
  {
    title: "Extensive Font Support",
    description:
      "Canvacord provides extensive font support, allowing developers to enhance text elements in their generated images with a wide range of fonts, styles, and sizes.",
  },
];

export const tools: ITools[] = [
  {
    title: "satori",
    link: "https://github.com/vercel/satori",
    description: "Enlightened library to convert HTML and CSS to SVG",
  },
  {
    title: "@napi-rs/canvas",
    link: "https://github.com/Brooooooklyn/canvas",
    description:
      "High performance skia binding to Node.js. Zero system dependencies and pure npm packages without any postinstall scripts nor node-gyp.",
  },
  {
    title: "resvg-js",
    link: "https://github.com/yisibl/resvg-js",
    description:
      "A high-performance SVG renderer and toolkit, powered by Rust based resvg and napi-rs.",
  },
];

export const orbitron = Orbitron({
  subsets: ["latin"],
});

export const jbMono = JetBrains_Mono({
  subsets: ["latin"],
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const DISCORD_INVITE = "https://neplextech.com/discord";
export const DISCORD_ICON = "https://github.com/neplextech.png";

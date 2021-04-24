import { Brighten } from "./Brighten";

export const Darken: typeof Brighten = (img, amount) => Brighten(img, -amount);
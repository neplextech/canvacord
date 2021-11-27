import * as props from "./functions";

export default function CanvacordMiddleware() {
    return (pluginsManager: any) => {
        pluginsManager.register("@canvacord/plugin-sharp", { props });
    };
}

export * from "./functions";

import * as props from "./functions";

export default function SharpPlugin() {
    return (pluginsManager: any) => {
        pluginsManager.register("@canvacord/plugin-sharp", { props });
    };
}

export type SharpPluginProps = typeof props;
export * from "./functions";
export { SharpPlugin as plugin };
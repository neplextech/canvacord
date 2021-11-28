export type CanvacordPlugin = (ctx: CanvacordPluginContext) => void;

export interface CanvacordPluginContext {
    register(name: string, options: { props: Record<string, Function> }): void;
}

export interface CanvacordOptions {
    plugins?: CanvacordPlugin[];
    overlapPlugins?: boolean;
}

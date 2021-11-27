import { Canvacord } from "../index";
import { CanvacordPluginContext } from "../types";

export class PluginContext implements CanvacordPluginContext {

    constructor(public manager: CanvacordPluginManager) {}

    register(name: string, options: { props: Record<string, Function>; }): void {
        let methodNames = Object.keys(options.props);
        Object.entries(options.props).forEach(([k, m]) => 
            // @ts-ignore
            this.manager.core[k] = m
        );

        this.manager.addPlugin(name, methodNames)
    }

}

export class CanvacordPluginManager {
    context = new PluginContext(this);
    plugins = new Map<string, string[]>();
    
    constructor (public core: Canvacord) {}

    addPlugin(plugin: string | undefined | null, pluginMethods: string[]) {
        if (typeof plugin == "string" && !this.plugins.has(plugin)) this.plugins.set(plugin, pluginMethods);
        else throw new Error(`Plugin ${plugin} already exists or is undefined`);
    }

    getPluginMethods(plugin: string): string[] {
        // @ts-ignore
        if (this.plugins.has(plugin)) return this.plugins.get(plugin);
        else throw new Error(`Plugin ${plugin} does not exist`);
    }
}

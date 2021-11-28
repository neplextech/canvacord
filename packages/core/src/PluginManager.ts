import { Canvacord } from "../index";
import { CanvacordPluginContext } from "../types";

export class PluginContext implements CanvacordPluginContext {
    constructor(public manager: CanvacordPluginManager) {}

    register(name: string, options: { props: Record<string, Function> }): void {
        let methodNames = Object.keys(options.props);
        Object.entries(options.props).forEach(([k, m]) => {
            // @ts-ignore
            if (this.manager.core[k] && !this.manager.core.options.overlapPlugins) throw new Error(`Cannot overlap "${k}" from ${name} plugin over ${this.manager.findPluginByMethod(k)} plugin.\nFix: Set [overlapPlugins] to true in options.`);
            if (this.manager.coreProps.includes(k))  throw new Error(`Cannot apply "${k}" from ${name} plugin since [Canvacord.${k}] is a core property.`);

            // @ts-ignore
            this.manager.core[k] = m;
        });

        this.manager.addPlugin(name, methodNames);
    }
}

export class CanvacordPluginManager {
    context = new PluginContext(this);
    plugins = new Map<string, string[]>();
    coreProps = ['canvas', 'ctx', 'manager', 'options', ...Object.keys(Canvacord.prototype)];

    constructor(public core: Canvacord) {}

    addPlugin(plugin: string | undefined | null, pluginMethods: string[]) {
        if (typeof plugin == "string" && !this.plugins.has(plugin)) this.plugins.set(plugin, pluginMethods);
        else throw new Error(`Plugin ${plugin} already exists or is undefined`);
    }

    getPluginMethods(plugin: string): string[] {
        // @ts-ignore
        if (this.plugins.has(plugin)) return this.plugins.get(plugin);
        else throw new Error(`Plugin ${plugin} does not exist`);
    }

    findPluginByMethod(method: string): string {
        for (const [n, m] of this.plugins.entries()) if (m.includes(method)) return n;

        return "unknown";
    }
}

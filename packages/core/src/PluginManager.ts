import { getAllMethods } from "../utils/getMethods";
import CanvacordCore from "../index";

const CLASS_REGEX: RegExp = /^\s*class/;

export class CanvacordPluginManager {

    plugins = new Map<string, string[]>();

    addPlugin(plugin: string | undefined | null, pluginMethods: string[]) {
        if ((typeof plugin == "string") && !this.plugins.has(plugin)) this.plugins.set(plugin, pluginMethods);
        else throw new Error(`Plugin ${plugin} already exists or is undefined`);
    }

    getPluginMethods(plugin: string): string[] {
        // @ts-ignore
        if (this.plugins.has(plugin)) return this.plugins.get(plugin);
        else throw new Error(`Plugin ${plugin} does not exist`);
    }

    extratPluginMethods(plugin: any): string[] | undefined {
        let methods: string[] = [];
        
        if (CLASS_REGEX.test(plugin.toString())) {
            methods = getAllMethods(new plugin());
            let baseMethods = getAllMethods(CanvacordCore);
            methods = methods.filter((method) => !baseMethods.includes(method));
        }

        return methods;
    }

    addToBase(base: any, method: Function, methodName: string): void {
        if (method) base.prototype[methodName] = method;
    }

    addAllMethodsToBase(base: any, methods: Function[], methodNames: string[]): void {
        methodNames.forEach((method, _posx) => base.prototype[method] = methods[_posx]);
    }

}

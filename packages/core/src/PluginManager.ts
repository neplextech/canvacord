import { getAllMethods } from '../utils/getMethods';
import  CanvacordCore  from '../index';

export class CanvacordPluginManager {

      plugins: Map<string, Array<string>>;

    constructor() {

        this.plugins = new Map<string, Array<string>>();

    }

    addPlugin(plugin: string | undefined | null, pluginMethods: Array<string>) {

        if(typeof plugin == "string") {

        if (!this.plugins.has(plugin)) {

            this.plugins.set(plugin, pluginMethods);

        }
    }

        else {

            throw new Error(`Plugin ${plugin} already exists or is undefined`);
        }

    }

    getPluginMethods(plugin: string): Array<string> {
            
            if (this.plugins.has(plugin)) {
                
                //@ts-ignore
                return this.plugins.get(plugin);
    
            }
    
            else {
    
                throw new Error(`Plugin ${plugin} does not exist`);
            }
    
        }

        extratPluginMethods(plugin: any): Array<string> | undefined {

            let methods: Array<string> = [];

            const isClass = (fn: any) => /^\s*class/.test(fn.toString());

           if(isClass(plugin)) {

            methods = getAllMethods(new plugin());
            let baseMethods = getAllMethods(CanvacordCore);
            methods = methods.filter(method => !baseMethods.includes(method));

           }

           return methods;
}

        addToBase(base: any, method: Function, methodName: string): void {
            if(method) 
            base.prototype[methodName] = method;
        }


        addAllMethodsToBase(base: any, methods: Array<Function>, methodNames: Array<string>): void {

            methodNames.forEach((method, _posx) => {

                base.prototype[method] = methods[_posx]

            })
        }

}

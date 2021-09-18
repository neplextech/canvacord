/* eslint-disable @typescript-eslint/no-explicit-any */

type SingletonClass<T extends new (...args: any[]) => any> = T & {
    instance: T extends new (...args: any[]) => infer I ? I : never;
};

export default function Singleton<T extends new (...args: any[] | undefined) => any>(targetClass: T) {
    return new Proxy(targetClass, {
        construct: (target: SingletonClass<T>, argumentsList, newTarget) => {
            if (target.prototype !== newTarget.prototype) return Reflect.construct(target, argumentsList, newTarget);
            if (!target.instance) target.instance = new target(...argumentsList);
            return target.instance;
        }
    });
}

/* eslint-disable @typescript-eslint/no-explicit-any */

export const InstanceK = Symbol("instance");

type SingletonClass<T extends new (...args: any[]) => any> = T & {
    [InstanceK]: T extends new (...args: any[]) => infer I ? I : never;
};

export default function singleton() {
    return <T extends new (...args: any[] | undefined) => any>(targetClass: T) => {
        return new Proxy(targetClass, {
            construct: (target: SingletonClass<T>, argumentsList, newTarget) => {
                if (target.prototype !== newTarget.prototype) return Reflect.construct(target, argumentsList, newTarget);
                if (!target[InstanceK]) target[InstanceK] = new target(...argumentsList);
                return target[InstanceK];
            }
        });
    };
}

export { singleton };

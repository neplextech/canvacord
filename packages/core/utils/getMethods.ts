function hasMethod(obj: any, name: any) {
    const desc = Object.getOwnPropertyDescriptor(obj, name);
    return !!desc && typeof desc.value === "function";
}

export function getAllMethods(obj: any): string[] {
    let array = new Array<string>();
    let proto = Object.getPrototypeOf(obj);

    while (proto) {
        Object.getOwnPropertyNames(proto).forEach((name) => {
            if (name !== "constructor" && hasMethod(proto, name)) array.push(name);
        });

        proto = Object.getPrototypeOf(proto);
    }

    return array;
}

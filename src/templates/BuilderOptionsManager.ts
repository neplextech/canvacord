export class BuilderOptionsManager<T extends Record<string, any>> {
  constructor(private options: T = {} as T) {}

  public getOptions(): T {
    return this.options;
  }

  public setOptions(options: T): void {
    this.options = options;
  }

  public get<K extends keyof T>(key: K): T[K] {
    return this.options[key];
  }

  public set<K extends keyof T>(key: K, value: T[K]): void {
    this.options[key] = value;
  }

  public merge<K extends keyof T>(key: K, value: Partial<T[K]>): void {
    this.options[key] = { ...this.options[key], ...value };
  }
}

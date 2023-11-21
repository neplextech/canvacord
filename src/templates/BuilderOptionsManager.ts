export class BuilderOptionsManager<T extends Record<string, any>> {
  /**
   * Creates a new builder options manager.
   * @param options The options to use
   */
  constructor(private options: T = {} as T) {}

  /**
   * Returns the options.
   */
  public getOptions(): T {
    return this.options;
  }

  /**
   * Sets the options. This will override the previous options.
   * @param options The options to use
   */
  public setOptions(options: T): void {
    this.options = options;
  }

  /**
   * Get an option by name.
   * @param key The option name
   * @returns The option value
   */
  public get<K extends keyof T>(key: K): T[K] {
    return this.options[key];
  }

  /**
   * Set an option by name.
   * @param key The option name
   * @param value The option value
   */
  public set<K extends keyof T>(key: K, value: T[K]): void {
    this.options[key] = value;
  }

  /**
   * Merge new data to old data on an option by name.
   */
  public merge<K extends keyof T>(key: K, value: Partial<T[K]>): void {
    this.options[key] = { ...this.options[key], ...value };
  }
}

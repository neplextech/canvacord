import { Builder, ExecutionContext } from "../runtime";

/**
 * A hook that returns the options object of the builder component.
 */
export function useOptions<
  // biome-ignore lint: we do not know the type of the component
  T extends Record<string, any> = Record<string, unknown>
>() {
  const context = ExecutionContext.getStore();
  if (!context) {
    throw new Error(
      'The hook "useOptions" must be invoked inside a builder component.'
    );
  }

  const { options } = context as Builder<T>;

  return options;
}

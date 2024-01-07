import { Builder, ExecutionContext } from "../templates";

export function useBuilder<
  // biome-ignore lint: we do not know the type of the component
  T extends Record<string, any> = Record<string, unknown>,
  // biome-ignore lint: we do not know the type of the component
  S extends Record<string, any> = Record<string, unknown>
>() {
  const context = ExecutionContext.getStore();
  if (!context) {
    throw new Error(
      `The hook "useBuilder" must be invoked inside a builder component.`
    );
  }

  return context as Builder<T, S>;
}

import { ExecutionContext } from "../runtime";

// biome-ignore lint:
export type EffectCallback = () => void | (() => void);

/**
 * Hook to run a function when the component unmounts.
 * Dependencies are currently not supported and only one effect can be registered per builder as of now.
 * @param handler The function to run.
 */
// biome-ignore lint:
export function useEffect(handler: EffectCallback, dependencies?: any[]) {
  const context = ExecutionContext.getStore();
  if (!context) {
    throw new Error(
      'The hook "useEffect" must be invoked inside a builder component.'
    );
  }

  context.onMount(handler, Array.isArray(dependencies) && !dependencies.length);
}

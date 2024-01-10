import { AsyncLocalStorage } from "node:async_hooks";
import type { Node } from "../runtime";
import { initializeContext } from "./common";

type PropsWithChildren<P> = P & { children?: Node };

type InternalContext<T> = ContextProvider<T> & {
  [contextProviderId]: AsyncLocalStorage<T>;
};

export type ContextProvider<T> = (
  props: PropsWithChildren<{ value: T }>
) => JSX.Element;

interface Context<T> {
  Provider: ContextProvider<T>;
  // biome-ignore lint:
  Consumer: (props: PropsWithChildren<{}>) => JSX.Element;
}

const contextProviderId = Symbol("$$contextProvider");

/**
 * Hook to get the context value.
 */
export function useContext<T>(ctx: Context<T>): T | undefined {
  const context = (ctx.Provider as InternalContext<T>)[contextProviderId];

  if (!context) {
    throw new TypeError(
      'Invalid context provider, did you forget to use "createContext"?'
    );
  }

  return context.getStore();
}

export const createContext = <T>(): Context<T> => {
  const contextStore = initializeContext<T>();

  const Provider = ({ value, children }: PropsWithChildren<{ value: T }>) => {
    return contextStore.run(value, () => children as unknown as JSX.Element);
  };

  Object.defineProperty(Provider, contextProviderId, {
    enumerable: false,
    get() {
      return contextStore;
    },
    writable: false,
    configurable: false,
  });

  // biome-ignore lint:
  const Consumer = ({ children }: PropsWithChildren<{}>) => {
    throw new Error(
      'Consumer is and will not be supported, use the "useContext" hook instead.'
    );
  };

  return { Provider, Consumer };
};

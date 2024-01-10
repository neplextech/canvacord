import { Builder, ExecutionContext } from "../runtime";

/**
 * The type of the dispatch function returned by `useState`.
 */
export type Dispatch<A> = (value: A) => void;

/**
 * The type of the value returned by `useState`.
 */
export type SetStateAction<S> = S | ((prevState: S) => S);

/**
 * A hook that returns a stateful value, and a function to update it. This is similar to react's useState hook, but every `useState` call is bound to
 * the same state instantiated by the builder component. Calling `setState` will update the state and re-render the component, which is captured
 * as a new frame. You can technically have unlimited number of render cycles here, but it is recommended to set a limit to prevent memory leaks.
 */
export function useState<T>(
  initialValue?: T
): [T, Dispatch<SetStateAction<T>>] {
  const context = ExecutionContext.getStore() as Builder<
    Record<string, unknown>,
    T
  >;
  if (!context) {
    throw new Error(
      'The hook "useState" must be invoked inside a builder component.'
    );
  }

  const state = context.state;
  const setState = context.setState.bind(context);

  if (state === undefined && initialValue !== undefined) {
    if (initialValue instanceof Function) {
      setState(initialValue(), true);
    } else {
      setState(initialValue, true);
    }
  }

  const getter = context.state;
  const setter = (value: SetStateAction<T>) => {
    if (value instanceof Function) {
      setState(value(context.state));
    } else {
      setState(value);
    }
  };

  return [getter, setter];
}

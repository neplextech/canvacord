import { Builder, ExecutionContext } from "../templates";

export type Dispatch<A> = (value: A) => void;
export type SetStateAction<S> = S | ((prevState: S) => S);

export function useState<T>(
  initialValue?: T
): [T, Dispatch<SetStateAction<T>>] {
  const context = ExecutionContext.getStore() as Builder<
    Record<string, unknown>,
    T
  >;
  if (!context) {
    throw new Error(
      `The hook "useState" must be invoked inside a builder component.`
    );
  }

  const state = context.state;
  const setState = context.setState.bind(context);

  if (state === undefined && initialValue !== undefined) {
    setState(initialValue, true);
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

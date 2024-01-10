import { AsyncLocalStorage } from "async_hooks";

export const initializeContext = <T>() => new AsyncLocalStorage<T>();

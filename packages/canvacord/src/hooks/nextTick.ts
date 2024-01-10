import { useEffect } from "./useEffect";

/**
 * Runs on the next tick. This is useful for when you want to run a function after the builder has finished rendering.
 */
export function nextTick(handler: () => void) {
  useEffect(() => {
    handler();
  });
}

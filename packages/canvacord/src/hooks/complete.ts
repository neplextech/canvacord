import { useBuilder } from "./useBuilder";

/**
 * Completes the iterations of the builder.
 */
export function complete() {
  const builder = useBuilder();

  builder.setIterations(0);
  builder.tick();
}

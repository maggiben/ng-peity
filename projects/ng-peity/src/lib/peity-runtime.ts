import { PeityInstance } from './peity.types';

// peity-vanilla does not ship TypeScript declarations
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import peityFn from 'peity-vanilla/dist/peity-vanilla.es2017-esm.js';

export function createPeityChart(
  element: HTMLElement,
  type: string,
  options?: Record<string, unknown>
): PeityInstance {
  return peityFn(element, type, options) as PeityInstance;
}

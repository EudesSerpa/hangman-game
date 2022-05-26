/**
 * It creates an array of numbers from a start number to a stop number, with a step size of 1.
 * @param start - The first number in the sequence.
 * @param stop - The number to stop at.
 * @param step - The step value. Default is 1.
 * @returns {Array} - An array of numbers.
 *
 * @Original code: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#sequence_generator_range
 * @Original author: MDN
 */
export const range = ({ start = 0, stop, step = 1 }) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

/**
 *
 * @param {number[]} arr
 * @param {number} kernels
 * @returns {[number, number][]} entries with pointers
 */
export function getChunksPointers(arr, kernels) {
  let result = Array(kernels);

  const step = Math.floor(arr.length / kernels);

  let left = 0;
  let right = step;
  result[0] = [left, right];

  for (let i = 1; i < kernels; i++) {
    left = right + 1;
    right = right + step;

    if (i === kernels - 1) {
      right = arr.length - 1;
    }

    result[i] = [left, right];
  }

  return result;
}

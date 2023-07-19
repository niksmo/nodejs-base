import { parentPort, workerData } from 'node:worker_threads';

function getTotal({ arr, start, end }) {
  let total = 0;

  const length = end + 1 - start;

  const addLoadA = Array(length);
  const addLoadB = Array(length);
  const addLoadC = Array(length);

  for (let i = start; i <= end; i++) {
    const value = arr[i];

    addLoadA.push(value ** 999999);
    addLoadB.push(value ** 999999);
    addLoadC.push(value ** 999999);

    if (value % 3 === 0) {
      total++;
    }
  }

  return total;
}

parentPort.postMessage(getTotal(workerData));

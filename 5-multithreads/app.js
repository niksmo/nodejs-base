import fs from 'node:fs';
import { Worker } from 'node:worker_threads';
import { performance, PerformanceObserver } from 'node:perf_hooks';
import { getChunksPointers } from './utils.js';

// init big array data from file, need exec before `node get-data.js`
const arr = fs
  .readFileSync(new URL('./big-array.txt', import.meta.url), {
    encoding: 'utf8',
  })
  .split(' ')
  .map(v => Number(v));

const perfObserver = new PerformanceObserver(items => {
  const entry = items.getEntries().pop();

  console.log(
    `Name: ${entry.name}\nStarted: ${entry.startTime}\nDuration: ${entry.duration}\n`
  );
});

perfObserver.observe({ entryTypes: ['function'] });

// can be increased or decreased
const KERNELS_COUNT = 6;

/**
 *
 * @param {number[]} arr
 * @returns {number}
 */
function getTotalSync(arr) {
  let total = 0;

  const addLoadA = Array(arr.length);
  const addLoadB = Array(arr.length);
  const addLoadC = Array(arr.length);

  for (let value of arr) {
    addLoadA.push(value ** 999999);
    addLoadB.push(value ** 999999);
    addLoadC.push(value ** 999999);

    if (value % 3 === 0) {
      total++;
    }
  }

  console.log(getTotalSync.name + 'return:', total);
  return total;
}

performance.timerify(getTotalSync)(arr);

/**
 *
 * @param {number[]} arr
 * @returns {Promise<number>}
 */
async function getTotalInThreads(arr) {
  function getTotal(arr, start, end) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(new URL('./worker.js', import.meta.url), {
        workerData: { arr, start, end },
      });

      worker.on('message', value => {
        resolve(value);
      });

      worker.on('error', err => {
        reject(err);
      });
    });
  }

  const chunks = getChunksPointers(arr, KERNELS_COUNT);

  const workers = [];

  for (const [start, end] of chunks) {
    workers.push(getTotal(arr, start, end));
  }

  try {
    const results = await Promise.all(workers);
    const total = results.reduce((ac, val) => ac + val);

    console.log(getTotalInThreads.name + ' return:', total);
    return total;
  } catch (err) {
    console.log(err.message);
  }
}

performance.timerify(getTotalInThreads)(arr);

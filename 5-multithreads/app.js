import fs from 'node:fs';
import { Worker } from 'node:worker_threads';
import { performance, PerformanceObserver } from 'node:perf_hooks';
import { cpus } from 'node:os';
import { getChunksPointers } from './utils.js';

const KERNELS_COUNT = cpus.length;
const MESSAGE = 'message';
const ERROR = 'error';

/*
init big array data from file
if file on exist, exec `node get-data.js`
 */
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

      worker.on(MESSAGE, value => {
        resolve(value);
      });

      worker.on(ERROR, err => {
        reject(err);
      });
    });
  }

  const chunks = getChunksPointers(arr, KERNELS_COUNT);

  const workers = chunks.map(([start, end]) => getTotal(arr, start, end));

  try {
    const results = await Promise.all(workers);
    const total = results.reduce((ac, val) => ac + val);

    console.log(getTotalInThreads.name + ' return:', total);
    return total;
  } catch (err) {
    console.log(err.message);
  }
}

performance.timerify(getTotalSync)(arr);
performance.timerify(getTotalInThreads)(arr);

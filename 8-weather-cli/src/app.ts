import { getArgs } from './helpers/args.js';

function initCLI() {
  try {
    const args = getArgs();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

initCLI();

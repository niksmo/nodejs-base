import { getArgs } from './helpers/args.js';
import { printError, printHelp, printSuccess } from './services/log.service.js';
import { saveKeyValue } from './services/storage.service.js';
import { HELP, CITY, API_KEY } from './const/args.js';

async function initCLI() {
  try {
    const args = getArgs();

    if (args.has(HELP)) {
      printHelp();
      return;
    }

    if (args.has(API_KEY)) {
      await saveKeyValue('token', args.get(API_KEY));
      printSuccess('Token has been saved');
      return;
    }

    if (args.has(CITY)) {
      // save city
    }

    // exec without params
  } catch (error) {
    if (error instanceof Error) {
      printError(error.message);
    }
  }
}

initCLI();

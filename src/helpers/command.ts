import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { GENERATE_PACKAGE_COMMAND } from '../configurations/command.js';

import { displayMessage } from './util.js';

/**
 * Execute the command which launches the package generation
 */
export const executeGenerationPackageCommand = (): void => {
  yargs(hideBin(process.argv))
    .command(GENERATE_PACKAGE_COMMAND)
    .demandCommand(1, 'Please enter the command "generate-package"')
    .help()
    .wrap(72)
    .fail((message, error, yargs) => {
      if (error) {
        displayMessage('error', error.stack || error.message, {
          shouldDisplayMessageType: true,
        });
      }
      displayMessage('error', message, {
        shouldDisplayMessageType: true,
      });

      // eslint-disable-next-line no-console
      console.log(yargs.help());
      process.exit(1);
    })
    .parse();
};

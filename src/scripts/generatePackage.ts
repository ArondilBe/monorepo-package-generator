import chalk from 'chalk';

import { commandLine, packageCreation } from '../helpers';

(async () => {
  try {
    const packageName = await commandLine.askPackageInformation();
    const packageLocation = packageCreation.createPackageFolder(packageName);

    // eslint-disable-next-line no-console
    console.log(chalk.green(`New package created at ${packageLocation}`));
  } catch (error) {
    throw Error(chalk.red(`Error while generating the package: ${error}`));
  }
})();

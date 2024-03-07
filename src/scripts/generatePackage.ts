import chalk from 'chalk';

import { commandLine, configFile, packageCreation } from '../helpers';

(async () => {
  try {
    const commandOptions = commandLine.getCommandOptions();
    const packageCreationConfiguration =
      await configFile.getPackageCreationConfiguration(
        commandOptions.config as string,
      );
    const packageName = await commandLine.askPackageInformation();
    const packageLocation = packageCreation.createPackageFolder(
      packageName,
      packageCreationConfiguration.destinationFolderRelativePart,
    );

    // eslint-disable-next-line no-console
    console.log(chalk.green(`New package created at ${packageLocation}`));
  } catch (error) {
    throw Error(chalk.red(`Error while generating the package: ${error}`));
  }
})();

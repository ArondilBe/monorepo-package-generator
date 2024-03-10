import chalk from 'chalk';

import { commandLine, configFile, folder, packageCreation } from '../helpers';

(async () => {
  try {
    const commandOptions = commandLine.getCommandOptions();
    const packageCreationConfiguration =
      await configFile.getPackageCreationConfiguration(
        commandOptions.config as string,
      );
    const packageName = await commandLine.askPackageInformation();

    const packageFolderCreationLocation = folder.getFolderCreationLocation(
      packageCreationConfiguration.destinationFolderRelativePath,
      packageName,
    );

    if (folder.doesFolderExists(packageFolderCreationLocation)) {
      throw Error(
        chalk.red(
          `Folder ${packageName} already exists at ${packageFolderCreationLocation}`,
        ),
      );
    }
    packageCreation.createPackageFolder(packageFolderCreationLocation);
    const sampleFilesFolderLocation = folder.getFolderCreationLocation(
      packageCreationConfiguration.sampleFilesFolderRelativePath,
    );

    if (!folder.doesFolderExists(sampleFilesFolderLocation)) {
      throw Error(
        chalk.red(
          `No sample files folder found at ${sampleFilesFolderLocation}`,
        ),
      );
    }
    packageCreation.addAllSampleFiles(
      packageFolderCreationLocation,
      sampleFilesFolderLocation,
    );

    // eslint-disable-next-line no-console
    console.log(
      chalk.green(
        `New package created at ${packageFolderCreationLocation} with all sample files copied into it`,
      ),
    );
  } catch (error) {
    throw Error(chalk.red(`Error while generating the package: ${error}`));
  }
})();

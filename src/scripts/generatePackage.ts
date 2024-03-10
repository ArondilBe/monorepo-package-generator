import chalk from 'chalk';

import { commandLine, configFile, packageCreation } from '../helpers';

(async () => {
  try {
    const commandOptions = commandLine.getCommandOptions();

    const packageCreationConfiguration =
      await configFile.getPackageCreationConfiguration(
        commandOptions.config as string,
      );

    const sampleFilesFolderLocation =
      packageCreation.getSampleFilesFolderLocation(
        packageCreationConfiguration.sampleFilesFolderRelativePath,
      );

    const arePackageTypesDefined =
      !!packageCreationConfiguration.packagesTypes &&
      !!Object.keys(packageCreationConfiguration.packagesTypes).length;

    let packagesTypesKeys: string[] = [];
    if (arePackageTypesDefined) {
      packagesTypesKeys = Object.keys(
        packageCreationConfiguration.packagesTypes!,
      );

      packageCreation.checkPackageTypesFoldersExistence(
        packagesTypesKeys,
        sampleFilesFolderLocation,
        packageCreationConfiguration.packagesTypes!,
      );
    }
    const createdPackageInformation =
      await packageCreation.getCreatedPackageInformation(
        packageCreationConfiguration.destinationFolderRelativePath,
        sampleFilesFolderLocation,
        arePackageTypesDefined,
        packagesTypesKeys,
        packageCreationConfiguration.packagesTypes,
      );
    packageCreation.createPackageFolder(
      createdPackageInformation.creationFolderLocation,
    );
    packageCreation.addSampleFiles(
      createdPackageInformation.creationFolderLocation,
      createdPackageInformation.sampleFilesFolderLocation,
    );

    // eslint-disable-next-line no-console
    console.log(
      chalk.green(
        `New package ${createdPackageInformation.type ? `of type ${createdPackageInformation.type} created` : 'created'} at ${createdPackageInformation.creationFolderLocation}`,
      ),
    );
  } catch (error) {
    throw Error(chalk.red(`Error while generating the package: ${error}`));
  }
})();

import chalk from 'chalk';

import * as commandLine from './commandLine';
import * as folder from './folder';
import * as packageCreation from './packageCreation';

/**
 * Handle the creation of the package folder
 * @param {string} destinationFolderRelativePath The relative path of the destination folder
 * @returns {string} The location of the created package
 */
export const generatePackageFolder = async (
  destinationFolderRelativePath: string,
): Promise<string | undefined> => {
  const packageName = await commandLine.askPackageInformation();

  const packageFolderCreationLocation = folder.getFolderCreationLocation(
    destinationFolderRelativePath,
    packageName,
  );

  if (folder.doesFolderExists(packageFolderCreationLocation)) {
    throw Error(
      chalk.red(
        `Folder ${packageName} already exists at ${packageFolderCreationLocation}`,
      ),
    );
  }
  const packageLocation = packageCreation.createPackageFolder(
    packageFolderCreationLocation,
  );

  return packageLocation;
};

import { existsSync } from 'fs';
import { join, resolve } from 'path';

import * as util from './util';

/**
 * Return the absolute path of a folder
 * @param {string} folderLocation The path to the location where of the folder
 * @param {string} folderName The folder name to create (optional)
 * @returns {string} The absolute path where the folder will be created
 */
export const getFolderLocation = (
  folderLocation: string,
  folderName?: string,
): string =>
  resolve(folderName ? join(folderLocation, folderName) : folderLocation);

/**
 * Check if the package folder exists or not
 * @param {string} folderLocation The absolute path of the the folder
 * @returns {boolean} If the folder exists or not
 */
export const doesFolderExists = (folderLocation: string): boolean =>
  existsSync(folderLocation);

/**
 * Return the sample files folder absolute path
 * @param {string} relativePath The sample files folder relative path
 * @returns {string} The sample files folder absolute path
 * @throws {Error} If the sample files folder is not found
 */
export const getSampleFilesFolderLocation = (relativePath: string): string => {
  const sampleFilesFolderLocation = getFolderLocation(relativePath);
  if (!doesFolderExists(sampleFilesFolderLocation)) {
    util.throwPackageGenerationError('Sample file folder', {
      path: sampleFilesFolderLocation,
    });
  }
  return sampleFilesFolderLocation;
};

/**
 * Check if all package types defined in the configuration have linked sub folders in the sample files folder
 * @param {Record<string, string>} packageTypes The list of package types
 * @param {string} sampleFileFolderLocation The sample file folder absolute path
 * @throws {Error} If there is at least one undefined package types
 */
export const checkPackageTypesSubFolderDefinition = (
  packageTypes: Record<string, string>,
  sampleFileFolderLocation: string,
): void => {
  let undefinedPackageTypes: string = '';
  for (const packageType in packageTypes) {
    if (
      !doesFolderExists(
        getFolderLocation(sampleFileFolderLocation, packageTypes[packageType]),
      )
    ) {
      undefinedPackageTypes = undefinedPackageTypes.concat(`\n${packageType}`);
    }
  }

  if (undefinedPackageTypes.length) {
    util.throwPackageGenerationError('Package type', {
      packageTypes: undefinedPackageTypes,
    });
  }
};

/**
 * Check if a package with the given name already exists
 * @param {string} packageName The name of the package to generate
 * @param {string} destinationFolderLocation The destination folder absolute path
 * @throws {Error} If a package with the same name already exists
 */
export const checkIfPackageAlreadyExists = (
  packageName: string,
  destinationFolderLocation: string,
): void => {
  const packageFolderCreationLocation = getFolderLocation(
    destinationFolderLocation,
    packageName,
  );
  if (doesFolderExists(packageFolderCreationLocation)) {
    util.throwPackageGenerationError('Package already exists', {
      package: packageName,
      path: packageFolderCreationLocation,
    });
  }
};

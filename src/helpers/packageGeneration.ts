import { mkdirSync } from 'fs';
import { join, resolve } from 'path';

import { SUCCESS_MESSAGE } from '../configurations/util.js';
import { PackageGenerationInformation } from '../types/packageGeneration.js';

import { getPackageGenerationConfigurationFromFile } from './config.js';
import { doesFileOrFolderExist } from './file.js';
import { displayMessage, throwError } from './util.js';

/**
 * Return the package generation information
 * @param {Object=} options The package generation options
 * @param {string} options.configurationFile The configuration file path
 * @param {string} options.packageName The package to generate's name
 * @param {string} options.packageType The package to generate's type (optional)
 * @param {string} options.packageVersion The package to generate's version (optional)
 * @param {boolean} options.verbose Set if all the messages should be displayed (optional)
 * @returns {PackageGenerationInformation} The package generation information
 */
export const getPackageGenerationInformation = (options: {
  configurationFile: string;
  packageName: string;
  packageType?: string;
  packageVersion?: string;
  verbose?: boolean;
}): PackageGenerationInformation => ({
  configurationFilePath: options.configurationFile,
  name: options.packageName,
  type: options.packageType,
  version: options.packageVersion,
  isVerbose: options.verbose,
});

/**
 * Create the package folder
 * @param {string} creationPath The location where the new package will be created
 * @returns {string|undefined} The folder location or undefined (if error)
 */
export const createPackageFolder = (creationPath: string): string | undefined =>
  mkdirSync(creationPath, {
    recursive: true,
  });

/**
 * Main function to generate the package
 * @param {Object=} options The package generation options
 * @param {string} options.configurationFile The configuration file path
 * @param {string} options.packageName The package to generate's name
 * @param {string} options.packageType The package to generate's type (optional)
 * @param {string} options.packageVersion The package to generate's version (optional)
 * @param {boolean} options.verbose Set if all the messages should be displayed (optional)
 */
export const generatePackage = (options: {
  configurationFile: string;
  packageName: string;
  packageType?: string;
  packageVersion?: string;
  verbose?: boolean;
}): void => {
  const packageGenerationInformation = getPackageGenerationInformation(options);

  const { configurationFilePath, name, isVerbose } =
    packageGenerationInformation;

  const packageGenerationConfiguration =
    getPackageGenerationConfigurationFromFile(configurationFilePath);
  const packageCreationPath = resolve(
    join(packageGenerationConfiguration.destinationFolderPath, name),
  );

  if (doesFileOrFolderExist(packageCreationPath)) {
    throwError('Package already exists', {
      name: name,
      path: packageGenerationConfiguration.destinationFolderPath,
    });
  }

  createPackageFolder(packageCreationPath);

  displayMessage('success', SUCCESS_MESSAGE, {
    parameters: { path: packageCreationPath },
    shouldDisplayMessageType: true,
    isVerbose,
  });
};

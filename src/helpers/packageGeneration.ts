import { mkdirSync } from 'fs';
import { join, resolve } from 'path';

import { PACKAGE_JSON_FILE_NAME } from '../configurations/file.js';
import {
  INFORMATION_MESSAGE,
  SUCCESS_MESSAGE,
  WARNING_MESSAGE,
} from '../configurations/util.js';
import { PackageGenerationInformation } from '../types/packageGeneration.js';

import { getPackageGenerationConfigurationFromFile } from './config.js';
import { copyFiles, doesFileOrFolderExist, modifyPackageJson } from './file.js';
import {
  getListOfNonExistingPackageTypes,
  getNonExistingPackageTypeFolders,
  isPackageTypeDefined,
} from './packageType.js';
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
  // Configuration

  const packageGenerationInformation = getPackageGenerationInformation(options);

  const { configurationFilePath, name, isVerbose, type, version } =
    packageGenerationInformation;

  const packageGenerationConfiguration =
    getPackageGenerationConfigurationFromFile(configurationFilePath);

  // Checking content

  const { destinationFolderPath, sampleFilesFolderPath, packageTypes } =
    packageGenerationConfiguration;

  const packageCreationPath = resolve(join(destinationFolderPath, name));

  const sampleFilesPath = resolve(sampleFilesFolderPath);

  if (doesFileOrFolderExist(packageCreationPath)) {
    throwError('Package already exists', {
      name: name,
      path: destinationFolderPath,
    });
  }

  if (!doesFileOrFolderExist(sampleFilesPath)) {
    throwError('Sample files folder', { path: sampleFilesPath });
  }

  if (packageTypes) {
    const nonExistingPackageTypes = getNonExistingPackageTypeFolders(
      sampleFilesPath,
      packageTypes,
    );

    if (nonExistingPackageTypes.length) {
      throwError('Package types folder', {
        types: getListOfNonExistingPackageTypes(nonExistingPackageTypes),
      });
    }
  } else if (type) {
    displayMessage('warning', WARNING_MESSAGE['Package type'], {
      shouldDisplayMessageType: true,
      isVerbose,
    });
  }

  if (type && packageTypes) {
    if (!isPackageTypeDefined(type, Object.keys(packageTypes))) {
      throwError('Package type', { type });
    }
  }

  // Package generation

  createPackageFolder(packageCreationPath);

  displayMessage('information', INFORMATION_MESSAGE['Folder created'], {
    parameters: { path: packageCreationPath },
    shouldDisplayMessageType: true,
    isVerbose,
  });

  copyFiles(
    packageCreationPath,
    sampleFilesPath,
    packageTypes ? Object.values(packageTypes) : undefined,
  );

  displayMessage('information', INFORMATION_MESSAGE['Common files copied'], {
    shouldDisplayMessageType: true,
    isVerbose,
  });

  if (type) {
    copyFiles(
      packageCreationPath,
      join(sampleFilesFolderPath, packageTypes?.[type] as string),
    );

    displayMessage(
      'information',
      INFORMATION_MESSAGE['Specific files copied'],
      {
        parameters: { type },
        shouldDisplayMessageType: true,
        isVerbose,
      },
    );
  }

  if (join(packageCreationPath, PACKAGE_JSON_FILE_NAME)) {
    modifyPackageJson(
      join(packageCreationPath, PACKAGE_JSON_FILE_NAME),
      name,
      version,
    );

    displayMessage(
      'information',
      INFORMATION_MESSAGE['Package.json modified'],
      {
        shouldDisplayMessageType: true,
        isVerbose,
      },
    );
  }

  displayMessage('success', SUCCESS_MESSAGE, {
    parameters: { path: packageCreationPath },
    shouldDisplayMessageType: true,
    isVerbose,
  });
};

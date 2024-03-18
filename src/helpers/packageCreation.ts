import { cpSync, mkdirSync } from 'fs';
import { join } from 'path';

import stringParametersParser from '@arondilbe/string-parameters-parser';
import chalk from 'chalk';

import { util as utilConfigurations } from '../configurations';
import {
  CreatedPackageFolderInformation,
  CreatedPackageInformation,
  CreatedPackageSampleFilesInformation,
  PackageCreationConfiguration,
} from '../types';

import * as commandLine from './commandLine';
import * as configFile from './configFile';
import * as folder from './folder';
import * as util from './util';

/**
 * Create the package folder
 * @param {string} packageFolderLocation The absolute path of the location where the package will be created
 * @returns {string|undefined} The created package location or (in case of error), undefined
 */
export const createPackageFolder = (
  packageFolderLocation: string,
): string | undefined =>
  mkdirSync(packageFolderLocation, {
    recursive: true,
  });

/**
 * Copy all sample files into the new package folder
 * @param {string} packageFolderLocation The location of the new package folder
 * @param {string} sampleFilesFolderLocation The location of the sample files folder
 * @throws {Error} If there is an error while creating copying the files
 */
export const addSampleFiles = (
  packageFolderLocation: string,
  sampleFilesFolderLocation: string,
): void => {
  cpSync(sampleFilesFolderLocation, packageFolderLocation, {
    recursive: true,
  });
};

/**
 * Return the sample files folder absolute path
 * @param {string} sampleFilesFolderRelativePath The sample files folder relative path
 * @returns {string} The sample files folder absolute path
 * @throws {Error} If the sample files folder is not found
 */
export const getSampleFilesFolderLocation = (
  sampleFilesFolderRelativePath: string,
): string => {
  const sampleFilesFolderLocation = folder.getFolderCreationLocation(
    sampleFilesFolderRelativePath,
  );
  if (!folder.doesFolderExists(sampleFilesFolderLocation)) {
    util.throwPackageGenerationError('Sample file folder', {
      path: sampleFilesFolderLocation,
    });
  }
  return sampleFilesFolderLocation;
};

/**
 * Check if all packages types defined into the configuration file exist in the sample files folder
 * @param {string[]} packagesTypesKeys An array of packages types keys
 * @param {string} sampleFilesFolderLocation The sample files folder absolute path
 * @param {{ [key: string]: string }} packagesTypes The list of packages types
 * @throws {Error} If there some of the packages types defined in the configuration doesn't exist in the sample files folder
 */
export const checkPackageTypesFoldersExistence = (
  packagesTypesKeys: string[],
  sampleFilesFolderLocation: string,
  packagesTypes: { [key: string]: string },
): void => {
  const nonExistingPackageTypes: string[] = [];
  packagesTypesKeys.forEach((packagesTypesKeys) => {
    if (
      !folder.doesFolderExists(
        join(sampleFilesFolderLocation, packagesTypes?.[packagesTypesKeys]),
      )
    ) {
      nonExistingPackageTypes.push(packagesTypesKeys);
    }
  });

  if (nonExistingPackageTypes.length) {
    let nonExistingPackageTypesErrorMessage = '';
    nonExistingPackageTypes.forEach(
      (nonExistingPackageType) =>
        (nonExistingPackageTypesErrorMessage =
          nonExistingPackageTypesErrorMessage.concat(
            `\n- ${nonExistingPackageType}`,
          )),
    );
    util.throwPackageGenerationError('Package type', {
      packageTypes: nonExistingPackageTypesErrorMessage,
    });
  }
};

/**
 * Ask the package the create name and return it's absolute path and it's name
 * @param {string} destinationFolderRelativePath The relative path of the package destination folder
 * @returns {Promise<CreatedPackageFolderInformation>} The package to create absolute path and name
 * @throws {Error} If a folder with the name of the package to create already exists in the destination folder
 */
export const getCreatedPackageFolderInformation = async (
  destinationFolderRelativePath: string,
): Promise<CreatedPackageFolderInformation> => {
  const packageName = await commandLine.askPackageInformation();
  const packageFolderCreationLocation = folder.getFolderCreationLocation(
    destinationFolderRelativePath,
    packageName,
  );
  if (folder.doesFolderExists(packageFolderCreationLocation)) {
    util.throwPackageGenerationError('Package already exists', {
      package: packageName,
      path: packageFolderCreationLocation,
    });
  }
  return {
    name: packageName,
    creationFolderLocation: packageFolderCreationLocation,
  };
};

/**
 * If there is some defined packages types, ask the package type to create and return it and the package type files folder absolute path
 * If there are no defined packages types, return undefined for the type and the main sample files folder absolute path
 * @param {string} sampleFilesFolderLocation The absolute sample files folder path
 * @param {boolean} arePackageTypesDefined If there are defined packages types or not
 * @param {string[]} packageTypesKeys An array containing the packages types keys (optional)
 * @param {{[key: string]: string} } packagesTypes An object containing the packages types
 * @returns {Promise<CreatedPackageSampleFilesInformation>} The package to create type (undefined if no package type) and the sample files folder absolute path
 */
export const getCreatedPackageSampleFilesInformation = async (
  sampleFilesFolderLocation: string,
  arePackageTypesDefined: boolean,
  packageTypesKeys?: string[],
  packagesTypes?: { [key: string]: string },
): Promise<CreatedPackageSampleFilesInformation> => {
  const sampleFilesToAddLocation = sampleFilesFolderLocation;
  if (arePackageTypesDefined) {
    const packageType = await commandLine.askPackageType(packageTypesKeys!);
    return {
      type: packageType,
      sampleFilesFolderLocation: packagesTypes?.[packageType]
        ? join(sampleFilesToAddLocation, packagesTypes?.[packageType] as string)
        : sampleFilesToAddLocation,
    };
  }
  return {
    type: undefined,
    sampleFilesFolderLocation,
  };
};

/**
 * Ask the package to create information and returns it
 * @param {string} destinationFolderRelativePath The relative path of the package destination folder
 * @param {string} sampleFilesFolderLocation The absolute sample files folder path
 * @param {boolean} arePackageTypesDefined If there are defined packages types or not
 * @param {string[]} packageTypesKeys An array containing the packages types keys (optional)
 * @param {{[key: string]: string} } packagesTypes An object containing the packages types
 * @returns {Promise<CreatedPackageInformation>} The package to create information
 */
export const getCreatedPackageInformation = async (
  destinationFolderRelativePath: string,
  sampleFilesFolderLocation: string,
  arePackageTypesDefined: boolean,
  packageTypesKeys?: string[],
  packagesTypes?: { [key: string]: string },
): Promise<CreatedPackageInformation> => {
  const createdPackageFolderInformation =
    await getCreatedPackageFolderInformation(destinationFolderRelativePath);
  const createdPackageSampleFilesInformation =
    await getCreatedPackageSampleFilesInformation(
      sampleFilesFolderLocation,
      arePackageTypesDefined,
      packageTypesKeys,
      packagesTypes,
    );

  return {
    name: createdPackageFolderInformation.name,
    creationFolderLocation:
      createdPackageFolderInformation.creationFolderLocation,
    type: createdPackageSampleFilesInformation.type,
    sampleFilesFolderLocation:
      createdPackageSampleFilesInformation.sampleFilesFolderLocation,
  };
};

/**
 * Main function to generate a package
 * @param {PackageCreationConfiguration} packageGenerationConfiguration The configuration object (optional)
 */
export const generatePackage = async (
  packageGenerationConfiguration?: PackageCreationConfiguration,
): Promise<void> => {
  const packageCreationConfiguration = packageGenerationConfiguration
    ? packageGenerationConfiguration
    : await configFile.getPackageCreationConfiguration(
        commandLine.getCommandOptions().config!,
      );

  const sampleFilesFolderLocation = getSampleFilesFolderLocation(
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

    checkPackageTypesFoldersExistence(
      packagesTypesKeys,
      sampleFilesFolderLocation,
      packageCreationConfiguration.packagesTypes!,
    );
  }
  const createdPackageInformation = await getCreatedPackageInformation(
    packageCreationConfiguration.destinationFolderRelativePath,
    sampleFilesFolderLocation,
    arePackageTypesDefined,
    packagesTypesKeys,
    packageCreationConfiguration.packagesTypes,
  );
  createPackageFolder(createdPackageInformation.creationFolderLocation);
  addSampleFiles(
    createdPackageInformation.creationFolderLocation,
    createdPackageInformation.sampleFilesFolderLocation,
  );

  const { SUCCESS_MESSAGES: successMessages } = utilConfigurations;
  const successMessage =
    successMessages[createdPackageInformation.type ? 0 : 1];
  const parameters = {
    path: createdPackageInformation.creationFolderLocation,
  };
  // eslint-disable-next-line no-console
  console.log(
    chalk.green(
      stringParametersParser.getStringWithParameterValues(
        utilConfigurations.STRING_PARAMETER_SYMBOL,
        successMessage,
        createdPackageInformation.type
          ? { ...parameters, ...{ type: createdPackageInformation.type } }
          : parameters,
      ),
    ),
  );
};

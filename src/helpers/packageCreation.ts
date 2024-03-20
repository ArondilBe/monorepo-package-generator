import { cpSync, mkdirSync } from 'fs';

import chalk from 'chalk';

import type {
  CreatedPackageInformation,
  FoldersAbsolutePath,
  PackageCreationConfiguration,
} from '../types';

import * as commandLine from './commandLine';
import * as config from './config';
import * as folder from './folder';
import * as util from './util';

/**
 * Create the package folder
 * @param {string} packageFolderLocation The path of the location where the package will be created
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
 * Main function to generate a package
 * @param {PackageCreationConfiguration} packageGenerationConfiguration The configuration object (optional)
 */
export const generatePackage = async (
  packageGenerationConfiguration?: PackageCreationConfiguration,
): Promise<void> => {
  const commandParameters = await commandLine.getCommandOptions();

  const packageCreationConfiguration = packageGenerationConfiguration
    ? packageGenerationConfiguration
    : await config.getPackageCreationConfigurationFromFile(
        commandParameters.config,
      );

  const foldersAbsolutePath: FoldersAbsolutePath = {
    destination: folder.getFolderLocation(
      packageCreationConfiguration.destinationFolderRelativePath,
    ),
    sampleFiles: folder.getSampleFilesFolderLocation(
      packageCreationConfiguration.sampleFilesFolderRelativePath,
    ),
  };

  const arePackageTypesAreDefined = config.arePackageTypesAreDefined(
    packageCreationConfiguration.packageTypes,
  );

  if (arePackageTypesAreDefined) {
    folder.checkPackageTypesSubFolderDefinition(
      packageCreationConfiguration.packageTypes!,
      foldersAbsolutePath.sampleFiles,
    );

    if (
      commandParameters.type &&
      !packageCreationConfiguration.packageTypes?.[commandParameters.type]
    ) {
      util.throwPackageGenerationError('Package type', {
        type: commandParameters.type,
      });
    }
  }

  const createdPackageInformation: Partial<CreatedPackageInformation> = {};

  createdPackageInformation.name =
    commandParameters.name || (await commandLine.askPackageName());
  createdPackageInformation.paths = {};
  createdPackageInformation.paths.destination = folder.getFolderLocation(
    foldersAbsolutePath.destination,
    createdPackageInformation.name,
  );
  folder.checkIfPackageAlreadyExists(
    createdPackageInformation.name,
    foldersAbsolutePath.destination,
  );

  if (arePackageTypesAreDefined) {
    createdPackageInformation.type =
      commandParameters.type ||
      (await commandLine.askPackageType(
        Object.keys(packageCreationConfiguration.packageTypes!),
      ));
  }

  createdPackageInformation.paths.sampleFiles = createdPackageInformation.type
    ? folder.getFolderLocation(
        foldersAbsolutePath.sampleFiles,
        packageCreationConfiguration.packageTypes?.[
          createdPackageInformation.type
        ],
      )
    : foldersAbsolutePath.sampleFiles;

  createPackageFolder(createdPackageInformation.paths.destination);
  addSampleFiles(
    createdPackageInformation.paths.destination,
    createdPackageInformation.paths.sampleFiles,
  );

  // eslint-disable-next-line no-console
  console.log(
    chalk.green(
      util.getSuccessMessage(
        createdPackageInformation.paths.destination,
        createdPackageInformation.type,
      ),
    ),
  );
};

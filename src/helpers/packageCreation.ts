import { cpSync, mkdirSync } from 'fs';

import chalk from 'chalk';

import type {
  CreatedPackageInformation,
  FoldersAbsolutePath,
  PackageCreationConfiguration,
  PackageInformation,
} from '../types';

import * as commandLine from './commandLine';
import * as config from './config';
import * as file from './file';
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
 * @param {Object=} generationOptions The optional options of the package generation
 * @param {PackageCreationConfiguration} generationOptions.packageGenerationConfiguration The configuration object (optional)
 * @param {Partial<PackageInformation>} generationOptions.packageInformation The package to create's information (name and type) (optional)
 */
export const generatePackage = async (generationOptions?: {
  packageGenerationConfiguration?: PackageCreationConfiguration;
  packageInformation?: Partial<PackageInformation>;
}): Promise<void> => {
  const { packageGenerationConfiguration, packageInformation } =
    generationOptions || {};

  const createdPackageInformation: Partial<CreatedPackageInformation> = {};

  const commandParameters = await commandLine.getCommandOptions();

  if (packageInformation) {
    createdPackageInformation.name = packageInformation.name;
    createdPackageInformation.type =
      packageInformation.type || commandParameters.type;
  }

  const packageCreationConfiguration = packageGenerationConfiguration
    ? packageGenerationConfiguration
    : await config.getPackageCreationConfigurationFromFile(
        commandParameters.config,
      );

  const { newPackages, sampleFiles } = packageCreationConfiguration;

  const foldersAbsolutePath: FoldersAbsolutePath = {
    destination: folder.getFolderLocation(newPackages.destinationFolderPath),
    sampleFiles: folder.getSampleFilesFolderLocation(sampleFiles.folderPath),
  };

  const arePackageTypesAreDefined = config.arePackageTypesAreDefined(
    sampleFiles.packageTypes,
  );

  if (arePackageTypesAreDefined) {
    folder.checkPackageTypesSubFolderDefinition(
      sampleFiles.packageTypes!,
      foldersAbsolutePath.sampleFiles,
    );

    if (
      createdPackageInformation.type &&
      !sampleFiles.packageTypes?.[createdPackageInformation.type]
    ) {
      util.throwPackageGenerationError('Package type', {
        type: createdPackageInformation.type,
      });
    }
  }

  if (!createdPackageInformation.name) {
    createdPackageInformation.name =
      commandParameters.name || (await commandLine.askPackageName());
  }

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
    if (!createdPackageInformation.type) {
      createdPackageInformation.type =
        commandParameters.type ||
        (await commandLine.askPackageType(
          Object.keys(sampleFiles.packageTypes!),
        ));
    }
  }

  createdPackageInformation.paths.sampleFiles = createdPackageInformation.type
    ? folder.getFolderLocation(
        foldersAbsolutePath.sampleFiles,
        sampleFiles.packageTypes?.[createdPackageInformation.type],
      )
    : foldersAbsolutePath.sampleFiles;

  createPackageFolder(createdPackageInformation.paths.destination);
  addSampleFiles(
    createdPackageInformation.paths.destination,
    createdPackageInformation.paths.sampleFiles,
  );

  if (
    file.doesPackageHasAPackageJson(createdPackageInformation.paths.destination)
  ) {
    await file.modifyPackageJsonInformation(
      createdPackageInformation.paths.destination,
      createdPackageInformation.name,
      newPackages.version,
    );
  }

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

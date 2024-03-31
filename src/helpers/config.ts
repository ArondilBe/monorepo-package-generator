import { readFileSync } from 'fs';
import { resolve } from 'path';

import { PackageGenerationConfiguration } from '../types/config.js';

import { doesFileOrFolderExist } from './file.js';
import { throwError } from './util.js';

/**
 * Return the package generation configuration file
 * @param {string} configurationFilePath The path of the configuration file
 * @returns {PackageGenerationConfiguration} The package generation configuration file
 */
export const getPackageGenerationConfigurationFromFile = (
  configurationFilePath: string,
): PackageGenerationConfiguration => {
  const configurationFileAbsolutePath = resolve(configurationFilePath);

  if (!doesFileOrFolderExist(configurationFileAbsolutePath)) {
    throwError('Configuration file', {
      path: configurationFileAbsolutePath,
    });
  }
  let configFile: PackageGenerationConfiguration = {
    destinationFolderPath: '',
    sampleFilesFolderPath: '',
  };
  try {
    configFile = JSON.parse(
      readFileSync(configurationFileAbsolutePath, { encoding: 'utf-8' }),
    );
  } catch (error) {
    // Cannot use custom error because the format error is thrown before
    throw Error;
  }
  return configFile;
};

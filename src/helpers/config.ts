import { existsSync } from 'fs';
import { resolve } from 'path';

import type {
  PackageCreationConfiguration,
  PackageTypeInformation,
} from '../types';

import * as util from './util';

/**
 * Return the package creation configuration
 * @param {string} configurationFileRelativeLocation The relative path of the package creation configuration file
 * @returns {Promise<.PackageCreationConfiguration>} The package creation configuration
 * @throws {Error} If the file doesn't exist
 */
export const getPackageCreationConfigurationFromFile = async (
  configurationFileRelativeLocation: string,
): Promise<PackageCreationConfiguration> => {
  const configurationFileLocation = resolve(configurationFileRelativeLocation);

  if (!existsSync(configurationFileLocation)) {
    util.throwPackageGenerationError('Configuration file missing', {
      path: configurationFileLocation,
    });
  }
  const packageCreationConfiguration = await import(configurationFileLocation);

  return packageCreationConfiguration.default;
};

/**
 * Return if there is some package types defined or not
 * @param {Record<string,PackageTypeInformation>} packageTypes The list of package types (optional)
 * @returns {boolean} If there is some package types defined or not
 */
export const arePackageTypesAreDefined = (
  packageTypes?: Record<string, PackageTypeInformation>,
): boolean => !!packageTypes && !!Object.keys(packageTypes).length;

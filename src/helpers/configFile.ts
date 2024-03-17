import { existsSync } from 'fs';
import { resolve } from 'path';

import { PackageCreationConfiguration } from '../types';

import * as util from './util';

/**
 * Return the package creation configuration
 * @param {string} configurationFileRelativeLocation The relative path of the package creation configuration file
 * @returns {Promise<.PackageCreationConfiguration>} The package creation configuration
 * @throws {Error} If the file doesn't exist
 */
export const getPackageCreationConfiguration = async (
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

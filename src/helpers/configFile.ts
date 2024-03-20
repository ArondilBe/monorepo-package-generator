import { existsSync } from 'fs';
import { resolve } from 'path';

import type { PackageCreationConfiguration } from '../types';

import * as commandLine from './commandLine';
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
 * @param {Record<string,string>} packageTypes The list of package types (optional)
 * @returns {boolean} If there is some package types defined or not
 */
export const arePackageTypesAreDefined = (
  packageTypes?: Record<string, string>,
): boolean => !!packageTypes && !!Object.keys(packageTypes).length;

/**
 * Return the package creation configuration to use. If an object is directly passed, it will be used instead of the file content
 * @param {PackageCreationConfiguration} packageGenerationConfiguration The configuration object (optional)
 * @return {Promise<PackageCreationConfiguration>} The package creation configuration to use
 */
export const getPackageCreationConfiguration = async (
  packageGenerationConfiguration?: PackageCreationConfiguration,
): Promise<PackageCreationConfiguration> =>
  packageGenerationConfiguration
    ? packageGenerationConfiguration
    : getPackageCreationConfigurationFromFile(
        (await commandLine.getCommandOptions()).config,
      );

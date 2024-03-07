import { existsSync } from 'fs';
import { resolve } from 'path';

import chalk from 'chalk';

import { configFile as configFileTypes } from '../types';

/**
 * Return the package creation configuration
 * @param {string} configurationFileRelativeLocation The relative path of the package creation configuration file
 * @returns {Promise<configFileTypes.PackageCreationConfiguration>} The package creation configuration
 * @throws {Error} If the file doesn't exist
 */
export const getPackageCreationConfiguration = async (
  configurationFileRelativeLocation: string,
): Promise<configFileTypes.PackageCreationConfiguration> => {
  const configurationFileLocation = resolve(configurationFileRelativeLocation);

  if (!existsSync(configurationFileLocation)) {
    throw Error(chalk.red(`File ${configurationFileLocation} doesn't exist`));
  }
  const packageCreationConfiguration = await import(configurationFileLocation);

  return packageCreationConfiguration.default;
};

import { PackageGenerationInformation } from '../types/packageGeneration.js';

import { displayMessage } from './util.js';

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
  displayMessage(
    'information',
    `${packageGenerationInformation.configurationFilePath}`,
    {
      isVerbose: true,
      shouldDisplayMessageType: true,
    },
  );
};

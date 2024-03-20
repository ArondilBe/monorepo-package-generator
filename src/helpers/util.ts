import stringParametersParser from '@arondilbe/string-parameters-parser';
import chalk from 'chalk';

import { util as utilConfigurations } from '../configurations';
import { PackageGenerationErrorType } from '../types';

/**
 * Throw an error with parameters set to their corresponding values and with the right color format
 * @param {PackageGenerationErrorType} errorType The error type
 * @param {Record<string, string>} parameters The list of message's parameters and their corresponding values
 * @throws {Error} Always, refer to the function description
 */
export const throwPackageGenerationError = (
  errorType: PackageGenerationErrorType,
  parameters: Record<string, string>,
) => {
  const message = utilConfigurations.PACKAGE_GENERATION_ERROR[errorType];
  const messageWithParameterValues =
    stringParametersParser.getStringWithParameterValues(
      utilConfigurations.STRING_PARAMETER_SYMBOL,
      message,
      parameters,
    );
  throw Error(chalk.red(`${errorType}: ${messageWithParameterValues}`));
};

/**
 * Return the package generation formatted success message
 * @param {string} packageLocation The location of the generated package
 * @param {string} packageType The generated package's type (optional)
 * @returns {string} The formatted success message
 */
export const getSuccessMessage = (
  packageLocation: string,
  packageType?: string,
): string => {
  const { SUCCESS_MESSAGES: successMessages } = utilConfigurations;

  const successMessageParameters = {
    path: packageLocation,
  };

  return stringParametersParser.getStringWithParameterValues(
    utilConfigurations.STRING_PARAMETER_SYMBOL,
    packageType
      ? successMessages['Typed package']
      : successMessages['Non typed package'],
    packageType
      ? {
          ...successMessageParameters,
          ...{ type: packageType },
        }
      : successMessageParameters,
  );
};

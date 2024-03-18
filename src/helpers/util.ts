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

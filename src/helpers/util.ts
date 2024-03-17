import chalk from 'chalk';

import { util as utilConfigurations } from '../configurations';
import { PackageGenerationErrorType } from '../types';

/**
 * Return a message with its parameters set to their corresponding value
 * @param {string} message The message without its parameter values
 * @param {Record<string, string>} parameters The list of message's parameters and their corresponding values
 * @returns {string} The message with its parameters set to their corresponding value
 * @throws {Error} When at least one parameter passed in the parameters object is not found in the message
 */
export const getMessageWithParameterValues = (
  message: string,
  parameters: Record<string, string>,
): string => {
  const {
    STRING_PARAMETER_SYMBOL: stringParameterSymbol,
    PACKAGE_GENERATION_ERROR: packageGenerationError,
  } = utilConfigurations;
  const parametersKeys = Object.keys(parameters);
  let messageWithParameterValues = message;
  const notFoundParameters: string[] = [];
  parametersKeys.forEach((parameterKey) => {
    const parameterInMessage = `${stringParameterSymbol}${parameterKey}`;
    if (!message.includes(parameterInMessage)) {
      notFoundParameters.push(parameterInMessage);
    }
    messageWithParameterValues = messageWithParameterValues.replace(
      parameterInMessage,
      parameters[parameterKey],
    );
  });
  if (notFoundParameters.length) {
    let notFoundParametersMessage: string = '';
    notFoundParameters.forEach(
      (parameter) =>
        (notFoundParametersMessage = notFoundParametersMessage.concat(
          `\n- ${parameter.slice(1)}`,
        )),
    );

    throw Error(
      chalk.red(
        `${packageGenerationError['Parameter not found in message']} ${notFoundParametersMessage}`,
      ),
    );
  }
  return messageWithParameterValues;
};

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
  const messageWithParameterValues = getMessageWithParameterValues(
    message,
    parameters,
  );
  throw Error(chalk.red(`${errorType}: ${messageWithParameterValues}`));
};

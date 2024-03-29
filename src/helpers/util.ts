import { stringParametersParser } from '@arondilbe/string-parameters-parser';
import chalk from 'chalk';

import {
  ERROR_MESSAGE,
  MESSAGE_COLOR,
  PARAMETER_SYMBOL,
} from '../configurations/util.js';
import { ErrorType, MessageType } from '../types/util.js';

/**
 * Capitalize a sentence
 * @param {string} sentence The sentence to capitalize
 * @returns {string} The capitalized sentence
 */
export const capitalizeSentence = (sentence: string): string =>
  `${sentence[0].toUpperCase()}${sentence.slice(1)}`;

/**
 * Return a formatted message string (colored and with parameter values set into the message, with an optional prefix)
 * @param {MessageType} messageType The message type
 * @param {string} message The message to format
 * @param {Object=} options Options for the message formatting (optional)
 * @param {Record<string,string>} options.parameters The parameter values to parse into the message (optional)
 * @param {boolean} options.shouldDisplayMessageType Set if the message type should be displayed before the message (optional, false by default)
 * @returns {string} The formatted message
 */
export const getFormattedMessage = (
  messageType: MessageType,
  message: string,
  options?: {
    parameters?: Record<string, string>;
    shouldDisplayMessageType?: boolean;
  },
): string => {
  const { parameters, shouldDisplayMessageType = false } = options || {};

  const color = MESSAGE_COLOR[messageType];
  const messagePrefix = shouldDisplayMessageType
    ? `[${capitalizeSentence(messageType)}] `
    : '';
  const messageToDisplay = parameters
    ? stringParametersParser.getStringWithParameterValues(
        PARAMETER_SYMBOL,
        message,
        parameters,
      )
    : message;

  return chalk[color](`${messagePrefix}${messageToDisplay}`);
};

/**
 * Throw a formatted error message
 * @param {ErrorType} errorType The error type to throw
 * @param {Record<string,string>} parameters The parameter values to parse into the error message
 * @throws {Error} The formatted error message
 */
export const throwError = (
  errorType: ErrorType,
  parameters: Record<string, string>,
): void => {
  throw Error(
    getFormattedMessage('error', ERROR_MESSAGE[errorType], { parameters }),
  );
};

/**
 * Display the messages
 * @param {MessageType} messageType The message type
 * @param {string} message The message to format
 * @param {Object=} options Options for the message display (optional)
 * @param {Record<string,string>} options.parameters The parameter values to parse into the message (optional)
 * @param {boolean} options.shouldDisplayMessageType Set if the message type should be displayed before the message (optional, false by default)
 * @param {boolean} options.isVerbose Set if the information messages should be displayed (optional, false by default)
 */
export const displayMessage = (
  messageType: MessageType,
  message: string,
  options?: {
    parameters?: Record<string, string>;
    shouldDisplayMessageType?: boolean;
    isVerbose?: boolean;
  },
): void => {
  const {
    parameters,
    shouldDisplayMessageType = false,
    isVerbose = false,
  } = options || {};

  if (!isVerbose && messageType == 'information') {
    return;
  }

  // eslint-disable-next-line no-console
  console.log(
    getFormattedMessage(messageType, message, {
      parameters,
      shouldDisplayMessageType,
    }),
  );
};

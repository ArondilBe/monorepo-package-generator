import type { ErrorType, MessageColor, MessageType } from '../types/util.js';

export const PARAMETER_SYMBOL = ':';

export const MESSAGE_COLOR: Record<MessageType, MessageColor> = {
  error: 'red',
  warning: 'yellow',
  success: 'green',
  information: 'blue',
};

export const ERROR_MESSAGE: Record<ErrorType, string> = {
  'Configuration file': 'No configuration file found at: ":path"',
  'Package already exists': 'The package ":name" already exists at ":path"',
  'Sample files folder': 'No sample files folder found at ":path"',
};

export const SUCCESS_MESSAGE = 'Package created at ":path"';

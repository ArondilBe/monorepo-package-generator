import type {
  ErrorType,
  MessageColor,
  MessageType,
  WarningType,
} from '../types/util.js';

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
  'Package types folder':
    'The following package type folders were not found: :types',
  'Package type':
    'The given package type ":type" is not defined in the configuration file',
};

export const WARNING_MESSAGE: Record<WarningType, string> = {
  'Package type':
    'A type has been given for the package but no package types are defined in the configuration file. The new package will contain all files',
};

export const SUCCESS_MESSAGE = 'Package created at ":path"';

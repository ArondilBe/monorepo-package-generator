import type {
  ErrorType,
  InformationType,
  MessageColor,
  MessageType,
  WarningType,
} from '../types/util.js';

import { PACKAGE_JSON_FILE_NAME } from './file.js';

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

export const INFORMATION_MESSAGE: Record<InformationType, string> = {
  'Folder created': 'New package folder created at ":path"',
  'Common files copied': 'All common files copied',
  'Specific files copied': 'Specific files for package type ":type" copied',
  'Package.json modified': `File ${PACKAGE_JSON_FILE_NAME} modified`,
};

export const SUCCESS_MESSAGE = 'Package successfully created at ":path"';

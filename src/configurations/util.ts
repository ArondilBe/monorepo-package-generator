import { PackageGenerationError } from '../types';
export const STRING_PARAMETER_SYMBOL = ':';

export const PACKAGE_GENERATION_ERROR: PackageGenerationError = {
  'Parameter not found in message':
    'The following parameters were not found in the message:',
  'Command argument': "Argument :argument isn't valid for this command",
  'Command value': 'No value passed for argument :argument',
  'Configuration file missing': "File :path doesn't exist",
  'Package already exists': 'Folder :package already exists at :path',
  'Package type': "The following package types doesn't exist: :packageTypes",
  'Sample file folder': 'No sample files folder found at :path',
};

export const SUCCESS_MESSAGES = [
  'New package of type :type created at :path',
  'New package created at :path',
];

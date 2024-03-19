import { PackageGenerationError } from '../types';
export const STRING_PARAMETER_SYMBOL = ':';

export const PACKAGE_GENERATION_ERROR: PackageGenerationError = {
  'Configuration file missing': "File :path doesn't exist",
  'Package already exists': 'Folder :package already exists at :path',
  'Package type': "The following package types doesn't exist: :packageTypes",
  'Sample file folder': 'No sample files folder found at :path',
};

export const SUCCESS_MESSAGES = [
  'New package of type :type created at :path',
  'New package created at :path',
];

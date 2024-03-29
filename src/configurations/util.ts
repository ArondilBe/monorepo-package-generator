import type { PackageGenerationError } from '../types';
export const STRING_PARAMETER_SYMBOL = ':';

export const PACKAGE_GENERATION_ERROR: PackageGenerationError = {
  'Configuration file missing': `File ":path" doesn't exist`,
  'Package already exists': `Folder ":package" already exists at :path`,
  'Package types': `The following package types doesn't exist: :packageTypes`,
  'Package type': `The given package type ":type" isn't defined in the configuration file`,
  'Sample file folder': `No sample files folder found at ":path"`,
  'Files to parse folder': `No folder found with the name ":folder"`,
};

export const SUCCESS_MESSAGES: Record<string, string> = {
  'Typed package': 'New package of type ":type" created at ":path"',
  'Non typed package': 'New package created at ":path"',
};

export type PackageGenerationErrorType =
  | 'Configuration file missing'
  | 'Sample file folder'
  | 'Files to parse folder'
  | 'Package types'
  | 'Package type'
  | 'Package already exists';

export type PackageGenerationError = Record<PackageGenerationErrorType, string>;

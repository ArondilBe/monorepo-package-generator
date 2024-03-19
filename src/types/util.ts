export type PackageGenerationErrorType =
  | 'Configuration file missing'
  | 'Sample file folder'
  | 'Package type'
  | 'Package already exists';

export type PackageGenerationError = Record<PackageGenerationErrorType, string>;

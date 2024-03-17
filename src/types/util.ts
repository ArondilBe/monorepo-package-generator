export type PackageGenerationErrorType =
  | 'Command argument'
  | 'Command value'
  | 'Configuration file missing'
  | 'Sample file folder'
  | 'Package type'
  | 'Package already exists'
  | 'Parameter not found in message';

export type PackageGenerationError = Record<PackageGenerationErrorType, string>;

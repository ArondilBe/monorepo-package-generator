export interface PackageGenerationConfiguration {
  destinationFolderPath: string;
  sampleFilesFolderPath: string;
  packageTypes?: Record<string, string>;
}

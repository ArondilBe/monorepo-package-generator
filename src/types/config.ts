export interface PackageGenerationConfiguration {
  destinationFolderPath: string;
  sampleFilesFolderPath: string;
  libraryName?: string;
  packageTypes?: Record<string, string>;
}

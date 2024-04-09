export interface PackageGenerationConfiguration {
  destinationFolderPath: string;
  sampleFilesFolderPath: string;
  libraryName?: string;
  packageTypes?: {
    mainFolder: string;
    types: Record<string, string>;
  };
}

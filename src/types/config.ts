export type PackageCreationConfiguration = {
  destinationFolderRelativePath: string;
  sampleFilesFolderRelativePath: string;
  version: string;
  packageTypes?: Record<string, string>;
};

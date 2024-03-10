export type PackageCreationConfiguration = {
  destinationFolderRelativePath: string;
  sampleFilesFolderRelativePath: string;
  packagesTypes?: { [key: string]: string };
};

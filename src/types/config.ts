export type PackageCreationConfiguration = {
  newPackages: {
    destinationFolderPath: string;
    version: string;
  };
  sampleFiles: {
    folderPath: string;
    packageTypes: Record<string, string>;
  };
};

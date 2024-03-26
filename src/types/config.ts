export type PackageCreationConfiguration = {
  newPackages: {
    destinationFolderPath: string;
    version: string;
  };
  sampleFiles: {
    folderPath: string;
    filesToParseFolder?: string;
    packageTypes?: Record<string, string>;
  };
};

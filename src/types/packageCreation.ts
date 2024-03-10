export type CreatedPackageFolderInformation = {
  name: string;
  creationFolderLocation: string;
};

export type CreatedPackageSampleFilesInformation = {
  type: string | undefined;
  sampleFilesFolderLocation: string;
};

export type CreatedPackageInformation = CreatedPackageFolderInformation &
  CreatedPackageSampleFilesInformation;

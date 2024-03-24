import type { FoldersAbsolutePath } from './folder';
export type CreatedPackageFolderInformation = {
  name: string;
  creationFolderLocation: string;
};

export type CreatedPackageSampleFilesInformation = {
  type: string | undefined;
  sampleFilesFolderLocation: string;
};

export type PackageInformation = {
  name: string;
  type: string;
};

export type CreatedPackageInformation = PackageInformation & {
  paths: Partial<FoldersAbsolutePath>;
};

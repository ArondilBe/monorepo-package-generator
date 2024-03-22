import type { FoldersAbsolutePath } from './folder';
export type CreatedPackageFolderInformation = {
  name: string;
  creationFolderLocation: string;
};

export type CreatedPackageSampleFilesInformation = {
  type: string | undefined;
  sampleFilesFolderLocation: string;
};

export type CreatedPackageInformation = {
  name: string;
  type: string;
  paths: Partial<FoldersAbsolutePath>;
};

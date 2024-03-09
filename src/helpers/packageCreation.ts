import { cpSync, mkdirSync } from 'fs';

/**
 * Create the package folder
 * @param {string} packageFolderLocation The absolute path of the location where the package will be created
 * @returns {string|undefined} The created package location or (in case of error), undefined
 */
export const createPackageFolder = (
  packageFolderLocation: string,
): string | undefined =>
  mkdirSync(packageFolderLocation, {
    recursive: true,
  });

/**
 * Copy all sample files into the new package folder
 * @param {string} packageFolderLocation The location of the new package folder
 * @param {string} sampleFilesFolderLocation The location of the sample files folder
 */
export const addAllSampleFiles = (
  packageFolderLocation: string,
  sampleFilesFolderLocation: string,
): void => {
  try {
    cpSync(sampleFilesFolderLocation, packageFolderLocation, {
      recursive: true,
    });
  } catch (error) {
    throw Error(`Error while copying sample files: ${error}`);
  }
};

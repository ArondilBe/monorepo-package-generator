import { mkdirSync } from 'fs';

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

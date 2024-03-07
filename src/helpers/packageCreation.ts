import { mkdirSync } from 'fs';
import { resolve } from 'path';

/**
 * Create the package folder
 * @param {string} packageName The name of the package to create
 * @returns {string|undefined} The created package location or (in case of error), undefined
 */
export const createPackageFolder = (
  packageName: string,
  destinationFolderRelativeLocation: string,
): string | undefined =>
  mkdirSync(`${resolve(destinationFolderRelativeLocation)}/${packageName}`, {
    recursive: true,
  });

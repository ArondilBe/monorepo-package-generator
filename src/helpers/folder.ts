import { existsSync } from 'fs';
import { resolve } from 'path';

/**
 * Return the absolute path where the folder will be created
 * @param {string} destinationFolderRelativeLocation The relative path of the location where the folder will be created
 * @param {string} packageName The folder name to create (optional)
 * @returns {string} The absolute path where the folder will be created
 */
export const getFolderCreationLocation = (
  destinationFolderRelativeLocation: string,
  folderName?: string,
): string =>
  `${resolve(destinationFolderRelativeLocation)}${folderName ? `/${folderName}` : ''}`;

/**
 * Check if the package folder exists or not
 * @param {string} folderLocation The absolute path of the location where the folder will be created
 * @returns {boolean} If the folder exists or not
 */
export const doesFolderExists = (folderLocation: string): boolean =>
  existsSync(folderLocation);

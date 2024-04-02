import { cpSync, existsSync } from 'fs';
import { join, resolve } from 'path';

/**
 * Check if a file or a folder exists
 * @param {string} filePath The path of the file
 * @returns {boolean} If the file exists or not
 */
export const doesFileOrFolderExist = (filePath: string): boolean =>
  existsSync(resolve(filePath));

/**
 * Copy files from source to destination
 * @param {string} destinationPath The folder where the files should be copied
 * @param {string} sourcePath The folder from which the files should be copied
 * @param {string[]} foldersToIgnore An array of folder names to be ignored during the copy
 */
export const copyFiles = (
  destinationPath: string,
  sourcePath: string,
  foldersToIgnore?: string[],
): void => {
  cpSync(sourcePath, destinationPath, {
    recursive: true,
    filter: foldersToIgnore
      ? (folder: string) => {
          for (
            let typeIndex = 0;
            typeIndex < foldersToIgnore.length;
            typeIndex += 1
          ) {
            if (
              // Adding the source path to be sure to only skip the package types folder an not some
              // folders/files with the same name in other folders
              folder.includes(join(sourcePath, foldersToIgnore[typeIndex]))
            ) {
              return false;
            }
          }
          return true;
        }
      : undefined,
  });
};

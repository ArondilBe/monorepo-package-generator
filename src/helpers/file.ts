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
 * Copy all the commonFiles
 * @param {string} destinationPath The folder where the common files should be copied
 * @param {string} sourcePath The folder from which the common files should be copied
 * @param {string[]} packageTypeFolders An array of package type folders name to be ignored during the copy
 */
export const copyCommonFiles = (
  destinationPath: string,
  sourcePath: string,
  packageTypeFolders?: string[],
): void => {
  cpSync(sourcePath, destinationPath, {
    recursive: true,
    filter:
      packageTypeFolders && packageTypeFolders.length
        ? (folder: string) => {
            for (
              let typeIndex = 0;
              typeIndex < packageTypeFolders.length;
              typeIndex += 1
            ) {
              if (
                // Adding the source path to be sure to only skip the package types folder an not some
                // folders/files with the same name in other folders
                folder.includes(join(sourcePath, packageTypeFolders[typeIndex]))
              ) {
                return false;
              }
            }
            return true;
          }
        : undefined,
  });
};

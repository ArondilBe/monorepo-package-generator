import { cpSync, existsSync, readFileSync, writeFileSync } from 'fs';
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
  cpSync(sourcePath, resolve(destinationPath), {
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
              folder.includes(
                join(resolve(sourcePath), foldersToIgnore[typeIndex]),
              )
            ) {
              return false;
            }
          }
          return true;
        }
      : undefined,
  });
};

/**
 * Modify the name and the version (if given) of the package.json
 * @param {string} filePath The path of the package.json file
 * @param {string} name The package name
 * @param {string} version The package version (optional)
 */
export const modifyPackageJson = (
  filePath: string,
  name: string,
  version?: string,
): void => {
  const content = JSON.parse(
    readFileSync(resolve(filePath), { encoding: 'utf-8' }),
  );

  content.name = name;
  if (version) {
    content.version = version;
  }

  writeFileSync(resolve(filePath), JSON.stringify(content, null, 2));
};

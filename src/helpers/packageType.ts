import { join, resolve } from 'path';

import { doesFileOrFolderExist } from './file.js';

/**
 * Return an array with all the non existing package types
 * @param {string} sampleFileFolderPath The path of the sample files folder
 * @param {Record<string,string>} packageTypes The list of the package types to check
 * @returns {string[]} An array with all the non existing package types
 */
export const getNonExistingPackageTypeFolders = (
  sampleFileFolderPath: string,
  packageTypes: Record<string, string>,
): string[] => {
  const notFoundPackageTypes: string[] = [];
  Object.keys(packageTypes).forEach((packageType) => {
    if (
      !doesFileOrFolderExist(
        join(resolve(sampleFileFolderPath), packageTypes[packageType]),
      )
    ) {
      notFoundPackageTypes.push(packageType);
    }
  });

  return notFoundPackageTypes;
};

/**
 * Return a string list of non existing package types
 * @param {string[]} nonExistingPackageTypes Array of package types that were not found
 * @returns {string} The formatted string lits
 */
export const getListOfNonExistingPackageTypes = (
  nonExistingPackageTypes: string[],
): string => `\n- ${nonExistingPackageTypes.join('\n- ')}`;

/**
 * Check if a given package typ exists in a given array of package types
 * @param {string} targetedPackageTypes The package type to search
 * @param {string[]} packageTypes The package types array on which the search will be performed
 * @returns {boolean} If the package type has been found or not
 */
export const isPackageTypeDefined = (
  targetedPackageTypes: string,
  packageTypes: string[],
): boolean => packageTypes.includes(targetedPackageTypes);

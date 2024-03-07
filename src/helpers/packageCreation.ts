import { mkdirSync } from 'fs';

/**
 * Create the package folder
 * @param {string} packageName The name of the package to create
 * @returns {string|undefined} The created package location or (in case of error), undefined
 */
export const createPackageFolder = (packageName: string): string | undefined =>
  mkdirSync(`${process.cwd()}/${packageName}`, { recursive: true });

import { existsSync } from 'fs';
import { resolve } from 'path';

/**
 *
 * @param {string} filePath The path of the file
 * @returns {boolean} If the file exists or not
 */
export const doesFileOrFolderExist = (filePath: string): boolean =>
  existsSync(resolve(filePath));

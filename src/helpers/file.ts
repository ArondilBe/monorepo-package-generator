import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

import { file as fileConfigurations } from '../configurations';

/**
 * Return if the package contains a package.json file
 * @param {string} packageLocation The package to check path
 * @returns {boolean} If the package contains a package.json file
 */
export const doesPackageHasAPackageJson = (packageLocation: string): boolean =>
  existsSync(
    resolve(join(packageLocation, fileConfigurations.PACKAGE_JSON_FILE_NAME)),
  );

export const modifyPackageJsonInformation = async (
  filePath: string,
  name: string,
  version?: string,
): Promise<void> => {
  const packageJsonFilePath = resolve(
    join(filePath, fileConfigurations.PACKAGE_JSON_FILE_NAME),
  );
  const packageJsonContent = JSON.parse(
    readFileSync(packageJsonFilePath, { encoding: 'utf-8' }),
  );
  packageJsonContent.name = name;
  if (version) {
    packageJsonContent.version = version;
  }
  writeFileSync(
    packageJsonFilePath,
    JSON.stringify(packageJsonContent, null, 2),
  );
};

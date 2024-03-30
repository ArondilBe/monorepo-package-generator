import { PackageGenerationInformation } from '../types/packageGeneration.js';

import { getPackageGenerationInformation } from './packageGeneration.js';

export const packageGenerationInformationFull: PackageGenerationInformation = {
  configurationFilePath: './packageGeneration.config.json',
  name: 'packageName',
  type: 'packageType',
  version: '0.0.1',
  isVerbose: true,
};

export const packageGenerationInformationWithoutType: PackageGenerationInformation =
  {
    configurationFilePath: './packageGeneration.config.json',
    name: 'packageName',
    version: '0.0.1',
    isVerbose: true,
  };

export const packageGenerationInformationWithoutVersion: PackageGenerationInformation =
  {
    configurationFilePath: './packageGeneration.config.json',
    name: 'packageName',
    type: 'packageType',
    isVerbose: true,
  };

export const packageGenerationInformationWithoutVerbose: PackageGenerationInformation =
  {
    configurationFilePath: './packageGeneration.config.json',
    name: 'packageName',
    type: 'packageType',
    version: '0.0.1',
  };

export const packageGenerationInformationOnlyMandatory: PackageGenerationInformation =
  {
    configurationFilePath: './packageGeneration.config.json',
    name: 'packageName',
  };

describe('getPackageGenerationInformation', () => {
  it('Get full information', () => {
    expect(
      getPackageGenerationInformation({
        configurationFile:
          packageGenerationInformationFull.configurationFilePath,
        packageName: packageGenerationInformationFull.name,
        packageType: packageGenerationInformationFull.type,
        packageVersion: packageGenerationInformationFull.version,
        verbose: packageGenerationInformationFull.isVerbose,
      }),
    ).toEqual(packageGenerationInformationFull);
  });

  it('Get information without type', () => {
    expect(
      getPackageGenerationInformation({
        configurationFile:
          packageGenerationInformationFull.configurationFilePath,
        packageName: packageGenerationInformationFull.name,
        packageVersion: packageGenerationInformationFull.version,
        verbose: packageGenerationInformationFull.isVerbose,
      }),
    ).toEqual(packageGenerationInformationWithoutType);
  });

  it('Get information without version', () => {
    expect(
      getPackageGenerationInformation({
        configurationFile:
          packageGenerationInformationFull.configurationFilePath,
        packageName: packageGenerationInformationFull.name,
        packageType: packageGenerationInformationFull.type,
        verbose: packageGenerationInformationFull.isVerbose,
      }),
    ).toEqual(packageGenerationInformationWithoutVersion);
  });

  it('Get information without verbose', () => {
    expect(
      getPackageGenerationInformation({
        configurationFile:
          packageGenerationInformationFull.configurationFilePath,
        packageName: packageGenerationInformationFull.name,
        packageType: packageGenerationInformationFull.type,
        packageVersion: packageGenerationInformationFull.version,
      }),
    ).toEqual(packageGenerationInformationWithoutVerbose);
  });

  it('Get information only mandatory', () => {
    expect(
      getPackageGenerationInformation({
        configurationFile:
          packageGenerationInformationFull.configurationFilePath,
        packageName: packageGenerationInformationFull.name,
      }),
    ).toEqual(packageGenerationInformationOnlyMandatory);
  });
});

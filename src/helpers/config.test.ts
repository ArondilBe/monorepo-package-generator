import type { PackageCreationConfiguration } from '../types';

import * as config from './config';

const packageCreationConfiguration: Record<
  string,
  PackageCreationConfiguration
> = {
  fromObject: {
    destinationFolderRelativePath: '../fakeDestinationFolder',
    sampleFilesFolderRelativePath: '../fakeSampleFilesFolder',
    packageTypes: {
      'fake type': 'fakeType',
    },
    version: '0.0.2',
  },
  fromFile: {
    destinationFolderRelativePath: './packages',
    sampleFilesFolderRelativePath: './sampleFilesExamples',
    packageTypes: {
      helper: 'helperPackage',
      content: 'contentPackage',
    },
    version: '0.1.0',
  },
};

describe('getPackageCreationConfiguration', () => {
  it('Existing config file', async () => {
    expect(
      await config.getPackageCreationConfigurationFromFile(
        './packageGenerationExample.config.json',
      ),
    ).toEqual(packageCreationConfiguration.fromFile);
  });

  it('Non existing config file', () => {
    async () => {
      expect(
        await config.getPackageCreationConfigurationFromFile(
          './packageGenerationExample.json',
        ),
      ).toThrow(Error);
    };
  });
});

describe('checkIfPackageTypesAreDefined', () => {
  it('No package types defined (undefined)', () => {
    expect(config.arePackageTypesAreDefined()).toEqual(false);
  });

  it('No package types defined (empty)', () => {
    expect(config.arePackageTypesAreDefined({})).toEqual(false);
  });

  it('Package types defined', () => {
    expect(
      config.arePackageTypesAreDefined({
        content: 'content',
        typescript: 'tsPackage',
      }),
    ).toEqual(true);
  });
});

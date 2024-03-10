import { PackageCreationConfiguration } from '../types';

import * as configFile from './configFile';

const config: PackageCreationConfiguration = {
  destinationFolderRelativePath: './packages',
  sampleFilesFolderRelativePath: './sampleFilesExamples',
  packagesTypes: {
    helper: 'helperPackage',
    content: 'contentPackage',
  },
};

describe('getPackageCreationConfiguration', () => {
  it('Existing config file', async () => {
    expect(
      await configFile.getPackageCreationConfiguration(
        './packageGenerationExample.config.json',
      ),
    ).toEqual(config);
  });

  it('Non existing config file', () => {
    async () => {
      expect(
        await configFile.getPackageCreationConfiguration(
          './packageGenerationExample.json',
        ),
      ).toThrow(Error);
    };
  });
});

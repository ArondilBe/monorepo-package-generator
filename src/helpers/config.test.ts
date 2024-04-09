import { PackageGenerationConfiguration } from '../types/config.js';

import { getPackageGenerationConfigurationFromFile } from './config.js';

const packageGenerationConfiguration: PackageGenerationConfiguration = {
  destinationFolderPath: './packages',
  sampleFilesFolderPath: './sampleFilesExample',
  libraryName: '@arondilbe',
  packageTypes: {
    mainFolder: 'packageTypes',
    types: {
      content: 'content',
      util: 'util',
    },
  },
};

describe('getPackageGenerationConfigurationFromFile', () => {
  it("File doesn't exist", () => {
    expect(() =>
      getPackageGenerationConfigurationFromFile(
        './packageGeneration.config.json',
      ),
    ).toThrow(Error);
  });

  it('Return configuration', () => {
    expect(
      getPackageGenerationConfigurationFromFile(
        './packageGenerationExample.config.json',
      ),
    ).toEqual(packageGenerationConfiguration);
  });
});

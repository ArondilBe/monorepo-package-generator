import { PackageGenerationConfiguration } from '../types/config.js';

import { getPackageGenerationConfigurationFromFile } from './config.js';

const packageGenerationConfiguration: PackageGenerationConfiguration = {
  destinationFolderPath: './packages',
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

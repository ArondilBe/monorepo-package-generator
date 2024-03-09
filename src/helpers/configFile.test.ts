import { configFile as configFileTypes } from '../types';

import * as configFile from './configFile';

const config: configFileTypes.PackageCreationConfiguration = {
  destinationFolderRelativePath: './packages',
  sampleFilesFolderRelativePath: './sampleFilesExamples',
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

import { PackageCreationConfiguration } from 'types';

import { packageCreation } from '../helpers';

const packageGenerationConfiguration: PackageCreationConfiguration = {
  newPackages: {
    destinationFolderPath: './packages',
    version: '0.1.0',
  },
  sampleFiles: {
    folderPath: './sampleFilesExamples',
    filesToParseFolder: 'filesToParse',
    packageTypes: {
      helper: 'helperPackage',
      content: 'contentPackage',
    },
  },
};

(async () => {
  await packageCreation.generatePackage({
    packageGenerationConfiguration,
    packageInformation: { name: 'newPackage', type: 'helper' },
  });
})();

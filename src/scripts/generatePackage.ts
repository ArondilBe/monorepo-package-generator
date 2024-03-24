import { PackageCreationConfiguration } from 'types';

import { packageCreation } from '../helpers';

const packageGenerationConfiguration: PackageCreationConfiguration = {
  destinationFolderRelativePath: './packages',
  sampleFilesFolderRelativePath: './sampleFilesExamples',
  version: '0.1.0',
  packageTypes: {
    helper: 'helperPackage',
    content: 'contentPackage',
  },
};

(async () => {
  await packageCreation.generatePackage({
    packageGenerationConfiguration,
    packageInformation: { name: 'newPackage', type: 'helper' },
  });
})();

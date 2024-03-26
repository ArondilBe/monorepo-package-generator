import { packageCreation } from '../helpers';
import { PackageCreationConfiguration } from '../types';

const packageGenerationConfiguration: PackageCreationConfiguration = {
  newPackages: {
    destinationFolderPath: './packages',
    version: '0.1.0',
  },
  sampleFiles: {
    folderPath: './sampleFilesExamples',
    filesToParseFolder: 'fileToParse',
    packageTypes: {
      helper: {
        folderName: 'helperPackage',
      },
      content: {
        folderName: 'contentPackage',
      },
    },
  },
};

(async () => {
  await packageCreation.generatePackage({
    packageGenerationConfiguration,
    packageInformation: { name: 'newPackage', type: 'helper' },
  });
})();

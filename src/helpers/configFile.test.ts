import type { PackageCreationConfiguration } from '../types';

import * as configFile from './configFile';

let originalArgv: string[];

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
  },
  fromFile: {
    destinationFolderRelativePath: './packages',
    sampleFilesFolderRelativePath: './sampleFilesExamples',
    packageTypes: {
      helper: 'helperPackage',
      content: 'contentPackage',
    },
  },
};

const processArgv = [
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\User\\Desktop\\monorepo-package-generator\\esm\\scripts\\generatePackage.js',
  '--config',
  './packageGenerationExample.config.json',
];

describe('getPackageCreationConfiguration', () => {
  it('Existing config file', async () => {
    expect(
      await configFile.getPackageCreationConfigurationFromFile(
        './packageGenerationExample.config.json',
      ),
    ).toEqual(packageCreationConfiguration.fromFile);
  });

  it('Non existing config file', () => {
    async () => {
      expect(
        await configFile.getPackageCreationConfigurationFromFile(
          './packageGenerationExample.json',
        ),
      ).toThrow(Error);
    };
  });
});

describe('checkIfPackageTypesAreDefined', () => {
  it('No package types defined (undefined)', () => {
    expect(configFile.arePackageTypesAreDefined()).toEqual(false);
  });

  it('No package types defined (empty)', () => {
    expect(configFile.arePackageTypesAreDefined({})).toEqual(false);
  });

  it('Package types defined', () => {
    expect(
      configFile.arePackageTypesAreDefined({
        content: 'content',
        typescript: 'tsPackage',
      }),
    ).toEqual(true);
  });
});

describe('getPackageCreationConfiguration', () => {
  beforeEach(() => {
    jest.resetModules();
    originalArgv = process.argv;
  });

  afterEach(() => {
    jest.resetAllMocks();
    process.argv = originalArgv;
  });

  it('Get configuration from object (no argument passed through command line)', async () => {
    expect(
      await configFile.getPackageCreationConfiguration(
        packageCreationConfiguration.fromObject,
      ),
    ).toEqual(packageCreationConfiguration.fromObject);
  });

  it('Get configuration from object (with argument passed through command line)', async () => {
    process.argv = processArgv;
    expect(
      await configFile.getPackageCreationConfiguration(
        packageCreationConfiguration.fromObject,
      ),
    ).toEqual(packageCreationConfiguration.fromObject);
  });

  it('Get configuration from argument passed through command line', async () => {
    process.argv = processArgv;
    expect(await configFile.getPackageCreationConfiguration()).toEqual(
      packageCreationConfiguration.fromFile,
    );
  });
});

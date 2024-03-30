import { Argv, CommandModule } from 'yargs';

import { generatePackage } from '../helpers/packageGeneration.js';
import { GeneratePackageOptions } from '../types/command.js';
import { PackageGenerationInformation } from '../types/packageGeneration.js';

export const GENERATE_PACKAGE_OPTIONS: GeneratePackageOptions = {
  configurationFile: {
    describe: 'The configuration file path',
    alias: ['config', 'c'],
    type: 'string',
    demandOption: true,
    default: './packageGeneration.config.json',
  },
  packageName: {
    describe: "The package to generate's name",
    alias: ['name', 'n'],
    type: 'string',
    demandOption: true,
  },
  packageType: {
    describe: "The package to generate's type (based on defined package types)",
    alias: ['type', 't'],
    type: 'string',
    demandOption: false,
  },
  packageVersion: {
    describe: "The package to generate's version",
    alias: 'pVersion',
    type: 'string',
    demandOption: false,
  },
  verbose: {
    describe: 'Set if all the messages should be displayed',
    type: 'boolean',
    demandOption: false,
    default: false,
  },
};

export const GENERATE_PACKAGE_COMMAND: CommandModule<
  Record<string, PackageGenerationInformation>
> = {
  command: 'generate-package',
  describe: 'Generate a package based on some options',
  builder: (yargs: Argv) => yargs.options(GENERATE_PACKAGE_OPTIONS),
  handler: async (argv) => {
    const {
      configurationFile,
      packageName,
      packageType,
      packageVersion,
      verbose,
    } = argv;
    generatePackage({
      configurationFile: configurationFile as string,
      packageName: packageName as string,
      packageType: packageType as string,
      packageVersion: packageVersion as string,
      verbose: verbose as boolean,
    });
  },
};

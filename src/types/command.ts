import { Options } from 'yargs';

export type GeneratePackageOptions = {
  configurationFile: Options;
  packageName: Options;
  packageType: Options;
  packageVersion: Options;
  verbose: Options;
};

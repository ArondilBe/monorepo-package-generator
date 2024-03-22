import { Options } from 'yargs';

export type CommandOptions = {
  config: Options;
  name: Options;
  type: Options;
};

export type CommandParameters = {
  config: string;
  name: string;
  type: string;
};

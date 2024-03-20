import type { CommandOptions } from '../types';
export const ARGUMENT_SYMBOL = '--';

export const COMMAND_OPTIONS: CommandOptions = {
  config: {
    type: 'string',
    description: 'Relative path to the configuration file',
    demandOption: true,
    alias: 'c',
    default: './packageGeneration.config.json',
  },
  name: {
    type: 'string',
    description: "Package to generate's name",
    alias: 'n',
  },
  type: {
    type: 'string',
    description: "Package to generate's type",
    alias: 't',
  },
};

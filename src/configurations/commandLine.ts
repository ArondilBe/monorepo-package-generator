import { commandLine as commandLineTypes } from '../types';
export const ARGUMENT_INDICATOR = '--';

export const DEFAULT_COMMAND_OPTIONS: Partial<commandLineTypes.CommandOptions> =
  {
    config: './packageGeneration.config.json',
  };

import { commandLine as commandLineConfigurations } from '../configurations';
import { CommandOptions } from '../types';

import * as commandLineHelpers from './commandLine';

const fullyPromptedCommandOptions: CommandOptions = {
  config: './src/packageGenerationExample.config.json',
};

const undefinedPromptedCommandOptions: CommandOptions = {
  config: undefined,
};

describe('getCommandOptionsFromArgs', () => {
  it('Argument without value', () => {
    () =>
      expect(
        commandLineHelpers.getCommandOptionsFromArgs(['--config']),
      ).toThrow(Error);
  });

  it('Invalid argument', () => {
    () =>
      expect(
        commandLineHelpers.getCommandOptionsFromArgs([
          '--configuration',
          './src/packageGenerationExample.config.json',
        ]),
      ).toThrow(Error);
  });

  it('Valid argument', () => {
    () =>
      expect(
        commandLineHelpers.getCommandOptionsFromArgs([
          '--config',
          './src/packageGenerationExample.config.json',
        ]),
      ).toThrow(Error);
  });
});

describe('getCommandOptionsWithDefaultValues', () => {
  it('All parameter are defined', () => {
    expect(
      commandLineHelpers.getCommandOptionsWithDefaultValues(
        fullyPromptedCommandOptions,
      ),
    ).toEqual(fullyPromptedCommandOptions);
  });

  it('Config parameter is undefined', () => {
    expect(
      commandLineHelpers.getCommandOptionsWithDefaultValues(
        undefinedPromptedCommandOptions,
      ),
    ).toEqual(commandLineConfigurations.DEFAULT_COMMAND_OPTIONS);
  });
});

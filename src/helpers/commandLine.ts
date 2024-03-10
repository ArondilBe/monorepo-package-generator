import chalk from 'chalk';
import inquirer from 'inquirer';

import { commandLine as commandLineConfigurations } from '../configurations';
import { CommandOptions } from '../types';

/**
 * Return an object containing all the command arguments values
 * @param {string[]} args The arguments passed by the command
 * @returns {CommandLineOptions} The command line arguments values
 * @throws {Error} If one argument is invalid or has no value
 */
export const getCommandOptionsFromArgs = (args: string[]) => {
  const { ARGUMENT_INDICATOR: argumentIndicator } = commandLineConfigurations;
  const commandOptions: CommandOptions = {
    config: undefined,
  };
  const commandLineKeys = Object.keys(commandOptions);
  for (let argIndex = 0; argIndex < args.length; argIndex += 1) {
    const currentArg = args[argIndex];
    if (currentArg.startsWith(argumentIndicator)) {
      const key = currentArg.slice(2);
      if (!commandLineKeys.includes(key)) {
        throw Error(
          chalk.red(`Argument ${currentArg} isn't valid for this command`),
        );
      }
      if (!args[argIndex + 1]) {
        throw Error(chalk.red(`No value passed for argument ${currentArg}`));
      }
      commandOptions[key as keyof CommandOptions] = args[argIndex + 1];
    }
  }

  return commandOptions;
};

/**
 * Return the command options with the default value put for undefined options
 * @param {CommandOptions} promptedCommandOptions The command options from the command line
 * @returns {CommandOptions} The command options with the default value put for undefined options
 */
export const getCommandOptionsWithDefaultValues = (
  promptedCommandOptions: CommandOptions,
): CommandOptions => {
  const { DEFAULT_COMMAND_OPTIONS: defaultCommandOptions } =
    commandLineConfigurations;
  const commandOptions = structuredClone(promptedCommandOptions);
  const commandOptionsKeys = Object.keys(defaultCommandOptions);
  commandOptionsKeys.forEach((commandOptionKey) => {
    const typedKey = commandOptionKey as keyof CommandOptions;
    if (!promptedCommandOptions[typedKey]) {
      commandOptions[typedKey] = defaultCommandOptions[typedKey];
    }
  });
  return commandOptions;
};

/**
 * Return the command options based on the command line args
 * @returns {CommandOptions} The command options
 */
export const getCommandOptions = (): CommandOptions => {
  const commandArguments = process.argv.slice(2);
  return getCommandOptionsWithDefaultValues(
    getCommandOptionsFromArgs(commandArguments),
  );
};

/**
 * Ask information to the user to generate the package
 * @returns {string} the package name
 */
export const askPackageInformation = async (): Promise<string> => {
  const askedPackageName = await inquirer.prompt({
    name: 'package_name',
    type: 'input',
    message: 'What is the name of the package ?',
    default() {
      return 'PackageName';
    },
  });
  return askedPackageName.package_name;
};

/**
 * Ask information to the user to generate the package
 * @param {string[]} packageTypesKeys The keys of the different packages types
 * @returns {string} the package type to create
 */
export const askPackageType = async (
  packageTypesKeys: string[],
): Promise<string> => {
  const askedPackageType = await inquirer.prompt({
    name: 'package_type',
    type: 'list',
    choices: packageTypesKeys,
    message: 'Which type of package should be created ?',
    default() {
      return 'packageType';
    },
  });

  return askedPackageType.package_type;
};

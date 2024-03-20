import inquirer from 'inquirer';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { commandLine as commandLineConfigurations } from '../configurations';
import type { CommandParameters } from '../types';

/**
 * Return the command options based on the command line args
 * @returns {Promise<CommandParameters>} The command parameters
 */
export const getCommandOptions = async (): Promise<CommandParameters> => {
  const commandArguments = await yargs(hideBin(process.argv)).options(
    commandLineConfigurations.COMMAND_OPTIONS,
  ).argv;
  return {
    config: commandArguments.config as string,
  };
};

/**
 * Ask information to the user to generate the package
 * @returns {string} the package name
 */
export const askPackageName = async (): Promise<string> => {
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

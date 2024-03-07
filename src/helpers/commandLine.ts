import inquirer from 'inquirer';

/**
 * Ask information to the user to generate the package
 * @returns {string} the package name
 */
export const askPackageInformation = async (): Promise<string> => {
  const packageInformation = await inquirer.prompt({
    name: 'package_name',
    type: 'input',
    message: 'What is the name of the package ?',
    default() {
      return 'PackageName';
    },
  });
  const packageName = packageInformation.package_name;
  return packageName;
};

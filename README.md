# @arondilbe/monorepo-package-generator

## Table of Contents

- [@arondilbe/monorepo-package-generator](#arondilbemonorepo-package-generator)
  - [Table of Contents](#table-of-contents)
  - [About tre package](#about-tre-package)
  - [How to generate package](#how-to-generate-package)
    - [Create the configuration file](#create-the-configuration-file)
    - [Create the sample files folder](#create-the-sample-files-folder)
    - [Call the package generation function](#call-the-package-generation-function)
  - [Contributing to this project](#contributing-to-this-project)
    - [Git process](#git-process)
      - [Branching and commit convention](#branching-and-commit-convention)
      - [Submitting code](#submitting-code)
      - [Behavior](#behavior)
    - [Coding rules](#coding-rules)
      - [Files](#files)
      - [Code conventions](#code-conventions)

## About tre package

The package @arondilbe/monorepo-package-generator's goal is to standardize and ease the way of creating packages in monorepo. It allows the user to generate new packages based on sample models. All this, based on a configuration file.

## How to generate package

### Create the configuration file

The first thing to do is to create and set the package creation's configuration file. It is easy to set up. First, you need to create a **`.json`** file.

Inside this configuration file you'll need to define some parameters:

- **`destinationFolderRelativePath`**: The relative path of the folder into which your packages will be generated (if some folders included in the path don't exist they'll be created too)
- **`sampleFilesFolderRelativePath`**: The relative path of the folder which will contains your sample files
- **`packagesTypes`**: An object containing a list of the packages types that can be generated. Each package type is a **`Record`** composed of a **`key`** which will used as the **package type's name** and a **`value`** which should be the **name of a subfolder included into the main sample files folder**

Here's an example of a package generation configuration file:

```json
{
  "destinationFolderRelativePath": "./packages",
  "sampleFilesFolderRelativePath": "./sampleFilesExamples",
  "packageTypes": {
    "helper": "helperPackage",
    "content": "contentPackage"
  }
}
```

### Create the sample files folder

The next step is to create a sample files folder which will contain all the files that will be copied in the generated packages. The files can be placed into folders which will also be copied.

If you want to create several packages types to generate you can places your files into folders with the same names as defined in the configuration files.

### Call the package generation function

To call the package generation function, you can create a script calling the function **`generatePackage`** from the **`packageCreation`** **helper**.

This function can take the **`relative path of a configuration file`** as an **optional** parameter if you want to call the function directly in another piece of code instead of calling it by a command.

If you decide to call the package generation function by a command you'll have to pass the **`relative path of a configuration file`** in the **command line** with the argument **`--config`**.

Here's an example of a command definition to call the package generation:

```json
 "scripts": {
    "package:generate": "node ./esm/scripts/generatePackage.js --config ./packageGenerationExample.config.json"
  },
```

## Contributing to this project

There are some rules to respect to contribute to this projects for both git process and code conventions.

### Git process

#### Branching and commit convention

- You should create your branch using git flow:
  - **main** branch should be set for **production releases**
  - **develop** branch should be set for **next release development**
  - All other options should keep their default values
- You should always create a branch for a new modification
- Your modification should be scoped and not modify too much stuff
- You should build your commit using the command **`yarn commit`**
  - Your commit message should follow those [best practices](https://cbea.ms/git-commit/)
  - Do not set **Breaking change** to **yes** unless it's really the case
  - Always link your modification to an existing issue

#### Submitting code

- Always create a pull request
- Always put **Arondilbe** as reviewer on your pull request
- Do not push a new commit on your branch until you got all the reviewers feedbacks

#### Behavior

- Do not take comments personally
- If you don't agree on a comment discuss it with the reviewer
- Make constructive comments
- Do not let a pull request unreviewed for too long

### Coding rules

#### Files

- All files name should be in **camel case**
- All code file should be written in **typescript**
- All files should be organized into the different folders

#### Code conventions

- Never use **`var`** use **`let`** instead
- Avoid **nested** code
- Always type
- Always add a clear **`function declaration`**
- Add clear **`jsdoc`** to your functions
- Add **`unit tests`** when it's possible
- No static values outside configuration files
- Variable and functions names should be written in **camel case**
- Configurations variables should be written in **const case**

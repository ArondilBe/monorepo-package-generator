# @arondilbe/monorepo-package-generator

## Table of Contents

- [@arondilbe/monorepo-package-generator](#arondilbemonorepo-package-generator)
  - [Table of Contents](#table-of-contents)
  - [About tre package](#about-tre-package)
  - [How to generate package](#how-to-generate-package)
    - [Add the sample files](#add-the-sample-files)
      - [Example of sample files folder](#example-of-sample-files-folder)
    - [Create the configuration file](#create-the-configuration-file)
      - [Example of configuration file](#example-of-configuration-file)
      - [Using an object instead of a file](#using-an-object-instead-of-a-file)
    - [Using the package generation script](#using-the-package-generation-script)
      - [Command options](#command-options)

## About tre package

The goal of @arondilbe/monorepo-package-generator is the ease the way of creating packages in a monorepo based on sample files.
The idea is to have a short configuration file and then as many as package types as wanted.

## How to generate package

### Add the sample files

The first thing to do is to create a **folder** which will contains all the sample files used for data generation. This **folder's name** doesn't matter and it can placed **anywhere**.

The sample files folder can be structure in **two ways**:

- **All files** directly placed in the main folder
- Creating sub folders into the main one to create **package types**

The sample files can be of **any type**.

#### Example of sample files folder

**No package types**:

- Sample files folder:
  - File1
  - File2
  - ...
  - FileX

**Package types**:

- Sample files folder:
  - Sub folder 1:
    - File1
    - File2
  - Sub folder 2:
    - File1
    - File2
    - ...
    - FileX
  - ...
  - Sub folder X:
    - File1

### Create the configuration file

The next step is to create a `.json` configuration file. This file can be placed **anywhere** and its **name** doesn't matter (the **default name** use by the script, if no other file name is defined, will be `./packageGeneration.config.json`).

The package generation require **a few** parameters:

- **destinationFolderRelativePath**: `[string]` The relative path of the folder where the new packages should be created
- **sampleFilesFolderRelativePath**: `[string]` The relative path of the folder containing the sample files
- **version**: `[string]` Optional parameter. The version to set into the `package.json` file (for packages having one)
- **packageTypes**: `[Record<string,string>]` Optional parameter. A list of package types that can be created. The **key** is the value used to **identify** the package type and the **value** is the **name** of the corresponding **sub folder**

#### Example of configuration file

**packageGenerationExample.config.json**:

```json
{
  "destinationFolderRelativePath": "./packages",
  "sampleFilesFolderRelativePath": "./sampleFilesExamples",
  "version": "0.1.0",
  "packageTypes": {
    "helper": "helperPackage",
    "content": "contentPackage"
  }
}
```

#### Using an object instead of a file

If you don't want to use a configuration file you can also define an **object** of type `PackageCreationConfiguration`:

```typescript
export type PackageCreationConfiguration = {
  destinationFolderRelativePath: string;
  sampleFilesFolderRelativePath: string;
  version: string;
  packageTypes?: Record<string, string>;
};

const configurationObject: PackageCreationConfiguration = {
  destinationFolderRelativePath: '../fakeDestinationFolder',
  sampleFilesFolderRelativePath: '../fakeSampleFilesFolder',
  packageTypes: {
    'fake type': 'fakeType',
  },
  version: '0.0.2',
};
```

### Using the package generation script

To call the package generation script you can call the command `generatePackage`

The command will start a prompt in which you'll be asked the package name and the package type (if package types are defined).

If your new package contains a `package.json` file its **name property** will by replaced by the **name you gave to the package** and if a **version** is defined in the **configuration file** it will replace its **version property**.

**Example**

```
yarn generatePackage
```

#### Command options

The `generatePackage` command can takes several arguments. The most important being `--config` or `-c` followed by the **relative path** of your configuration file.

You can also pass arguments to bypass the prompt and generate your package directly:

- `--name` or `-n`: To pass the package's name
- `--type` or `-t`: To pass the package's type (if package types are defined)

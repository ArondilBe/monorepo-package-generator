# @arondilbe/monorepo-package-generator

## Table of Contents

- [@arondilbe/monorepo-package-generator](#arondilbemonorepo-package-generator)
  - [Table of Contents](#table-of-contents)
  - [About @arondilbe/monorepo-package-generator](#about-arondilbemonorepo-package-generator)
  - [How does it work ?](#how-does-it-work-)
    - [Adding the configuration](#adding-the-configuration)
    - [How to use the package generation command ?](#how-to-use-the-package-generation-command-)
      - [Setting the package parameters](#setting-the-package-parameters)
  - [Breakthrough](#breakthrough)

## About @arondilbe/monorepo-package-generator

The main goal of @arondilbe/monorepo-package-generator is to provide a easy to use tool to generate packages for mono-repositories.

## How does it work ?

The monorepo package generator use sample files and a small configuration to create new packages. It allows the user to generate packages based on some common files which will be used for all new packages and also some specific ones which will be added only if the package to create is from a certain type.

### Adding the configuration

In order to use the command, you'll also need a `.json` configuration file containing some information:

```json
{
  "destinationFolderPath": "./packages",
  "sampleFilesFolderPath": "./sampleFilesExample",
  "libraryName": "@arondilbe",
  "packageTypes": {
    "mainFolder": "packageTypes",
    "types": {
      "content": "content",
      "util": "util"
    }
  }
}
```

Note that the `packageTypes` property is **optional**. If not defined, **all** files will be **copied** for all new packages.

- **destinationFolderPath**: `string` The path to the folder were the new packages will be created
- **sampleFilesFolderPath**: `string` The path to the folder containing the files used as models for the new packages
- **libraryName**: `string` A common part to be put before the package name in the package.json file
- **packageTypes**: An object containing information about the package types:

  - **mainFolder**: `string` The name of the folder containing all the package type folders
  - **types**: `Record<string,string>`: An object containing pairs key/value pairs. The **key** is the **package type** and the **value** is the **folder name**. For instance if you have a package type named **util** which has its files contained in the folder **utilPackage** (the folder should be in the **sample files folder**), you'll have:

  ```json
  "packageTypes": {
    "mainFolder": "packageTypes",
    "types": {
      "content": "content",
      "util": "util"
    }
  }
  ```

### How to use the package generation command ?

To launch the package generation you can call the command `generatePackage generate-package`:

```bash
npm generatePackage generate-package --config pathToTheConfigFile
```

```bash
yarn generatePackage generate-package --config pathToTheConfigFile
```

#### Setting the package parameters

By using some command parameters you can define three settings for your package:

- **The name**: `--name` The name of your package (**mandatory**)
- **The type**: `--type` The type of your package (**optional**). The value should be one of the **keys** defined in **packageTypes**
- **The version**: `--packageVersion`: The version of the package (**optional**)

```bash
yarn generatePackage generate-package --config pathToTheConfigFile --name newPackage --type myPackageType --packageVersion 0.10
```

For more information you check the command help by using the parameter `--help`:

```bash
yarn generatePackage generate-package --help
```

If you want more feedbacks during the package generation you can use the parameter `--verbose`:

```bash
yarn generatePackage generate-package --config pathToTheConfigFile --name newPackage --type myPackageType --packageVersion 0.10 --verbose
```

It will then return a information message after each step of the package generation.

## Breakthrough

The package generation starts when you enter the command. It will then create a **new folder** with the **name** you gave and at the **destination folder** defined in the **configuration file**.

After that it will **copy** all **common** files (or **all** files if you didn't defined any **package type** ).

If you defined some **package types** and you specified the **type** of the new **package** it will also copy **all** files contained in the given **package type** folder. If some files with the **same name** and at the **same final location** exist for both **common** and **specific** files, the **specific** ones will replace the **common** ones.

If your new package contains a `package.json` file it will modify the **package name** and the **package version** (if you provided one in the command).

import { join } from 'path';

import * as folder from './folder';

const sampleFilesFolderLocation = {
  valid: {
    relativePath: './sampleFilesExamples',
    absolutePath: join(process.cwd(), 'sampleFilesExamples'),
  },
  invalid: {
    relativePath: './sampleFilesExample',
  },
};

const packagesTypes: Record<string, Record<string, string>> = {
  valid: {
    helper: 'helperPackage',
    content: 'contentPackage',
  },
  invalid: {
    helper: 'helperPackage',
    content: 'contentPackage',
    ts: 'typescriptPackage',
    js: 'javascriptcriptPackage',
  },
};

describe('getFolderCreationLocation', () => {
  it('Get a folder absolute path', () => {
    expect(folder.getFolderLocation('./', 'src')).toEqual(
      `${join(process.cwd(), 'src')}`,
    );
  });
});

describe('doesFolderExists', () => {
  it('Existing folder', () => {
    expect(folder.doesFolderExists(`${join(process.cwd(), 'src')}`)).toEqual(
      true,
    );
  });

  it('Non existing folder', () => {
    expect(folder.doesFolderExists(`${join(process.cwd(), 'srd')}`)).toEqual(
      false,
    );
  });
});

describe('getSampleFilesFolderLocation', () => {
  it('Existing folder', () => {
    expect(
      folder.getSampleFilesFolderLocation(
        sampleFilesFolderLocation.valid.relativePath,
      ),
    ).toEqual(sampleFilesFolderLocation.valid.absolutePath);
  });

  it('Non existing folder', () => {
    expect(() =>
      folder.getSampleFilesFolderLocation(
        sampleFilesFolderLocation.invalid.relativePath,
      ),
    ).toThrow(Error);
  });
});

describe('checkPackageTypesSubFolderDefinition', () => {
  it('Undefined packages types', () => {
    expect(() =>
      folder.checkPackageTypesSubFolderDefinition(
        packagesTypes.invalid,
        sampleFilesFolderLocation.valid.absolutePath,
      ),
    ).toThrow(Error);
  });

  it('Non undefined packages types', () => {
    expect(() =>
      folder.checkPackageTypesSubFolderDefinition(
        packagesTypes.valid,
        sampleFilesFolderLocation.valid.absolutePath,
      ),
    ).not.toThrow(Error);
  });
});

describe('checkIfPackageAlreadyExists', () => {
  it('Package already exists', () => {
    expect(() =>
      folder.checkIfPackageAlreadyExists('src', process.cwd()),
    ).toThrow(Error);
  });

  it("Package doesn't exists", () => {
    expect(() =>
      folder.checkIfPackageAlreadyExists('source', process.cwd()),
    ).not.toThrow(Error);
  });
});

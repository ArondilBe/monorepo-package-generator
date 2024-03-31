import {
  getListOfNonExistingPackageTypes,
  getNonExistingPackageTypeFolders,
  isPackageTypeDefined,
} from './packageType.js';

const existingPackageTypes = {
  content: 'content',
  util: 'util',
};

const nonExistingPackageTypes = {
  fake: 'fake',
  notDefined: 'notDefined',
};

const allPackageTypes = {
  ...existingPackageTypes,
  ...nonExistingPackageTypes,
};

const sampleFilesFolderPath = './sampleFilesExample';

describe('getNonExistingPackageTypeFolders', () => {
  it('Return non existing package types (only non existing package types are passed)', () => {
    expect(
      getNonExistingPackageTypeFolders(
        sampleFilesFolderPath,
        nonExistingPackageTypes,
      ),
    ).toEqual(['fake', 'notDefined']);
  });

  it('Return no non existing package types (only existing package types are passed)', () => {
    expect(
      getNonExistingPackageTypeFolders(
        sampleFilesFolderPath,
        existingPackageTypes,
      ),
    ).toEqual([]);
  });

  it('Return non existing package types (oall package types are passed)', () => {
    expect(
      getNonExistingPackageTypeFolders(sampleFilesFolderPath, allPackageTypes),
    ).toEqual(['fake', 'notDefined']);
  });
});

describe('getListOfNonExistingPackageTypes', () => {
  it('Get string list', () => {
    expect(getListOfNonExistingPackageTypes(['fake', 'notDefined'])).toEqual(
      '\n- fake\n- notDefined',
    );
  });
});

describe('isPackageTypeDefined', () => {
  it('Package type not found', () => {
    expect(isPackageTypeDefined('fake', ['content', 'typescript'])).toEqual(
      false,
    );
  });

  it('Package type found', () => {
    expect(isPackageTypeDefined('content', ['content', 'typescript'])).toEqual(
      true,
    );
  });
});

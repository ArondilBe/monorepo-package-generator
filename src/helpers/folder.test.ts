import * as folder from './folder';

describe('getFolderCreationLocation', () => {
  it('Get a folder absolute path', () => {
    expect(folder.getFolderCreationLocation('./', 'src')).toEqual(
      `${process.cwd()}\\src`,
    );
  });
});

describe('doesFolderExists', () => {
  it('Existing folder', () => {
    expect(folder.doesFolderExists(`${process.cwd()}/src`)).toEqual(true);
  });

  it('Non existing folder', () => {
    expect(folder.doesFolderExists(`${process.cwd()}/srd`)).toEqual(false);
  });
});

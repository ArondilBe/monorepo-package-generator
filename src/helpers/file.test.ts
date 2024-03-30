import { doesFileOrFolderExist } from './file.js';

describe('doesFileOrFolderExist', () => {
  it('File exists', () => {
    expect(doesFileOrFolderExist('./package.json')).toEqual(true);
  });

  it("File doesn't exist", () => {
    expect(doesFileOrFolderExist('./package.json.lock')).toEqual(false);
  });

  it('Folder exists', () => {
    expect(doesFileOrFolderExist('./src')).toEqual(true);
  });

  it("Folder doesn't exist", () => {
    expect(doesFileOrFolderExist('./app')).toEqual(false);
  });
});

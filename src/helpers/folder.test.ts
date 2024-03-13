import { join } from 'path';

import * as folder from './folder';

describe('getFolderCreationLocation', () => {
  it('Get a folder absolute path', () => {
    expect(folder.getFolderCreationLocation('./', 'src')).toEqual(
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

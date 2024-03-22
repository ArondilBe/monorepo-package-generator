import { join } from 'path';

import * as file from './file';

describe('doesPackageHasAPackageJson', () => {
  it('Package has a package.json', () => {
    expect(file.doesPackageHasAPackageJson(process.cwd())).toEqual(true);
  });

  it("Package hasn't a package.json", () => {
    expect(file.doesPackageHasAPackageJson(join(process.cwd(), 'src'))).toEqual(
      false,
    );
  });
});

import * as util from './util';

const fakePackagePath = 'C:/users/packages/newPackage';

describe('throwPackageGenerationError', () => {
  it('Throw error', () => {
    expect(() =>
      util.throwPackageGenerationError('Configuration file missing', {
        path: fakePackagePath,
      }),
    ).toThrow(Error);
  });
});

describe('getSuccessMessage', () => {
  it('Non typed package', () => {
    expect(util.getSuccessMessage(fakePackagePath)).toEqual(
      `New package created at ${fakePackagePath}`,
    );
  });

  it('Typed package', () => {
    expect(util.getSuccessMessage(fakePackagePath, 'content')).toEqual(
      `New package of type content created at ${fakePackagePath}`,
    );
  });
});

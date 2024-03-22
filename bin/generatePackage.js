#!/usr/bin/env node

// eslint-disable-next-line @typescript-eslint/no-var-requires
const monorepoPackageGenerator = require('../build/index.js');

(async () => {
  monorepoPackageGenerator.default.helpers.packageCreation.generatePackage();
})();

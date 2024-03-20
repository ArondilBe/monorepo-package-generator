import * as commandLine from './commandLine';

let originalArgv: string[];

const processArgv = {
  common: [
    'C:\\Program Files\\nodejs\\node.exe',
    'C:\\Users\\User\\Desktop\\monorepo-package-generator\\esm\\scripts\\generatePackage.js',
  ],
  config: ['--config', './packageGenerationExample.config.json'],
  name: ['--name', 'newPackage'],

  type: ['--type', 'content'],
};

const commandParameters = {
  defaultConfig: { config: './packageGeneration.config.json' },
  config: { config: './packageGenerationExample.config.json' },
  name: { name: 'newPackage' },
  type: { type: 'content' },
};

describe('getCommandOptions', () => {
  beforeEach(() => {
    jest.resetModules();
    originalArgv = process.argv;
  });

  afterEach(() => {
    jest.resetAllMocks();
    process.argv = originalArgv;
  });

  it('No argument passed', async () => {
    process.argv = processArgv.common;
    expect(await commandLine.getCommandOptions()).toEqual(
      commandParameters.defaultConfig,
    );
  });

  it('Only config passed', async () => {
    process.argv = [...processArgv.common, ...processArgv.config];
    expect(await commandLine.getCommandOptions()).toEqual(
      commandParameters.config,
    );
  });

  it('Only name passed', async () => {
    process.argv = [...processArgv.common, ...processArgv.name];
    expect(await commandLine.getCommandOptions()).toEqual({
      ...commandParameters.defaultConfig,
      ...commandParameters.name,
    });
  });

  it('Only type passed', async () => {
    process.argv = [...processArgv.common, ...processArgv.type];
    expect(await commandLine.getCommandOptions()).toEqual({
      ...commandParameters.defaultConfig,
      ...commandParameters.type,
    });
  });

  it('Config and name passed', async () => {
    process.argv = [
      ...processArgv.common,
      ...processArgv.config,
      ...processArgv.name,
    ];
    expect(await commandLine.getCommandOptions()).toEqual({
      ...commandParameters.config,
      ...commandParameters.name,
    });
  });

  it('Config and type passed', async () => {
    process.argv = [
      ...processArgv.common,
      ...processArgv.config,
      ...processArgv.type,
    ];
    expect(await commandLine.getCommandOptions()).toEqual({
      ...commandParameters.config,
      ...commandParameters.type,
    });
  });

  it('Name and type passed', async () => {
    process.argv = [
      ...processArgv.common,
      ...processArgv.name,
      ...processArgv.type,
    ];
    expect(await commandLine.getCommandOptions()).toEqual({
      ...commandParameters.defaultConfig,
      ...commandParameters.name,
      ...commandParameters.type,
    });
  });

  it('All parameters passed passed', async () => {
    process.argv = [
      ...processArgv.common,
      ...processArgv.config,
      ...processArgv.name,
      ...processArgv.type,
    ];
    expect(await commandLine.getCommandOptions()).toEqual({
      ...commandParameters.config,
      ...commandParameters.name,
      ...commandParameters.type,
    });
  });
});

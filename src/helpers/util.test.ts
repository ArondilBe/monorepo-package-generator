import chalk from 'chalk';

import { capitalizeSentence, getFormattedMessage, throwError } from './util.js';

const messageToFormat = {
  message: 'Hello :world !',
  parameters: {
    world: 'world',
  },
};

const basicMessage = 'Hello world !';

describe('capitalizeSentence', () => {
  it('Get capitalized word', () => {
    expect(capitalizeSentence('word')).toEqual('Word');
  });

  it('Get capitalized sentence', () => {
    expect(capitalizeSentence('hello world !')).toEqual('Hello world !');
  });
});

describe('getFormattedMessage', () => {
  it('Get basic message (error, no prefix)', () => {
    expect(getFormattedMessage('error', basicMessage)).toEqual(
      chalk.red(basicMessage),
    );
  });

  it('Get formatted message (error, no prefix)', () => {
    expect(
      getFormattedMessage('error', messageToFormat.message, {
        parameters: messageToFormat.parameters,
      }),
    ).toEqual(chalk.red(basicMessage));
  });

  it('Get basic message (error)', () => {
    expect(
      getFormattedMessage('error', basicMessage, {
        shouldDisplayMessageType: true,
      }),
    ).toEqual(chalk.red(`[Error] ${basicMessage}`));
  });

  it('Get formatted message (error)', () => {
    expect(
      getFormattedMessage('error', messageToFormat.message, {
        parameters: messageToFormat.parameters,
        shouldDisplayMessageType: true,
      }),
    ).toEqual(chalk.red(`[Error] ${basicMessage}`));
  });

  it('Get basic message (warning, no prefix)', () => {
    expect(getFormattedMessage('warning', basicMessage)).toEqual(
      chalk.yellow(basicMessage),
    );
  });

  it('Get formatted message (warning, no prefix)', () => {
    expect(
      getFormattedMessage('warning', messageToFormat.message, {
        parameters: messageToFormat.parameters,
      }),
    ).toEqual(chalk.yellow(basicMessage));
  });

  it('Get basic message (warning)', () => {
    expect(
      getFormattedMessage('warning', basicMessage, {
        shouldDisplayMessageType: true,
      }),
    ).toEqual(chalk.yellow(`[Warning] ${basicMessage}`));
  });

  it('Get formatted message (warning)', () => {
    expect(
      getFormattedMessage('warning', messageToFormat.message, {
        parameters: messageToFormat.parameters,
        shouldDisplayMessageType: true,
      }),
    ).toEqual(chalk.yellow(`[Warning] ${basicMessage}`));
  });

  it('Get basic message (success, no prefix)', () => {
    expect(getFormattedMessage('success', basicMessage)).toEqual(
      chalk.green(basicMessage),
    );
  });

  it('Get formatted message (success, no prefix)', () => {
    expect(
      getFormattedMessage('success', messageToFormat.message, {
        parameters: messageToFormat.parameters,
      }),
    ).toEqual(chalk.green(basicMessage));
  });

  it('Get basic message (success)', () => {
    expect(
      getFormattedMessage('success', basicMessage, {
        shouldDisplayMessageType: true,
      }),
    ).toEqual(chalk.green(`[Success] ${basicMessage}`));
  });

  it('Get formatted message (success)', () => {
    expect(
      getFormattedMessage('success', messageToFormat.message, {
        parameters: messageToFormat.parameters,
        shouldDisplayMessageType: true,
      }),
    ).toEqual(chalk.green(`[Success] ${basicMessage}`));
  });

  it('Get basic message (information, no prefix)', () => {
    expect(getFormattedMessage('information', basicMessage)).toEqual(
      chalk.blue(basicMessage),
    );
  });

  it('Get formatted message (information, no prefix)', () => {
    expect(
      getFormattedMessage('information', messageToFormat.message, {
        parameters: messageToFormat.parameters,
      }),
    ).toEqual(chalk.blue(basicMessage));
  });

  it('Get basic message (information)', () => {
    expect(
      getFormattedMessage('information', basicMessage, {
        shouldDisplayMessageType: true,
      }),
    ).toEqual(chalk.blue(`[Information] ${basicMessage}`));
  });

  it('Get formatted message (information)', () => {
    expect(
      getFormattedMessage('information', messageToFormat.message, {
        parameters: messageToFormat.parameters,
        shouldDisplayMessageType: true,
      }),
    ).toEqual(chalk.blue(`[Information] ${basicMessage}`));
  });
});

describe('throwError', () => {
  it('Throw error message', () => {
    expect(() =>
      throwError('Configuration file', { path: './package.json' }),
    ).toThrow(Error);
  });

  it('Configuration file', () => {
    expect(() =>
      throwError('Configuration file', { path: './package.lock.json' }),
    ).toThrow('No configuration file found at: "./package.lock.json"');
  });

  it('Package already exists', () => {
    expect(() =>
      throwError('Package already exists', { path: './packages/newPackage' }),
    ).toThrow('The package ":name" already exists at "./packages/newPackage"');
  });

  it('Package already exists', () => {
    expect(() =>
      throwError('Sample files folder', { path: './sampleFiles' }),
    ).toThrow('No sample files folder found at "./sampleFiles"');
  });

  it('Package types folder', () => {
    expect(() =>
      throwError('Package types folder', {
        types: '- content',
      }),
    ).toThrow('The following package type folders were not found: - content');
  });

  it('Package type folder', () => {
    expect(() =>
      throwError('Package type', {
        type: 'fake',
      }),
    ).toThrow(
      'The given package type "fake" is not defined in the configuration file',
    );
  });
});

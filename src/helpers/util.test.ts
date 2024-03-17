import * as util from './util';

const message = 'Hello :target :punctuation';
const parameters = {
  target: 'world',
  punctuation: '!',
};

describe('getMessageWithParameterValues', () => {
  it('Not found paraters', () => {
    expect(() =>
      util.getMessageWithParameterValues(message, {
        ...parameters,
        ...{ invalid: 'invalid value' },
      }),
    ).toThrow(Error);
  });

  it('Get message with parameter values', () => {
    expect(util.getMessageWithParameterValues(message, parameters)).toEqual(
      'Hello world !',
    );
  });
});

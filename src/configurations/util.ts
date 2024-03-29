import type { ErrorType, MessageColor, MessageType } from '../types/util.js';

export const PARAMETER_SYMBOL = ':';

export const MESSAGE_COLOR: Record<MessageType, MessageColor> = {
  error: 'red',
  warning: 'yellow',
  success: 'green',
  information: 'blue',
};

export const ERROR_MESSAGE: Record<ErrorType, string> = {
  'Package creation': 'The following error happened: :error',
};

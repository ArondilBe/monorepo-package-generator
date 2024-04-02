export type MessageType = 'error' | 'warning' | 'success' | 'information';

export type MessageColor = 'red' | 'yellow' | 'green' | 'blue';

export type ErrorType =
  | 'Configuration file'
  | 'Package already exists'
  | 'Sample files folder'
  | 'Package types folder'
  | 'Package type';

export type InformationType =
  | 'Folder created'
  | 'Common files copied'
  | 'Specific files copied'
  | 'Package.json modified';

export type WarningType = 'Package type';

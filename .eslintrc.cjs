module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      modules: true,
    },
    sourceType: 'module',
  },
  plugins: ['import', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      'eslint-import-resolver-typescript': true,
      typescript: {
        project: '../*/tsconfig.json',
      },
      node: true,
    },
  },
  ignorePatterns: ['esm', 'node_modules'],
  rules: {
    /* GENERAL */
    // Since we use Windows and git is already converting CRLF/LF, disable this rule
    'linebreak-style': 0,
    // Ensure every if, else, for, while, or do have brackets
    curly: [2, 'all'],
    // Don't use block function bodies with only a return statement
    'arrow-body-style': [2, 'as-needed'],
    // Only useful in some places
    'sort-keys': 0,
    // Allow underscore at the beginning or the end of a parameter name
    'no-underscore-dangle': 0,
    // Allow wait in loop block (used for async test functions)
    'no-await-in-loop': 0,
    /* TYPESCRIPT */
    // Prevent to return an await as the await call will be enough
    'no-return-await': 2,
    // Warning for all console line
    'no-console': 1,
    // Prevent to reassign parameter (props option prevent to reassign properties of the parameters
    'no-param-reassign': [2, { props: true }],
    // This rule disallows returning values from Promise executor functions
    'no-promise-executor-return': 2,
    // This rule disallows using a function before defining it
    'no-use-before-define': 2,
    // Any should only be used in some rare generics
    '@typescript-eslint/no-explicit-any': 2,
    // We prefer types to interfaces
    '@typescript-eslint/prefer-interface': 0,
    // While this can be useful, inference is enough for most cases
    // Allow to not specify the return type (also for exported function)
    '@typescript-eslint/dot-notation': 0,
    '@typescript-eslint/no-implied-eval': 0,
    '@typescript-eslint/no-throw-literal': 0,
    '@typescript-eslint/return-await': 0,
    '@typescript-eslint/no-unnecessary-condition': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    //'@typescript-eslint/naming-convention': 0,
    '@typescript-eslint/no-redeclare': 2,
    // Disable type assertions for objects
    '@typescript-eslint/consistent-type-assertions': [
      2,
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'never',
      },
    ],
    /* IMPORTS */
    'sort-imports': [1, { ignoreDeclarationSort: true, ignoreCase: true }],
    'import/order': [
      1,
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'no-duplicate-imports': 1,
    // Prevent using module imported via another package
    'import/no-extraneous-dependencies': 2,
    // We should be able to import multiple date-fns or lodash submodules in the same file
    'import/no-duplicates': 0,
    // Prevent wrong relative auto-import created by VS Code
    'no-restricted-imports': ['error', { paths: ['import1', 'import2'] }],
    'global-require': 2,
    'import/no-dynamic-require': 2,
    // Prevent usage of ternary when it's not needed
    'no-unneeded-ternary': 2,
    /* DUPLICATES */
    // Prettier already handle these
    indent: 0,
    '@typescript-eslint/indent': 0,
    // Typescript already handle these
    'import/no-unresolved': 0,
    'import/named': 0,
    'import/default': 0,
    'import/no-named-as-default-member': 0,
    'import/namespace': 0,
    // typescript-eslint already handle these
    'no-redeclare': 0,

    /* PERFORMANCE ISSUES */
    // These rules will only be used on CI or when committing because of the
    // performance cost
    'import/no-cycle': 0,
    'import/no-self-import': 0,
    'import/export': 0,
    'import/no-relative-packages': 0,
    // Prevent the use of extensions in imports except for non-code files
    'import/extensions': 0,
  },
}

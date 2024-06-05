module.exports = {
  root: true,
  env: { node: true, browser: true, es2024: true },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:sonarjs/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    parser: ['@babel/eslint-parser'],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: { version: '18.2' },
    'import/resolver': { node: true },
    'import/extensions': ['.js', '.jsx'],
    'import/ignore': ['.scss', '.less', '.css'],
  },
  plugins: ['jsx-a11y', 'sonarjs'],
  rules: {
    'no-console': 0,
    'jsx-a11y/click-events-have-key-events': 'off',
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    'no-unused-vars': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index', 'object', 'type', 'unknown'],
        ],
        pathGroups: [
          {
            pattern: 'components',
            group: 'internal',
          },
          {
            pattern: 'common',
            group: 'internal',
          },
          {
            pattern: 'routes/ **',
            group: 'internal',
          },
          {
            pattern: 'assets/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['internal'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  globals: {
    getApp: false,
    Page: false,
    wx: false,
    App: false,
    getCurrentPages: false,
    Component: false,
  },
};

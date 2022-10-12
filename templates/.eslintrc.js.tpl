module.exports = {
  extends: [
    'airbnb-base',
    'prettier', // eslint-config-prettier 处理冲突
    'plugin:react/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks'],
  env: {
    browser: true,
    node: true,
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  rules: {
    "no-use-before-define": "off",
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/indent': ['off', 2],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-empty-interface': 'error', // codecc
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': 'error', // codecc
    'import/order': 'error',
    'import/extensions': 'off',
    'import/no-named-as-default': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-cycle': 'off', // TODO: turn on this rule later
    'import/no-unresolved': 'off', // TODO: turn on this rule later
    'react/display-name': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/prop-types': 'off',
    'max-len': 'off',
    'no-shadow': 'off',
    'no-console': 'off',
    'no-throw-literal': 'off',
    'no-unused-expressions': 'off',
    'no-bitwise': 'off',
    'no-useless-return': 'off',
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-continue': 'off',
    'no-return-assign': 'off',
    'no-restricted-syntax': 'off',
    'no-restricted-globals': 'off',
    'no-unneeded-ternary': 'off',
    'eol-last': 'error', // codecc
    'func-names': 'off',
    'consistent-return': 'off',
    'default-case': 'off',
    'class-methods-use-this': 'off',
    'import/no-import-module-exports': 'off',
    'no-new-func': 'off',
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "off",
    "no-underscore-dangle": "off"
    "default-param-last": "off"
  },
};

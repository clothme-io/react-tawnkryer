module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'import/no-extraneous-dependencies': 0,
    'prettier/prettier': ['error', { endOfLine: 'auto', usePrettierrc: false }],
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'import/prefer-default-export': 0,
    'react/no-unescaped-entities': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/naming-convention': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'no-console': 0,
  },
};

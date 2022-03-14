module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  plugins: ['react-hooks'],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-plusplus': 0,
    '@typescript-eslint/consistent-type-imports': 0,
    '@typescript-eslint/no-shadow': 0,
  },
};

module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/prefer-stateless-function': ['off', { 'ignorePureComponents': true }],
    'no-empty': ['error', { 'allowEmptyCatch': true }],
    'import/first': 'off',
    'function-paren-newline': 'off',
    'react/sort-comp': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'import/prefer-default-export': 'off',
    'react/forbid-prop-types': 'off',
  },
  settings: {
    'import/resolver': {
      node: { paths: ['./node_modules', './src'] },
    },
  },
};

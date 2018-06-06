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
  },
  settings: {
    'import/resolver': {
      node: { paths: ['./node_modules', './src'] },
    },
  },
};

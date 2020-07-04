/* eslint-disable filenames/match-exported */
module.exports = function babelConfig(api) {
  api.cache(true);

  return {
    presets: [
      ['@babel/preset-env', { bugfixes: true }],
      '@babel/preset-typescript',
      '@babel/preset-react',
      'airbnb',
      'mobx'
    ],
    plugins: [
      'lodash',
      '@babel/plugin-transform-runtime',
      'babel-plugin-styled-components',
      'react-hot-loader/babel'
    ],
    "sourceType": "unambiguous"
  };
};
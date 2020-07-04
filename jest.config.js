const { defaults } = require('jest-config');

module.exports = {
  roots: ['<rootDir>/src'],
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(test).+(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '.scss$': 'identity-obj-proxy',
    '^styled-components$': '<rootDir>/node_modules/styled-components'
  },
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, '.ts', '.tsx'],
  setupFilesAfterEnv: ['./setupTests.ts']
};
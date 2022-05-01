/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: { warnOnly: true },
    },
  },
  testEnvironment: 'node',
  testPathIgnorePatterns: ['src/tests/integration', 'dist'],
  testTimeout: 30000,
}

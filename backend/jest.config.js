/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: { warnOnly: true },
    },
  },
  testEnvironment: 'node',
  testPathIgnorePatterns: ['src/tests/unit', 'src/schema'],
  testTimeout: 30000,
}

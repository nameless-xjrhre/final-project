/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: { warnOnly: true },
    },
  },
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  testEnvironment: 'node',
  testPathIgnorePatterns: ['src/tests/unit', 'src/schema', dist],
  testTimeout: 30000,
}

'use strict'

module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Stub CSS imports so they don't break the test run.
    '\\.css$': '<rootDir>/test/styleMock.js'
  }
}

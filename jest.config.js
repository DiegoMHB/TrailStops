module.exports = {
    verbose: true,
    preset: 'ts-jest',
    // clearMocks: true,
    testEnvironment: "node",
    transform: {
      '^.+\\.(ts|tsx)?$': 'ts-jest',
      '^.+\\.(js|jsx)$': 'babel-jest',
      },
    moduleFileExtensions: ['ts', 'js'],
    transformIgnorePatterns: ['node_modules/(?!(.*\\.mjs$|pdfjs-dist))'],
    roots: ['<rootDir>/server', '<rootDir>/server/__tests__'],
    testPathIgnorePatterns: ['/node_modules/', '<rootDir>/server/dist/'],
    setupFilesAfterEnv: ['@testing-library/jest-dom', './server/setupJest.js'],
  };
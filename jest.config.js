/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!@ukic)"],
  transform: {
    "\\.(js)$": "babel-jest"
  },
  workerIdleMemoryLimit: "512MB"
};

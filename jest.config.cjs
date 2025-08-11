/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.m?js$": "babel-jest"
  },
  moduleNameMapper: {
    [ /^(\.{1,2}\/.*)\.js$/ ]: '$1'
  },
  testMatch: ["**/__tests__/**/*.test.mjs", "**/?(*.)+(spec|test).mjs"],
};

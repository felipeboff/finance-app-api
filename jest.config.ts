import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testMatch: ["**/*.test.ts"],
};

export default config;
